import React from 'react';

if (!document.head.querySelector('[href*="Pinyon+Script"]')) {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Gambarino&display=swap';
  document.head.appendChild(fontLink);
}

const GOLD = '#B59D58';

const GoldSubtitle = ({ children, size, style = {} }) => (
  <p style={{
    fontFamily: 'Gambarino',
    fontSize: size || '0.75rem',
    color: GOLD, fontStyle: 'italic',
    fontWeight: '500', margin: '0 0 0.5px 0',
    letterSpacing: '0.1px',
    ...style,
  }}>{children}</p>
);

const Name = ({ children, style = {} }) => (
  <p style={{
    fontFamily: 'Gambarino',
    fontSize: '0.72rem',
    color: '#111', textTransform: 'uppercase',
    letterSpacing: '0.1px', lineHeight: 1.3,
    margin: 0, ...style,
  }}>{children}</p>
);

const GoldDividerLabel = ({ children, subtitle }) => (
  <div style={{ width: '100%', margin: '14px 0 4px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ flex: 1, height: '3px', background: GOLD }} />
      <span style={{
        fontFamily: 'Great Vibes',
        fontSize: '1.4rem', fontWeight: '600',
        color: GOLD, whiteSpace: 'nowrap',
      }}>{children}</span>
      <div style={{ flex: 1, height: '3px', background: GOLD }} />
    </div>
    {subtitle && (
      <p style={{
        fontFamily: 'Gambarino', fontSize: '0.62rem',
        color: GOLD, fontStyle: 'italic',
        textAlign: 'center', margin: '-8px 0 0',
        letterSpacing: '0.3px',
      }}>{subtitle}</p>
    )}
  </div>
);

const TwoCol = ({ left, right }) => (
  <div style={{ display: 'flex', gap: '12px', width: '100%', marginTop: '6px' }}>
    <div style={{ flex: 1, textAlign: 'center' }}>{left}</div>
    <div style={{ flex: 1, textAlign: 'center' }}>{right}</div>
  </div>
);

const FourCol = ({ cols }) => (
  <div style={{ display: 'flex', gap: '6px', width: '100%', marginTop: '6px' }}>
    {cols.map((col, i) => (
      <div key={i} style={{ flex: 1, textAlign: 'center' }}>{col}</div>
    ))}
  </div>
);

const EntourageSection = ({ sectionRef }) => {
  return (
    <section
      id="entourage"
      ref={sectionRef}
      style={{
        background: '#fff',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: 'clamp(40px, 6vw, 80px) clamp(16px, 4vw, 40px)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: 'clamp(340px, 55vw, 680px)',
          textAlign: 'center',
        }}>

          {/* Title */}
          <p style={{
            fontFamily: 'Great Vibes',
            fontSize: 'clamp(2.4rem, 5vw, 5rem)',
            color: '#111', fontWeight: 600,
            margin: '0 0 -6px', lineHeight: 0.6,
          }}>Rogado — Ynoc</p>
          <p style={{
            fontFamily: 'Gambarino',
            fontSize: 'clamp(0.85rem, 2.2vw, 2.5rem)',
            letterSpacing: '-3px', textTransform: 'uppercase',
            color: '#111', fontWeight: 400,
            margin: '0 0 18px',
          }}>Nuptials</p>

          {/* Officiating Priest */}
          <GoldSubtitle>Officiating Priest</GoldSubtitle>
          <Name>His Excellence Most Rev. Jose S. Palma, D.D.</Name>
          <Name>Archbishop Emeritus of Cebu</Name>

          <div style={{ height: '10px' }} />

          {/* Concelebrant */}
          <GoldSubtitle>Concelebrant</GoldSubtitle>
          <Name>Reverend Father Brian Brigoli</Name>

          {/* Principal Sponsors */}
          <GoldDividerLabel subtitle="To stand as principal witness in our exchange of vows">
            Principal Sponsors
          </GoldDividerLabel>

          <div style={{ height: '8px' }} />

          <div style={{ fontSize: 'clamp(0.6rem, 0.8vw, 0.82rem)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px', marginTop: '8px' }}>
              <div style={{ gridColumn: '1 / -1', textAlign: 'center' }}>
                <Name>Mayor Marvey A. Marino & Congresswoman Beverly Rose A. Dimacuha-Marino</Name>
              </div>
              <div style={{ textAlign: 'left' }}>
                <Name>Mr. Guilbert B. Alea & Dr. Maryrose B. Alea</Name>
                <Name>Dr. Butch Arenajo & Atty. Lady Arenajo</Name>
                <Name>Mr. Chilo James Delator & Mrs. Helen Delator</Name>
                <Name>Mr. Fred Gabuya & Mrs. Chona Gabuya</Name>
                <Name>Dr. Ode Blanco & Mrs. Libby Blanco</Name>
              </div>
              <div style={{ textAlign: 'right' }}>
                <Name>Mr. Raymond Rogado & Mrs. Arlyn Tad-y</Name>
                <Name>Mr. Clifford S. Con-ui & Mrs. Ebgie E. Gierran</Name>
                <Name>Mr. Marlonito Colina & Mrs. Rose Marie Colina</Name>
                <Name>Mr. Henry P. Lepiten Jr. & Mrs. Jenie D. Lepiten</Name>
              </div>
            </div>
          </div>

          <div style={{ height: 'clamp(20px, 3vw, 30px)' }} />

          <GoldSubtitle>To assist our needs</GoldSubtitle>
          <div style={{ height: '6px' }} />

          <TwoCol
            left={
              <>
                <GoldSubtitle size="0.95rem">Best Men</GoldSubtitle>
                <Name>Mr. Jonas Benedict V. Rogado</Name>
                <Name>Mr. Ernest E. Gierran</Name>
              </>
            }
            right={
              <>
                <GoldSubtitle size="0.95rem">Matrons of Honor</GoldSubtitle>
                <Name>Mrs. Mary Antonette Y. Stubbing</Name>
                <Name>Mrs. Danika Joan N. Llanto</Name>
              </>
            }
          />

          <GoldDividerLabel subtitle="To guide our way ahead">
            Bridal Entourage
          </GoldDividerLabel>

          <div style={{ height: '6px' }} />

          <TwoCol
            left={
              <>
                <GoldSubtitle size="0.95rem">Groomsmen</GoldSubtitle>
                <Name>Mr. Mark Anthony A. Ynoc</Name>
                <Name>Mr. Barlowe Manell E. Rogado</Name>
                <Name>Mr. Enrico John Llanto</Name>
                <Name>Mr. Nicky Nelson E. Escasenas</Name>
                <Name>Mr. Marvin A. Tad-y</Name>
                <Name>Mr. Kenneth R. Escanilla</Name>
                <Name>Engr. Brant Jason E. Rogado</Name>
                <Name>Mr. Jbonnie Christian D. Rogado</Name>
              </>
            }
            right={
              <>
                <GoldSubtitle size="0.95rem">Bridesmaids</GoldSubtitle>
                <Name>Dr. Charlene Kay A. Ynoc</Name>
                <Name>Mrs. Katrina Y. Rogado</Name>
                <Name>Ms. Queency Ann M. Arong</Name>
                <Name>Mrs. Maria Ysabella G. Cang</Name>
                <Name>Mrs. Roxnne Monique R. Go</Name>
                <Name>Ms. Nykesha Therese E. Rogado</Name>
                <Name>Ms. Alyssa Cristina G. Bigornia</Name>
                <Name>Ms. Maria Feline D. Soria</Name>
              </>
            }
          />

          <div style={{ height: '10px' }} />

          <GoldSubtitle size="0.95rem">Junior Bridesmaid</GoldSubtitle>
          <Name>Maria Ameerha Y. Rogado</Name>

          <div style={{ height: 'clamp(30px, 4.5vw, 50px)' }} />

          <GoldSubtitle>To carry our symbol of Love, Treasure, and Faith</GoldSubtitle>
          <div style={{ height: '6px' }} />

          <FourCol cols={[
            <>
              <GoldSubtitle size="0.8rem">Ring Bearer</GoldSubtitle>
              <Name style={{ fontSize: '0.62rem' }}>Beauden Antoine Y. Stubbing</Name>
            </>,
            <>
              <GoldSubtitle size="0.8rem">Bible Bearer</GoldSubtitle>
              <Name style={{ fontSize: '0.62rem' }}>Archer Bruce Y. Stubbing</Name>
            </>,
            <>
              <GoldSubtitle size="0.8rem">Ring Bearer</GoldSubtitle>
              <Name style={{ fontSize: '0.62rem' }}>Arthur R. Go</Name>
            </>,
            <>
              <GoldSubtitle size="0.8rem">Bible Bearer</GoldSubtitle>
              <Name style={{ fontSize: '0.62rem' }}>Magnus Anton A. Ynoc</Name>
            </>,
          ]} />

          <div style={{ height: '10px' }} />

          <GoldSubtitle size="0.95rem">Flower Girls</GoldSubtitle>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '6px', flexWrap: 'wrap' }}>
            <Name>Arabella Rianna R. Go</Name>
            <Name>Aela Vernice C. Abit</Name>
            <Name>Rizzini Victoria B. Gomez</Name>
          </div>

          <GoldDividerLabel>Secondary Sponsors</GoldDividerLabel>

          <div style={{ height: '6px' }} />

          <div style={{ display: 'flex', gap: '6px', width: '100%' }}>
            {[
              { label: 'To light our path', name: 'Mr. Iam James Butron & Mrs. Shery Ann Butron' },
              { label: 'To clothe us as one', name: 'Mr. Onin A. Villarubia & Mrs. Michelle G. Villarubia' },
              { label: 'To bind us together', name: 'Mr. Britt Carli Reroma & Mrs. Sybil Reroma' },
            ].map(({ label, name }) => (
              <div key={label} style={{ flex: 1, textAlign: 'center' }}>
                <GoldSubtitle size="0.7rem" style={{ fontStyle: 'italic' }}>{label}</GoldSubtitle>
                <Name style={{ fontSize: '0.62rem' }}>{name}</Name>
              </div>
            ))}
          </div>

          <div style={{ height: '24px' }} />
        </div>
      </div>
    </section>
  );
};

export default EntourageSection;