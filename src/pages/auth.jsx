import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';
import Modal from '../components/molecules/Modal';
import Toast from '../components/molecules/Toast';
import Tabs from '../components/molecules/Tabs';

const AuthScreen = () => {
  const authTabs = ['Login', 'Sign Up'];
  const [activeTab, setActiveTab] = useState(authTabs[0]);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleAuth = () => {
    // Replace with actual authentication logic
    setShowOtpModal(true);
  };

  const handleOtpSubmit = () => {
    setShowOtpModal(false);
    router.push('/dashboard');
  };

  const renderForm = () => (
    <motion.form
      key={activeTab}
      initial={{ opacity: 0, x: activeTab === 'Login' ? -100 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: activeTab === 'Login' ? 100 : -100 }}
      transition={{ duration: 0.3 }}
      className="flex w-full flex-col"
      onSubmit={(e) => {
        e.preventDefault();
        handleAuth();
      }}
    >
      <InputField placeholder="Email" type="email" className="mb-4" />
      <InputField placeholder="Password" type="password" className="mb-6" />
      {activeTab === 'Sign Up' && (
        <InputField
          placeholder="Confirm Password"
          type="password"
          className="mb-6"
        />
      )}
      <Button type="submit">
        {activeTab}
      </Button>
    </motion.form>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-white">
      <div className="w-full max-w-md rounded-lg bg-gray-800 p-8 shadow-lg">
        <div className="mb-8">
          <Tabs tabs={authTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <AnimatePresence mode="wait">{renderForm()}</AnimatePresence>
      </div>

      <AnimatePresence>
        {showOtpModal && (
          <Modal
            title="Enter OTP"
            onClose={() => setShowOtpModal(false)}
          >
            <div className="flex flex-col items-center">
              <InputField placeholder="6-digit OTP" className="mb-4" />
              <Button onClick={handleOtpSubmit} className="w-full">
                Verify
              </Button>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error && <Toast message={error} onClose={() => setError(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default AuthScreen;