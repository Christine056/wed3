import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { submitRSVP } from '../../Helpers/API/GuestApi';
import { getGuestSession, setAttended } from '../../Helpers/Utilities/Common';
import logoImg from '../../Assets/Images/logo.png';
import flowerBorder1 from '../../Assets/Images/flower-border1.png';
import flowerBorder2 from '../../Assets/Images/flower-border2.png';
import leaveMessage from '../../Assets/Images/leave-message.png';
import useIsMobile from '../../Helpers/Utilities/useIsMobile';

/* ── Google Fonts ── */
if (!document.head.querySelector('[href*="Gambarino"]')) {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Gambarino&display=swap';
  document.head.appendChild(fontLink);
}

const PURPLE = '#8F358C';
const YES_GREEN = '#5d914566';
const NO_GREY = 'rgba(186,186,186,0.2)';
const SEND_BTN = '#5d914566';

const NAV_SECTIONS = ['RSVP', 'Attire', 'Entourage', 'Gifts', 'Privacy', 'Accommodation', 'Snap & Share'];

/* ── Petal shapes ── */
const PETAL_DEFS = [
  "M10,0 C18,4 20,14 10,22 C0,14 2,4 10,0Z",
  "M0,8 C4,0 16,0 20,8 C16,16 4,16 0,8Z",
  "M8,0 C18,2 22,12 12,20 C2,18 -2,8 8,0Z",
  "M10,0 C15,6 16,16 10,24 C4,16 5,6 10,0Z",
  "M8,0 C14,2 14,14 8,16 C2,14 2,2 8,0Z",
];

const PETAL_COLORS = [
  'rgba(200,130,210,0.45)',
  'rgba(230,170,235,0.38)',
  'rgba(180,100,190,0.42)',
  'rgba(210,150,230,0.35)',
  'rgba(195,140,220,0.4)',
  'rgba(240,200,245,0.3)',
  'rgba(160,80,180,0.36)',
];

const seeded = (i, offset = 0) => {
  const x = Math.sin(i * 127.1 + offset * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const PETAL_COUNT = 18;
const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: `${seeded(i, 0) * 100}%`,
  size: 14 + seeded(i, 1) * 18,
  color: PETAL_COLORS[Math.floor(seeded(i, 2) * PETAL_COLORS.length)],
  path: PETAL_DEFS[Math.floor(seeded(i, 3) * PETAL_DEFS.length)],
  duration: 7 + seeded(i, 4) * 8,
  delay: seeded(i, 5) * -14,
  rotation: seeded(i, 6) * 360,
  drift: (seeded(i, 7) - 0.5) * 120,
  swayDuration: 2.5 + seeded(i, 8) * 3,
  swayDelay: seeded(i, 9) * -4,
}));

/* ── Fairy Light Glow Points ── */
// Bottom-left flower cluster glow positions (relative to viewport)
const FAIRY_LIGHTS_BOTTOM_LEFT = [
  { x: 8, y: 82, size: 18, delay: 0 },
  { x: 12, y: 75, size: 14, delay: 0.8 },
  { x: 5, y: 88, size: 16, delay: 1.5 },
  { x: 18, y: 78, size: 12, delay: 2.2 },
  { x: 3, y: 80, size: 15, delay: 3.0 },
  { x: 15, y: 85, size: 13, delay: 3.8 },
  { x: 22, y: 82, size: 11, delay: 4.5 },
  { x: 10, y: 90, size: 17, delay: 5.2 },
  { x: 6, y: 72, size: 10, delay: 6.0 },
  { x: 20, y: 88, size: 14, delay: 6.8 },
  { x: 14, y: 92, size: 12, delay: 7.5 },
  { x: 2, y: 85, size: 15, delay: 1.2 },
];

// Top-right flower cluster glow positions
const FAIRY_LIGHTS_TOP_RIGHT = [
  { x: 85, y: 12, size: 16, delay: 0.5 },
  { x: 90, y: 18, size: 14, delay: 1.3 },
  { x: 82, y: 8, size: 12, delay: 2.0 },
  { x: 95, y: 15, size: 15, delay: 2.8 },
  { x: 88, y: 22, size: 13, delay: 3.5 },
  { x: 78, y: 14, size: 11, delay: 4.2 },
  { x: 92, y: 10, size: 17, delay: 5.0 },
  { x: 84, y: 20, size: 14, delay: 5.8 },
  { x: 96, y: 8, size: 10, delay: 6.5 },
  { x: 80, y: 18, size: 16, delay: 7.2 },
  { x: 93, y: 24, size: 12, delay: 0.2 },
  { x: 87, y: 6, size: 13, delay: 1.8 },
];

const ALL_FAIRY_LIGHTS = [...FAIRY_LIGHTS_BOTTOM_LEFT, ...FAIRY_LIGHTS_TOP_RIGHT];

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Gambarino&display=swap');

  * { box-sizing: border-box; }

  @media (max-width: 640px) {
    .nav-links { display: none !important; }
    .hamburger { display: flex !important; }
  }
  @media (min-width: 641px) {
    .hamburger { display: none !important; }
    .nav-links { display: flex !important; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(26px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes petalFall {
    0% {
      transform: translateY(-60px) rotate(var(--rot-start)) translateX(0px);
      opacity: 0;
    }
    6% { opacity: var(--petal-opacity); }
    88% { opacity: var(--petal-opacity); }
    100% {
      transform: translateY(110vh) rotate(var(--rot-end)) translateX(var(--drift));
      opacity: 0;
    }
  }
  @keyframes petalSway {
    0%, 100% { margin-left: 0px; }
    50%       { margin-left: var(--sway); }
  }

  /* ── Fairy Light Breathing Glow Animation ── */
  @keyframes fairyGlow {
    0%, 100% {
      opacity: 0.3;
      transform: scale(0.85);
    }
    50% {
      opacity: 0.75;
      transform: scale(1.15);
    }
  }

  .rsvp-content {
    animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both;
  }

  .no-btn:hover {
    background: rgba(186,186,186,0.35) !important;
    transform: translateY(-1px);
  }
  .yes-btn:hover {
    background: rgba(93,145,69,0.6) !important;
    transform: translateY(-1px);
  }
  .no-btn, .yes-btn {
    transition: all 0.2s ease !important;
  }

  .petals-layer {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 10;
  }
  .petal-wrap {
    position: absolute;
    top: 0;
    animation:
      petalFall var(--fall-dur) var(--fall-delay) linear infinite,
      petalSway var(--sway-dur) var(--sway-delay) ease-in-out infinite;
  }

  .fairy-light {
    position: fixed;
    pointer-events: none;
    border-radius: 50%;
    animation: fairyGlow var(--glow-duration) var(--glow-delay) ease-in-out infinite;
    z-index: 3;
  }
`;

const RSVPPage = () => {
  const guest = getGuestSession();
  const [step, setStep] = useState('choice');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeNav, setActiveNav] = useState('RSVP');
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const tablemates = guest?.tablemates || ['Faith Prieto', 'Prieto Faith', 'Frieto Paith', 'Paith Prieto'];
  const tableNumber = guest?.table_number || '1';

  useEffect(() => { window.scrollTo(0, 0); }, [step]);

  /* ── API handlers — UNTOUCHED ── */
  const handleAttendConfirm = async () => {
    setLoading(true);
    try {
      await submitRSVP(guest.id, {
        is_attending: 1, children_count: 0, plus_one_count: 0, message: '',
      });
      setAttended();
      toast.success("🎉 We're so excited to celebrate with you!");
      setTimeout(() => navigate('/home'), 300);
    } catch {
      toast.error('Could not submit RSVP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeclineSubmit = async () => {
    setLoading(true);
    try {
      await submitRSVP(guest.id, { is_attending: 0, children_count: 0, plus_one_count: 0, message });
      setStep('thankyou');
    } catch { toast.error('Could not submit. Please try again.'); }
    finally { setLoading(false); }
  };

  /* ── FAIRY LIGHT GLOWS ── */
  const FairyLights = () => (
    <>
      {ALL_FAIRY_LIGHTS.map((light, i) => {
        const duration = 6 + seeded(i, 20) * 2; // 6-8 seconds
        return (
          <div
            key={`fairy-${i}`}
            className="fairy-light"
            style={{
              left: `${light.x}%`,
              top: `${light.y}%`,
              width: `${light.size}px`,
              height: `${light.size}px`,
              '--glow-duration': `${duration}s`,
              '--glow-delay': `${light.delay}s`,
              background: `radial-gradient(circle, rgba(255,215,140,0.85) 0%, rgba(255,195,100,0.5) 35%, rgba(255,180,80,0.2) 60%, transparent 100%)`,
              boxShadow: `
                0 0 ${light.size * 0.8}px rgba(255,200,100,0.4),
                0 0 ${light.size * 1.5}px rgba(255,180,80,0.25),
                0 0 ${light.size * 2.5}px rgba(255,160,60,0.15)
              `,
            }}
          />
        );
      })}
    </>
  );

  /* ── FLOATING PETALS ── */
  const FloatingPetals = () => (
    <div className="petals-layer" aria-hidden="true">
      {petals.map(p => (
        <div
          key={p.id}
          className="petal-wrap"
          style={{
            left: p.left,
            '--fall-dur': `${p.duration}s`,
            '--fall-delay': `${p.delay}s`,
            '--rot-start': `${p.rotation}deg`,
            '--rot-end': `${p.rotation + 200 + (seeded(p.id, 10) - 0.5) * 160}deg`,
            '--drift': `${p.drift}px`,
            '--petal-opacity': 0.65,
            '--sway': `${(seeded(p.id, 11) - 0.5) * 28}px`,
            '--sway-dur': `${p.swayDuration}s`,
            '--sway-delay': `${p.swayDelay}s`,
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.35}
            viewBox="0 0 20 24"
            style={{ display: 'block', filter: 'blur(0.4px)' }}
          >
            <path d={p.path} fill={p.color} />
          </svg>
        </div>
      ))}
    </div>
  );

  /* ── NAVBAR — UNTOUCHED ── */
  const Navbar = () => (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(143,53,140,0.12)',
      padding: '0 20px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '56px', boxSizing: 'border-box',
    }}>
      <img src={logoImg} alt="M&J" style={{ height: '40px', objectFit: 'contain' }} />

      <div className="nav-links" style={{ gap: '4px', alignItems: 'center' }}>
        {NAV_SECTIONS.map(s => (
          <button key={s} onClick={() => setActiveNav(s)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Arial, sans-serif', fontSize: '0.7rem',
            letterSpacing: '0.8px', textTransform: 'uppercase',
            color: activeNav === s ? PURPLE : '#666',
            borderBottom: activeNav === s ? `2px solid ${PURPLE}` : '2px solid transparent',
            padding: '4px 10px', transition: 'all 0.2s',
          }}>{s}</button>
        ))}
      </div>

      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        flexDirection: 'column', gap: '4px', padding: '4px',
      }}>
        {[0,1,2].map(i => (
          <div key={i} style={{ width: '22px', height: '2px', background: PURPLE }} />
        ))}
      </button>

      {menuOpen && (
        <div style={{
          position: 'absolute', top: '56px', left: 0, right: 0,
          background: 'rgba(255,255,255,0.97)',
          borderBottom: '1px solid rgba(143,53,140,0.12)', zIndex: 99,
        }}>
          {NAV_SECTIONS.map(s => (
            <button key={s} onClick={() => { setActiveNav(s); setMenuOpen(false); }} style={{
              display: 'block', width: '100%', background: 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'Arial, sans-serif', fontSize: '0.82rem',
              letterSpacing: '1px', textTransform: 'uppercase',
              color: activeNav === s ? PURPLE : '#555',
              padding: '13px 24px',
              borderLeft: activeNav === s ? `3px solid ${PURPLE}` : '3px solid transparent',
            }}>{s}</button>
          ))}
        </div>
      )}
    </nav>
  );

  /* ── FLOWER CORNERS — positions UNTOUCHED ── */
  const FlowerCorners = () => (
    <>
      <img src={flowerBorder1} alt="" style={isMobile ? {
        position: 'fixed', bottom: -7, left: -55,
        width: '100vw', pointerEvents: 'none', zIndex: 2,
      } : {
        position: 'fixed', bottom: 36, left: 0,
        width: 'clamp(500px, 30vw, 420px)',
        margin: -58, padding: 0, maxWidth: '500vw',
        pointerEvents: 'none', zIndex: 2,
      }} />
      <img src={flowerBorder2} alt="" style={isMobile ? {
        position: 'fixed', top: -20, right: -90,
        width: '100vw', pointerEvents: 'none', zIndex: 2,
      } : {
        position: 'fixed', top: 70, right: 0,
        margin: -120, padding: 0,
        width: 'clamp(550px, 30vw, 420px)', maxWidth: '500vw',
        pointerEvents: 'none', zIndex: 2,
      }} />
    </>
  );

  /* ── FROSTED GLASS CARD ── */
  const GlassCard = ({ children }) => (
    <div className="rsvp-content" style={{
      position: 'relative', zIndex: 3,
      background: 'rgba(255,255,255,0.62)',
      backdropFilter: 'blur(22px)',
      WebkitBackdropFilter: 'blur(22px)',
      border: '1px solid rgba(143,53,140,0.18)',
      borderRadius: '16px',
      padding: isMobile ? '32px 24px' : '44px 52px',
      textAlign: 'center',
      width: '100%',
      maxWidth: '420px',
      boxShadow: `
        0 4px 40px rgba(143,53,140,0.08),
        0 1px 0 rgba(255,255,255,0.9) inset,
        0 0 0 1px rgba(255,255,255,0.5) inset
      `,
    }}>
      {children}
    </div>
  );

  /* ── SUBTLE DIVIDER ── */
  const Divider = () => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '10px',
      margin: '18px auto', width: '100%', justifyContent: 'center',
    }}>
      <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, transparent, rgba(143,53,140,0.2))' }} />
      <div style={{ width: '4px', height: '4px', background: 'rgba(143,53,140,0.35)', borderRadius: '50%' }} />
      <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(143,53,140,0.2), transparent)' }} />
    </div>
  );

  const noBtnStyle = {
    padding: '13px 52px', borderRadius: '20px',
    border: '1px solid rgba(186,186,186,0.6)',
    background: NO_GREY,
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    color: '#222', fontFamily: 'Arial, sans-serif',
    fontSize: '0.95rem', cursor: 'pointer',
    letterSpacing: '1px', minWidth: '130px',
  };

  const yesBtnStyle = {
    padding: '13px 52px', borderRadius: '20px',
    border: '1px solid rgba(93,145,69,0.5)',
    background: YES_GREEN,
    backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
    color: '#222', fontFamily: 'Arial, sans-serif',
    fontSize: '0.95rem', cursor: 'pointer',
    letterSpacing: '1px', minWidth: '130px',
  };

  const pageWrap = {
    minHeight: '100vh', background: '#fff',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '80px 24px 48px', position: 'relative', overflow: 'hidden',
  };

  /* Soft purple glow — reused on every page */
  const PurpleGlow = () => (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
      background: `radial-gradient(ellipse 65% 55% at 50% 55%, rgba(143,53,140,0.06) 0%, transparent 70%)`,
    }} />
  );

  const gambarino = (size, color = '#222', extra = {}) => ({
    fontFamily: 'Gambarino, serif', fontSize: size,
    color, fontWeight: 400, margin: 0, ...extra,
  });

  const arial = (size, color = '#333', extra = {}) => ({
    fontFamily: 'Arial, sans-serif', fontSize: size,
    color, margin: 0, ...extra,
  });

  /* ══════════════════════════════════════
     CHOICE
  ══════════════════════════════════════ */
  if (step === 'choice') return (
    <div style={pageWrap}>
      <style>{globalStyles}</style>
      <Navbar />
      <FloatingPetals />
      <FlowerCorners />
      <FairyLights />
      <PurpleGlow />
      <GlassCard>
        <p style={gambarino('clamp(1.5rem,5vw,2rem)', '#222', { marginBottom: '4px' })}>
          Your Assigned Seat
        </p>
        <p style={gambarino('clamp(2.6rem,9vw,4rem)', PURPLE, { marginBottom: '8px', lineHeight: 1.1 })}>
          Table {tableNumber}
        </p>
        <Divider />
        <p style={arial('0.92rem', '#888', { fontStyle: 'italic', marginBottom: '10px' })}>
          Sitting with you at your table are...
        </p>
        {tablemates.map((name, i) => (
          <p key={i} style={arial('0.95rem', '#444', { lineHeight: '2' })}>{name}</p>
        ))}
        <Divider />
        <p style={gambarino('clamp(1.3rem,4.5vw,1.8rem)', '#222', { marginBottom: '24px' })}>
          Will you be attending?
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="no-btn" style={noBtnStyle} onClick={() => setStep('decline_msg')}>No</button>
          <button className="yes-btn" style={yesBtnStyle} onClick={() => setStep('confirm')}>Yes</button>
        </div>
      </GlassCard>
    </div>
  );

  /* ══════════════════════════════════════
     CONFIRM
  ══════════════════════════════════════ */
  if (step === 'confirm') return (
    <div style={pageWrap}>
      <style>{globalStyles}</style>
      <Navbar />
      <FloatingPetals />
      <FlowerCorners />
      <FairyLights />
      <PurpleGlow />
      <GlassCard>
        <p style={gambarino('clamp(1.5rem,5vw,2rem)', '#222', { marginBottom: '4px' })}>
          Please confirm details
        </p>
        <p style={gambarino('clamp(2.6rem,9vw,4rem)', PURPLE, { marginBottom: '8px', lineHeight: 1.1 })}>
          Table {tableNumber}
        </p>
        <Divider />
        <div style={{ display: 'inline-block', textAlign: 'left', marginBottom: '8px' }}>
          {[
            ['Location', 'Oakridge Pavilion, Mandaue City, Cebu'],
            ['Time', '7:30 AM'],
            ['', ''],
            ['Table', tableNumber],
            ['Name', guest?.name],
            ['Reserved Seats', guest?.reserved_seats],
          ].map(([label, value], i) => (
            label === '' ? <div key={i} style={{ height: '12px' }} /> :
            <p key={label} style={arial('clamp(0.75rem,2.5vw,0.9rem)', '#333', { marginBottom: '6px', lineHeight: 1.8 })}>
              <span style={{ color: '#888' }}>{label}: </span>{value}
            </p>
          ))}
        </div>
        <Divider />
        <p style={gambarino('clamp(1.1rem,4vw,1.5rem)', '#222', { marginBottom: '24px' })}>
          Are the details above correct?
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="no-btn" style={noBtnStyle} onClick={() => setStep('choice')}>No</button>
          <button className="yes-btn" style={yesBtnStyle} onClick={handleAttendConfirm} disabled={loading}>
            {loading ? 'Confirming...' : 'Yes'}
          </button>
        </div>
      </GlassCard>
    </div>
  );

  /* ══════════════════════════════════════
     DECLINE MESSAGE — image untouched
  ══════════════════════════════════════ */
  if (step === 'decline_msg') return (
    <div style={{
      minHeight: '100vh', background: '#fff',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px 48px', position: 'relative',
    }}>
      <style>{globalStyles}</style>
      <Navbar />
      <FloatingPetals />
      <PurpleGlow />
      <div style={{ 
        position: 'relative', zIndex: 3, 
        width: '100%', 
        maxWidth: isMobile ? '400px' : '550px',
        marginTop: isMobile ? '20px' : '-80px',
        marginLeft: isMobile ? '-75px' : '-80px',
        animation: 'fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both',
      }}>
        <img src={leaveMessage} alt="" style={{ width: '120%', display: 'block', borderRadius: '8px' }} />
        <div style={{
          position: 'absolute', top: '32%', left: '20%', right: '-5%', bottom: '15%',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{ paddingLeft: '20px', width: '100%' }}>
            <p style={arial(isMobile ? '0.45rem' : '0.85rem', '#222', { fontStyle: 'italic', marginBottom: '1px', textAlign: 'right' })}>
              Sorry to hear you can't make it...
            </p>
            <p style={gambarino('clamp(1rem,3.5vw,2.50rem)', '#222', { marginBottom: '14px', textAlign: 'right', lineHeight: 1 })}>
              Leave a message<br />for the bride &amp; groom
            </p>
          </div>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write your message here..."
            style={{
              width: '100%', flex: 1, minHeight: '90px',
              border: '1px solid #222', borderRadius: '8px',
              padding: '10px 12px', fontFamily: 'Arial, sans-serif',
              fontSize: '0.88rem', color: '#222',
              background: 'transparent',
              resize: 'none', outline: 'none', boxSizing: 'border-box',
            }}
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={handleDeclineSubmit} disabled={loading} style={{
              padding: '2px 10px', background: SEND_BTN,
              color: '#fff', border: 'none', borderRadius: '8px',
              fontFamily: 'Arial, sans-serif', fontSize: '0.9rem',
              cursor: 'pointer', letterSpacing: '0.5px',
            }}>{loading ? 'Sending...' : 'Send'}</button>
          </div>
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════════
     THANK YOU — DECLINED
  ══════════════════════════════════════ */
  if (step === 'thankyou') return (
    <div style={pageWrap}>
      <style>{globalStyles}</style>
      <Navbar />
      <FloatingPetals />
      <FlowerCorners />
      <FairyLights />
      <PurpleGlow />
      <GlassCard>
        <p style={gambarino('clamp(2rem,7vw,3rem)', PURPLE, { marginBottom: '16px' })}>Thank You</p>
        <Divider />
        <p style={arial('0.95rem', '#555', { lineHeight: 1.8 })}>
          We're sad you can't make it, but we're grateful for your kind words.<br />
          You'll be in our hearts on our special day. 💛
        </p>
      </GlassCard>
    </div>
  );

  /* ══════════════════════════════════════
     THANK YOU — ATTENDING
  ══════════════════════════════════════ */
  if (step === 'thankyou_attend') return (
    <div style={pageWrap}>
      <style>{globalStyles}</style>
      <Navbar />
      <FloatingPetals />
      <FlowerCorners />
      <FairyLights />
      <PurpleGlow />
      <GlassCard>
        <p style={gambarino('clamp(2rem,7vw,3rem)', PURPLE, { marginBottom: '16px' })}>See You There!</p>
        <Divider />
        <p style={arial('0.95rem', '#555', { lineHeight: 1.8 })}>
          We're so excited to celebrate with you.<br />
          Can't wait to see you on our special day! 🎉
        </p>
      </GlassCard>
    </div>
  );

  return null;
};

export default RSVPPage;