import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi';
import { useRouter } from 'next/router';
import MainLayout from '../../layouts/MainLayout';
import InputField from '../../components/atoms/InputField';
import Button from '../../components/atoms/Button';

const ProfileScreen = () => {
  const router = useRouter();

  return (
    <MainLayout>
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex items-center">
          <button onClick={() => router.back()} className="mr-4 text-white">
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-lg bg-gray-800 p-6"
        >
          <div className="mb-6 flex flex-col items-center">
            <div className="mb-4 flex size-24 items-center justify-center rounded-full bg-blue-500">
                <span className="text-4xl font-bold text-white">K</span>
            </div>
            <h2 className="text-xl font-bold text-white">Keval</h2>
            <p className="text-gray-400">keval@moneymate.com</p>
          </div>

          <form className="space-y-4">
            <InputField label="Full Name" defaultValue="Keval" />
            <InputField label="Email Address" type="email" defaultValue="keval@moneymate.com" />
            <Button type="submit" className="w-full">Save Changes</Button>
          </form>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default ProfileScreen;