import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const signupSchema = z.object({
  full_name: z.string().min(3, 'Full name is required'),
  username: z.string().min(3, 'Username is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormValues>({ resolver: zodResolver(signupSchema) });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      // Start signup init - depending on API this may return a pending OTP requirement
      const response = await api.post('/auth/signup', values);
      // If the API requires OTP step, open OTP modal; for now assume success returns token
      const { token } = response.data;
      if (token) {
        localStorage.setItem('token', token);
        navigate('/dashboard', { replace: true });
      } else {
        // TODO: handle OTP flow
        navigate('/auth', { replace: true });
      }
    } catch (error: any) {
      console.error(error);
      // TODO: show toast
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Full name</label>
        <input {...register('full_name')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        {errors.full_name && <p className="text-red-500 text-sm">{errors.full_name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input {...register('username')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input {...register('email')} className="mt-1 block w-full px-3 py-2 border rounded-md" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          {...register('password')}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full py-2 bg-primary-600 text-white rounded-md font-semibold">
        {isSubmitting ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  );
};

export default SignupForm;
