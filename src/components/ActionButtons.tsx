import { useGameStore } from '../store/gameStore';
import type { EnemyType } from '../store/gameStore';

interface ButtonConfig {
  type: EnemyType;
  label: string;
  color: string;
  position: string;
}

const buttons: ButtonConfig[] = [
  { type: 'spiritual', label: 'スピリチュアル', color: 'bg-purple-600 hover:bg-purple-700', position: 'top-0 left-1/2 -translate-x-1/2' },
  { type: 'investor', label: '投資詐欺', color: 'bg-yellow-600 hover:bg-yellow-700', position: 'bottom-0 left-1/2 -translate-x-1/2' },
  { type: 'conspiracy', label: '陰謀論', color: 'bg-red-600 hover:bg-red-700', position: 'left-0 top-1/2 -translate-y-1/2' },
  { type: 'fortune', label: '占い', color: 'bg-blue-600 hover:bg-blue-700', position: 'right-0 top-1/2 -translate-y-1/2' },
];

export const ActionButtons = () => {
  const { handleButtonPress, isGaugeRunning, result } = useGameStore();

  const isDisabled = !isGaugeRunning || result !== null;

  return (
    <div className="relative w-64 h-64">
      {buttons.map((button) => (
        <button
          key={button.type}
          onClick={() => handleButtonPress(button.type)}
          disabled={isDisabled}
          className={`
            absolute ${button.position} ${button.color}
            px-3 py-2 rounded-lg text-white font-bold text-sm
            transition-all duration-150
            disabled:opacity-50 disabled:cursor-not-allowed
            active:scale-95 shadow-lg
            w-24 text-center
          `}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};
