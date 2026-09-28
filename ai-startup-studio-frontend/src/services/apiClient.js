import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Later: clear auth state and redirect to login.
    }

    return Promise.reject(error);
  }
);

export default apiClient;


// NOTE---

// after create the backend then use this api code
// import apiClient from '@/services/apiClient.js';

// export async function getStartupProjects() {
//   const response = await apiClient.get('/startups');
//   return response.data;
// }