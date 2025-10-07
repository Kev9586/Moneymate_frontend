import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiPlus, FiEdit, FiTrash } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import Modal from '../components/molecules/Modal';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';

const initialAccounts = [
  { id: 1, name: 'Chase Bank', balance: 5230.5, logo: '/logos/chase.svg' },
  { id: 2, name: 'Bank of America', balance: 12450.0, logo: '/logos/boa.svg' },
  { id: 3, name: 'Wells Fargo', balance: 8760.25, logo: '/logos/wells-fargo.svg' },
];

const AccountsScreen = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleAddAccount = () => {
    setSelectedAccount(null);
    setIsModalOpen(true);
  };

  const handleEditAccount = (account) => {
    setSelectedAccount(account);
    setIsModalOpen(true);
  };

  const handleDeleteAccount = (id) => {
    setAccounts(accounts.filter((acc) => acc.id !== id));
  };

  const handleSaveAccount = (formData) => {
    if (selectedAccount) {
      // Update existing account
      setAccounts(
        accounts.map((acc) =>
          acc.id === selectedAccount.id ? { ...acc, ...formData } : acc
        )
      );
    } else {
      // Add new account
      const newAccount = {
        id: Date.now(),
        ...formData,
        logo: '/logos/default.svg',
      };
      setAccounts([...accounts, newAccount]);
    }
    setIsModalOpen(false);
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Accounts</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {accounts.map((account, index) => (
              <motion.div
                key={account.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: index * 0.1,
                }}
                className="relative rounded-lg bg-gray-800 p-4 shadow-md"
              >
                <div className="flex items-center">
                  <Image src={account.logo} alt={`${account.name} logo`} width={40} height={40} className="mr-4" />
                  <div>
                    <h2 className="font-bold text-white">{account.name}</h2>
                    <p className="text-lg text-green-400">${account.balance.toLocaleString()}</p>
                  </div>
                </div>
                <div className="absolute right-2 top-2 flex space-x-2">
                  <button onClick={() => handleEditAccount(account)} className="text-gray-400 hover:text-white">
                    <FiEdit />
                  </button>
                  <button onClick={() => handleDeleteAccount(account.id)} className="text-gray-400 hover:text-red-500">
                    <FiTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        onClick={handleAddAccount}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-10 rounded-full bg-blue-500 p-4 text-white shadow-lg sm:bottom-6"
      >
        <FiPlus size={24} />
      </motion.button>

      <AccountModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAccount}
        account={selectedAccount}
      />
    </MainLayout>
  );
};

const AccountModal = ({ isOpen, onClose, onSave, account }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  React.useEffect(() => {
    if (account) {
      setName(account.name);
      setBalance(account.balance);
    } else {
      setName('');
      setBalance('');
    }
  }, [account]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, balance: parseFloat(balance) });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal title={account ? 'Edit Account' : 'Add Account'} onClose={onClose}>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <InputField
              label="Account Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <InputField
              label="Current Balance"
              type="number"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              required
            />
            <Button type="submit">{account ? 'Save Changes' : 'Add Account'}</Button>
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default AccountsScreen;