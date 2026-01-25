'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { AppContextType, User } from '@/lib/interfaces';
import Cookies from 'js-cookie';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loadingMask, setLoadingMask] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  useEffect(() => {
    const storedUser = Cookies.get('currentUser');
    setCurrentUser(storedUser ? JSON.parse(storedUser) : undefined);
  }, []);

  const value: AppContextType = {
    currentUser: currentUser!,
    setCurrentUser,
    loadingMask,
    setLoadingMask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
