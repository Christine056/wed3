import React from 'react';
import useIsMobile from '../../../Helpers/Utilities/useIsMobile';
import backgroundBanner from '../../../Assets/Images/background-banner.png';
import flowerBorder3 from '../../../Assets/Images/flower-border3.png';
import flowerBorder4 from '../../../Assets/Images/flower-border4.png';
import batch1Stars from '../../../Assets/Images/batch1-stars.png';
import batch2Stars from '../../../Assets/Images/batch2-stars.png';

const gambarino = (size, color = '#222', extra = {}) => ({
  fontFamily: 'Gambarino, serif', fontSize: size,
  color, fontWeight: 400, margin: 0, ...extra,
});

const arial = (size, color = '#333', extra = {}) => ({
  fontFamily: 'Arial, sans-serif', fontSize: size,
  color, margin: 0, ...extra,
});

const AttireSection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  return (
    <section ref={sectionRef} style={{
      position: 'relative',
      minHeight: '130vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      paddingTop: isMobile ? '60px' : '80px',
      paddingBottom: isMobile ? '180px' : '220px',
    }}>

      {/* Background banner */}
      <img src={backgroundBanner} alt="" style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        objectFit: 'cover', opacity: 0.99, zIndex: 0,
      }} />

      {/* Top flower */}
      <img src={flowerBorder3} alt="" style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        width: '100%', pointerEvents: 'none', zIndex: 2,
        objectFit: 'cover',
        height: isMobile ? '140px' : '200px',
        objectPosition: 'top',
      }} />

      {/* Bottom flower */}
      <img src={flowerBorder4} alt="" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        width: '100%', pointerEvents: 'none', zIndex: 2,
        objectFit: 'cover',
        height: isMobile ? '140px' : '200px',
        objectPosition: 'bottom',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 3,
        textAlign: 'center',
        width: '100%',
        maxWidth: isMobile ? '300px' : '560px',
        padding: isMobile ? '0 20px' : '0',
        marginTop: isMobile ? '100px' : '140px',
      }}>

        {/* Title */}
        <div style={{
          display: 'inline-block',
          background: '#fff',
          padding: isMobile ? '8px 24px' : '12px 36px',
          marginBottom: isMobile ? '20px' : '28px',
        }}>
          <p style={gambarino(isMobile ? '1.6rem' : '2.4rem', '#222')}>
            Dress Code
          </p>
        </div>

        {/* Dress code text */}
        <p style={arial(
          isMobile ? '0.82rem' : '0.95rem',
          '#333',
          {
            lineHeight: 1.9,
            maxWidth: isMobile ? '260px' : '440px',
            margin: `0 auto ${isMobile ? '28px' : '40px'}`,
          }
        )}>
          Formal attire is appreciated. For the gentlemen, a black suit and tie would be lovely. We kindly ask that white be avoided, and we hope our color palette inspires your look.
        </p>

        {/* Divider */}
        <div style={{
          width: '40px', height: '1px',
          background: 'rgba(143,53,140,0.3)',
          margin: `0 auto ${isMobile ? '24px' : '32px'}`,
        }} />

        {/* For the ladies */}
        <p style={arial(
          isMobile ? '0.82rem' : '0.92rem', '#555',
          { fontStyle: 'italic', marginBottom: isMobile ? '14px' : '20px' }
        )}>For the ladies:</p>

        <img src={batch1Stars} alt="Ladies color palette" style={{
          width: isMobile ? '100%' : '90%',
          maxWidth: isMobile ? '260px' : '460px',
          display: 'block',
          margin: `0 auto ${isMobile ? '28px' : '40px'}`,
        }} />

        {/* For the gentlemen */}
        <p style={arial(
          isMobile ? '0.82rem' : '0.92rem', '#555',
          { fontStyle: 'italic', marginBottom: isMobile ? '14px' : '20px' }
        )}>and for the gentlemen:</p>

        <img src={batch2Stars} alt="Men color palette" style={{
          width: isMobile ? '75%' : '65%',
          maxWidth: isMobile ? '200px' : '340px',
          display: 'block',
          margin: '0 auto',
        }} />

      </div>
    </section>
  );
};

export default AttireSection;