import React from 'react';
import { motion } from 'framer-motion';

const transactions = [
  { id: 1, description: 'Starbucks', amount: -5.75, category: 'Food' },
  { id: 2, description: 'Salary', amount: 2500, category: 'Income' },
  { id: 3, description: 'Netflix', amount: -15.99, category: 'Bills' },
  { id: 4, description: 'Gas', amount: -45.30, category: 'Transport' },
  { id: 5, description: 'Amazon', amount: -120.00, category: 'Shopping' },
];

const RecentTransactions = () => {
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