import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';
import LogoMark from '../components/LogoMark';

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const { initialized, firstRun, token } = useAuthStore();

  useEffect(() => {
    if (initialized) {
      // wait for animations to play (approx)
      setTimeout(() => {
        if (firstRun) {
          navigate('/onboarding', { replace: true });
        } else if (token) {
          navigate('/dashboard', { replace: true });
        } else {
          navigate('/auth', { replace: true });
        }
      }, 700);
    }
  }, [initialized, firstRun, token, navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-dark-bg to-primary-dark text-light-text">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 0.4 }, scale: { type: 'spring', duration: 0.3 } }}
        className="flex flex-col items-center justify-center"
      >
        <LogoMark className="w-32 h-32" />
        <h1 className="text-4xl font-bold mt-4">MONEYMATE</h1>
        <p className="mt-2">Loading...</p>
      </motion.div>
    </div>
  );
};

export default Splash;
