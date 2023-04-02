import React from 'react';
import { List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';

const ExpenseList = ({ expenses, onUpdate, onDelete }) => {
  const handleEdit = (expense) => {
  };

  const handleDelete = async (expenseId) => {
    await onDelete(expenseId);
  };

  return (
    <List>
      {expenses.map((expense) => (
        <ListItem key={expense._id}>
          <ListItemText primary={expense.description} secondary={`Amount: ${expense.amount}, Date: ${new Date(expense.date).toLocaleDateString()}, Category: ${expense.category}`} />
          <IconButton onClick={() => handleEdit(expense)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(expense._id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default ExpenseList;
