import React from 'react';
import { motion } from 'framer-motion';
import { FiUser, FiShield, FiBell, FiLogOut, FiChevronRight } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import { useRouter } from 'next/router';
import { useToast } from '../context/ToastContext';
import { logout } from '../api/user';

const settingsItems = [
  { label: 'Profile', icon: FiUser, href: '/settings/profile' },
  { label: 'Security', icon: FiShield, href: '/settings/security' },
  { label: 'Notifications', icon: FiBell, href: '/notifications' },
];

const SettingsScreen = () => {
  const router = useRouter();
  const { addToast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed, but proceeding with client-side logout.', error);
    } finally {
      localStorage.removeItem('token');
      addToast({ type: 'success', message: 'You have been logged out.' });
      router.push('/auth');
    }
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Settings</h1>
        <div className="space-y-4">
          <div className="rounded-lg bg-gray-800">
            {settingsItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(item.href)}
                className="flex cursor-pointer items-center justify-between p-4"
              >
                <div className="flex items-center">
                  <item.icon className="mr-4 text-blue-500" size={24} />
                  <span className="text-lg text-white">{item.label}</span>
                </div>
                <FiChevronRight className="text-gray-500" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="rounded-lg bg-gray-800"
          >
            <div
              onClick={handleLogout}
              className="flex cursor-pointer items-center p-4 text-red-500"
            >
              <FiLogOut className="mr-4" size={24} />
              <span className="text-lg">Logout</span>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SettingsScreen;