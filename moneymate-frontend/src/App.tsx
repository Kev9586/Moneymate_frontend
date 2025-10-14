import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import OTPVerification from './pages/OTPVerification';
import ProtectedRoute from './components/ProtectedRoute';
import useAuthStore from './store/useAuthStore';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const bootstrap = useAuthStore((s) => s.bootstrap);

  useEffect(() => {
    // initialize auth state
    bootstrap();
  }, [bootstrap]);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* fallback to splash for unknown routes */}
          <Route path="*" element={<Splash />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;
