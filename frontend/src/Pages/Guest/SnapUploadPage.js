import React, { useState, useEffect, useRef } from 'react';
import { getGuestSession } from '../../Helpers/Utilities/Common';
import { uploadPhoto, getPhotos } from '../../Helpers/API/GuestApi';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';
const GOLD = '#d0c474';

if (!document.head.querySelector('[href*="Gambarino"]')) {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Gambarino&display=swap';
  document.head.appendChild(link);
}

const SnapUploadPage = () => {
  const guest = getGuestSession();
  const fileInputRef = useRef(null);

  const [photos, setPhotos]               = useState([]);
  const [preview, setPreview]             = useState(null);
  const [file, setFile]                   = useState(null);
  const [uploading, setUploading]         = useState(false);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [successMsg, setSuccessMsg]       = useState('');
  const [errorMsg, setErrorMsg]           = useState('');
  const [lightbox, setLightbox]           = useState(null);

  /* ── Fetch all photos ── */
  const fetchPhotos = async () => {
    try {
      const res = await getPhotos();
      setPhotos(res.data || []);
    } catch {
      setErrorMsg('Could not load photos. Please try again.');
    } finally {
      setLoadingPhotos(false);
    }
  };

  useEffect(() => { fetchPhotos(); }, []);

  /* ── Handle file select ── */
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setSuccessMsg('');
    setErrorMsg('');
  };

  /* ── Handle upload ── */
  const handleUpload = async () => {
    if (!file) { setErrorMsg('Please select a photo first.'); return; }
    setUploading(true);
    setErrorMsg('');
    try {
      await uploadPhoto(guest?.id, file);
      setSuccessMsg('Photo uploaded successfully! ');
      setFile(null);
      setPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      fetchPhotos();
    } catch {
      setErrorMsg('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  /* ── Cancel preview ── */
  const handleCancel = () => {
    setFile(null);
    setPreview(null);
    setErrorMsg('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #0d1a3a 0%, #1a2f5a 50%, #0a0f2e 100%)',
      padding: 'clamp(40px, 8vw, 80px) clamp(16px, 5vw, 40px)',
      fontFamily: 'Gambarino, serif',
      boxSizing: 'border-box',
    }}>

      {/* ── Header ── */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(28px, 5vw, 48px)' }}>
        <p style={{
          fontFamily: 'Great Vibes',
          fontSize: 'clamp(2.4rem, 6vw, 3.8rem)',
          color: '#fff',
          margin: '0 0 6px',
          textShadow: `0 0 20px rgba(214,190,122,0.5), 0 2px 8px rgba(0,0,0,0.4)`,
        }}>
          Snap &amp; Share
        </p>
        <p style={{
          fontFamily: 'Gambarino',
          fontSize: 'clamp(0.78rem, 2vw, 0.92rem)',
          color: 'rgba(255,255,255,0.6)',
          letterSpacing: '1px',
          margin: 0,
        }}>
          Upload your memories from our special day
        </p>
      </div>

      {/* ── Upload Box ── */}
      <div style={{
        maxWidth: '480px',
        margin: '0 auto clamp(36px, 6vw, 56px)',
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid rgba(214,190,122,0.3)`,
        borderRadius: '16px',
        padding: 'clamp(20px, 4vw, 32px)',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
      }}>

        {/* Preview */}
        {preview ? (
          <div style={{ marginBottom: '16px' }}>
            <img src={preview} alt="Preview" style={{
              width: '100%', maxHeight: '260px',
              objectFit: 'cover', borderRadius: '10px',
              border: `1px solid rgba(214,190,122,0.4)`,
            }} />
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: '100%', height: 'clamp(120px, 20vw, 180px)',
              border: `2px dashed rgba(214,190,122,0.45)`,
              borderRadius: '12px', marginBottom: '16px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', gap: '8px',
            }}
          >
            <span style={{ fontSize: '2rem' }}></span>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 'clamp(0.78rem, 2vw, 0.88rem)', margin: 0 }}>
              Tap to select a photo
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!preview ? (
            <button onClick={() => fileInputRef.current?.click()} style={btnStyle(GOLD, '#1a2f5a')}>
              Choose Photo
            </button>
          ) : (
            <>
              <button onClick={handleCancel} style={outlineBtn(GOLD)}>
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                style={{ ...btnStyle(GOLD, '#1a2f5a'), opacity: uploading ? 0.6 : 1, cursor: uploading ? 'not-allowed' : 'pointer' }}
              >
                {uploading ? 'Uploading...' : 'Upload Photo'}
              </button>
            </>
          )}
        </div>

        {/* Messages */}
        {successMsg && (
          <p style={{ color: '#7be08a', fontSize: '0.82rem', marginTop: '12px' }}>{successMsg}</p>
        )}
        {errorMsg && (
          <p style={{ color: '#e07070', fontSize: '0.82rem', marginTop: '12px' }}>{errorMsg}</p>
        )}
      </div>

      {/* ── Gold Divider ── */}
      <div style={{
        width: '100%', maxWidth: '480px', height: '1px',
        background: `linear-gradient(to right, transparent, ${GOLD}, transparent)`,
        margin: '0 auto clamp(28px, 5vw, 44px)',
      }} />

      {/* ── Photo Gallery ── */}
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p style={{
          fontFamily: 'Great Vibes',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: '#fff',
          textAlign: 'center',
          margin: '0 0 clamp(16px, 3vw, 28px)',
          textShadow: `0 0 16px rgba(214,190,122,0.4)`,
        }}>
          Our Memories
        </p>

        {loadingPhotos ? (
          <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', fontSize: '0.88rem' }}>
            Loading photos...
          </p>
        ) : photos.length === 0 ? (
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontSize: '0.88rem', fontStyle: 'italic' }}>
            No photos yet. Be the first to share a moment! 📸
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(120px, 25vw, 200px), 1fr))',
            gap: 'clamp(8px, 2vw, 16px)',
          }}>
            {photos.map((photo, i) => (
              <div
                key={photo.id || i}
                onClick={() => setLightbox(photo.file_url || `${BASE_URL}/${photo.filename}`)}
                style={{
                  aspectRatio: '1',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: `1px solid rgba(214,190,122,0.25)`,
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.03)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img
                  src={photo.file_url || `${BASE_URL}/${photo.filename}`}
                  alt={`Guest photo ${i + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ── */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px', cursor: 'zoom-out',
          }}
        >
          <img
            src={lightbox}
            alt="Full view"
            style={{
              maxWidth: '100%', maxHeight: '90vh',
              borderRadius: '12px',
              boxShadow: '0 0 60px rgba(0,0,0,0.8)',
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', top: '16px', right: '20px',
              background: 'rgba(255,255,255,0.15)',
              border: 'none', color: '#fff', fontSize: '1.4rem',
              borderRadius: '50%', width: '40px', height: '40px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
};

const btnStyle = (bg, color) => ({
  padding: 'clamp(8px, 1.5vw, 12px) clamp(20px, 3vw, 32px)',
  background: bg,
  border: `1px solid ${bg}`,
  borderRadius: '20px',
  color,
  fontFamily: 'Gambarino, serif',
  fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)',
  letterSpacing: '0.8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

const outlineBtn = (color) => ({
  padding: 'clamp(8px, 1.5vw, 12px) clamp(20px, 3vw, 32px)',
  background: 'transparent',
  border: `1px solid ${color}`,
  borderRadius: '20px',
  color,
  fontFamily: 'Gambarino, serif',
  fontSize: 'clamp(0.78rem, 1.8vw, 0.88rem)',
  letterSpacing: '0.8px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

export default SnapUploadPage;