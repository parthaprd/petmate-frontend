import axios from 'axios';

// Hardcoding to use the Next.js proxy to bypass CORS
let apiURL = '/backend-api';

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,   // sends the HTTPOnly cookie on every request
});

// Intercept requests to add the Authorization token from localStorage
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('paw_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Intercept 401 globally — redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear local user state and redirect
      if (typeof window !== 'undefined') {
        localStorage.removeItem('paw_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
