import React, { useState } from 'react';
import GuestNavbar from '../../Components/Guest/GuestNavbar';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQS = [
  { q: 'Are children welcome at the wedding?', a: 'Yes! Children are warmly welcome. Please note their count when you RSVP so we can prepare accordingly. A children\'s corner with activities will be available during the reception.' },
  { q: 'Can I bring a plus one?', a: 'Plus ones are allowed only if your invitation specifically states this. Your reserved seat count on the RSVP page reflects your allowed guests. If you have questions, please contact us directly.' },
  { q: 'Is there parking at the venue?', a: 'Yes! The Grand Ballroom Manila offers complimentary valet parking for all wedding guests. Simply inform the valet attendant that you are attending the Sofia & Marcus wedding.' },
  { q: 'What is the dress code?', a: 'The dress code is Formal Attire — think elegant gowns, barongs, suits, or cocktail dresses. Please see our Dress Code page for approved colors and style guidelines.' },
  { q: 'What should I do about gifts?', a: 'Your presence is the greatest gift. If you wish to give, the couple has a monetary gift registry via their Gcash or bank transfer (details on the invitation). A gift table will also be available at the venue.' },
  { q: 'Can I take photos during the ceremony?', a: 'We kindly ask that you refrain from taking photos during the ceremony so you can be fully present. Our professional photographer will capture everything beautifully. After the ceremony, photo opportunities are plentiful!' },
  { q: 'Will there be a shuttle service?', a: 'Yes! Complimentary shuttle service will be available from select pickup points. Details will be sent to confirmed attendees closer to the date.' },
  { q: 'Is the venue accessible for guests with disabilities?', a: 'Yes, The Grand Ballroom Manila is fully wheelchair accessible with ramps, elevators, and accessible restrooms. Please indicate any special needs in your RSVP message so we can assist.' },
  { q: 'What if I need to change my RSVP?', a: 'Please contact us as soon as possible if your plans change. We\'ll do our best to accommodate. Our cutoff for RSVP changes is June 1, 2025.' },
  { q: 'Will there be food for dietary restrictions?', a: 'Absolutely! We will have vegetarian, vegan, and halal-friendly options. Please note any dietary restrictions in your RSVP message so our caterers can prepare accordingly.' },
];

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
      <button onClick={() => setOpen(!open)} style={{
        width: '100%', background: 'none', border: 'none', padding: '1.5rem 0',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        cursor: 'pointer', gap: '1rem',
      }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', color: open ? '#C9A84C' : '#fff', textAlign: 'left', transition: 'color 0.3s' }}>
          {q}
        </span>
        <span style={{ flexShrink: 0, color: '#C9A84C' }}>
          {open ? <FaMinus size={14} /> : <FaPlus size={14} />}
        </span>
      </button>
      {open && (
        <div style={{ paddingBottom: '1.5rem' }}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.65)', fontSize: '1.05rem', lineHeight: 1.8, margin: 0 }}>
            {a}
          </p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
    <GuestNavbar />
    <div style={{ maxWidth: '750px', margin: '0 auto', padding: '4rem 2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem' }}>Common Questions</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.8rem', color: '#C9A84C', margin: '0.5rem 0 1rem' }}>FAQ</h1>
        <div style={{ height: '1px', width: '80px', background: 'linear-gradient(90deg, transparent, #C9A84C, transparent)', margin: '0 auto' }} />
      </div>

      <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '0 2rem' }}>
        {FAQS.map((item, i) => <FAQItem key={i} q={item.q} a={item.a} />)}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem' }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>
          Still have questions?{' '}
          <a href="mailto:wedding@example.com" style={{ color: '#C9A84C', textDecoration: 'none' }}>
            Contact us
          </a>
        </p>
      </div>
    </div>
  </div>
);

export default FAQ;
