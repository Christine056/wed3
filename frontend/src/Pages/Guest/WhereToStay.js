import React from 'react';
import GuestNavbar from '../../Components/Guest/GuestNavbar';
import { FaMapMarkerAlt, FaPhone, FaStar } from 'react-icons/fa';

const HOTELS = [
  {
    name: 'Raffles Makati',
    distance: '0.3 km from venue',
    stars: 5,
    desc: 'Ultra-luxury hotel with world-class amenities. Special rate negotiated for wedding guests.',
    phone: '+63 2 8555 9000',
    address: 'Raffles Drive, Makati City',
    price: 'From ₱15,000/night',
    promo: 'Wedding Guest Rate Available',
  },
  {
    name: 'Shangri-La The Fort',
    distance: '2.5 km from venue',
    stars: 5,
    desc: 'Award-winning luxury hotel with stunning city views and impeccable service.',
    phone: '+63 2 8820 0888',
    address: '30th Street cor. 5th Avenue, BGC',
    price: 'From ₱12,000/night',
    promo: null,
  },
  {
    name: 'Makati Shangri-La',
    distance: '1.2 km from venue',
    stars: 5,
    desc: 'Centrally located luxury hotel, walking distance from Greenbelt and the venue.',
    phone: '+63 2 8813 8888',
    address: 'Ayala Ave corner Makati Ave, Makati City',
    price: 'From ₱10,000/night',
    promo: null,
  },
  {
    name: 'Hotel Jen Manila',
    distance: '1.8 km from venue',
    stars: 4,
    desc: 'Modern upscale hotel with great dining options and complimentary airport shuttle.',
    phone: '+63 2 8795 8888',
    address: 'Adriatico Street, Malate, Manila',
    price: 'From ₱6,500/night',
    promo: null,
  },
  {
    name: 'Acacia Hotel Manila',
    distance: '3.0 km from venue',
    stars: 4,
    desc: 'Business-friendly hotel with spacious rooms and easy access to major thoroughfares.',
    phone: '+63 2 8720 0000',
    address: 'Filinvest Corporate City, Alabang',
    price: 'From ₱5,000/night',
    promo: null,
  },
  {
    name: 'Z Hostel',
    distance: '2.0 km from venue',
    stars: 3,
    desc: 'Trendy boutique hotel with rooftop bar. Budget-friendly option in the heart of Makati.',
    phone: '+63 2 8828 5073',
    address: '1739 Apolinario St, Makati City',
    price: 'From ₱2,500/night',
    promo: null,
  },
];

const WhereToStay = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
    <GuestNavbar />
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Accommodations</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: '#C9A84C', margin: '0.5rem 0 1rem' }}>Where to Stay</h1>
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto 1rem' }} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
          We've curated a selection of nearby accommodations for your comfort and convenience.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {HOTELS.map((hotel, i) => (
          <div key={i} style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
            {hotel.promo && (
              <div style={{
                position: 'absolute', top: '12px', right: '-20px',
                background: 'linear-gradient(135deg, #C9A84C, #FFD700)',
                color: '#1a1a1a', fontSize: '0.65rem', fontWeight: '700',
                fontFamily: "'Cormorant Garamond', serif", letterSpacing: '1px',
                textTransform: 'uppercase', padding: '4px 32px',
                transform: 'rotate(35deg)', transformOrigin: 'right',
              }}>
                Special Rate
              </div>
            )}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '0.75rem' }}>
              {[...Array(hotel.stars)].map((_, s) => <FaStar key={s} color="#C9A84C" size={12} />)}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>{hotel.name}</h3>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '0.75rem' }}>
              <FaMapMarkerAlt color="#C9A84C" size={12} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '0.85rem' }}>{hotel.distance}</span>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1rem' }}>{hotel.desc}</p>
            <div style={{ borderTop: '1px solid rgba(201,168,76,0.15)', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '0.4rem' }}>
                <FaPhone color="rgba(201,168,76,0.6)" size={11} />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{hotel.phone}</span>
              </div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '0.9rem', fontWeight: '600', margin: 0 }}>{hotel.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '2rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', fontStyle: 'italic', margin: 0 }}>
          💡 Tip: Book early! June is peak wedding season. Mention "Sofia & Marcus Wedding" when calling Raffles Makati for the special rate.
        </p>
      </div>
    </div>
  </div>
);

export default WhereToStay;
