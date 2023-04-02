import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Authorization': `Bearer ${token}`,
  };
};


export const getAllExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses`, { headers: getAuthHeaders() });
  return response.data;
};

export const createExpense = async (expense) => {
  const response = await axios.post(`${API_URL}/expenses`, expense, { headers: getAuthHeaders() });
  return response.data;
};

export const updateExpense = async (id, updatedExpense) => {
  const response = await axios.put(`${API_URL}/expenses/${id}`, updatedExpense, { headers: getAuthHeaders() });
  return response.data;
};

export const deleteExpense = async (id) => {
  await axios.delete(`${API_URL}/expenses/${id}`, { headers: getAuthHeaders() });
};

export const getCategories = async () => {
  const response = await axios.get(`${API_URL}/expenses/categories`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};


