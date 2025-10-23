import { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import apiClient from '../api/apiClient';
import { AuthContext } from '../contexts/AuthContext';

export default function OtpVerifyPage() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  useEffect(() => {
    if (!email) {
      navigate('/signup');
      toast.error('Something went wrong. Please sign up again.');
    }
  }, [email, navigate]);

  useEffect(() => {
    let timer;
    if (resendDisabled) {
      timer = setInterval(() => {
        setResendTimer((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setResendDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendDisabled]);

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post('/auth/signup/verify', { email, otp: data.otp });
      const { token, user } = response.data;
      login({ token, user });
      localStorage.setItem('token', token);
      toast.success('OTP verified successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid or expired OTP.');
    }
  };

  const handleResendOtp = async () => {
    try {
      await apiClient.post('/auth/signup', { email });
      toast.success('A new OTP has been sent to your email.');
      setResendDisabled(true);
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  return (
    <div className="font-body text-[#F5F5F5] min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#483D8B] to-[#191970]">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-transparent space-y-6">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold">Verify Your Email</h1>
            <p className="text-white/80 mt-2">Enter the 6-digit code sent to <span className="font-medium text-white">{email}</span></p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="flex flex-col items-center">
                <div className="flex justify-center gap-2">
                  <input
                    {...register('otp', { 
                        required: 'OTP is required', 
                        minLength: { value: 6, message: 'OTP must be 6 digits' },
                        maxLength: { value: 6, message: 'OTP must be 6 digits' }
                    })}
                    className="form-input w-48 h-14 text-center text-2xl font-bold bg-[#191970] text-white rounded-lg border-2 border-transparent focus:border-primary focus:ring-0 transition"
                    maxLength="6"
                    type="text"
                  />
                </div>
              </label>
              {errors.otp && <p className="text-red-500 text-xs mt-1 text-center">{errors.otp.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-primary text-black font-body font-bold rounded-lg text-lg hover:bg-primary/90 transition-all duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Verifying...' : 'Verify'}
            </button>
          </form>
          <p className="text-center text-white/80">
            Didn't receive the code?{' '}
            <button onClick={handleResendOtp} disabled={resendDisabled} className="font-medium text-primary hover:underline disabled:text-gray-400 disabled:cursor-not-allowed">
              {resendDisabled ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}