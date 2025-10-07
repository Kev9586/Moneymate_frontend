import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { FiPlus, FiEdit, FiTrash, FiSearch } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import Modal from '../components/molecules/Modal';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';

const initialTransactions = [
  { id: 1, description: 'Starbucks Coffee', amount: -5.75, category: 'Food', date: '2023-10-25' },
  { id: 2, description: 'Salary Deposit', amount: 2500, category: 'Income', date: '2023-10-24' },
  { id: 3, description: 'Netflix Subscription', amount: -15.99, category: 'Entertainment', date: '2023-10-23' },
  { id: 4, description: 'Gasoline', amount: -45.50, category: 'Transport', date: '2023-10-22' },
];

const TransactionsScreen = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = transactions.filter(
    (t) =>
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEditTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const handleSaveTransaction = (formData) => {
    if (selectedTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === selectedTransaction.id ? { ...t, ...formData } : t
        )
      );
    } else {
      const newTransaction = {
        id: Date.now(),
        ...formData,
        date: new Date().toISOString().split('T')[0],
      };
      setTransactions([newTransaction, ...transactions]);
    }
    setIsModalOpen(false);
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

        <div className="space-y-3">
          <AnimatePresence>
            {filteredTransactions.map((transaction) => (
              <TransactionRow
                key={transaction.id}
                transaction={transaction}
                onEdit={() => handleEditTransaction(transaction)}
                onDelete={() => handleDeleteTransaction(transaction.id)}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <motion.button
        onClick={handleAddTransaction}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-24 right-6 z-10 rounded-full bg-blue-500 p-4 text-white shadow-lg sm:bottom-6"
      >
        <FiPlus size={24} />
      </motion.button>

      <TransactionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTransaction}
        transaction={selectedTransaction}
      />
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


const TransactionModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  React.useEffect(() => {
    if (transaction) {
      setDescription(transaction.description);
      setAmount(transaction.amount);
      setCategory(transaction.category);
    } else {
      setDescription('');
      setAmount('');
      setCategory('');
    }
  }, [transaction]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ description, amount: parseFloat(amount), category });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Modal title={transaction ? 'Edit Transaction' : 'Add Transaction'} onClose={onClose}>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <InputField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <InputField
              label="Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <InputField
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
            <Button type="submit">{transaction ? 'Save Changes' : 'Add Transaction'}</Button>
          </form>
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default TransactionsScreen;