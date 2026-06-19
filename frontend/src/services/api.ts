import axios from 'axios';
import type { Product, ChatResponse } from '../types';

// Use /_/backend/api for Vercel production, fallback to localhost for development
const API_BASE_URL = import.meta.env.PROD ? '/_/backend/api' : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};

export const uploadProduct = async (formData: FormData): Promise<{ message: string; productId: string }> => {
  const response = await api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const chatWithAssistant = async (query: string): Promise<ChatResponse> => {
  const response = await api.post('/chat', { query });
  return response.data;
};

export const getImageUrl = (path: string) => {
  if (path.startsWith('data:')) {
    return path; // It's already a base64 data URI
  }
  
  if (import.meta.env.PROD) {
    return `/_/backend${path}`;
  }
  
  return `http://localhost:5000${path}`;
};
