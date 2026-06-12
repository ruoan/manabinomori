interface NumpadProps {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  maxLength?: number;
}

export function Numpad({ value, onChange, onSubmit, disabled, maxLength = 2 }: NumpadProps) {
  const handleDigit = (d: string) => {
    if (disabled) return;
    if (value.length >= maxLength) return;
    onChange(value + d);
  };

  const handleDelete = () => {
    if (disabled) return;
    onChange(value.slice(0, -1));
  };

  const canSubmit = !disabled && value.length > 0;

  return (
    <div className="numpad-shell" style={{
      background: '#FFF7EA',
      borderRadius: 24,
      padding: 14,
      border: '3px solid #F4E3CC',
      boxShadow: '0 8px 20px rgba(180,120,60,.15)',
      width: 256,
    }}>
      {/* Display */}
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: '6px 14px',
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 36,
        fontWeight: 800,
        color: value ? '#FF7A4D' : '#D4C0A8',
        minHeight: 56,
        border: '2px solid #F4E3CC',
        letterSpacing: '.12em',
        lineHeight: '44px',
      }}>
        {value || '？'}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {([7, 8, 9, 4, 5, 6, 1, 2, 3] as number[]).map(n => (
          <NumBtn key={n} label={String(n)} onClick={() => handleDigit(String(n))} disabled={!!disabled} />
        ))}
        <NumBtn label="⌫" onClick={handleDelete} disabled={!!disabled} bg="#FFE6D6" shadow="#F4C9B0" />
        <NumBtn label="0" onClick={() => handleDigit('0')} disabled={!!disabled} />
        <div />
      </div>
      <OkBtn onSubmit={onSubmit} canSubmit={canSubmit} />
    </div>
  );
}

function OkBtn({ onSubmit, canSubmit }: { onSubmit: () => void; canSubmit: boolean }) {
  const shadow = '#3FA35A';
  return (
    <button
      onClick={onSubmit}
      disabled={!canSubmit}
      style={{
        width: '100%',
        height: 72,
        marginTop: 8,
        fontSize: 26,
        fontWeight: 800,
        background: '#56C36F',
        border: 'none',
        borderRadius: 14,
        boxShadow: canSubmit ? `0 5px 0 ${shadow}` : 'none',
        cursor: canSubmit ? 'pointer' : 'not-allowed',
        opacity: canSubmit ? 1 : 0.35,
        color: '#fff',
        fontFamily: 'inherit',
        letterSpacing: '.06em',
        transition: 'transform .08s, box-shadow .08s',
      }}
      onMouseDown={e => {
        if (!canSubmit) return;
        e.currentTarget.style.transform = 'translateY(4px)';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onMouseUp={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = canSubmit ? `0 5px 0 ${shadow}` : 'none';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = canSubmit ? `0 5px 0 ${shadow}` : 'none';
      }}
    >
      OK
    </button>
  );
}

interface NumBtnProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  bg?: string;
  shadow?: string;
  color?: string;
}

function NumBtn({ label, onClick, disabled, bg = '#fff', shadow = '#E8D5BE', color = '#4A3B2A' }: NumBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        height: 60,
        fontSize: label === 'OK' ? 20 : 26,
        fontWeight: 800,
        background: bg,
        border: 'none',
        borderRadius: 14,
        boxShadow: disabled ? 'none' : `0 4px 0 ${shadow}`,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.35 : 1,
        color,
        fontFamily: 'inherit',
        transition: 'transform .08s, box-shadow .08s',
        letterSpacing: '.02em',
      }}
      onMouseDown={e => {
        if (!disabled) (e.currentTarget.style.transform = 'translateY(3px)');
        if (!disabled) (e.currentTarget.style.boxShadow = 'none');
      }}
      onMouseUp={e => {
        (e.currentTarget.style.transform = '');
        (e.currentTarget.style.boxShadow = disabled ? 'none' : `0 4px 0 ${shadow}`);
      }}
      onMouseLeave={e => {
        (e.currentTarget.style.transform = '');
        (e.currentTarget.style.boxShadow = disabled ? 'none' : `0 4px 0 ${shadow}`);
      }}
    >
      {label}
    </button>
  );
}
