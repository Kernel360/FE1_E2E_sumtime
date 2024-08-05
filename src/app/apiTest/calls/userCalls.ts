import axios from 'axios';

export const createUser = async (email: string, password: string, nickname: string) => {
  const response = await axios.post('/api/user/create', { email, password, nickname });
  console.error(response);
  return response.data.userId;
};

export const getUserIdByEmail = async (email: string) => {
  const response = await axios.get(`/api/user/getIdByEmail?email=${encodeURIComponent(email)}`);
  return response.data.userId;
};

export const emailValidation = async (email: string) => {
  const response = await axios.get(`/api/user/emailValidation?email=${encodeURIComponent(email)}`);
  return response.data.isValid;
};

export const loginValidation = async (email: string, password: string) => {
  const response = await axios.post('/api/user/loginValidation', { email, password });
  return response.data.isValid;
};
