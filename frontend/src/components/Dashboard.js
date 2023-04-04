import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Container, Typography, Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import ExpenseDistributionPieChart from './ExpenseDistributionPieChart';
import BudgetInsights from './BudgetInsights';
import BarChart from './charts/BarChart';
import StackedBarChart from './charts/StackedBarChart';
import LineGraph from './charts/LineGraph';
import DateRangeFilter from './filters/DateRangeFilter';
import CategoryFilter from './filters/CategoryFilter';
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  sectionTitle: {
    paddingBottom: theme.spacing(2),
  },
  chartContainer: {
    minHeight: '300px',
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [chartType, setChartType] = useState('pie');
  const [dateFilter, setDateFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const budgetsResponse = await axios.get('http://localhost:5000/api/budgets', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        const expensesResponse = await axios.get('http://localhost:5000/api/expenses', {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        setBudgets(budgetsResponse.data);
        setExpenses(expensesResponse.data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, [user]);

  const handleChangeChartType = (event) => {
    setChartType(event.target.value);
  };

  const filteredChartData = useMemo(() => {
    const filteredExpenses = expenses.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const isDateInRange =
        dateFilter === 'all' ||
        (dateFilter === 'thisMonth' &&
          expenseDate.getMonth() === new Date().getMonth() &&
          expenseDate.getFullYear() === new Date().getFullYear()) ||
        (dateFilter === 'lastMonth' &&
          expenseDate.getMonth() === new Date().getMonth() - 1 &&
          expenseDate.getFullYear() === new Date().getFullYear());
  
      const isCategoryMatched =
        categoryFilter.length === 0 || categoryFilter.includes(expense.category);
  
      return isDateInRange && isCategoryMatched;
    });
  
    const chartData = filteredExpenses.reduce((acc, expense) => {
      const existingCategory = acc.find((item) => item.category === expense.category);
      if (existingCategory) {
        existingCategory.value += expense.amount;
      } else {
        acc.push({ category: expense.category, value: expense.amount });
      }
      return acc;
    }, []);
  
    return chartData;
  }, [expenses, dateFilter, categoryFilter]);

  const uniqueCategories = useMemo(() => {
    const categories = expenses.reduce((acc, expense) => {
      if (!acc.includes(expense.category)) {
        acc.push(expense.category);
      }
      return acc;
    }, []);
  
    return categories;
  }, [expenses]);
  

  const renderChart = () => {
    console.log('filteredChartData:', filteredChartData);
    switch (chartType) {
      case 'bar':
        return <BarChart data={filteredChartData} />;
      case 'stackedBar':
        return <StackedBarChart data={filteredChartData} />;
      case 'line':
        return <LineGraph data={filteredChartData} />;
      case 'pie':
      default:
        return <ExpenseDistributionPieChart data={filteredChartData} />;
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log("uniqueCategories:", uniqueCategories);

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h4" align="center" className={classes.sectionTitle}>
        Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Budgets Overview:
            </Typography>
            
            <ul>
              {budgets.map((budget) => (
                <li key={budget._id}>{budget.name}</li>
              ))}
            </ul>
            <Typography variant="h6" className={classes.sectionTitle}>
              Expenses Distribution:
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Chart Type</InputLabel>
                  <Select value={chartType} onChange={handleChangeChartType}>
                    <MenuItem value="pie">Pie Chart</MenuItem>
                    <MenuItem value="bar">Bar Chart</MenuItem>
                    <MenuItem value="stackedBar">Stacked Bar Chart</MenuItem>
                    <MenuItem value="line">Line Graph</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DateRangeFilter dateFilter={dateFilter} setDateFilter={setDateFilter} />
              </Grid>
              <Grid item xs={12}>
                <CategoryFilter 
                categoryFilter={categoryFilter} 
                setCategoryFilter={setCategoryFilter} 
                categories={uniqueCategories}
                />
              </Grid>
            </Grid>
            <div className={classes.chartContainer}>
              {renderChart()}
              
            </div>
            <BudgetInsights budgets={budgets} expenses={expenses} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;