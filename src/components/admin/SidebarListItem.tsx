'use client';
import React from 'react';
import Link from 'next/link';

type SidebarListItemProps = {
  itemName: string;
  icon: React.ReactNode;
  linkUrl: string;
  isFocused: boolean;
};

const SidebarListItem = ({ itemName, icon, linkUrl, isFocused }: SidebarListItemProps) => {
  return (
    <>
      <li className="group/menu-item relative">
        <Link
          className={`
          peer/menu-button 
          w-full overflow-hidden
          p-2 text-left outline-none
          ring-sidebar-ring 
          focus-visible:ring-2
          active:bg-sidebar-accent 
          active:text-sidebar-accent-foreground
          disabled:pointer-events-none disabled:opacity-50
          group-has-[[data-sidebar=menu-action]]/menu-item:pr-8
          aria-disabled:pointer-events-none
          aria-disabled:opacity-50
          data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium
          data-[active=true]:text-sidebar-accent-foreground
          data-[state=open]:hover:bg-sidebar-accent
          data-[state=open]:hover:text-sidebar-accent-foreground
          group-data-[collapsible=icon]:!size-8
          group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate
          [&>svg]:size-4 [&>svg]:shrink-0 
          h-8 text-sm flex items-center gap-3
          rounded-lg px-3 py-2 text-sidebar-foreground/70
          transition-all 
          ${isFocused ? ' bg-cyan-900' : 'hover:bg-sidebar-accent hover:text-sidebar-foreground'}
          `}
          href={linkUrl}
        >
          {icon} {itemName}
        </Link>
      </li>
    </>
  );
};

export default SidebarListItem;
