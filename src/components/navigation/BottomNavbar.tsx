'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogIn, CalendarHeart, User, House } from 'lucide-react';
import React from 'react';
import { useAppContext } from '@/context/AppContext';

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

export function BottomNavbar() {
  const pathname = usePathname();
  const { currentUser } = useAppContext();

  const baseNavItems: NavItem[] = [
    { href: '/login', label: 'Login', icon: <LogIn size={22} /> },
    { href: '/home', label: 'Home', icon: <House size={22} /> },
    { href: '/schedule', label: 'Schedule', icon: <CalendarHeart size={22} /> },
    { href: '/profile', label: 'Profile', icon: <User size={22} /> },
  ];

  const navItems = currentUser ? baseNavItems.filter(item => item.href !== '/login') : baseNavItems;

  const colsClass =
    navItems.length === 3 ? 'grid-cols-3' : navItems.length === 4 ? 'grid-cols-4' : 'grid-cols-4'; // fallback

  return (
    <nav className="absolute bottom-0 h-[80px] w-full border-t border-white/10  backdrop-blur-md">
      <div className={`grid h-16 max-w-lg  mx-auto font-medium ${colsClass}`}>
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
