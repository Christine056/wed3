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

const SnapSection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  return (
    <section ref={sectionRef} style={{
      minHeight: '50vh', background: '#fff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '60px 24px' : '80px 40px',
      textAlign: 'center',
    }}>
      <p style={gambarino(isMobile ? '2rem' : '2.8rem', PURPLE, { marginBottom: '16px' })}>
        Snap &amp; Share
      </p>
      <p style={arial(isMobile ? '0.88rem' : '0.95rem', '#555', {
        lineHeight: 1.8, marginBottom: '32px', maxWidth: '380px',
      })}>
        Captured a special moment? We'd love to see it! Scan the QR code below to upload your photos from our big day.
      </p>
      {/* Replace this div with <img src={qrCode} /> when QR is ready */}
      <div style={{
        width: isMobile ? '160px' : '200px',
        height: isMobile ? '160px' : '200px',
        border: '2px dashed rgba(143,53,140,0.3)',
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <p style={arial('0.8rem', '#bbb', { textAlign: 'center', lineHeight: 1.6 })}>
          QR Code<br />Coming Soon
        </p>
      </div>
    </section>
  );
};

export default SnapSection;