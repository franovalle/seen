

# Fix: Reset Settings Button

## Problem

`handleReset` on line 50-52 calls `applyPreset(mode === 'near' ? NEAR_PRESET : FAR_PRESET)`, which applies the Near/Far presets (e.g., zoom 3.0, contrast 150) instead of neutral values.

## Fix

**`src/components/GlassesView.tsx`** — Replace lines 50-52:

```ts
const handleReset = () => {
  setZoom(1.0);
  setContrast(100);
  setBrightness(100);
};
```

Hardcoded neutral values. No reading from `basePreset`, `NEAR_PRESET`, `FAR_PRESET`, or localStorage. One function, one file.

