'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { User } from '@/lib/interfaces';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Camera, Save, X } from 'lucide-react';

interface EditProfileSheetProps {
  user: User;
  onSave: (updatedUser: Partial<User>) => void;
  children: React.ReactNode;
}

export function EditProfileSheet({ user, onSave, children }: EditProfileSheetProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user.username,
    email: user.email,
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.username,
      email: user.email,
    });
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md bg-black/90 backdrop-blur-md border-white/10"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl text-white">{t('profile.editProfile')}</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Avatar Section */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20 border-2 border-white/20">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name)}&backgroundColor=4f46e5&textColor=ffffff`}
                  alt={formData.name}
                />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg font-semibold">
                  {getInitials(formData.name)}
                </AvatarFallback>
              </Avatar>

              <Button
                size="icon"
                variant="secondary"
                className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 border border-white/20"
              >
                <Camera size={16} className="text-white" />
              </Button>
            </div>

            <p className="text-sm text-white/60 text-center">{t('profile.edit.changePhoto')}</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white font-medium">
                {t('profile.edit.fullName')}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => handleInputChange('name', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                placeholder={t('profile.edit.enterName')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                {t('profile.edit.emailAddress')}
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange('email', e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40"
                placeholder={t('profile.edit.enterEmail')}
              />
            </div>
          </div>

          {/* Additional Settings */}
          <div className="bg-white/5 rounded-lg p-4 border border-white/10">
            <h4 className="text-sm font-medium text-white mb-3">{t('profile.edit.preferences')}</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">
                  {t('profile.edit.emailNotifications')}
                </span>
                <div className="w-10 h-6 bg-white/20 rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1 transition-transform"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/70">{t('profile.edit.pushNotifications')}</span>
                <div className="w-10 h-6 bg-primary rounded-full relative">
                  <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1 transition-transform"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-8 gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1 bg-transparent border-white/20 text-white hover:bg-white/10"
          >
            <X size={16} className="mr-2" />
            {t('common.cancel')}
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-primary hover:bg-primary/90 text-white">
            <Save size={16} className="mr-2" />
            {t('common.save')}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
