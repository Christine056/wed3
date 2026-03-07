import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../Components/Admin/AdminNavbar';
import { getAllPhotos, deletePhoto } from '../../Helpers/API/PhotoApi';
import { toast } from 'react-toastify';
import { FaTrash, FaExpand, FaImages } from 'react-icons/fa';
import { Modal } from 'antd';

const PhotoGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);

  const loadPhotos = async () => {
    setLoading(true);
    try {
      const res = await getAllPhotos();
      setPhotos(res.data || []);
    } catch { toast.error('Failed to load photos.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { loadPhotos(); }, []);

  const handleDelete = (photo) => {
    Modal.confirm({
      title: 'Delete this photo?',
      content: 'This action cannot be undone.',
      okText: 'Delete',
      okButtonProps: { style: { background: '#f85149', borderColor: '#f85149' } },
      onOk: async () => {
        try {
          await deletePhoto(photo.id);
          toast.success('Photo deleted.');
          loadPhotos();
        } catch { toast.error('Delete failed.'); }
      },
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      <AdminNavbar />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '3rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#C9A84C', margin: 0 }}>Photo Gallery</h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', margin: 0 }}>
              {photos.length} photos uploaded by guests
            </p>
          </div>
          <button onClick={loadPhotos} style={{
            background: 'transparent', border: '1px solid rgba(201,168,76,0.4)',
            color: '#C9A84C', padding: '8px 20px', cursor: 'pointer', borderRadius: '2px',
            fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem',
            letterSpacing: '1.5px', textTransform: 'uppercase',
          }}>
            Refresh
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '5rem' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', fontSize: '1.2rem' }}>Loading gallery...</p>
          </div>
        ) : photos.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', background: '#242424', border: '1px solid rgba(201,168,76,0.15)', borderRadius: '4px' }}>
            <FaImages size={48} color="rgba(201,168,76,0.3)" style={{ marginBottom: '1rem' }} />
            <p style={{ fontFamily: "'Playfair Display', serif", color: 'rgba(255,255,255,0.4)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>No Photos Yet</p>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.3)', fontSize: '1rem' }}>
              Share the QR code with guests so they can upload photos from the reception.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
            {photos.map(photo => (
              <div key={photo.id} style={{ position: 'relative', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(201,168,76,0.15)', aspectRatio: '1', background: '#242424' }}
                onMouseEnter={e => e.currentTarget.querySelector('.photo-overlay').style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.querySelector('.photo-overlay').style.opacity = '0'}
              >
                <img
                  src={photo.file_url}
                  alt={`Wedding photo by ${photo.guest_name || 'guest'}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => { e.target.src = 'https://via.placeholder.com/300x300?text=Photo'; }}
                />
                <div className="photo-overlay" style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(26,26,26,0.7)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '12px', opacity: 0, transition: 'opacity 0.3s',
                }}>
                  {photo.guest_name && (
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '0.9rem', margin: 0, letterSpacing: '1px' }}>
                      by {photo.guest_name}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button onClick={() => setPreview(photo)} style={{
                      background: 'rgba(201,168,76,0.9)', border: 'none', borderRadius: '50%',
                      width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FaExpand size={14} color="#1a1a1a" />
                    </button>
                    <button onClick={() => handleDelete(photo)} style={{
                      background: 'rgba(248,81,73,0.9)', border: 'none', borderRadius: '50%',
                      width: '40px', height: '40px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FaTrash size={14} color="#fff" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {preview && (
        <div
          onClick={() => setPreview(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', cursor: 'zoom-out' }}
        >
          <img
            src={preview.file_url} alt="Preview"
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', borderRadius: '4px', border: '1px solid rgba(201,168,76,0.3)' }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;
