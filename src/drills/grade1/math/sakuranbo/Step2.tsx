import { useState, useCallback } from 'react';
import type { Mood } from '../../../../types';
import { Numpad } from '../../../../components/Numpad';
import { correctMsg, wrongMsg } from '../../../../utils/messages';
import { DrillCard, FeedbackOverlay } from '../../../shared/DrillShared';

interface Problem {
  n: number;
  given: number;
  answer: number;
  givenLeft: boolean;
}

function genProblem(): Problem {
  const n = Math.floor(Math.random() * 7) + 3; // 3-9
  const given = Math.floor(Math.random() * (n - 1)) + 1; // 1 to n-1
  return { n, given, answer: n - given, givenLeft: Math.random() < 0.5 };
}

interface Step2Props {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
}

export function Step2({ onBuddy, onRecord }: Step2Props) {
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

  const { n, given, answer, givenLeft } = problem;
  const leftDisplay = givenLeft ? String(given) : (phase === 'feedback' ? String(answer) : input);
  const rightDisplay = givenLeft ? (phase === 'feedback' ? String(answer) : input) : String(given);
  const leftPreFilled = givenLeft;
  const rightPreFilled = !givenLeft;
  const leftActive = !givenLeft && phase === 'input';
  const rightActive = givenLeft && phase === 'input';

  return (
    <DrillCard title="かずを わけよう">
      <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 700, color: '#A8957D', marginBottom: 16 }}>
        {n} は {given} と ？ に わけられるかな？
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
        <CherryTree
          n={n}
          leftDisplay={leftDisplay}
          rightDisplay={rightDisplay}
          leftPreFilled={leftPreFilled}
          rightPreFilled={rightPreFilled}
          leftActive={leftActive}
          rightActive={rightActive}
          shake={shake}
        />
      </div>

      {phase === 'input' ? (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Numpad value={input} onChange={setInput} onSubmit={submit} maxLength={1} />
        </div>
      ) : (
        <FeedbackOverlay correct={correct} onNext={next} correctAnswer={String(answer)} />
      )}
    </DrillCard>
  );
}

function CherryTree({ n, leftDisplay, rightDisplay, leftPreFilled, rightPreFilled, leftActive, rightActive, shake }: {
  n: number;
  leftDisplay: string; rightDisplay: string;
  leftPreFilled: boolean; rightPreFilled: boolean;
  leftActive: boolean; rightActive: boolean;
  shake: boolean;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TopChip value={n} />
      <svg width="140" height="52" style={{ marginTop: -4 }}>
        <line x1="70" y1="0" x2="22" y2="46" stroke="#D4B896" strokeWidth="3" strokeLinecap="round" />
        <line x1="70" y1="0" x2="118" y2="46" stroke="#D4B896" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <div style={{ display: 'flex', gap: 44, marginTop: -44 }}>
        <CherryCircle display={leftDisplay} preFilled={leftPreFilled} active={leftActive} shake={leftActive ? shake : false} />
        <CherryCircle display={rightDisplay} preFilled={rightPreFilled} active={rightActive} shake={rightActive ? shake : false} />
      </div>
    </div>
  );
}

function TopChip({ value }: { value: number }) {
  return (
    <div style={{
      width: 60, height: 60, borderRadius: '50%',
      background: '#FF9F45', color: '#fff',
      display: 'grid', placeItems: 'center',
      fontSize: 30, fontWeight: 800,
      boxShadow: '0 4px 0 rgba(0,0,0,.12)',
    }}>
      {value}
    </div>
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
      boxShadow: preFilled ? '0 4px 0 #CC3A66' : 'none',
      animation: anim,
      transition: 'border-color .2s, background .2s',
      flexShrink: 0,
    }}>
      {filled ? display : <span style={{ fontSize: 22 }}>？</span>}
    </div>
  );
}
