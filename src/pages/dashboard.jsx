import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import AccountCarousel from '../components/organisms/AccountCarousel';
import BalanceSummary from '../components/organisms/BalanceSummary';
import RecentTransactions from '../components/organisms/RecentTransactions';
import MainLayout from '../layouts/MainLayout';
import FAB from '../components/molecules/FAB';

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-bold text-white">Hello, Keval 👋</h1>
          <p className="text-gray-400">{new Date().toDateString()}</p>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AccountCarousel />
        </motion.div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <BalanceSummary />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="lg:col-span-1"
          >
            <RecentTransactions />
          </motion.div>
        </div>

        <FAB icon={<FiPlus size={24} />} onClick={() => { /* TODO: Add transaction modal */ }} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;