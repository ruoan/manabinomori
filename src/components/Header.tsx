export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface HeaderProps {
  breadcrumbItems?: BreadcrumbItem[];
  onBack?: () => void;
  showBreadcrumb?: boolean;
}

export function Header({ breadcrumbItems = [], onBack, showBreadcrumb }: HeaderProps) {
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
      {showBreadcrumb && onBack ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', minWidth: 0 }}>
          <button
            onClick={onBack}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              background: '#fff',
              border: '2px solid #FFE0C4',
              color: '#B07A4E',
              fontFamily: 'inherit',
              fontWeight: 800,
              fontSize: 14,
              padding: '6px 14px 6px 10px',
              borderRadius: 999,
              boxShadow: '0 3px 0 #F2DCC6',
              flexShrink: 0,
            }}
          >
            ‹ もどる
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 13, flexWrap: 'wrap' }}>
            {breadcrumbItems.map((item, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {i > 0 && <span style={{ color: '#C4AE96' }}>›</span>}
                <span
                  onClick={item.onClick}
                  style={{
                    cursor: item.onClick ? 'pointer' : 'default',
                    color: i === breadcrumbItems.length - 1 ? '#4A3B2A' : '#9C8A74',
                  }}
                >
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ fontSize: 14, fontWeight: 800, color: '#B7A488', whiteSpace: 'nowrap' }}>
          たのしく まなぼう！
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
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
