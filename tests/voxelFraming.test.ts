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
  Vector3,
} from 'three';
import {
  SUBJECT_FILL,
  SUBJECT_HEIGHT,
  SUBJECT_NODES,
  deriveLayout,
  measureSubject,
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
    const child = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial());
    child.name = 'Cuerpo';
    root.add(child);
    const worldBefore = child.matrixWorld.clone();

    measureSubject(root, ['Cuerpo']);

    expect(root.parent).toBeNull();
    expect(child.parent).toBe(root);
    expect(child.matrixWorld.equals(worldBefore)).toBe(true);
  });
});

describe('zoomForCanvasHeight', () => {
  test('keeps the subject at the same fraction of the canvas at every breakpoint', () => {
    for (const canvasHeight of [320, 420, 900]) {
      const zoom = zoomForCanvasHeight(canvasHeight);
      expect(SUBJECT_HEIGHT / (canvasHeight / zoom)).toBeCloseTo(SUBJECT_FILL, 10);
    }
  });

  test('stays finite for a degenerate canvas height', () => {
    expect(Number.isFinite(zoomForCanvasHeight(0))).toBe(true);
    expect(Number.isFinite(zoomForCanvasHeight(Number.NaN))).toBe(true);
  });

  test('reproduces the reviewed mobile framing (zoom 30 on a 320px canvas)', () => {
    expect(zoomForCanvasHeight(320)).toBeCloseTo(29.09, 1);
  });
});
