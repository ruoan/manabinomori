import { SUBJECTS } from '../../data/subjects';
import { GRADES } from '../../data/grades';
import type { Subject } from '../../types';

interface SubjectScreenProps {
  grade: number;
  onSelect: (subjectKey: string) => void;
}

export function SubjectScreen({ grade, onSelect }: SubjectScreenProps) {
  const gradeInfo = GRADES.find(g => g.n === grade);
  const gradeLabel = gradeInfo?.label ?? `${grade}年生`;
  return (
    <section>
      <div style={{ marginBottom: 26 }}>
        <h1 style={{
          fontFamily: "'Mochiy Pop One', sans-serif",
          fontSize: 'clamp(26px, 4.4vw, 40px)',
          margin: '0 0 4px',
          color: '#4A3B2A',
        }}>
          {gradeLabel}の おべんきょう
        </h1>
        <p style={{ margin: 0, fontWeight: 700, color: '#A8957D', fontSize: 17 }}>
          きょうかを えらぼう
        </p>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 18,
      }}>
        {SUBJECTS.map((subject) => (
          <SubjectCard key={subject.key} subject={subject} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function SubjectCard({ subject, onSelect }: { subject: Subject; onSelect: (key: string) => void }) {
  return (
    <button
      onClick={() => onSelect(subject.key)}
      style={{
        textAlign: 'left',
        padding: 22,
        background: '#fff',
        border: `3px solid ${subject.soft}`,
        borderRadius: 26,
        boxShadow: `0 9px 0 ${subject.soft}`,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <div style={{
        flexShrink: 0,
        width: 72,
        height: 72,
        borderRadius: 22,
        background: subject.color,
        display: 'grid',
        placeItems: 'center',
        boxShadow: `0 6px 14px ${subject.soft}`,
      }}>
        <span style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 900,
          fontSize: 38,
          color: '#fff',
          lineHeight: 1,
        }}>
          {subject.kanji}
        </span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#B7A488', letterSpacing: '.05em' }}>
          {subject.furi}
        </div>
        <div style={{
          fontFamily: "'Zen Maru Gothic', sans-serif",
          fontWeight: 900,
          fontSize: 26,
          color: '#4A3B2A',
          lineHeight: 1.1,
        }}>
          {subject.name}
        </div>
      </div>
      <span style={{ color: subject.color, fontSize: 26, fontWeight: 800 }}>›</span>
    </button>
  );
}
