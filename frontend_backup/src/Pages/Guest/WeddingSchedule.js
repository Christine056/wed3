import React from 'react';
import GuestNavbar from '../../Components/Guest/GuestNavbar';

const EVENTS = [
  { time: '2:00 PM', title: 'Guest Arrival & Seating', desc: 'Guests arrive at The Grand Ballroom. Ushers will guide you to your seats.', icon: '🚗' },
  { time: '3:00 PM', title: 'Wedding Ceremony', desc: 'The sacred union of Sofia and Marcus begins. Please silence your phones.', icon: '💍' },
  { time: '3:45 PM', title: 'Ring Exchange & Vows', desc: 'The couple exchanges vows and rings in front of loved ones.', icon: '💛' },
  { time: '4:00 PM', title: 'Newlyweds Proclaimed', desc: 'Sofia and Marcus are officially married! Applause and celebration.', icon: '🎊' },
  { time: '4:15 PM', title: 'Cocktail Hour & Photos', desc: 'Enjoy cocktails and canapés while the couple takes wedding portraits.', icon: '🥂' },
  { time: '5:30 PM', title: 'Reception Dinner', desc: 'Guests are invited to the dining hall for a formal dinner reception.', icon: '🍽️' },
  { time: '6:30 PM', title: 'First Dance', desc: 'The couple shares their first dance as husband and wife.', icon: '💃' },
  { time: '7:00 PM', title: 'Toasts & Speeches', desc: 'Best man, maid of honor, and family members share heartfelt toasts.', icon: '🎤' },
  { time: '8:00 PM', title: 'Cake Cutting', desc: 'Sofia and Marcus cut the wedding cake together.', icon: '🎂' },
  { time: '8:30 PM', title: 'Dancing & Celebration', desc: 'The dance floor opens! Celebrate the night away with live music.', icon: '🎵' },
  { time: '11:30 PM', title: 'Grand Send-Off', desc: 'Join us for the sparkler send-off as the couple departs.', icon: '✨' },
];

const WeddingSchedule = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
    <GuestNavbar />
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem' }}>June 14, 2025</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: '#C9A84C', margin: '0.5rem 0 1rem' }}>
          Wedding Day Schedule
        </h1>
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto' }} />
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', paddingLeft: '60px' }}>
        {/* Vertical line */}
        <div style={{ position: 'absolute', left: '28px', top: '10px', bottom: '10px', width: '1px', background: 'linear-gradient(180deg, transparent, #C9A84C 10%, #C9A84C 90%, transparent)' }} />

        {EVENTS.map((event, i) => (
          <div key={i} style={{ position: 'relative', marginBottom: '2.5rem', display: 'flex', gap: '1.5rem' }}>
            {/* Dot */}
            <div style={{
              position: 'absolute', left: '-46px', top: '4px',
              width: '36px', height: '36px', borderRadius: '50%',
              background: '#1a1a1a', border: '2px solid #C9A84C',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem',
            }}>
              {event.icon}
            </div>

            <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '1.5rem', flex: 1 }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', letterSpacing: '2px', fontSize: '0.8rem', textTransform: 'uppercase', marginBottom: '4px' }}>
                {event.time}
              </p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#fff', marginBottom: '6px' }}>
                {event.title}
              </h3>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.6)', fontSize: '1rem', margin: 0 }}>
                {event.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WeddingSchedule;
