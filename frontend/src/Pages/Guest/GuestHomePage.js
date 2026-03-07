import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useIsMobile from '../../Helpers/Utilities/useIsMobile';
import logoImg from '../../Assets/Images/logo.png';

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

const PURPLE = '#8F358C';
const NAV_SECTIONS = ['RSVP', 'Attire', 'Entourage', 'Gifts', 'Privacy', 'Accommodation', 'Snap & Share'];

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
  html { scroll-behavior: smooth; }
`;

const GuestHomePage = () => {
  const isMobile = useIsMobile();
  const [activeNav, setActiveNav] = useState('Attire');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const attireRef = useRef(null);
  const entourageRef = useRef(null);
  const giftsRef = useRef(null);
  const privacyRef = useRef(null);
  const accommodationRef = useRef(null);
  const snapRef = useRef(null);

  const sectionRefs = {
    Attire: attireRef,
    Entourage: entourageRef,
    Gifts: giftsRef,
    Privacy: privacyRef,
    Accommodation: accommodationRef,
    'Snap & Share': snapRef,
  };

  const scrollToSection = (section) => {
    setActiveNav(section);
    setMenuOpen(false);
    if (section === 'RSVP') { navigate('/rsvp'); return; }
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 80;
      for (const [name, ref] of Object.entries(sectionRefs)) {
        if (ref.current) {
          const top = ref.current.offsetTop;
          const bottom = top + ref.current.offsetHeight;
          if (scrollY >= top && scrollY < bottom) setActiveNav(name);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Navbar = () => (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(143,53,140,0.12)',
      padding: '0 20px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', height: '56px', boxSizing: 'border-box',
    }}>
      <img src={logoImg} alt="M&J" style={{ height: '40px', objectFit: 'contain' }} />
      <div className="nav-links" style={{ gap: '4px', alignItems: 'center' }}>
        {NAV_SECTIONS.map(s => (
          <button key={s} onClick={() => scrollToSection(s)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Arial, sans-serif', fontSize: '0.7rem',
            letterSpacing: '0.8px', textTransform: 'uppercase',
            color: activeNav === s ? PURPLE : '#666',
            borderBottom: activeNav === s ? '2px solid ' + PURPLE : '2px solid transparent',
            padding: '4px 10px', transition: 'all 0.2s',
          }}>{s}</button>
        ))}
      </div>
      <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} style={{
        background: 'none', border: 'none', cursor: 'pointer',
        flexDirection: 'column', gap: '4px', padding: '4px',
      }}>
        {[0,1,2].map(i => <div key={i} style={{ width: '22px', height: '2px', background: PURPLE }} />)}
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
              fontFamily: 'Arial, sans-serif', fontSize: '0.82rem',
              letterSpacing: '1px', textTransform: 'uppercase',
              color: activeNav === s ? PURPLE : '#555', padding: '13px 24px',
              borderLeft: activeNav === s ? '3px solid ' + PURPLE : '3px solid transparent',
            }}>{s}</button>
          ))}
        </div>
      )}
    </nav>
  );

  return (
    <div style={{ background: '#fff' }}>
      <style>{globalStyles}</style>
      <Navbar />
      <div style={{ paddingTop: '56px' }}>
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