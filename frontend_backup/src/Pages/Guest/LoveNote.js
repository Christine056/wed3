import React from 'react';
import GuestNavbar from '../../Components/Guest/GuestNavbar';
import { GiRing } from 'react-icons/gi';
import { FaHeart } from 'react-icons/fa';

const LoveNote = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
    <GuestNavbar />
    <div style={{ maxWidth: '760px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem' }}>From Our Hearts to Yours</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: '#C9A84C', margin: '0.5rem 0 0.5rem' }}>A Love Note</h1>
        <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2rem', color: 'rgba(201,168,76,0.7)' }}>from Sofia & Marcus</p>
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '1rem auto' }} />
      </div>

      {/* Letter card */}
      <div style={{
        background: '#242424',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: '4px',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative corner elements */}
        <div style={{ position: 'absolute', top: '16px', left: '16px', width: '30px', height: '30px', borderTop: '2px solid rgba(201,168,76,0.3)', borderLeft: '2px solid rgba(201,168,76,0.3)' }} />
        <div style={{ position: 'absolute', top: '16px', right: '16px', width: '30px', height: '30px', borderTop: '2px solid rgba(201,168,76,0.3)', borderRight: '2px solid rgba(201,168,76,0.3)' }} />
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', width: '30px', height: '30px', borderBottom: '2px solid rgba(201,168,76,0.3)', borderLeft: '2px solid rgba(201,168,76,0.3)' }} />
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', width: '30px', height: '30px', borderBottom: '2px solid rgba(201,168,76,0.3)', borderRight: '2px solid rgba(201,168,76,0.3)' }} />

        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <GiRing size={28} color="rgba(201,168,76,0.6)" />
        </div>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '2rem' }}>
          Dearest Friends & Family,
        </p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', lineHeight: 2, marginBottom: '1.5rem' }}>
          As we stand on the threshold of this beautiful new chapter, we find ourselves overwhelmed with gratitude — not just for finding each other, but for the extraordinary people who have walked alongside us to reach this day.
        </p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', lineHeight: 2, marginBottom: '1.5rem' }}>
          Each one of you holds a piece of our story. Whether you've been there from the very beginning, or you came into our lives more recently — you have shaped who we are, and who we are to each other. The laughter you've given us, the shoulders you've offered, the wisdom you've shared — it has all led to this moment.
        </p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', lineHeight: 2, marginBottom: '1.5rem' }}>
          On June 14th, we don't just celebrate the joining of two hearts — we celebrate the community of love that surrounds us. Your presence at our wedding is not just an attendance; it is a gift. You are the reason our joy feels so full.
        </p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', lineHeight: 2, marginBottom: '2rem' }}>
          We ask only one thing of you that day — be present. Laugh loudly, dance freely, and let the love in that room wash over you. That is all we could ever hope for.
        </p>

        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.8)', fontSize: '1.15rem', lineHeight: 2, marginBottom: '2.5rem' }}>
          With hearts full of love and eyes brimming with happy tears already —
        </p>

        <div style={{ textAlign: 'right' }}>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#C9A84C', lineHeight: 1.3, marginBottom: '0.25rem' }}>Sofia</p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginBottom: '0.25rem' }}>
            <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
            <FaHeart color="#C9A84C" size={14} />
            <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
          </div>
          <p style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2.5rem', color: '#C9A84C', lineHeight: 1.3 }}>Marcus</p>
        </div>
      </div>

      {/* Bottom decoration */}
      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.25)', fontSize: '0.9rem', fontStyle: 'italic', letterSpacing: '1px' }}>
          "A great marriage is not when the perfect couple comes together. It is when an imperfect couple learns to enjoy their differences." — Dave Meurer
        </p>
      </div>
    </div>
  </div>
);

export default LoveNote;
