import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const ErrorScreen = ({ message, onRetry }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
        padding: 3,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {message || 'Something went wrong 😢'}
      </Typography>
      {onRetry && (
        <Button variant="contained" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </Box>
  );
};

export default ErrorScreen;