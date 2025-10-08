import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import { useRouter } from 'next/router';
import { getNotifications } from '../api/notifications';
import { useToast } from '../context/ToastContext';
import LoadingState from '../components/molecules/LoadingState';
import EmptyState from '../components/molecules/EmptyState';
import ErrorState from '../components/molecules/ErrorState';

const NotificationsScreen = () => {
  const [status, setStatus] = useState('loading');
  const [notifications, setNotifications] = useState([]);
  const router = useRouter();
  const { addToast } = useToast();

  const fetchNotifications = async () => {
    setStatus('loading');
    try {
      const response = await getNotifications();
      setNotifications(response.notifications || []);
      setStatus((response.notifications || []).length > 0 ? 'success' : 'empty');
    } catch {
      setStatus('error');
      addToast({ type: 'error', message: 'Failed to fetch notifications.' });
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleNotificationClick = (link) => {
    if (link) router.push(link);
  };

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return <LoadingState message="Loading notifications..." />;
      case 'empty':
        return <EmptyState icon={<FiBell size={48} />} message="No notifications yet." description="We'll let you know when something important happens." />;
      case 'error':
        return <ErrorState message="Could not fetch notifications." onRetry={fetchNotifications} />;
      case 'success':
        return (
          <div className="space-y-3">
            <AnimatePresence>
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20, delay: index * 0.1 }}
                  onClick={() => handleNotificationClick(notification.link)}
                  className="flex cursor-pointer items-start rounded-lg bg-gray-800 p-4"
                >
                  <div className="mr-4 text-2xl">{notification.icon || '🔔'}</div>
                  <div className="flex-1">
                    <p className="text-white">{notification.message}</p>
                    <p className="text-sm text-gray-400">{notification.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Notifications</h1>
        {renderContent()}
      </div>
    </MainLayout>
  );
};

export default NotificationsScreen;