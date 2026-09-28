import { Box3, type Object3D, Vector3 } from 'three';

/**
 * Mounting rotation around Y. Single source of truth: the group's JSX rotation and the composition
 * shift derivation both read it, so the two cannot drift apart.
 */
export const SUBJECT_YAW = -Math.PI / 2;

/**
 * Character subtrees only. The desk, monitor and mug stay out of the framing: they stretch the
 * bounding box backwards (desk) and forwards (tail), so centring the whole box would shift the
 * cat itself off centre.
 */
export const SUBJECT_NODES = ['Cuerpo', 'Brazos', 'Cola', 'Orejas'] as const;

/**
 * The subject without its tail. The tail drags the bounding-box centre off the body, so the body
 * centre is measured separately to be averaged with the whole assembly and split the framing.
 */
export const BODY_NODES = ['Cuerpo', 'Brazos', 'Orejas'] as const;

/** Mounting rotation axis, reused by the composition shift derivation. */
const Y_AXIS = new Vector3(0, 1, 0);

function isFiniteVector(vector: Vector3): boolean {
  return Number.isFinite(vector.x) && Number.isFinite(vector.y) && Number.isFinite(vector.z);
}

/**
 * Framed height of the character in world units. The model scale is derived from this, which in
 * turn lets the camera frame the subject from a constant alone, without knowing its measured size.
 */
export const SUBJECT_HEIGHT = 5.5;

/**
 * Fraction of the canvas height the subject's world height fills, at every canvas size. Tune this
 * one number to change how large the model reads; replacing the old fixed camera zoom is what
 * keeps that reading identical on mobile (320px tall) and up (420px tall).
 */
export const SUBJECT_FILL = 0.5;

/** The shadow depth pass must reach the top of the character standing on the shadow plane. */
export const SHADOW_FAR = SUBJECT_HEIGHT + 0.5;

/** Vertical travel of the idle float, in world units. */
export const FLOAT_AMPLITUDE = 0.1;

/** Orthographic zoom that makes the subject fill SUBJECT_FILL of a canvas this tall. */
export function zoomForCanvasHeight(canvasHeightPx: number): number {
  // A zero-height canvas happens on the first mount before layout; returning NaN here would
  // poison the projection matrix, so fall back to a finite zoom instead.
  if (!Number.isFinite(canvasHeightPx) || canvasHeightPx <= 0) return 1;
  return (canvasHeightPx * SUBJECT_FILL) / SUBJECT_HEIGHT;
}

/** Orthographic frustum plus zoom, both derived from one measurement of the canvas element. */
export type CanvasFraming = {
  left: number;
  right: number;
  top: number;
  bottom: number;
  zoom: number;
};

/**
 * Derives the whole orthographic setup from a single measurement of the canvas element.
 *
 * The zoom and the frustum must come from the same height. Splitting them across two sources is what
 * let a stale R3F `size` halve the zoom while the element was at its real height, rendering the model
 * at half scale and off centre. Returns null for a non-finite or non-positive box so no degenerate
 * projection ever reaches a matrix.
 */
export function framingForCanvas(width: number, height: number): CanvasFraming | null {
  if (!Number.isFinite(width) || !Number.isFinite(height)) return null;
  if (width <= 0 || height <= 0) return null;
  return {
    left: -width / 2,
    right: width / 2,
    top: height / 2,
    bottom: -height / 2,
    zoom: zoomForCanvasHeight(height),
  };
}

export type VoxelLayout =
  | { ok: true; center: Vector3; scale: number; floorY: number; missing: readonly string[] }
  | { ok: false; reason: 'empty' | 'degenerate' | 'invalid-height'; missing: readonly string[] };

/**
 * Measures the subject subtrees of a loaded scene.
 *
 * The whole scene is cloned first: `clone(true)` preserves every ancestor transform, gives a root
 * whose world matrix equals its local matrix, and never reparents nodes out of the scene that
 * `useGLTF` caches globally. Measuring the live scene instead would express the box in whatever
 * frame R3F had already attached it to, and pulling the nodes into a fresh group would drop the
 * transforms between the scene root and the subject.
 */
export function measureSubject(
  scene: Object3D,
  names: readonly string[],
): { box: Box3; missing: string[] } {
  const probe = scene.clone(true);
  probe.updateMatrixWorld(true);
  return measureNodes(probe, names);
}

/** Union of the named subtrees of an already-cloned probe, reporting the names it could not find. */
function measureNodes(probe: Object3D, names: readonly string[]): { box: Box3; missing: string[] } {
  const box = new Box3();
  const missing: string[] = [];
  for (const name of names) {
    const node = probe.getObjectByName(name);
    if (!node) {
      missing.push(name);
      continue;
    }
    // precise = true: iterate the actual vertices, matching drei's <Center> default.
    box.union(new Box3().setFromObject(node, true));
  }
  return { box, missing };
}

export type CompositionMeasurement = {
  subject: Box3;
  body: Box3;
  assembly: Box3;
  missing: string[];
};

/**
 * Measures subject, tail-less body and the whole assembly in one clone. The single clone keeps the
 * `measureSubject` guarantee (never mutate or reparent the `useGLTF` cache) and avoids cloning the
 * scene once per box; the assembly box is read off that same clone, never off the live scene.
 */
export function measureComposition(scene: Object3D): CompositionMeasurement {
  const probe = scene.clone(true);
  probe.updateMatrixWorld(true);
  const subject = measureNodes(probe, SUBJECT_NODES);
  const body = measureNodes(probe, BODY_NODES);
  return {
    subject: subject.box,
    body: body.box,
    assembly: new Box3().setFromObject(probe, true),
    missing: subject.missing,
  };
}

/**
 * Model-space composition aim: the midpoint between the tail-less body centre and the whole
 * assembly centre. The body is read without `Cola` on purpose: the tail was what dragged the
 * subject box off the animal, and centring on the body alone would split the cat from its tail.
 * Returns null when either box carries no finite geometry, so callers can fall back to no shift.
 */
export function compositionAim(bodyBox: Box3, assemblyBox: Box3): Vector3 | null {
  if (bodyBox.isEmpty() || assemblyBox.isEmpty()) return null;
  const bodyCenter = bodyBox.getCenter(new Vector3());
  const assemblyCenter = assemblyBox.getCenter(new Vector3());
  const aim = bodyCenter.add(assemblyCenter).multiplyScalar(0.5);
  return isFiniteVector(aim) ? aim : null;
}

/**
 * World-space translation that lands the model-space composition aim on the group origin, given the
 * layout centre, the scale and the yaw: `-R_y(yaw) * scale * (aim - center)`. That negation is what
 * places the aim where the camera already looks, without moving the camera or its controls.
 * Returns null for any non-finite input or result, so no NaN can reach a matrix.
 */
export function compositionShift(
  aim: Vector3,
  center: Vector3,
  scale: number,
  yaw: number = SUBJECT_YAW,
): Vector3 | null {
  if (
    !Number.isFinite(scale) ||
    !Number.isFinite(yaw) ||
    !isFiniteVector(aim) ||
    !isFiniteVector(center)
  ) {
    return null;
  }
  const shift = aim.clone().sub(center).multiplyScalar(scale).applyAxisAngle(Y_AXIS, yaw).negate();
  return isFiniteVector(shift) ? shift : null;
}

/** Derives pivot correction, scale and floor height from a measured subject box. */
export function deriveLayout(
  box: Box3,
  subjectHeight: number,
  missing: readonly string[] = [],
): VoxelLayout {
  if (box.isEmpty()) return { ok: false, reason: 'empty', missing };
  // The numerator is as load-bearing as the denominator: a zero height collapses the model onto a
  // singular matrix, and a non-finite one leaves NaN in both scale and floorY.
  if (!Number.isFinite(subjectHeight) || subjectHeight <= 0) {
    return { ok: false, reason: 'invalid-height', missing };
  }
  const size = box.getSize(new Vector3());
  // Every axis, not just y: a NaN x or z extent would still yield a finite-looking height and then
  // hand a non-finite centre to the pivot, which is the failure this guard exists to prevent.
  const finite = Number.isFinite(size.x) && Number.isFinite(size.y) && Number.isFinite(size.z);
  if (!finite || size.y <= 0) return { ok: false, reason: 'degenerate', missing };
  const center = box.getCenter(new Vector3());
  const scale = subjectHeight / size.y;
  // Model y = 0 is where the desk and the paws rest. Once the subject is centred and scaled, that
  // plane lands here, which is where the contact shadow has to sit to read as a floor.
  return { ok: true, center, scale, floorY: -center.y * scale, missing };
}
