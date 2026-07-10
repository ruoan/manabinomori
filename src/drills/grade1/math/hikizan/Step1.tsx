import { useState, useCallback } from 'react';
import type { Mood } from '../../../../types';
import { Numpad } from '../../../../components/Numpad';
import { correctMsg, wrongMsg } from '../../../../utils/messages';
import { DrillCard, FeedbackOverlay, SpeakButton } from '../../../shared/DrillShared';
import { useSpeech } from '../../../../hooks/useSpeech';

interface Problem {
  a: number;
  b: number;
  answer: number;
}

function genProblem(): Problem {
  const a = Math.floor(Math.random() * 9) + 1; // 1-9
  const b = Math.floor(Math.random() * (a + 1)); // 0-a
  return { a, b, answer: a - b };
}

interface Step1Props {
  onBuddy: (mood: Mood, msg: string) => void;
  onRecord: () => void;
}

export function Step1({ onBuddy, onRecord }: Step1Props) {
  const [problem, setProblem] = useState<Problem>(genProblem);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'input' | 'feedback'>('input');
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  const { speak } = useSpeech();

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
    onBuddy('happy', 'つぎも できるよ！');
  }, [onBuddy]);

  const { a, b, answer } = problem;
  const questionText = `${a} ひく ${b} は？`;

  const problemArea = (
    <div className="drill-problem" style={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 14, fontWeight: 700, color: '#A8957D' }}>こたえだけ かいてみよう！</span>
        {phase === 'input' && <SpeakButton onClick={() => speak(questionText)} style={{ width: 34, height: 34, fontSize: 16 }} />}
      </div>
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        background: '#F0F7FF',
        borderRadius: 24,
        padding: '18px 28px',
        border: '3px solid #D0E8FF',
      }}>
        <BigNum val={a} color="#5B9BFF" />
        <span style={{ fontSize: 36, fontWeight: 800, color: '#A8957D' }}>－</span>
        <BigNum val={b} color="#FF9F45" />
        <span style={{ fontSize: 36, fontWeight: 800, color: '#A8957D' }}>＝</span>
        {phase === 'feedback' ? (
          <BigNum val={answer} color="#34C77B" />
        ) : (
          <AnswerBox input={input} shake={shake} />
        )}
      </div>
    </div>
  );

  return (
    <DrillCard title="ひきざん ドリル" maxWidth={800}>
      {phase === 'input' ? (
        <div className="drill-two-col">
          {problemArea}
          <Numpad value={input} onChange={setInput} onSubmit={submit} maxLength={1} />
        </div>
      ) : (
        <>
          {problemArea}
          <FeedbackOverlay
            correct={correct}
            onNext={next}
            correctAnswer={!correct ? String(answer) : undefined}
          />
        </>
      )}
    </DrillCard>
  );
}

function BigNum({ val, color }: { val: number; color: string }) {
  return (
    <div style={{
      width: 72, height: 72, borderRadius: '50%',
      background: color, color: '#fff',
      display: 'grid', placeItems: 'center',
      fontSize: 34, fontWeight: 800,
      boxShadow: '0 5px 0 rgba(0,0,0,.13)',
      flexShrink: 0,
    }}>
      {val}
    </div>
  );
}

function AnswerBox({ input, shake }: { input: string; shake: boolean }) {
  const filled = input !== '';
  return (
    <div style={{
      width: 84, height: 72, borderRadius: 20,
      background: filled ? '#EEF5FF' : '#F5F0EA',
      border: `4px solid ${filled ? '#5B9BFF' : '#D4C0A8'}`,
      display: 'grid', placeItems: 'center',
      fontSize: 36, fontWeight: 800,
      color: filled ? '#5B9BFF' : '#C4AE96',
      boxShadow: filled ? '0 0 0 3px rgba(91,155,255,.2)' : 'none',
      animation: shake ? 'shake .35s ease' : undefined,
      transition: 'all .2s',
      flexShrink: 0,
    }}>
      {filled ? input : <span style={{ fontSize: 28 }}>？</span>}
    </div>
  );
}
