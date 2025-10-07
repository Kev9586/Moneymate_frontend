import React from 'react';
import { motion } from 'framer-motion';

const Chip = ({ label, selected = false, onSelect }) => {
  return (
    <motion.div
      onClick={onSelect}
      className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-colors duration-300 ${
        selected ? 'bg-primaryBlue text-white' : 'bg-gray-200 text-gray-700'
      }`}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      {label}
    </motion.div>
  );
};

export default Chip;