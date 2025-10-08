import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash, FiSearch } from 'react-icons/fi';
import useSWR, { mutate } from 'swr';
import MainLayout from '../layouts/MainLayout';
import { useToast } from '../context/ToastContext';
import { addTransaction, updateTransaction, deleteTransaction } from '../api/transactions';
import { fetcher } from '../utils/fetcher';
import LoadingState from '../components/molecules/LoadingState';
import EmptyState from '../components/molecules/EmptyState';
import ErrorState from '../components/molecules/ErrorState';

const TransactionModal = dynamic(() => import('../components/organisms/TransactionModal'), {
  loading: () => <p>Loading...</p>,
});

const TransactionsScreen = () => {
  const { data, error, isLoading } = useSWR('/transactions', fetcher);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { addToast } = useToast();

  const transactions = data?.transactions || [];

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        (t) =>
          t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (t.category && t.category.toLowerCase().includes(searchTerm.toLowerCase()))
      ),
    [transactions, searchTerm]
  );

  const handleAddClick = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteTransaction(id);
      addToast({ type: 'success', message: 'Transaction deleted.' });
      mutate('/transactions');
    } catch {
      addToast({ type: 'error', message: 'Failed to delete transaction.' });
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction.id, formData);
        addToast({ type: 'success', message: 'Transaction updated.' });
      } else {
        await addTransaction(formData);
        addToast({ type: 'success', message: 'Transaction added.' });
      }
      mutate('/transactions');
      setIsModalOpen(false);
    } catch {
      addToast({ type: 'error', message: `Failed to save transaction.` });
    }
  };

  const renderContent = () => {
    if (isLoading) return <LoadingState message="Fetching transactions..." />;
    if (error) return <ErrorState message="Could not fetch transactions." onRetry={() => mutate('/transactions')} />;

    if (transactions.length === 0) {
      return <EmptyState message="No transactions yet. Add one to get started!" onAction={handleAddClick} actionText="Add Transaction" />;
    }

    return (
      <div className="space-y-3">
        <AnimatePresence>
          {filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction.id}
              transaction={transaction}
              onEdit={() => handleEditClick(transaction)}
              onDelete={() => handleDeleteClick(transaction.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Transactions</h1>
        <div className="mb-4 flex items-center rounded-lg bg-gray-800 p-2">
          <FiSearch className="mr-2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-full bg-transparent text-white focus:outline-none"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {renderContent()}
      </div>

      <motion.button
        onClick={handleAddClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-10 rounded-full bg-blue-500 p-4 text-white shadow-lg sm:bottom-6"
      >
        <FiPlus size={24} />
      </motion.button>

      {isModalOpen && (
        <TransactionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          transaction={selectedTransaction}
        />
      )}
    </MainLayout>
  );
};

const TransactionRow = ({ transaction, onEdit, onDelete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const x = useMotionValue(0);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -100) {
      setIsExiting(true);
      setTimeout(() => onDelete(), 300);
    } else if (info.offset.x > 100) {
      onEdit();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 1, height: 'auto' }}
      animate={{ opacity: isExiting ? 0 : 1, height: isExiting ? 0 : 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      style={{ x }}
      className="relative rounded-lg bg-gray-800 p-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold text-white">{transaction.description}</p>
          <p className="text-sm text-gray-400">{transaction.category}</p>
        </div>
        <p className={`font-bold ${transaction.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
          {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
        </p>
      </div>
      <div className="absolute left-0 top-0 flex size-full items-center justify-between px-4">
        <motion.span className="text-blue-500" style={{ opacity: x.get() > 50 ? 1 : 0 }}>
          <FiEdit size={20} /> Edit
        </motion.span>
        <motion.span className="text-red-500" style={{ opacity: x.get() < -50 ? 1 : 0 }}>
          Delete <FiTrash size={20} />
        </motion.span>
      </div>
    </motion.div>
  );
};

export default TransactionsScreen;