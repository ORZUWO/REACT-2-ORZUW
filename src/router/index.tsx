import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/auth/LoginPage';
import RegisterPage from '../pages/auth/RegisterPage';
import HomePage from '../pages/HomePage';
import ProfilePage from '../pages/ProfilePage';
import MessagingPage from '../pages/MessagingPage';
import NotificationsPage from '../pages/NotificationsPage';
import JobsPage from '../pages/JobsPage';
import NetworkPage from '../pages/NetworkPage';
import AIPage from '../pages/AIPage';
import { useAuthStore } from '../store/useAuthStore';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = useAuthStore.getState().token;

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/network',
    element: (
      <ProtectedRoute>
        <NetworkPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile/:userId',
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/messaging',
    element: (
      <ProtectedRoute>
        <MessagingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/notifications',
    element: (
      <ProtectedRoute>
        <NotificationsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/jobs',
    element: (
      <ProtectedRoute>
        <JobsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/ai',
    element: (
      <ProtectedRoute>
        <AIPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
    path: '/auth/register',
    element: <RegisterPage />,
  },
  {
    path: '*',
    element: <Navigate to="/auth/login" replace />,
  },
]);