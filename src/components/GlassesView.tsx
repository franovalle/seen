import React, { useState, useEffect, useCallback } from 'react';
import seenLogo from '@/assets/seen-logo.png';
import { useCamera } from '@/hooks/useCamera';
import { useAmbientLight } from '@/hooks/useAmbientLight';
import { loadScreeningResult, NEAR_PRESET, FAR_PRESET, type VisionPreset } from '@/lib/screeningLogic';
import LensOverlay from '@/components/LensOverlay';
import BottomSheet from '@/components/BottomSheet';
import InfoOverlay from '@/components/InfoOverlay';
import { Info } from 'lucide-react';

interface Props {
  onRecalibrate: () => void;
}

type Mode = 'near' | 'far';

const GlassesView: React.FC<Props> = ({ onRecalibrate }) => {
  const { videoRef, error, ready, startCamera } = useCamera();
  const [infoOpen, setInfoOpen] = useState(false);

  const result = loadScreeningResult();
  const basePreset = result?.preset ?? { zoom: 1.5, contrast: 150, brightness: 100 };

  const [mode, setMode] = useState<Mode>('near');
  const [zoom, setZoom] = useState(basePreset.zoom);
  const [contrast, setContrast] = useState(basePreset.contrast);
  const [brightness, setBrightness] = useState(basePreset.brightness);

  const handleAmbientBrightness = useCallback((v: number) => {
    setBrightness(v);
  }, []);

  const { pauseForManualOverride } = useAmbientLight({
    onBrightnessChange: handleAmbientBrightness,
  });

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  const applyPreset = (preset: VisionPreset) => {
    setZoom(preset.zoom);
    setContrast(preset.contrast);
    setBrightness(preset.brightness);
  };

  const handleModeChange = (m: Mode) => {
    setMode(m);
    applyPreset(m === 'near' ? NEAR_PRESET : FAR_PRESET);
  };

  const handleReset = () => {
    applyPreset(mode === 'near' ? NEAR_PRESET : FAR_PRESET);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8 text-center">
        <img src={seenLogo} alt="SEEn logo" className="w-36 mb-6" />
        {error === 'denied' && (
          <>
            <h2 className="text-foreground text-xl font-extrabold mb-3">Camera Access Needed</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              SEEn needs your camera to work as your glasses. Please enable camera access in your browser settings and refresh.
            </p>
          </>
        )}
        {error === 'no-camera' && (
          <>
            <h2 className="text-foreground text-xl font-extrabold mb-3">No Camera Found</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We couldn't find a camera on your device. SEEn requires a camera to function.
            </p>
          </>
        )}
        {error === 'insecure' && (
          <>
            <h2 className="text-foreground text-xl font-extrabold mb-3">Secure Connection Required</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              SEEn requires HTTPS to access your camera. Please use a secure connection.
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black">
      {/* Camera feed */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          aria-label="Live camera feed"
          className="w-full h-full object-cover"
          style={{
            filter: `contrast(${contrast}%) brightness(${brightness}%)`,
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        />
      </div>

      {/* Lens overlay */}
      <LensOverlay />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-3 pb-2">
        <img src={seenLogo} alt="SEEn logo" className="h-10" />
        <button
          onClick={() => setInfoOpen(true)}
          className="w-11 h-11 rounded-full frosted-glass flex items-center justify-center border border-border"
          aria-label="Info"
        >
          <Info className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Near/Far toggle */}
      <div className="absolute z-20 left-1/2 -translate-x-1/2" style={{ bottom: 'calc(280px + 8px)' }}>
        <div className="frosted-glass rounded-2xl flex p-1 border border-border">
          <button
            onClick={() => handleModeChange('near')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              mode === 'near'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground'
            }`}
          >
            📖 Near
          </button>
          <button
            onClick={() => handleModeChange('far')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-colors ${
              mode === 'far'
                ? 'bg-primary text-primary-foreground'
                : 'text-foreground'
            }`}
          >
            🏫 Far
          </button>
        </div>
      </div>

      {/* Bottom sheet */}
      <BottomSheet
        zoom={zoom}
        contrast={contrast}
        brightness={brightness}
        onZoomChange={setZoom}
        onContrastChange={setContrast}
        onBrightnessChange={setBrightness}
        onBrightnessManual={pauseForManualOverride}
        onReset={handleReset}
      />

      {/* Info overlay */}
      <InfoOverlay
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        onRecalibrate={onRecalibrate}
      />
    </div>
  );
};

export default GlassesView;
