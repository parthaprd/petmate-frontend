import axios from 'axios';

let baseURL = process.env.NEXT_PUBLIC_API_URL || '/api';
if (baseURL && !baseURL.startsWith('http://') && !baseURL.startsWith('https://') && !baseURL.startsWith('/')) {
  baseURL = `https://${baseURL}`;
}

const api = axios.create({
  baseURL,
  withCredentials: true,
});

export default api;
