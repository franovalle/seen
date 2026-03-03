export interface VisionPreset {
  zoom: number;
  contrast: number;
  brightness: number;
}

export interface ScreeningResult {
  scores: number[];
  totalScore: number;
  preset: VisionPreset;
}

const STORAGE_KEY = 'seen-screening-result';

export const SNELLEN_LETTERS = [
  { letters: 'E F P', size: 72 },
  { letters: 'T O Z', size: 48 },
  { letters: 'L P E D', size: 32 },
  { letters: 'P E C F D', size: 20 },
];

export function calculatePreset(totalScore: number): VisionPreset {
  if (totalScore <= 2) return { zoom: 1.2, contrast: 110, brightness: 100 };
  if (totalScore <= 5) return { zoom: 2.0, contrast: 180, brightness: 120 };
  return { zoom: 3.5, contrast: 250, brightness: 130 };
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
