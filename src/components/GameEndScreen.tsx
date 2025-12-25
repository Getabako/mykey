import { useGameStore } from '../store/gameStore';

const BASE_URL = import.meta.env.BASE_URL;

export const GameEndScreen = () => {
  const { gameEnd, score, resetGame } = useGameStore();

  if (!gameEnd) return null;

  const isClear = gameEnd === 'clear';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gradient-to-b from-slate-900 to-slate-800">
      {/* 結果タイトル */}
      <div className={`text-4xl font-bold mb-6 ${isClear ? 'text-green-400' : 'text-red-400'}`}>
        {isClear ? 'GAME CLEAR!' : 'GAME OVER'}
      </div>

      {/* マイキー画像 */}
      <div className="mb-6">
        <img
          src={`${BASE_URL}images/mykey1.png`}
          alt="Mikey"
          className="w-48 h-48 object-contain"
        />
      </div>

      {/* メッセージ */}
      <div className="bg-slate-800 border-4 border-white/30 rounded-lg p-6 max-w-sm w-full mb-6">
        <p className="text-white text-center text-lg mb-4">
          {isClear
            ? '論破完了！インチキ野郎どもを成敗したぜ！'
            : 'くそっ...今日はこのへんにしといてやる...'}
        </p>
        <div className="text-center">
          <span className="text-white/60">最終スコア</span>
          <p className={`text-3xl font-bold ${isClear ? 'text-green-400' : 'text-red-400'}`}>
            {score}
          </p>
        </div>
      </div>

      {/* スコア評価 */}
      <div className="mb-8 text-center">
        <p className="text-white/60 text-sm mb-2">評価</p>
        <p className="text-2xl">
          {score >= 400 ? '🏆 パーフェクト！' :
           score >= 300 ? '⭐ すばらしい！' :
           score >= 200 ? '👍 よくできました' :
           score >= 100 ? '😐 まあまあ...' :
           '💀 修行が必要...'}
        </p>
      </div>

      {/* リトライボタン */}
      <button
        onClick={resetGame}
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-xl transition-all duration-200 active:scale-95 shadow-lg"
      >
        もう一度プレイ
      </button>
    </div>
  );
};
