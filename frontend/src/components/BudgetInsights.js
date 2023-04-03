import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  insightsItem: {
    textAlign: 'center',
  },
}));

const BudgetInsights = ({ budgets, expenses }) => {
  const classes = useStyles();
  const totalBudget = budgets.reduce((total, budget) => total + budget.amount, 0);
  const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
  const remainingBudget = totalBudget - totalExpenses;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} className={classes.insightsItem}>
        <Typography variant="h6">Budget Insights:</Typography>
      </Grid>
      <Grid item xs={4} className={classes.insightsItem}>
        <Typography>Total Budget:</Typography>
        <Typography variant="h5">${totalBudget.toFixed(2)}</Typography>
      </Grid>
      <Grid item xs={4} className={classes.insightsItem}>
        <Typography>Total Expenses:</Typography>
        <Typography variant="h5">${totalExpenses.toFixed(2)}</Typography>
      </Grid>
      <Grid item xs={4} className={classes.insightsItem}>
        <Typography>Remaining Budget:</Typography>
        <Typography variant="h5">${remainingBudget.toFixed(2)}</Typography>
      </Grid>
    </Grid>
  );
};

export default BudgetInsights;