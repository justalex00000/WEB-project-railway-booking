import axios from 'axios';
import { trainsData, getTrainById } from '../data/trains';

const API_BASE_URL = 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const trainsApi = {
  getAll: () => {
    return Promise.resolve({ data: trainsData });
  },
  getById: (id) => {
    const train = getTrainById(id);
    return Promise.resolve({ data: train });
  },
};

export const bookingsApi = {
  getAll: () => api.get('/bookings'),
  getByTrain: (trainId) => api.get(`/bookings?trainId=${trainId}`),
  create: (booking) => api.post('/bookings', booking),
};

export default api;