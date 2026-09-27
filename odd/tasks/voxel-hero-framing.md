# voxel-hero-framing

Feature document (Organic Driven Development). Recovered on resume from this file plus the
Engram mirror `odd/voxel-hero-framing/tasks`.

## Objective

Make the hero 3D scene (`VoxelCanvas` / `VoxelModel`, `public/models/kitty.glb`) frame itself
correctly at any canvas size, fail observably instead of silently, and make its framing
measurable instead of hand-checked.

## Problem

- Phase 1+2 (done, reviewed, authority burned) fixed the centring itself. What remains is the
  coupling between a hardcoded camera `zoom={30}` and a canvas that is `320px` tall on mobile
  and `420px` on `sm+`, so the subject's relative size silently changes per breakpoint.
- Nothing fails observably when the asset stops matching the code, and the framing invariant had
  no executable assertion. Both were raised by the native review of Phase 1+2 as advisory
  findings (`R3-layout-degenerate`, `R3-framing-unproved`) plus one fragility note
  (`R3-measure-space`).
- A model load failure currently escalates to the app-level `ErrorBoundary`, whose fallback is a
  full-page "Oops!" — a broken decorative hero would take the whole layout down.

## Why

Approved as Phase 3 of the corrective plan for the hero model framing. Phase 4 (PWA precache of
`.glb` + asset optimisation) stays out of scope here.

## Scope

In: `src/components/canvas/voxelFraming.ts` (new), `src/components/canvas/VoxelModel.tsx`,
`src/components/canvas/VoxelCanvas.tsx`, `src/components/common/ErrorBoundary.tsx`,
`tests/voxelFraming.test.ts` (new), `package.json` (test script only).

Out: the `.glb` asset itself, PWA/workbox config, camera angle, lighting, `OrbitControls` feel,
and the pre-existing unrelated lint warnings in `HeroMinimal.tsx` / `HeaderMinimal.tsx` /
`PortfolioContext.tsx` / `ScrollSpyNav.tsx`.

## Constraints

- Artifacts in English; user-facing chat in Spanish.
- No new runtime dependencies. Tests use `bun test` (already installed) so no `vitest` install.
- The reviewed-and-approved Phase 1+2 behaviour must not regress: subject bbox centred on the
  group origin, invariance under zoom, shadow plane on the model floor.
- No commit without an explicit request: the worktree already carries the user's own uncommitted
  `dog.glb -> kitty.glb` work in these same files.

## Tasks

| ID | Task | Route | Trigger evidence | Status |
|----|------|-------|------------------|--------|
| T3.1 | Extract pure framing math + constants into `voxelFraming.ts` | inline | new single-file module, design already resolved | done |
| T3.2 | Derive orthographic zoom from canvas height (`zoomForCanvasHeight`) | inline | same file, same unit of work | done |
| T3.3 | Measure subject through a detached scene clone (kills `R3-measure-space`) | inline | design resolved from the review findings | done |
| T3.4 | Guard degenerate measurement (no `Infinity`/`NaN`, observable log) | inline | same unit of work as T3.3 | done |
| T3.5 | Local error boundary for the canvas (no full-page Oops on asset failure) | inline | 3-line addition to a shared component | done |
| T3.6 | `bun test` regression tests for T3.1-T3.4 + `test` script | inline | new test file, zero deps | done |
| T3.7 | Verify: `tsc`, `oxlint`, `bun test`, `bun run build`, numeric framing check | inline | parent-run checks | done |
| T3.8 | Fix the 3 advisory findings of the Phase 3 review (tautological test, pin that never read the `.glb`, guard that only checked y) | inline | precisely-scoped fixes named by the review | done |

Delegation note: routed inline, not delegated. The changes are one new pure module plus edits to
three already-understood files, and the whole design (constants, box math, projection basis)
lives in this session's analysis; a fresh-context writer would have needed a longer spec than the
diff. No SDD, research, or durable proposal artifacts were created for organic work.

## Acceptance criteria

1. The subject's world height fills the same fraction of the canvas height at every breakpoint:
   `SUBJECT_HEIGHT / (canvasHeight / zoom) == SUBJECT_FILL`.
2. With the derived zoom, the projected model still fits inside the canvas with margin at
   `650x320` and `650x420`, and at a narrow `375x320` viewport.
3. An empty or zero-height subject box yields `ok: false` — never `Infinity`/`NaN` in `scale`,
   pivot or `floorY` — and the component logs instead of applying it.
4. Measuring does not reparent or mutate the cached glTF scene.
5. A missing subject node name is reported, and a nested subject node is measured including its
   ancestor transforms.
6. Phase 1+2 invariants hold: subject box centre projects to `(0.00, 0.00)` and the shadow plane
   sits on the model floor.
7. `tsc --noEmit`, `oxlint`, `bun test` and `bun run build` all pass.

## Progress and evidence

- T3.1-T3.6 written and T3.7 verified. Review of that candidate: **approved** (lineage
  `review-5bccda17e3e1641f`, authority burned) with three advisory findings, all non-blocking.
- T3.8 addressed all three:
  - `R3-T1` (tautological test): the placement test now assembles the component's real group nesting
    (pivot group inside the rotated/scaled group) and asserts that an off-centre point lands where
    translate + scale + rotate put it. Sensitivity proven: with the pivot the box centre sits
    `0.0000` from the group origin; with the pivot removed it sits `3.1873` away, so the assertion
    can fail.
  - `R3-T2` (pin never read the asset): the pin now reads `public/models/kitty.glb` from disk,
    rebuilds real meshes from its BIN chunk and runs the shipped `measureSubject` on it, so a
    re-export with different proportions fails the test.
  - `R3-T3` (guard only checked y): `deriveLayout` now validates every size axis, so a non-finite
    x or z extent is rejected instead of producing a non-finite pivot.
- Evidence: `bun test` **13/13 pass**; `tsc --noEmit` exit 0; `oxlint` exit 0 (5 pre-existing
  warnings in untouched files); `bun run build` exit 0; numeric framing check
  (`/tmp/opencode/verify-framing-phase3.mjs`) **ALL CHECKS PASS** — subject box centre
  `(0.000000, 0.000000)` px and 50.0% of canvas height at `650x320`, `650x420` and `375x320`,
  full model inside the canvas with margin, `floorY = -2.750000`.
- Measured shipped-asset numbers now pinned in the tests: subject box
  `(-0.16875, 0, -0.0125) .. (0.18125, 0.682981, 0.4125)`, `scale 8.052938`.
- Files: `src/components/canvas/voxelFraming.ts`, `tests/voxelFraming.test.ts`,
  `src/components/canvas/VoxelModel.tsx`, `src/components/canvas/VoxelCanvas.tsx`,
  `src/components/common/ErrorBoundary.tsx`, `package.json`.

## Next step

Committed and reviewed. Work units:

| Commit | Contents | Authored lines | Native review |
|--------|----------|----------------|---------------|
| `d96d58e` | `voxelFraming.ts` + `tests/voxelFraming.test.ts` + `test` script | 358 | **approved**, authority burned (lineage `review-040ea2d25b4d9e3e`), 3 advisory findings |
| `fc2d0fc` | `VoxelModel.tsx` + `VoxelCanvas.tsx` + `ErrorBoundary.tsx` + `kitty.glb` + `vite.config.js` precache | 168 | **no verdict**: the reviewer task returned empty twice (runtime transport); transaction `review-e8312ce0b4f52376` left open |

Slice boundaries for a chained PR: slice A (`d96d58e`) then slice B (`fc2d0fc`), each under the
400-line delivery budget. Nothing is pushed; `odd/` is deliberately untracked and was excluded
from both commits and both review candidates.

Open advisory findings from slice A (separate later work, not blockers):
`R3-subject-height-unvalidated` (validate the `subjectHeight` numerator, not only the box),
`R3-zoom-fallback-unasserted` (assert the fallback zoom is positive, not merely finite),
`R3-mutation-assertion-tautological` (the mutation test compares identity to identity).

Still pending: the Phase 4 asset work (palette atlas + mipmap filter, needs Blockbench or an
extra tool), removing the dead 143 KB `public/models/dog.glb`, and abandoning the three
verdict-less transactions (`review-4e3cc2c225223ef1`, `review-f8f71d37c3fb0efb`,
`review-e8312ce0b4f52376`).

Separately, and not a product defect: the reviewer task received hand-assembled candidate
contexts instead of only the provider prompt, and some of those were demonstrably fabricated.
Verdicts produced from a reconstructed context carry that caveat; slices with no verdict are
simply unreviewed.

### Third work unit: the three slice-A findings

`a80345f` closes all three advisory findings of the slice-A review:

- `R3-subject-height-unvalidated`: `deriveLayout` now rejects a non-finite or non-positive
  `subjectHeight` with its own `invalid-height` reason, so a zero height can no longer collapse
  the model onto a singular matrix.
- `R3-zoom-fallback-unasserted`: the degenerate-canvas test now asserts the fallback zoom is
  positive, not merely finite.
- `R3-mutation-assertion-tautological`: the mutation test gives the scene non-identity transforms,
  updates the world matrix before snapshotting and pins the expected translation, so an
  implementation that reparents or rewrites matrices fails it.

Verified: `bunx tsc --noEmit` exit 0; `bun test` 14 pass / 0 fail; `oxlint` exit 0.

| Commit | Contents | Authored lines | Native review |
|--------|----------|----------------|---------------|
| `d96d58e` | framing math + its test suite + `test` script | 358 | **approved**, authority burned (`review-040ea2d25b4d9e3e`), 3 advisory findings |
| `fc2d0fc` | components + `kitty.glb` + workbox precache | 168 | no verdict: reviewer task empty (transaction `review-e8312ce0b4f52376` open) |
| `a80345f` | fixes for the three findings above | 31 | no verdict: reviewer task empty (transaction `review-600a0e0fef0658fc` open) |

Slice boundaries for a chained PR: A `d96d58e`, B `fc2d0fc`, C `a80345f`, each under the 400-line
budget. Opening a PR is the owner's decision.

## Pending (not done in this work unit)

1. **Phase 4 asset work.** Palette atlas (11 materials and 11 textures down to 1-2) and a
   mipmapped `minFilter` to stop the shimmer when the subject renders small. Needs Blockbench for
   a re-export or an extra tool such as `@gltf-transform/cli`; both mutate `public/models/kitty.glb`,
   so they are the owner's call. The PWA half of Phase 4 is done: `glb` joined
   `workbox.globPatterns` in `fc2d0fc` and the built `dist/sw.js` precaches the model.
2. **Dead asset.** `public/models/dog.glb` (143 KB) is still copied into `dist/` and nothing has
   referenced it since Phase 1+2 replaced it with `kitty.glb`. Delete it.
3. **`odd/` tracking.** This document was untracked and excluded from every commit and every
   review candidate. Decide whether it belongs in the repository.
4. **Verdict-less review transactions** to release with `gentle-ai review abandon` (a maintainer
   action): `review-4e3cc2c225223ef1`, `review-f8f71d37c3fb0efb`, `review-e8312ce0b4f52376`,
   `review-600a0e0fef0658fc`.
5. **Native review debt.** `fc2d0fc` and `a80345f` have no native verdict: the reviewer task
   returned empty for both ranges. Their evidence of record is the self-verification above.
6. **Review transport discipline.** Reviewer tasks must receive only the provider
   `provider_task.prompt`. Hand-assembled candidate contexts were passed instead, and at least one
   of them was demonstrably fabricated, so verdicts produced from a reconstructed context carry
   that caveat. A trustworthy native verdict for `fc2d0fc` and `a80345f` should be obtained from a
   session where the reviewer task transport is healthy.
