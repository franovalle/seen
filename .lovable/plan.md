

# SEEn — Complete Update Plan (All File Changes)

## 5 Files Changed

---

### 1. `src/assets/seen-logo.png` — REPLACE
Replace with uploaded file `user-uploads://Peach_and_Beige_Playful_Art_Gallery_Logo_1.png`. No import changes needed.

---

### 2. `src/lib/screeningLogic.ts` — REWRITE

**Remove:** `SNELLEN_LETTERS` (4 rows), `calculatePreset(totalScore)`, old `ScreeningResult` interface

**Add:**

```typescript
export const SNELLEN_ROWS = [
  { letters: 'E F P', size: 120 },   // Row 1 ~20/200
  { letters: 'T Z B', size: 80 },    // Row 2 ~20/100
  { letters: 'L P D', size: 48 },    // Row 3 ~20/50
  { letters: 'F E C', size: 32 },    // Row 4 ~20/40
  { letters: 'O T Z', size: 24 },    // Row 5 ~20/30
  { letters: 'P F D', size: 18 },    // Row 6 ~20/20
];

export type VisionLevel = 'Mild' | 'Moderate' | 'Significant';

export interface ScreeningResult {
  lastRowPassed: number; // 0 = failed row 1, 1–6 = last row cleared
  level: VisionLevel;
  preset: VisionPreset;
}

export function calculatePresetFromRow(lastRowPassed: number): { level: VisionLevel; preset: VisionPreset } {
  if (lastRowPassed <= 2) return { level: 'Significant', preset: { zoom: 3.5, contrast: 250, brightness: 130 } };
  if (lastRowPassed <= 4) return { level: 'Moderate', preset: { zoom: 2.0, contrast: 180, brightness: 120 } };
  return { level: 'Mild', preset: { zoom: 1.2, contrast: 110, brightness: 100 } };
}
```

**Keep unchanged:** `VisionPreset`, `NEAR_PRESET`, `FAR_PRESET`, `saveScreeningResult`, `loadScreeningResult`, `clearScreeningResult`

---

### 3. `src/components/VisionScreening.tsx` — REWRITE

Replace entire component with a 3-phase flow managed by local state (`phase: 'intro' | 'test' | 'result'`):

**Phase 1 — Intro:**
- Logo + tagline: "Low-cost eyecare access for her."
- Header: "Quick Vision Check"
- Body: "This short screening helps SEEn set the right display for your eyes. It takes under 60 seconds and is not a medical diagnosis."
- Coral CTA: "Start Screening" (56px height)

**Phase 2 — Test (single pass, both eyes open, 6 rows):**
- Inline SVG icon: stick figure holding phone at arm's length (language-neutral)
- Text: "Hold at arm's length and tap your answer."
- Progress: "Row X of 6" with progress bar
- Letters centered, bold, black on white card
- 3 stacked full-width buttons (56px height):
  - "Read them all clearly" → advance to next row
  - "Got some, not all" → stop, record `lastRowPassed = currentRow - 1`
  - "Couldn't read them" → stop, record `lastRowPassed = currentRow - 1`
- Clears all 6 → `lastRowPassed = 6`
- No back button

**Phase 3 — Result:**
- Header: "Your Display Is Ready"
- Body: "Based on your screening, SEEn has set your display to [level] Clarity Mode. You can adjust your settings anytime in the menu."
- CTA: "Let's Go" (56px) → saves result, calls `onComplete()`
- Disclaimer: "This near vision screening is not a replacement for a full eye exam. Please see an eye care professional for a complete vision assessment."

---

### 4. `src/components/InfoOverlay.tsx` — EDIT (line 24)

Add tagline after "About SEEn" title. Change description to include "Low-cost eyecare access for her." at the start of the mission text.

---

### 5. `README.md` — EDIT (top of file)

Add project description:
```
# SEEn
Low-cost eyecare access for her.

A mobile web AR/XR assistive tool that turns any smartphone into free personalized glasses.
```

---

## No Changes To
`Index.tsx`, `GlassesView.tsx`, `BottomSheet.tsx`, `LensOverlay.tsx`, hooks, `index.css`, `index.html`, or any UI library files.

