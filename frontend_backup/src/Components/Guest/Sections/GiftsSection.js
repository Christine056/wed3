import React from 'react';
import useIsMobile from '../../../Helpers/Utilities/useIsMobile';

const PURPLE = '#8F358C';

const gambarino = (size, color = '#222', extra = {}) => ({
  fontFamily: 'Gambarino, serif', fontSize: size,
  color, fontWeight: 400, margin: 0, ...extra,
});

const arial = (size, color = '#333', extra = {}) => ({
  fontFamily: 'Arial, sans-serif', fontSize: size,
  color, margin: 0, ...extra,
});

const GiftsSection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  return (
    <section ref={sectionRef} style={{
      minHeight: '60vh', background: '#fdf9ff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '80px 24px' : '100px 40px',
      textAlign: 'center',
    }}>
      <p style={gambarino(isMobile ? '2rem' : '2.8rem', PURPLE, { marginBottom: '16px' })}>
        Gift Guide
      </p>
      <p style={arial(isMobile ? '0.88rem' : '0.95rem', '#666', {
        lineHeight: 1.8, marginBottom: '32px', maxWidth: '420px',
      })}>
        Your presence on our special day is the greatest gift of all. However, if you wish to bless us further, we would be honored to receive:
      </p>
      <div style={{
        display: 'flex', gap: isMobile ? '16px' : '24px',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
      }}>
        {[
          { title: "Rustan's Registry", desc: "Gift registry available at any Rustan's branch" },
          { title: 'Monetary Gift', desc: 'Cash gifts are warmly appreciated' },
        ].map((item, i) => (
          <div key={i} style={{
            border: '1px solid rgba(143,53,140,0.2)',
            borderRadius: '12px',
            padding: isMobile ? '20px 24px' : '24px 32px',
            textAlign: 'center',
            minWidth: isMobile ? '200px' : '180px',
          }}>
            <p style={gambarino(isMobile ? '1rem' : '1.2rem', '#222', { marginBottom: '8px' })}>{item.title}</p>
            <p style={arial('0.85rem', '#888')}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GiftsSection;