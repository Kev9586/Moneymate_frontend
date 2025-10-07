import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from '../components/atoms/Button';

const slides = [
  {
    title: 'Welcome to Moneymate',
    description: 'Your personal finance companion. Track expenses, manage budgets, and achieve your financial goals.',
    image: '/images/onboarding-1.svg',
  },
  {
    title: 'Stay Secure',
    description: 'Your data is encrypted and protected with bank-level security.',
    image: '/images/onboarding-2.svg',
  },
  {
    title: 'Get Started',
    description: 'Create an account to start your journey towards financial freedom.',
    image: '/images/onboarding-3.svg',
  },
];

const OnboardingScreen = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      router.push('/auth');
    }
  };

  return (
    <div className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-gray-900 text-white">
      <AnimatePresence>
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <Image src={slides[currentSlide].image} alt={slides[currentSlide].title} width={256} height={256} className="mb-8" />
          <h2 className="mb-4 text-3xl font-bold">{slides[currentSlide].title}</h2>
          <p className="max-w-xs">{slides[currentSlide].description}</p>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 flex w-full flex-col items-center px-8">
        <div className="mb-4 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`size-2 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-gray-600'}`}
            />
          ))}
        </div>
        <Button
          onClick={handleNext}
          className="w-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingScreen;