import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const token = useAuthStore((s) => s.token);
  const initialized = useAuthStore((s) => s.initialized);

  // While initializing, don't redirect
  if (!initialized) return <>{children}</>;

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
