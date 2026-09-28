import { describe, expect, test } from 'bun:test';
import { readFileSync } from 'node:fs';
import {
  Box3,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  Vector3,
} from 'three';
import {
  BODY_NODES,
  SUBJECT_FILL,
  SUBJECT_HEIGHT,
  SUBJECT_NODES,
  SUBJECT_YAW,
  compositionAim,
  compositionShift,
  deriveLayout,
  measureComposition,
  measureSubject,
  framingForCanvas,
  zoomForCanvasHeight,
} from '../src/components/canvas/voxelFraming';

/** The shipped asset, read from disk so a re-export with different proportions fails this file. */
const MODEL_PATH = new URL('../public/models/kitty.glb', import.meta.url);

type Gltf = {
  accessors: Array<{ bufferView: number; byteOffset?: number; count: number }>;
  bufferViews: Array<{ byteOffset?: number; byteStride?: number }>;
  meshes: Array<{ primitives: Array<{ attributes: { POSITION: number } }> }>;
  nodes: Array<{
    name?: string;
    mesh?: number;
    translation?: number[];
    rotation?: number[];
    scale?: number[];
    children?: number[];
  }>;
  scenes: Array<{ nodes: number[] }>;
};

/** Minimal GLB reader: rebuilds the shipped scene as real meshes for the real code path. */
function loadShippedKitty(): Group {
  const file = readFileSync(MODEL_PATH);
  const total = file.readUInt32LE(8);
  let offset = 12;
  let gltf: Gltf | null = null;
  let bin: Buffer | null = null;
  while (offset < total) {
    const chunkLength = file.readUInt32LE(offset);
    const chunkType = file.toString('utf8', offset + 4, offset + 8);
    if (chunkType === 'JSON') {
      gltf = JSON.parse(file.slice(offset + 8, offset + 8 + chunkLength).toString('utf8'));
    } else if (chunkType.startsWith('BIN')) {
      bin = file.slice(offset + 8, offset + 8 + chunkLength);
    }
    offset += 8 + chunkLength;
  }
  if (!gltf || !bin) throw new Error('kitty.glb is missing its JSON or BIN chunk');
  const binary = bin;

  const geometryFor = (accessorIndex: number) => {
    const accessor = gltf!.accessors[accessorIndex];
    const view = gltf!.bufferViews[accessor.bufferView];
    const base = (view.byteOffset ?? 0) + (accessor.byteOffset ?? 0);
    const stride = view.byteStride ?? 12;
    const positions = new Float32Array(accessor.count * 3);
    for (let i = 0; i < accessor.count; i++) {
      const at = base + i * stride;
      positions[i * 3] = binary.readFloatLE(at);
      positions[i * 3 + 1] = binary.readFloatLE(at + 4);
      positions[i * 3 + 2] = binary.readFloatLE(at + 8);
    }
    const geometry = new BufferGeometry();
    geometry.setAttribute('position', new BufferAttribute(positions, 3));
    return geometry;
  };

  const nodeFor = (index: number): Object3D => {
    const node = gltf!.nodes[index];
    const primitives = node.mesh === undefined ? [] : gltf!.meshes[node.mesh].primitives;
    const object =
      primitives.length === 1
        ? new Mesh(geometryFor(primitives[0].attributes.POSITION), new MeshBasicMaterial())
        : new Group();
    if (primitives.length > 1) {
      primitives.forEach((primitive) =>
        (object as Group).add(new Mesh(geometryFor(primitive.attributes.POSITION), new MeshBasicMaterial())),
      );
    }
    object.name = node.name ?? `node${index}`;
    if (node.translation) object.position.fromArray(node.translation);
    if (node.rotation) object.quaternion.fromArray(node.rotation);
    if (node.scale) object.scale.fromArray(node.scale);
    (node.children ?? []).forEach((child) => object.add(nodeFor(child)));
    return object;
  };

  const scene = new Group();
  gltf.scenes[0].nodes.forEach((index) => scene.add(nodeFor(index)));
  scene.updateMatrixWorld(true);
  return scene;
}

/**
 * Assembles the same group nesting as src/components/canvas/VoxelModel.tsx: a pivot group with
 * position = -center nested inside the group that carries the -90 degree rotation and the scale.
 * Returns the pivot group so a model-space point can be pushed through the whole chain.
 */
function assembleSubjectGroups(center: Vector3, scale: number): Group {
  const outer = new Group();
  const float = new Group();
  outer.add(float);
  const rotated = new Group();
  rotated.rotation.y = -Math.PI / 2;
  rotated.scale.setScalar(scale);
  float.add(rotated);
  const pivot = new Group();
  pivot.position.set(-center.x, -center.y, -center.z);
  rotated.add(pivot);
  outer.updateMatrixWorld(true);
  return pivot;
}

/**
 * Same nesting as the production component, now including the composition shift: an outer group
 * carries the pure translation, its float child carries the model, and the contact shadow anchors
 * as a sibling of the float group inside the shift group. Returns the pieces a test needs to push
 * a model-space point (pivot) or the shadow anchor (shiftGroup) through the real chain.
 */
function assembleShiftedGroups(center: Vector3, scale: number, shift: Vector3) {
  const outer = new Group();
  const shiftGroup = new Group();
  shiftGroup.position.copy(shift);
  outer.add(shiftGroup);
  const float = new Group();
  shiftGroup.add(float);
  const rotated = new Group();
  rotated.rotation.y = SUBJECT_YAW;
  rotated.scale.setScalar(scale);
  float.add(rotated);
  const pivot = new Group();
  pivot.position.set(-center.x, -center.y, -center.z);
  rotated.add(pivot);
  outer.updateMatrixWorld(true);
  return { outer, shiftGroup, pivot };
}

describe('deriveLayout', () => {
  test('derives scale, centre and floor height from the shipped subject box', () => {
    const { box } = measureSubject(loadShippedKitty(), SUBJECT_NODES);
    const layout = deriveLayout(box, SUBJECT_HEIGHT);
    expect(layout.ok).toBe(true);
    if (!layout.ok) return;
    expect(layout.scale).toBeCloseTo(8.0529, 4);
    expect(layout.center.x).toBeCloseTo(0.00625, 5);
    expect(layout.center.y).toBeCloseTo(0.3415, 4);
    expect(layout.center.z).toBeCloseTo(0.2, 4);
    expect(layout.floorY).toBeCloseTo(-2.75, 3);
  });

  test('rejects an empty box instead of returning Infinity', () => {
    const layout = deriveLayout(new Box3(), SUBJECT_HEIGHT);
    expect(layout.ok).toBe(false);
    if (layout.ok) return;
    expect(layout.reason).toBe('empty');
  });

  test('rejects a zero-height box instead of dividing by zero', () => {
    const flat = new Box3(new Vector3(0, 0.5, 0), new Vector3(1, 0.5, 1));
    const layout = deriveLayout(flat, SUBJECT_HEIGHT);
    expect(layout.ok).toBe(false);
    if (layout.ok) return;
    expect(layout.reason).toBe('degenerate');
  });

  test('rejects a non-finite side extent even when the height is usable', () => {
    const poisoned = new Box3(new Vector3(Number.NaN, 0, 0), new Vector3(1, 1, 1));
    const layout = deriveLayout(poisoned, SUBJECT_HEIGHT);
    expect(layout.ok).toBe(false);
    if (layout.ok) return;
    expect(layout.reason).toBe('degenerate');
  });

  test('rejects a non-finite or non-positive subject height', () => {
    const box = new Box3(new Vector3(0, 0, 0), new Vector3(1, 2, 1));
    for (const bad of [0, -1, Number.NaN, Number.POSITIVE_INFINITY]) {
      const layout = deriveLayout(box, bad);
      expect(layout.ok).toBe(false);
      if (layout.ok) return;
      expect(layout.reason).toBe('invalid-height');
    }
    // The same box with a usable height still derives a layout.
    expect(deriveLayout(box, 2).ok).toBe(true);
  });

  test('carries the list of subject names it could not find', () => {
    const layout = deriveLayout(
      measureSubject(loadShippedKitty(), SUBJECT_NODES).box,
      SUBJECT_HEIGHT,
      ['Cola'],
    );
    expect(layout.missing).toEqual(['Cola']);
  });
});

describe('subject placement', () => {
  test('the assembled group nesting puts the subject box centre on the group origin', () => {
    const scene = loadShippedKitty();
    const { box, missing } = measureSubject(scene, SUBJECT_NODES);
    expect(missing).toEqual([]);
    const layout = deriveLayout(box, SUBJECT_HEIGHT);
    if (!layout.ok) throw new Error('expected a usable layout');

    const pivot = assembleSubjectGroups(layout.center, layout.scale);
    const intoGroupSpace = (point: Vector3) => point.clone().applyMatrix4(pivot.matrixWorld);

    expect(intoGroupSpace(box.getCenter(new Vector3())).length()).toBeCloseTo(0, 9);

    // Non-vacuous: an off-centre point must NOT collapse onto the origin, and must land where the
    // component's transform chain (translate by -centre, scale, then rotate -90deg about Y) puts it.
    const corner = box.max.clone();
    const actual = intoGroupSpace(corner);
    expect(actual.length()).toBeGreaterThan(1);
    const expected = corner
      .clone()
      .sub(layout.center)
      .multiplyScalar(layout.scale)
      .applyAxisAngle(new Vector3(0, 1, 0), -Math.PI / 2);
    expect(actual.distanceTo(expected)).toBeCloseTo(0, 9);

    // The floor plane the contact shadow is placed on: model y = 0 after the same chain.
    const floor = intoGroupSpace(new Vector3(layout.center.x, 0, layout.center.z));
    expect(floor.y).toBeCloseTo(layout.floorY, 6);
  });
});

describe('composition framing', () => {
  test('measures the body and assembly boxes on the same clone as the subject box', () => {
    const scene = loadShippedKitty();
    const { subject, body, assembly } = measureComposition(scene);
    // The single-pass measurement must agree with the dedicated, already-covered accessor.
    expect(body.equals(measureSubject(scene, BODY_NODES).box)).toBe(true);
    expect(subject.equals(measureSubject(scene, SUBJECT_NODES).box)).toBe(true);
    // The assembly is strictly larger than the subject: it also holds the desk, monitor and mug.
    expect(assembly.containsBox(subject)).toBe(true);
    expect(assembly.getSize(new Vector3()).z).toBeGreaterThan(subject.getSize(new Vector3()).z);
  });

  test('pins the derived composition aim and the world shift', () => {
    const { body, assembly } = measureComposition(loadShippedKitty());
    const aim = compositionAim(body, assembly);
    expect(aim).not.toBeNull();
    if (!aim) return;
    // Midpoint of the tail-less body centre and the whole assembly centre.
    expect(aim.x).toBeCloseTo(0.003125, 5);
    expect(aim.y).toBeCloseTo(0.34149, 5);
    expect(aim.z).toBeCloseTo(0.1, 5);

    const { box } = measureSubject(loadShippedKitty(), SUBJECT_NODES);
    const layout = deriveLayout(box, SUBJECT_HEIGHT);
    if (!layout.ok) throw new Error('expected a usable layout');
    const shift = compositionShift(aim, layout.center, layout.scale, SUBJECT_YAW);
    expect(shift).not.toBeNull();
    if (!shift) return;
    expect(shift.x).toBeCloseTo(-0.805294, 5);
    expect(shift.y).toBeCloseTo(0, 6);
    expect(shift.z).toBeCloseTo(0.025165, 5);
  });

  test('the shifted chain lands the composition aim on the group origin', () => {
    const scene = loadShippedKitty();
    const { subject, body, assembly } = measureComposition(scene);
    const layout = deriveLayout(subject, SUBJECT_HEIGHT);
    if (!layout.ok) throw new Error('expected a usable layout');
    const aim = compositionAim(body, assembly);
    if (!aim) throw new Error('expected a usable composition aim');
    const shift = compositionShift(aim, layout.center, layout.scale, SUBJECT_YAW);
    if (!shift) throw new Error('expected a finite shift');

    // Non-vacuous: without the shift the aim sits well away from the origin.
    const unshifted = assembleSubjectGroups(layout.center, layout.scale);
    const before = aim.clone().applyMatrix4(unshifted.matrixWorld);
    expect(before.length()).toBeGreaterThan(0.5);

    const { outer, pivot } = assembleShiftedGroups(layout.center, layout.scale, shift);
    expect(aim.clone().applyMatrix4(pivot.matrixWorld).length()).toBeCloseTo(0, 6);
    expect(outer.position.length()).toBe(0);
  });

  test('the composition shift keeps the contact shadow offset below the floor plane', () => {
    const scene = loadShippedKitty();
    const { subject, body, assembly } = measureComposition(scene);
    const layout = deriveLayout(subject, SUBJECT_HEIGHT);
    if (!layout.ok) throw new Error('expected a usable layout');
    const aim = compositionAim(body, assembly);
    if (!aim) throw new Error('expected a usable composition aim');
    const shift = compositionShift(aim, layout.center, layout.scale, SUBJECT_YAW);
    if (!shift) throw new Error('expected a finite shift');

    // Model-space point on the floor plane (model y = 0), and the ContactShadows anchor it feeds.
    const floorPoint = new Vector3(layout.center.x, 0, layout.center.z);
    const shadowAnchor = new Vector3(0, layout.floorY, 0);

    const unshifted = assembleSubjectGroups(layout.center, layout.scale);
    const gapBefore = shadowAnchor.y - floorPoint.clone().applyMatrix4(unshifted.matrixWorld).y;

    const { pivot, shiftGroup } = assembleShiftedGroups(layout.center, layout.scale, shift);
    const floorAfter = floorPoint.clone().applyMatrix4(pivot.matrixWorld).y;
    const gapAfter = shadowAnchor.clone().applyMatrix4(shiftGroup.matrixWorld).y - floorAfter;

    expect(gapBefore).toBeCloseTo(0, 9);
    expect(gapAfter).toBeCloseTo(gapBefore, 9);
  });

  test('the shifted assembly fits the hero canvas at ~77% height with no overflow', () => {
    const scene = loadShippedKitty();
    const { subject, body, assembly } = measureComposition(scene);
    const layout = deriveLayout(subject, SUBJECT_HEIGHT);
    if (!layout.ok) throw new Error('expected a usable layout');
    const aim = compositionAim(body, assembly);
    if (!aim) throw new Error('expected a usable composition aim');
    const shift = compositionShift(aim, layout.center, layout.scale, SUBJECT_YAW);
    if (!shift) throw new Error('expected a finite shift');

    const { pivot } = assembleShiftedGroups(layout.center, layout.scale, shift);

    // The real hero canvas and the real production orthographic camera.
    const CANVAS_WIDTH = 650;
    const CANVAS_HEIGHT = 420;
    const camera = new OrthographicCamera(
      -CANVAS_WIDTH / 2,
      CANVAS_WIDTH / 2,
      CANVAS_HEIGHT / 2,
      -CANVAS_HEIGHT / 2,
      0.01,
      50000,
    );
    camera.position.set(15, 10, 15);
    camera.zoom = zoomForCanvasHeight(CANVAS_HEIGHT);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld(true);

    const projected: Vector3[] = [];
    for (const x of [assembly.min.x, assembly.max.x]) {
      for (const y of [assembly.min.y, assembly.max.y]) {
        for (const z of [assembly.min.z, assembly.max.z]) {
          const ndc = new Vector3(x, y, z)
            .applyMatrix4(pivot.matrixWorld)
            .project(camera);
          projected.push(
            new Vector3(
              (ndc.x * 0.5 + 0.5) * CANVAS_WIDTH,
              (0.5 - ndc.y * 0.5) * CANVAS_HEIGHT,
              0,
            ),
          );
        }
      }
    }

    for (const point of projected) {
      expect(point.x).toBeGreaterThanOrEqual(0);
      expect(point.x).toBeLessThanOrEqual(CANVAS_WIDTH);
      expect(point.y).toBeGreaterThanOrEqual(0);
      expect(point.y).toBeLessThanOrEqual(CANVAS_HEIGHT);
    }

    const ys = projected.map((point) => point.y);
    const heightFraction = (Math.max(...ys) - Math.min(...ys)) / CANVAS_HEIGHT;
    expect(heightFraction).toBeCloseTo(0.764, 3);
    // Within 1% of the canvas height of the measured 77% design fill.
    expect(Math.abs(heightFraction - 0.77)).toBeLessThanOrEqual(0.01);
  });
});

describe('measureSubject', () => {
  test('measures the shipped asset through the real code path', () => {
    const { box, missing } = measureSubject(loadShippedKitty(), SUBJECT_NODES);
    expect(missing).toEqual([]);
    expect(box.min.x).toBeCloseTo(-0.1688, 3);
    expect(box.min.y).toBeCloseTo(0, 5);
    expect(box.max.y).toBeCloseTo(0.683, 3);
    expect(box.getSize(new Vector3()).y).toBeCloseTo(0.683, 3);
  });

  test('includes ancestor transforms of a nested subject node', () => {
    const root = new Group();
    const parent = new Group();
    parent.position.set(2, 0, 0);
    parent.rotation.z = Math.PI / 2;
    const target = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial());
    target.name = 'Cuerpo';
    parent.add(target);
    root.add(parent);

    const { box, missing } = measureSubject(root, ['Cuerpo']);
    expect(missing).toEqual([]);
    const center = box.getCenter(new Vector3());
    expect(center.x).toBeCloseTo(2, 6);
    expect(box.getSize(new Vector3()).y).toBeCloseTo(1, 6);
  });

  test('reports every name that is absent and still measures the ones present', () => {
    const root = new Group();
    const present = new Mesh(new BoxGeometry(2, 2, 2), new MeshBasicMaterial());
    present.name = 'Cuerpo';
    root.add(present);

    const { box, missing } = measureSubject(root, ['Cuerpo', 'Cola', 'Orejas']);
    expect(missing).toEqual(['Cola', 'Orejas']);
    expect(box.getSize(new Vector3()).x).toBeCloseTo(2, 6);
  });

  test('does not reparent or mutate the source scene', () => {
    const root = new Group();
    root.position.set(5, 0, 0);
    const child = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial());
    child.name = 'Cuerpo';
    // Non-identity transforms with a freshly updated world matrix, so the snapshot is meaningful
    // instead of identity on both sides.
    child.position.set(1, 2, 3);
    root.add(child);
    root.updateMatrixWorld(true);
    const worldBefore = child.matrixWorld.clone();
    expect(worldBefore.elements[12]).toBeCloseTo(6, 10);

    measureSubject(root, ['Cuerpo']);

    expect(root.parent).toBeNull();
    expect(child.parent).toBe(root);
    expect(child.matrixWorld.equals(worldBefore)).toBe(true);
  });
});

describe('framingForCanvas', () => {
  test('derives the frustum and the zoom from one measurement, so they cannot disagree', () => {
    for (const [w, h] of [
      [650, 420],
      [354, 320],
      [285, 211],
    ] as const) {
      const f = framingForCanvas(w, h);
      expect(f).not.toBeNull();
      if (!f) return;
      // The frustum spans exactly the measured box, and the zoom comes from that same height, so the
      // subject fills SUBJECT_FILL of the framed height. A zoom taken from any other height would
      // break this ratio — which is exactly the half-scale regression this guards.
      expect(f.right - f.left).toBeCloseTo(w, 9);
      expect(f.top - f.bottom).toBeCloseTo(h, 9);
      expect(SUBJECT_HEIGHT / (h / f.zoom)).toBeCloseTo(SUBJECT_FILL, 10);
    }
  });

  test('reproduces the real observed canvases, including the one that rendered at half scale', () => {
    // The broken case: the element was really 420 tall while a stale R3F size reported 210.60.
    // Framing from the element's own box must give the full-size zoom, not the half-size one.
    const correct = framingForCanvas(650, 420);
    const halved = framingForCanvas(650, 210.6);
    expect(correct).not.toBeNull();
    expect(halved).not.toBeNull();
    if (!correct || !halved) return;
    expect(correct.zoom).toBeCloseTo(38.1818, 3);
    expect(halved.zoom).toBeCloseTo(19.1455, 3);
    expect(correct.zoom / halved.zoom).toBeCloseTo(2, 1);
  });

  test('rejects a degenerate or non-finite box instead of building a broken projection', () => {
    for (const [w, h] of [
      [0, 420],
      [650, 0],
      [-650, 420],
      [650, -420],
      [Number.NaN, 420],
      [650, Number.POSITIVE_INFINITY],
    ] as const) {
      expect(framingForCanvas(w, h)).toBeNull();
    }
  });
});

describe('zoomForCanvasHeight', () => {
  test('keeps the subject at the same fraction of the canvas at every breakpoint', () => {
    for (const canvasHeight of [320, 420, 900]) {
      const zoom = zoomForCanvasHeight(canvasHeight);
      expect(SUBJECT_HEIGHT / (canvasHeight / zoom)).toBeCloseTo(SUBJECT_FILL, 10);
    }
  });

  test('stays finite AND positive for a degenerate canvas height', () => {
    for (const bad of [0, Number.NaN, Number.POSITIVE_INFINITY, -100]) {
      const zoom = zoomForCanvasHeight(bad);
      expect(Number.isFinite(zoom)).toBe(true);
      // A zero or negative zoom is a degenerate or mirrored projection, not a usable fallback.
      expect(zoom).toBeGreaterThan(0);
    }
  });

  test('reproduces the reviewed mobile framing (zoom 30 on a 320px canvas)', () => {
    expect(zoomForCanvasHeight(320)).toBeCloseTo(29.09, 1);
  });
});
