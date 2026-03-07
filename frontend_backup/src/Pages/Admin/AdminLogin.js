import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser, FaLock } from 'react-icons/fa';
import { GiRing } from 'react-icons/gi';
import { adminLogin } from '../../Helpers/API/AdminApi';
import { setAdminSession } from '../../Helpers/Utilities/Common';
import { validateAdminLogin } from '../../Helpers/Utilities/Validations';

const PARTICLE_COUNT = 22;
const randomBetween = (a, b) => a + Math.random() * (b - a);

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [particles, setParticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
    setParticles(
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: randomBetween(0, 100),
        top: randomBetween(0, 100),
        size: randomBetween(2, 5),
        delay: randomBetween(0, 8),
        duration: randomBetween(4, 9),
        opacity: randomBetween(0.15, 0.55),
        drift: randomBetween(-30, 30),
      }))
    );
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateAdminLogin(username, password);
    if (errors.length > 0) { toast.error(errors[0]); return; }
    setLoading(true);
    try {
      const res = await adminLogin(username, password);
      if (res.data) {
        setAdminSession(res.data);
        toast.success('Welcome back, Admin!');
        navigate('/admin/dashboard');
      } else {
        toast.error(res.messages?.error_messages?.[0] || 'Invalid credentials.');
      }
    } catch {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;500&display=swap');

        .al-root {
          min-height: 100vh;
          background: #0a0804;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          position: relative;
          overflow: hidden;
        }

        .al-bg-photo {
          position: absolute; inset: 0;
          background-image: url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=60');
          background-size: cover;
          background-position: center 30%;
          opacity: 0.22;
          animation: slowZoom 40s ease-in-out infinite alternate;
        }

        @keyframes slowZoom {
          from { transform: scale(1.0); }
          to   { transform: scale(1.08); }
        }

        .al-bg-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at center,
            rgba(0,0,0,0.18) 0%,
            rgba(0,0,0,0.42) 50%,
            rgba(0,0,0,0.82) 100%
          );
        }

        .al-bg-glow {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 55% at 50% 50%, rgba(201,168,76,0.1) 0%, transparent 65%),
            radial-gradient(ellipse 35% 25% at 15% 85%, rgba(201,168,76,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 35% 25% at 85% 15%, rgba(201,168,76,0.05) 0%, transparent 60%);
          animation: glowPulse 8s ease-in-out infinite;
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }

        .al-bg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridDrift 25s linear infinite;
        }

        @keyframes gridDrift {
          from { transform: translateY(0); }
          to   { transform: translateY(60px); }
        }

        .al-particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,215,0,0.9), rgba(201,168,76,0.6));
          pointer-events: none;
          animation: particleFloat ease-in-out infinite;
        }

        @keyframes particleFloat {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          15%  { opacity: var(--pop); }
          50%  { transform: translateY(-45px) translateX(var(--drift)); opacity: var(--pop); }
          85%  { opacity: calc(var(--pop) * 0.5); }
          100% { transform: translateY(-90px) translateX(calc(var(--drift) * 1.5)); opacity: 0; }
        }

        .al-top-label {
          position: relative; z-index: 10;
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          color: rgba(201,168,76,0.5);
          letter-spacing: 6px;
          text-transform: uppercase;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transition: opacity 1s 0.1s ease;
        }

        .al-top-label.visible { opacity: 1; }

        .al-top-label-line { height: 1px; width: 40px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.45)); }
        .al-top-label-line.right { background: linear-gradient(90deg, rgba(201,168,76,0.45), transparent); }

        /* Card — NO screen-edge borders, only card-level brackets */
        .al-card {
          position: relative; z-index: 10;
          background: rgba(10, 8, 4, 0.86);
          border: 1px solid rgba(201,168,76,0.35);
          border-radius: 2px;
          padding: 3.2rem 3rem 2.8rem;
          width: 100%; max-width: 430px;
          text-align: center;
          box-shadow:
            0 0 0 1px rgba(201,168,76,0.07),
            0 40px 90px rgba(0,0,0,0.75),
            0 0 60px rgba(201,168,76,0.07),
            inset 0 1px 0 rgba(201,168,76,0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          opacity: 0;
          transform: translateY(28px) scale(0.97);
          transition: opacity 1s cubic-bezier(.22,1,.36,1), transform 1s cubic-bezier(.22,1,.36,1);
        }

        .al-card.visible { opacity: 1; transform: translateY(0) scale(1); }

        /* Card corner brackets — ONLY inside the card */
        .al-card::before { content: ''; position: absolute; top: 14px; left: 14px; width: 26px; height: 26px; border-top: 1px solid rgba(201,168,76,0.5); border-left: 1px solid rgba(201,168,76,0.5); }
        .al-card::after  { content: ''; position: absolute; bottom: 14px; right: 14px; width: 26px; height: 26px; border-bottom: 1px solid rgba(201,168,76,0.5); border-right: 1px solid rgba(201,168,76,0.5); }
        .al-corner-tr { position: absolute; top: 14px; right: 14px; width: 26px; height: 26px; border-top: 1px solid rgba(201,168,76,0.5); border-right: 1px solid rgba(201,168,76,0.5); }
        .al-corner-bl { position: absolute; bottom: 14px; left: 14px; width: 26px; height: 26px; border-bottom: 1px solid rgba(201,168,76,0.5); border-left: 1px solid rgba(201,168,76,0.5); }

        .al-card-bottom-glow {
          position: absolute;
          bottom: -1px; left: 20%; right: 20%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.55), transparent);
          filter: blur(1px);
        }

        .al-header {
          display: flex; align-items: center; justify-content: center;
          gap: 14px; margin-bottom: 1.8rem;
        }

        .al-header-line { height: 1px; width: 50px; }
        .al-ring { animation: ringFloat 4s ease-in-out infinite; display: inline-flex; }

        @keyframes ringFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50%       { transform: translateY(-4px) rotate(6deg); }
        }

        .al-title {
          font-family: 'Cinzel', serif;
          font-size: 1.55rem;
          font-weight: 500;
          color: #fff;
          margin-bottom: 0.3rem;
          letter-spacing: 5px;
          text-transform: uppercase;
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.9s 0.25s ease, transform 0.9s 0.25s ease;
        }

        .al-card.visible .al-title { opacity: 1; transform: translateY(0); }

        .al-subtitle {
          font-family: 'Cinzel', serif;
          font-size: 0.56rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 5px;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
          opacity: 0;
          transition: opacity 0.9s 0.4s ease;
        }

        .al-card.visible .al-subtitle { opacity: 1; }

        .al-accent {
          display: flex; justify-content: center; align-items: center;
          gap: 8px; margin-bottom: 2.2rem;
          opacity: 0; transition: opacity 0.9s 0.5s ease;
        }

        .al-card.visible .al-accent { opacity: 1; }
        .al-accent-dot { width: 4px; height: 4px; background: #C9A84C; border-radius: 50%; opacity: 0.7; }
        .al-accent-line { height: 1px; width: 36px; background: linear-gradient(90deg, transparent, #C9A84C, transparent); }

        .al-input-wrap { position: relative; margin-bottom: 1.2rem; }

        .al-input-icon {
          position: absolute; left: 15px; top: 50%;
          transform: translateY(-50%);
          color: rgba(201,168,76,0.6); font-size: 12px;
          transition: color 0.3s; pointer-events: none;
        }

        .al-input-wrap:focus-within .al-input-icon { color: #C9A84C; }

        .al-input {
          width: 100%;
          background: rgba(255,255,255,0.05) !important;
          border: 1px solid rgba(201,168,76,0.25);
          border-radius: 1px;
          padding: 13px 16px 13px 42px;
          color: #fff !important;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          transition: border-color 0.3s, box-shadow 0.3s, background 0.3s;
        }

        .al-input::placeholder { color: rgba(255,255,255,0.25); font-style: italic; }

        .al-input:focus {
          border-color: #C9A84C;
          background: rgba(201,168,76,0.06) !important;
          box-shadow: 0 0 22px rgba(201,168,76,0.13), inset 0 1px 0 rgba(201,168,76,0.1);
        }

        /* Autofill dark fix */
        .al-input:-webkit-autofill,
        .al-input:-webkit-autofill:hover,
        .al-input:-webkit-autofill:focus {
          -webkit-box-shadow: 0 0 0 1000px #0d0b08 inset !important;
          -webkit-text-fill-color: #fff !important;
          caret-color: #fff;
          border-color: rgba(201,168,76,0.25) !important;
          transition: background-color 99999s ease 0s;
        }

        .al-form-gap { margin-bottom: 2rem; }

        .al-btn {
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

        .al-btn::after {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%);
          transform: translateX(-120%);
          transition: transform 0.55s ease;
        }

        .al-btn:not(:disabled):hover { transform: translateY(-2px); box-shadow: 0 10px 34px rgba(201,168,76,0.4); }
        .al-btn:not(:disabled):hover::after { transform: translateX(120%); }
        .al-btn:not(:disabled):active { transform: translateY(0); }
        .al-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .al-back-wrap { margin-top: 1.8rem; }

        .al-back-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent);
          margin-bottom: 1.2rem;
        }

        .al-back {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          color: rgba(255,255,255,0.2);
          text-decoration: none;
          letter-spacing: 3px;
          text-transform: uppercase;
          transition: color 0.3s;
          display: inline-flex; align-items: center; gap: 8px;
        }

        .al-back:hover { color: rgba(201,168,76,0.5); }

        .al-dots span { display: inline-block; animation: dotBounce 1.2s infinite; }
        .al-dots span:nth-child(2) { animation-delay: 0.2s; }
        .al-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-4px); }
        }
      `}</style>

      <div className="al-root">
        <div className="al-bg-photo" />
        <div className="al-bg-vignette" />
        <div className="al-bg-grid" />
        <div className="al-bg-glow" />

        {particles.map(p => (
          <div
            key={p.id}
            className="al-particle"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              '--pop': p.opacity,
              '--drift': `${p.drift}px`,
            }}
          />
        ))}

        <div className={`al-top-label ${visible ? 'visible' : ''}`}>
          <div className="al-top-label-line" />
          Restricted Access
          <div className="al-top-label-line right" />
        </div>

        <div className={`al-card ${visible ? 'visible' : ''}`}>
          <div className="al-corner-tr" />
          <div className="al-corner-bl" />
          <div className="al-card-bottom-glow" />

          <div className="al-header">
            <div className="al-header-line" style={{ background: 'linear-gradient(90deg, transparent, #C9A84C)' }} />
            <span className="al-ring"><GiRing size={24} color="#C9A84C" /></span>
            <div className="al-header-line" style={{ background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
          </div>

          <h1 className="al-title">Admin Portal</h1>
          <p className="al-subtitle">Wedding Management System</p>

          <div className="al-accent">
            <div className="al-accent-line" />
            <div className="al-accent-dot" />
            <div className="al-accent-line" />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="al-input-wrap">
              <FaUser className="al-input-icon" />
              <input
                className="al-input"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
              />
            </div>

            <div className="al-input-wrap al-form-gap">
              <FaLock className="al-input-icon" />
              <input
                className="al-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="al-btn" disabled={loading}>
              {loading
                ? <span className="al-dots"><span>·</span><span>·</span><span>·</span></span>
                : 'Sign In'}
            </button>
          </form>

          <div className="al-back-wrap">
            <div className="al-back-divider" />
            <a href="/" className="al-back">← Back to Guest Portal</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;