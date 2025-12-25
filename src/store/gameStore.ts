import { create } from 'zustand';

const BASE_URL = import.meta.env.BASE_URL;

export type EnemyType = 'spiritual' | 'investor' | 'conspiracy' | 'fortune';

export type ResultType = 'critical' | 'miss_button' | 'total_miss' | null;

export type GameEndType = 'clear' | 'gameover' | null;

const MAX_ROUNDS = 5;
const CLEAR_SCORE = 200; // このスコア以上でクリア

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
  currentRound: number;
  maxRounds: number;
  gameEnd: GameEndType;

  // Actions
  startGame: () => void;
  spawnEnemy: () => void;
  startGauge: () => void;
  stopGauge: () => void;
  setGaugePosition: (position: number) => void;
  handleButtonPress: (buttonType: EnemyType) => void;
  resetResult: () => void;
  resetGame: () => void;
}

const enemies: Enemy[] = [
  {
    type: 'spiritual',
    name: 'スピリチュアルさん',
    image: `${BASE_URL}images/spiritual.png`,
    claim: '私には未来が見えます...',
    criticalResponse: 'マイキーさんのおっしゃる通りです！私が間違ってました...',
    mikeyAttack: '未来わかるんですよね？じゃあ今からバットで殴るの見えてました？',
  },
  {
    type: 'investor',
    name: '投資詐欺師',
    image: `${BASE_URL}images/investor.png`,
    claim: '絶対に儲かる投資話があるんですよ！',
    criticalResponse: 'マイキーさんのおっしゃる通りです！詐欺でした...',
    mikeyAttack: '絶対儲かる株なんて誰にもわからないんですよ。わかってたら誰にも教えないでしょ？',
  },
  {
    type: 'conspiracy',
    name: '陰謀論者',
    image: `${BASE_URL}images/inboron.png`,
    claim: '政府は真実を隠しているんです！国家機密を知ってしまったんです！',
    criticalResponse: 'マイキーさんのおっしゃる通りです！妄想でした...',
    mikeyAttack: 'そもそもそんな国家機密本当に知ってるなら消されてますけど？なんで生きてるんですか？',
  },
  {
    type: 'fortune',
    name: '占い師',
    image: `${BASE_URL}images/uranai.png`,
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
  currentRound: 0,
  maxRounds: MAX_ROUNDS,
  gameEnd: null,

  startGame: () => {
    set({
      gameStarted: true,
      score: 0,
      currentRound: 1,
      gameEnd: null,
    });
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

    // Check if game should end or continue
    const newRound = state.currentRound + 1;
    const newScore = state.score + scoreChange;

    setTimeout(() => {
      set({ isAttacking: false });

      if (state.currentRound >= MAX_ROUNDS) {
        // ゲーム終了判定
        if (newScore >= CLEAR_SCORE) {
          set({ gameEnd: 'clear' });
        } else {
          set({ gameEnd: 'gameover' });
        }
      } else {
        // 次のラウンドへ
        set({ currentRound: newRound });
        get().spawnEnemy();
      }
    }, 3000);
  },

  resetResult: () => {
    set({ result: null, resultMessage: '' });
  },

  resetGame: () => {
    set({
      score: 0,
      currentEnemy: null,
      gaugePosition: 0,
      isGaugeRunning: false,
      result: null,
      resultMessage: '',
      isAttacking: false,
      showBat: false,
      gameStarted: false,
      currentRound: 0,
      gameEnd: null,
    });
  },
}));
