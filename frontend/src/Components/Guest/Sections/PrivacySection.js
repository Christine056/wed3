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

const PrivacySection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  return (
    <section ref={sectionRef} style={{
      minHeight: '40vh', background: '#fff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '60px 32px' : '80px 60px',
      textAlign: 'center',
    }}>
      <p style={gambarino(isMobile ? '1.6rem' : '2rem', PURPLE, { marginBottom: '20px' })}>
        Privacy Note
      </p>
      <p style={arial(isMobile ? '0.88rem' : '0.95rem', '#555', {
        lineHeight: 1.9, maxWidth: '520px', fontStyle: 'italic',
      })}>
        This is a small and intimate wedding. We ask you to kindly refrain from spreading our invitation. Only the persons closest to us will be in attendance to our exchanging of vows.
      </p>
    </section>
  );
};

export default PrivacySection;