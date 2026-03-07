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

const AccommodationSection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  return (
    <section ref={sectionRef} style={{
      minHeight: '50vh', background: '#fdf9ff',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: isMobile ? '60px 24px' : '80px 40px',
      textAlign: 'center',
    }}>
      <p style={gambarino(isMobile ? '2rem' : '2.8rem', PURPLE, { marginBottom: '16px' })}>
        Accommodation
      </p>
      <p style={arial(isMobile ? '0.88rem' : '0.95rem', '#555', {
        lineHeight: 1.8, marginBottom: '24px', maxWidth: '420px',
      })}>
        We have arranged a special discount for our guests at Radisson Blu Cebu. Use the exclusive code below when booking.
      </p>
      <div style={{
        border: '1px solid rgba(143,53,140,0.25)',
        borderRadius: '12px',
        padding: isMobile ? '20px 28px' : '28px 40px',
        textAlign: 'center',
      }}>
        <p style={arial('0.8rem', '#999', {
          letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px',
        })}>Exclusive Discount Code</p>
        <p style={gambarino(isMobile ? '1.4rem' : '1.8rem', PURPLE, { letterSpacing: '4px' })}>
          [CODE HERE]
        </p>
      </div>
    </section>
  );
};

export default AccommodationSection;