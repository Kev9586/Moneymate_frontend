import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import InputField from '../../components/atoms/InputField';
import Button from '../../components/atoms/Button';
import { useToast } from '../../context/ToastContext';
import { updateSecurity } from '../../api/user';

const SecurityScreen = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      addToast({ type: 'error', message: 'New passwords do not match.' });
      return;
    }
    setLoading(true);
    try {
      await updateSecurity({ currentPassword, newPassword });
      addToast({ type: 'success', message: 'Password updated successfully!' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch {
      addToast({ type: 'error', message: 'Failed to update password.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex items-center">
          <button onClick={() => router.back()} className="mr-4 text-white">
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">Security</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <h2 className="mb-4 text-xl font-bold text-white">Change Password</h2>
          <form className="space-y-4" onSubmit={handleUpdate}>
            <InputField
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              icon={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />
            <InputField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <InputField
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Updating...' : 'Update Password'}
            </Button>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default SecurityScreen;