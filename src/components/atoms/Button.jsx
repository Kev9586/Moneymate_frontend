import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', size = 'base', disabled = false, onClick }) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-semibold transition-all duration-300';

  const variants = {
    primary: 'bg-primaryBlue text-white hover:bg-opacity-90',
    secondary: 'bg-primaryGreen text-white hover:bg-opacity-90',
    outline: 'border border-primaryBlue text-primaryBlue hover:bg-primaryBlue hover:text-white',
  };

  const disabledStyles = 'opacity-50 cursor-not-allowed';

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabled ? disabledStyles : ''}`}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.button>
  );
};

export default Button;