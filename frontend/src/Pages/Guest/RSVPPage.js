import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { submitRSVP } from '../../Helpers/API/GuestApi';
import { getGuestSession, setAttended, clearGuestSession } from '../../Helpers/Utilities/Common';
import backgroundBanner from '../../Assets/Video/VideoBackground.mp4';
import useIsMobile from '../../Helpers/Utilities/useIsMobile';

if (!document.head.querySelector('[href*="Great+Vibes"]')) {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Gambarino&display=swap';
  document.head.appendChild(fontLink);
}

const GOLD = '#B59A58';

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Gambarino&display=swap');

  * { box-sizing: border-box; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(26px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .rsvp-content {
    animation: fadeUp 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .no-btn {
    background: rgba(255, 255, 255, 0.72) !important;
    border: 1px solid rgba(181, 154, 88, 0.55) !important;
    color: #4a3f2f !important;
    transition: all 0.22s ease !important;
    letter-spacing: 1.8px !important;
    text-transform: uppercase !important;
  }
  .no-btn:hover {
    background: rgba(255, 255, 255, 0.92) !important;
    border-color: #B59A58 !important;
    color: #2a1f0f !important;
    transform: translateY(-1px) !important;
  }

  .yes-btn {
    background: linear-gradient(135deg, #c9aa6a 0%, #B59A58 50%, #a08540 100%) !important;
    border: 1px solid rgba(255, 255, 255, 0.35) !important;
    color: #fff !important;
    transition: all 0.22s ease !important;
    letter-spacing: 1.8px !important;
    text-transform: uppercase !important;
    box-shadow: 0 2px 12px rgba(181, 154, 88, 0.32) !important;
  }
  .yes-btn:hover {
    background: linear-gradient(135deg, #d4b87a 0%, #c9aa6a 50%, #b59050 100%) !important;
    box-shadow: 0 4px 18px rgba(181, 154, 88, 0.45) !important;
    transform: translateY(-1px) !important;
  }

  .location-link {
    color: #2a1f0f;
    text-decoration: none;
    border-bottom: 1px solid rgba(42, 31, 15, 0.35);
    font-family: 'Times New Roman', serif;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.3px;
    transition: color 0.2s, border-color 0.2s;
    display: inline-block;
    margin-top: -1px;
  }
  .location-link:hover {
    color: #B59A58;
    border-bottom-color: #B59A58;
  }
`;

/* ── Font helpers ── */
const greatVibes = (size, color = '#111', extra = {}) => ({
  fontFamily: "'Great Vibes', cursive",
  fontSize: size, color, fontWeight: 400, margin: 0, lineHeight: 1.15,
  ...extra,
});
const gambarino = (size, color = '#333', extra = {}) => ({
  fontFamily: 'Gambarino, serif',
  fontSize: size, color, fontWeight: 400, margin: 0, lineHeight: 1.5,
  ...extra,
});
const timesNew = (size, color = '#333', extra = {}) => ({
  fontFamily: "'Times New Roman', Times, serif",
  fontSize: size, color, margin: 0, lineHeight: 1.6,
  ...extra,
});

/* ── Components ── */
const VideoBg = () => (
  <video
    src={backgroundBanner}
    autoPlay muted loop playsInline
    style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%',
      objectFit: 'cover', zIndex: 0,
    }}
  />
);

const GoldLine = ({ margin, isMobile }) => (
  <div style={{
    width: '100%', height: '1px',
    background: 'rgba(181,154,88,0.4)',
    margin: margin || (isMobile ? '6px 0' : '4px 0'),
  }} />
);

const GlassCard = ({ children, maxWidthOverride, isMobile }) => (
  <div className="rsvp-content" style={{
    position: 'relative',
    zIndex: 3,
    background: isMobile ? 'rgba(255, 255, 255, 0.16)' : 'rgba(255, 255, 255, 0.20)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(181,154,88,0.22)',
    borderRadius: '14px',
    padding: 'clamp(40px, 6vh, 85px) clamp(18px, 5vw, 70px)',
    textAlign: 'center',
    width: isMobile ? '88%' : '90%',
    maxWidth: maxWidthOverride || (isMobile ? '360px' : '600px'),
    margin: '0 auto',
    boxShadow: `
      0 4px 32px rgba(0,0,0,0.12),
      0 1px 0 rgba(255,255,255,0.85) inset,
      0 0 0 1px rgba(255,255,255,0.42) inset
    `,
    boxSizing: 'border-box',
  }}>
    {children}
  </div>
);

const DateSideItem = ({ children, isMobile, R }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
    <div style={{ width: R.dateLineWidth, height: '1px', background: GOLD }} />
    <p style={gambarino(R.dateLabelSize, '#555', {
      letterSpacing: '1.5px', textTransform: 'uppercase',
    })}>{children}</p>
    <div style={{ width: R.dateLineWidth, height: '1px', background: GOLD }} />
  </div>
);

/* ── Main Component ── */
const RSVPPage = () => {
  const guest    = getGuestSession();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const [step,    setStep]    = useState('choice');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const seatCount = Number(guest?.reserved_seats ?? 1);

  const R = {
    nameSize:            isMobile ? '1.45rem'  : '2.4rem',
    andSize:             isMobile ? '0.85rem'  : '1.3rem',
    inviteSmallSize:     isMobile ? '0.52rem'  : '0.68rem',
    saveDateSize:        isMobile ? '1.1rem'   : '1.5rem',
    dateLabelSize:       isMobile ? '0.38rem'  : '0.50rem',
    dateDaySize:         isMobile ? '1.1rem'   : '1.7rem',
    dateLineWidth:       isMobile ? '34px'     : '52px',
    venueLabelSize:      isMobile ? '0.82rem'  : '1.1rem',
    venueNameSize:       isMobile ? '0.46rem'  : '0.57rem',
    guestNameSize:       isMobile ? '0.66rem'  : '0.78rem',
    guestInviteSize:     isMobile ? '0.75rem'  : '0.88rem',
    seatSize:            isMobile ? '1.10rem'  : '1.25rem',
    rsvpQSize:           isMobile ? '0.62rem'  : '0.82rem',
    btnPadding:          isMobile ? '5px 18px' : '6px 24px',
    btnFontSize:         isMobile ? '0.55rem'  : '0.65rem',
    btnMinWidth:         isMobile ? '62px'     : '82px',
    thankYouSize:        isMobile ? '1.9rem'   : '2.6rem',
    thankYouCardMax:     isMobile ? '340px'    : '440px',
    thankYouBodySize:    isMobile ? '0.88rem'  : '0.95rem',
    declineMaxWidth:     isMobile ? '380px'    : '540px',
    declineSorrySize:    isMobile ? '0.44rem'  : '0.85rem',
    declineHeadSize:     isMobile ? '1.1rem'   : '2rem',
    declineTextAreaSize: isMobile ? '0.75rem'  : '0.88rem',
    declineBtnPad:       isMobile ? '3px 10px' : '5px 16px',
    declineBtnSize:      isMobile ? '0.78rem'  : '0.9rem',
  };

  useEffect(() => {
    if (guest?.is_attending === 1) navigate('/home');
  }, []);

  const handleAttendConfirm = async () => {
    setLoading(true);
    try {
      await submitRSVP(guest.id, { is_attending: 1, children_count: 0, plus_one_count: 0, message: '' });
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
    } catch {
      toast.error('Could not submit. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pageWrap = {
    minHeight: '100vh',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    padding: isMobile ? '12px 10px' : '16px 14px',
    position: 'relative', overflow: 'hidden',
  };

  /* ── CHOICE ── */
  if (step === 'choice') return (
    <div style={pageWrap}>
      <style>{globalStyles}</style>
      <VideoBg />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'rgba(0,0,0,0.18)',
      }} />

      <div className="rsvp-content" style={{
        position: 'relative', zIndex: 3,
        textAlign: 'center', marginBottom: '8px',
      }}>
        <p style={{
          fontFamily: 'Great Vibes',
          fontSize: isMobile ? '2.4rem' : '3rem',
          color: '#fff', fontWeight: 600,
          margin: '0 0 -6px', lineHeight: 0.9,
          textShadow: '0 2px 12px rgba(0,0,0,0.45)',
        }}>Rogado — Ynoc</p>
        <p style={{
          fontFamily: 'Gambarino',
          fontSize: isMobile ? '0.85rem' : '1.7rem',
          letterSpacing: isMobile ? '2px' : '-3px',
          textTransform: 'uppercase',
          color: '#fff', fontWeight: 400,
          margin: '0',
          textShadow: '0 1px 8px rgba(0,0,0,0.4)',
        }}>Nuptials</p>
      </div>

      <GlassCard isMobile={isMobile}>
        <p style={gambarino(R.inviteSmallSize, '#111', { marginBottom: '1px' })}>We,</p>
        <p style={greatVibes(R.nameSize, '#111')}>Barnet Moncrief</p>
        <p style={greatVibes(R.andSize, '#222')}>and</p>
        <p style={greatVibes(R.nameSize, '#111', { marginBottom: isMobile ? '5px' : '3px' })}>Jane Antonette</p>
        <p style={gambarino(R.inviteSmallSize, '#222', { marginBottom: '1px' })}>
          request the honor of your presence
        </p>
        <p style={gambarino(R.inviteSmallSize, '#222', { marginBottom: isMobile ? '6px' : '4px' })}>
          as we unite in Matrimony
        </p>

        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          gap: isMobile ? '6px' : '18px',
          marginBottom: isMobile ? '5px' : '3px',
        }}>
          <DateSideItem isMobile={isMobile} R={R}>Wednesday</DateSideItem>
          <div style={{ textAlign: 'center' }}>
            <p style={gambarino(R.dateLabelSize, '#222', {
              letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '0',
            })}>January</p>
            <p style={timesNew(R.dateDaySize, '#111', { fontWeight: '700', lineHeight: 1 })}>06</p>
            <p style={gambarino(R.dateLabelSize, '#222', { letterSpacing: '2px' })}>2027</p>
          </div>
          <DateSideItem isMobile={isMobile} R={R}>1:30 PM</DateSideItem>
        </div>

        <GoldLine isMobile={isMobile} />

        <div style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          gap: '0',
          margin: isMobile ? '5px 0' : '3px 0',
          alignItems: 'center',
        }}>
          <div style={{ flex: 1, textAlign: 'center', padding: isMobile ? '0' : '0 8px' }}>
            <span style={greatVibes(R.venueLabelSize, '#111', { display: 'block', marginBottom: '2px' })}>
              Ceremony
            </span>
            <p style={timesNew(R.venueNameSize, '#333', {
              textTransform: 'uppercase', letterSpacing: '0.3px', lineHeight: 1.4,
              marginBottom: isMobile ? '-10px' : '2px',
            })}>
              The Archdiocesan Shrine<br />
              of the Most Sacred Heart of Jesus
            </p>
            <a className="location-link"
              href="https://maps.google.com/?q=Archdiocesan+Shrine+Most+Sacred+Heart+of+Jesus+Cebu"
              target="_blank" rel="noopener noreferrer">
              View location →
            </a>
          </div>

          <div style={{ flex: 1, textAlign: 'center', padding: isMobile ? '0' : '0 8px' }}>
            <span style={greatVibes(R.venueLabelSize, '#111', {
              display: 'block', marginBottom: '2px',
              marginTop: isMobile ? '20px' : '0px',
            })}>
              Reception
            </span>
            <p style={timesNew(R.venueNameSize, '#333', { lineHeight: 1.4, marginBottom: '1px' })}>
              Santa Maria Grand Ballroom
            </p>
            <p style={timesNew(R.venueNameSize, '#333', {
              textTransform: 'uppercase', letterSpacing: '0.3px', lineHeight: 1.4,
              marginBottom: isMobile ? '-10px' : '2px',
            })}>
              Radisson Blu Hotel Cebu
            </p>
            <a className="location-link"
              href="https://maps.google.com/?q=Radisson+Blu+Hotel+Cebu"
              target="_blank" rel="noopener noreferrer">
              View location →
            </a>
          </div>
        </div>

        <GoldLine isMobile={isMobile} />

        <p style={timesNew(R.guestNameSize, '#222', {
          fontWeight: '600',
          marginTop: isMobile ? '10px' : '6px',
          marginBottom: '1px',
        })}>
          {guest?.name}
        </p>
        <p style={greatVibes(R.guestInviteSize, '#222', { fontStyle: 'italic' })}>
          You're cordially invited!
        </p>
      </GlassCard>

      <div className="rsvp-content" style={{
        position: 'relative', zIndex: 3,
        textAlign: 'center',
        margin: isMobile ? '10px auto 0' : '5px auto 0',
        width: isMobile ? '88%' : 'auto',
        maxWidth: isMobile ? '360px' : 'none',
      }}>
        <p style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: R.seatSize,
          color: '#fff', fontStyle: 'italic', fontWeight: '500',
          letterSpacing: '0.4px', margin: '0 0 4px',
          WebkitTextStroke: '0.3px rgba(255,220,120,0.4)',
          textShadow: `
            0 0 4px rgba(255,210,80,1),
            0 0 8px rgba(255,200,60,0.9),
            0 0 12px rgba(210,160,40,0.8),
            0 0 20px rgba(181,154,88,0.6),
            0 2px 10px rgba(0,0,0,0.7)
          `,
        }}>
          We have reserved&nbsp;
          <span style={{ fontWeight: 900, color: '#e8d5a3' }}>
            {seatCount} {seatCount === 1 ? 'seat' : 'seats'}
          </span>
          &nbsp;for you.
        </p>

        <p style={{
          fontFamily: "'Times New Roman', Times, serif",
          fontSize: R.rsvpQSize,
          color: '#fff', fontWeight: '600',
          letterSpacing: '0.5px', margin: '0 0 8px',
          textShadow: '0 1px 6px rgba(0,0,0,0.55)',
        }}>
          Will you be attending?
        </p>

        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <button className="no-btn" style={{
            padding: R.btnPadding, borderRadius: '20px',
            fontFamily: "'Times New Roman', serif",
            fontSize: R.btnFontSize, cursor: 'pointer',
            minWidth: R.btnMinWidth,
          }} onClick={() => setStep('decline_msg')}>
            No
          </button>
          <button className="yes-btn" style={{
            padding: R.btnPadding, borderRadius: '20px',
            fontFamily: "'Times New Roman', serif",
            fontSize: R.btnFontSize, cursor: 'pointer',
            minWidth: R.btnMinWidth,
          }} onClick={handleAttendConfirm} disabled={loading}>
            {loading ? 'Confirming...' : 'Yes'}
          </button>
        </div>
      </div>
    </div>
  );

  /* ── DECLINE ── */
  if (step === 'decline_msg') return (
    <div style={pageWrap}>
      <style>{globalStyles}</style>
      <VideoBg />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'rgba(0,0,0,0.15)',
      }} />

      <GlassCard isMobile={isMobile} maxWidthOverride={isMobile ? '340px' : '480px'}>
        <div style={{ paddingBottom: '4px' }}>
          <p style={timesNew(R.declineSorrySize, '#555', {
            fontStyle: 'italic', marginBottom: '4px', textAlign: 'center',
          })}>
            Sorry to hear you can't make it...
          </p>
          <p style={greatVibes(R.declineHeadSize, '#111', {
            marginBottom: '14px', textAlign: 'center',
          })}>
            Leave a message<br />for the bride &amp; groom
          </p>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write your message here..."
            style={{
              width: '100%',
              minHeight: isMobile ? '100px' : '130px',
              border: '1px solid rgba(181,154,88,0.4)',
              borderRadius: '8px',
              padding: '10px 12px',
              fontFamily: "'Times New Roman', serif",
              fontSize: R.declineTextAreaSize,
              color: '#222',
              background: 'rgba(255,255,255,0.5)',
              resize: 'none', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
          <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
            <button onClick={handleDeclineSubmit} disabled={loading} style={{
              padding: R.declineBtnPad,
              background: GOLD, color: '#fff',
              border: '1px solid rgba(181,154,88,0.4)',
              borderRadius: '8px',
              fontFamily: "'Times New Roman', serif",
              fontSize: R.declineBtnSize,
              cursor: 'pointer', letterSpacing: '0.5px',
            }}>
              {loading ? 'Sending...' : 'Send'}
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );

  /* ── THANK YOU ── */
  if (step === 'thankyou') return (
    <div style={pageWrap}>
      <style>{globalStyles}</style>
      <VideoBg />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: 'rgba(0,0,0,0.15)',
      }} />
      <GlassCard isMobile={isMobile} maxWidthOverride={R.thankYouCardMax}>
        <p style={greatVibes(R.thankYouSize, '#111', { marginBottom: '14px' })}>Thank You</p>
        <GoldLine isMobile={isMobile} />
        <p style={timesNew(R.thankYouBodySize, '#333', { lineHeight: 1.8, marginTop: '12px' })}>
          We're sad you can't make it, but we're grateful for your kind words.<br />
          You'll be in our hearts on our special day. 🤍
        </p>
      </GlassCard>
    </div>
  );

  return null;
};

export default RSVPPage;