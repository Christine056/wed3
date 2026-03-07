import React from 'react';

const InputField = ({ label, type = 'text', value, onChange, placeholder, required = false }) => {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      {label && (
        <label style={{
          display: 'block',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.85rem',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: '#C9A84C',
          marginBottom: '8px',
        }}>
          {label}{required && ' *'}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: '2px',
          padding: '12px 16px',
          color: '#fff',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '1.1rem',
          outline: 'none',
          transition: 'border-color 0.3s',
        }}
        onFocus={e => e.target.style.borderColor = '#C9A84C'}
        onBlur={e => e.target.style.borderColor = 'rgba(201,168,76,0.3)'}
      />
    </div>
  );
};

export default InputField;
