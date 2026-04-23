import api from '../api/axiosInstance';

export const registerUser = async (email: string, password: string) => {
  const res = await api.post('/users/register', { email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post('/users/login', { email, password });
  return res.data;
};

export const getPaginatedUsers = async (page: number = 1, limit: number = 10, search: string = '') => {
  const res = await api.get('/users', { params: { page, limit, search } });
  return res.data;
};