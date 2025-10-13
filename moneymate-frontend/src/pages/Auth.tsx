import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Auth: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-900">
      <div className="w-full max-w-md p-4 bg-white rounded-xl shadow-lg">
        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 font-semibold rounded-l-lg ${tab === 'login' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-primary-600'}`}
            onClick={() => setTab('login')}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 font-semibold rounded-r-lg ${tab === 'signup' ? 'bg-primary-600 text-white' : 'bg-gray-100 text-primary-600'}`}
            onClick={() => setTab('signup')}
          >
            Signup
          </button>
        </div>
        <motion.div
          key={tab}
          initial={{ x: tab === 'login' ? -50 : 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: tab === 'login' ? 50 : -50, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.3 }}
        >
          {tab === 'login' ? <LoginForm /> : <SignupForm />}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
