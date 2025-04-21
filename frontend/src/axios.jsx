import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request here (for example, add token to headers)
    // config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login page)
      // window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
