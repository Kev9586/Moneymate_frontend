import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import useSWR, { mutate } from 'swr';
import MainLayout from '../layouts/MainLayout';
import { useToast } from '../context/ToastContext';
import { addAccount, updateAccount, deleteAccount } from '../api/accounts';
import { fetcher } from '../utils/fetcher';
import LoadingState from '../components/molecules/LoadingState';
import EmptyState from '../components/molecules/EmptyState';
import ErrorState from '../components/molecules/ErrorState';

const AccountModal = dynamic(() => import('../components/organisms/AccountModal'), {
  loading: () => <p>Loading...</p>,
});

const AccountsScreen = () => {
  const { data, error, isLoading } = useSWR('/accounts', fetcher);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { addToast } = useToast();

  const handleAddClick = () => {
    setSelectedAccount(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await deleteAccount(id);
      addToast({ type: 'success', message: 'Account deleted successfully.' });
      mutate('/accounts');
    } catch {
      addToast({ type: 'error', message: 'Failed to delete account.' });
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedAccount) {
        await updateAccount(selectedAccount.id, formData);
        addToast({ type: 'success', message: 'Account updated successfully.' });
      } else {
        await addAccount(formData);
        addToast({ type: 'success', message: 'Account added successfully.' });
      }
      mutate('/accounts');
      setIsModalOpen(false);
    } catch {
      addToast({ type: 'error', message: `Failed to ${selectedAccount ? 'update' : 'add'} account.` });
    }
  };

  const renderContent = () => {
    if (isLoading) return <LoadingState message="Loading accounts..." />;
    if (error) return <ErrorState message="Could not fetch accounts." onRetry={() => mutate('/accounts')} />;

    const accounts = data?.accounts || [];

    if (accounts.length === 0) {
      return <EmptyState message="No accounts found. Add one to get started!" onAction={handleAddClick} actionText="Add Account" />;
    }

    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.1 }}
              className="relative rounded-lg bg-gray-800 p-4 shadow-md"
            >
              <div className="flex items-center">
                <Image src={account.logo || '/logos/default.svg'} alt={`${account.name} logo`} width={40} height={40} className="mr-4" />
                <div>
                  <h2 className="font-bold text-white">{account.name}</h2>
                  <p className="text-lg text-green-400">${(account.balance || 0).toLocaleString()}</p>
                </div>
              </div>
              <div className="absolute right-2 top-2 flex space-x-2">
                <button onClick={() => handleEditClick(account)} className="text-gray-400 hover:text-white">
                  <FiEdit />
                </button>
                <button onClick={() => handleDeleteClick(account.id)} className="text-gray-400 hover:text-red-500">
                  <FiTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Accounts</h1>
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
        <AccountModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          account={selectedAccount}
        />
      )}
    </MainLayout>
  );
};

export default AccountsScreen;