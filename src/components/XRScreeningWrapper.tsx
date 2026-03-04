import React, { useEffect, useState, useRef } from 'react';
import VisionScreening from '@/components/VisionScreening';

const XRScreeningWrapper: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [xrSupported, setXrSupported] = useState<boolean | null>(null);
  const storeRef = useRef<any>(null);
  const xrModulesRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        if (!navigator.xr) {
          if (!cancelled) setXrSupported(false);
          return;
        }
        const supported = await navigator.xr.isSessionSupported('immersive-ar');
        if (!cancelled) setXrSupported(supported);

        if (supported) {
          const [xrModule] = await Promise.all([
            import('@react-three/xr'),
          ]);
          if (!cancelled) {
            xrModulesRef.current = xrModule;
            storeRef.current = xrModule.createXRStore({ domOverlay: true });
          }
        }
      } catch {
        if (!cancelled) setXrSupported(false);
      }
    })();

    return () => { cancelled = true; };
  }, []);

  const handleStartTest = () => {
    if (storeRef.current) {
      try {
        storeRef.current.enterAR();
      } catch {
        // Silent fallback
      }
    }
  };

  const handleComplete = () => {
    if (storeRef.current) {
      try {
        storeRef.current.exitAR?.();
      } catch {
        // Ignore
      }
    }
    onComplete();
  };

  // Still loading XR check
  if (xrSupported === null) {
    return <VisionScreening onComplete={onComplete} />;
  }

  // XR not supported — direct fallback
  if (!xrSupported || !storeRef.current) {
    return <VisionScreening onComplete={onComplete} />;
  }

  // XR supported — render with Canvas + XR session
  const XR = xrModulesRef.current?.XR;

  return (
    <>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <XRCanvas store={storeRef.current} XR={XR} />
      </div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <VisionScreening onComplete={handleComplete} onStartTest={handleStartTest} />
      </div>
    </>
  );
};

/** Lazy-rendered Canvas with XR — avoids top-level import of R3F */
const XRCanvas: React.FC<{ store: any; XR: any }> = ({ store, XR }) => {
  const [Canvas, setCanvas] = useState<any>(null);

  useEffect(() => {
    import('@react-three/fiber').then((mod) => setCanvas(() => mod.Canvas));
  }, []);

  if (!Canvas || !XR) return null;

  return (
    <Canvas style={{ background: 'transparent' }}>
      <XR store={store} />
    </Canvas>
  );
};

export default XRScreeningWrapper;
