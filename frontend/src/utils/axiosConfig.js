import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://shop-hub-mern.onrender.com';
axios.defaults.baseURL = API_BASE_URL;

// Response interceptor to handle 401 Unauthorized globally
axios.interceptors.response.use(
	(response) => response,
	(error) => {
		const status = error?.response?.status;
		if (status === 401) {
			// Clear token and user data on 401 to avoid infinite failures
			localStorage.removeItem('token');
			localStorage.removeItem('user');
			// Force a reload so UI returns to public state
			try { window.location.reload(); } catch (e) { /* no-op in non-browser contexts */ }
		}
		return Promise.reject(error);
	}
);

export default axios;
