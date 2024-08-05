import axios from 'axios';

const getUserIdByEmail = async (email: string) => {
  const response = await axios.get(`/api/user/getIdByEmail?email=${encodeURIComponent(email)}`);
  return response.data.userId;
};

export default getUserIdByEmail;
