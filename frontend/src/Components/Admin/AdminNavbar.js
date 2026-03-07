import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GiRing } from 'react-icons/gi';
import { clearAdminSession } from '../../Helpers/Utilities/Common';

const AdminNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAdminSession();
    navigate('/admin');
  };

  const links = [
    { path: '/admin/dashboard', label: 'Dashboard' },
    { path: '/admin/guests', label: 'Guest List' },
    { path: '/admin/gallery', label: 'Photo Gallery' },
  ];

  return (
    <nav style={{
      background: '#1a1a1a',
      borderBottom: '1px solid rgba(201,168,76,0.3)',
      padding: '0 2rem',
      position: 'sticky', top: 0, zIndex: 1000,
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '65px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <GiRing size={22} color="#C9A84C" />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', color: '#C9A84C' }}>
            Wedding Admin
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {links.map(link => (
            <Link key={link.path} to={link.path} style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '0.85rem', letterSpacing: '1.5px', textTransform: 'uppercase',
              textDecoration: 'none',
              color: location.pathname === link.path ? '#C9A84C' : 'rgba(255,255,255,0.7)',
              borderBottom: location.pathname === link.path ? '1px solid #C9A84C' : '1px solid transparent',
              paddingBottom: '2px',
            }}>
              {link.label}
            </Link>
          ))}
          <button onClick={handleLogout} style={{
            background: 'transparent', border: '1px solid #C9A84C',
            color: '#C9A84C', padding: '6px 16px', cursor: 'pointer',
            fontFamily: "'Cormorant Garamond', serif", fontSize: '0.8rem',
            letterSpacing: '1.5px', textTransform: 'uppercase', borderRadius: '2px',
          }}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
