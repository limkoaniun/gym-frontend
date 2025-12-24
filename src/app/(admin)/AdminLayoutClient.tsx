'use client';

import React, { ReactNode, useEffect } from 'react';
import { Bone, Dumbbell, Heart, LogOut, Tags, Users } from 'lucide-react';
import SidebarListItem from '@/components/admin/SidebarListItem';

export function AdminLayoutClient({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add('dark');
    return () => {
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-64 p-1 bg-[#17181A]">
        {/* Logo */}
        <div className="flex flex-col gap-2 border-b border-sidebar-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg">logo</div>
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">GymApp Admin</h1>
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
              <SidebarListItem tagName="Equipment" icon={<Dumbbell />} linkUrl="/equipment" />
              <SidebarListItem
                tagName="Training Method"
                icon={<Heart />}
                linkUrl="/training-method"
              />
              <SidebarListItem tagName="Muscle" icon={<Bone />} linkUrl="/muscle" />
              <SidebarListItem tagName="Tags" icon={<Tags />} linkUrl="/tags" />
              <SidebarListItem tagName="Users" icon={<Users />} linkUrl="/users" />
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

      <main className="flex-grow p-3 overflow-auto bg-[#0A080B]">{children}</main>
    </div>
  );
}
