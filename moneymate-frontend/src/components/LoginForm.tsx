import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const loginSchema = z.object({
  identifier: z.string().min(3, 'Enter email, username or phone'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const response = await api.post('/auth/login', values);
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/dashboard', { replace: true });
    } catch (error: any) {
      console.error(error);
      // TODO: show toast
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email / Username / Phone</label>
        <input
          {...register('identifier')}
          className="mt-1 block w-full px-3 py-2 border rounded-md"
        />
        {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier.message}</p>}
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

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-2 bg-primary-600 text-white rounded-md font-semibold"
      >
        {isSubmitting ? 'Signing in...' : 'Sign In'}
      </button>
    </form>
  );
};

export default LoginForm;
