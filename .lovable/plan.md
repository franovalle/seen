

# Fix: Camera Feed Color Degradation

## Analysis

The GlassesView.tsx structure is clean — no Three.js canvas or WebXR overlay exists on this screen. The XR canvas only appears during the screening phase. The actual culprits:

1. **CSS `filter` always applied**: Even at `contrast(100%) brightness(100%)`, some mobile browsers run the video through GPU filter processing, causing subtle but visible color degradation. The fix is to apply `filter: none` when values are at defaults.

2. **`frosted-glass` class** uses `backdrop-filter: blur(12px)` on buttons/toggles overlapping the video — this is fine since they're small UI elements, not full overlays.

## Changes — `src/components/GlassesView.tsx` only

**Line 97-98**: Conditionally apply the CSS filter — use `none` when both contrast and brightness are at 100:

```tsx
style={{
  filter: contrast === 100 && brightness === 100
    ? 'none'
    : `contrast(${contrast}%) brightness(${brightness}%)`,
  transform: zoom === 1 ? 'none' : `scale(${zoom})`,
  transformOrigin: 'center center',
}}
```

This ensures at default values, the video element has zero GPU filter processing — pixel-perfect parity with the native camera. When the user adjusts sliders, filters kick in as before.

No changes to useCamera.ts, navigation, AR HUD, flip button, or any other file.

