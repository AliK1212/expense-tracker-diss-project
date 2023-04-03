import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import ExpenseDistributionPieChart from './ExpenseDistributionPieChart';
import BudgetInsights from './BudgetInsights';
import TotalBudgetAmount from './TotalBudgetAmount';
import TopExpenseCategories from './TopExpenseCategories';
import SavingsPotential from './SavingsPotential';
import BudgetHealth from './BudgetHealth';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  sectionTitle: {
    paddingBottom: theme.spacing(2),
  },
  pieChartContainer: {
    minHeight: '300px',
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

  const pieChartData = useMemo(() => {
    const expenseData = expenses.reduce((acc, expense) => {
      const index = acc.findIndex((item) => item.category === expense.category);
  
      if (index !== -1) {
        acc[index].value += expense.amount;
      } else {
        acc.push({ category: expense.category, value: expense.amount });
      }
  
      return acc;
    }, []);
  
    return expenseData;
  }, [expenses]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" align="center" className={classes.sectionTitle}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Budgets Overview:
            </Typography>
            <TotalBudgetAmount budgets={budgets} />
            <SavingsPotential budgets={budgets} expenses={expenses} />
            <BudgetHealth budgets={budgets} expenses={expenses} />
            <ul>
              {budgets.map((budget) => (
                <li key={budget._id}>{budget.name}</li>
              ))}
            </ul>
            <Typography variant="h6" className={classes.sectionTitle}>
              Expenses Distribution:
            </Typography>
            <TopExpenseCategories expenses={expenses} />
            <div className={classes.pieChartContainer}>
              <ExpenseDistributionPieChart data={pieChartData} />
            </div>
            <BudgetInsights budgets={budgets} expenses={expenses} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;