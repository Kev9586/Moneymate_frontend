import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Button from '../components/atoms/Button';
import InputField from '../components/atoms/InputField';
import Toast from '../components/molecules/Toast';
import Tabs from '../components/molecules/Tabs';
import { login, signup } from '../api/auth';

const AuthScreen = () => {
  const authTabs = ['Login', 'Sign Up'];
  const [activeTab, setActiveTab] = useState(authTabs[0]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (activeTab === 'Login') {
        response = await login({ email, password });
      } else {
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match');
        }
        response = await signup({ email, password });
      }

      if (response.token) {
        localStorage.setItem('token', response.token);
        router.push('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
    } finally {
      setLoading(false);
    }
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
      <InputField
        placeholder="Email"
        type="email"
        className="mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        placeholder="Password"
        type="password"
        className="mb-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {activeTab === 'Sign Up' && (
        <InputField
          placeholder="Confirm Password"
          type="password"
          className="mb-6"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      <Button type="submit" disabled={loading}>
        {loading ? 'Processing...' : activeTab}
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
        {error && <Toast message={error} onClose={() => setError(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default AuthScreen;