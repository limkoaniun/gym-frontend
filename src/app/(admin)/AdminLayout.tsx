'use client';

import React, { ReactNode } from 'react';
import { Bone, Dumbbell, LayoutDashboard, Heart, LogOut, Tags, Users } from 'lucide-react';
import SidebarListItem from '@/components/admin/SidebarListItem';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { AppProvider } from '@/context/AppContext';

const sidebarMenuItems = [
  { itemName: 'Dashboard', icon: <LayoutDashboard />, linkUrl: '/admin' },
  { itemName: 'Equipment', icon: <Dumbbell />, linkUrl: '/admin/equipment' },
  { itemName: 'Training Method', icon: <Heart />, linkUrl: '/admin/training-method' },
  { itemName: 'Muscle', icon: <Bone />, linkUrl: '/admin/muscle' },
  { itemName: 'Tags', icon: <Tags />, linkUrl: '/admin/tags' },
  { itemName: 'Users', icon: <Users />, linkUrl: '/admin/users' },
];

function AdminLayout({ children }: { children: ReactNode }) {
  const pathName = usePathname();
  let isFocused = false;

  return (
    <AppProvider>
      <div className="flex h-screen">
        <div className="w-64 p-1 bg-[#17181A]">
          {/* Logo */}
          <div className="flex flex-col gap-2 border-b border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                <Image src="/assets/logo.svg" alt="logo" width={40} height={40} />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-sidebar-foreground">
                  <Link href="/admin">GymApp Admin</Link>
                </h1>
                <p className="text-xs text-muted-foreground">Management System</p>
              </div>
            </div>
          </div>

          {/* Main Menu */}
          <div className="flex w-full min-w-0 flex-col p-2 h-[calc(100vh_-_165px)] overflow-y-auto">
            <div className="flex h-8 shrink-0 items-center rounded-md px-2 font-medium outline-none ring-sidebar-ring transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0 group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0 text-xs uppercase tracking-wider text-muted-foreground">
              Main Menu
            </div>
            <div className="w-full text-sm">
              <ul className="flex w-full min-w-0 flex-col gap-1">
                {sidebarMenuItems.map(item => {
                  isFocused = item.linkUrl == pathName;
                  return (
                    <SidebarListItem
                      itemName={item.itemName}
                      icon={item.icon}
                      linkUrl={item.linkUrl}
                      isFocused={isFocused}
                      key={item.itemName}
                    />
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-2 border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-accent">
                AU
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-sidebar-foreground">Admin Name</p>
                <p className="text-xs text-muted-foreground">Admin Email</p>
              </div>
              <button className="rounded-lg p-2 text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-grow p-3 overflow-auto bg-[#0A080B]">
          {children}
          <div>current url = {pathName}</div>
        </main>
      </div>
    </AppProvider>
  );
}

export default AdminLayout;
