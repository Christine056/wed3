import React from 'react';
import useIsMobile from '../../../Helpers/Utilities/useIsMobile';
import flowerLeft  from '../../../Assets/Images/flower_date1.png';
import flowerRight from '../../../Assets/Images/flower_date2.png';
import clothTop    from '../../../Assets/Images/cloth_date.png';

if (!document.head.querySelector('[href*="Pinyon+Script"]')) {
  const link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Gambarino&display=swap';
  document.head.appendChild(link);
}

const GOLD = '#B59D58';
const GOLD_GLOW_STYLE = { color: GOLD, textShadow: 'none' };
const WHITE_GLOW_STYLE = { color: '#2c2c2c', textShadow: 'none' };

const DateSideItem = ({ children }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
    <div style={{ width: 'clamp(44px, 8vw, 64px)', height: '1px', background: GOLD, opacity: 0.8 }} />
    <p style={{
      fontFamily: 'Gambarino',
      fontSize: 'clamp(0.45rem, 1.2vw, 0.58rem)',
      letterSpacing: '1.8px',
      textTransform: 'uppercase',
      margin: 0,
      ...GOLD_GLOW_STYLE,
    }}>{children}</p>
    <div style={{ width: 'clamp(44px, 8vw, 64px)', height: '1px', background: GOLD, opacity: 0.8 }} />
  </div>
);

const DateLocationSection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  const locationLinkStyle = {
    display: 'inline-block',
    marginTop: '4px',
    fontFamily: 'Gambarino',
    fontSize: 'clamp(0.52rem, 1.4vw, 0.65rem)',
    textDecoration: 'none',
    letterSpacing: '0.5px',
    borderBottom: `1px solid rgba(181,157,88,0.4)`,
    transition: 'all 0.2s',
    ...GOLD_GLOW_STYLE,
  };

  return (
    <section ref={sectionRef} id="date-location" style={{
      position: 'relative',
      overflow: 'hidden',
      background: 'rgba(255, 255, 255, 0.25)',
      backdropFilter: 'blur(6px)',
      WebkitBackdropFilter: 'blur(6px)',
    }}>

      {/* ── Decorative Images ── */}
      <img src={clothTop} alt="" style={{
        position: 'absolute',
        top: isMobile ? '-30px' : '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: isMobile ? '150%' : '165%',
        height: isMobile ? '35%' : '80%',
        pointerEvents: 'none',
        zIndex: 2,
        objectFit: 'fill',
      }} />

      <img src={flowerLeft} alt="" style={{
        position: 'absolute',
        top: isMobile ? '-35px' : '-40px',
        left: isMobile ? -60 : -135,
        width: isMobile ? '35%' : '22%',
        height: isMobile ? '107%' : '115%',
        pointerEvents: 'none',
        zIndex: 2,
        objectFit: 'fill',
      }} />

      <img src={flowerRight} alt="" style={{
        position: 'absolute',
        top: isMobile ? '-35px' : '-35px',
        right: isMobile ? -60 : -140,
        width: isMobile ? '35%' : '22%',
        height: isMobile ? '107%' : '115%',
        pointerEvents: 'none',
        zIndex: 2,
        objectFit: 'fill',
      }} />

      {/* ── Content ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 'clamp(40px, 6vh, 80px) clamp(20px, 5vw, 60px) clamp(80px, 18vh, 140px)',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          width: '100%',
          maxWidth: 'clamp(260px, 70vw, 400px)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>

          {/* ── Date row ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(10px, 3vw, 20px)',
            marginBottom: '8px',
            marginTop: 'clamp(40px, 5vw, 20px)',
          }}>
            <DateSideItem>Wednesday</DateSideItem>
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'Gambarino',
                fontSize: 'clamp(0.45rem, 1.2vw, 0.58rem)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                margin: 0,
                ...GOLD_GLOW_STYLE,
              }}>January</p>
              <p style={{
                fontFamily: "'Times New Roman', Times, serif",
                fontSize: 'clamp(1.5rem, 4vw, 2.4rem)',
                fontWeight: '700',
                lineHeight: 1,
                margin: 0,
                ...GOLD_GLOW_STYLE,
              }}>06</p>
              <p style={{
                fontFamily: 'Gambarino',
                fontSize: 'clamp(0.45rem, 1.2vw, 0.58rem)',
                letterSpacing: '2px',
                margin: 0,
                ...GOLD_GLOW_STYLE,
              }}>2027</p>
            </div>
            <DateSideItem>1:30 PM</DateSideItem>
          </div>

          <div style={{ width: '100%', height: '2px', background: GOLD, opacity: 0.5, margin: '4px 0 28px' }} />

          {/* ── Floating card ── */}
          <div style={{ position: 'relative', width: '100%' }}>
            <div style={{
              background: 'rgba(255,255,255,0.75)',
              border: '0.5px solid rgba(181,157,88,0.35)',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 32px) clamp(10px, 3vw, 18px)',
              backdropFilter: 'blur(8px)',
              boxShadow: `
                0 0 40px rgba(181,157,88,0.06),
                0 8px 30px rgba(0,0,0,0.08)
              `,
              position: 'relative',
              zIndex: 1,
            }}>

              <p style={{ fontFamily: 'Great Vibes', fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', margin: '0 0 2px', ...WHITE_GLOW_STYLE }}>Ceremony</p>
              <p style={{ fontFamily: 'Gambarino', fontSize: 'clamp(0.62rem, 1.6vw, 0.82rem)', margin: '2px 0', lineHeight: 1.5, ...WHITE_GLOW_STYLE }}>1:00 PM</p>
              <p style={{ fontFamily: 'Gambarino', fontSize: 'clamp(0.6rem, 1.5vw, 0.78rem)', margin: '4px 0 8px', lineHeight: 1.7, color: 'rgba(60,60,60,0.75)' }}>
                THE ARCHDIOCESAN SHRINE<br />
                OF THE MOST SACRED HEART OF JESUS<br />
                242 Dionisio Jakosalem St., Cebu City
              </p>
              <a href="https://maps.google.com/?q=Archdiocesan+Shrine+Most+Sacred+Heart+of+Jesus+Cebu" target="_blank" rel="noopener noreferrer" style={locationLinkStyle}>
                View location →
              </a>

              <div style={{ height: '1px', background: 'rgba(181,157,88,0.3)', margin: 'clamp(18px, 3vw, 24px) 0' }} />

              <p style={{ fontFamily: 'Great Vibes', fontSize: 'clamp(1.6rem, 4vw, 2.3rem)', margin: '0 0 2px', ...WHITE_GLOW_STYLE }}>Reception</p>
              <p style={{ fontFamily: 'Gambarino', fontSize: 'clamp(0.62rem, 1.6vw, 0.82rem)', margin: '2px 0', lineHeight: 1.5, ...WHITE_GLOW_STYLE }}>6:30 PM</p>
              <p style={{ fontFamily: 'Gambarino', fontSize: 'clamp(0.62rem, 1.6vw, 0.78rem)', margin: '4px 0 2px', lineHeight: 1.7, color: 'rgba(60,60,60,0.75)' }}>Santa Maria Grand Ballroom</p>
              <p style={{ fontFamily: 'Gambarino', fontSize: 'clamp(0.58rem, 1.4vw, 0.75rem)', margin: '0 0 8px', lineHeight: 1.7, color: 'rgba(60,60,60,0.75)' }}>
                RADISSON BLU HOTEL CEBU<br />
                Serging Osmeña Blvd cor. Juan Luna Ave., Cebu
              </p>
              <a href="https://maps.google.com/?q=Radisson+Blu+Hotel+Cebu" target="_blank" rel="noopener noreferrer" style={locationLinkStyle}>
                View location →
              </a>

            </div>
          </div>

          <div style={{ height: 'clamp(10px, 2vw, 18px)' }} />
        </div>
      </div>
    </section>
  );
};

export default DateLocationSection;