import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { Box } from '@mui/material';
import Toast from '../atoms/Toast';

const ToastManager = ({ toasts, removeToast }) => {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
      }}
    >
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </Box>
  );
};

export default ToastManager;