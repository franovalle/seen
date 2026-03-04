import React from 'react';
import { useGyroscope } from '@/hooks/useGyroscope';

const LensOverlay: React.FC = () => {
  const offset = useGyroscope();

  return (
    <div
      className="absolute inset-0 pointer-events-none flex items-center justify-center z-10"
      aria-hidden="true"
    >
      <div
        className="border-[3px] border-primary rounded-3xl"
        style={{
          width: '75%',
          height: '55%',
          transform: `translate(${offset.x}px, ${offset.y}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      />
    </div>
  );
};

export default LensOverlay;
