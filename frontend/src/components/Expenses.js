import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import AddExpense from './AddExpense';
import ExpenseList from './Lists/ExpenseList';
import { getAllExpenses, createExpense, updateExpense, deleteExpense } from './services/expenseService';

const Expenses = () => {
  const { user } = useContext(AuthContext);
  const [expenses, setExpenses] = useState([]);
  
  useEffect(() => {
    const fetchExpenses = async () => {
      const fetchedExpenses = await getAllExpenses();
      setExpenses(fetchedExpenses);
    };
    fetchExpenses();
  }, []);

  const handleAddExpense = async (expense) => {
    
    const newExpense = await createExpense(expense);
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = async (id) => {
    await deleteExpense(id);
    setExpenses(expenses.filter((expense) => expense._id !== id));
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Expenses
      </Typography>
      <AddExpense onAdd={handleAddExpense} />
      <ExpenseList
        expenses={expenses}
        onUpdate={updateExpense}
        onDelete={handleDeleteExpense}
      />
    </Container>
  );
};

export default Expenses;
