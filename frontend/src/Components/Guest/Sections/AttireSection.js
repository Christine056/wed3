import React from 'react';
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
  return (
    <section
      ref={sectionRef}
      id="attire"
      style={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 'clamp(60px, 10vw, 120px)',
        paddingBottom: 'clamp(80px, 10vw, 120px)',
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >


      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%',
        maxWidth: 'clamp(280px, 50vw, 560px)',
        padding: '0 16px',
        boxSizing: 'border-box',
      }}>

        {/* Title */}
        <p style={{
          fontFamily: 'Great Vibes',
          fontSize: 'clamp(1.6rem, 3vw, 3.8rem)',
          margin: '0 0 clamp(6px, 1.2vw, 14px)',
          lineHeight: 1.1,
          color: '#1e4c79',
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
          'clamp(0.65rem, 0.78vw, 0.88rem)',
          '#555',
          {
            fontStyle: 'italic',
            marginBottom: 'clamp(-16px, -3vw, -40px)',
          }
        )}>For the ladies:</p>

        <img
          src={batch1Stars}
          alt="Ladies color palette"
          style={{
            display: 'block',
            width: 'clamp(110%, 100%, 100%)',
            height: 'clamp(70px, 13vw, 160px)',
            objectFit: 'contain',
            margin: '0 auto',
            marginLeft: 'clamp(-20px, 0px, auto)',
            marginBottom: 'clamp(4px, 0.8vw, 10px)',
          }}
        />

        {/* For the gentlemen */}
        <p style={gambarino(
          'clamp(0.65rem, 0.78vw, 0.88rem)',
          '#555',
          {
            fontStyle: 'italic',
            marginBottom: 'clamp(-16px, -2.5vw, -30px)',
          }
        )}>and for the gentlemen:</p>

        <img
          src={batch2Stars}
          alt="Men color palette"
          style={{
            display: 'block',
            width: 'clamp(110%, 80%, 80%)',
            height: 'clamp(70px, 9vw, 110px)',
            objectFit: 'contain',
            margin: '0 auto',
            marginLeft: 'clamp(-20px, 0px, auto)',
          }}
        />

      </div>
    </section>
  );
};

export default AttireSection;