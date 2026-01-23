'use client';

import React from 'react';
import { User } from '@/lib/interfaces';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useTranslation } from 'react-i18next';
import { Edit3, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { EditProfileSheet } from './EditProfileSheet';

interface ProfileHeaderProps {
  user: User;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const { t } = useTranslation();

  const handleSaveProfile = (updatedUser: Partial<User>) => {
    // Implementation for saving profile updates
    console.log('Profile updated:', updatedUser);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/10 p-6">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <Avatar className="h-20 w-20 border-2 border-white/20">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}&backgroundColor=4f46e5&textColor=ffffff`}
              alt={user.name}
            />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>

          <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1">
            <CheckCircle size={16} className="text-white" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-white">{user.name}</h1>
          <p className="text-white/60 text-sm">{user.email}</p>
          <div className="flex items-center justify-center space-x-1 mt-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-green-400 text-xs font-medium">{t('profile.status.active')}</span>
          </div>
        </div>

        <EditProfileSheet user={user} onSave={handleSaveProfile}>
          <Button
            variant="ghost"
            size="sm"
            className="text-white/80 hover:text-white hover:bg-white/10 border border-white/20"
          >
            <Edit3 size={16} className="mr-2" />
            {t('profile.editProfile')}
          </Button>
        </EditProfileSheet>
      </div>
    </div>
  );
}