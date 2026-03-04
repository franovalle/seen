import React from 'react';
import seenLogo from '@/assets/seen-logo.png';
import { SNELLEN_ROWS, calculatePresetFromRow, saveScreeningResult } from '@/lib/screeningLogic';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Props {
  onComplete: () => void;
  onStartTest?: () => void;
}

const ArmLengthIcon = () => (
  <svg viewBox="0 0 120 100" className="w-24 h-20 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {/* Stick figure */}
    <circle cx="30" cy="20" r="8" />
    <line x1="30" y1="28" x2="30" y2="55" />
    <line x1="30" y1="55" x2="20" y2="75" />
    <line x1="30" y1="55" x2="40" y2="75" />
    {/* Arm holding phone */}
    <line x1="30" y1="38" x2="80" y2="35" />
    {/* Phone */}
    <rect x="78" y="25" width="16" height="24" rx="2" fill="none" />
    {/* Distance arrow */}
    <line x1="38" y1="88" x2="76" y2="88" strokeDasharray="4 2" />
    <polyline points="38,84 34,88 38,92" />
    <polyline points="76,84 80,88 76,92" />
  </svg>
);

const VisionScreening: React.FC<Props> = ({ onComplete, onStartTest }) => {
  const [phase, setPhase] = React.useState<'intro' | 'test' | 'result'>('intro');
  const [currentRow, setCurrentRow] = React.useState(0);
  const [lastRowPassed, setLastRowPassed] = React.useState(0);
  const [resultLevel, setResultLevel] = React.useState('');

  const handleClear = () => {
    if (currentRow < SNELLEN_ROWS.length - 1) {
      setCurrentRow(currentRow + 1);
    } else {
      // Cleared all 6 rows
      const { level } = calculatePresetFromRow(6);
      setLastRowPassed(6);
      setResultLevel(level);
      setPhase('result');
    }
  };

  const handleStop = () => {
    const passed = currentRow === 0 ? 0 : currentRow;
    const { level } = calculatePresetFromRow(passed);
    setLastRowPassed(passed);
    setResultLevel(level);
    setPhase('result');
  };

  const handleFinish = () => {
    const { level, preset } = calculatePresetFromRow(lastRowPassed);
    saveScreeningResult({ lastRowPassed, level, preset });
    onComplete();
  };

  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
        <img src={seenLogo} alt="SEEn logo" className="w-48 mb-4" />
        <p className="text-foreground text-xs font-bold tracking-[0.25em] uppercase mb-8 text-center">
          Low-cost eyecare access for her.
        </p>
        <h1 className="text-foreground text-2xl font-extrabold mb-4 text-center">Quick Vision Check</h1>
        <p className="text-muted-foreground text-sm text-center leading-relaxed max-w-xs mb-10">
          This short screening helps SEEn set the right display for your eyes. It takes under 60 seconds and is not a medical diagnosis.
        </p>
        <Button onClick={() => { onStartTest?.(); setPhase('test'); }} className="w-full max-w-xs h-14 text-base font-bold rounded-xl bg-[hsl(10,80%,60%)] hover:bg-[hsl(10,80%,55%)] text-white">
          Start Screening
        </Button>
      </div>
    );
  }

  if (phase === 'test') {
    const current = SNELLEN_ROWS[currentRow];
    const progress = (currentRow / SNELLEN_ROWS.length) * 100;

    return (
      <div className="min-h-screen bg-background flex flex-col items-center px-6 py-8">
        <img src={seenLogo} alt="SEEn logo" className="w-32 mb-4" />

        <div className="flex flex-col items-center mb-6">
          <ArmLengthIcon />
          <p className="text-muted-foreground text-xs text-center mt-2 font-medium">
            Hold at arm's length and tap your answer.
          </p>
        </div>

        <div className="w-full max-w-xs mb-6">
          <Progress value={progress} className="h-2" />
          <p className="text-muted-foreground text-sm mt-2 text-center font-semibold">
            Row {currentRow + 1} of {SNELLEN_ROWS.length}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
          <div className="bg-card rounded-2xl p-8 w-full flex flex-col items-center shadow-sm border border-border mb-6">
            <p
              className="text-foreground font-black tracking-widest text-center leading-none mb-6"
              style={{ fontSize: `${current.size}px` }}
            >
              {current.letters}
            </p>

            <div className="flex flex-col gap-3 w-full">
              <Button onClick={handleClear} className="w-full h-14 text-base font-bold rounded-xl">
                Read them all clearly
              </Button>
              <Button onClick={handleStop} variant="secondary" className="w-full h-14 text-base font-bold rounded-xl">
                Got some, not all
              </Button>
              <Button onClick={handleStop} variant="outline" className="w-full h-14 text-base font-bold rounded-xl">
                Couldn't read them
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Result phase
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <img src={seenLogo} alt="SEEn logo" className="w-48 mb-4" />
      <h1 className="text-foreground text-2xl font-extrabold mb-4 text-center">Your Display Is Ready</h1>
      <p className="text-muted-foreground text-sm text-center leading-relaxed max-w-xs mb-8">
        Based on your screening, SEEn has set your display to <span className="font-bold text-foreground">{resultLevel} Clarity Mode</span>. You can adjust your settings anytime in the menu.
      </p>
      <Button onClick={handleFinish} className="w-full max-w-xs h-14 text-base font-bold rounded-xl bg-[hsl(10,80%,60%)] hover:bg-[hsl(10,80%,55%)] text-white mb-8">
        Let's Go
      </Button>
      <p className="text-muted-foreground text-xs text-center leading-relaxed px-4 max-w-xs">
        This near vision screening is not a medical diagnosis and is not a replacement for a full eye exam.
      </p>
    </div>
  );
};

export default VisionScreening;
