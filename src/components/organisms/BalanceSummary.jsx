import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';

const BalanceSummary = ({ summary }) => {
  const { income = 0, expenses = 0 } = summary || {};

  return (
    <motion.div className="rounded-lg bg-gray-800 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Balance Summary</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-green-500/20 p-2">
            <FiArrowUp className="text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Income</p>
            <p className="text-xl font-bold text-white">${income.toLocaleString()}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="rounded-full bg-red-500/20 p-2">
            <FiArrowDown className="text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Expenses</p>
            <p className="text-xl font-bold text-white">${expenses.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceSummary;