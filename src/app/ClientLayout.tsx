'use client';

import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/login/LanguageSwitcher';
import { BottomNavbar } from '@/components/navigation/BottomNavbar';
import { usePathname } from 'next/navigation';
import { AppProvider, useAppContext } from '@/context/AppContext';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const currentPathname = usePathname();
  const { loadingMask } = useAppContext();
  const navbarHiddenPaths = ['/', '/login', '/signup'];

  return (
    <AppProvider>
      <div className="max-w-[700px] mx-auto px-4 relative h-screen">
        {/* global header */}
        <header className="h-[100px] w-full flex items-center justify-between">
          <p className="text-white/60 text-sm font-semibold tracking-wider uppercase">
            {t('brandName')}
          </p>
          <LanguageSwitcher />
        </header>

        {/* page specific content */}
        <main className=" mb-[100px] relative overflow-scroll h-[calc(100vh-180px)] w-full box-border">
          {children}
        </main>

        {!navbarHiddenPaths.includes(currentPathname) && <BottomNavbar />}

        {loadingMask && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center text-white text-lg z-50">
            Loading...
          </div>
        )}
      </div>
    </AppProvider>
  );
}
