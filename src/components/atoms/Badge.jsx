import React from 'react';
import { motion } from 'framer-motion';

const Badge = ({ label, isNew = false }) => {
  return (
    <div className="relative">
      <span className="rounded-full bg-primaryGreen px-2 py-1 text-xs font-bold text-white">
        {label}
      </span>
      {isNew && (
        <motion.span
          className="absolute right-0 top-0 -mr-1 -mt-1 size-3 rounded-full bg-alertRed"
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