import { useEffect, useState } from 'react';

interface GyroOffset {
  x: number;
  y: number;
}

export function useGyroscope(): GyroOffset {
  const [offset, setOffset] = useState<GyroOffset>({ x: 0, y: 0 });

  useEffect(() => {
    if (!('DeviceOrientationEvent' in window)) return;

    const handler = (e: DeviceOrientationEvent) => {
      const gamma = e.gamma ?? 0; // left-right tilt (-90 to 90)
      const beta = e.beta ?? 0;   // front-back tilt (-180 to 180)
      const x = Math.max(-10, Math.min(10, gamma / 4.5));
      const y = Math.max(-10, Math.min(10, (beta - 45) / 4.5));
      setOffset({ x, y });
    };

    // Request permission on iOS 13+
    const doe = DeviceOrientationEvent as any;
    if (typeof doe.requestPermission === 'function') {
      doe.requestPermission().then((response: string) => {
        if (response === 'granted') {
          window.addEventListener('deviceorientation', handler);
        }
      }).catch(() => {});
    } else {
      window.addEventListener('deviceorientation', handler);
    }

    return () => window.removeEventListener('deviceorientation', handler);
  }, []);

  return offset;
}
