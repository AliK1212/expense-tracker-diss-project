import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthToken = () => {
  return `Bearer ${localStorage.getItem('token')}`;
};

export const getBudget = async () => {
  const response = await axios.get(`${API_URL}/budgets`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
  return response.data;
};

export const createBudget = async (budget) => {
  const response = await axios.post(`${API_URL}/budgets`, budget, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
  return response.data;
};

export const updateBudget = async (id, updatedBudget) => {
  const response = await axios.put(`${API_URL}/budgets/${id}`, updatedBudget, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
  return response.data;
};

export const deleteBudget = async (id) => {
  await axios.delete(`${API_URL}/budgets/${id}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
};
