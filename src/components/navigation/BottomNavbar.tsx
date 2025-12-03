'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, Settings, User, Wallet } from 'lucide-react';
import React from 'react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export function BottomNavbar() {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { href: '/login', label: 'Login', icon: <LogIn size={22} /> },
    { href: '/wallet', label: 'Wallet', icon: <Wallet size={22} /> },
    { href: '/settings', label: 'Settings', icon: <Settings size={22} /> },
    { href: '/profile', label: 'Profile', icon: <User size={22} /> },
  ];

  return (
    <nav className="absolute bottom-0 h-[80px] w-full border-t border-white/10  backdrop-blur-md">
      <div className="grid h-16 max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`
              inline-flex flex-col items-center justify-center px-5
              text-sm transition-transform duration-150
              ${pathname === item.href ? 'text-white scale-110' : 'text-white/60 hover:text-white'}
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
