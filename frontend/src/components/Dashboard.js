import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const budgetsResponse = await axios.get('http://localhost:5000/api/budgets', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const expensesResponse = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setBudgets(budgetsResponse.data);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, [user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

return (
  <Container maxWidth="md" className={classes.container}>
    <Typography variant="h4" align="center">
      Dashboard
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Typography variant="h6">Budgets:</Typography>
          <ul>
            {budgets.map((budget) => (
              <li key={budget.id}>{budget.name}</li>
            ))}
          </ul>
          <Typography variant="h6">Expenses:</Typography>
          <ul>
            {expenses.map((expense) => (
              <li key={expense.id}>{expense.name}</li>
            ))}
          </ul>
        </Paper>
      </Grid>
    </Grid>
  </Container>
);
};

export default Dashboard;
