import { useEffect, useRef, useState, useCallback } from 'react';

export type CameraError = 'denied' | 'no-camera' | 'insecure' | null;

export function useCamera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<CameraError>(null);
  const [ready, setReady] = useState(false);

  const startCamera = useCallback(async () => {
    if (streamRef.current) return;

    if (location.protocol !== 'https:' && location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
      setError('insecure');
      return;
    }

    if (!navigator.mediaDevices?.getUserMedia) {
      setError('no-camera');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
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

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setReady(false);
  }, []);

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  return { videoRef, error, ready, startCamera, stopCamera };
}
