import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const trainsApi = {
  getAll: () => api.get('/trains'),
  getById: (id) => api.get(`/trains/${id}`),
};

export const bookingsApi = {
  getAll: () => api.get('/bookings'),
  getByTrain: (trainId) => api.get(`/bookings?trainId=${trainId}`),
  create: (booking) => api.post('/bookings', booking),
};

export default api;