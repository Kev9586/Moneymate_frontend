import React from 'react';
import { motion } from 'framer-motion';

const IconButton = ({ icon, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className="rounded-full p-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-primaryBlue"
      whileTap={{ scale: 0.9 }}
      whileHover={{ rotate: 15 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {icon}
    </motion.button>
  );
};

export default IconButton;