

# Fix: Blurry Camera Feed

## Root Cause

In `useCamera.ts` line 33, `getUserMedia` only requests `{ facingMode: mode }` with no resolution constraints. The browser defaults to a low resolution (often 640×480), which gets stretched to fill the screen via `object-cover`, causing the blurry look.

The CSS in `GlassesView.tsx` is fine — it already uses `object-cover` and the `transform: scale()` is driven by the zoom slider (not applied at rest unless zoom > 1).

## Fix

**`src/hooks/useCamera.ts`** — Update the video constraints on line 33 to request HD resolution:

```ts
video: {
  facingMode: mode,
  width: { ideal: 1920 },
  height: { ideal: 1080 },
}
```

No other files changed. Flip button and navigation logic untouched.

