import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // NEVER remove — sends HTTPOnly cookie to backend
});

export default api;
