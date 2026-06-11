import type { Mood } from '../types';

interface BuddyProps {
  mood: Mood;
  message: string;
}

export function Buddy({ mood, message }: BuddyProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      marginBottom: 20,
      paddingTop: 10,
      pointerEvents: 'none',
    }}>
      <div style={{ zoom: 0.62, flexShrink: 0 }}>
        <PikoBody mood={mood} />
      </div>
      <SpeechBubble message={message} />
    </div>
  );
}

function PikoBody({ mood }: { mood: Mood }) {
  return (
    <div style={{
      position: 'relative',
      width: 118,
      height: 130,
      flexShrink: 0,
      animation: 'bob 2.8s ease-in-out infinite',
    }}>
      {/* stem */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 2,
        transform: 'translateX(-50%)',
        width: 6,
        height: 18,
        background: '#3FA35A',
        borderRadius: 4,
      }} />
      {/* leaf */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: -16,
        transform: 'translateX(-50%)',
        width: 26,
        height: 22,
        background: '#56C36F',
        borderRadius: '0 80% 0 80%',
      }} />
      {/* sparkles when cheering */}
      {mood === 'cheer' && <Sparkles />}
      {/* body */}
      <div style={{
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 118,
        height: 108,
        background: 'radial-gradient(120% 120% at 35% 25%, #FFE07A 0%, #FFB23E 60%, #FF9B2E 100%)',
        borderRadius: '48% 48% 46% 46% / 54% 54% 46% 46%',
        boxShadow: 'inset 0 -10px 16px rgba(214,120,20,.25), 0 12px 22px rgba(255,150,40,.35)',
      }} />
      {/* belly */}
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: 14,
        transform: 'translateX(-50%)',
        width: 62,
        height: 46,
        background: 'rgba(255,255,255,.5)',
        borderRadius: '50%',
      }} />
      {/* left eye */}
      <div style={{ position: 'absolute', left: 32, bottom: 58, width: 15, height: 19, background: '#3A2A1A', borderRadius: '50%' }}>
        <div style={{ position: 'absolute', top: 3, left: 3, width: 5, height: 5, background: '#fff', borderRadius: '50%' }} />
      </div>
      {/* right eye */}
      <div style={{ position: 'absolute', right: 32, bottom: 58, width: 15, height: 19, background: '#3A2A1A', borderRadius: '50%' }}>
        <div style={{ position: 'absolute', top: 3, left: 3, width: 5, height: 5, background: '#fff', borderRadius: '50%' }} />
      </div>
      {/* cheeks */}
      <div style={{ position: 'absolute', left: 21, bottom: 46, width: 15, height: 9, background: '#FF9DB0', borderRadius: '50%', opacity: .85 }} />
      <div style={{ position: 'absolute', right: 21, bottom: 46, width: 15, height: 9, background: '#FF9DB0', borderRadius: '50%', opacity: .85 }} />
      {/* mouth */}
      <div style={{
        position: 'absolute',
        left: '50%',
        bottom: 40,
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 22,
      }}>
        <Mouth mood={mood} />
      </div>
    </div>
  );
}

function Mouth({ mood }: { mood: Mood }) {
  if (mood === 'cheer') {
    return (
      <div style={{
        width: 30,
        height: 18,
        background: '#8A3B1F',
        borderRadius: '0 0 18px 18px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          left: '50%',
          bottom: 0,
          transform: 'translateX(-50%)',
          width: 16,
          height: 8,
          background: '#FF8A9A',
          borderRadius: '10px 10px 0 0',
        }} />
      </div>
    );
  }
  if (mood === 'oops') {
    return (
      <div style={{
        width: 13,
        height: 13,
        border: '3px solid #8A3B1F',
        borderRadius: '50%',
        boxSizing: 'border-box',
      }} />
    );
  }
  return (
    <div style={{
      width: 24,
      height: 11,
      borderBottom: '4px solid #8A3B1F',
      borderRadius: '0 0 30px 30px',
    }} />
  );
}

function Sparkles() {
  const starStyle = (extra: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    background: '#FFD93C',
    clipPath: 'polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)',
    animation: 'twinkle 1s ease-in-out infinite',
    ...extra,
  });
  return (
    <>
      <div style={starStyle({ left: -6, top: 18, width: 16, height: 16 })} />
      <div style={starStyle({ right: -4, top: 34, width: 12, height: 12, animationDelay: '.3s' })} />
      <div style={starStyle({ right: 6, top: 4, width: 10, height: 10, animationDelay: '.5s' })} />
    </>
  );
}

function SpeechBubble({ message }: { message: string }) {
  return (
    <div style={{
      position: 'relative',
      maxWidth: 210,
      background: '#fff',
      border: '3px solid #FFE3CF',
      borderRadius: 18,
      padding: '9px 14px',
      boxShadow: '0 8px 18px rgba(180,120,60,.18)',
    }}>
      <div style={{ fontSize: 11, color: '#FF9B2E', fontWeight: 900, letterSpacing: '.1em', marginBottom: 2 }}>ぴこ</div>
      <div style={{ fontWeight: 800, color: '#5A4632', fontSize: 15, lineHeight: 1.4 }}>{message}</div>
      <div style={{
        position: 'absolute',
        left: -9,
        top: 14,
        width: 16,
        height: 16,
        background: '#fff',
        borderTop: '3px solid #FFE3CF',
        borderLeft: '3px solid #FFE3CF',
        transform: 'rotate(-45deg)',
      }} />
    </div>
  );
}
