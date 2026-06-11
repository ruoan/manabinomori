const STAR_PATH = 'polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)';

export function BackgroundDecor() {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
      pointerEvents: 'none',
      zIndex: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: -60,
        right: -40,
        width: 260,
        height: 260,
        borderRadius: '50%',
        background: '#FFE39E',
        opacity: .5,
        animation: 'floaty 9s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 80,
        left: -70,
        width: 220,
        height: 220,
        borderRadius: '50%',
        background: '#BFE9D8',
        opacity: .5,
        animation: 'floaty 11s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: 180,
        left: '8%',
        width: 24,
        height: 24,
        background: '#FFC93C',
        clipPath: STAR_PATH,
        animation: 'twinkle 4s ease-in-out infinite',
      }} />
      <div style={{
        position: 'absolute',
        top: 120,
        right: '14%',
        width: 18,
        height: 18,
        background: '#FF9DB0',
        clipPath: STAR_PATH,
        animation: 'twinkle 5s ease-in-out infinite',
        animationDelay: '.6s',
      }} />
      <div style={{
        position: 'absolute',
        bottom: 160,
        right: '10%',
        width: 20,
        height: 20,
        background: '#9AD7B0',
        clipPath: STAR_PATH,
        animation: 'twinkle 4.5s ease-in-out infinite',
        animationDelay: '1.2s',
      }} />
    </div>
  );
}
