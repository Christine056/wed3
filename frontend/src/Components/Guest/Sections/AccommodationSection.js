import React from 'react';
import useIsMobile from '../../../Helpers/Utilities/useIsMobile';
import accomHotel from '../../../Assets/Images/accom-hotel.jpg';
import flowerGift1 from '../../../Assets/Images/flower_gift1.png';
import flowerGift2 from '../../../Assets/Images/flower_gift2.png';

if (!document.head.querySelector('[href*="Great+Vibes"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Gambarino&display=swap';
  document.head.appendChild(link);
}

const GOLD = '#B59D58';
const GOLD_LIGHT = '#D4B96A';

const AccomodationsSection = ({ sectionRef }) => {
  const isMobile = useIsMobile();

  return (
    <section
      ref={sectionRef}
      id="accommodation"
      style={{
        background: 'rgba(255, 255, 255, 0.25)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '40px 18px' : 'clamp(60px, 10vw, 120px) clamp(18px, 5vw, 40px)',
        textAlign: 'center',
      }}
    >

      {/* Left flower */}
      <img src={flowerGift1} alt="" style={{
        position: 'absolute',
        top: isMobile ? '-10px' : '-40px',
        left: isMobile ? -70 : -160,
        width: isMobile ? '35%' : '22%',
        height: isMobile ? '107%' : '150%',
        pointerEvents: 'none',
        zIndex: 2,
        objectFit: 'fill',
      }} />

      {/* Right flower */}
      <img src={flowerGift2} alt="" style={{
        position: 'absolute',
        top: isMobile ? '-10px' : '-35px',
        right: isMobile ? -70 : -160,
        width: isMobile ? '35%' : '22%',
        height: isMobile ? '107%' : '150%',
        pointerEvents: 'none',
        zIndex: 2,
        objectFit: 'fill',
      }} />

      <div style={{
        position: 'relative',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}>

        {/* Title */}
        <p style={{
          fontFamily: 'Great Vibes',
          fontSize: isMobile ? '2.2rem' : 'clamp(2.2rem, 6vw, 4.2rem)',
          margin: isMobile ? '0 0 16px' : '0 0 clamp(20px, 3vw, 32px)',
          lineHeight: 1.1,
          color: GOLD,
        }}>
          Accommodation
        </p>

        {/* Card */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: isMobile ? '300px' : 'clamp(320px, 60vw, 620px)',
          border: `1px solid rgba(181,157,88,0.12)`,
          borderRadius: '20px',
          background: '#ffffff',
          padding: isMobile ? '16px 12px' : 'clamp(24px, 4vw, 32px) clamp(12px, 4vw, 36px)',
          gap: isMobile ? '10px' : 'clamp(12px, 2vw, 20px)',
          boxSizing: 'border-box',
        }}>

          {/* Hotel name */}
          <p style={{
            fontFamily: 'Gambarino, serif',
            fontSize: isMobile ? '1rem' : 'clamp(1.1rem, 3vw, 1.8rem)',
            fontWeight: 400,
            margin: 0,
            lineHeight: 1.2,
            color: GOLD,
          }}>
            Radisson Blu Hotel
          </p>

          {/* Gold divider */}
          <div style={{
            width: isMobile ? '120px' : 'clamp(160px, 40%, 320px)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.5 }} />
            <div style={{ width: 4, height: 4, background: GOLD, transform: 'rotate(45deg)', opacity: 0.8 }} />
            <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.5 }} />
          </div>

          {/* Photo + connector + text row */}
          <div style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0,
            width: '100%',
            flexWrap: isMobile ? 'nowrap' : 'wrap',
          }}>

            {/* Hotel photo */}
            <a
              href="https://maps.google.com/?q=Radisson+Blu+Hotel+Cebu"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flexShrink: 0,
                display: 'block',
                width: isMobile ? '110px' : 'clamp(130px, 20vw, 300px)',
                height: isMobile ? '180px' : 'clamp(234px, 36vw, 480px)',
                border: `1px solid rgba(181,157,88,0.3)`,
                borderRadius: '12px',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
            >
              <img
                src={accomHotel}
                alt="Radisson Blu Hotel Cebu"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
            </a>

            {/* Decorative connector */}
            <div style={{
              flexShrink: 0,
              width: isMobile ? '20px' : 'clamp(28px, 4vw, 48px)',
              height: isMobile ? '180px' : 'clamp(234px, 36vw, 480px)',
            }}>
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 48 480"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: 'block' }}
              >
                <line x1="24" y1="24" x2="24" y2="456" stroke={GOLD} strokeWidth="0.6" opacity="0.45" />
                <polygon points="24,18 29,24 24,30 19,24" fill={GOLD} opacity="0.75" />
                <polygon points="24,462 29,456 24,450 19,456" fill={GOLD} opacity="0.75" />
                <circle cx="24" cy="240" r="6" fill="none" stroke={GOLD} strokeWidth="0.7" opacity="0.8" />
                <circle cx="24" cy="240" r="2" fill={GOLD} opacity="0.9" />
                {[0.28, 0.38, 0.62, 0.72].map((pos, i) => (
                  <line key={i} x1="19" y1={480 * pos} x2="29" y2={480 * pos}
                    stroke={GOLD} strokeWidth="0.5" opacity="0.4" />
                ))}
              </svg>
            </div>

            {/* Text block */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: isMobile ? '180px' : 'clamp(234px, 36vw, 480px)',
              width: isMobile ? '130px' : 'clamp(160px, 25vw, 280px)',
              flexShrink: 0,
              padding: isMobile ? '0 6px' : 'clamp(0px, 1vw, 0px) clamp(8px, 2vw, 16px)',
              boxSizing: 'border-box',
              textAlign: 'center',
              gap: isMobile ? '6px' : 'clamp(10px, 2vw, 18px)',
            }}>

              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.4 }} />
                <div style={{ width: 4, height: 4, background: GOLD, transform: 'rotate(45deg)', opacity: 0.7 }} />
                <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.4 }} />
              </div>

              <p style={{
                fontFamily: 'gambarino',
                fontSize: isMobile ? '0.52rem' : 'clamp(0.6rem, 1.5vw, 0.88rem)',
                color: '#444',
                lineHeight: 1.7,
                margin: 0,
                letterSpacing: '0.02em',
              }}>
                We have arranged hotel
                <br />accommodations with
                <br />a special rate.
              </p>

              <div style={{ width: '60%', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.3 }} />
                <div style={{ width: 3, height: 3, background: GOLD, transform: 'rotate(45deg)', opacity: 0.55 }} />
                <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.3 }} />
              </div>

              <p style={{
                fontFamily: 'Times New Roman, serif',
                fontSize: isMobile ? '0.52rem' : 'clamp(0.6rem, 1.5vw, 0.88rem)',
                color: '#444',
                lineHeight: 1.7,
                margin: 0,
                letterSpacing: '0.02em',
              }}>
                A block of rooms have been
                <br />reserved under the{' '}
                <span style={{ fontStyle: 'italic', color: GOLD_LIGHT }}>
                  Rogado-Ynoc
                </span>
                <br />wedding.
              </p>

              <div style={{ width: '60%', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.3 }} />
                <div style={{ width: 3, height: 3, background: GOLD, transform: 'rotate(45deg)', opacity: 0.55 }} />
                <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.3 }} />
              </div>

              <p style={{
                fontFamily: 'Times New Roman, serif',
                fontSize: isMobile ? '0.52rem' : 'clamp(0.6rem, 1.5vw, 0.88rem)',
                color: '#444',
                lineHeight: 1.7,
                margin: 0,
                letterSpacing: '0.02em',
              }}>
                To book, please mention
                <br />our names for a discount.
              </p>

              <div style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.4 }} />
                <div style={{ width: 4, height: 4, background: GOLD, transform: 'rotate(45deg)', opacity: 0.7 }} />
                <div style={{ flex: 1, height: '0.5px', background: GOLD, opacity: 0.4 }} />
              </div>

              <p style={{
                fontFamily: 'Gambarino, serif',
                fontSize: isMobile ? '0.6rem' : 'clamp(0.65rem, 1.5vw, 0.95rem)',
                color: GOLD,
                letterSpacing: '0.1em',
                margin: 0,
              }}>
                Thank you!
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccomodationsSection;