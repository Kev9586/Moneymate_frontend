import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const EmptyState = ({ message, illustration }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box
        sx={{
          textAlign: 'center',
          padding: 4,
          minHeight: '200px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {illustration && (
          <Box sx={{ mb: 2, width: '150px', height: '150px' }}>
            {illustration}
          </Box>
        )}
        <Typography variant="body1" color="text.secondary">
          {message || 'No data found.'}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default EmptyState;