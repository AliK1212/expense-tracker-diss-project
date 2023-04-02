import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getBudget = async () => {
  const response = await axios.get(`${API_URL}/budget`);
  return response.data;
};

export const createBudget = async (budget) => {
  const response = await axios.post(`${API_URL}/budget`, budget);
  return response.data;
};

export const updateBudget = async (id, updatedBudget) => {
  const response = await axios.put(`${API_URL}/budget/${id}`, updatedBudget);
  return response.data;
};

export const deleteBudget = async (id) => {
  await axios.delete(`${API_URL}/budget/${id}`);
};
