import React from 'react';
import { motion } from 'framer-motion';
import { FiPlus } from 'react-icons/fi';
import { Box } from '@mui/material';
import useSWR, { mutate } from 'swr';
import AccountCarousel from '../components/organisms/AccountCarousel';
import BalanceSummary from '../components/organisms/BalanceSummary';
import RecentTransactions from '../components/organisms/RecentTransactions';
import MainLayout from '../layouts/MainLayout';
import FAB from '../components/molecules/FAB';
import LoadingState from '../components/molecules/LoadingState';
import EmptyState from '../components/molecules/EmptyState';
import ErrorState from '../components/molecules/ErrorState';
import { useToast } from '../context/ToastContext';
import { fetcher } from '../utils/fetcher';

const Dashboard = () => {
  const { data: accountsData, error: accountsError } = useSWR('/accounts', fetcher);
  const { data: summaryData, error: summaryError } = useSWR('/summary', fetcher);
  const { data: transactionsData, error: transactionsError } = useSWR('/transactions?limit=5', fetcher);

  const { addToast } = useToast();

  const isLoading = !accountsData && !accountsError && !summaryData && !summaryError && !transactionsData && !transactionsError;
  const isError = accountsError || summaryError || transactionsError;

  const handleRetry = () => {
    if (accountsError) mutate('/accounts');
    if (summaryError) mutate('/summary');
    if (transactionsError) mutate('/transactions?limit=5');
  };

  const renderContent = () => {
    if (isLoading) return <LoadingState message="Fetching your financial data..." />;
    if (isError) return <ErrorState message="We couldn't fetch your data." onRetry={handleRetry} />;

    const accounts = accountsData?.accounts || [];
    const summary = summaryData?.summary || null;
    const transactions = transactionsData?.transactions || [];

    if (accounts.length === 0 && transactions.length === 0) {
      return <EmptyState message="No data yet. Add an account or transaction to get started!" />;
    }

    return (
      <>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <AccountCarousel accounts={accounts} />
        </motion.div>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="lg:col-span-1">
            <BalanceSummary summary={summary} />
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="lg:col-span-1">
            <RecentTransactions transactions={transactions} />
          </motion.div>
        </div>
      </>
    );
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Hello, there 👋</h1>
            <p className="text-gray-400">{new Date().toDateString()}</p>
          </div>
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