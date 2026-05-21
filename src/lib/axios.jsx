import axios from 'axios';


let apiURL = '/backend-api';

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,   
});


api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('paw_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});


api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      
      if (typeof window !== 'undefined') {
        localStorage.removeItem('paw_user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
