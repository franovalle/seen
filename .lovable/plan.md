

# Fix: Camera Feed Default Filter Values

## Problem

Line 22 in `GlassesView.tsx` sets the fallback preset to `{ zoom: 1.5, contrast: 150, brightness: 100 }` when no screening result exists. This means the camera feed starts with 150% contrast and 1.5× zoom — making it look degraded compared to the native camera. Even with a screening result, the preset applies non-neutral filters (e.g., contrast 250, zoom 3.5).

The CSS filter on line 98 (`contrast(${contrast}%) brightness(${brightness}%)`) is correct — at 100/100 it's equivalent to no filter. The issue is purely the default values.

## Fix

**`src/components/GlassesView.tsx`** — one change on line 22:

Change the fallback preset from:
```ts
const basePreset = result?.preset ?? { zoom: 1.5, contrast: 150, brightness: 100 };
```
To:
```ts
const basePreset = result?.preset ?? { zoom: 1.0, contrast: 100, brightness: 100 };
```

This ensures that when no screening result is cached, the camera feed renders with zero visual modification — identical to the native camera. When a screening result exists, it still applies the calibrated preset as before.

No other files or elements changed. AR HUD, reticle, flip button, `useCamera.ts`, and navigation all untouched.

