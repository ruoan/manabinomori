export function Header() {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 30,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      padding: '14px clamp(18px, 4vw, 40px)',
      background: 'rgba(255,247,234,.82)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid #F4E3CC',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <PikoIcon />
        <div style={{
          fontFamily: "'Mochiy Pop One', sans-serif",
          fontSize: 22,
          color: '#FF7A4D',
          letterSpacing: '.02em',
        }}>
          まなびの<span style={{ color: '#3FA35A' }}>森</span>
        </div>
      </div>
      <div style={{ fontSize: 14, fontWeight: 800, color: '#B7A488', whiteSpace: 'nowrap' }}>
        たのしく まなぼう！
      </div>
    </header>
  );
}

function PikoIcon() {
  return (
    <div style={{ position: 'relative', width: 42, height: 42 }}>
      <div style={{
        position: 'absolute',
        inset: 0,
        borderRadius: '50%',
        background: 'radial-gradient(120% 120% at 35% 25%, #FFE07A, #FFB23E 65%, #FF9B2E)',
        boxShadow: '0 4px 8px rgba(255,150,40,.35)',
      }} />
      <div style={{ position: 'absolute', left: 11, top: 16, width: 6, height: 8, background: '#3A2A1A', borderRadius: '50%' }} />
      <div style={{ position: 'absolute', right: 11, top: 16, width: 6, height: 8, background: '#3A2A1A', borderRadius: '50%' }} />
      <div style={{
        position: 'absolute',
        left: '50%',
        top: 26,
        transform: 'translateX(-50%)',
        width: 11,
        height: 5,
        borderBottom: '2.5px solid #3A2A1A',
        borderRadius: '0 0 12px 12px',
      }} />
      <div style={{
        position: 'absolute',
        left: '50%',
        top: -5,
        transform: 'translateX(-50%)',
        width: 14,
        height: 12,
        background: '#56C36F',
        borderRadius: '0 80% 0 80%',
      }} />
    </div>
  );
}
