import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { Button, ButtonGroup, Box } from '@mui/material';
import AccountCarousel from '../components/organisms/AccountCarousel';
import BalanceSummary from '../components/organisms/BalanceSummary';
import RecentTransactions from '../components/organisms/RecentTransactions';
import MainLayout from '../layouts/MainLayout';
import FAB from '../components/molecules/FAB';
import LoadingState from '../components/molecules/LoadingState';
import EmptyState from '../components/molecules/EmptyState';
import ErrorState from '../components/molecules/ErrorState';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const [status, setStatus] = useState('success'); // 'loading', 'success', 'empty', 'error'
  const { addToast } = useToast();

  const handleSetStatus = (newStatus) => {
    setStatus(newStatus);
    if (newStatus === 'success') {
      addToast({ type: 'success', message: 'Data loaded successfully! 🎉' });
    } else if (newStatus === 'error') {
      addToast({ type: 'error', message: 'Failed to load data.' });
    }
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <LoadingState message="Fetching your financial data..." />;
      case 'empty':
        return <EmptyState message="No transactions yet. Add one to get started!" />;
      case 'error':
        return (
          <ErrorState
            message="We couldn't fetch your data."
            onRetry={() => handleSetStatus('loading')}
          />
        );
      case 'success':
      default:
        return (
          <>
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
          </>
        );
    }
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-start justify-between mb-6"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">Hello, Keval 👋</h1>
            <p className="text-gray-400">{new Date().toDateString()}</p>
          </div>
          <ButtonGroup variant="contained" size="small">
            <Button onClick={() => handleSetStatus('loading')}>Loading</Button>
            <Button onClick={() => handleSetStatus('success')}>Success</Button>
            <Button onClick={() => handleSetStatus('empty')}>Empty</Button>
            <Button onClick={() => handleSetStatus('error')}>Error</Button>
          </ButtonGroup>
        </motion.header>

        <Box sx={{ minHeight: '400px' }}>
          {renderContent()}
        </Box>

        <FAB icon={<FiPlus size={24} />} onClick={() => addToast({ type: 'info', message: 'Add new transaction!' })} />
      </div>
    </MainLayout>
  );
};

export default Dashboard;