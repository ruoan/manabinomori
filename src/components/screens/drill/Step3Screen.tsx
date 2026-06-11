import { useState, useCallback } from 'react';
import type { Mood } from '../../../types';
import { Numpad } from '../../Numpad';
import { correctMsg, wrongMsg } from '../../../utils/messages';
import { DrillCard, FeedbackOverlay } from './DrillShared';

interface Problem {
  a: number;
  b: number;
  split1: number;  // 10 - a  (left cherry)
  split2: number;  // b - split1  (right cherry)
  answer: number;  // a + b
}

function genProblem(): Problem {
  const a = Math.floor(Math.random() * 4) + 6; // 6-9
  const minB = 11 - a;
  const b = minB + Math.floor(Math.random() * (9 - minB + 1));
  const split1 = 10 - a;
  const split2 = b - split1;
  return { a, b, split1, split2, answer: a + b };
}

interface Step3ScreenProps {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
  showHint?: boolean;
  /** true: left cherry pre-filled, user fills right + answer (2 blanks)
   *  false: both cherries blank, user fills all 3              (3 blanks) */
  partialFill?: boolean;
}

export function Step3Screen({ onBuddy, onRecord, showHint = false, partialFill = false }: Step3ScreenProps) {
  const totalBlanks = partialFill ? 2 : 3;

  const [problem, setProblem] = useState<Problem>(genProblem);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'input' | 'feedback'>('input');
  const [currentBlank, setCurrentBlank] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(() => Array(totalBlanks).fill(null));
  const [shake, setShake] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const getExpected = (idx: number): number => {
    if (partialFill) return idx === 0 ? problem.split2 : problem.answer;
    return [problem.split1, problem.split2, problem.answer][idx];
  };

  const submit = useCallback(() => {
    const num = parseInt(input, 10);
    if (isNaN(num)) return;

    const expected = getExpected(currentBlank);
    if (num === expected) {
      const next = [...userAnswers];
      next[currentBlank] = num;
      setUserAnswers(next);
      setInput('');
      setHintVisible(false);

      if (currentBlank < totalBlanks - 1) {
        setCurrentBlank(currentBlank + 1);
        const m = correctMsg();
        onBuddy(m.mood, m.msg);
      } else {
        setPhase('feedback');
        onRecord();
        onBuddy('cheer', 'ぜんぶ せいかい！ すごすぎる！');
      }
    } else {
      setShake(true);
      setInput('');
      setTimeout(() => setShake(false), 400);
      const m = wrongMsg();
      onBuddy(m.mood, m.msg);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, problem, currentBlank, userAnswers, totalBlanks, partialFill, onBuddy, onRecord]);

  const next = useCallback(() => {
    setProblem(genProblem());
    setInput('');
    setPhase('input');
    setCurrentBlank(0);
    setUserAnswers(Array(totalBlanks).fill(null));
    setHintVisible(false);
    onBuddy('happy', 'つぎの もんだいだよ！');
  }, [totalBlanks, onBuddy]);

  const hints: string[] = partialFill
    ? [
        `${problem.b} から ${problem.split1} を とると のこりは？`,
        `10 と ${problem.split2} を たすと？`,
      ]
    : [
        `${problem.a} に なにを たすと 10 に なる？`,
        `${problem.b} から ${problem.split1} を とると のこりは？`,
        `10 と ${problem.split2} を たすと？`,
      ];

  // Left cherry
  const leftVal: number | null = partialFill ? problem.split1 : userAnswers[0];
  const leftPreFilled = partialFill;
  const leftActive = !partialFill && currentBlank === 0 && phase === 'input';
  const leftInput = leftActive ? input : undefined;

  // Right cherry
  const rightBlankIdx = partialFill ? 0 : 1;
  const rightVal: number | null = userAnswers[rightBlankIdx];
  const rightActive = currentBlank === rightBlankIdx && phase === 'input';
  const rightInput = rightActive ? input : undefined;

  // Answer
  const answerBlankIdx = partialFill ? 1 : 2;
  const answerVal: number | null = userAnswers[answerBlankIdx];
  const answerActive = currentBlank === answerBlankIdx && phase === 'input';
  const answerInput = answerActive ? input : undefined;

  const numpadMax = (partialFill ? [1, 2] : [1, 1, 2])[currentBlank];

  const cardTitle = partialFill
    ? 'さくらんぼ算（かんたん）'
    : 'さくらんぼ算（ぜんぶ うめよう）';

  return (
    <DrillCard title={cardTitle}>
      {partialFill && (
        <div style={{ textAlign: 'center', fontSize: 14, fontWeight: 700, color: '#A8957D', marginBottom: 12 }}>
          ひだりは もう わかってるよ！ みぎと こたえを いれよう
        </div>
      )}

      <div style={{ marginBottom: 20 }}>
        <ProblemDisplay
          a={problem.a} b={problem.b}
          leftVal={leftVal} leftPreFilled={leftPreFilled}
          leftActive={leftActive} leftInput={leftInput}
          rightVal={rightVal} rightActive={rightActive} rightInput={rightInput}
          answerVal={answerVal} answerActive={answerActive} answerInput={answerInput}
          shake={shake}
        />
      </div>

      {showHint && phase === 'input' && (
        <div style={{ marginTop: 12, textAlign: 'center' }}>
          {hintVisible ? (
            <div style={{
              background: '#FFF7EA',
              border: '2px solid #FFD9A8',
              borderRadius: 14,
              padding: '10px 16px',
              fontSize: 16,
              fontWeight: 700,
              color: '#B07A4E',
            }}>
              {hints[currentBlank]}
            </div>
          ) : (
            <button
              onClick={() => setHintVisible(true)}
              style={{
                background: '#FFE6D6',
                border: '2px solid #FFD9A8',
                borderRadius: 999,
                padding: '8px 20px',
                fontSize: 14,
                fontWeight: 800,
                color: '#B07A4E',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
            >
              ヒントを みる
            </button>
          )}
        </div>
      )}

      {phase === 'input' ? (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
          <Numpad value={input} onChange={setInput} onSubmit={submit} maxLength={numpadMax} />
        </div>
      ) : (
        <FeedbackOverlay correct={true} onNext={next} />
      )}
    </DrillCard>
  );
}

// ── sub-components ────────────────────────────────────────────

interface ProblemDisplayProps {
  a: number; b: number;
  leftVal: number | null; leftPreFilled: boolean; leftActive: boolean; leftInput?: string;
  rightVal: number | null; rightActive: boolean; rightInput?: string;
  answerVal: number | null; answerActive: boolean; answerInput?: string;
  shake: boolean;
}

function ProblemDisplay({
  a, b,
  leftVal, leftPreFilled, leftActive, leftInput,
  rightVal, rightActive, rightInput,
  answerVal, answerActive, answerInput,
  shake,
}: ProblemDisplayProps) {
  const leftDisplay = leftActive ? (leftInput || '') : (leftVal !== null ? String(leftVal) : '');
  const rightDisplay = rightActive ? (rightInput || '') : (rightVal !== null ? String(rightVal) : '');
  const ansDisplay = answerActive ? (answerInput || '') : (answerVal !== null ? String(answerVal) : '');

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 8 }}>
      {/* a + */}
      <div style={{ display: 'flex', alignItems: 'center', height: 60, gap: 8, flexShrink: 0 }}>
        <Chip val={a} color="#5B9BFF" />
        <span style={{ fontSize: 32, fontWeight: 800, color: '#A8957D' }}>＋</span>
      </div>

      {/* b with cherry tree */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <Chip val={b} color="#FF9F45" />
        <svg width="140" height="52" style={{ marginTop: -4 }}>
          <line x1="70" y1="0" x2="22" y2="46" stroke="#D4B896" strokeWidth="3" strokeLinecap="round" />
          <line x1="70" y1="0" x2="118" y2="46" stroke="#D4B896" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <div style={{ display: 'flex', gap: 44, marginTop: -44 }}>
          <CherryCircle display={leftDisplay} preFilled={leftPreFilled} active={leftActive} shake={leftActive ? shake : false} />
          <CherryCircle display={rightDisplay} preFilled={false} active={rightActive} shake={rightActive ? shake : false} />
        </div>
      </div>

      {/* = answer */}
      <div style={{ display: 'flex', alignItems: 'center', height: 60, gap: 8, flexShrink: 0 }}>
        <span style={{ fontSize: 32, fontWeight: 800, color: '#A8957D' }}>＝</span>
        <AnswerBox val={ansDisplay} active={answerActive} shake={answerActive ? shake : false} />
      </div>
    </div>
  );
}

function Chip({ val, color }: { val: number; color: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 60, height: 60, borderRadius: '50%',
      background: color, color: '#fff',
      fontSize: 30, fontWeight: 800,
      boxShadow: '0 4px 0 rgba(0,0,0,.12)',
    }}>
      {val}
    </span>
  );
}

function CherryCircle({ display, preFilled, active, shake }: {
  display: string; preFilled: boolean; active: boolean; shake: boolean;
}) {
  const filled = display !== '';
  const bg = preFilled
    ? '#FF6F91'
    : active ? '#FFF0F5' : filled ? '#FFE6ED' : '#F5F0EA';
  const border = preFilled
    ? 'none'
    : active ? '4px solid #FF6F91' : filled ? '3px solid #FF6F91' : '3px dashed #D4C0A8';
  const textColor = preFilled ? '#fff' : filled ? '#FF4477' : '#C4AE96';
  const anim = shake ? 'shake .35s ease' : active ? 'pulseGlow .8s ease-in-out infinite' : undefined;

  return (
    <div style={{
      width: 56, height: 56, borderRadius: '50%',
      background: bg, border,
      display: 'grid', placeItems: 'center',
      fontSize: 26, fontWeight: 800, color: textColor,
      boxShadow: active ? undefined : preFilled ? '0 4px 0 #CC3A66' : 'none',
      animation: anim,
      transition: 'border-color .2s, background .2s',
      flexShrink: 0,
    }}>
      {filled ? display : <span style={{ fontSize: 22 }}>？</span>}
    </div>
  );
}

function AnswerBox({ val, active, shake }: { val: string; active: boolean; shake: boolean }) {
  const filled = val !== '';
  const anim = shake ? 'shake .35s ease' : active ? 'pulseGlowBlue .8s ease-in-out infinite' : undefined;
  return (
    <div style={{
      width: 68, height: 60, borderRadius: 16,
      background: active ? '#EEF5FF' : filled ? '#5B9BFF' : '#F5F0EA',
      border: active ? '4px solid #5B9BFF' : filled ? 'none' : '3px dashed #D4C0A8',
      display: 'grid', placeItems: 'center',
      fontSize: 28, fontWeight: 800,
      color: active ? '#5B9BFF' : filled ? '#fff' : '#C4AE96',
      boxShadow: filled && !active ? '0 4px 0 #3A78D9' : undefined,
      animation: anim,
      transition: 'all .2s', flexShrink: 0,
    }}>
      {filled ? val : <span style={{ fontSize: 22 }}>？</span>}
    </div>
  );
}
