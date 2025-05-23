import axios from 'axios';

const API_BASE_URL = "https://miniproject-backend-1gy8.onrender.com";
const APP_BASE_URL = "/project_logistic";

const apiService = {
  async get(endpoint, params = {}) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
        params,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: false
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async post(endpoint, data) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: false
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async put(endpoint, data) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        withCredentials: false
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  async delete(endpoint) {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${API_BASE_URL}${endpoint}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: false
      });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  },

  handleError(error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = `${APP_BASE_URL}/login`;
          break;
        case 403:
          console.error('Forbidden: You do not have permission');
          break;
        case 404:
          console.error('Not Found: The requested resource does not exist');
          break;
        case 500:
          console.error('Server Error: Something went wrong');
          break;
        default:
          console.error('An error occurred:', error.response.data);
      }
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('Немає відповіді від сервера');
    } else {
      console.error('Error setting up request:', error.message);
      throw error;
    }
  }
};

export default apiService;