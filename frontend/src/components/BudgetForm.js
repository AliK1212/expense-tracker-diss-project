import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Select, InputLabel, MenuItem } from '@material-ui/core';
import { getCategories } from './services/expenseService';

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(3),
  },
}));

const BudgetForm = ({ onCreateBudget, onUpdateBudget, selectedBudget}) => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(selectedBudget?.category || '');
  const [amount, setAmount] = useState(selectedBudget?.amount || '');

  useEffect(() => {
    if (selectedBudget) {
      setCategory(selectedBudget.category);
      setAmount(selectedBudget.amount);
    } else {
      setCategory('');
      setAmount('');
      }
}, [selectedBudget]);


  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      setCategories(response);
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const budgetData = { category, amount: Number(amount) };
    if (selectedBudget) {
      onUpdateBudget(selectedBudget._id, budgetData);
    } else {
      onCreateBudget(budgetData);
    }
    setCategory('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            fullWidth
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            {selectedBudget ? 'Update Budget' : 'Create Budget'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default BudgetForm;
