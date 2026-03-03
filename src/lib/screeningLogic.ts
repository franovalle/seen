export interface VisionPreset {
  zoom: number;
  contrast: number;
  brightness: number;
}

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
  lastRowPassed: number;
  level: VisionLevel;
  preset: VisionPreset;
}

const STORAGE_KEY = 'seen-screening-result';

export function calculatePresetFromRow(lastRowPassed: number): { level: VisionLevel; preset: VisionPreset } {
  if (lastRowPassed <= 2) return { level: 'Significant', preset: { zoom: 3.5, contrast: 250, brightness: 130 } };
  if (lastRowPassed <= 4) return { level: 'Moderate', preset: { zoom: 2.0, contrast: 180, brightness: 120 } };
  return { level: 'Mild', preset: { zoom: 1.2, contrast: 110, brightness: 100 } };
}

export const NEAR_PRESET: VisionPreset = { zoom: 1.5, contrast: 200, brightness: 110 };
export const FAR_PRESET: VisionPreset = { zoom: 3.0, contrast: 150, brightness: 105 };

export function saveScreeningResult(result: ScreeningResult): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(result));
}

export function loadScreeningResult(): ScreeningResult | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function clearScreeningResult(): void {
  localStorage.removeItem(STORAGE_KEY);
}
