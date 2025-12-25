import { useState, useEffect } from 'react';

const BASE_URL = import.meta.env.BASE_URL;

interface MikeyProps {
  isAttacking: boolean;
  showBat: boolean;
  attackMessage?: string;
}

export const Mikey = ({ isAttacking, showBat, attackMessage }: MikeyProps) => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 2);
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // 待機時: mykey2, mykey3 を交互
  // 攻撃時: mykey1, mykey2 を交互
  const idleImages = [`${BASE_URL}images/mykey2.png`, `${BASE_URL}images/mykey3.png`];
  const attackImages = [`${BASE_URL}images/mykey1.png`, `${BASE_URL}images/mykey2.png`];

  const currentImage = isAttacking ? attackImages[frame] : idleImages[frame];

  return (
    <div className="relative flex flex-col items-center">
      {/* Mikey character */}
      <div className="relative">
        <img
          src={currentImage}
          alt="マイキー"
          className={`w-48 h-48 object-contain ${isAttacking ? 'shake' : ''}`}
        />

        {/* Bat overlay during attack */}
        {showBat && (
          <img
            src={`${BASE_URL}images/bat.png`}
            alt="バット"
            className="absolute top-0 right-0 w-24 h-24 bat-swing"
            style={{ transformOrigin: 'bottom right' }}
          />
        )}
      </div>

      {/* Attack message */}
      {attackMessage && (
        <div className="mt-4 bg-white/90 text-black p-3 rounded-lg max-w-xs text-center shadow-lg">
          <p className="font-bold text-sm">{attackMessage}</p>
        </div>
      )}
    </div>
  );
};
