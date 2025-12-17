'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { AppContextType, User } from '@/lib/interfaces';

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [loadingMask, setLoadingMask] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();

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
