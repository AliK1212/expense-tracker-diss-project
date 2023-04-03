import React from 'react';
import { Typography } from '@material-ui/core';

const TotalBudgetAmount = ({ budgets }) => {
  const totalBudget = budgets.reduce((total, budget) => total + budget.amount, 0);

  return (
    <div>
      <Typography variant="h6">Total Budget Amount:</Typography>
      <Typography variant="body1">${totalBudget.toFixed(2)}</Typography>
    </div>
  );
};

export default TotalBudgetAmount;
