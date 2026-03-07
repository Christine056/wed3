import React, { useState, useEffect } from 'react';
import AdminNavbar from '../../Components/Admin/AdminNavbar';
import { getDashboardStats } from '../../Helpers/API/AdminApi';
import { FaUsers, FaHeart, FaTimes, FaCalendarCheck } from 'react-icons/fa';
import { GiRing } from 'react-icons/gi';
import QRCode from 'qrcode.react';

const StatCard = ({ icon, label, value, color }) => (
  <div style={{ background: '#242424', border: `1px solid ${color}33`, borderRadius: '4px', padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
    <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      {React.cloneElement(icon, { size: 24, color })}
    </div>
    <div>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.75rem', marginBottom: '4px' }}>{label}</p>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color, margin: 0, lineHeight: 1 }}>{value ?? '—'}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const uploadUrl = `${window.location.origin}/upload`;

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getDashboardStats();
        if (res.data) setStats(res.data);
      } catch (e) {
        setStats({ total_invited: 0, total_confirmed: 0, total_declined: 0, total_attended: 0 });
      } finally { setLoading(false); }
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#1a1a1a' }}>
      <AdminNavbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '0.5rem' }}>
            <GiRing color="#C9A84C" size={24} />
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#C9A84C', margin: 0 }}>Dashboard</h1>
          </div>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            Real-time wedding overview — Sofia & Marcus, June 14, 2025
          </p>
        </div>

        {/* Stats */}
        {loading ? (
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '3rem' }}>Loading statistics...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
            <StatCard icon={<FaUsers />} label="Total Invited" value={stats?.total_invited} color="#C9A84C" />
            <StatCard icon={<FaHeart />} label="Confirmed Attending" value={stats?.total_confirmed} color="#2ea043" />
            <StatCard icon={<FaTimes />} label="Declined" value={stats?.total_declined} color="#f85149" />
            <StatCard icon={<FaCalendarCheck />} label="Attended on Day" value={stats?.total_attended} color="#58a6ff" />
          </div>
        )}

        {/* Attendance Progress */}
        {stats && (
          <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '2rem', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#C9A84C', marginBottom: '1.5rem' }}>RSVP Progress</h2>
            <div>
              {[
                { label: 'Confirmed', value: stats.total_confirmed, total: stats.total_invited, color: '#2ea043' },
                { label: 'Declined', value: stats.total_declined, total: stats.total_invited, color: '#f85149' },
                { label: 'Pending', value: stats.total_invited - stats.total_confirmed - stats.total_declined, total: stats.total_invited, color: '#C9A84C' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '1.2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', letterSpacing: '1px' }}>{item.label}</span>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", color: item.color, fontSize: '0.9rem' }}>{item.value}/{item.total}</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '2px', height: '8px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.total ? (item.value / item.total) * 100 : 0}%`, background: item.color, borderRadius: '2px', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* QR Code Section */}
        <div style={{ background: '#242424', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '4px', padding: '2.5rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#C9A84C', marginBottom: '0.5rem' }}>Photo Upload QR Code</h2>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.5)', marginBottom: '2rem', fontSize: '1rem' }}>
            Display or print this QR code at the reception for guests to upload photos.
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ background: '#fff', padding: '16px', borderRadius: '4px', border: '3px solid #C9A84C' }}>
              <QRCode value={uploadUrl} size={150} level="H" />
            </div>
            <div>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: 'rgba(255,255,255,0.6)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                Scan to upload your wedding photos
              </p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '0.85rem', wordBreak: 'break-all' }}>
                {uploadUrl}
              </p>
              <button
                onClick={() => window.print()}
                style={{
                  marginTop: '1rem', background: 'transparent',
                  border: '1px solid #C9A84C', color: '#C9A84C',
                  padding: '8px 20px', cursor: 'pointer', borderRadius: '2px',
                  fontFamily: "'Cormorant Garamond', serif", fontSize: '0.85rem',
                  letterSpacing: '1.5px', textTransform: 'uppercase',
                }}
              >
                Print QR Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
