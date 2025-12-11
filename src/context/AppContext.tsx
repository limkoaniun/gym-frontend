'use client';

import { createContext, ReactNode, useContext, useState } from 'react';
import { AppContextType, User } from '@/lib/interfaces';

export const AppContext = createContext<AppContextType>({});

export function AppProvider({ children }: { children: ReactNode }) {
  const [loadingMask, setLoadingMask] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    loadingMask,
    setLoadingMask,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  return useContext(AppContext);
}
