import { useEffect, useRef, useCallback } from 'react';

interface UseAmbientLightOptions {
  onBrightnessChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function useAmbientLight({ onBrightnessChange, min = 80, max = 140 }: UseAmbientLightOptions) {
  const pausedUntil = useRef(0);

  const pauseForManualOverride = useCallback(() => {
    pausedUntil.current = Date.now() + 3000;
  }, []);

  useEffect(() => {
    if (!('AmbientLightSensor' in window)) return;

    try {
      const sensor = new (window as any).AmbientLightSensor();
      sensor.addEventListener('reading', () => {
        if (Date.now() < pausedUntil.current) return;
        const lux: number = sensor.illuminance;
        // Map lux (0-1000+) to brightness range
        const normalized = Math.min(Math.max(lux / 500, 0), 1);
        const brightness = Math.round(min + normalized * (max - min));
        onBrightnessChange(brightness);
      });
      sensor.addEventListener('error', () => {});
      sensor.start();
      return () => sensor.stop();
    } catch {
      // Silently unsupported
    }
  }, [onBrightnessChange, min, max]);

  return { pauseForManualOverride };
}
