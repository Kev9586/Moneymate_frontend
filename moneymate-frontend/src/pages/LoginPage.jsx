import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../api/apiClient';
import { AuthContext } from '../contexts/AuthContext';

export default function LoginPage() {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      const response = await apiClient.post('/auth/login', data);
      const { token, user } = response.data;
      login({ token, user });
      localStorage.setItem('token', token);
      toast.success('Logged in successfully!');
      navigate('/');
    } catch (error) {
      toast.error('Invalid email or password.');
    }
  };

  return (
    <div className="font-body bg-background-dark text-white min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#483D8B] to-[#191970]">
      <h1 className="font-display text-white tracking-light text-[32px] font-bold leading-tight text-center pb-3 pt-6">MoneyMate</h1>
      <p className="text-gray-300 text-lg font-normal leading-normal pb-12 text-center">Securely Log In</p>
      <div className="w-full max-w-sm space-y-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Email</p>
              <div className="flex w-full flex-1 items-stretch rounded-lg border border-gray-600 bg-[#292c38]/50 focus-within:border-primary transition-colors duration-300">
                <input
                  {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-14 placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
                  placeholder="Enter your email"
                />
              </div>
            </label>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">Password</p>
              <div className="flex w-full flex-1 items-stretch rounded-lg border border-gray-600 bg-[#292c38]/50 focus-within:border-primary transition-colors duration-300">
                <input
                  {...register('password', { required: 'Password is required' })}
                  type="password"
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-14 placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
                  placeholder="Enter your password"
                />
              </div>
            </label>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>
          <div className="text-right">
            <a className="text-gray-300 text-sm font-normal leading-normal underline hover:text-primary transition-colors duration-300" href="#">Forgot Password?</a>
          </div>
          <div className="flex py-3 justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex min-w-[84px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-5 bg-primary text-midnight-blue text-base font-bold leading-normal tracking-[0.015em] hover:bg-cyan-400 transition-colors duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
        <p className="text-gray-300 text-sm font-normal leading-normal text-center">
          Don't have an account?{' '}
          <Link className="font-bold text-white hover:text-primary transition-colors duration-300" to="/signup">
            Create Account
          </Link>
        </p>
      </div>
      <div className="h-5"></div>
    </div>
  );
}
