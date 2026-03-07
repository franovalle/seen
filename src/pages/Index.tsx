import React, { useState } from 'react';
import XRScreeningWrapper from '@/components/XRScreeningWrapper';
import GlassesView from '@/components/GlassesView';
import { loadScreeningResult, clearScreeningResult } from '@/lib/screeningLogic';

type Screen = 'screening' | 'glasses';

const Index = () => {
  const [screen, setScreen] = useState<Screen>('screening');

  const handleRecalibrate = () => {
    clearScreeningResult();
    setScreen('screening');
  };

  if (screen === 'screening') {
    return <XRScreeningWrapper onComplete={() => setScreen('glasses')} />;
  }

  return <GlassesView onRecalibrate={handleRecalibrate} />;
};

export default Index;
