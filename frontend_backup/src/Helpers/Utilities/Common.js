// Common utility functions

export const setGuestSession = (guestData) => {
  sessionStorage.setItem('guest', JSON.stringify(guestData));
};

export const getGuestSession = () => {
  const data = sessionStorage.getItem('guest');
  return data ? JSON.parse(data) : null;
};

export const clearGuestSession = () => {
  sessionStorage.removeItem('guest');
  sessionStorage.removeItem('attended');
};

export const setAdminSession = (adminData) => {
  sessionStorage.setItem('admin', JSON.stringify(adminData));
};

export const getAdminSession = () => {
  const data = sessionStorage.getItem('admin');
  return data ? JSON.parse(data) : null;
};

export const clearAdminSession = () => {
  sessionStorage.removeItem('admin');
};

export const setAttended = () => {
  sessionStorage.setItem('attended', 'true');
};

export const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
};
