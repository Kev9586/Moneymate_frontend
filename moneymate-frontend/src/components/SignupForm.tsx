import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import useAuthStore from '../store/useAuthStore';

const signupSchema = z
  .object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type SignupFormInputs = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
  const { signup, loading, error } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormInputs) => {
    signup(data.email, data.password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && <p className="text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-400">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="mt-1 block w-full px-4 py-3 bg-input-bg border border-gray-700 rounded-md shadow-sm text-light-text placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
        />
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-400">
          Password
        </label>
        <input
          id="password"
          type="password"
          {...register('password')}
          className="mt-1 block w-full px-4 py-3 bg-input-bg border border-gray-700 rounded-md shadow-sm text-light-text placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
        />
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
      </div>
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          {...register('confirmPassword')}
          className="mt-1 block w-full px-4 py-3 bg-input-bg border border-gray-700 rounded-md shadow-sm text-light-text placeholder-gray-500 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
        />
        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
      </div>
      <motion.button
        type="submit"
        className="w-full py-3 px-4 bg-accent text-dark-bg font-semibold rounded-md shadow-sm hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent disabled:opacity-50"
        whileTap={{ scale: 0.98 }}
        disabled={loading}
      >
        {loading ? 'Signing up...' : 'SIGNUP'}
      </motion.button>
    </form>
  );
};

export default SignupForm;
