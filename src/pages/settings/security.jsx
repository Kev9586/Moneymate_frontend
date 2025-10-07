import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi';
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import InputField from '../../components/atoms/InputField';
import Button from '../../components/atoms/Button';

const SecurityScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex items-center">
          <button onClick={() => router.back()} className="mr-4 text-white">
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">Security</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <h2 className="mb-4 text-xl font-bold text-white">Change Password</h2>
          <form className="space-y-4">
            <InputField
              label="Current Password"
              type={showPassword ? 'text' : 'password'}
              icon={
                <button type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              }
            />
            <InputField
              label="New Password"
              type={showPassword ? 'text' : 'password'}
            />
            <InputField
              label="Confirm New Password"
              type={showPassword ? 'text' : 'password'}
            />
            <Button type="submit" className="w-full">Update Password</Button>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default SecurityScreen;