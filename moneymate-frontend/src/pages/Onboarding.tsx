import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const slides = [
  {
    title: 'Welcome to MoneyMate',
    description: 'Your personal finance companion. Track, save, and grow.',
    illustration: <div className="w-32 h-32 bg-primary-400 rounded-full" />,
  },
  {
    title: 'Security First',
    description: 'Your data is encrypted and protected. Privacy guaranteed.',
    illustration: <div className="w-32 h-32 bg-primary-600 rounded-full" />,
  },
  {
    title: 'Get Started',
    description: 'Let’s set up your account and begin your journey.',
    illustration: <div className="w-32 h-32 bg-primary-800 rounded-full" />,
  },
];

const Onboarding: React.FC = () => {
  const [index, setIndex] = useState(0);
  const lastSwipe = useRef(Date.now());
  const navigate = useNavigate();

  const handleSwipe = (direction: 'left' | 'right') => {
    const now = Date.now();
    if (now - lastSwipe.current < 250) return; // Throttle swipes
    lastSwipe.current = now;
    if (direction === 'left' && index < slides.length - 1) {
      setIndex(index + 1);
    } else if (direction === 'right' && index > 0) {
      setIndex(index - 1);
    }
  };

  const handleCTA = () => {
    localStorage.setItem('firstRun', 'false');
    navigate('/auth', { replace: true });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-900">
      <div className="w-full max-w-md p-4">
        <motion.div
          key={index}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="flex flex-col items-center text-center"
        >
          {slides[index].illustration}
          <h2 className="mt-6 text-2xl font-bold text-white">{slides[index].title}</h2>
          <p className="mt-2 text-lg text-primary-100">{slides[index].description}</p>
        </motion.div>
        <div className="flex justify-between mt-8">
          <button
            className="px-4 py-2 text-primary-100"
            disabled={index === 0}
            onClick={() => handleSwipe('right')}
          >
            Prev
          </button>
          <button
            className="px-4 py-2 text-primary-100"
            disabled={index === slides.length - 1}
            onClick={() => handleSwipe('left')}
          >
            Next
          </button>
        </div>
        {index === slides.length - 1 && (
          <motion.button
            className="mt-8 w-full py-3 bg-primary-600 text-white rounded-lg font-semibold text-lg shadow-lg"
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 300 }}
            onClick={handleCTA}
          >
            Get Started
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
