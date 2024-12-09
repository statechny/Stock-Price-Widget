import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const apiClient = axios.create({ baseURL });

// Add an interceptor to log errors
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     console.error('API Error:', error.response || error.message || error);
//     return Promise.reject(error);
//   }
// );
