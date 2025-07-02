'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, getUser, isAuthenticated, logout } from '@/lib/auth';

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      if (isAuthenticated()) {
        const userData = getUser();
        setUserState(userData);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    logout();
    setUserState(null);
  };

  const handleSetUser = (newUser: User | null) => {
    setUserState(newUser);
  };

  const value: UserContextType = {
    user,
    isLoggedIn: !!user,
    loading,
    logout: handleLogout,
    setUser: handleSetUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
