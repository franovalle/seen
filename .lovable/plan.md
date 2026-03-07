# Add Flip Camera Button

## Changes

### 1. `src/hooks/useCamera.ts` — Add facingMode support

- Add `facingMode` state (`"environment" | "user"`, default `"environment"`)
- Add `flipping` state for loading indicator
- Update `startCamera` to accept and use `facingMode` constraint, remove the early-return guard when `streamRef.current` exists (needed for flip)
- Add `flipCamera()`: stops current tracks, toggles facingMode, calls startCamera with new mode. On error (single-camera device), silently re-start with previous mode
- Export `facingMode`, `flipping`, `flipCamera`

### 2. `src/components/GlassesView.tsx` — Add flip button UI

- Import `SwitchCamera` from `lucide-react`
- Destructure `flipCamera`, `flipping` from `useCamera()`
- Add a 44×44px circular button in the top bar (next to the info button), styled with `bg-[#E8654A] text-white rounded-full shadow-lg`
- When `flipping` is true, show a small "Switching..." label or spin the icon (`animate-spin`)

