import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoImg from '../../Assets/Images/logo.png';
import backgroundBanner from '../../Assets/Images/background-banner.png';

import DateLocationSection from '../../Components/Guest/Sections/DateLocationSection';
import AttireSection from '../../Components/Guest/Sections/AttireSection';
import EntourageSection from '../../Components/Guest/Sections/EntourageSection';
import GiftsSection from '../../Components/Guest/Sections/GiftsSection';
import PrivacySection from '../../Components/Guest/Sections/PrivacySection';
import AccommodationSection from '../../Components/Guest/Sections/AccommodationSection';
import SnapSection from '../../Components/Guest/Sections/SnapSection';

if (!document.head.querySelector('[href*="Gambarino"]')) {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Gambarino&display=swap';
  document.head.appendChild(fontLink);
}

const PRIMARY_GOLD = '#D6BE7A';
const NAV_SECTIONS = ['RSVP', 'Date & Location', 'Attire', 'Entourage', 'Gifts', 'Privacy', 'Accommodation', 'Snap & Share'];

const SECTION_IDS = {
  'Date & Location': 'date-location',
  'Attire':          'attire',
  'Entourage':       'entourage',
  'Gifts':           'gifts',
  'Privacy':         'privacy',
  'Accommodation':   'accommodation',
  'Snap & Share':    'snap-share',
};

const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Gambarino&display=swap');
  @media (max-width: 640px) {
    .nav-links { display: none !important; }
    .hamburger { display: flex !important; }
  }
  @media (min-width: 641px) {
    .hamburger { display: none !important; }
    .nav-links { display: flex !important; }
  }
  .home-logout-btn {
    border-radius: 20px;
    background: transparent !important;
    border: 1px solid rgba(235, 214, 153, 0.73) !important;
    color: rgba(181,157,88,0.75) !important;
    font-family: Gambarino, sans-serif;
    font-size: 0.65rem;
    letter-spacing: 0.8px;
    text-transform: uppercase;
    padding: 4px 14px;
    cursor: pointer;
    margin-left: 8px;
    transition: all 0.25s ease !important;
  }
  .home-logout-btn:hover {
    background: rgba(227, 211, 168, 0.1) !important;
    border-color: rgba(223, 176, 56, 0.85) !important;
    color: #e4bc56 !important;
  }
`;

const GuestHomePage = () => {
  const [activeNav, setActiveNav] = useState('Date & Location');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const dateLocationRef  = useRef(null);
  const attireRef        = useRef(null);
  const entourageRef     = useRef(null);
  const giftsRef         = useRef(null);
  const privacyRef       = useRef(null);
  const accommodationRef = useRef(null);
  const snapRef          = useRef(null);

  const scrollToSection = (section) => {
    setMenuOpen(false);
    if (section === 'RSVP') { navigate('/rsvp'); return; }
    setActiveNav(section);
    const id = SECTION_IDS[section];
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) { setActiveNav('Date & Location'); return; }
      const scrollMid = window.scrollY + window.innerHeight / 2;
      for (const [name, id] of Object.entries(SECTION_IDS)) {
        const el = document.getElementById(id);
        if (el) {
          const top    = el.getBoundingClientRect().top + window.scrollY;
          const bottom = top + el.offsetHeight;
          if (scrollMid >= top && scrollMid < bottom) { setActiveNav(name); break; }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (state?.scrollTo) {
      setTimeout(() => {
        const id = SECTION_IDS[state.scrollTo];
        const el = document.getElementById(id);
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); setActiveNav(state.scrollTo); }
      }, 500);
    }
  }, []);

  const renderNavbar = () => (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(143,53,140,0.12)',
      padding: '0 clamp(12px, 3vw, 40px)', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: 'clamp(52px, 6vh, 70px)', boxSizing: 'border-box',
    }}>
      <img src={logoImg} alt="M&J" style={{ height: '40px', objectFit: 'contain' }} />

      {/* Desktop nav */}
      <div className="nav-links" style={{ gap: '4px', alignItems: 'center' }}>
        {NAV_SECTIONS.map(s => (
          <button key={s} onClick={() => scrollToSection(s)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Gambarino', fontSize: '0.7rem',
            letterSpacing: '0.8px', textTransform: 'uppercase',
            color: activeNav === s ? PRIMARY_GOLD : '#666',
            borderBottom: activeNav === s ? '2px solid ' + PRIMARY_GOLD : '2px solid transparent',
            padding: 'clamp(4px, 0.5vw, 8px) clamp(8px, 1vw, 14px)', transition: 'all 0.2s',
          }}>{s}</button>
        ))}
        <button className="home-logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* Hamburger */}
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        flexDirection: 'column', gap: '4px', padding: '4px',
      }}>
        {[0,1,2].map(i => <div key={i} style={{ width: '22px', height: '2px', background: PRIMARY_GOLD }} />)}
      </button>

      {menuOpen && (
        <div style={{
          position: 'absolute', top: '56px', left: 0, right: 0,
          background: 'rgba(255,255,255,0.97)',
          borderBottom: '1px solid rgba(143,53,140,0.12)', zIndex: 99,
        }}>
          {NAV_SECTIONS.map(s => (
            <button key={s} onClick={() => scrollToSection(s)} style={{
              display: 'block', width: '100%', background: 'none',
              border: 'none', cursor: 'pointer', textAlign: 'left',
              fontFamily: 'Gambarino', fontSize: '0.82rem',
              letterSpacing: '1px', textTransform: 'uppercase',
              color: activeNav === s ? PRIMARY_GOLD : '#666', padding: '13px 24px',
              borderLeft: activeNav === s ? '3px solid ' + PRIMARY_GOLD : '3px solid transparent',
            }}>{s}</button>
          ))}
          <button className="home-logout-btn" onClick={handleLogout} style={{
            display: 'block', width: '100%', textAlign: 'left',
            padding: '13px 24px', marginLeft: 0, borderRadius: 0,
            borderLeft: '3px solid transparent', fontSize: '0.82rem',
          }}>Logout</button>
        </div>
      )}
    </nav>
  );

  return (
    <div style={{
      backgroundImage: `url(${backgroundBanner})`,
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      <style>{globalStyles}</style>
      {renderNavbar()}
      <div style={{ paddingTop: '56px' }}>
        <DateLocationSection sectionRef={dateLocationRef} />
        <AttireSection sectionRef={attireRef} />
        <EntourageSection sectionRef={entourageRef} />
        <GiftsSection sectionRef={giftsRef} />
        <PrivacySection sectionRef={privacyRef} />
        <AccommodationSection sectionRef={accommodationRef} />
        <SnapSection sectionRef={snapRef} />
      </div>
    </div>
  );
};

export default GuestHomePage;