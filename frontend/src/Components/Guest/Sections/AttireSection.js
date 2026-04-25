import React from 'react';
import useIsMobile from '../../../Helpers/Utilities/useIsMobile';
import flowerBorder3 from '../../../Assets/Images/flower-border3.png';
import flowerBorder4 from '../../../Assets/Images/flower-border4.png';
import batch1Stars from '../../../Assets/Images/batch1-stars.png';
import batch2Stars from '../../../Assets/Images/batch2-stars.png';

if (!document.head.querySelector('[href*="Great+Vibes"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Gambarino&display=swap';
  document.head.appendChild(link);
}

const GOLD = '#B59D58';

const gambarino = (size, color = '#333', extra = {}) => ({
  fontFamily: 'Gambarino, serif', fontSize: size,
  color, fontWeight: 400, margin: 0, ...extra,
});

const AttireSection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  return (
  // Section
      <section ref={sectionRef} style={{
        position: 'relative',
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: isMobile ? '30px' : '80px',
        paddingBottom: isMobile ? '60px' : '300px',
      }}>

      {/* Top flower */}
      <img src={flowerBorder3} alt="" style={{
        position: 'absolute',
        top: isMobile ? '-100px' : '-320px',
        left: isMobile ? -70 : -350,
        width: isMobile ? '130%' : '140%',
        pointerEvents: 'none', zIndex: 2,
        objectFit: 'fill',
        height: isMobile ? '250px' : '800px',
      }} />

      {/* Bottom flower */}
     <img src={flowerBorder4} alt="" style={{
      position: 'absolute',
      top: isMobile ? 'auto' : '600px',
      bottom: isMobile ? '-80px' : 'auto',
      left: isMobile ? -75 : -145,
      width: isMobile ? '150%' : '125%',
      pointerEvents: 'none', zIndex: 2,
      objectFit: 'fill',
      height: isMobile ? '220px' : '630px',
    }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 3,
        width: '100%',
        maxWidth: 'clamp(280px, 50vw, 560px)',
        padding: '0 16px',
        boxSizing: 'border-box',
        marginTop: isMobile ? '100px' : '250px',
      }}>

        {/* Title */}
        <p style={{
          fontFamily: 'Great Vibes',
          fontSize: 'clamp(1.6rem, 3vw, 3.8rem)',
          margin: '0 0 clamp(6px, 1.2vw, 14px)',
          lineHeight: 1.1,
          color: GOLD,
          textAlign: 'center',
        }}>
          Dress Code
        </p>

        {/* Body */}
        <p style={gambarino(
          'clamp(0.65rem, 0.8vw, 0.92rem)',
          '#444',
          {
            lineHeight: 1.5,
            maxWidth: 'clamp(230px, 38vw, 440px)',
            margin: '0 auto clamp(8px, 1.5vw, 18px)',
          }
        )}>
          Formal attire is appreciated. For the gentlemen, a black suit and tie would be lovely.
          We kindly ask that white be avoided, and we hope our color palette inspires your look.
        </p>

        {/* Gold divider */}
        <div style={{
          width: '100%', height: '2px',
          background: GOLD, opacity: 0.5,
          margin: '4px 0 28px',
        }} />

     {/* For the ladies */}
      <p style={gambarino(
        isMobile ? '0.75rem' : '0.88rem',
        '#555',
        { fontStyle: 'italic',
          textAlign: 'center',
          marginBottom: isMobile ? '-28px' : '-50px' }
      )}>For the ladies:</p>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img src={batch1Stars} alt="Ladies color palette" style={{
          width: isMobile ? '120%' : '100%',
          maxWidth: '700px',
          display: 'block',
          height: isMobile ? '120px' : '160px',
          objectFit: 'contain',
          marginBottom: isMobile ? '6px' : '5px',
        }} />
      </div>

      {/* For the gentlemen */}
      <p style={gambarino(
        isMobile ? '0.75rem' : '0.88rem',
        '#555',
        { fontStyle: 'italic', 
          textAlign: 'center',
          marginBottom: isMobile ? '-22px' : '-50px' }
      )}>and for the gentlemen:</p>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <img src={batch2Stars} alt="Men color palette" style={{
          width: isMobile ? '120%' : '100%',
          maxWidth: '700px',
          display: 'block',
          height: isMobile ? '90px' : '110px',
          objectFit: 'contain',
        }} />
      </div>

      </div>
    </section>
  );
};

export default AttireSection;