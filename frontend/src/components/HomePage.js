import React from 'react';
import { Container, Typography, Box, Paper, Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  description: {
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(2),
  },
  section: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" align="center" className={classes.title}>
        Welcome to Expense Tracker
      </Typography>
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center" className={classes.description}>
          Expense Tracker is a simple and user-friendly application designed to help you manage your expenses and budget.
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center">
              <img src="expense1.png" alt="expense tracker" width="80%" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="div">
              With Expense Tracker, you can:
              <ul>
                  <li>Monitor your daily, weekly, and monthly expenses</li>
                  <li>Create a personalized budget plan</li>
                  <li>Set financial goals and track your progress</li>
                  <li>Analyze your spending habits and make informed decisions</li>
                </ul>
            </Typography>
            <Box display="flex" justifyContent="center">
              <Button
                component={RouterLink}
                to="/signup"
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Get started for free
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box className={classes.section}>
        <Typography variant="h5" align="center" className={classes.title}>
          Features
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <img src="tracking.jpg" alt="Feature 1" width="90%" />
              <Typography variant="h6">Track Expenses</Typography>
              <Typography variant="body1">
                Easily record and categorize your expenses to stay on top of your spending.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <img src="expense2.png" alt="Feature 2" width="55%" />
              <Typography variant="h6">Budget Planning</Typography>
              <Typography variant="body1">
                Create a budget plan that suits your financial goals and lifestyle.
                </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src="expense3.jpg" alt="Feature 3" width="90%" />
          <Typography variant="h6">Financial Goals</Typography>
          <Typography variant="body1">
            Set and track financial goals to help you stay focused and motivated.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img src="expense4.jpg" alt="Feature 4" width="70%" />
          <Typography variant="h6">Insights & Analytics</Typography>
          <Typography variant="body1">
            Analyze your spending habits and discover ways to optimize your expenses.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Box>
  <Box className={classes.section}>
    <Typography variant="h5" align="center" className={classes.title}>
      Why Choose Expense Tracker?
    </Typography>
    <Typography variant="body1" className={classes.description}>
      Expense Tracker is a powerful tool that can help you take control of your finances. By providing a comprehensive overview of your spending habits, it enables you to make informed decisions and achieve your financial goals. Whether you're looking to save for a major purchase, pay off debt, or simply live within your means, Expense Tracker is here to support you every step of the way.
    </Typography>
    <Box display="flex" justifyContent="center">
      <Button
        component={RouterLink}
        to="/signup"
        variant="contained"
        color="primary"
        className={classes.button}>
        Join us today
      </Button>
    </Box>
  </Box>
</Container>
);
};

export default HomePage;