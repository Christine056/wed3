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

const EntourageSection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  const groups = [
    {
      title: 'Principal Sponsors',
      names: ['Sponsor Name', 'Sponsor Name', 'Sponsor Name', 'Sponsor Name'],
    },
    {
      title: 'Bridal Entourage',
      names: ['Entourage Name', 'Entourage Name', 'Entourage Name', 'Entourage Name'],
    },
    {
      title: 'Secondary Sponsors',
      names: ['Sponsor Name', 'Sponsor Name', 'Sponsor Name', 'Sponsor Name'],
    },
  ];

  return (
    <section ref={sectionRef} style={{
      minHeight: '100vh', background: '#fff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '80px 24px' : '100px 40px',
      textAlign: 'center',
    }}>
      <p style={gambarino(isMobile ? '2rem' : '2.8rem', PURPLE, { marginBottom: '40px' })}>
        Our Entourage
      </p>

      {groups.map((group, i) => (
        <div key={i} style={{ width: '100%', maxWidth: '500px' }}>
          <p style={gambarino(isMobile ? '1.1rem' : '1.4rem', '#222', { marginBottom: '16px' })}>
            {group.title}
          </p>
          {group.names.map((name, j) => (
            <p key={j} style={arial(isMobile ? '0.88rem' : '0.95rem', '#555', { lineHeight: 2 })}>
              {name}
            </p>
          ))}
          {i < groups.length - 1 && (
            <div style={{ width: '50px', height: '1px', background: '#ddd', margin: '32px auto' }} />
          )}
        </div>
      ))}
    </section>
  );
};

export default EntourageSection;