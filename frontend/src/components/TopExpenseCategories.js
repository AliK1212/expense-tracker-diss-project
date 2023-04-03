import React, { useMemo } from 'react';
import { Typography } from '@material-ui/core';

const TopExpenseCategories = ({ expenses }) => {
  const topCategories = useMemo(() => {
    const categoryTotals = expenses.reduce((totals, expense) => {
      totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
      return totals;
    }, {});

    return Object.entries(categoryTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category, amount]) => ({ category, amount }));
  }, [expenses]);

  return (
    <div>
      <Typography variant="h6">Top 3 Expense Categories:</Typography>
      <ul>
        {topCategories.map((item, index) => (
          <li key={index}>
            <Typography variant="body1">
              {item.category}: ${item.amount.toFixed(2)}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopExpenseCategories;
