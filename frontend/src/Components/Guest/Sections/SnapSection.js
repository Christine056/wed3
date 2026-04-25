import React from 'react';
import { QRCodeSVG } from 'qrcode.react';

const GOLD = '#d0c474';

const gambarino = (size, color = '#222', extra = {}) => ({
  fontFamily: 'Gambarino, serif', fontSize: size,
  color, fontWeight: 400, margin: 0, ...extra,
});

const arial = (size, color = '#333', extra = {}) => ({
  fontFamily: 'Arial, sans-serif', fontSize: size,
  color, margin: 0, ...extra,
});

const SnapSection = ({ sectionRef }) => {
  const uploadURL = `${window.location.origin}/snap-upload`;

  return (
    <>
      <section ref={sectionRef} id="snap-share" style={{
        minHeight: '50vh', background: '#fff',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 'clamp(60px, 8vw, 80px) clamp(24px, 5vw, 40px)',
        textAlign: 'center',
      }}>

        <p style={gambarino('clamp(2rem, 4vw, 2.8rem)', GOLD, { marginBottom: '16px' })}>
          Snap &amp; Share
        </p>

        <p style={arial('clamp(0.88rem, 2vw, 0.95rem)', '#555', {
          lineHeight: 1.8, marginBottom: '32px', maxWidth: '380px',
        })}>
          Captured a special moment? We'd love to see it!
          Scan the QR code below to upload and view photos from our big day.
        </p>

        {/* QR Code Box */}
        <div style={{
          padding: '16px',
          border: `2px solid ${GOLD}`,
          borderRadius: '12px',
          background: '#fff',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}>
          <QRCodeSVG
            value={uploadURL}
            size={180}
            bgColor="#ffffff"
            fgColor="#222222"
            level="H"
          />
          <p style={arial('0.72rem', '#999', { letterSpacing: '0.5px' })}>
            Scan to view &amp; upload photos
          </p>
        </div>

        {/* Fallback link for guests already on phone */}
        <a href="/snap-upload" style={{
          marginTop: '18px',
          fontFamily: 'Gambarino, serif',
          fontSize: 'clamp(0.75rem, 1.8vw, 0.85rem)',
          color: GOLD,
          textDecoration: 'underline',
          letterSpacing: '0.5px',
        }}>
          Or tap here to open
        </a>

      </section>
    </>
  );
};

export default SnapSection;