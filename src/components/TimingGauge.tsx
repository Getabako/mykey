import { useEffect, useRef } from 'react';
import { useGameStore } from '../store/gameStore';

export const TimingGauge = () => {
  const isGaugeRunning = useGameStore((state) => state.isGaugeRunning);
  const setGaugePosition = useGameStore((state) => state.setGaugePosition);
  const animationRef = useRef<number | undefined>(undefined);
  const positionRef = useRef(0);
  const directionRef = useRef(1);

  useEffect(() => {
    if (!isGaugeRunning) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }

    const animate = () => {
      positionRef.current += directionRef.current * 2;

      if (positionRef.current >= 100) {
        positionRef.current = 100;
        directionRef.current = -1;
      } else if (positionRef.current <= 0) {
        positionRef.current = 0;
        directionRef.current = 1;
      }

      setGaugePosition(positionRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    positionRef.current = 0;
    directionRef.current = 1;
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isGaugeRunning, setGaugePosition]);

  const gaugePosition = useGameStore((state) => state.gaugePosition);

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Gauge container */}
      <div className="relative h-8 bg-gray-800 rounded-full overflow-hidden border-2 border-white/30">
        {/* Critical zone indicator */}
        <div
          className="absolute top-0 bottom-0 bg-green-500/40"
          style={{ left: '40%', width: '20%' }}
        />

        {/* Center marker */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-yellow-400"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        />

        {/* Moving indicator */}
        <div
          className="absolute top-1 bottom-1 w-4 bg-red-500 rounded-full shadow-lg transition-none"
          style={{ left: `calc(${gaugePosition}% - 8px)` }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-white/60 mt-1">
        <span>MISS</span>
        <span className="text-green-400 font-bold">CRITICAL!</span>
        <span>MISS</span>
      </div>
    </div>
  );
};
