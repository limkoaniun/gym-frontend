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
    <div className="flex-1 flex flex-col">
      {/* centered column for all public pages */}
      <main
        className="
        relative z-10
        flex flex-col flex-grow flex-shrink
        justify-between
        px-4 py-6
        w-full
        max-w-xs    /* mobile */
        sm:max-w-sm /* small tablets */
        md:max-w-md
        lg:max-w-lg
        xl:max-w-2xl
        2xl:max-w-3xl
        mx-auto
        "
      >
        {/* global header */}
        <header className="flex items-center justify-between">
          <p className="text-white/60 text-sm font-semibold tracking-wider uppercase">
            {t('brandName')}
          </p>
          <LanguageSwitcher />
        </header>

        {/* page specific content */}
        <div>{children}</div>
        {!navbarHiddenPaths.includes(currentPathname) && <BottomNavbar />}
      </main>
    </div>
  );
}
