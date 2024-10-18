import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem(
  'token',
)}`;

export default axios;
