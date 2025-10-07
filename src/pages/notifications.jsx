import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBell } from 'react-icons/fi';
import MainLayout from '../layouts/MainLayout';
import { useRouter } from 'next/router';

const initialNotifications = [
  {
    id: 1,
    icon: '💰',
    message: 'Your monthly salary has been deposited.',
    timestamp: '2 hours ago',
    link: '/transactions/2',
  },
  {
    id: 2,
    icon: '📈',
    message: 'You are close to your monthly food budget.',
    timestamp: '1 day ago',
    link: '/reports?tab=Budgets',
  },
  {
    id: 3,
    icon: '🔒',
    message: 'A new device has logged into your account.',
    timestamp: '3 days ago',
    link: '/settings/security',
  },
];

const NotificationsScreen = () => {
  const [notifications] = React.useState(initialNotifications);
  const router = useRouter();

  const handleNotificationClick = (link) => {
    router.push(link);
  };

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <h1 className="mb-6 text-2xl font-bold text-white">Notifications</h1>
        {notifications.length > 0 ? (
          <div className="space-y-3">
            <AnimatePresence>
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  layout
                  initial={{ opacity: 0, y: 50, scale: 0.3 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: index * 0.1,
                  }}
                  onClick={() => handleNotificationClick(notification.link)}
                  className="flex cursor-pointer items-start rounded-lg bg-gray-800 p-4"
                >
                  <div className="mr-4 text-2xl">{notification.icon}</div>
                  <div className="flex-1">
                    <p className="text-white">{notification.message}</p>
                    <p className="text-sm text-gray-400">{notification.timestamp}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center pt-20 text-center text-gray-500">
            <FiBell size={48} className="mb-4" />
            <h2 className="text-xl font-semibold">No notifications yet</h2>
            <p>We&apos;ll let you know when something important happens.</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default NotificationsScreen;