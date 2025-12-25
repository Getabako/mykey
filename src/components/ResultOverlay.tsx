import { useGameStore } from '../store/gameStore';

export const ResultOverlay = () => {
  const { result, resultMessage, currentEnemy } = useGameStore();

  if (!result) return null;

  const getResultStyle = () => {
    switch (result) {
      case 'critical':
        return {
          bg: 'bg-green-500/20',
          border: 'border-green-500',
          title: 'CRITICAL HIT!',
          titleColor: 'text-green-400',
          scoreText: '+100',
          scoreColor: 'text-green-400',
        };
      case 'miss_button':
        return {
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500',
          title: 'ボタン違い...',
          titleColor: 'text-yellow-400',
          scoreText: '±0',
          scoreColor: 'text-yellow-400',
        };
      case 'total_miss':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-500',
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
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${style.bg} backdrop-blur-sm`}>
      <div className={`bg-black/80 ${style.border} border-2 rounded-2xl p-6 max-w-sm mx-4 text-center`}>
        <h2 className={`text-2xl font-bold ${style.titleColor} mb-4`}>
          {style.title}
        </h2>

        {result === 'critical' && currentEnemy && (
          <div className="mb-4 bg-white/10 rounded-lg p-3">
            <p className="text-white text-sm font-bold mb-2">マイキー:</p>
            <p className="text-white text-sm">「{currentEnemy.mikeyAttack}」</p>
          </div>
        )}

        <div className="bg-white/10 rounded-lg p-3 mb-4">
          <p className="text-white text-sm">
            {result === 'critical' ? `${currentEnemy?.name}:` : ''}
          </p>
          <p className="text-white text-sm">「{resultMessage}」</p>
        </div>

        <p className={`text-3xl font-bold ${style.scoreColor}`}>
          {style.scoreText}
        </p>
      </div>
    </div>
  );
};
