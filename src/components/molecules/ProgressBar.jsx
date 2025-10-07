import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ progress = 0, isOverBudget = false }) => {
  const barColor = isOverBudget ? 'bg-red-500' : 'bg-green-500';

  const pulseAnimation = isOverBudget
    ? {
        scale: [1, 1.02, 1],
        transition: {
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut"
        },
      }
    : {};

  return (
    <div className="h-2.5 w-full rounded-full bg-gray-700">
      <motion.div
        className={`h-2.5 rounded-full ${barColor}`}
        initial={{ width: '0%' }}
        animate={{ width: `${progress > 100 ? 100 : progress}%`, ...pulseAnimation }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      />
    </div>
  );
};

export default ProgressBar;