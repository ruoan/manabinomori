import { GRADES, SUBJECT_DOT_COLORS } from '../../data/grades';
import type { Grade } from '../../types';

interface GradeScreenProps {
  onSelect: (grade: number) => void;
}

export function GradeScreen({ onSelect }: GradeScreenProps) {
  return (
    <section>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <div style={{
          display: 'inline-block',
          background: '#fff',
          border: '2px solid #FFE3CF',
          color: '#FF7A4D',
          fontWeight: 800,
          fontSize: 14,
          padding: '6px 16px',
          borderRadius: 999,
          boxShadow: '0 3px 0 #F4DFCB',
          marginBottom: 14,
        }}>
          きょうも いっしょに がんばろう！
        </div>
        <h1 style={{
          fontFamily: "'Mochiy Pop One', sans-serif",
          fontSize: 'clamp(30px, 5vw, 46px)',
          margin: '0 0 6px',
          color: '#4A3B2A',
        }}>
          なんねんせい？
        </h1>
        <p style={{ margin: 0, fontWeight: 700, color: '#A8957D', fontSize: 17 }}>
          学年を えらんでね
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 18,
      }}>
        {GRADES.map((grade) => (
          <GradeCard key={grade.n} grade={grade} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function GradeCard({ grade, onSelect }: { grade: Grade; onSelect: (n: number) => void }) {
  return (
    <button
      onClick={() => onSelect(grade.n)}
      style={{
        textAlign: 'left',
        padding: 22,
        background: '#fff',
        border: `3px solid ${grade.soft}`,
        borderRadius: 26,
        boxShadow: `0 9px 0 ${grade.soft}`,
        display: 'flex',
        alignItems: 'center',
        gap: 18,
      }}
    >
      <div style={{
        flexShrink: 0,
        width: 70,
        height: 70,
        borderRadius: 22,
        background: grade.color,
        display: 'grid',
        placeItems: 'center',
        boxShadow: `0 6px 12px ${grade.soft}`,
      }}>
        <span style={{
          fontFamily: "'Mochiy Pop One', sans-serif",
          fontSize: 34,
          color: '#fff',
          lineHeight: 1,
        }}>
          {grade.n}
        </span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 900,
          fontSize: 24,
          color: '#4A3B2A',
        }}>
          {grade.n}年生
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
          {SUBJECT_DOT_COLORS.map((color, i) => (
            <span key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: color, display: 'inline-block' }} />
          ))}
        </div>
      </div>
      <span style={{ color: grade.color, fontSize: 26, fontWeight: 800 }}>›</span>
    </button>
  );
}
