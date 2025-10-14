import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LogoMark from '../components/LogoMark';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState('');

  const handleVerify = () => {
    // Handle OTP verification logic here
    console.log('Verifying OTP:', otp);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-dark-bg text-light-text p-4">
      <div className="text-center mb-8">
        <LogoMark className="w-24 h-24 mx-auto" />
        <h1 className="text-3xl font-bold mt-2">Verifit</h1>
        <p className="text-gray-400 mt-2">Enter the OTP sent to your mobile.</p>
      </div>
      <div className="w-full max-w-sm p-8 bg-primary rounded-xl shadow-lg text-center">
        <div className="flex justify-center space-x-2 mb-6">
          {/* Simple input for now, can be replaced with individual boxes */}
          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-48 px-4 py-3 text-center bg-input-bg border border-gray-700 rounded-md shadow-sm text-light-text text-2xl tracking-[0.5em] focus:outline-none focus:ring-accent focus:border-accent"
          />
        </div>
        <a href="#" className="text-sm text-accent hover:underline mb-6 block">
          Resend OTP
        </a>
        <motion.button
          onClick={handleVerify}
          className="w-full py-3 px-4 bg-accent text-dark-bg font-semibold rounded-md shadow-sm hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50"
          whileTap={{ scale: 0.98 }}
        >
          VERIFY
        </motion.button>
      </div>
    </div>
  );
};

export default OTPVerification;
