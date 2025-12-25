import { useGameStore } from '../store/gameStore';

export const StartScreen = () => {
  const startGame = useGameStore((state) => state.startGame);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black z-50">
      <div className="text-center px-6">
        <h1 className="text-3xl font-bold text-white mb-2">
          マイキーの論破ゲーム
        </h1>
        <p className="text-gray-400 mb-8 text-sm">
          怪しい人たちを論破しよう!
        </p>

        <img
          src="/images/mykey1.png"
          alt="マイキー"
          className="w-48 h-48 object-contain mx-auto mb-8"
        />

        <div className="bg-white/10 rounded-lg p-4 mb-8 text-left text-sm">
          <p className="text-white font-bold mb-2">遊び方:</p>
          <ul className="text-gray-300 space-y-1">
            <li>• ゲージが中央（緑）の時にボタンを押そう</li>
            <li>• 相手に合ったボタンを選ぼう</li>
            <li>• タイミング + 正しいボタン = CRITICAL!</li>
          </ul>
        </div>

        <button
          onClick={startGame}
          className="bg-line-green hover:bg-green-600 text-white font-bold py-4 px-12 rounded-full text-xl transition-all active:scale-95 shadow-lg"
        >
          スタート
        </button>
      </div>
    </div>
  );
};
