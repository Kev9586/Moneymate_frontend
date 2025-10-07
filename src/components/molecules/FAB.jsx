import React from 'react';
import { motion } from 'framer-motion';

const FAB = ({ onClick, icon }) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-10 right-10 bg-primaryBlue text-white w-16 h-16 rounded-full flex items-center justify-center shadow-medium z-40"
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {icon || <span className="text-3xl">+</span>}
    </motion.button>
  );
};

export default FAB;