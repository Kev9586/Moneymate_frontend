import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Lottie from 'lottie-react';
import welcomeAnimation from '../assets/lottie/welcome.json';
import securityAnimation from '../assets/lottie/security.json';
import getStartedAnimation from '../assets/lottie/get-started.json';

const slides = [
  {
    title: 'Welcome to MoneyMate',
    description: 'Your personal finance companion. Track, save, and grow.',
    animationData: welcomeAnimation,
  },
  {
    title: 'Security First',
    description: 'Your data is encrypted and protected. Privacy guaranteed.',
    animationData: securityAnimation,
  },
  {
    title: 'Get Started',
    description: 'Let’s set up your account and begin your journey.',
    animationData: getStartedAnimation,
  },
];

const Onboarding: React.FC = () => {
  const [swiper, setSwiper] = useState<any>(null);
  const [isThrottled, setIsThrottled] = useState(false);
  const navigate = useNavigate();

  const handleCTA = () => {
    localStorage.setItem('firstRun', 'false');
    navigate('/auth', { replace: true });
  };

  const handleSlideChange = (direction: 'next' | 'prev') => {
    if (isThrottled) return;
    setIsThrottled(true);
    if (direction === 'next') {
      swiper?.slideNext();
    } else {
      swiper?.slidePrev();
    }
    setTimeout(() => setIsThrottled(false), 250); // 250ms throttle
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-dark-bg text-light-text">
      <div className="w-full max-w-md p-4 text-center">
        <Swiper onSwiper={setSwiper} className="w-full" allowTouchMove={false}>
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
              >
                <Lottie animationData={slide.animationData} className="w-64 h-64" />
                <h2 className="mt-6 text-3xl font-bold">{slide.title}</h2>
                <p className="mt-2 text-lg text-gray-400">{slide.description}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="flex justify-between items-center mt-8 px-4">
          <button
            className="px-4 py-2 text-gray-400 disabled:opacity-50"
            onClick={handleCTA}
            disabled={isThrottled}
          >
            SKIP
          </button>

          {swiper?.isEnd ? (
             <motion.button
             className="px-6 py-3 bg-accent text-dark-bg rounded-lg font-semibold text-lg shadow-lg"
             whileTap={{ scale: 0.96 }}
             transition={{ type: 'spring', stiffness: 300 }}
             onClick={handleCTA}
           >
             GET STARTED
           </motion.button>
          ) : (
            <button
            className="px-4 py-2 bg-accent text-dark-bg rounded-full font-bold disabled:opacity-50"
            onClick={() => handleSlideChange('next')}
            disabled={isThrottled || swiper?.isEnd}
          >
            NEXT
          </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Onboarding;
