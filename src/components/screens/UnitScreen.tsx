import { UNITS_BY_SUBJECT } from '../../data/units';
import type { Unit } from '../../types';

interface UnitScreenProps {
  subject: string;
  onSelect: (unitKey: string) => void;
}

export function UnitScreen({ subject, onSelect }: UnitScreenProps) {
  const units = UNITS_BY_SUBJECT[subject] ?? [];

  return (
    <section>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{
          fontFamily: "'Mochiy Pop One', sans-serif",
          fontSize: 'clamp(24px, 4vw, 36px)',
          margin: '0 0 4px',
          color: '#4A3B2A',
        }}>
          たんげんを えらぼう
        </h1>
        <p style={{ margin: 0, fontWeight: 700, color: '#A8957D', fontSize: 17 }}>
          やりたい たんげんを タップしてね
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 18,
      }}>
        {units.map(unit => (
          <UnitCard key={unit.key} unit={unit} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function UnitCard({ unit, onSelect }: { unit: Unit; onSelect: (key: string) => void }) {
  return (
    <button
      onClick={() => onSelect(unit.key)}
      style={{
        textAlign: 'left',
        padding: '22px 24px',
        background: '#fff',
        border: `3px solid ${unit.soft}`,
        borderRadius: 26,
        boxShadow: `0 9px 0 ${unit.soft}`,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        cursor: 'pointer',
      }}
    >
      {/* Icon circle */}
      <div style={{
        flexShrink: 0,
        width: 72,
        height: 72,
        borderRadius: 22,
        background: unit.color,
        display: 'grid',
        placeItems: 'center',
        boxShadow: `0 6px 14px ${unit.soft}`,
      }}>
        <CherryIcon />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#B7A488', letterSpacing: '.05em', marginBottom: 2 }}>
          {unit.furi}
        </div>
        <div style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 900,
          fontSize: 24,
          color: '#4A3B2A',
          lineHeight: 1.2,
        }}>
          {unit.name}
        </div>
        <div style={{ marginTop: 6, fontSize: 13, color: '#B7A488', fontWeight: 700 }}>
          {unit.stepCount} ステップ
        </div>
      </div>
      <span style={{ color: unit.color, fontSize: 26, fontWeight: 800 }}>›</span>
    </button>
  );
}

function CherryIcon() {
  return (
    <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
      {/* stem */}
      <path d="M21 6 C21 6 25 10 28 16" stroke="#3FA35A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M21 6 C21 6 17 10 14 16" stroke="#3FA35A" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <line x1="21" y1="3" x2="21" y2="7" stroke="#3FA35A" strokeWidth="2.5" strokeLinecap="round" />
      {/* leaf */}
      <ellipse cx="23" cy="4" rx="4" ry="2.5" fill="#56C36F" transform="rotate(-30 23 4)" />
      {/* left cherry */}
      <circle cx="14" cy="22" r="7" fill="#FF6F91" />
      <circle cx="12" cy="20" r="2" fill="rgba(255,255,255,.4)" />
      {/* right cherry */}
      <circle cx="28" cy="22" r="7" fill="#FF4477" />
      <circle cx="26" cy="20" r="2" fill="rgba(255,255,255,.4)" />
    </svg>
  );
}
