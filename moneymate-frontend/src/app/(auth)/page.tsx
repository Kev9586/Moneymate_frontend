'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { loginSchema, signupSchema } from '@/lib/validators';
import useAuthStore from '@/store/authStore';
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { setUser, setLoading } = useAuthStore();
  const router = useRouter();

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const setSessionCookie = async (token: string) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    });
  };

  const onLoginSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const token = await userCredential.user.getIdToken();
      await setSessionCookie(token);
      setUser(userCredential.user);
      router.push('/');
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
    }
  };

  const onSignupSubmit = async (values: SignupFormValues) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const token = await userCredential.user.getIdToken();
      await setSessionCookie(token);
      setUser(userCredential.user);
      router.push('/');
    } catch (error) {
      console.error('Signup failed:', error);
      setUser(null);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
              <Input
                {...loginForm.register('email')}
                placeholder="Email"
                className="mb-4"
              />
              {loginForm.formState.errors.email && (
                <p className="text-red-500 text-sm mb-4">
                  {loginForm.formState.errors.email.message}
                </p>
              )}
              <Input
                {...loginForm.register('password')}
                type="password"
                placeholder="Password"
                className="mb-4"
              />
              {loginForm.formState.errors.password && (
                <p className="text-red-500 text-sm mb-4">
                  {loginForm.formState.errors.password.message}
                </p>
              )}
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          ) : (
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
              <Input
                {...signupForm.register('fullName')}
                placeholder="Full Name"
                className="mb-4"
              />
              {signupForm.formState.errors.fullName && (
                <p className="text-red-500 text-sm mb-4">
                  {signupForm.formState.errors.fullName.message}
                </p>
              )}
              <Input
                {...signupForm.register('email')}
                placeholder="Email"
                className="mb-4"
              />
              {signupForm.formState.errors.email && (
                <p className="text-red-500 text-sm mb-4">
                  {signupForm.formState.errors.email.message}
                </p>
              )}
              <Input
                {...signupForm.register('password')}
                type="password"
                placeholder="Password"
                className="mb-4"
              />
              {signupForm.formState.errors.password && (
                <p className="text-red-500 text-sm mb-4">
                  {signupForm.formState.errors.password.message}
                </p>
              )}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          )}
          <Button
            variant="link"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full mt-4"
          >
            {isLogin ? 'Need an account? Sign Up' : 'Have an account? Login'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPage;
