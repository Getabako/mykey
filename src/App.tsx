import { useEffect, useState } from 'react';
import liff from '@line/liff';
import { useGameStore } from './store/gameStore';
import { Game } from './components/Game';
import { StartScreen } from './components/StartScreen';
import './index.css';

function App() {
  const [liffError, setLiffError] = useState<string | null>(null);
  const gameStarted = useGameStore((state) => state.gameStarted);

  useEffect(() => {
    const initLiff = async () => {
      try {
        const liffId = import.meta.env.VITE_LIFF_ID;
        if (liffId) {
          await liff.init({ liffId });
        }
      } catch (error) {
        console.error('LIFF init error:', error);
        setLiffError('LIFFの初期化に失敗しました');
      }
    };

    initLiff();
  }, []);

  if (liffError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <p className="text-red-400">{liffError}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {!gameStarted ? <StartScreen /> : <Game />}
    </div>
  );
}

export default App;
