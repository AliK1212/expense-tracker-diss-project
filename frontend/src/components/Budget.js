import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Paper, Grid } from '@material-ui/core';
import BudgetList from './Lists/BudgetList';
import { getBudget } from './services/budgetService';


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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getBudget();
      setBudgets(response.data);
      setLoading(false);
    };

    fetchData();
  }, []);

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
            {loading ? (
              <Typography>Loading budgets...</Typography>
            ) : (
              <BudgetList budgets={budgets} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Budget;
