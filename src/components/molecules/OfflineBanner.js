import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Typography } from '@mui/material';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

const OfflineBanner = () => {
  const isOnline = useNetworkStatus();

  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1500,
            backgroundColor: '#ffcc00',
            padding: '12px',
            textAlign: 'center',
          }}
        >
          <Typography variant="body1" sx={{ color: '#000' }}>
            You’re offline. Some features may be unavailable.
          </Typography>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineBanner;