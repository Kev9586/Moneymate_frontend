import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../api/apiClient';
import { useState } from 'react';

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      await apiClient.post('/auth/signup', data);
      toast.success('Registration successful! Please check your email for the OTP.');
      navigate('/verify-otp', { state: { email: data.email } });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error('Account with this email already exists.');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="font-body text-[#F5F5F5] min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-[#483D8B] to-[#191970]">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-transparent space-y-6">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold">Create Account</h1>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Username</p>
                <div className="relative">
                  <input
                    {...register('username', {
                      required: 'Username is required',
                      minLength: { value: 3, message: 'Username must be at least 3 characters' },
                      maxLength: { value: 30, message: 'Username must be at most 30 characters' },
                    })}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-[#2C2C54] h-14 placeholder:text-white/50 pl-12 pr-4 text-base font-normal leading-normal"
                    placeholder="Enter your username"
                  />
                </div>
              </label>
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Email ID</p>
                <div className="relative">
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' },
                    })}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-[#2C2C54] h-14 placeholder:text-white/50 pl-12 pr-4 text-base font-normal leading-normal"
                    placeholder="Enter your email ID"
                  />
                </div>
              </label>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Phone Number</p>
                <div className="relative">
                  <input
                    {...register('phone_number', {
                      required: 'Phone number is required',
                      pattern: { value: /^[0-9]{10,15}$/, message: 'Invalid phone number' },
                    })}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-[#2C2C54] h-14 placeholder:text-white/50 pl-12 pr-4 text-base font-normal leading-normal"
                    placeholder="Enter your phone number"
                  />
                </div>
              </label>
              {errors.phone_number && <p className="text-red-500 text-xs mt-1">{errors.phone_number.message}</p>}
            </div>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Password</p>
                <div className="relative">
                  <input
                    {...register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Password must be at least 8 characters' },
                      pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                      },
                    })}
                    type="password"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-[#2C2C54] h-14 placeholder:text-white/50 pl-12 pr-12 text-base font-normal leading-normal"
                    placeholder="Minimum 8 characters"
                  />
                </div>
              </label>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>
            <div>
              <label className="flex flex-col">
                <p className="text-base font-medium pb-2">Confirm Password</p>
                <div className="relative">
                  <input
                    {...register('confirm_password', {
                      required: 'Please confirm your password',
                      validate: (value) => value === password || 'Passwords do not match',
                    })}
                    type="password"
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary border-none bg-[#2C2C54] h-14 placeholder:text-white/50 pl-12 pr-12 text-base font-normal leading-normal"
                    placeholder="Confirm your password"
                  />
                </div>
              </label>
              {errors.confirm_password && <p className="text-red-500 text-xs mt-1">{errors.confirm_password.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-14 bg-primary text-black font-body font-bold rounded-lg text-lg hover:bg-primary/90 transition-all duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
          <p className="text-center text-white/80">
            Already have an account?{' '}
            <Link className="font-medium text-primary hover:underline" to="/login">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
