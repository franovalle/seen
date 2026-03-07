import { useEffect, useRef, useState, useCallback } from 'react';

export type CameraError = 'denied' | 'no-camera' | 'insecure' | null;
export type FacingMode = 'environment' | 'user';

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<CameraError>(null);
  const [ready, setReady] = useState(false);
  const [facingMode, setFacingMode] = useState<FacingMode>('environment');
  const [flipping, setFlipping] = useState(false);

  const startCamera = useCallback(async (mode: FacingMode) => {
    // Stop any existing stream first
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }

    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      setError('insecure');
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('no-camera');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: mode,
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setReady(true);
      }
    } catch (err: any) {
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('denied');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('no-camera');
      } else {
        setError('no-camera');
      }
    }
  }, []);

  const flipCamera = useCallback(async () => {
    setFlipping(true);
    const newMode: FacingMode = facingMode === 'environment' ? 'user' : 'environment';
    try {
      await startCamera(newMode);
      setFacingMode(newMode);
    } catch {
      // Silently fall back to current mode
      await startCamera(facingMode);
    } finally {
      setFlipping(false);
    }
  }, [facingMode, startCamera]);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setReady(false);
  }, []);

  // Initial start
  useEffect(() => {
    startCamera(facingMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  return { videoRef, error, ready, startCamera, stopCamera, facingMode, flipping, flipCamera };
}
