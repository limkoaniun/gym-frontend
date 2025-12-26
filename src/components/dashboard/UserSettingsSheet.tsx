'use client';
import React from 'react';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
} from '@/components/ui/sheet';
import { Bell, KeyRound, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const UserSettingsSheet = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Avatar className="h-9 w-9 cursor-pointer">
        <AvatarImage src="https://placehold.co/40x40.png?text=U" alt="User" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    </SheetTrigger>
    <SheetContent side="right" className="flex flex-col p-6">
      <SheetHeader className="mb-4">
        <SheetTitle className="text-xl">User Settings</SheetTitle>
      </SheetHeader>
      <div className="flex-1 space-y-3">
        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2 px-3">
          <User className="mr-3 h-5 w-5 text-muted-foreground" />
          <span>Account Details</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2 px-3">
          <KeyRound className="mr-3 h-5 w-5 text-muted-foreground" />
          <span>Change Password</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-left h-auto py-2 px-3">
          <Bell className="mr-3 h-5 w-5 text-muted-foreground" />
          <span>Notification Preferences</span>
        </Button>
      </div>
      <SheetFooter className="mt-auto pt-4 border-t border-border">
        <Link href="/login" className="w-full">
          <Button variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </Link>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);
