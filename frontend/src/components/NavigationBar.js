import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const NavigationBar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  return (
    <AppBar position="static" style={{ backgroundColor: '#FFA500' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ flexGrow: 1, textDecoration: 'none', color: 'black' }}
        >
          Expense Tracker
        </Typography>
        {isAuthenticated && (
          <>
            <Button color="inherit" component={Link} to="/dashboard" style={{ color: 'black' }}>
              Dashboard
            </Button>
            <Button color="inherit" component={Link} to="/expenses" style={{ color: 'black' }}>
              Expenses
            </Button>
            <Button color="inherit" component={Link} to="/budget" style={{ color: 'black' }}>
              Budget
            </Button>
            <Button color="inherit" component={Link} to="/settings" style={{ color: 'black' }}>
              Settings
            </Button>
          </>
        )}
        {!isAuthenticated ? (
          <>
            <Button color="inherit" component={Link} to="/login" style={{ color: 'black' }}>
              Login
            </Button>
            <Button color="inherit" component={Link} to="/signup" style={{ color: 'black' }}>
              Signup
            </Button>
          </>
        ) : (
          <Button color="inherit" onClick={logout} style={{ color: 'black' }}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
