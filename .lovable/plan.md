

# Accessibility Audit — Findings and Fix Plan

## Issues Found

### 1. ALT TEXT
| Location | Issue |
|----------|-------|
| `VisionScreening.tsx` — ArmLengthIcon SVG | No accessible label. Needs `role="img"` + `aria-label` |
| `GlassesView.tsx` — `<video>` element | No accessible label for camera feed. Needs `aria-label` |
| `LensOverlay.tsx` — decorative border div | Missing `aria-hidden="true"` |

### 2. READING LEVEL (above Grade 8)
| Location | Current Text | Simplified |
|----------|-------------|------------|
| `InfoOverlay.tsx` | "vision correction is inaccessible or unaffordable" | "glasses are hard to find or too expensive" |
| `InfoOverlay.tsx` | "consult an eye care professional for proper vision care" | "please see an eye doctor for a full check-up" |
| `InfoOverlay.tsx` | "assistive clarity tool" | "a tool to help you see more clearly" |
| `InfoOverlay.tsx` | "Recalibrate Vision" button | "Redo Vision Check" |
| `BottomSheet.tsx` | "Assistive clarity tool only. Not a medical device." | "This tool helps you see more clearly. It is not a medical device." |
| `GlassesView.tsx` | "enable camera access in your browser settings" | "turn on camera access in your browser settings" |
| `VisionScreening.tsx` | "not a replacement for a full eye exam" | "it does not replace a full eye exam" |

### 3. WCAG AA COLOR CONTRAST
| Issue | Detail |
|-------|--------|
| `--foreground` (hsl 22,76%,60%) on `--background` (hsl 30,33%,96%) | Orange on cream ≈ 3:1. **Fails 4.5:1.** Darken foreground to ~40% lightness |
| `--muted-foreground` (hsl 22,40%,50%) on background | ≈ 3.5:1. **Fails 4.5:1.** Darken to ~35% lightness |
| `BottomSheet.tsx` text-[10px] disclaimer | Below minimum readable size. Increase to text-xs (12px) |
| `--primary` same as foreground | Also fails on light background for non-button text uses |

**Fix:** Darken `--foreground` to `22 76% 38%` and `--muted-foreground` to `22 40% 35%`. This preserves the warm orange/brown hue but passes 4.5:1. Update both light and dark theme blocks. Primary/accent stay for button backgrounds where foreground is the light cream (that pairing passes).

### 4. DESCRIPTIVE LINK TEXT
| Location | Current | Fix |
|----------|---------|-----|
| `GlassesView.tsx` info button | `aria-label="Info"` | `aria-label="About SEEn"` |
| `BottomSheet.tsx` Reset button | "Reset" | "Reset Settings" |
| `VisionScreening.tsx` result button | "Let's Go" | "Continue to Camera View" |

### 5. MOBILE FRIENDLY (375px)
| Location | Issue | Fix |
|----------|-------|-----|
| `BottomSheet.tsx` Reset button | `h-10` (40px) — below 44px minimum | Change to `h-11` (44px) |
| `GlassesView.tsx` Near/Far toggle buttons | `py-2.5` — computed ~36px. Below 44px | Add `min-h-[44px]` |
| `InfoOverlay.tsx` buttons | `h-11` (44px) — passes | No change |
| `BottomSheet.tsx` disclaimer | `text-[10px]` too small on mobile | `text-xs` (12px) |

---

## File Changes

### 1. `src/index.css` — Fix contrast ratios
- `--foreground`: `22 76% 60%` → `22 76% 38%` (both light and dark blocks)
- `--card-foreground`, `--popover-foreground`: same change (they mirror foreground)
- `--muted-foreground`: `22 40% 50%` → `22 40% 35%` (both blocks)
- `--secondary-foreground`, `--sidebar-foreground`, `--sidebar-accent-foreground`: update to match foreground

### 2. `src/components/VisionScreening.tsx`
- ArmLengthIcon SVG: add `role="img"` and `aria-label="Person holding phone at arm's length"`
- Result "Let's Go" → "Continue to Camera View"
- Result disclaimer: "is not a replacement for" → "does not replace"

### 3. `src/components/GlassesView.tsx`
- `<video>`: add `aria-label="Live camera feed"`
- Info button: `aria-label="Info"` → `aria-label="About SEEn"`
- Camera denied text: "enable" → "turn on"
- Near/Far toggle buttons: add `min-h-[44px]`

### 4. `src/components/BottomSheet.tsx`
- Reset button: `h-10` → `h-11`, label "Reset" → "Reset Settings"
- Disclaimer: `text-[10px]` → `text-xs`, simplify text

### 5. `src/components/InfoOverlay.tsx`
- Simplify all description text to Grade 8 reading level
- "Recalibrate Vision" → "Redo Vision Check"

### 6. `src/components/LensOverlay.tsx`
- Add `aria-hidden="true"` to the decorative overlay container

No changes to branding, logo, layout structure, screening logic, or any other files.

