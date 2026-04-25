import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import SnapUploadPage from './Pages/Guest/SnapUploadPage';

// Guest Pages
import GuestLogin from './Pages/Guest/GuestLogin';
import RSVPPage from './Pages/Guest/RSVPPage';
import WeddingHome from './Pages/Guest/WeddingHome';
import WeddingSchedule from './Pages/Guest/WeddingSchedule';
import Location from './Pages/Guest/Location';
import WhereToStay from './Pages/Guest/WhereToStay';
import FAQ from './Pages/Guest/FAQ';
import DressCode from './Pages/Guest/DressCode';
import LoveNote from './Pages/Guest/LoveNote';

// Admin Pages
import AdminLogin from './Pages/Admin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import GuestList from './Pages/Admin/GuestList';
import PhotoGallery from './Pages/Admin/PhotoGallery';

// Route Guards
const GuestRoute = ({ children }) => {
  const guest = sessionStorage.getItem('guest');
  const attended = sessionStorage.getItem('attended');
  if (!guest || !attended) return <Navigate to="/" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const admin = sessionStorage.getItem('admin');
  if (!admin) return <Navigate to="/admin" replace />;
  return children;
};

const RSVPRoute = ({ children }) => {
  const guest = sessionStorage.getItem('guest');
  if (!guest) return <Navigate to="/" replace />;
  return children;
};

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        toastStyle={{ background: '#242424', color: '#fff', border: '1px solid #C9A84C' }}
      />
      <Routes>
        {/* Guest Routes */}
        <Route path="/" element={<GuestLogin />} />
        <Route path="/rsvp" element={<RSVPRoute><RSVPPage /></RSVPRoute>} />
        <Route path="/home" element={<GuestRoute><WeddingHome /></GuestRoute>} />
        <Route path="/schedule" element={<GuestRoute><WeddingSchedule /></GuestRoute>} />
        <Route path="/location" element={<GuestRoute><Location /></GuestRoute>} />
        <Route path="/where-to-stay" element={<GuestRoute><WhereToStay /></GuestRoute>} />
        <Route path="/faq" element={<GuestRoute><FAQ /></GuestRoute>} />
        <Route path="/dress-code" element={<GuestRoute><DressCode /></GuestRoute>} />
        <Route path="/love-note" element={<GuestRoute><LoveNote /></GuestRoute>} />
        <Route path="/snap-upload" element={<GuestRoute><SnapUploadPage /></GuestRoute>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/guests" element={<AdminRoute><GuestList /></AdminRoute>} />
        <Route path="/admin/gallery" element={<AdminRoute><PhotoGallery /></AdminRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
