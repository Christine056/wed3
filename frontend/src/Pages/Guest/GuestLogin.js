import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GiRing } from 'react-icons/gi';
import { FaLock } from 'react-icons/fa';
import { guestLogin } from '../../Helpers/API/GuestApi';
import { setGuestSession } from '../../Helpers/Utilities/Common';
import { validatePassword } from '../../Helpers/Utilities/Validations';

import waxSeal     from '../../Assets/Images/stamp.png';
import floral1     from '../../Assets/Images/Floral_bouquet1.png';
import floral2     from '../../Assets/Images/Floral_bouquet2.png';
import envelopeImg from '../../Assets/Images/envelop.png';

const randomBetween = (a, b) => a + Math.random() * (b - a);
const PETAL_COUNT = 45;

const GuestLogin = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [stage, setStage]       = useState('envelope');
  const [petals, setPetals]     = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setPetals(Array.from({ length: PETAL_COUNT }, (_, i) => ({
      id: i,
      left:     randomBetween(-5, 105),
      delay:    randomBetween(0, 16),
      duration: randomBetween(12, 22),
      size:     randomBetween(12, 26),
      rotation: randomBetween(0, 360),
      opacity:  randomBetween(0.5, 0.9),
      drift:    randomBetween(-70, 70),
    })));
  }, []);

  const handleOpen = () => {
    if (stage !== 'envelope') return;
    setStage('opening');
    setTimeout(() => setStage('login'), 1900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validatePassword(password);
    if (errors.length > 0) { toast.error(errors[0]); return; }
    setLoading(true);
    try {
      const res = await guestLogin(password);
      if (res.data) {
        setGuestSession(res.data);
        toast.success(`Welcome, ${res.data.name}! 🌸`);
        navigate('/rsvp');
      } else {
        toast.error(res.messages?.error_messages?.[0] || 'Invalid password.');
      }
    } catch {
      toast.error('Invalid password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

        /* ── Root ── */
        .gl-root {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
          background: #ede8dc;
        }

        /* ── Clean silk background — NO grid ── */
        .gl-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse at 20% 35%, rgba(235,215,175,0.55) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 65%, rgba(225,205,160,0.45) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 100%, rgba(205,185,145,0.3) 0%, transparent 45%),
            linear-gradient(150deg, #faf5eb 0%, #ede3cf 40%, #f4ead6 70%, #e8dfc8 100%);
        }

        /* Subtle single diagonal sheen — no repeating grid */
        .gl-silk {
          position: absolute; inset: 0;
          background: linear-gradient(
            118deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.2) 38%,
            rgba(255,255,255,0.05) 55%,
            rgba(255,255,255,0.15) 80%,
            rgba(255,255,255,0) 100%
          );
          pointer-events: none;
        }

        /* ── Petals ── */
        .gl-petal {
          position: absolute; top: -30px;
          pointer-events: none;
          animation: petalFall linear infinite;
          filter: drop-shadow(0 1px 3px rgba(140,100,50,0.15));
        }

        @keyframes petalFall {
          0%   { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0; }
          8%   { opacity: var(--op); }
          88%  { opacity: var(--op); }
          100% { transform: translateY(110vh) rotate(640deg) translateX(var(--drift)); opacity: 0; }
        }

        /* ══════════════════════════════
           ENVELOPE STAGE
        ══════════════════════════════ */
        .gl-env-stage {
          position: relative; z-index: 10;
          display: flex; flex-direction: column;
          align-items: center;
          gap: 1.5rem;
          width: 100%;
        }

        .gl-env-stage.is-opening {
          animation: stageExit 1.9s cubic-bezier(.4,0,.2,1) forwards;
        }

        @keyframes stageExit {
          0%   { opacity: 1; transform: translateY(0) scale(1); }
          35%  { opacity: 1; transform: translateY(-14px) scale(1.02); }
          100% { opacity: 0; transform: translateY(-90px) scale(0.88); }
        }

        /* ── Envelope scene — responsive ── */
        .gl-env-scene {
          position: relative;
          /* Responsive: fluid width with max cap */
          width: min(720px, 78vw);
          /* Height scales with width to keep envelope proportions */
          height: min(420px, 45vw);
          /* Extra space for florals overflowing */
          padding: 65px;
          box-sizing: content-box;
          margin: -65px;
        }

        /* ── Real envelope image ── */
        .gl-env-img-wrap {
          position: absolute;
          inset: 65px; /* matches scene padding */
          border-radius: 4px;
          overflow: hidden;
        }

        .gl-env-img {
          width: 100%;
          height: 100%;
          object-fit: fill;
          display: block;
          filter: drop-shadow(0 28px 55px rgba(0,0,0,0.42))
                  drop-shadow(0 8px 18px rgba(0,0,0,0.25));
          /* Flap open: scale/fade out top */
          transform-origin: top center;
          transition: transform 1.1s cubic-bezier(.22,1,.36,1),
                      opacity 0.9s ease;
        }

        .gl-env-scene.opened .gl-env-img {
          transform: rotateX(-170deg) scaleY(0.1);
          opacity: 0;
        }

        /* ── Wax seal ── */
        .gl-seal-wrap {
          position: absolute;
          /* Center on envelope (inset is 60px so center of inner rect) */
          top: calc(65px + 50%);
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .gl-seal-wrap:hover  { transform: translate(-50%, -50%) scale(1.08); }
        .gl-seal-wrap:active { transform: translate(-50%, -50%) scale(0.96); }

        .gl-seal-img {
          /* Responsive seal size */
          width: clamp(65px, 10vw, 130px);
          height: clamp(65px, 10vw, 130px);
          object-fit: contain;
          filter: drop-shadow(0 6px 20px rgba(0,0,0,0.5))
                  drop-shadow(0 2px 8px rgba(201,168,76,0.35));
          animation: sealFloat 3.5s ease-in-out infinite;
        }

        @keyframes sealFloat {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }

        .gl-seal-hint {
          font-family: 'Cinzel', serif;
          font-size: clamp(0.5rem, 1.2vw, 0.65rem);
          color: rgba(255,255,255,0.9);
          letter-spacing: 3px;
          text-transform: uppercase;
          white-space: nowrap;
          animation: hintPulse 2.5s ease-in-out infinite;
          text-shadow: 0 1px 4px rgba(0,0,0,0.25);
        }

        @keyframes hintPulse {
          0%, 100% { opacity: 0.5; }
          50%       { opacity: 1; }
        }

        /* ── Floral images — overflow the envelope scene ── */
        .gl-floral {
          position: absolute;
          pointer-events: none;
          z-index: 25;
        }

        /* Top-left */
        .gl-floral-tl {
          top: -5px;
          left: -5px;
          width: clamp(150px, 26vw, 310px);
          height: clamp(150px, 26vw, 310px);
        }

        /* Bottom-right */
        .gl-floral-br {
          bottom: -5px;
          right: -5px;
          width: clamp(145px, 25vw, 295px);
          height: clamp(145px, 25vw, 295px);
          transform: rotate(180deg);
        }

        .gl-floral img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: drop-shadow(0 4px 14px rgba(100,70,30,0.2));
        }

        /* ── Responsive breakpoints ── */
        @media (max-width: 768px) {
          .gl-env-scene { width: 94vw; height: 55vw; padding: 60px; margin: -60px; }
          .gl-env-img-wrap { inset: 60px; }
          .gl-seal-wrap { top: calc(60px + 50%); }
        }

        @media (max-width: 520px) {
          .gl-env-scene { width: 96vw; height: 56vw; padding: 40px; margin: -40px; }
          .gl-env-img-wrap { inset: 40px; }
          .gl-seal-wrap { top: calc(40px + 50%); }
          .gl-seal-hint { letter-spacing: 2px; }
        }

        @media (max-width: 380px) {
          .gl-env-scene { width: 98vw; height: 58vw; padding: 28px; margin: -28px; }
          .gl-env-img-wrap { inset: 28px; }
          .gl-seal-wrap { top: calc(28px + 50%); }
        }

        /* Admin link */
        .gl-admin-light {
          position: relative; z-index: 10;
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          color: rgba(80,60,30,0.38);
          letter-spacing: 3px;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.35s;
        }

        .gl-admin-light:hover { color: rgba(150,110,40,0.65); }

        /* ══════════════════════════════
           LOGIN CARD STAGE
        ══════════════════════════════ */
        .gl-card-wrap {
          position: relative; z-index: 10;
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          animation: cardReveal 1s cubic-bezier(.22,1,.36,1) forwards;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1.5rem;
        }

        @keyframes cardReveal {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .gl-card {
          background: rgba(12,10,8,0.93);
          border: 1px solid rgba(201,168,76,0.38);
          border-radius: 2px;
          padding: 3.5rem 3rem 3rem;
          width: 100%;
          max-width: 440px;
          text-align: center;
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.07),
            0 35px 80px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(201,168,76,0.14);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          position: relative;
        }

        .gl-card::before { content: ''; position: absolute; top: 14px; left: 14px; width: 26px; height: 26px; border-top: 1px solid rgba(201,168,76,0.55); border-left: 1px solid rgba(201,168,76,0.55); }
        .gl-card::after  { content: ''; position: absolute; bottom: 14px; right: 14px; width: 26px; height: 26px; border-bottom: 1px solid rgba(201,168,76,0.55); border-right: 1px solid rgba(201,168,76,0.55); }
        .gl-corner-tr { position: absolute; top: 14px; right: 14px; width: 26px; height: 26px; border-top: 1px solid rgba(201,168,76,0.55); border-right: 1px solid rgba(201,168,76,0.55); }
        .gl-corner-bl { position: absolute; bottom: 14px; left: 14px; width: 26px; height: 26px; border-bottom: 1px solid rgba(201,168,76,0.55); border-left: 1px solid rgba(201,168,76,0.55); }

        .gl-divider { display: flex; align-items: center; justify-content: center; gap: 14px; margin-bottom: 2rem; }
        .gl-divider-line { height: 1px; width: 55px; }
        .gl-ring { animation: ringFloat 4s ease-in-out infinite; display: inline-flex; }

        @keyframes ringFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-4px) rotate(5deg); }
        }

        .gl-title {
          font-family: 'Great Vibes', cursive;
          font-size: clamp(3rem, 8vw, 4.2rem);
          color: #C9A84C;
          margin-bottom: 0.3rem;
          line-height: 1.1;
          text-shadow: 0 0 50px rgba(201,168,76,0.45), 0 2px 4px rgba(0,0,0,0.5);
        }

        .gl-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          color: rgba(255,255,255,0.4);
          letter-spacing: 4.5px;
          text-transform: uppercase;
          margin-bottom: 2.8rem;
        }

        .gl-input-wrap { position: relative; margin-bottom: 1.4rem; }

        .gl-input-icon {
          position: absolute; left: 16px; top: 50%;
          transform: translateY(-50%);
          color: #C9A84C; font-size: 13px;
        }

        .gl-input {
          width: 100%;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 1px;
          padding: 15px 16px 15px 44px;
          color: #fff !important;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          outline: none;
          text-align: center;
          letter-spacing: 6px;
          -webkit-appearance: none;
          transition: border-color 0.3s, box-shadow 0.3s;
        }

        .gl-input::placeholder { letter-spacing: 2px; color: rgba(255,255,255,0.22); font-size: 0.88rem; }

        .gl-input:focus {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.05) !important;
          box-shadow: 0 0 24px rgba(201,168,76,0.14), inset 0 1px 0 rgba(201,168,76,0.1);
        }

        .gl-input:-webkit-autofill,
        .gl-input:-webkit-autofill:hover,
        .gl-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0d0b08 inset !important;
          -webkit-text-fill-color: #fff !important;
          caret-color: #fff;
          transition: background-color 99999s ease 0s;
        }

        .gl-btn {
          width: 100%;
          background: linear-gradient(135deg, #a87c28 0%, #C9A84C 45%, #e8c55a 100%);
          color: #1a1000;
          border: none;
          border-radius: 1px;
          padding: 15px;
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 6px;
          text-transform: uppercase;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: transform 0.25s, box-shadow 0.3s, opacity 0.3s;
          box-shadow: 0 4px 24px rgba(201,168,76,0.28);
        }

        .gl-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 0.55s ease;
        }

        .gl-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 10px 36px rgba(201,168,76,0.4); }
        .gl-btn:not(:disabled):hover::after { transform: translateX(120%); }
        .gl-btn:not(:disabled):active { transform: translateY(0); }
        .gl-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .gl-hint-divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.22), transparent); margin: 1.8rem 0 1.1rem; }
        .gl-hint { font-family: 'Cormorant Garamond', serif; color: rgba(255,255,255,0.25); font-size: 0.85rem; font-style: italic; }

        .gl-admin-dark {
          font-family: 'Cinzel', serif;
          font-size: 0.62rem;
          color: rgba(255,255,255,0.18);
          letter-spacing: 3px;
          text-decoration: none;
          text-transform: uppercase;
          transition: color 0.35s;
        }

        .gl-admin-dark:hover { color: rgba(201,168,76,0.5); }

        .gl-dots span { display: inline-block; animation: dotBounce 1.2s infinite; }
        .gl-dots span:nth-child(2) { animation-delay: 0.2s; }
        .gl-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-4px); }
        }

        /* ── Card mobile ── */
        @media (max-width: 520px) {
          .gl-card { padding: 2.5rem 1.5rem 2rem; }
        }
      `}</style>

      <div className="gl-root">
        <div className="gl-bg" />
        <div className="gl-silk" />

        {/* Falling petals */}
        {petals.map(p => (
          <div key={p.id} className="gl-petal" style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            '--op': p.opacity,
            '--drift': `${p.drift}px`,
          }}>
            <svg width={p.size} height={p.size * 1.4} viewBox="0 0 20 28" fill="none"
              style={{ transform: `rotate(${p.rotation}deg)` }}>
              <ellipse cx="10" cy="14" rx="8" ry="13" fill={`rgba(180,140,70,${p.opacity * 0.65})`} />
              <ellipse cx="10" cy="14" rx="4" ry="8"  fill={`rgba(220,180,90,${p.opacity * 0.35})`} />
            </svg>
          </div>
        ))}

        {/* ══ ENVELOPE STAGE ══ */}
        {stage !== 'login' && (
          <div className={`gl-env-stage ${stage === 'opening' ? 'is-opening' : ''}`}>
            <div className={`gl-env-scene ${stage === 'opening' ? 'opened' : ''}`}>

              {/* Real envelope image */}
              <div className="gl-env-img-wrap">
                <img src={envelopeImg} alt="Wedding invitation envelope" className="gl-env-img" />
              </div>

              {/* Wax seal — real image, centered on envelope */}
              <div className="gl-seal-wrap" onClick={handleOpen}>
                <img src={waxSeal} alt="Open your invitation" className="gl-seal-img" />
                <span className="gl-seal-hint">✦ Click to Open ✦</span>
              </div>

              {/* Floral — top left, overflows outside envelope */}
              <div className="gl-floral gl-floral-tl">
                <img src={floral1} alt="" />
              </div>

              {/* Floral — bottom right, overflows outside envelope */}
              <div className="gl-floral gl-floral-br">
                <img src={floral2} alt="" />
              </div>

            </div>

            <a href="/admin" className="gl-admin-light">Admin Access</a>
          </div>
        )}

        {/* ══ LOGIN CARD STAGE ══ */}
        {stage === 'login' && (
          <div className="gl-card-wrap">
            <div className="gl-card">
              <div className="gl-corner-tr" />
              <div className="gl-corner-bl" />

              <div className="gl-divider">
                <div className="gl-divider-line" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C)' }} />
                <span className="gl-ring"><GiRing size={26} color="#C9A84C" /></span>
                <div className="gl-divider-line" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
              </div>

              <h1 className="gl-title">You're Invited</h1>
              <p className="gl-subtitle">Please enter your guest code</p>

              <form onSubmit={handleSubmit}>
                <div className="gl-input-wrap">
                  <FaLock className="gl-input-icon" />
                  <input
                    className="gl-input"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Your unique guest code"
                    autoComplete="off"
                    autoFocus
                  />
                </div>
                <button type="submit" className="gl-btn" disabled={loading}>
                  {loading
                    ? <span className="gl-dots"><span>·</span><span>·</span><span>·</span></span>
                    : 'Enter'}
                </button>
              </form>

              <div className="gl-hint-divider" />
              <p className="gl-hint">Your code was included in your invitation</p>
            </div>

            <a href="/admin" className="gl-admin-dark">Admin Access</a>
          </div>
        )}
      </div>
    </>
  );
};

export default GuestLogin;