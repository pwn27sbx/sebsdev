import { Box3, type Object3D, Vector3 } from 'three';

/**
 * Character subtrees only. The desk, monitor and mug stay out of the framing: they stretch the
 * bounding box backwards (desk) and forwards (tail), so centring the whole box would shift the
 * cat itself off centre.
 */
export const SUBJECT_NODES = ['Cuerpo', 'Brazos', 'Cola', 'Orejas'] as const;

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
