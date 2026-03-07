import React from 'react';
import GuestNavbar from '../../Components/Guest/GuestNavbar';
import { getGuestSession } from '../../Helpers/Utilities/Common';
import { GiRing } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const QUICK_LINKS = [
  { path: '/schedule', emoji: '📅', label: 'Wedding Schedule', desc: 'Timeline of the day' },
  { path: '/location', emoji: '📍', label: 'Location', desc: 'Venue & directions' },
  { path: '/where-to-stay', emoji: '🏨', label: 'Where to Stay', desc: 'Nearby accommodations' },
  { path: '/faq', emoji: '💬', label: 'FAQ', desc: 'Common questions answered' },
  { path: '/dress-code', emoji: '👗', label: 'Dress Code', desc: 'What to wear' },
  { path: '/love-note', emoji: '💌', label: 'Love Note', desc: 'A note from us to you' },
];

const WeddingHome = () => {
  const guest = getGuestSession();

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      <GuestNavbar />

      {/* Hero */}
      <div style={{ position: 'relative', minHeight: '85vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=70)`,
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15,
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 65%)' }} />

        <div style={{ position: 'relative', zIndex: 1, padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '2rem' }}>
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A84C)' }} />
            <GiRing size={32} color="#C9A84C" />
            <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, #C9A84C, transparent)' }} />
          </div>

          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Together with their families
          </p>
          <h1 style={{ fontFamily: "'Great Vibes', cursive", fontSize: 'clamp(3.5rem, 10vw, 7rem)', color: '#C9A84C', lineHeight: 1.1, marginBottom: '1rem' }}>
            Mary & John
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#fff', letterSpacing: '4px', marginBottom: '0.5rem' }}>
            JUNE 14, 2025
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '3rem' }}>
            THE GRAND BALLROOM • MANILA
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            <FaHeart color="#C9A84C" size={14} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '1.1rem', fontStyle: 'italic' }}>
              Welcome, {guest?.name}
            </p>
            <FaHeart color="#C9A84C" size={14} />
          </div>
        </div>
      </div>

      {/* Countdown Banner */}
      <div style={{ background: 'rgba(201,168,76,0.08)', borderTop: '1px solid rgba(201,168,76,0.2)', borderBottom: '1px solid rgba(201,168,76,0.2)', padding: '1.5rem', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.9rem', margin: 0 }}>
          ✦ The Big Day Awaits — June 14, 2025 ✦
        </p>
      </div>

      {/* Quick Links Grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '0.5rem' }}>
            Everything You Need
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', color: '#C9A84C', marginBottom: '1rem' }}>
            Your Wedding Guide
          </h2>
          <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {QUICK_LINKS.map(link => (
            <Link key={link.path} to={link.path} style={{ textDecoration: 'none' }}>
              <div style={{
                background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px',
                padding: '2rem', textAlign: 'center', transition: 'all 0.3s',
                cursor: 'pointer',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(201,168,76,0.2)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{link.emoji}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#C9A84C', marginBottom: '0.5rem' }}>{link.label}</h3>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem' }}>{link.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', padding: '3rem 2rem', borderTop: '1px solid rgba(201,168,76,0.15)' }}>
        <GiRing size={24} color="rgba(201,168,76,0.4)" />
        <p style={{ marginTop: '1rem', fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.2)', fontSize: '0.85rem', letterSpacing: '1px' }}>
          © 2025 Sofia & Marcus Wedding
        </p>
      </div>
    </div>
  );
};

export default WeddingHome;
