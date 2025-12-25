import { useGameStore } from '../store/gameStore';
import type { EnemyType } from '../store/gameStore';

interface ButtonConfig {
  type: EnemyType;
  label: string;
  color: string;
}

const buttons: ButtonConfig[] = [
  { type: 'spiritual', label: 'スピリチュアル', color: 'bg-purple-600 hover:bg-purple-700' },
  { type: 'investor', label: '投資詐欺', color: 'bg-yellow-600 hover:bg-yellow-700' },
  { type: 'conspiracy', label: '陰謀論', color: 'bg-red-600 hover:bg-red-700' },
  { type: 'fortune', label: '占い', color: 'bg-blue-600 hover:bg-blue-700' },
];

export const ActionButtons = () => {
  const { handleButtonPress, isGaugeRunning, result } = useGameStore();

  const isDisabled = !isGaugeRunning || result !== null;

  return (
    <div className="grid grid-cols-2 gap-3 w-full max-w-xs mx-auto">
      {buttons.map((button) => (
        <button
          key={button.type}
          onClick={() => handleButtonPress(button.type)}
          disabled={isDisabled}
          className={`
            ${button.color}
            px-4 py-3 rounded-lg text-white font-bold text-sm
            transition-all duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-95 shadow-lg
            text-center
          `}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};
