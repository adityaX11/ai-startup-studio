// import axios from 'axios';

// const apiClient = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
//   timeout: 15000,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('ai-startup-studio-token');

//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error.response?.status;

//     if (status === 401) {
//       window.dispatchEvent(new CustomEvent('auth:expired'));
//     }

//     const normalizedError = new Error(
//       error.response?.data?.message ||
//         error.message ||
//         'Something went wrong while contacting the server.'
//     );

//     normalizedError.status = status;
//     normalizedError.code = error.code;

//     return Promise.reject(normalizedError);
//   }
// );

// export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default apiClient;


// NOTE---

// after create the backend then use this api code
// import apiClient from '@/services/apiClient.js';

// export async function getStartupProjects() {
//   const response = await apiClient.get('/startups');
//   return response.data;
// }