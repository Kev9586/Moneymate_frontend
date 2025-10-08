import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const AccountCarousel = ({ accounts }) => {
  if (!accounts || accounts.length === 0) {
    return (
      <div className="text-center text-gray-400">
        No accounts found. Add one to get started!
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-lg font-semibold text-white">Your Accounts</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {accounts.map((account, index) => (
          <motion.div
            key={account.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25, delay: index * 0.1 }}
            className="w-64 shrink-0 rounded-lg bg-gray-800 p-4"
          >
            <div className="mb-2 flex items-center">
              <Image src={account.logo || '/logos/default.svg'} alt={account.name} width={32} height={32} className="mr-3" />
              <h3 className="font-bold text-white">{account.name}</h3>
            </div>
            <p className="text-2xl font-bold text-green-400">${account.balance.toLocaleString()}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AccountCarousel;