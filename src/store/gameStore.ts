import { create } from 'zustand';

export type EnemyType = 'spiritual' | 'investor' | 'conspiracy' | 'fortune';

export type ResultType = 'critical' | 'miss_button' | 'total_miss' | null;

interface Enemy {
  type: EnemyType;
  name: string;
  image: string;
  claim: string;
  criticalResponse: string;
  mikeyAttack: string;
}

interface GameState {
  score: number;
  currentEnemy: Enemy | null;
  gaugePosition: number;
  isGaugeRunning: boolean;
  result: ResultType;
  resultMessage: string;
  isAttacking: boolean;
  showBat: boolean;
  gameStarted: boolean;

  // Actions
  startGame: () => void;
  spawnEnemy: () => void;
  startGauge: () => void;
  stopGauge: () => void;
  setGaugePosition: (position: number) => void;
  handleButtonPress: (buttonType: EnemyType) => void;
  resetResult: () => void;
}

const enemies: Enemy[] = [
  {
    type: 'spiritual',
    name: 'スピリチュアルさん',
    image: '/images/spiritual.png',
    claim: '私には未来が見えます...',
    criticalResponse: 'マイキーさんのおっしゃる通りです！私が間違ってました...',
    mikeyAttack: '未来わかるんですよね？じゃあ今からバットで殴るの見えてました？',
  },
  {
    type: 'investor',
    name: '投資詐欺師',
    image: '/images/investor.png',
    claim: '絶対に儲かる投資話があるんですよ！',
    criticalResponse: 'マイキーさんのおっしゃる通りです！詐欺でした...',
    mikeyAttack: '絶対儲かる株なんて誰にもわからないんですよ。わかってたら誰にも教えないでしょ？',
  },
  {
    type: 'conspiracy',
    name: '陰謀論者',
    image: '/images/inboron.png',
    claim: '政府は真実を隠しているんです！国家機密を知ってしまったんです！',
    criticalResponse: 'マイキーさんのおっしゃる通りです！妄想でした...',
    mikeyAttack: 'そもそもそんな国家機密本当に知ってるなら消されてますけど？なんで生きてるんですか？',
  },
  {
    type: 'fortune',
    name: '占い師',
    image: '/images/uranai.png',
    claim: 'あなたの運命を占いましょう...',
    criticalResponse: 'マイキーさんのおっしゃる通りです！統計でした...',
    mikeyAttack: '占いって結局バーナム効果でしょ？誰にでも当てはまること言ってるだけじゃないですか？',
  },
];

export const useGameStore = create<GameState>((set, get) => ({
  score: 0,
  currentEnemy: null,
  gaugePosition: 0,
  isGaugeRunning: false,
  result: null,
  resultMessage: '',
  isAttacking: false,
  showBat: false,
  gameStarted: false,

  startGame: () => {
    set({ gameStarted: true, score: 0 });
    get().spawnEnemy();
  },

  spawnEnemy: () => {
    const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    set({
      currentEnemy: randomEnemy,
      result: null,
      resultMessage: '',
      isAttacking: false,
      showBat: false,
    });
    setTimeout(() => get().startGauge(), 500);
  },

  startGauge: () => {
    set({ isGaugeRunning: true, gaugePosition: 0 });
  },

  stopGauge: () => {
    set({ isGaugeRunning: false });
  },

  setGaugePosition: (position: number) => {
    set({ gaugePosition: position });
  },

  handleButtonPress: (buttonType: EnemyType) => {
    const state = get();
    if (!state.currentEnemy || !state.isGaugeRunning) return;

    set({ isGaugeRunning: false });

    const { gaugePosition, currentEnemy } = state;
    const isCriticalZone = gaugePosition >= 40 && gaugePosition <= 60;
    const isCorrectButton = buttonType === currentEnemy.type;

    let result: ResultType;
    let resultMessage: string;
    let scoreChange: number;

    if (isCriticalZone && isCorrectButton) {
      // Perfect - Critical hit!
      result = 'critical';
      resultMessage = currentEnemy.criticalResponse;
      scoreChange = 100;
      set({ isAttacking: true, showBat: true });
    } else if (isCriticalZone && !isCorrectButton) {
      // Wrong button but good timing
      result = 'miss_button';
      resultMessage = 'う〜ん、なんか違う気がするけど...まあいいや';
      scoreChange = 0;
    } else {
      // Bad timing
      result = 'total_miss';
      resultMessage = 'は？意味わかんないんですけど。アンチ決定！';
      scoreChange = -50;
    }

    set({
      result,
      resultMessage,
      score: state.score + scoreChange,
    });

    // Show bat animation for critical hits
    if (result === 'critical') {
      setTimeout(() => set({ showBat: false }), 500);
    }

    // Spawn next enemy after delay
    setTimeout(() => {
      set({ isAttacking: false });
      get().spawnEnemy();
    }, 3000);
  },

  resetResult: () => {
    set({ result: null, resultMessage: '' });
  },
}));
