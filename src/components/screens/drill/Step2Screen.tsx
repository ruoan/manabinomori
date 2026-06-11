import { useState, useCallback } from 'react';
import type { Mood } from '../../../types';
import { Numpad } from '../../Numpad';
import { correctMsg, wrongMsg } from '../../../utils/messages';
import { DrillCard, FeedbackOverlay } from './DrillShared';

type ProblemType = 'specA' | 'free';

interface Problem {
  type: ProblemType;
  n: number;
  a: number;      // shown part (type specA: specified; free: user fills blank0)
  answer: number; // n - a (type specA fixed; free: depends on blank0)
}

function genProblem(): Problem {
  const n = Math.floor(Math.random() * 7) + 3; // 3-9
  const type: ProblemType = Math.random() < 0.6 ? 'specA' : 'free';
  const a = Math.floor(Math.random() * (n - 1)) + 1; // 1 to n-1
  return { type, n, a, answer: n - a };
}

interface Step2ScreenProps {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
}

export function Step2Screen({ onBuddy, onRecord }: Step2ScreenProps) {
  const [problem, setProblem] = useState<Problem>(genProblem);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'input' | 'feedback'>('input');
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  // For 'free' type: blank0 = left, blank1 = right
  const [currentBlank, setCurrentBlank] = useState(0);
  const [blank0, setBlank0] = useState<number | null>(null);

  const triggerShake = () => {
    setShake(true);
    setInput('');
    setTimeout(() => setShake(false), 400);
  };

  const submit = useCallback(() => {
    const num = parseInt(input, 10);
    if (isNaN(num)) return;

    if (problem.type === 'specA') {
      const ok = num === problem.answer;
      if (ok) {
        setCorrect(true);
        setPhase('feedback');
        onRecord();
        const m = correctMsg();
        onBuddy(m.mood, m.msg);
      } else {
        triggerShake();
        const m = wrongMsg();
        onBuddy(m.mood, m.msg);
      }
      return;
    }

    // free type: two blanks
    if (currentBlank === 0) {
      if (num < 1 || num >= problem.n) {
        triggerShake();
        onBuddy('happy', `1 から ${problem.n - 1} の あいだの かずを いれてね！`);
        return;
      }
      setBlank0(num);
      setCurrentBlank(1);
      setInput('');
      onBuddy('cheer', 'いいね！ つぎの □ も うめよう！');
    } else {
      const ok = (blank0 ?? 0) + num === problem.n;
      if (ok) {
        setCorrect(true);
        setPhase('feedback');
        onRecord();
        const m = correctMsg();
        onBuddy(m.mood, m.msg);
      } else {
        triggerShake();
        onBuddy('happy', `たして ${problem.n} に なるかな？ もう いちど！`);
      }
    }
  }, [input, problem, currentBlank, blank0, onBuddy, onRecord]);

  const next = useCallback(() => {
    const p = genProblem();
    setProblem(p);
    setInput('');
    setPhase('input');
    setCorrect(false);
    setCurrentBlank(0);
    setBlank0(null);
    onBuddy('happy', 'つぎの もんだいだよ！');
  }, [onBuddy]);

  const { type, n, a } = problem;

  return (
    <DrillCard title="かずを わけよう">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        {type === 'specA' ? (
          <SpecAProblem n={n} a={a} userInput={input} shake={shake} done={phase === 'feedback'} answer={problem.answer} />
        ) : (
          <FreeProblem
            n={n}
            blank0={blank0}
            blank0Active={currentBlank === 0}
            blank1Active={currentBlank === 1}
            userInput={input}
            shake={shake}
            done={phase === 'feedback'}
          />
        )}
      </div>

      {phase === 'input' ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Numpad value={input} onChange={setInput} onSubmit={submit} maxLength={1} />
        </div>
      ) : (
        <FeedbackOverlay correct={correct} onNext={next} />
      )}
    </DrillCard>
  );
}

function SpecAProblem({ n, a, userInput, shake, done, answer }: {
  n: number; a: number; userInput: string; shake: boolean; done: boolean; answer: number;
}) {
  return (
    <ProblemRow
      n={n}
      leftVal={a}
      rightVal={done ? answer : undefined}
      rightInput={!done ? userInput : undefined}
      rightActive={!done}
      shake={shake}
    />
  );
}

function FreeProblem({ n, blank0, blank0Active, blank1Active, userInput, shake, done }: {
  n: number; blank0: number | null; blank0Active: boolean; blank1Active: boolean;
  userInput: string; shake: boolean; done: boolean;
}) {
  return (
    <ProblemRow
      n={n}
      leftVal={blank0 ?? undefined}
      leftInput={blank0 === null && blank0Active ? userInput : undefined}
      leftActive={blank0Active}
      rightVal={done ? (n - (blank0 ?? 0)) : undefined}
      rightInput={blank1Active ? userInput : undefined}
      rightActive={blank1Active}
      shake={shake}
    />
  );
}

function ProblemRow({ n, leftVal, leftInput, leftActive, rightVal, rightInput, rightActive, shake }: {
  n: number;
  leftVal?: number; leftInput?: string; leftActive?: boolean;
  rightVal?: number; rightInput?: string; rightActive?: boolean;
  shake?: boolean;
}) {
  return (
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#A8957D', marginBottom: 16 }}>
        □ と □ に わけよう！
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, fontSize: 40, fontWeight: 800 }}>
        <NumberBubble value={n} color="#FF9F45" />
        <span style={{ color: '#A8957D', fontSize: 28 }}>を</span>
        <BlankBubble val={leftVal} input={leftInput} active={leftActive} shake={leftActive ? shake : false} />
        <span style={{ color: '#A8957D', fontSize: 28 }}>と</span>
        <BlankBubble val={rightVal} input={rightInput} active={rightActive} shake={rightActive ? shake : false} />
        <span style={{ color: '#A8957D', fontSize: 22 }}>に わけよう</span>
      </div>
    </div>
  );
}

function NumberBubble({ value, color }: { value: number; color: string }) {
  return (
    <div style={{
      width: 72, height: 72, borderRadius: '50%',
      background: color, color: '#fff',
      display: 'grid', placeItems: 'center',
      fontSize: 36, fontWeight: 800,
      boxShadow: '0 5px 0 rgba(0,0,0,.12)',
      flexShrink: 0,
    }}>
      {value}
    </div>
  );
}

function BlankBubble({ val, input, active, shake }: {
  val?: number; input?: string; active?: boolean; shake?: boolean;
}) {
  const display = val !== undefined ? String(val) : (input || '');
  const isEmpty = val === undefined && !input;
  return (
    <div style={{
      width: 72, height: 72, borderRadius: '50%',
      background: val !== undefined ? '#E8F5FF' : active ? '#FFF7EA' : '#F5F0EA',
      border: active ? '4px solid #FF9F45' : val !== undefined ? '3px solid #5B9BFF' : '3px dashed #D4C0A8',
      display: 'grid', placeItems: 'center',
      fontSize: 36, fontWeight: 800,
      color: val !== undefined ? '#5B9BFF' : '#4A3B2A',
      boxShadow: active ? '0 0 0 3px rgba(255,159,69,.2)' : 'none',
      flexShrink: 0,
      animation: shake ? 'shake .35s ease' : undefined,
      transition: 'border-color .2s, background .2s',
    }}>
      {isEmpty ? <span style={{ color: '#C4AE96', fontSize: 28 }}>？</span> : display}
    </div>
  );
}
