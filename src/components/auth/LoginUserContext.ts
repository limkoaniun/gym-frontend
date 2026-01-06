// src/components/auth/LoginUserContext.ts
'use client';

import { createContext } from 'react';

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface LoginUserContextType {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}

export const LoginUserContext = createContext<LoginUserContextType | undefined>(undefined);