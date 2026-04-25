import React from 'react';

if (!document.head.querySelector('[href*="Great+Vibes"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href =
    'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Gambarino&display=swap';
  document.head.appendChild(link);
}

const GOLD = '#B59D58';

const GiftsSection = ({ sectionRef }) => {

  const archWidth = 560;
  const archHeight = 600;
  const archRadius = 200;

  const archPath = `M 0 ${archHeight} L 0 ${archRadius} Q 0 0 ${archWidth / 2} 0 Q ${archWidth} 0 ${archWidth} ${archRadius} L ${archWidth} ${archHeight} Z`;

  return (
    <section ref={sectionRef} id="gifts" style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '60vh',
        background: '#f9f5ef',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(60px, 10vw, 120px) clamp(18px, 5vw, 40px)',
        textAlign: 'center',
      }}
    >
      {/* ── GLOWING GOLD ARCH WRAPPER ── */}
      <div style={{
        position: 'relative',
        width: 'clamp(300px, 50vw, 560px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>

        <svg
          width={archWidth}
          height={archHeight}
          viewBox={`0 0 ${archWidth} ${archHeight}`}
          style={{
            position: 'absolute',
            top: 'clamp(7px, -5vw, -70px)',
            left: 0,
            pointerEvents: 'none',
            zIndex: 1,
            overflow: 'visible',
            width: '100%',
            height: 'auto',
          }}
        >
          <defs>
            <filter id="gifts-arch-outer-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
                <feMergeNode in="blur" />
              </feMerge>
            </filter>
            <filter id="gifts-arch-inner-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={archPath}
            fill="none"
            stroke="rgba(181,157,88,0.18)"
            strokeWidth="28"
            filter="url(#gifts-arch-outer-glow)"
          />
          <path
            d={archPath}
            fill="none"
            stroke="rgba(181,157,88,0.55)"
            strokeWidth="2.5"
            filter="url(#gifts-arch-inner-glow)"
          />
          <path
            d={archPath}
            fill="none"
            stroke="rgba(181,157,88,0.75)"
            strokeWidth="1"
            opacity="0.9"
          />
        </svg>

        {/* ── CONTENT ── */}
        <div style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: 'clamp(70px, 12vw, 90px) clamp(28px, 8vw, 60px) clamp(40px, 8vw, 55px)',
        }}>

          <p style={{
            fontFamily: 'Great Vibes',
            fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
            margin: '0 0 30px',
            lineHeight: 1.1,
            color: '#2c2c2c',
          }}>
            The Gift Guide
          </p>

          <p style={{
            fontFamily: 'Gambarino, serif',
            fontSize: 'clamp(0.72rem, 1.2vw, 0.98rem)',
            lineHeight: 1.6,
            margin: '0 0 8px',
            maxWidth: 'clamp(240px, 40vw, 440px)',
            color: 'rgba(60,60,60,0.75)',
          }}>
            The presence of our friends and family is the greatest gift of all
          </p>

          <div style={{
            width: '100%',
            height: '2px',
            background: GOLD,
            opacity: 0.5,
            margin: '0 0 10px',
          }} />

          <p style={{
            fontFamily: 'Gambarino, serif',
            fontSize: 'clamp(0.55rem, 1vw, 0.78rem)',
            lineHeight: 1.2,
            margin: '10px 0 20px',
            maxWidth: 'clamp(230px, 35vw, 380px)',
            color: 'rgba(60,60,60,0.75)',
          }}>
            However, if it is your wish to bless us with a gift,<br />
            we would be honored to receive:
          </p>

          <div style={{
            display: 'flex',
            gap: 'clamp(10px, 3vw, 24px)',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {[
              {
                title: "Rustan's Registry",
                desc: "Gift registry available at any Rustan's branch",
              },
              { title: 'Monetary Gifts', desc: 'Cash gifts are warmly appreciated' },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.85)',
                border: `1px solid rgba(181,157,88,0.35)`,
                borderRadius: '12px',
                padding: 'clamp(14px, 3vw, 28px) clamp(18px, 4vw, 36px)',
                width: 'clamp(160px, 22vw, 200px)',
                boxShadow: '0 4px 20px rgba(181,157,88,0.1), 0 2px 8px rgba(0,0,0,0.06)',
              }}>
                <p style={{
                  fontFamily: 'Gambarino, serif',
                  fontStyle: 'italic',
                  fontSize: 'clamp(0.72rem, 1.2vw, 1.05rem)',
                  color: GOLD,
                  marginBottom: '6px',
                }}>
                  {item.title}
                </p>

                <p style={{
                  fontFamily: 'Times New Roman',
                  fontSize: 'clamp(0.62rem, 1vw, 0.82rem)',
                  color: 'rgba(60,60,60,0.7)',
                  margin: 0,
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GiftsSection;