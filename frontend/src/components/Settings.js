import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';

const Settings = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Settings
      </Typography>
      {}
    </Container>
  );
};

export default Settings;
