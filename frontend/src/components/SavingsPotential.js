import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';

const SavingsPotential = ({ budgets, expenses }) => {
  const savingsPotential = useMemo(() => {
    const categoryTotals = expenses.reduce((totals, expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      return totals;
    }, {});

    return budgets.reduce((total, budget) => {
      const categoryTotal = categoryTotals[budget.category] || 0;
      if (budget.amount > categoryTotal) {
        return total + (budget.amount - categoryTotal);
      }
      return total;
    }, 0);
  }, [budgets, expenses]);

  return (
    <div>
      <Typography variant="h6">Savings Potential:</Typography>
      <Typography variant="body1">${savingsPotential.toFixed(2)}</Typography>
    </div>
  );
};

export default SavingsPotential;
