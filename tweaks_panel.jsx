const { useState, useEffect } = React;

const TweaksPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState('warm');
  const [layout, setLayout] = useState('editorial');
  const [tickerScale, setTickerScale] = useState(0.55);

  const hasTicker = typeof document !== 'undefined' && !!document.querySelector('.marquee');

  useEffect(() => {
    const savedTheme = localStorage.getItem('anoora-theme') || 'warm';
    const savedLayout = localStorage.getItem('anoora-layout') || 'editorial';
    const savedTicker = parseFloat(localStorage.getItem('anoora-ticker-scale')) || 0.55;
    setTheme(savedTheme);
    setLayout(savedLayout);
    setTickerScale(savedTicker);
    applyTheme(savedTheme);
    applyLayout(savedLayout);
    applyTickerScale(savedTicker);
  }, []);

  const applyTheme = (t) => {
    const root = document.documentElement;
    const themes = {
      warm: {
        '--ink': '#0E0E0C',
        '--paper': '#FAF8F4',
        '--paper-warm': '#F2EDE4',
        '--gold': '#C28A3A',
        '--gold-soft': '#D4A155',
      },
      midnight: {
        '--ink': '#0A0E14',
        '--paper': '#F4F4F2',
        '--paper-warm': '#E8E8E5',
        '--gold': '#8B7355',
        '--gold-soft': '#A28B6A',
      },
      ivory: {
        '--ink': '#1A1813',
        '--paper': '#FFFFFF',
        '--paper-warm': '#F5F1EA',
        '--gold': '#A67B3A',
        '--gold-soft': '#BE9355',
      },
      noir: {
        '--ink': '#000000',
        '--paper': '#EBE6DD',
        '--paper-warm': '#DDD6C7',
        '--gold': '#B8923D',
        '--gold-soft': '#CFA859',
      },
    };
    const vars = themes[t] || themes.warm;
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
    localStorage.setItem('anoora-theme', t);
  };

  const applyLayout = (l) => {
    const grid = document.querySelector('.grid');
    if (grid) {
      if (l === 'compact') grid.classList.add('compact');
      else grid.classList.remove('compact');
    }
    localStorage.setItem('anoora-layout', l);
  };

  const applyTickerScale = (v) => {
    document.documentElement.style.setProperty('--ticker-scale', v);
    localStorage.setItem('anoora-ticker-scale', v);
  };

  const handleTheme = (t) => { setTheme(t); applyTheme(t); };
  const handleLayout = (l) => { setLayout(l); applyLayout(l); };
  const handleTickerScale = (v) => { setTickerScale(v); applyTickerScale(v); };

  const wrap = {
    position: 'fixed',
    bottom: '1.5rem',
    right: '1.5rem',
    zIndex: 1000,
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  };

  const toggleBtn = {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    transition: 'all 250ms cubic-bezier(0.22, 1, 0.36, 1)',
    color: '#fff',
    backgroundColor: '#0E0E0C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
  };

  const panel = {
    position: 'absolute',
    bottom: '60px',
    right: '0',
    backgroundColor: '#FAF8F4',
    border: '1px solid rgba(14,14,12,0.08)',
    borderRadius: '4px',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)',
    padding: '24px',
    width: '280px',
  };

  const title = {
    margin: '0 0 4px 0',
    fontFamily: '"Cormorant Garamond", Georgia, serif',
    fontSize: '20px',
    fontWeight: '400',
    color: '#0E0E0C',
    letterSpacing: '-0.01em',
  };

  const titleSub = {
    fontSize: '10px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: 'rgba(14,14,12,0.5)',
    marginBottom: '24px',
    display: 'block',
  };

  const section = { marginBottom: '20px' };

  const sectionLabel = {
    display: 'block',
    fontSize: '10px',
    fontWeight: '500',
    color: 'rgba(14,14,12,0.5)',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.16em',
  };

  const swatches = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
  };

  const getSwatch = (colors, active) => ({
    width: '100%',
    aspectRatio: '1',
    cursor: 'pointer',
    border: active ? '2px solid #0E0E0C' : '1px solid rgba(14,14,12,0.12)',
    borderRadius: '2px',
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
    background: `linear-gradient(135deg, ${colors[0]} 0%, ${colors[0]} 33%, ${colors[1]} 33%, ${colors[1]} 66%, ${colors[2]} 66%)`,
  });

  const segOptions = {
    display: 'flex',
    gap: '4px',
    background: 'rgba(14,14,12,0.04)',
    padding: '3px',
    borderRadius: '2px',
  };

  const getSeg = (active) => ({
    flex: 1,
    padding: '8px 6px',
    borderRadius: '2px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '500',
    letterSpacing: '0.04em',
    transition: 'all 200ms',
    backgroundColor: active ? '#0E0E0C' : 'transparent',
    color: active ? '#fff' : 'rgba(14,14,12,0.6)',
    fontFamily: 'inherit',
  });

  const themeColors = {
    warm: ['#FAF8F4', '#0E0E0C', '#C28A3A'],
    midnight: ['#F4F4F2', '#0A0E14', '#8B7355'],
    ivory: ['#FFFFFF', '#1A1813', '#A67B3A'],
    noir: ['#EBE6DD', '#000000', '#B8923D'],
  };

  return React.createElement('div', { style: wrap },
    React.createElement('button', {
      style: toggleBtn,
      onClick: () => setIsOpen(!isOpen),
      'aria-label': isOpen ? 'Close tweaks' : 'Open tweaks',
    },
      React.createElement('svg', { width: 14, height: 14, viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 },
        isOpen
          ? React.createElement('path', { d: 'M4 4l8 8M12 4l-8 8' })
          : React.createElement('path', { d: 'M3 5h10M3 8h10M3 11h6' })
      )
    ),
    isOpen && React.createElement('div', { style: panel },
      React.createElement('h3', { style: title }, 'Tweaks'),
      React.createElement('span', { style: titleSub }, 'Try a variation'),

      React.createElement('div', { style: section },
        React.createElement('label', { style: sectionLabel }, 'Theme'),
        React.createElement('div', { style: swatches },
          ['warm', 'midnight', 'ivory', 'noir'].map(t =>
            React.createElement('button', {
              key: t,
              style: getSwatch(themeColors[t], theme === t),
              onClick: () => handleTheme(t),
              title: t,
              'aria-label': `${t} theme`,
            })
          )
        ),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '10px', color: 'rgba(14,14,12,0.5)', letterSpacing: '0.04em' } },
          React.createElement('span', null, 'Warm'),
          React.createElement('span', null, 'Midnight'),
          React.createElement('span', null, 'Ivory'),
          React.createElement('span', null, 'Noir')
        )
      ),

      hasTicker && React.createElement('div', { style: section },
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' } },
          React.createElement('label', { style: { ...sectionLabel, margin: 0 } }, 'Ticker Height'),
          React.createElement('span', { style: { fontSize: '11px', fontFamily: '"Cormorant Garamond", Georgia, serif', fontStyle: 'italic', color: '#C28A3A' } }, Math.round(tickerScale * 100) + '%')
        ),
        React.createElement('input', {
          type: 'range',
          min: 0.2,
          max: 1.2,
          step: 0.05,
          value: tickerScale,
          onChange: (e) => handleTickerScale(parseFloat(e.target.value)),
          style: {
            width: '100%',
            height: '2px',
            background: 'rgba(14,14,12,0.12)',
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            cursor: 'pointer',
            accentColor: '#C28A3A',
          },
        }),
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '10px', color: 'rgba(14,14,12,0.4)', letterSpacing: '0.04em' } },
          React.createElement('span', null, 'Subtle'),
          React.createElement('span', null, 'Statement')
        )
      ),

      React.createElement('div', { style: section },
        React.createElement('label', { style: sectionLabel }, 'Archive Layout'),
        React.createElement('div', { style: segOptions },
          React.createElement('button', {
            style: getSeg(layout === 'editorial'),
            onClick: () => handleLayout('editorial'),
          }, 'Editorial'),
          React.createElement('button', {
            style: getSeg(layout === 'compact'),
            onClick: () => handleLayout('compact'),
          }, 'Compact')
        ),
        React.createElement('p', { style: { fontSize: '10px', color: 'rgba(14,14,12,0.5)', marginTop: '8px', lineHeight: 1.4 } },
          'Affects the project archive grid'
        )
      )
    )
  );
};

window.__tweaks_enabled = true;

if (typeof ReactDOM !== 'undefined') {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = ReactDOM.createRoot(container);
  root.render(React.createElement(TweaksPanel));
}
