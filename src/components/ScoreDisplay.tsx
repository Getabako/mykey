import { useGameStore } from '../store/gameStore';

export const ScoreDisplay = () => {
  const score = useGameStore((state) => state.score);

  return (
    <div className="bg-black/50 backdrop-blur-sm rounded-lg px-6 py-3 border border-white/20">
      <p className="text-white text-sm">スコア</p>
      <p className={`text-3xl font-bold ${score >= 0 ? 'text-green-400' : 'text-red-400'}`}>
        {score}
      </p>
    </div>
  );
};
