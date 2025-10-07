import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ label, isNew = false }) => {
  return (
    <div className="relative">
      <span className="px-2 py-1 bg-primaryGreen text-white text-xs font-bold rounded-full">
        {label}
      </span>
      {isNew && (
        <motion.span
          className="absolute top-0 right-0 -mt-1 -mr-1 h-3 w-3 bg-alertRed rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}
    </div>
  );
};

export default Badge;