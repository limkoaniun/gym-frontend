'use client';

import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/components/login/LanguageSwitcher';
import { BottomNavbar } from '@/components/navigation/BottomNavbar';
import { usePathname } from 'next/navigation';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  const currentPathname = usePathname();
  const navbarHiddenPaths = ['/', '/login'];

  return (
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
    </div>
  );
}
