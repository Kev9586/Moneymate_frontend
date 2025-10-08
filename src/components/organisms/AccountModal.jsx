import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Modal from '../molecules/Modal';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';

const AccountModal = ({ isOpen, onClose, onSave, account }) => {
  const [name, setName] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    if (account) {
      setName(account.name);
      setBalance(account.balance);
    } else {
      setName('');
      setBalance('');
    }
  }, [account, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ name, balance: parseFloat(balance) || 0 });
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

export default AccountModal;