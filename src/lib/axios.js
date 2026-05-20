import axios from 'axios';

let apiURL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Proactive protocol check: If the configured URL is a bare domain, prepend https://
if (apiURL && apiURL !== '/api' && !apiURL.startsWith('http://') && !apiURL.startsWith('https://')) {
  apiURL = `https://${apiURL}`;
}

const api = axios.create({
  baseURL: apiURL,
  withCredentials: true,   // sends the HTTPOnly cookie on every request
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
