'use client';
import React, { useContext } from 'react';
import Link from 'next/link';
import { CalendarDays, Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UserSettingsSheet } from './UserSettingsSheet';
import { AppContext } from '@/context/AppContext';

export const DashboardHeader = () => {
  const appContext = useContext(AppContext);

  const username = appContext?.currentUser?.name ?? 'Guest';

  return (
    <header className="p-4 border-b border-border flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Dumbbell className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-semibold">GymBuddy</h1>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm">
          {`Welcome, ${username}!`}
        </Button>
        <Link href="/myTrainers">
          <Button variant="outline" size="sm">
            <Dumbbell className="mr-2 h-4 w-4" />
            My Equipment
          </Button>
        </Link>
        <Link href="/trainingSchedule">
          <Button variant="outline" size="sm">
            <CalendarDays className="mr-2 h-4 w-4" />
            Schedule & Progress
          </Button>
        </Link>
        <UserSettingsSheet />
      </div>
    </header>
  );
};
