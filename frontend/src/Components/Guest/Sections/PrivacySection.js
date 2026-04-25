import React from 'react';

if (!document.head.querySelector('[href*="Gambarino"]')) {
  const link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Gambarino&display=swap';
  document.head.appendChild(link);
}

const GOLD = '#B59D58';

/* ─── Gold Divider ─── */
const GoldDivider = () => {
  const VW = 500, VH = 36, cy = VH / 2, cx = VW / 2;
  const clusterHalf = 52;
  const dashLeft2   = cx - clusterHalf;
  const dashRight1  = cx + clusterHalf;

  return (
    <div style={{
      position: 'relative', zIndex: 1,
      width: '100%', maxWidth: '500px',
      lineHeight: 0, boxSizing: 'border-box',
    }}>
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', overflow: 'visible', display: 'block' }}
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <filter id="glow" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <line x1={0}          y1={cy} x2={dashLeft2}  y2={cy} stroke="#c9a84c" strokeWidth="2" />
        <line x1={dashRight1} y1={cy} x2={VW}          y2={cy} stroke="#c9a84c" strokeWidth="2" />

        <g transform={`translate(${cx - 36}, ${cy})`} filter="url(#glow)">
          <rect x="-5" y="-5" width="10" height="10" rx="0.5" transform="rotate(45)" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <rect x="-2.5" y="-2.5" width="5" height="5" transform="rotate(45)" fill="#c9a84c" />
        </g>

        <g transform={`translate(${cx + 36}, ${cy})`} filter="url(#glow)">
          <rect x="-5" y="-5" width="10" height="10" rx="0.5" transform="rotate(45)" fill="none" stroke="#c9a84c" strokeWidth="0.8" />
          <rect x="-2.5" y="-2.5" width="5" height="5" transform="rotate(45)" fill="#c9a84c" />
        </g>

        <g transform={`translate(${cx}, ${cy})`} filter="url(#glow)">
          <rect x="-10" y="-10" width="20" height="20" rx="1"     transform="rotate(45)" fill="none" stroke="#f0d080" strokeWidth="1"   />
          <rect x="-6.5" y="-6.5" width="13" height="13" rx="0.5" transform="rotate(45)" fill="none" stroke="#f0d080" strokeWidth="0.8" />
          <rect x="-3.5" y="-3.5" width="7"  height="7"           transform="rotate(45)" fill="#f0d080" />
        </g>
      </svg>
    </div>
  );
};

/* ─── PrivacySection ─── */
const PrivacySection = ({ sectionRef }) => {
  return (
    <section ref={sectionRef} id="privacy" style={{
      minHeight: '40vh',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'clamp(52px, 8vw, 80px) clamp(20px, 8vw, 60px)',
      textAlign: 'center',
      overflow: 'hidden',
      background: '#f9f5ef',
      boxSizing: 'border-box',
      width: '100%',
    }}>

      {/* Title */}
      <p style={{
        fontFamily: 'Great Vibes',
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 400,
        margin: '0 0 20px',
        lineHeight: 1.1,
        position: 'relative',
        zIndex: 1,
        color: '#2c2c2c',
      }}>
        Privacy Note
      </p>

      <GoldDivider />

      {/* Body text */}
      <p style={{
        fontFamily: 'Gambarino, serif',
        fontSize: 'clamp(0.78rem, 2vw, 0.92rem)',
        fontWeight: '400',
        color: 'rgba(60,60,60,0.75)',
        lineHeight: 2,
        width: '100%',
        maxWidth: 'clamp(300px, 70vw, 480px)',
        margin: '20px 0',
        position: 'relative',
        zIndex: 1,
        letterSpacing: '0.02em',
        boxSizing: 'border-box',
      }}>
        This is a small and intimate wedding. We ask you to kindly refrain from spreading our invitation. Only the persons closest to us will be in attendance to our exchanging of vows.
      </p>

      <GoldDivider />

    </section>
  );
};

export default PrivacySection;