import React from 'react';
import GuestNavbar from '../../Components/Guest/GuestNavbar';
import { FaCheck, FaTimes } from 'react-icons/fa';

const APPROVED_COLORS = [
  { name: 'Champagne', hex: '#F7E7CE' },
  { name: 'Dusty Rose', hex: '#DCAE96' },
  { name: 'Sage Green', hex: '#9CAF88' },
  { name: 'Powder Blue', hex: '#B8D4E3' },
  { name: 'Ivory', hex: '#FFFFF0' },
  { name: 'Blush', hex: '#FFB6C1' },
  { name: 'Lavender', hex: '#D8C9E3' },
  { name: 'Terracotta', hex: '#CB6843' },
  { name: 'Mauve', hex: '#B5939A' },
  { name: 'Gold', hex: '#C9A84C' },
  { name: 'Navy', hex: '#1F3A5F' },
  { name: 'Emerald', hex: '#2D6A4F' },
];

const DOS = [
  'Formal gowns, cocktail dresses, or elegant midi dresses for ladies',
  'Barong Tagalog, suit, or tuxedo for gentlemen',
  'Dress shoes or elegant heels (grass-friendly wedges recommended)',
  'Tasteful accessories and jewelry',
  'Pastel, neutral, or jewel tones from the approved palette',
  'Smart casual for children is perfectly acceptable',
];

const DONTS = [
  'White, off-white, or ivory (reserved for the bride)',
  'All-black outfits (this is a celebration!)',
  'Casual clothes — jeans, t-shirts, sneakers',
  'Revealing or overly casual attire',
  'Neon or extremely bright colors that clash with decor',
  'Costumes or themed clothing',
];

const DressCode = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
    <GuestNavbar />
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Attire Guide</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: '#C9A84C', margin: '0.5rem 0 0.5rem' }}>Dress Code</h1>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2rem', color: 'rgba(201,168,76,0.6)', marginBottom: '1rem' }}>Formal Attire</p>
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto' }} />
      </div>

      {/* Intro */}
      <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.7)', fontSize: '1.15rem', lineHeight: 1.9, margin: 0, fontStyle: 'italic' }}>
          We want you to look and feel your best on our special day. We've curated a color palette that will complement our wedding's elegant black and gold theme beautifully.
        </p>
      </div>

      {/* Color Palette */}
      <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '2.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#C9A84C', marginBottom: '1.5rem', textAlign: 'center' }}>
          Approved Color Palette
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '1rem' }}>
          {APPROVED_COLORS.map((color, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                width: '60px', height: '60px', borderRadius: '50%',
                background: color.hex,
                margin: '0 auto 8px',
                border: '2px solid rgba(201,168,76,0.3)',
                boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
              }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', margin: 0 }}>{color.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Do's and Don'ts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: '#242424', border: '1px solid rgba(46,160,67,0.3)', borderRadius: '4px', padding: '2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#C9A84C', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaCheck color="#2ea043" size={16} /> Do's
          </h2>
          {DOS.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <FaCheck color="#2ea043" size={12} style={{ marginTop: '5px', flexShrink: 0 }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.65)', fontSize: '1rem', margin: 0, lineHeight: 1.6 }}>{item}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#242424', border: '1px solid rgba(248,81,73,0.3)', borderRadius: '4px', padding: '2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#C9A84C', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FaTimes color="#f85149" size={16} /> Don'ts
          </h2>
          {DONTS.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '0.75rem', alignItems: 'flex-start' }}>
              <FaTimes color="#f85149" size={12} style={{ marginTop: '5px', flexShrink: 0 }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.65)', fontSize: '1rem', margin: 0, lineHeight: 1.6 }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DressCode;
