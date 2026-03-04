

# SEEn — Complete Build Plan

## Mission
A mobile web AR/XR assistive tool that turns any smartphone into free personalized glasses for girls and women in communities where vision correction is inaccessible or unaffordable.

---

## Design System

- **Background**: Cream `#FAF7F2` everywhere
- **Text & accents**: Warm coral orange `#E8834A` — all text, buttons, sliders, lens overlay, CTAs
- **Frosted glass**: `rgba(250,247,242,0.85)` + `backdrop-filter: blur(12px)`
- **Typography**: Nunito (Google Font), bold and rounded
- **Logo**: Uploaded image (`Peach_and_Beige_Playful_Art_Gallery_Logo.png`) saved as `src/assets/seen-logo.png` — used as wordmark on both screens, no text recreation
- **No plum, no purple, no white backgrounds — cream and coral only**

---

## Architecture

Single-page React app. **No router.** State toggle (`screening` | `glasses`) in `Index.tsx`. Camera stream persists across transitions. No page reloads.

---

## Screen 1 — Vision Screening (`src/components/VisionScreening.tsx`)

- **Logo image** centered at top (~200px wide)
- **Tagline** below logo: "LOW-COST EYEGLASSES. ACCESSIBLE FOR HER." — small caps, coral orange, letter-spaced
- **4-step Snellen-style test**: letters at decreasing sizes (72px → 48px → 32px → 20px)
- **3 buttons per step**: Yes / Somewhat / No
- **Progress indicator** showing current step
- **Scoring**: Yes=0, Somewhat=1, No=2. Sum all 4 (range 0–8):
  - 0–2 (mild): zoom 1.2×, contrast 110%, brightness 100%
  - 3–5 (moderate): zoom 2.0×, contrast 180%, brightness 120%
  - 6–8 (significant): zoom 3.5×, contrast 250%, brightness 130%
- **Medical disclaimer**: "This is not a medical diagnosis. SEEn is an assistive clarity tool only."
- **"Start Seeing" CTA** in coral orange → saves results to `localStorage`, transitions to glasses screen

---

## Screen 2 — AR Glasses View (`src/components/GlassesView.tsx`)

### Top Bar (floating)
- **Logo image** top left (~80px wide)
- **Circular info/help icon** top right → opens `InfoOverlay`

### Camera Feed (full screen, edge-to-edge)
- `getUserMedia({ video: true })` — no `facingMode` constraint
- Video element: `filter: contrast(x%) brightness(y%)`
- Video inside `overflow: hidden` container: `transform: scale(z)` for zoom
- Settings auto-loaded from screening results on first use

### Lens Frame Overlay (`src/components/LensOverlay.tsx`)
- Coral orange rounded rectangle border (`#E8834A`, ~3px, border-radius ~24px), always centered
- Gyroscope parallax: `DeviceOrientationEvent` shifts overlay ±10px via `transform: translate()`
- Silent fallback if unsupported

### Near/Far Mode Toggle (above bottom sheet)
- **📖 Near**: zoom 1.5×, contrast 200%, brightness 110%
- **🏫 Far**: zoom 3.0×, contrast 150%, brightness 105%
- Loads preset values; user can still fine-tune sliders manually

### Bottom Sheet (`src/components/BottomSheet.tsx`) — frosted glass, always visible
- **Zoom slider**: 1.0× – 4.0×
- **Contrast slider**: 100% – 300%
- **Brightness slider**: 80% – 140%
- Large readable value label next to each slider
- **Reset button** (coral orange) — returns sliders to current mode defaults
- **Disclaimer**: "Assistive clarity tool only. Not a medical device."

### Ambient Light Auto-Adjust (`src/hooks/useAmbientLight.ts`)
- `AmbientLightSensor` API, silent fallback if unsupported
- Auto-adjusts brightness value → **slider thumb and value label sync in real time**
- **3-second manual override cooldown**: when user drags brightness slider, sensor pauses for 3s before resuming

### Info Overlay (`src/components/InfoOverlay.tsx`)
- Mission explanation text
- **"Recalibrate Vision" link** — clears `localStorage`, returns to screening screen

---

## Error Handling
- Camera permission denied → friendly message + instructions to enable
- No camera detected → helpful fallback message
- Insecure origin (non-HTTPS) → clear warning
- Unsupported sensor APIs → silently skipped, no errors shown

---

## Files to Create

| File | Purpose |
|------|---------|
| `src/assets/seen-logo.png` | Uploaded logo image |
| `src/lib/screeningLogic.ts` | Scoring algorithm, presets, localStorage helpers |
| `src/hooks/useCamera.ts` | getUserMedia wrapper + error states |
| `src/hooks/useAmbientLight.ts` | AmbientLightSensor + cooldown logic |
| `src/hooks/useGyroscope.ts` | DeviceOrientationEvent → ±10px offset |
| `src/components/VisionScreening.tsx` | Screen 1 |
| `src/components/GlassesView.tsx` | Screen 2 |
| `src/components/LensOverlay.tsx` | Coral lens frame + parallax |
| `src/components/BottomSheet.tsx` | Frosted glass sliders panel |
| `src/components/InfoOverlay.tsx` | Mission + recalibrate link |

## Files to Modify

| File | Change |
|------|--------|
| `index.html` | Add Nunito font link, update title to "SEEn" |
| `src/index.css` | Cream/coral CSS variables, frosted glass utility |
| `src/pages/Index.tsx` | State toggle between VisionScreening and GlassesView |

---

## Accessibility
- All touch targets ≥ 44×44px
- High-contrast labels (coral on cream meets WCAG AA 4.5:1)
- Large, readable slider values
- Fully visual — no audio required

## Not Included
No login, backend, database, recording, AI/ML, multi-page navigation, analytics, or decorative animations over the camera feed.

