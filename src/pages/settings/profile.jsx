import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import InputField from '../../components/atoms/InputField';
import Button from '../../components/atoms/Button';
import { useToast } from '../../context/ToastContext';
import { updatePreferences } from '../../api/user';

const ProfileScreen = () => {
  const router = useRouter();
  const { addToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updatePreferences({ fullName, email });
      addToast({ type: 'success', message: 'Profile updated successfully!' });
    } catch {
      addToast({ type: 'error', message: 'Failed to update profile.' });
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
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-4 flex size-24 items-center justify-center rounded-full bg-blue-500">
              <span className="text-4xl font-bold text-white">{fullName ? fullName.charAt(0).toUpperCase() : 'U'}</span>
            </div>
            <h2 className="text-xl font-bold text-white">{fullName || 'User'}</h2>
            <p className="text-gray-400">{email || 'user@example.com'}</p>
          </div>

          <form className="space-y-4" onSubmit={handleSave}>
            <InputField
              label="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <InputField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ProfileScreen;