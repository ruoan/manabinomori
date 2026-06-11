import { STEP_LABELS, UNITS_BY_SUBJECT } from '../../data/units';
import type { StepProgress } from '../../hooks/useProgress';

interface StepScreenProps {
  unitKey: string;
  onSelect: (step: number) => void;
  getStep: (stepKey: string) => StepProgress;
}

const STEP_COLORS = [
  { color: '#5B9BFF', soft: '#E6EFFF', shadow: '#9FC2F5' },
  { color: '#FF9F45', soft: '#FFF0E0', shadow: '#FFD09A' },
  { color: '#FF6F91', soft: '#FFE6ED', shadow: '#FFB3C6' },
  { color: '#34C77B', soft: '#DFF6EC', shadow: '#8EDCB5' },
  { color: '#A98BFF', soft: '#EDE7FF', shadow: '#C4AFFF' },
];

export function StepScreen({ unitKey, onSelect, getStep }: StepScreenProps) {
  const labels = STEP_LABELS[unitKey] ?? [];
  const units = Object.values(UNITS_BY_SUBJECT).flat();
  const unit = units.find(u => u.key === unitKey);

  return (
    <section>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{
          fontFamily: "'Mochiy Pop One', sans-serif",
          fontSize: 'clamp(24px, 4vw, 36px)',
          margin: '0 0 4px',
          color: '#4A3B2A',
        }}>
          {unit?.name ?? unitKey}
        </h1>
        <p style={{ margin: 0, fontWeight: 700, color: '#A8957D', fontSize: 17 }}>
          ステップを えらぼう
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {labels.map((label, i) => {
          const stepKey = `step${i + 1}`;
          const progress = getStep(stepKey);
          const palette = STEP_COLORS[i] ?? STEP_COLORS[0];
          return (
            <StepCard
              key={stepKey}
              step={i + 1}
              name={label.name}
              desc={label.desc}
              attempts={progress.attempts}
              color={palette.color}
              soft={palette.soft}
              shadow={palette.shadow}
              onSelect={() => onSelect(i + 1)}
            />
          );
        })}
      </div>
    </section>
  );
}

interface StepCardProps {
  step: number;
  name: string;
  desc: string;
  attempts: number;
  color: string;
  soft: string;
  shadow: string;
  onSelect: () => void;
}

function StepCard({ step, name, desc, attempts, color, soft, shadow, onSelect }: StepCardProps) {
  return (
    <button
      onClick={onSelect}
      style={{
        textAlign: 'left',
        padding: '18px 22px',
        background: '#fff',
        border: `3px solid ${soft}`,
        borderRadius: 22,
        boxShadow: `0 7px 0 ${soft}`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        cursor: 'pointer',
        width: '100%',
      }}
    >
      {/* Step number badge */}
      <div style={{
        flexShrink: 0,
        width: 54,
        height: 54,
        borderRadius: 16,
        background: color,
        display: 'grid',
        placeItems: 'center',
        boxShadow: `0 5px 0 ${shadow}`,
        color: '#fff',
        fontSize: 11,
        fontWeight: 800,
        lineHeight: 1.2,
        textAlign: 'center',
      }}>
        <span style={{ fontSize: 9, letterSpacing: '.04em', opacity: .85 }}>ステップ</span>
        <span style={{ fontSize: 24, lineHeight: 1 }}>{step}</span>
      </div>

      {/* Text */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 900,
          fontSize: 18,
          color: '#4A3B2A',
          marginBottom: 3,
        }}>
          {name}
        </div>
        <div style={{ fontSize: 13, color: '#B7A488', fontWeight: 700 }}>{desc}</div>
      </div>

      {/* Attempt count */}
      <div style={{ flexShrink: 0, textAlign: 'center' }}>
        {attempts > 0 && (
          <div style={{
            background: soft,
            borderRadius: 20,
            padding: '4px 10px',
            fontSize: 13,
            fontWeight: 800,
            color,
            whiteSpace: 'nowrap',
          }}>
            {attempts} かい
          </div>
        )}
      </div>

      <span style={{ color, fontSize: 24, fontWeight: 800, flexShrink: 0 }}>›</span>
    </button>
  );
}
