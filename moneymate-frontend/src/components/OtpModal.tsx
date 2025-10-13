import React from 'react';
import { motion } from 'framer-motion';

interface OtpModalProps {
  open: boolean;
  onClose: () => void;
  onVerify: (otp: string) => void;
  loading?: boolean;
  error?: string;
}

const OtpModal: React.FC<OtpModalProps> = ({ open, onClose, onVerify, loading, error }) => {
  const [otp, setOtp] = React.useState('');

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.3 }}
        className="bg-white rounded-xl p-6 shadow-lg w-full max-w-sm"
      >
        <h3 className="text-lg font-bold mb-4">Enter OTP</h3>
        <input
          type="text"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          className="w-full px-4 py-2 border rounded mb-4"
          placeholder="6-digit code"
          maxLength={6}
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          className="w-full py-2 bg-primary-600 text-white rounded font-semibold"
          onClick={() => onVerify(otp)}
          disabled={loading || otp.length !== 6}
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
        <button className="mt-4 w-full py-2 text-primary-600" onClick={onClose}>
          Cancel
        </button>
      </motion.div>
    </div>
  );
};

export default OtpModal;
