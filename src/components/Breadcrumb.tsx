export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  onBack: () => void;
}

export function Breadcrumb({ items, onBack }: BreadcrumbProps) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 22,
      flexWrap: 'wrap',
    }}>
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
          fontSize: 15,
          padding: '8px 16px 8px 12px',
          borderRadius: 999,
          boxShadow: '0 3px 0 #F2DCC6',
        }}
      >
        ‹ もどる
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, fontSize: 14, flexWrap: 'wrap' }}>
        {items.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span style={{ color: '#C4AE96' }}>›</span>}
            <span
              onClick={item.onClick}
              style={{
                cursor: item.onClick ? 'pointer' : 'default',
                color: i === items.length - 1 ? '#4A3B2A' : '#9C8A74',
              }}
            >
              {item.label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
