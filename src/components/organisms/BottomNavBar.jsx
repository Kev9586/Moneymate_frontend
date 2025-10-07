import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { FiHome, FiCreditCard, FiList, FiTrendingUp, FiSettings, FiBriefcase } from 'react-icons/fi';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: FiHome },
  { href: '/accounts', label: 'Accounts', icon: FiCreditCard },
  { href: '/transactions', label: 'Transactions', icon: FiList },
  { href: '/reports', label: 'Reports', icon: FiTrendingUp },
  { href: '/financials', label: 'Financials', icon: FiBriefcase },
  { href: '/settings', label: 'Settings', icon: FiSettings },
];

const BottomNavBar = () => {
  const router = useRouter();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-700 bg-gray-800">
      <div className="mx-auto flex max-w-lg justify-around">
        {navItems.map((item) => {
          const isActive = router.pathname.startsWith(item.href);
          return (
            <Link href={item.href} key={item.href} legacyBehavior>
              <a className="relative flex flex-1 flex-col items-center justify-center py-2 text-sm text-gray-400 hover:text-white">
                <item.icon size={22} className={`mb-1 ${isActive ? 'text-blue-500' : ''}`} />
                <span className={isActive ? 'text-white' : ''}>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 h-1 w-10 rounded-t-full bg-blue-500"
                    layoutId="underline"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavBar;