import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// POST with FormData
export const postAPICallwithFile = async (endpoint, formData) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// GET with params
export const getWithParamsAPICall = async (endpoint, params = {}) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
  return response.data;
};

// Guest login by password
export const guestLogin = async (password) => {
  const fd = new FormData();
  fd.append('password', password);
  return await postAPICallwithFile('/guests/login', fd);
};

// Submit RSVP
export const submitRSVP = async (guestId, rsvpData) => {
  const fd = new FormData();
  fd.append('guest_id', guestId);
  fd.append('is_attending', rsvpData.is_attending);
  fd.append('children_count', rsvpData.children_count || 0);
  fd.append('plus_one_count', rsvpData.plus_one_count || 0);
  fd.append('message', rsvpData.message || '');
  return await postAPICallwithFile('/guests/rsvp', fd);
};

// Upload photo
export const uploadPhoto = async (guestId, file) => {
  const fd = new FormData();
  fd.append('guest_id', guestId);
  fd.append('photo', file);
  return await postAPICallwithFile('/photos/upload', fd);
};

// Get all photos
export const getPhotos = async () => {
  return await getWithParamsAPICall('/photos/list');
};
