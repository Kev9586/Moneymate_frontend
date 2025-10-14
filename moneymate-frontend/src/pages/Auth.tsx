import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';
import LogoMark from '../components/LogoMark';

const Auth: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'signup'>('login');

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-dark-bg text-light-text p-4">
      <div className="text-center mb-8">
        <LogoMark className="w-24 h-24 mx-auto" />
        <h1 className="text-3xl font-bold mt-2">Verification</h1>
      </div>
      <div className="w-full max-w-md p-8 bg-primary rounded-xl shadow-lg">
        <div className="flex justify-center border-b border-gray-700 mb-6">
          <button
            className={`px-6 py-2 font-semibold ${tab === 'login' ? 'border-b-2 border-accent text-accent' : 'text-gray-400'}`}
            onClick={() => setTab('login')}
          >
            LOGIN
          </button>
          <button
            className={`px-6 py-2 font-semibold ${tab === 'signup' ? 'border-b-2 border-accent text-accent' : 'text-gray-400'}`}
            onClick={() => setTab('signup')}
          >
            SIGNUP
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
