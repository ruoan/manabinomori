import { useState, useCallback } from 'react';
import type { StepProps } from './index';
import { VEGETABLES, VegetableDisplay } from './Step1';
import { Numpad } from '../../../../components/Numpad';
import { correctMsg, wrongMsg } from '../../../../utils/messages';
import { DrillCard, FeedbackOverlay } from '../../../shared/DrillShared';

function genProblem() {
  const veg = VEGETABLES[Math.floor(Math.random() * VEGETABLES.length)];
  const count = Math.floor(Math.random() * 10) + 1;
  return { veg, count };
}

export function Step2({ onBuddy, onRecord }: StepProps) {
  const [problem, setProblem] = useState(genProblem);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'input' | 'feedback'>('input');
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = useCallback(() => {
    const num = parseInt(input, 10);
    if (isNaN(num)) return;
    const ok = num === problem.count;
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

  const { veg, count } = problem;

  return (
    <DrillCard title="もっと かぞえよう" maxWidth={760}>
      {phase === 'input' ? (
        <div className="drill-two-col">
          <div className="drill-problem" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#A8957D', marginBottom: 14 }}>
              {veg.emoji} {veg.name}は いくつ ありますか？
            </div>
            <VegetableDisplay veg={veg} count={count} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 18 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#4A3B2A' }}>こたえ：</span>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                border: input ? '3px solid #34C77B' : '3px dashed #D4C0A8',
                background: input ? '#DFF6EC' : '#FAFAFA',
                display: 'grid',
                placeItems: 'center',
                fontSize: 32,
                fontWeight: 800,
                color: '#34C77B',
                animation: shake ? 'shake .35s ease' : undefined,
                transition: 'all .2s',
              }}>
                {input || <span style={{ color: '#C4AE96', fontSize: 26 }}>？</span>}
              </div>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#4A3B2A' }}>こ</span>
            </div>
          </div>
          <Numpad value={input} onChange={setInput} onSubmit={submit} maxLength={2} />
        </div>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <VegetableDisplay veg={veg} count={count} highlight />
            <div style={{ fontSize: 18, fontWeight: 800, color: '#4A3B2A', marginTop: 12 }}>
              {veg.name}は <span style={{ fontSize: 36, color: '#34C77B' }}>{count}</span>こ！
            </div>
          </div>
          <FeedbackOverlay correct={correct} onNext={next} correctAnswer={String(count)} />
        </>
      )}
    </DrillCard>
  );
}
