import React from 'react';
import { motion } from 'framer-motion';

const RecentTransactions = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No recent transactions found.
      </div>
    );
  }

  return (
    <motion.div className="rounded-lg bg-gray-800 p-6">
      <h2 className="mb-4 text-lg font-semibold text-white">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div>
              <p className="font-semibold text-white">{transaction.description}</p>
              <p className="text-sm text-gray-400">{transaction.category}</p>
            </div>
            <p className={`font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RecentTransactions;