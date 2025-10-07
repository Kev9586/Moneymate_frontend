import React from 'react';
import { motion } from 'framer-motion';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import { CheckCircleOutline, ErrorOutline, InfoOutlined, Close } from '@mui/icons-material';

const icons = {
  success: <CheckCircleOutline fontSize="inherit" />,
  error: <ErrorOutline fontSize="inherit" />,
  info: <InfoOutlined fontSize="inherit" />,
};

const Toast = ({ message, type = 'info', title, onClose }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      style={{
        width: '100%',
        maxWidth: '360px',
        margin: '8px',
      }}
    >
      <Alert
        severity={type}
        icon={icons[type]}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={onClose}
          >
            <Close fontSize="inherit" />
          </IconButton>
        }
        sx={{
          width: '100%',
          boxShadow: 3,
          borderRadius: 2,
          '.MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </motion.div>
  );
};

export default Toast;