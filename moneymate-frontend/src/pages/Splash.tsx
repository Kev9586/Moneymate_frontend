import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import auth from '../services/auth';
// import LogoMark from '../components/LogoMark'; // Uncomment when LogoMark is ready

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const runBootstrap = async () => {
      try {
        const { firstRun, token } = await auth.bootstrap();
        if (!isMounted) return;
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
      } catch (e) {
        // On error, fallback to Auth route
        if (isMounted) navigate('/auth', { replace: true });
      }
    };
    runBootstrap();
    return () => {
      isMounted = false;
    };
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ opacity: { duration: 0.4 }, scale: { type: 'spring', duration: 0.3 } }}
        className="flex flex-col items-center justify-center"
      >
        {/* <LogoMark className="w-32 h-32" /> */}
        <span className="text-white text-4xl font-bold">MoneyMate</span>
      </motion.div>
    </div>
  );
};

export default Splash;
