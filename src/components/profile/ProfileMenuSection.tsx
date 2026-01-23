'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  User,
  KeyRound,
  Bell,
  Heart,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'default' | 'danger';
}

function MenuItem({
  icon,
  title,
  subtitle,
  href,
  onClick,
  variant = 'default'
}: MenuItemProps) {
  const baseClasses =
    'w-full justify-start text-left h-auto py-3 px-4 hover:bg-white/10 transition-colors duration-200';
  const textColorClass =
    variant === 'danger' ? 'text-red-400 hover:text-red-300' : 'text-white hover:text-white';

  const content = (
    <div className="flex items-center space-x-3 w-full">
      <div className={variant === 'danger' ? 'text-red-400' : 'text-white/70'}>
        {icon}
      </div>
      <div className="flex-1">
        <div className={`font-medium ${textColorClass}`}>{title}</div>
        {subtitle && (
          <div className="text-xs text-white/50 mt-0.5">{subtitle}</div>
        )}
      </div>
      <ChevronRight size={16} className="text-white/40" />
    </div>
  );

  if (href) {
    return (
      <Link href={href}>
        <Button variant="ghost" className={baseClasses}>
          {content}
        </Button>
      </Link>
    );
  }

  return (
    <Button variant="ghost" className={baseClasses} onClick={onClick}>
      {content}
    </Button>
  );
}

export function ProfileMenuSection() {
  const { t } = useTranslation();

  const handleLogout = () => {
    // Implementation for logout
    console.log('Logout clicked');
    window.location.href = '/login';
  };

  return (
    <div className="space-y-4">
      {/* Account Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            {t('profile.sections.account')}
          </h3>
        </div>
        <div className="space-y-1 p-2">
          <MenuItem
            icon={<User size={20} />}
            title={t('profile.menu.accountDetails')}
            subtitle={t('profile.menu.accountDetailsSubtitle')}
          />
          <MenuItem
            icon={<KeyRound size={20} />}
            title={t('profile.menu.changePassword')}
            subtitle={t('profile.menu.changePasswordSubtitle')}
          />
          <MenuItem
            icon={<Bell size={20} />}
            title={t('profile.menu.notifications')}
            subtitle={t('profile.menu.notificationsSubtitle')}
          />
        </div>
      </div>

      {/* Activity Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            {t('profile.sections.activity')}
          </h3>
        </div>
        <div className="space-y-1 p-2">
          <MenuItem
            icon={<Heart size={20} />}
            title={t('profile.menu.favorites')}
            subtitle={t('profile.menu.favoritesSubtitle')}
          />
          <MenuItem
            icon={<BarChart3 size={20} />}
            title={t('profile.menu.workoutHistory')}
            subtitle={t('profile.menu.workoutHistorySubtitle')}
          />
        </div>
      </div>

      {/* Settings Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white">
            {t('profile.sections.settings')}
          </h3>
        </div>
        <div className="space-y-1 p-2">
          <MenuItem
            icon={<Settings size={20} />}
            title={t('profile.menu.appSettings')}
            subtitle={t('profile.menu.appSettingsSubtitle')}
          />
          <MenuItem
            icon={<HelpCircle size={20} />}
            title={t('profile.menu.helpSupport')}
            subtitle={t('profile.menu.helpSupportSubtitle')}
          />
        </div>
      </div>

      {/* Logout */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
        <div className="p-2">
          <MenuItem
            icon={<LogOut size={20} />}
            title={t('profile.menu.logout')}
            onClick={handleLogout}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
}