import React, { useState } from 'react';
import { Button, TextField, Grid, InputLabel, Select, MenuItem } from '@material-ui/core';

const AddExpense = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [otherCategory, setOtherCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ description, amount: parseFloat(amount), category: category === 'Other' ? otherCategory : category, date });
    setDescription('');
    setAmount('');
    setCategory('');
    setOtherCategory('');
    setDate('');
  };

  const categories = [
    'Groceries',
    'Utilities',
    'Rent',
    'Transportation',
    'Entertainment',
    'Health',
    'Insurance',
    'Savings & Investments',
    'Dining Out',
    'Shopping',
    'Other',
  ];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            required
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        {category === 'Other' && (
          <Grid item xs={12} sm={6}>
            <TextField
              label="Other Category"
              value={otherCategory}
              onChange={(e) => setOtherCategory(e.target.value)}
              fullWidth
              required
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6}>
          <TextField
            required
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add Expense
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddExpense;
