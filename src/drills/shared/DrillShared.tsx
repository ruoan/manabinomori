import type { ReactNode, CSSProperties } from 'react';

interface DrillCardProps {
  title: string;
  children: ReactNode;
  maxWidth?: number;
}

export function DrillCard({ title, children, maxWidth = 560 }: DrillCardProps) {
  return (
    <div style={{
      background: '#fff',
      borderRadius: 28,
      border: '3px solid #F4E3CC',
      boxShadow: '0 10px 0 #F4E3CC',
      padding: 'clamp(20px, 4vw, 36px)',
      maxWidth,
      margin: '0 auto',
    }}>
      <div style={{
        fontFamily: "'Zen Maru Gothic', sans-serif",
        fontWeight: 900,
        fontSize: 18,
        color: '#B7A488',
        marginBottom: 24,
        textAlign: 'center',
        letterSpacing: '.04em',
      }}>
        {title}
      </div>
      {children}
    </div>
  );
}

interface FeedbackOverlayProps {
  correct: boolean;
  onNext: () => void;
  correctAnswer?: string;
}

export function FeedbackOverlay({ correct, onNext, correctAnswer }: FeedbackOverlayProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 16,
      padding: '16px 0 4px',
      animation: 'slideIn .3s ease',
    }}>
      <div style={{
        fontSize: 28,
        fontWeight: 800,
        color: correct ? '#34C77B' : '#FF9F45',
        background: correct ? '#DFF6EC' : '#FFF0E0',
        borderRadius: 999,
        padding: '10px 28px',
        letterSpacing: '.06em',
      }}>
        {correct ? 'せいかい！' : 'ざんねん…'}
      </div>
      {!correct && correctAnswer && (
        <div style={{ fontSize: 15, fontWeight: 700, color: '#A8957D' }}>
          こたえは <span style={{ color: '#FF7A4D', fontSize: 20, fontWeight: 800 }}>{correctAnswer}</span> だよ
        </div>
      )}
      <button
        onClick={onNext}
        style={{
          marginTop: 4,
          padding: '14px 40px',
          background: '#5B9BFF',
          color: '#fff',
          border: 'none',
          borderRadius: 999,
          fontSize: 20,
          fontWeight: 800,
          boxShadow: '0 5px 0 #3A78D9',
          cursor: 'pointer',
          fontFamily: 'inherit',
          letterSpacing: '.06em',
          transition: 'transform .1s, box-shadow .1s',
        }}
        onMouseDown={e => {
          (e.currentTarget.style.transform = 'translateY(4px)');
          (e.currentTarget.style.boxShadow = 'none');
        }}
        onMouseUp={e => {
          (e.currentTarget.style.transform = '');
          (e.currentTarget.style.boxShadow = '0 5px 0 #3A78D9');
        }}
        onMouseLeave={e => {
          (e.currentTarget.style.transform = '');
          (e.currentTarget.style.boxShadow = '0 5px 0 #3A78D9');
        }}
      >
        つぎへ ›
      </button>
    </div>
  );
}

export function SpeakButton({ onClick, style }: { onClick: () => void; style?: CSSProperties }) {
  return (
    <button
      onClick={onClick}
      title="よみあげ"
      style={{
        background: '#E6EFFF',
        border: '2px solid #9FC2F5',
        borderRadius: '50%',
        width: 40,
        height: 40,
        cursor: 'pointer',
        fontSize: 20,
        display: 'inline-grid',
        placeItems: 'center',
        padding: 0,
        flexShrink: 0,
        userSelect: 'none',
        WebkitUserSelect: 'none',
        touchAction: 'manipulation',
        transition: 'background .15s',
        ...style,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = '#D0E4FF')}
      onMouseLeave={e => (e.currentTarget.style.background = '#E6EFFF')}
    >
      🔊
    </button>
  );
}

export function BlankBox({ value, active, shake, size = 'md' }: {
  value?: string | number;
  active?: boolean;
  shake?: boolean;
  size?: 'sm' | 'md' | 'lg';
}) {
  const dim = size === 'lg' ? 80 : size === 'sm' ? 52 : 68;
  const fs = size === 'lg' ? 36 : size === 'sm' ? 22 : 30;

  return (
    <div style={{
      width: dim,
      height: dim,
      borderRadius: 16,
      border: active ? '3px solid #5B9BFF' : '3px dashed #D4C0A8',
      background: active ? '#EEF5FF' : value !== undefined ? '#E8F5FF' : '#FAFAFA',
      display: 'grid',
      placeItems: 'center',
      fontSize: fs,
      fontWeight: 800,
      color: value !== undefined ? '#5B9BFF' : '#C4AE96',
      flexShrink: 0,
      animation: shake ? 'shake .35s ease' : undefined,
      transition: 'border-color .2s, background .2s',
      boxShadow: active ? '0 0 0 3px rgba(91,155,255,.2)' : 'none',
    }}>
      {value !== undefined ? value : '？'}
    </div>
  );
}
