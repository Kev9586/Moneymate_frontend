import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Modal from '../molecules/Modal';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';

const TransactionModal = ({ isOpen, onClose, onSave, transaction }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (transaction) {
        setDescription(transaction.description);
        setAmount(transaction.amount);
        setCategory(transaction.category);
      } else {
        setDescription('');
        setAmount('');
        setCategory('');
      }
    }
  }, [transaction, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ description, amount: parseFloat(amount) || 0, category });
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

export default TransactionModal;