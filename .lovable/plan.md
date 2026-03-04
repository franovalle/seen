

# Add WebXR Camera Session to Vision Screening

## Dependencies

| Package | Version |
|---------|---------|
| `three` | `^0.133.0` |
| `@react-three/fiber` | `^8.18.0` |
| `@react-three/xr` | `^6.0.0` |

Pinning `@react-three/xr` to `^6.0.0` per user guidance to avoid unstable latest.

## File Changes

### 1. New: `src/components/XRScreeningWrapper.tsx`

Wrapper component that:
- Checks `navigator.xr?.isSessionSupported('immersive-ar')` on mount
- If supported: renders a minimal `<Canvas>` with `<XR>` from a `createXRStore({ domOverlay: true })`, and passes an `onStartTest` callback to `VisionScreening` that calls `store.enterAR()` on the user's button tap
- If not supported: renders `<VisionScreening>` directly — silent fallback, no error
- On completion, exits AR session and calls `onComplete()`

### 2. Edit: `src/components/VisionScreening.tsx`

- Add optional `onStartTest?: () => void` prop
- In the intro phase, when "Start Screening" is tapped, call `onStartTest?.()` before `setPhase('test')`
- No other changes

### 3. Edit: `src/pages/Index.tsx`

- Import `XRScreeningWrapper` instead of `VisionScreening`
- Render `<XRScreeningWrapper onComplete={...} />` for the screening phase

## No Changes To

All other files remain untouched — branding, colors, logo, GlassesView, hooks, screeningLogic, InfoOverlay, README.

