import { useState, useCallback, useEffect, useMemo } from 'react';
import type { StepProps } from './index';
import { VEGETABLES } from './Step1';
import { Numpad } from '../../../../components/Numpad';
import { correctMsg, wrongMsg } from '../../../../utils/messages';
import { DrillCard, FeedbackOverlay, SpeakButton } from '../../../shared/DrillShared';
import { useSpeech } from '../../../../hooks/useSpeech';

interface MixedProblem {
  items: { emoji: string; name: string }[];
  target: { emoji: string; name: string };
  targetCount: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function genProblem(): MixedProblem {
  const vegCount = Math.random() < 0.5 ? 2 : 3;
  const picked = shuffle(VEGETABLES).slice(0, vegCount);
  const targetIdx = Math.floor(Math.random() * picked.length);
  const target = picked[targetIdx];

  const items: { emoji: string; name: string }[] = [];
  picked.forEach((veg, i) => {
    const isTarget = i === targetIdx;
    const count = isTarget
      ? Math.floor(Math.random() * 5) + 2
      : Math.floor(Math.random() * 4) + 1;
    for (let j = 0; j < count; j++) {
      items.push(veg);
    }
  });

  const targetCount = items.filter(it => it.emoji === target.emoji).length;
  return { items: shuffle(items), target, targetCount };
}

export function Step3({ onBuddy, onRecord }: StepProps) {
  const [problem, setProblem] = useState<MixedProblem>(genProblem);
  const [input, setInput] = useState('');
  const [phase, setPhase] = useState<'input' | 'feedback'>('input');
  const [correct, setCorrect] = useState(false);
  const [shake, setShake] = useState(false);
  const { speak } = useSpeech();

  const questionText = `${problem.target.name}は いくつ ありますか？`;

  useEffect(() => {
    const id = setTimeout(() => speak(questionText), 350);
    return () => clearTimeout(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problem]);

  const submit = useCallback(() => {
    const num = parseInt(input, 10);
    if (isNaN(num)) return;
    const ok = num === problem.targetCount;
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

  const { items, target, targetCount } = problem;

  const feedbackItems = useMemo(
    () => items.map(it => ({ ...it, isTarget: it.emoji === target.emoji })),
    [items, target],
  );

  return (
    <DrillCard title="まぜこぜ やさい" maxWidth={800}>
      {phase === 'input' ? (
        <div className="drill-two-col">
          <div className="drill-problem" style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#DFF6EC',
              border: '2px solid #34C77B',
              borderRadius: 999,
              padding: '8px 16px 8px 20px',
              marginBottom: 14,
            }}>
              <span style={{ fontSize: 28 }}>{target.emoji}</span>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#228B55' }}>
                {questionText}
              </span>
              <SpeakButton onClick={() => speak(questionText)} style={{ width: 34, height: 34, fontSize: 16 }} />
            </div>
            <MixedVegetableGrid items={items} highlightEmoji={undefined} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginTop: 16 }}>
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
            <MixedVegetableGrid items={feedbackItems} highlightEmoji={target.emoji} />
            <div style={{ fontSize: 18, fontWeight: 800, color: '#4A3B2A', marginTop: 14 }}>
              {target.emoji} {target.name}は{' '}
              <span style={{ fontSize: 36, color: '#34C77B' }}>{targetCount}</span>こ！
            </div>
          </div>
          <FeedbackOverlay correct={correct} onNext={next} correctAnswer={String(targetCount)} />
        </>
      )}
    </DrillCard>
  );
}

function MixedVegetableGrid({ items, highlightEmoji }: {
  items: { emoji: string; name?: string }[];
  highlightEmoji: string | undefined;
}) {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 8,
      justifyContent: 'center',
      alignItems: 'center',
      padding: '16px 12px',
      background: '#FAFAF8',
      borderRadius: 20,
      border: '2px dashed #E4D5C0',
      minHeight: 90,
    }}>
      {items.map((it, i) => {
        const isHighlight = highlightEmoji !== undefined && it.emoji === highlightEmoji;
        return (
          <span
            key={i}
            style={{
              fontSize: 44,
              lineHeight: 1,
              filter: highlightEmoji === undefined
                ? 'drop-shadow(0 2px 4px rgba(0,0,0,.1))'
                : isHighlight
                  ? 'drop-shadow(0 0 6px rgba(52,199,123,.8))'
                  : 'grayscale(60%) opacity(0.5)',
              transition: 'filter .3s',
            }}
          >
            {it.emoji}
          </span>
        );
      })}
    </div>
  );
}
