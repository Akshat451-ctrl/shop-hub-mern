import axios from 'axios';

const envBase = import.meta.env.VITE_API_URL || '';
let API_BASE_URL = envBase || 'https://shop-hub-mern.onrender.com';

// If envBase explicitly points to a localhost address but the site is running
// on a non-localhost origin (production), override to the known production backend.
try {
	if (envBase && envBase.includes('localhost') && typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
		// Fallback to the live backend if VITE_API_URL mistakenly uses localhost
		API_BASE_URL = 'https://shop-hub-mern.onrender.com';
	}
} catch (err) {
	// No-op if window is not available or any error occurs
}

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

// Request interceptor: rewrite any accidental localhost urls to the API_BASE_URL
axios.interceptors.request.use((config) => {
	try {
		const url = config.url || '';
		if (typeof url === 'string' && url.includes('http://localhost:5000')) {
			// Replace any hard-coded localhost with the proper API_BASE_URL
			config.url = url.replace('http://localhost:5000', API_BASE_URL);
			// Also ensure baseURL is correct
			config.baseURL = API_BASE_URL;
		}
	} catch (e) {
		// ignore
	}
	return config;
}, (error) => Promise.reject(error));

export default axios;
