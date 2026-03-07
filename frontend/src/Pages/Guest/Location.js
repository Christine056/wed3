import React from 'react';
import GuestNavbar from '../../Components/Guest/GuestNavbar';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCar, FaTrain } from 'react-icons/fa';

const Location = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
    <GuestNavbar />
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Venue</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: '#C9A84C', margin: '0.5rem 0 1rem' }}>Location</h1>
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto' }} />
      </div>

      {/* Venue Details */}
      <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '4px', padding: '2.5rem', marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#C9A84C', marginBottom: '1.5rem' }}>
          The Grand Ballroom Manila
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <FaMapMarkerAlt color="#C9A84C" size={18} style={{ marginTop: '4px', flexShrink: 0 }} />
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                123 Elegance Avenue, Makati City, Metro Manila, Philippines 1226
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <FaPhone color="#C9A84C" size={16} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.1rem', margin: 0 }}>+63 2 8123 4567</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <FaEnvelope color="#C9A84C" size={16} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#fff', fontSize: '1.1rem', margin: 0 }}>events@grandballroommanila.com</p>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <div style={{ borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.3)', marginBottom: '2rem' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.802!2d121.01445!3d14.5547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTTCsDMzJzE3LjEiTiAxMjHCsDAwJzUyLjAiRQ!5e0!3m2!1sen!2sph!4v1234567890"
          width="100%" height="400" style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg)' }}
          allowFullScreen="" loading="lazy" title="Venue Map"
        />
      </div>

      {/* Directions */}
      <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '4px', padding: '2.5rem' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#C9A84C', marginBottom: '1.5rem' }}>How to Get There</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '0.75rem' }}>
              <FaCar color="#C9A84C" size={18} />
              <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1rem', margin: 0 }}>By Car</h4>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
              Take EDSA southbound, exit at Ayala Avenue. Turn left on Makati Ave. Continue straight for 2km. Free valet parking available at the venue.
            </p>
          </div>
          <div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '0.75rem' }}>
              <FaTrain color="#C9A84C" size={18} />
              <h4 style={{ fontFamily: "'Playfair Display', serif", color: '#fff', fontSize: '1rem', margin: 0 }}>By MRT/LRT</h4>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.8, margin: 0 }}>
              Take MRT-3 to Ayala Station. Walk 5 minutes to Makati Ave, then take a jeepney or grab to the venue. 10-15 min ride from the station.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Location;
