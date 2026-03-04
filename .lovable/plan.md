

# Fix: Upgrade three.js to resolve build error

The build fails because `@react-three/xr@^6.0.0` (via `@pmndrs/xr`) imports `SRGBColorSpace` which was added in three.js r152. The current `three@^0.133.0` is too old.

## Fix

Upgrade `three` from `^0.133.0` to `^0.150.0` (will resolve to ~0.175.x which includes `SRGBColorSpace`). No code changes needed — the existing `XRScreeningWrapper.tsx`, `VisionScreening.tsx`, and `Index.tsx` remain as-is.

If the upgrade still fails, fallback plan: remove all XR dependencies and revert the three files.

## File Changes

### 1. `package.json` — dependency update only
- `three`: `^0.133.0` → `^0.150.0`

No other file changes.

