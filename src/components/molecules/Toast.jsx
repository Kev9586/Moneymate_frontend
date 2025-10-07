import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Toast = ({ message, show, onDismiss }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 3000); // Auto-dismiss after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onDismiss]);

  const toastVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 100, opacity: 0 },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-10 left-1/2 z-50 -translate-x-1/2 rounded-lg bg-textDark px-6 py-3 text-white shadow-medium"
          variants={toastVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;