import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import LoginScreen from '../screens/LoginScreen';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { token } = useAuthStore();

  if (!token) {
    return <LoginScreen />;
  }

  return <>{children}</>;
}
