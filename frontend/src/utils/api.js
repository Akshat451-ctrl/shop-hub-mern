// API helper utilities

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://shop-hub-mern.onrender.com';

export const getProxiedImageUrl = (imageUrl) => {
  if (!imageUrl) return '';
  if (imageUrl.includes('/proxy?url=')) return imageUrl;
  if (imageUrl.startsWith('/') || imageUrl.includes(API_BASE_URL)) return imageUrl;
  return `${API_BASE_URL}/proxy?url=${encodeURIComponent(imageUrl)}`;
};

export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;
