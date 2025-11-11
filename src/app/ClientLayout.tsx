// app/ClientLayout.tsx
'use client';

import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { LoginUserContext, User } from '@/components/auth/LoginUserContext';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    return (
        <LoginUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
                draggable
            />
        </LoginUserContext.Provider>
    );
}