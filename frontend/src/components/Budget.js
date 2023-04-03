import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper, Grid } from '@material-ui/core';
import BudgetList from './Lists/BudgetList';
import BudgetForm from './BudgetForm';
import { getBudget, createBudget, updateBudget, deleteBudget } from './services/budgetService';
import { getAllExpenses } from './services/expenseService';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const Budget = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBudget();
      setBudgets(response);
      setLoading(false);
    };
    const fetchExpenses = async () => {
      const response = await getAllExpenses();
      setExpenses(response);
    };

    fetchData();
    fetchExpenses();
  }, []);

  const handleCreateBudget = async (budget) => {
    const newBudget = await createBudget(budget);
    setBudgets([...budgets, newBudget]);
  };

  const handleUpdateBudget = async (id, updatedBudget) => {
    const updated = await updateBudget(id, updatedBudget);
    setBudgets(budgets.map((budget) => (budget._id === id ? updated : budget)));
    setSelectedBudget(null);
  };

  const handleDeleteBudget = async (id) => {
    await deleteBudget(id);
    setBudgets(budgets.filter((budget) => budget._id !== id));
  };

  const totalExpensesByCategory = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const averageMonthlyExpensesByCategory = (category) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const filteredExpenses = expenses.filter(
      (expense) =>
        expense.category === category &&
        new Date(expense.date).getFullYear() === currentYear &&
        new Date(expense.date).getMonth() + 1 === currentMonth
    );
  
    const totalExpenses = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
    return totalExpenses / currentMonth;
  };

  const percentageSpentByCategory = (category) => {
    const totalExpenses = totalExpensesByCategory(category);
    const budgetAmount = budgets.find((budget) => budget.category === category)?.amount || 0;
  
    if (budgetAmount === 0) {
      return 0;
    }
    
    return ((totalExpenses / budgetAmount) * 100).toFixed(2);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" align="center">
        Budget
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <BudgetForm
              onCreateBudget={handleCreateBudget}
              onUpdateBudget={handleUpdateBudget}
              selectedBudget={selectedBudget}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {loading ? (
              <Typography>Loading budgets...</Typography>
            ) : (
              <BudgetList
                budgets={budgets}
                onEditBudget={setSelectedBudget}
                onDeleteBudget={handleDeleteBudget}
                totalExpensesByCategory={totalExpensesByCategory}
                averageMonthlyExpensesByCategory={averageMonthlyExpensesByCategory}
                percentageSpentByCategory={percentageSpentByCategory}

              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Budget;
