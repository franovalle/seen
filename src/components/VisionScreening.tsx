import React from 'react';
import seenLogo from '@/assets/seen-logo.png';
import { SNELLEN_LETTERS, calculatePreset, saveScreeningResult } from '@/lib/screeningLogic';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Props {
  onComplete: () => void;
}

const VisionScreening: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = React.useState(0);
  const [scores, setScores] = React.useState<number[]>([]);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (step < SNELLEN_LETTERS.length - 1) {
      setStep(step + 1);
    } else {
      const totalScore = newScores.reduce((a, b) => a + b, 0);
      const preset = calculatePreset(totalScore);
      saveScreeningResult({ scores: newScores, totalScore, preset });
      onComplete();
    }
  };

  const current = SNELLEN_LETTERS[step];
  const progress = ((step) / SNELLEN_LETTERS.length) * 100;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-6 py-8">
      {/* Logo */}
      <img src={seenLogo} alt="SEEn logo" className="w-48 mb-4" />

      {/* Tagline */}
      <p className="text-foreground text-xs font-bold tracking-[0.25em] uppercase mb-8 text-center">
        Low-cost eyeglasses. Accessible for her.
      </p>

      {/* Progress */}
      <div className="w-full max-w-xs mb-6">
        <Progress value={progress} className="h-2" />
        <p className="text-muted-foreground text-sm mt-2 text-center font-semibold">
          Step {step + 1} of {SNELLEN_LETTERS.length}
        </p>
      </div>

      {/* Snellen letters */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
        <div className="bg-card rounded-2xl p-8 w-full flex flex-col items-center shadow-sm border border-border mb-6">
          <p className="text-muted-foreground text-sm font-semibold mb-4">Can you read this clearly?</p>
          <p
            className="text-foreground font-black tracking-widest text-center leading-none mb-6"
            style={{ fontSize: `${current.size}px` }}
          >
            {current.letters}
          </p>

          <div className="flex gap-3 w-full">
            <Button
              onClick={() => handleAnswer(0)}
              className="flex-1 h-12 text-base font-bold rounded-xl"
            >
              Yes
            </Button>
            <Button
              onClick={() => handleAnswer(1)}
              variant="secondary"
              className="flex-1 h-12 text-base font-bold rounded-xl"
            >
              Somewhat
            </Button>
            <Button
              onClick={() => handleAnswer(2)}
              variant="outline"
              className="flex-1 h-12 text-base font-bold rounded-xl"
            >
              No
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-muted-foreground text-xs text-center leading-relaxed px-4">
          This is not a medical diagnosis. SEEn is an assistive clarity tool only.
        </p>
      </div>
    </div>
  );
};

export default VisionScreening;
