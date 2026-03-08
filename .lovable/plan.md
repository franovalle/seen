

# Move localStorage Read to useEffect + Add Route Delay

## Changes

### 1. `src/components/GlassesView.tsx`

- Remove the top-level `loadScreeningResult()` call and `basePreset` variable (lines 21-22)
- Initialize `zoom`, `contrast`, `brightness` with neutral defaults (1.0, 100, 100)
- Add a `useEffect` that runs once on mount, calls `loadScreeningResult()`, and if a result exists, applies the preset via `setZoom`, `setContrast`, `setBrightness`

```tsx
// Remove lines 21-22, change lines 25-27 to neutral defaults:
const [zoom, setZoom] = useState(1.0);
const [contrast, setContrast] = useState(100);
const [brightness, setBrightness] = useState(100);

// Add useEffect after state declarations:
useEffect(() => {
  const result = loadScreeningResult();
  if (result?.preset) {
    setZoom(result.preset.zoom);
    setContrast(result.preset.contrast);
    setBrightness(result.preset.brightness);
  }
}, []);
```

### 2. `src/pages/Index.tsx`

- Wrap the `setScreen('glasses')` call in a 100ms `setTimeout` so localStorage write completes before the route change:

```tsx
<XRScreeningWrapper onComplete={() => setTimeout(() => setScreen('glasses'), 100)} />
```

No changes to screeningLogic.ts, VisionScreening.tsx, or XRScreeningWrapper.tsx.

