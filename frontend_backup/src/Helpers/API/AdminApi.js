import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const postAPICallwithFile = async (endpoint, formData) => {
  const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getWithParamsAPICall = async (endpoint, params = {}) => {
  const response = await axios.get(`${BASE_URL}${endpoint}`, { params });
  return response.data;
};

// Admin login
export const adminLogin = async (username, password) => {
  const fd = new FormData();
  fd.append('username', username);
  fd.append('password', password);
  return await postAPICallwithFile('/admins/login', fd);
};

// Dashboard stats
export const getDashboardStats = async () => {
  return await getWithParamsAPICall('/admins/stats');
};

// Guest CRUD
export const getAllGuests = async (filter = '') => {
  return await getWithParamsAPICall('/guests/list', { filter });
};

export const addGuest = async (guestData) => {
  const fd = new FormData();
  Object.keys(guestData).forEach(k => fd.append(k, guestData[k]));
  return await postAPICallwithFile('/guests/add', fd);
};

export const updateGuest = async (guestData) => {
  const fd = new FormData();
  Object.keys(guestData).forEach(k => fd.append(k, guestData[k]));
  return await postAPICallwithFile('/guests/update', fd);
};

export const deleteGuest = async (id) => {
  const fd = new FormData();
  fd.append('id', id);
  return await postAPICallwithFile('/guests/delete', fd);
};
