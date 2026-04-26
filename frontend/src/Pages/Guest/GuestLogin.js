import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GiRing } from 'react-icons/gi';
import { FaLock, FaVolumeUp, FaVolumeMute, FaEye, FaEyeSlash } from 'react-icons/fa';
import { guestLogin } from '../../Helpers/API/GuestApi';
import { setGuestSession } from '../../Helpers/Utilities/Common';
import { validatePassword } from '../../Helpers/Utilities/Validations';
import waxSeal from '../../Assets/Images/stamp.png';
import flowerBorder2 from '../../Assets/Images/flower border 2.png';
import flowerBorder1 from '../../Assets/Images/flower border1.png';
import weddingMusic from '../../Assets/audio/wedding-music.mp3';

const rnd = (a, b) => a + Math.random() * (b - a);

const PETAL_TYPES = [
  (sz, op, hue) => (
    <svg width={sz} height={sz * 1.7} viewBox="0 0 20 34" fill="none">
      <ellipse cx="10" cy="18" rx="7.5" ry="14" fill={`hsla(${hue},65%,72%,${op * 0.75})`} />
      <ellipse cx="10" cy="16" rx="3.5" ry="7"  fill={`hsla(${hue},55%,88%,${op * 0.4})`} />
      <path d="M10 4 Q13 14 10 32 Q7 14 10 4Z" fill={`hsla(${hue},45%,92%,${op * 0.15})`} />
    </svg>
  ),
  (sz, op, hue) => (
    <svg width={sz} height={sz * 1.2} viewBox="0 0 24 28" fill="none">
      <ellipse cx="12" cy="14" rx="10" ry="12" fill={`hsla(${hue},60%,75%,${op * 0.7})`} />
      <ellipse cx="12" cy="12" rx="5"  ry="6"  fill={`hsla(${hue},50%,90%,${op * 0.35})`} />
    </svg>
  ),
  (sz, op, hue) => (
    <svg width={sz * 0.55} height={sz * 2.0} viewBox="0 0 11 40" fill="none">
      <ellipse cx="5.5" cy="22" rx="4.5" ry="16" fill={`hsla(${hue},58%,70%,${op * 0.72})`} />
      <ellipse cx="5.5" cy="20" rx="2"   ry="8"  fill={`hsla(${hue},48%,88%,${op * 0.3})`} />
    </svg>
  ),
  (sz, op, hue) => (
    <svg width={sz * 1.5} height={sz * 0.9} viewBox="0 0 30 18" fill="none">
      <ellipse cx="15" cy="9" rx="14" ry="8" fill={`hsla(${hue},62%,68%,${op * 0.65})`} />
      <ellipse cx="15" cy="8" rx="7"  ry="4" fill={`hsla(${hue},52%,85%,${op * 0.3})`} />
    </svg>
  ),
  (sz, op, hue) => (
    <svg width={sz * 0.8} height={sz * 0.8} viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="5"  rx="4"   ry="4.5" fill={`hsla(${hue},60%,74%,${op * 0.68})`} />
      <ellipse cx="10" cy="15" rx="4"   ry="4.5" fill={`hsla(${hue},60%,74%,${op * 0.68})`} />
      <ellipse cx="5"  cy="10" rx="4.5" ry="4"   fill={`hsla(${hue},60%,74%,${op * 0.68})`} />
      <ellipse cx="15" cy="10" rx="4.5" ry="4"   fill={`hsla(${hue},60%,74%,${op * 0.68})`} />
      <circle  cx="10" cy="10" r="3"              fill={`hsla(55,75%,82%,${op * 0.8})`} />
    </svg>
  ),
  (sz, op, hue) => (
    <svg width={sz * 1.1} height={sz * 1.4} viewBox="0 0 22 28" fill="none">
      <path d="M11 2 C18 6 20 14 18 22 C16 28 6 28 4 22 C2 14 4 6 11 2Z"
        fill={`hsla(${hue},63%,73%,${op * 0.72})`} />
      <path d="M11 5 C15 9 16 16 14 22 C12 26 10 24 11 5Z"
        fill={`hsla(${hue},50%,88%,${op * 0.28})`} />
    </svg>
  ),
];

const PETAL_HUES  = [340, 350, 355, 15, 25, 330, 345, 10, 38, 320, 5, 360, 20, 335];
const PETAL_COUNT = 70;
const makePetals = () =>
  Array.from({ length: PETAL_COUNT }, (_, i) => ({
    id: i, type: Math.floor(rnd(0, PETAL_TYPES.length)),
    hue: PETAL_HUES[Math.floor(rnd(0, PETAL_HUES.length))],
    left: rnd(-4, 104), delay: rnd(0, 22), dur: rnd(8, 20),
    size: rnd(8, 22), rot: rnd(0, 360), op: rnd(0.45, 0.95),
    drift: rnd(-120, 120), spin: rnd(200, 520) * (Math.random() > 0.5 ? 1 : -1),
    wobbleA: rnd(15, 45), wobbleB: rnd(-30, 30),
  }));

export default function GuestLogin() {
  const [password,     setPassword]     = useState('');
  const [loading,      setLoading]      = useState(false);
  const [errorMsg,     setErrorMsg]     = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isMobile,     setIsMobile]     = useState(window.innerWidth <= 768);
  // phase: 'envelope' | 'transitioning' | 'open'
  const [phase,        setPhase]        = useState('envelope');
  const [petals]                        = useState(makePetals);
  const [muted,        setMuted]        = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const audio = new Audio();
    audio.src = weddingMusic; audio.loop = true; audio.volume = 0; audio.preload = 'auto';
    audioRef.current = audio;
    return () => { if (audioRef.current) { audio.pause(); audio.src = ''; } };
  }, []);

useEffect(() => {
  const handleResize = () => setIsMobile(window.innerWidth <= 768);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  const startMusic = () => {
    if (musicStarted) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.play().then(() => {
      setMusicStarted(true);
      let vol = 0;
      const fi = setInterval(() => {
        vol = Math.min(parseFloat((vol + 0.02).toFixed(2)), 0.55);
        audio.volume = vol;
        if (vol >= 0.55) clearInterval(fi);
      }, 40);
    }).catch(e => console.warn('Music blocked:', e));
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted) { audio.volume = 0.55; setMuted(false); }
    else        { audio.volume = 0;    setMuted(true);  }
  };

  /* Seal click: envelope fades/scales out → open state fades in */
  const handleOpen = () => {
    if (phase !== 'envelope') return;
    setPhase('transitioning');
    setTimeout(() => {
      setPhase('open');
      setTimeout(() => inputRef.current?.focus(), 500);
    }, 700);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
   
   const errors = validatePassword(password);
    if (errors.length > 0) { setErrorMsg(errors[0]); return; }
    setLoading(true);
    try {
      const res = await guestLogin(password);
     if (res.data) {
  setGuestSession(res.data);
  startMusic();
  setTimeout(() => {
    audioRef.current = null;
    navigate('/rsvp');
  }, 1500);
      } else {
        setErrorMsg(res.messages?.error_messages?.[0] || 'Oops! Wrong password, try again.');
      }
    } catch { setErrorMsg('Oops! Wrong password, try again.'); }
    finally  { setLoading(false); }
  };

  const isEnvelope   = phase === 'envelope';
  const isTransition = phase === 'transitioning';
  const isOpen       = phase === 'open';

  return (
    <>
      <style>{CSS}</style>
      <div className="gl-root">
        <div className="gl-bg"/>
        <div className="gl-vignette"/>
        <div className="gl-grain"/>
        <div className="gl-rays">
          {[0,1,2,3,4,5].map(i => <div key={i} className="gl-ray" style={{'--i':i}}/>)}
        </div>
        <div className="gl-particles" aria-hidden="true">
          {Array.from({length:20},(_,i)=>(
            <div key={i} className="gl-particle" style={{
              left:`${rnd(5,95)}%`, top:`${rnd(5,90)}%`,
              '--pd':`${rnd(0,9)}s`,'--ps':`${rnd(2.5,7)}s`,'--sz':`${rnd(1.5,4.5)}px`,
            }}/>
          ))}
        </div>

        {petals.map(p => (
          <div key={p.id} className="gl-petal" style={{
            left:`${p.left}%`, animationDelay:`${p.delay}s`, animationDuration:`${p.dur}s`,
            '--drift':`${p.drift}px`,'--spin':`${p.spin}deg`,
            '--wobbleA':`${p.wobbleA}px`,'--wobbleB':`${p.wobbleB}px`,'--initRot':`${p.rot}deg`,
          }}>
            {PETAL_TYPES[p.type](p.size, p.op, p.hue)}
          </div>
        ))}

        {musicStarted && (
          <button className="gl-mute-btn" onClick={toggleMute} aria-label={muted?'Unmute':'Mute'}>
            {muted ? <FaVolumeMute size={15}/> : <FaVolumeUp size={15}/>}
            <span>{muted ? 'Unmute' : 'Music'}</span>
          </button>
        )}

        <div className="gl-scene">

          {/* ══ CLOSED ENVELOPE ══ */}
          {(isEnvelope || isTransition) && (
            <div className={`gl-closed-env${isTransition ? ' fade-out' : ''}`}>
              <div className="gl-env-wrap">
                <div className="gl-pocket">
                  <div className="pocket-paper"/>
                  <div className="pocket-depth"/>
                </div>
                <div className="gl-body-mask">
                  <svg viewBox="0 0 800 500" preserveAspectRatio="none"
                    style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
                    <defs>
                      <filter id="gG"><feGaussianBlur stdDeviation="5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <polygon points="0,0 0,500 400,260"    fill="#0d0800"/>
                    <polygon points="800,0 800,500 400,260" fill="#0d0800"/>
                    <polygon points="0,500 800,500 400,260" fill="#0d0800"/>
                    <line x1="0"   y1="500" x2="400" y2="260" stroke="rgba(195,155,60,0.7)" strokeWidth="2" filter="url(#gG)"/>
                    <line x1="800" y1="500" x2="400" y2="260" stroke="rgba(195,155,60,0.7)" strokeWidth="2" filter="url(#gG)"/>
                    <polygon points="400,250 411,261 400,272 389,261"
                      fill="rgba(195,155,60,0.11)" stroke="rgba(195,155,60,0.28)" strokeWidth="0.8"/>
                  </svg>
                </div>
                <div className="gl-flap-layer">
                  <div className="gl-flap">
                    <svg viewBox="0 0 800 460" preserveAspectRatio="none"
                      style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
                      <defs>
                        <linearGradient id="flapFill" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%"  stopColor="#1e1508"/>
                          <stop offset="42%" stopColor="#2a1d0c"/>
                          <stop offset="100%" stopColor="#160f04"/>
                        </linearGradient>
                        <filter id="fG"><feGaussianBlur stdDeviation="5.5" result="b"/>
                          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                        </filter>
                      </defs>
                      <polygon points="0,0 800,0 400,240" fill="url(#flapFill)"/>
                      <line x1="0"   y1="0"   x2="400" y2="240" stroke="rgba(195,155,60,0.75)" strokeWidth="2.8" filter="url(#fG)"/>
                      <line x1="800" y1="0"   x2="400" y2="240" stroke="rgba(195,155,60,0.75)" strokeWidth="2.8" filter="url(#fG)"/>
                      <line x1="0"   y1="1"   x2="800" y2="1"   stroke="rgba(255,230,120,0.22)" strokeWidth="2"/>
                    </svg>
                  </div>
                  <svg className="env-border-svg" viewBox="0 0 800 500" preserveAspectRatio="none">
                    <defs>
                      <filter id="bG"><feGaussianBlur stdDeviation="2.5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <rect x="1.5" y="1.5" width="797" height="497" fill="none"
                      stroke="rgba(195,155,60,0.65)" strokeWidth="2" filter="url(#bG)"/>
                    <rect x="4" y="4" width="792" height="492" fill="none"
                      stroke="rgba(195,155,60,0.18)" strokeWidth="0.7"/>
                    {[[8,8],[792,8],[8,492],[792,492]].map(([x,y],i)=>(
                      <rect key={i} x={x-3} y={y-3} width="6" height="6" fill="none"
                        stroke="rgba(195,155,60,0.45)" strokeWidth="0.8"/>
                    ))}
                  </svg>
                  </div>
                <div className="env-ground-shadow"/>
              </div>
              <img src={flowerBorder2} alt="" className="env-flower env-flower-bl" draggable={false}/>
              <img src={flowerBorder1} alt="" className="env-flower env-flower-tr" draggable={false}/>
            </div>
          )}
           {/* Paste seal here */}
   {(isEnvelope || isTransition) && (
  <div className={`gl-seal-overlay${isTransition ? ' fade-out' : ''}`} onClick={handleOpen} role="button" aria-label="Open invitation">
    <div className="seal-glow-ring"/>
    <div className="seal-glow-ring-2"/>
    <img src={waxSeal} alt="Wax seal" className="seal-img"/>
    <span className="seal-hint">✦ Click to Open ✦</span>
  </div>
)}

          {/* ══ OPEN STATE: card above open envelope ══ */}
          {isOpen && (
            <div className="gl-open-wrap">

              {/* Card fades in above envelope */}
              <div className="gl-card-zone">
                <div className="gl-card">
                  <div className="card-shimmer"/>
                  <div className="gl-c tl"/><div className="gl-c tr"/>
                  <div className="gl-c bl"/><div className="gl-c br"/>
                  <div className="card-inner-border"/>
                  <div className="card-inner-border-2"/>
                  <div className="card-body show">
                    <div className="c-mono-wrap">
                      <div className="c-mono-line"/>
                      <span className="c-mono"><GiRing size={22} color="#B8963E"/></span>
                      <div className="c-mono-line r"/>
                    </div>
                    <p className="c-eyebrow">Together With Their Families</p>
                    <h1 className="c-names">You're Invited</h1>
                    <div className="c-flourish">
                      <span className="c-flourish-line"/>
                      <span className="c-flourish-diamond">◆</span>
                      <span className="c-flourish-line"/>
                    </div>
                    <p className="c-sub">Please enter your guest code</p>
                   <div className="c-input-wrap">

  <input
    ref={inputRef}
    className="c-input"
    type={showPassword ? 'text' : 'password'}
    value={password}
    onChange={e=>setPassword(e.target.value)}
    onKeyDown={e=>e.key==='Enter'&&handleSubmit(e)}
    placeholder="Your unique guest code"
    autoComplete="off"
  />
  <span
    className="c-eye"
    onClick={() => setShowPassword(!showPassword)}
    style={{ color: '#3d2408', opacity: 1 }}
  >
    {showPassword ? <FaEye size={14}/> : <FaEyeSlash size={14}/>}
  </span>
</div>
                    <button className="c-btn" disabled={loading} onClick={e=>{
                      const btn=e.currentTarget, rect=btn.getBoundingClientRect();
                      const sz=Math.max(rect.width,rect.height);
                      const r=document.createElement('span');
                      r.className='c-ripple';
                      r.style.cssText=`width:${sz}px;height:${sz}px;left:${e.clientX-rect.left-sz/2}px;top:${e.clientY-rect.top-sz/2}px`;
                      btn.appendChild(r); r.addEventListener('animationend',()=>r.remove());
                      handleSubmit(e);
                    }}>
                      {loading?<span className="c-dots"><span/><span/><span/></span>:<span>Enter ✦</span>}
                    </button>
                    {errorMsg && (
  <p className="c-error">{errorMsg}</p>
)}
<p className="c-hint">Your code was enclosed with your invitation</p>
                  </div>
                </div>
              </div>

              {/* Open envelope body — card overlaps into the top of this */}
              <div className="gl-open-env">
                <div className="open-pocket">
                  <div className="pocket-paper"/>
                  <div className="pocket-depth"/>
                </div>
                {/* Open flap (folded back, rotateX -186deg) */}
                <div className="open-flap-wrap">
                  <svg viewBox="0 0 800 460" preserveAspectRatio="none"
                    style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
                    <defs>
                      <linearGradient id="flapFillO" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%"  stopColor="#1e1508"/>
                        <stop offset="42%" stopColor="#2a1d0c"/>
                        <stop offset="100%" stopColor="#160f04"/>
                      </linearGradient>
                      <filter id="fGO"><feGaussianBlur stdDeviation="5.5" result="b"/>
                        <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                      </filter>
                    </defs>
                    <polygon points="0,0 800,0 400,240" fill="url(#flapFillO)"/>
                    <line x1="0"   y1="0"   x2="400" y2="240" stroke="rgba(195,155,60,0.75)" strokeWidth="2.8" filter="url(#fGO)"/>
                    <line x1="800" y1="0"   x2="400" y2="240" stroke="rgba(195,155,60,0.75)" strokeWidth="2.8" filter="url(#fGO)"/>
                  </svg>
                </div>
                {/* body mask triangles */}
                <div className="open-body-mask">
                  <svg viewBox="0 0 800 500" preserveAspectRatio="none"
                    style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
                    <polygon points="0,0 0,500 400,260"    fill="#0d0800"/>
                    <polygon points="800,0 800,500 400,260" fill="#0d0800"/>
                    <polygon points="0,500 800,500 400,260" fill="#0d0800"/>
                    <line x1="0"   y1="500" x2="400" y2="260" stroke="rgba(195,155,60,0.7)" strokeWidth="2"/>
                    <line x1="800" y1="500" x2="400" y2="260" stroke="rgba(195,155,60,0.7)" strokeWidth="2"/>
                  </svg>
                </div>
                <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}} viewBox="0 0 800 500" preserveAspectRatio="none">
                  <rect x="1.5" y="1.5" width="797" height="497" fill="none" stroke="rgba(195,155,60,0.65)" strokeWidth="2"/>
                  <rect x="4" y="4" width="792" height="492" fill="none" stroke="rgba(195,155,60,0.18)" strokeWidth="0.7"/>
                </svg>
                <div className="env-ground-shadow"/>
              </div>

              <img src={flowerBorder2} alt="" className="env-flower open-flower-bl" draggable={false}/>
              <img src={flowerBorder1} alt="" className="env-flower open-flower-tr" draggable={false}/>
            </div>
          )}

        </div>
      </div>
    </>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Cinzel:wght@400;500&family=Great+Vibes&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --gold:#C9A84C;--gold-light:#E8C86A;--gold-dark:#9A6E1E;
  --env-w:min(640px,90vw);
  --env-h:min(400px,50vw);
  --card-w:min(330px,68vw);
  --ease-silk:cubic-bezier(0.22,1.0,0.36,1);
}
html,body{height:100%;overflow:hidden;}
.gl-root{height:100vh;height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;position:relative;overflow:hidden;background:#ede6d8;}
.gl-bg{position:absolute;inset:0;background:radial-gradient(ellipse 75% 65% at 18% 22%,rgba(255,225,170,0.55) 0%,transparent 52%),radial-gradient(ellipse 60% 55% at 85% 78%,rgba(240,210,155,0.48) 0%,transparent 52%),linear-gradient(148deg,#fdf8ee 0%,#f2e8d4 32%,#f8eedd 58%,#ede2ca 100%);animation:bgBreathe 14s ease-in-out infinite;}
@keyframes bgBreathe{0%,100%{filter:brightness(1)}50%{filter:brightness(1.04)}}
.gl-vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 90% 90% at 50% 50%,transparent 50%,rgba(25,14,4,0.35) 100%);}
.gl-grain{position:absolute;inset:0;opacity:0.028;pointer-events:none;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");background-size:220px;}
.gl-rays{position:absolute;inset:0;pointer-events:none;overflow:hidden;}
.gl-ray{position:absolute;top:-10%;left:calc(8% + var(--i)*16%);width:1px;height:150%;background:linear-gradient(to bottom,transparent,rgba(255,235,160,0.10),transparent);transform:rotate(calc(-12deg + var(--i)*5deg));animation:rayDrift 20s ease-in-out infinite;animation-delay:calc(var(--i)*3.2s);}
@keyframes rayDrift{0%,100%{opacity:0.35}50%{opacity:0.9}}
.gl-particles{position:absolute;inset:0;pointer-events:none;}
.gl-particle{position:absolute;width:var(--sz);height:var(--sz);border-radius:50%;background:radial-gradient(circle,rgba(255,230,100,0.9) 0%,transparent 100%);animation:particleTwinkle var(--ps) ease-in-out infinite var(--pd);}
@keyframes particleTwinkle{0%,100%{opacity:0}30%{opacity:0.8}60%{opacity:0.4}}
.gl-petal{position:absolute;top:-60px;pointer-events:none;z-index:8;will-change:transform;animation:petalFall linear infinite;}
@keyframes petalFall{
  0%{transform:translateY(0) translateX(0) rotate(var(--initRot,0deg));opacity:0;}
  4%{opacity:1;}
  40%{transform:translateY(38vh) translateX(calc(var(--drift)*0.4 + var(--wobbleB))) rotate(calc(var(--initRot,0deg) + var(--spin)*0.40));opacity:0.85;}
  80%{transform:translateY(80vh) translateX(calc(var(--drift)*0.9)) rotate(calc(var(--initRot,0deg) + var(--spin)*0.82));opacity:0.35;}
  100%{transform:translateY(108vh) translateX(var(--drift)) rotate(calc(var(--initRot,0deg) + var(--spin)));opacity:0;}
}

.gl-scene{position:relative;z-index:10;display:flex;flex-direction:column;align-items:center;animation:sceneReveal 2s cubic-bezier(0.16,1,0.3,1) 0.3s both;}
@keyframes sceneReveal{from{opacity:0;transform:translateY(-45px) scale(0.93);}to{opacity:1;transform:translateY(0) scale(1);}}

/* ── CLOSED ENVELOPE ── */
.gl-closed-env{
  display:flex;flex-direction:column;align-items:center;position:relative;
  transition:opacity 0.65s ease, transform 0.65s cubic-bezier(0.4,0,0.2,1);
  opacity:1;transform:scale(1);
}
.gl-seal-overlay.fade-out{
  opacity:0;
  transform:translate(-50%,-50%) scale(0.88);
  pointer-events:none;
}

.gl-env-wrap{
  position:relative;width:var(--env-w);height:var(--env-h);
  perspective:2200px;perspective-origin:50% 32%;
  transform:rotateX(6deg);isolation:isolate;
}
.gl-pocket,.gl-body-mask,.gl-flap-layer{position:absolute;bottom:0;left:0;right:0;height:var(--env-h);}
.gl-pocket{z-index:2;overflow:hidden;border-radius:1px;box-shadow:0 28px 52px rgba(0,0,0,0.40),0 10px 22px rgba(0,0,0,0.24);}
.pocket-paper{position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='t'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23t)' opacity='.065'/%3E%3C/svg%3E"),linear-gradient(170deg,#251a09 0%,#190f03 50%,#0d0800 100%);}
.pocket-depth{position:absolute;inset:0;pointer-events:none;background:linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.18) 42%,transparent 72%);}
.gl-body-mask{z-index:22;pointer-events:none;}
.gl-flap-layer{pointer-events:none;z-index:15;}
.gl-flap-layer .gl-seal{pointer-events:auto;}
.gl-flap{position:absolute;inset:0;width:100%;height:100%;}
.env-border-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;}
.env-ground-shadow{position:absolute;bottom:-20px;left:8%;right:8%;height:32px;background:radial-gradient(ellipse,rgba(0,0,0,0.30) 0%,transparent 72%);border-radius:50%;filter:blur(10px);}

.env-flower{position:absolute;pointer-events:none;z-index:25;width:clamp(200px,32vw,420px);height:auto;user-select:none;filter:drop-shadow(0 4px 14px rgba(0,0,0,0.24));}
.env-flower-bl{bottom:-120px;left:-120px;}
.env-flower-tr{top:0;right:-100px;transform: translateY(-100px);}

.open-flower-tr{
  top: -20px;
  right: -80px;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 40%
  ),
  linear-gradient(
    to right,
    transparent 0%,
    black 0%
  );
  -webkit-mask-composite: intersect;
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 0%
  ),
  linear-gradient(
    to right,
    transparent 44%,
    black 0%
  );
  mask-composite: intersect;
}
.open-flower-bl{bottom: -100px;left: -120px;}

.gl-seal-overlay{
  position:absolute;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%);
  z-index:30;
  display:flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
  cursor:pointer;
  transition:opacity 0.65s ease, transform 0.65s cubic-bezier(0.4,0,0.2,1);
}
.seal-glow-ring{
  position:absolute;
  top:-30px;
  left:50%;
  transform:translateX(-50%);
  width:clamp(150px,24vw,200px);
  height:clamp(150px,24vw,200px);
  border-radius:50%;
  background:radial-gradient(circle,rgba(201,168,76,0.40) 0%,transparent 78%);
  animation:sealGlowPulse 2.8s ease-in-out infinite;
  pointer-events:none;
}

.seal-glow-ring-2{
  position:absolute;
  top:-80px;
  left:-55%;
  transform:translateX(-50%);
  width:clamp(200px,30vw,320px);
  height:clamp(200px,30vw,320px);
  border-radius:50%;
  background:radial-gradient(circle,transparent 40%,rgba(201,168,76,0.06) 65%,transparent 80%);
  animation:sealGlowPulse 2.8s ease-in-out infinite 1.4s;
  pointer-events:none;
}
@keyframes sealGlowPulse{0%,100%{transform:scale(1);opacity:0.7}50%{transform:scale(1.14);opacity:1}}
.seal-img{width:clamp(-90px,18vw,100px);height:clamp(-90px,18vw,100px);object-fit:contain;position:relative;z-index:1;animation:sealBob 4s ease-in-out infinite;filter:drop-shadow(0 8px 30px rgba(195,155,60,0.85)) drop-shadow(0 3px 10px rgba(0,0,0,0.58));transition:transform 0.22s cubic-bezier(0.34,1.52,0.64,1),filter 0.28s ease;}
.gl-seal-overlay:hover .seal-img { ... }
.gl-seal-overlay:active .seal-img { ... }
@keyframes sealBob{0%,100%{transform:translateY(0) rotate(-1.5deg)}50%{transform:translateY(-10px) rotate(1.5deg)}}
.seal-hint{font-family:'Cinzel',serif;font-size:clamp(0.4rem,0.88vw,0.55rem);color:rgba(255,255,255,0.84);letter-spacing:3.5px;text-transform:uppercase;white-space:nowrap;animation:hintPulse 3s ease-in-out infinite;text-shadow:0 1px 8px rgba(0,0,0,0.65);}
@keyframes hintPulse{0%,100%{opacity:0.28}50%{opacity:1}}

/* ══════════════════════════════════════════════════════
   OPEN STATE
   Structure (top → bottom):
   1. gl-card-zone  — the card, floats above, margin-bottom negative to overlap envelope
   2. gl-open-env   — open envelope body, card overlaps its top ~40%
   Flowers positioned relative to gl-open-wrap
══════════════════════════════════════════════════════ */
.gl-open-wrap{
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
}

/* Card zone: card appears here, bottom overlaps into envelope */
.gl-card-zone{
  position:relative;
  z-index:20;
  /* push card bottom down so it visually sits inside the envelope top */
    margin-bottom: -350px;
  animation:cardAppear 0.85s cubic-bezier(0.16,1,0.3,1) both;
}
@keyframes cardAppear{
  from{opacity:0;transform:translateY(24px) scale(0.95);}
  to{opacity:1;transform:translateY(0) scale(1);}
}

/* Open envelope */
.gl-open-env{
  position:relative;
  width:var(--env-w);
  height:var(--env-h);
  flex-shrink:0;
  isolation:isolate;
  perspective:2200px;
  perspective-origin:50% 32%;
  transform:rotateX(6deg);
  animation:envAppear 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s both;
}
@keyframes envAppear{from{opacity:0;transform:rotateX(6deg) translateY(16px);}to{opacity:1;transform:rotateX(6deg) translateY(0);}}

.open-pocket{position:absolute;inset:0;z-index:2;overflow:hidden;border-radius:1px;box-shadow:0 28px 52px rgba(255, 255, 255, 0.4),0 10px 22px rgba(0,0,0,0.24);}
.open-flap-wrap{
  position:absolute;inset:0;z-index:15;
  transform-origin:center top;
  transform:perspective(1800px) rotateX(-186deg) rotateY(-0.4deg);
}
.open-body-mask{position:absolute;inset:0;z-index:22;pointer-events:none;}

/* ── Card ── */
.gl-card{
  width:var(--card-w);text-align:center;position:relative;overflow:hidden;border-radius:2px;
  background:
    url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cp'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cp)' opacity='.028'/%3E%3C/svg%3E"),
    linear-gradient(162deg,#fefbf4 0%,#f9f3e5 45%,#f4ecda 100%);
  border:1px solid rgba(195,155,60,0.40);
  border-top:1px solid rgba(255,252,234,0.98);
  border-bottom:1.5px solid rgba(165,122,38,0.46);
  padding:2.6rem 2.2rem 2rem;
  box-shadow:0 0 0 1px rgba(195,155,60,0.07),inset 0 1px 0 rgba(255,255,255,0.98),0 4px 16px rgba(145,108,32,0.10),0 20px 52px rgba(0,0,0,0.30),0 48px 92px rgba(0,0,0,0.20);
  animation:cardFloat 7s ease-in-out infinite 1.5s;
}
@keyframes cardFloat{
  0%  {transform:translateY(0)    rotate(0deg)    scale(1);}
  35% {transform:translateY(-6px) rotate(0.12deg) scale(1.002);}
  65% {transform:translateY(-10px)rotate(-0.10deg)scale(1.003);}
  100%{transform:translateY(0)    rotate(0deg)    scale(1);}
}
.card-shimmer{position:absolute;top:0;left:-100%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,250,215,0.30),transparent);animation:shimmerTravel 9s ease-in-out infinite 2.5s;pointer-events:none;}
@keyframes shimmerTravel{0%{left:-60%}100%{left:170%}}
.card-inner-border{position:absolute;inset:14px;border:0.7px solid rgba(185,145,50,0.26);border-radius:1px;pointer-events:none;}
.card-inner-border-2{position:absolute;inset:18px;border:0.4px solid rgba(185,145,50,0.12);border-radius:1px;pointer-events:none;}
.gl-c{position:absolute;width:18px;height:18px;}
.gl-c.tl{top:9px;left:9px;border-top:1.2px solid rgba(165,125,38,0.55);border-left:1.2px solid rgba(165,125,38,0.55);}
.gl-c.tr{top:9px;right:9px;border-top:1.2px solid rgba(165,125,38,0.55);border-right:1.2px solid rgba(165,125,38,0.55);}
.gl-c.bl{bottom:9px;left:9px;border-bottom:1.2px solid rgba(165,125,38,0.55);border-left:1.2px solid rgba(165,125,38,0.55);}
.gl-c.br{bottom:9px;right:9px;border-bottom:1.2px solid rgba(165,125,38,0.55);border-right:1.2px solid rgba(165,125,38,0.55);}

.card-body{position:relative;z-index:1;}
.card-body>*{opacity:0;transform:translateY(10px);}
.card-body.show>*{animation:itemReveal 0.55s cubic-bezier(0.16,1,0.3,1) forwards;}
.card-body.show>*:nth-child(1){animation-delay:0.12s}
.card-body.show>*:nth-child(2){animation-delay:0.24s}
.card-body.show>*:nth-child(3){animation-delay:0.36s}
.card-body.show>*:nth-child(4){animation-delay:0.48s}
.card-body.show>*:nth-child(5){animation-delay:0.60s}
.card-body.show>*:nth-child(6){animation-delay:0.72s}
.card-body.show>*:nth-child(7){animation-delay:0.84s}
.card-body.show>*:nth-child(8){animation-delay:0.96s}
@keyframes itemReveal{to{opacity:1;transform:translateY(0);}}

.c-mono-wrap{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:1.3rem;}
.c-mono-line{height:0.6px;flex:1;max-width:44px;background:linear-gradient(90deg,transparent,rgba(175,132,42,0.58));}
.c-mono-line.r{background:linear-gradient(90deg,rgba(175,132,42,0.58),transparent);}
.c-mono{display:inline-flex;animation:ringBob 4.5s ease-in-out infinite;}
@keyframes ringBob{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-5px) rotate(7deg)}}
.c-eyebrow{font-family:'Cinzel',serif;font-size:0.5rem;letter-spacing:4px;color:rgba(52,36,12,0.85);text-transform:uppercase;margin-bottom:0.5rem;}
.c-names{font-family:'Great Vibes',cursive;font-size:clamp(2.2rem,5.5vw,3.3rem);color:#3d2408; line-height:1.1;margin-bottom:0.22rem;text-shadow:0 1px 0 rgba(255,255,255,0.85),0 2px 10px rgba(105,62,8,0.18);}
.c-flourish{margin:0.55rem 0 0.7rem;display:flex;align-items:center;justify-content:center;gap:10px;}
.c-flourish-line{flex:1;max-width:60px;height:0.6px;background:linear-gradient(90deg,transparent,rgba(175,132,42,0.5),transparent);}
.c-flourish-diamond{font-size:0.44rem;color:rgba(175,132,42,0.68);}
.c-sub{font-family:'Cinzel',serif;font-size:0.54rem;letter-spacing:4px;color:rgba(52,36,12,0.85);text-transform:uppercase;margin-bottom:1.7rem;}
.c-input-wrap{position:relative;margin-bottom:1rem;}
.c-icon{position:absolute;left:14px;top:50%;transform:translateY(-50%);color:rgba(78, 55, 16, 0.45);font-size:10px;pointer-events:none;transition:color 0.3s;}
.c-input-wrap:focus-within .c-icon{color:var(--gold);}
.c-input{width:100%;background:rgba(255,255,255,0.54)!important;border:1px solid rgba(165,122,38,0.26);border-radius:1px;padding:11px 11px 11px 38px;color:#261d0b!important;font-family:'Cormorant Garamond',serif;font-size:max(16px,0.95rem);outline:none;text-align:center;letter-spacing:5px;-webkit-appearance:none;transition:border-color 0.4s,box-shadow 0.4s;box-shadow:inset 0 1px 3px rgba(0,0,0,0.05);}
.c-input::placeholder{letter-spacing:2px;color:rgba(72,48,14,0.28);font-size:0.76rem;}
.c-input:focus{border-color:rgba(188,142,48,0.60);background:rgba(255,255,255,0.72)!important;box-shadow:0 0 0 2px rgba(195,155,60,0.10),inset 0 1px 3px rgba(0,0,0,0.04);}
.c-input:-webkit-autofill,.c-input:-webkit-autofill:hover,.c-input:-webkit-autofill:focus{-webkit-box-shadow:0 0 0 1000px #f8f2e3 inset!important;-webkit-text-fill-color:#261d0b!important;}
.c-btn{width:100%;background:linear-gradient(135deg,#7a5214 0%,#c9a84c 44%,#e6c254 100%);color:#120900;border:none;border-radius:1px;padding:13px;min-height:44px;font-family:'Cinzel',serif;font-size:0.64rem;letter-spacing:6px;text-transform:uppercase;font-weight:600;cursor:pointer;position:relative;overflow:hidden;transition:transform 0.26s var(--ease-silk),box-shadow 0.28s;box-shadow:0 4px 20px rgba(145,100,16,0.28),0 1px 0 rgba(255,255,255,0.16) inset;touch-action:manipulation;}
.c-btn::before{content:'';position:absolute;inset:0;background:linear-gradient(100deg,transparent 18%,rgba(255,255,255,0.30) 46%,transparent 76%);transform:translateX(-130%);transition:transform 0s;}
.c-btn:not(:disabled):hover::before{transform:translateX(130%);transition:transform 0.5s ease;}
.c-btn:not(:disabled):hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(145,100,16,0.45);}
.c-btn:not(:disabled):active{transform:translateY(1px) scale(0.985);}
.c-btn:disabled{opacity:0.45;cursor:not-allowed;}
.c-ripple{position:absolute;border-radius:50%;background:rgba(255,255,255,0.34);transform:scale(0);animation:rippleOut 0.65s ease-out forwards;pointer-events:none;}
@keyframes rippleOut{to{transform:scale(4);opacity:0;}}
.c-dots{display:inline-flex;gap:3px;align-items:center;}
.c-dots span{display:block;width:4px;height:4px;border-radius:50%;background:#261d0b;animation:dotBounce 1.1s infinite;}
.c-dots span:nth-child(2){animation-delay:0.16s}.c-dots span:nth-child(3){animation-delay:0.32s}
@keyframes dotBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
.c-hint{font-family:'Cormorant Garamond',serif;color:rgba(48,32,8,0.80);font-size:0.76rem;font-style:italic;margin-top:0.9rem;}
.c-error{color:#c0392b;font-family:'Cormorant Garamond',serif;font-size:0.82rem;font-style:italic;margin-bottom:0.5rem;animation:fadeIn 0.3s ease;}
@keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
.c-eye{position:absolute;right:14px;top:50%;transform:translateY(-50%);cursor:pointer;font-size:14px;opacity:0.5;transition:opacity 0.2s;user-select:none;}
.c-eye:hover{opacity:1;}

.gl-mute-btn{position:fixed;bottom:1.4rem;right:1.4rem;z-index:9999;display:flex;align-items:center;gap:6px;padding:0.45rem 0.85rem;background:rgba(18,12,3,0.74);border:1px solid rgba(195,155,60,0.38);border-radius:999px;color:rgba(220,185,90,0.92);font-family:'Cinzel',serif;font-size:0.55rem;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;backdrop-filter:blur(10px);transition:background 0.2s,border-color 0.2s,transform 0.2s;}
.gl-mute-btn:hover{background:rgba(30,18,4,0.90);border-color:rgba(195,155,60,0.72);transform:scale(1.05);}

@media(max-width:768px){
  :root{
    --env-w:min(470px,92vw);
    --env-h:min(285px,48vw);
    --card-w:min(285px,82vw);
  }
  .env-flower{width:clamp(140px,28vw,260px);}
  .env-flower-bl{bottom:-30px;left:-60px;}
  .env-flower-tr{top:35px;right:-40px;}
  .open-flower-bl{bottom:-60px;left:-60px;}
  .open-flower-tr{top:20px;right:-30px;}
  .c-input{padding:11px 36px 11px 11px;letter-spacing:3px;font-size:0.88rem;text-align:center;}
  .c-input::placeholder{letter-spacing:1px;font-size:0.74rem;}
}

@media(max-width:540px){
  :root{
    --env-w:70vw !important;
    --env-h:45vw !important;
    --card-w:50vw !important;
  }
  .gl-root{justify-content:center;padding:1rem 0;}
  .gl-card{padding:1.5rem 1rem 1.2rem;min-height:30vw !important;margin-top:-80px;}
  .gl-scene{width:100%;align-items:center;}
  .gl-open-wrap{width:100%;align-items:center;}
  .gl-card-zone{width:100%;display:flex;justify-content:center;margin-bottom:-220px;}
  .gl-open-env{width:78vw;}
  .c-names{font-size:clamp(1.8rem,10vw,2.5rem);}
  .c-eyebrow{font-size:0.42rem;letter-spacing:2px;}
  .c-sub{font-size:0.42rem;letter-spacing:2px;}
  .c-btn{font-size:0.55rem;letter-spacing:3px;}
  .seal-img,.seal-glow-ring{width:clamp(60px,28vw,60px);height:clamp(60px,28vw,60px);}
  .seal-glow-ring{width:clamp(60px,20vw,80px);height:clamp(60px,20vw,80px);top:-15px;left:50%;}
  .seal-glow-ring-2{width:clamp(175px,20vw,175px);height:clamp(175px,20vw,175px);top:-50px;left:-20%;}
  .gl-seal-overlay{top:unset;bottom:27%;transform:translate(-50%,0);}
  .env-flower{width:clamp(150px,40vw,280px);}
  .env-flower-bl{bottom:-45px;left:-60px;}
  .env-flower-tr{top:45px;right:-35px;}
  .open-flower-bl{bottom:-60px;left:5px;}
  .open-flower-tr{top:35px;right:15px;}
  .gl-mute-btn{bottom:0.8rem;right:0.8rem;padding:0.35rem 0.65rem;}
}

@media(max-width:430px){
  :root{
    --env-w:78vw !important;
    --env-h:48vw !important;
    --card-w:55vw !important;
  }
  .gl-card{padding:0.6rem 0.9rem 0.6rem;min-height:unset !important;margin-top:-70px;}
  .gl-card-zone{margin-bottom:-200px;}
  .gl-open-env{width:80vw;}
  .c-mono-wrap{margin-bottom:0.4rem !important;}
  .c-flourish{margin:0.2rem 0 0.3rem !important;}
  .c-sub{margin-bottom:0.6rem !important;}
  .c-hint{margin-top:0.3rem !important;}
  .c-names{font-size:clamp(1.4rem,8vw,1.8rem);}
  .c-input-wrap{margin-bottom:0.5rem !important;}
  .c-names{font-size:clamp(1.6rem,9vw,2.2rem);}
  .c-eyebrow{font-size:0.40rem;letter-spacing:2px;}
  .c-sub{font-size:0.40rem;letter-spacing:2px;}
  .c-btn{font-size:0.52rem;letter-spacing:3px;}
  .seal-img,.seal-glow-ring{width:clamp(50px,24vw,50px);height:clamp(50px,24vw,50px);}
  .seal-glow-ring{width:clamp(55px,18vw,75px);height:clamp(55px,18vw,75px);top:-12px;left:50%;}
  .seal-glow-ring-2{width:clamp(150px,18vw,160px);height:clamp(150px,18vw,160px);top:-45px;left:-10%;}
  .gl-seal-overlay{bottom:25%;transform:translate(-50%,0);}
  .env-flower{width:clamp(130px,38vw,200px);}
  .env-flower-bl{bottom:-35px;left:-45px;}
  .env-flower-tr{top:55px;right:-25px;}
  .open-flower-bl{bottom:-50px;left:0px;}
  .open-flower-tr{top:-10px;right:5px;}
}


@media(max-width:411px){
  :root{
    --env-w:74vw !important;
    --env-h:46vw !important;
    --card-w:55vw !important;
  }
  .gl-root{justify-content:center;padding:1rem 0;}
  .gl-card{padding:0.6rem 0.9rem 0.6rem;min-height:unset !important;margin-top:-90px;}
  .gl-scene{width:100%;align-items:center;}
  .gl-open-wrap{width:100%;align-items:center;}
  .gl-card-zone{width:100%;display:flex;justify-content:center;margin-bottom:-210px;}
  .gl-open-env{width:79vw;}
  .c-names{font-size:clamp(1.6rem,9vw,2.2rem);}
  .c-eyebrow{font-size:0.41rem;letter-spacing:2px;}
  .c-sub{font-size:0.41rem;letter-spacing:2px;}
  .c-btn{font-size:0.53rem;letter-spacing:3px;}
  .c-mono-wrap{margin-bottom:0.5rem !important;}
  .c-flourish{margin:0.3rem 0 0.4rem !important;}
  .c-sub{margin-bottom:0.7rem !important;}
  .c-hint{margin-top:0.4rem !important;}
  .c-input-wrap{margin-bottom:0.6rem !important;}
  .seal-img,.seal-glow-ring{width:clamp(55px,26vw,55px);height:clamp(55px,26vw,55px);}
  .seal-glow-ring{width:clamp(58px,19vw,78px);height:clamp(58px,19vw,78px);top:-13px;left:50%;}
  .seal-glow-ring-2{width:clamp(160px,19vw,168px);height:clamp(160px,19vw,168px);top:-48px;left:-15%;}
  .gl-seal-overlay{top:unset;bottom:26%;transform:translate(-50%,0);}
  .env-flower{width:clamp(140px,39vw,240px);}
  .env-flower-bl{bottom:-40px;left:-52px;}
  .env-flower-tr{top:50px;right:-30px;}
  .open-flower-bl{bottom:-55px;left:2px;}
  .open-flower-tr{top:-10px;right:5px;}
  .gl-mute-btn{bottom:0.8rem;right:0.8rem;padding:0.35rem 0.65rem;}
}

@media(max-width:320px){
  :root{
    --env-w:90vw !important;
    --env-h:54vw !important;
    --card-w:86vw !important;
  }
  .gl-card{padding:1.1rem 0.8rem 0.9rem;min-height:36vw !important;margin-top:-50px;}
  .gl-card-zone{margin-bottom:-165px;}
  .gl-open-env{width:92vw;}
  .c-names{font-size:clamp(1.3rem,8vw,1.8rem);}
  .c-eyebrow{font-size:0.35rem;letter-spacing:1px;}
  .c-sub{font-size:0.35rem;letter-spacing:1px;}
  .c-btn{font-size:0.46rem;letter-spacing:2px;}
  .seal-img,.seal-glow-ring{width:clamp(70px,20vw,90px);height:clamp(70px,20vw,90px);}
  .seal-glow-ring{width:clamp(45px,14vw,65px);height:clamp(45px,14vw,65px);top:-8px;left:50%;}
  .seal-glow-ring-2{width:clamp(110px,14vw,130px);height:clamp(110px,14vw,130px);top:-35px;left:-20%;}
  .gl-seal-overlay{bottom:4%;transform:translate(-50%,0);}
  .env-flower{width:clamp(100px,30vw,150px);}
  .env-flower-bl{bottom:-25px;left:-25px;}
  .env-flower-tr{top:25px;right:-15px;}
  .open-flower-bl{bottom:-35px;left:0px;}
  .open-flower-tr{top:0px;right:5px;}
}

@media(prefers-reduced-motion:reduce){
  .gl-closed-env,.gl-card-zone,.gl-open-env{transition:none!important;animation:none!important;}
  .card-body.show>*{animation:none!important;opacity:1;transform:none;}
  .gl-petal,.gl-ray,.c-mono,.seal-img,.seal-glow-ring,.gl-particle,.gl-card,.card-shimmer{animation:none!important;}
}
`;