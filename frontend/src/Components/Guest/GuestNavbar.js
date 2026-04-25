import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { GiRing } from 'react-icons/gi';
import { clearGuestSession } from '../../Helpers/Utilities/Common';

const NAV_LINKS = [
  { id: 'rsvp', label: 'RSVP' },
  { id: 'date-location', label: 'Date & Location' },
  { id: 'attire', label: 'Attire' },
  { id: 'entourage', label: 'Entourage' },
  { id: 'gifts', label: 'Gifts' },
  { id: 'privacy', label: 'Privacy' },
  { id: 'accommodation', label: 'Accommodation' },
  { id: 'snap-share', label: 'Snap & Share' },
];

const GuestNavbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('rsvp');

useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    },
    { threshold: 0.5 }
  );
  NAV_LINKS.forEach(link => {
    const el = document.getElementById(link.id);
    if (el) observer.observe(el);
  });
  return () => observer.disconnect();
}, []);

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
  setOpen(false);
};

  const handleLogout = () => {
  clearGuestSession();
  window.location.href = '/';
};

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: 'rgba(26,26,26,0.97)',
      borderBottom: '1px solid rgba(201,168,76,0.3)',
      padding: '0 2rem',
      backdropFilter: 'blur(10px)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Logo */}
       <button onClick={() => scrollToSection('rsvp')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <GiRing size={24} color="#C9A84C" />
        <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '1.8rem', color: '#C9A84C' }}>
          Our Wedding
        </span>
      </button>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }} className="d-none d-lg-flex">
          {NAV_LINKS.map(link => (
           <button key={link.id} onClick={() => scrollToSection(link.id)} style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase',
            color: activeSection === link.id ? '#C9A84C' : 'rgba(255,255,255,0.7)',
            borderBottom: activeSection === link.id ? '1px solid #C9A84C' : '1px solid transparent',
            paddingBottom: '2px', transition: 'color 0.3s',
          }}>
            {link.label}
          </button>
          ))}
          <button onClick={handleLogout} style={{
            background: 'transparent', border: '1px solid rgba(201,168,76,0.4)',
            color: '#C9A84C', padding: '6px 16px', cursor: 'pointer',
            fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem',
            letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px',
          }}>
            Logout
          </button>
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', color: '#C9A84C', cursor: 'pointer' }} className="d-lg-none">
          {open ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div style={{ background: '#1a1a1a', padding: '1rem 2rem 2rem', borderTop: '1px solid rgba(201,168,76,0.2)' }} className="d-lg-none">
          {NAV_LINKS.map(link => (
           <button key={link.id} onClick={() => scrollToSection(link.id)} style={{
            display: 'block', width: '100%', textAlign: 'left',
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '12px 0',
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1rem', letterSpacing: '1.5px', textTransform: 'uppercase',
            color: activeSection === link.id ? '#C9A84C' : '#fff',
            borderBottom: '1px solid rgba(201,168,76,0.1)',
          }}>
            {link.label}
          </button>
          ))}
          <button onClick={handleLogout} style={{
            marginTop: '1rem', background: 'transparent',
            border: '1px solid rgba(201,168,76,0.4)', color: '#C9A84C',
            padding: '8px 20px', cursor: 'pointer',
            fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem',
            letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px',
          }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default GuestNavbar;