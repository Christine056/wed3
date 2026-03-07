import React from 'react';

const GoldButton = ({ children, onClick, type = 'button', disabled = false, variant = 'filled', style = {} }) => {
  const base = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '1rem',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    padding: '12px 32px',
    border: '1px solid #C9A84C',
    borderRadius: '2px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all 0.3s ease',
    opacity: disabled ? 0.6 : 1,
  };

  const filled = {
    ...base,
    background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
    color: '#1a1a1a',
    fontWeight: '600',
  };

  const outline = {
    ...base,
    background: 'transparent',
    color: '#C9A84C',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...(variant === 'outline' ? outline : filled), ...style }}
      onMouseEnter={e => {
        if (!disabled) {
          if (variant === 'outline') {
            e.target.style.background = 'rgba(201,168,76,0.1)';
          } else {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(201,168,76,0.3)';
          }
        }
      }}
      onMouseLeave={e => {
        if (!disabled) {
          if (variant === 'outline') {
            e.target.style.background = 'transparent';
          } else {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }
        }
      }}
    >
      {children}
    </button>
  );
};

export default GoldButton;
