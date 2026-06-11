import { useState, useCallback } from 'react';
import type { Mood } from '../../../types';
import { Numpad } from '../../Numpad';
import { correctMsg, wrongMsg } from '../../../utils/messages';
import { DrillCard, FeedbackOverlay } from './DrillShared';

interface Problem {
  shown: number;
  answer: number;
  shownLeft: boolean;
}

function genProblem(): Problem {
  const shown = Math.floor(Math.random() * 9) + 1; // 1-9
  return { shown, answer: 10 - shown, shownLeft: Math.random() < 0.5 };
}

interface Step1ScreenProps {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
}

export function Step1Screen({ onBuddy, onRecord }: Step1ScreenProps) {
  const [problem, setProblem] = useState<Problem>(genProblem);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'input' | 'feedback'>('input');
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = useCallback(() => {
    const num = parseInt(input, 10);
    if (isNaN(num)) return;
    const ok = num === problem.answer;
    if (ok) {
      setCorrect(true);
      setPhase('feedback');
      onRecord();
      const m = correctMsg();
      onBuddy(m.mood, m.msg);
    } else {
      setShake(true);
      setInput('');
      setTimeout(() => setShake(false), 400);
      const m = wrongMsg();
      onBuddy(m.mood, m.msg);
    }
  }, [input, problem, onBuddy, onRecord]);

  const next = useCallback(() => {
    setProblem(genProblem());
    setInput('');
    setPhase('input');
    setCorrect(false);
    onBuddy('happy', 'つぎの もんだいだよ！');
  }, [onBuddy]);

  const { shown, answer, shownLeft } = problem;

  return (
    <DrillCard title="10の ごうせい">
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <ComposeProblem
          shown={shown}
          shownLeft={shownLeft}
          userInput={input}
          shake={shake}
          done={phase === 'feedback'}
          answer={answer}
        />
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

function ComposeProblem({ shown, shownLeft, userInput, shake, done, answer }: {
  shown: number; shownLeft: boolean; userInput: string; shake: boolean; done: boolean; answer: number;
}) {
  const desc = shownLeft
    ? `${shown} と たして 10 に なる かずは？`
    : `たすと ${shown} で 10 に なる かずは？`;

  return (
    <div>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#A8957D', marginBottom: 16 }}>
        {desc}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
        {shownLeft ? (
          <>
            <NumCircle value={shown} />
            <span style={{ color: '#A8957D', fontSize: 30 }}>と</span>
            <NumCircle value={null} input={done ? String(answer) : userInput} shake={shake} active={!done} />
          </>
        ) : (
          <>
            <NumCircle value={null} input={done ? String(answer) : userInput} shake={shake} active={!done} />
            <span style={{ color: '#A8957D', fontSize: 30 }}>と</span>
            <NumCircle value={shown} />
          </>
        )}
        <span style={{ color: '#A8957D', fontSize: 30 }}>で</span>
        <NumCircle value={10} color="#5B9BFF" />
      </div>
    </div>
  );
}

function NumCircle({ value, input, shake, active, color = '#FF9F45' }: {
  value: number | null;
  input?: string;
  shake?: boolean;
  active?: boolean;
  color?: string;
}) {
  const display = value !== null ? String(value) : (input || '');
  const isEmpty = value === null && !input;

  return (
    <div style={{
      width: 72,
      height: 72,
      borderRadius: '50%',
      background: value !== null ? color : active ? '#FFF7EA' : '#F5F0EA',
      border: active ? `4px solid ${color}` : value !== null ? 'none' : '3px dashed #D4C0A8',
      display: 'grid',
      placeItems: 'center',
      fontSize: 36,
      fontWeight: 800,
      color: value !== null ? '#fff' : '#4A3B2A',
      boxShadow: value !== null ? '0 5px 0 rgba(0,0,0,.12)' : 'none',
      animation: shake ? 'shake .35s ease' : undefined,
      transition: 'background .2s',
      flexShrink: 0,
    }}>
      {isEmpty ? <span style={{ color: '#C4AE96', fontSize: 28 }}>？</span> : display}
    </div>
  );
}
