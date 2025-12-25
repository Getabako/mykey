import { useGameStore } from '../store/gameStore';

export const ResultOverlay = () => {
  const { result, resultMessage, currentEnemy } = useGameStore();

  if (!result) return null;

  const getResultStyle = () => {
    switch (result) {
      case 'critical':
        return {
          border: 'border-green-400',
          title: 'CRITICAL HIT!',
          titleColor: 'text-green-400',
          scoreText: '+100',
          scoreColor: 'text-green-400',
        };
      case 'miss_button':
        return {
          border: 'border-yellow-400',
          title: 'ボタン違い...',
          titleColor: 'text-yellow-400',
          scoreText: '±0',
          scoreColor: 'text-yellow-400',
        };
      case 'total_miss':
        return {
          border: 'border-red-400',
          title: 'アンチ化!',
          titleColor: 'text-red-400',
          scoreText: '-50',
          scoreColor: 'text-red-400',
        };
    }
  };

  const style = getResultStyle();
  if (!style) return null;

  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* RPG風メッセージウィンドウ */}
      <div className={`relative bg-slate-900/95 ${style.border} border-4 rounded-lg p-4 shadow-2xl`}>
        {/* 角の装飾 */}
        <div className={`absolute -top-1 -left-1 w-3 h-3 ${style.border} border-t-4 border-l-4 rounded-tl`} />
        <div className={`absolute -top-1 -right-1 w-3 h-3 ${style.border} border-t-4 border-r-4 rounded-tr`} />
        <div className={`absolute -bottom-1 -left-1 w-3 h-3 ${style.border} border-b-4 border-l-4 rounded-bl`} />
        <div className={`absolute -bottom-1 -right-1 w-3 h-3 ${style.border} border-b-4 border-r-4 rounded-br`} />

        {/* タイトルとスコア */}
        <div className="flex justify-between items-center mb-2">
          <span className={`font-bold ${style.titleColor}`}>{style.title}</span>
          <span className={`font-bold ${style.scoreColor}`}>{style.scoreText}</span>
        </div>

        {/* メッセージ */}
        <div className="text-white text-sm leading-relaxed">
          {result === 'critical' && currentEnemy && (
            <p className="mb-2">
              <span className="text-yellow-300 font-bold">マイキー：</span>
              「{currentEnemy.mikeyAttack}」
            </p>
          )}
          <p>
            <span className="text-cyan-300 font-bold">
              {result === 'critical' ? `${currentEnemy?.name}：` : '相手：'}
            </span>
            「{resultMessage}」
          </p>
        </div>

        {/* 点滅する▼マーク */}
        <div className="text-right mt-2">
          <span className="text-white/60 animate-pulse">▼</span>
        </div>
      </div>
    </div>
  );
};
