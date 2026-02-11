'use client';

import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/login/LanguageSwitcher';
import { BottomNavbar } from '@/components/navigation/BottomNavbar';
import { usePathname } from 'next/navigation';
import { AppProvider, useAppContext } from '@/context/AppContext';
import { Spinner } from '@/components/ui/spinner';
import { Carter_One } from 'next/font/google';

const carterOne = Carter_One({
  weight: '400',
  subsets: ['latin'],
});

function ClientLayoutContent({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const currentPathname = usePathname();
  const { loadingMask } = useAppContext();
  const componentHiddenPaths = ['/', '/login', '/signup'];

  return (
    <div className="max-w-[700px] mx-auto px-4 relative h-screen">
      {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
      {/* global header */}
      <header className="h-[100px] w-full flex items-center justify-between">
        <p className="text-white/60 text-sm font-semibold tracking-wider uppercase">
          {t('brandName')}
        </p>
        <LanguageSwitcher />
      </header>

      {/* page specific content */}
      <main className=" mb-[100px] relative h-[calc(100vh-180px)] w-full box-border">
        {children}
      </main>

      {!componentHiddenPaths.includes(currentPathname) && <BottomNavbar />}
      {loadingMask && (
        <div className="flex flex-col fixed inset-0 bg-black/40 items-center justify-center text-white text-lg z-50">
          <Spinner className="size-16" />
          <div className={carterOne.className}>Loading ...</div>
        </div>
      )}
    </div>
  );
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AppProvider>
      <ClientLayoutContent>{children}</ClientLayoutContent>
    </AppProvider>
  );
}
