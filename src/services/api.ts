// api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/'
});

API.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (user.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export const productAPI = {
  create: (data) => API.post('products', data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  getAll: () => API.get('products'),
  getOne: (id) => API.get(`products/${id}`),
  update: (id, data) => API.put(`products/${id}`, data),
  delete: (id) => API.delete(`products/${id}`),
  buyProduct: (productId) => API.post(`products/${productId}/buy`),
};












// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:3000/'
// });

// // Add an interceptor to include the auth token
// API.interceptors.request.use((config) => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
//   if (user.token) {
//     config.headers.Authorization = `Bearer ${user.token}`;
//   }
//   return config;
// });
// export const productAPI = {
//   create: (data: FormData) => API.post('products', data, {
//     headers: {
//       'Content-Type': 'multipart/form-data'
//     }
//   }),
//   getAll: () => API.get('products'),
//   getOne: (id: string) => API.get(`products/${id}`),
//   update: (id: string, data: FormData) => API.put(`products/${id}`, data),
//   delete: (id: string) => API.delete(`products/${id}`)
// };

