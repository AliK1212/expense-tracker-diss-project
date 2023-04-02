import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

const BudgetList = ({ budgets }) => (
  <List>
    {budgets.map((budget) => (
      <ListItem key={budget.id}>
        <ListItemText primary={budget.name} secondary={`Amount: ${budget.amount}`} />
      </ListItem>
    ))}
  </List>
);

export default BudgetList;