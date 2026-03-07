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

export const uploadPhoto = async (guestId, file) => {
  const fd = new FormData();
  fd.append('guest_id', guestId);
  fd.append('photo', file);
  return await postAPICallwithFile('/photos/upload', fd);
};

export const getAllPhotos = async () => {
  return await getWithParamsAPICall('/photos/list');
};

export const deletePhoto = async (id) => {
  const fd = new FormData();
  fd.append('id', id);
  return await postAPICallwithFile('/photos/delete', fd);
};
