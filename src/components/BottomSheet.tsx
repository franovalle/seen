import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import type { VisionPreset } from '@/lib/screeningLogic';

interface Props {
  zoom: number;
  contrast: number;
  brightness: number;
  onZoomChange: (v: number) => void;
  onContrastChange: (v: number) => void;
  onBrightnessChange: (v: number) => void;
  onBrightnessManual: () => void;
  onReset: () => void;
}

const BottomSheet: React.FC<Props> = ({
  zoom, contrast, brightness,
  onZoomChange, onContrastChange, onBrightnessChange,
  onBrightnessManual, onReset,
}) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 frosted-glass rounded-t-3xl px-5 pt-5 pb-6 border-t border-border">
      {/* Zoom */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-foreground text-sm font-bold">Zoom</span>
          <span className="text-foreground text-sm font-extrabold">{zoom.toFixed(1)}×</span>
        </div>
        <Slider
          value={[zoom]}
          min={1.0}
          max={4.0}
          step={0.1}
          onValueChange={([v]) => onZoomChange(v)}
        />
      </div>

      {/* Contrast */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-foreground text-sm font-bold">Contrast</span>
          <span className="text-foreground text-sm font-extrabold">{contrast}%</span>
        </div>
        <Slider
          value={[contrast]}
          min={100}
          max={300}
          step={5}
          onValueChange={([v]) => onContrastChange(v)}
        />
      </div>

      {/* Brightness */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <span className="text-foreground text-sm font-bold">Brightness</span>
          <span className="text-foreground text-sm font-extrabold">{brightness}%</span>
        </div>
        <Slider
          value={[brightness]}
          min={80}
          max={140}
          step={1}
          onValueChange={([v]) => {
            onBrightnessManual();
            onBrightnessChange(v);
          }}
        />
      </div>

      <div className="flex items-center justify-between">
        <Button onClick={onReset} variant="outline" className="h-11 px-5 text-sm font-bold rounded-xl">
          Reset Settings
        </Button>
        <p className="text-muted-foreground text-xs text-right leading-tight max-w-[55%]">
          This tool helps you see more clearly. It is not a medical device.
        </p>
      </div>
    </div>
  );
};

export default BottomSheet;
