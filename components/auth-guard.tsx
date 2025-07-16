'use client';

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser } from '@/context/user';
import Spinner from './spinner';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: 'student' | 'employer';
  fallback?: React.ReactNode;
}

export function AuthGuard({ 
  children, 
  requiredRole, 
  fallback 
}: AuthGuardProps) {
  const { user, isLoading, isLoggedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // If not logged in, redirect to login
      if (isLoggedIn === false) {
        router.push('/login');
        return;
      }

      // If role is required and user doesn't have the required role
      if (requiredRole && user && user.role !== requiredRole) {
        // Redirect based on user's actual role
        if (user.role === 'student') {
          router.push('/student/dashboard');
        } else if (user.role === 'employer') {
          router.push('/employer/dashboard');
        }
        return;
      }
    }
  }, [isLoading, isLoggedIn, user, requiredRole, router]);

  // Show loading spinner while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-8 h-8 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Show fallback if provided and not authenticated
  if (isLoggedIn === false && fallback) {
    return <>{fallback}</>;
  }

  // If not logged in, show nothing (will redirect)
  if (isLoggedIn === false) {
    return null;
  }

  // If role is required and user doesn't have the required role, show nothing (will redirect)
  if (requiredRole && user && user.role !== requiredRole) {
    return null;
  }

  // If authenticated and has required role (or no role required), show children
  return <>{children}</>;
}

// Higher-order component for role-based protection
export function withAuthGuard<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole?: 'student' | 'employer'
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <AuthGuard requiredRole={requiredRole}>
        <Component {...props} />
      </AuthGuard>
    );
  };
} 