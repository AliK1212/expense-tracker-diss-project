import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}));

const BudgetHealth = ({ budgets, expenses }) => {
  const classes = useStyles();

  const budgetHealth = budgets.map((budget) => {
    const budgetExpenses = expenses.filter(
      (expense) => expense.category === budget.category,
    );

    const totalSpent = budgetExpenses.reduce(
      (total, expense) => total + expense.amount,
      0,
    );

    const percentageSpent = (totalSpent / budget.amount) * 100;

    return {
      category: budget.category,
      percentage: percentageSpent,
    };
  });

  return (
    <div>
      <Typography variant="h6">Budget Health:</Typography>
      {budgetHealth.map((item, index) => (
        <div key={index}>
          <Typography variant="body1" display="inline">
            {item.category}:
          </Typography>
          {item.percentage <= 80 ? (
            <CheckCircleIcon className={classes.icon} color="primary" />
          ) : item.percentage <= 100 ? (
            <WarningIcon className={classes.icon} style={{ color: '#FFA500' }} />
          ) : (
            <ErrorIcon className={classes.icon} color="error" />
          )}
        </div>
      ))}
    </div>
  );
};

export default BudgetHealth;
