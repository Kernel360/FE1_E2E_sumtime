import axios from 'axios';

export const createUser = async (email: string, password: string, nickname: string) => {
  const response = await axios.post('/api/user/create', { email, password, nickname });
  return response.data;
};

export const getUserIdByEmail = async (email: string) => {
  const response = await axios.get(`/api/user/getIdByEmail?email=${encodeURIComponent(email)}`);
  return response.data.userId;
};
