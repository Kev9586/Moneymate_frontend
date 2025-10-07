import React from 'react';
import { motion } from 'framer-motion';

const FAB = ({ onClick, icon }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-10 right-10 z-40 flex size-16 items-center justify-center rounded-full bg-primaryBlue text-white shadow-medium"
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {icon || <span className="text-3xl">+</span>}
    </motion.button>
  );
};

export default FAB;