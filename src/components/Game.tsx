import { useGameStore } from '../store/gameStore';
import { Mikey } from './Mikey';
import { Enemy } from './Enemy';
import { TimingGauge } from './TimingGauge';
import { ActionButtons } from './ActionButtons';
import { ScoreDisplay } from './ScoreDisplay';
import { ResultOverlay } from './ResultOverlay';

export const Game = () => {
  const { currentEnemy, isAttacking, showBat, result } = useGameStore();

  return (
    <div className="min-h-screen flex flex-col items-center py-4 px-4 pb-36">
      {/* Header - Score */}
      <div className="w-full flex justify-center mb-4">
        <ScoreDisplay />
      </div>

      {/* Main game area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md">
        {/* Enemy */}
        {currentEnemy && (
          <div className="mb-4">
            <Enemy
              name={currentEnemy.name}
              image={currentEnemy.image}
              claim={currentEnemy.claim}
              isHit={result === 'critical'}
            />
          </div>
        )}

        {/* Timing Gauge */}
        <div className="mb-4 w-full">
          <TimingGauge />
        </div>

        {/* Mikey */}
        <div className="mb-6">
          <Mikey
            isAttacking={isAttacking}
            showBat={showBat}
            attackMessage={result === 'critical' ? currentEnemy?.mikeyAttack : undefined}
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full">
          <ActionButtons />
        </div>
      </div>

      {/* RPG風メッセージウィンドウ - 画面下部に固定 */}
      <div className="fixed bottom-4 left-0 right-0 z-50">
        <ResultOverlay />
      </div>
    </div>
  );
};
