import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api'
});

// Add an interceptor to include the auth token
API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
export const productAPI = {
  create: (data: FormData) => API.post('/products', data),
  getAll: () => API.get('/products'),
  getOne: (id: string) => API.get(`/products/${id}`),
  update: (id: string, data: FormData) => API.put(`/products/${id}`, data),
  delete: (id: string) => API.delete(`/products/${id}`)
};