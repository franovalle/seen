import React, { useState } from 'react';
import VisionScreening from '@/components/VisionScreening';
import GlassesView from '@/components/GlassesView';
import { loadScreeningResult, clearScreeningResult } from '@/lib/screeningLogic';

type Screen = 'screening' | 'glasses';

const Index = () => {
  const [screen, setScreen] = useState<Screen>(
    loadScreeningResult() ? 'glasses' : 'screening'
  );

  const handleRecalibrate = () => {
    clearScreeningResult();
    setScreen('screening');
  };

  if (screen === 'screening') {
    return <VisionScreening onComplete={() => setScreen('glasses')} />;
  }

  return <GlassesView onRecalibrate={handleRecalibrate} />;
};

export default Index;
