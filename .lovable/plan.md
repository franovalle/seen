

# Bug Fix: App Skipping Vision Test

## Root Cause

In `src/pages/Index.tsx` (line 9–10), the initial state checks `loadScreeningResult()` from localStorage. If a previous screening result exists, it initializes `screen` to `'glasses'`, bypassing the entire Snellen test flow and jumping straight to the camera view.

```ts
const [screen, setScreen] = useState<Screen>(
  loadScreeningResult() ? 'glasses' : 'screening'  // ← skips test if cached result exists
);
```

## Fix

**File: `src/pages/Index.tsx`** — Always initialize `screen` to `'screening'` so users go through the full flow every session (Welcome → Snellen → Results → Camera). The localStorage result is still saved and loaded by `GlassesView` for the preset values — it just no longer gates the initial route.

Change line 9–11 from:
```ts
const [screen, setScreen] = useState<Screen>(
  loadScreeningResult() ? 'glasses' : 'screening'
);
```
To:
```ts
const [screen, setScreen] = useState<Screen>('screening');
```

No other files changed. `useCamera.ts` untouched.

