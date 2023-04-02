import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CssBaseline, Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import Expenses from './components/Expenses';
import Budget from './components/Budget';
import Settings from './components/Settings';
import NavigationBar from './components/NavigationBar';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import HomePage from './components/HomePage';
import Dashboard from './components/Dashboard';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500', 
    },
    secondary: {
      main: '#000000', 
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavigationBar />
        <Container maxWidth="md" style={{ paddingTop: '16px', paddingBottom: '16px' }}>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
