import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      (error.code === 'ECONNABORTED'
        ? 'Connection timed out. Please try again.'
        : 'Unable to reach the registration server. Please try again.');

    return Promise.reject({
      message,
      error: error.response?.data?.error || 'REQUEST_FAILED',
      details: error.response?.data?.details || [],
      status: error.response?.status,
    });
  },
);

export async function submitRegistration(data) {
  const response = await api.post('/registrations', data);
  return response.data;
}

export default api;
