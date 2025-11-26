import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://shop-hub-mern.onrender.com';
axios.defaults.baseURL = API_BASE_URL;

export default axios;
