'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/context/AppContext';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { StatsCard } from '@/components/profile/StatsCard';
import { ProfileMenuSection } from '@/components/profile/ProfileMenuSection';
import { Activity, Dumbbell, Target, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { t } = useTranslation();
  const { currentUser } = useAppContext();

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-80px)] px-6">
        <div className="text-center">
          <p className="text-white/60 text-lg mb-4">{t('profile.notLoggedIn')}</p>
          <Link
            href="/login"
            className="text-white hover:text-white/80 underline underline-offset-4"
          >
            {t('profile.loginToViewProfile')}
          </Link>
        </div>
      </div>
    );
  }

  const mockStats = [
    {
      icon: <Activity size={24} />,
      title: t('profile.stats.workoutsCompleted'),
      value: '24',
      subtitle: t('profile.stats.thisMonth'),
    },
    {
      icon: <Dumbbell size={24} />,
      title: t('profile.stats.favoriteEquipment'),
      value: '8',
      subtitle: t('profile.stats.items'),
    },
    {
      icon: <Target size={24} />,
      title: t('profile.stats.goalsAchieved'),
      value: '12',
      subtitle: t('profile.stats.total'),
    },
    {
      icon: <Clock size={24} />,
      title: t('profile.stats.totalTime'),
      value: '45h',
      subtitle: t('profile.stats.thisMonth'),
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] px-6 py-8 pb-24">
      <div className="max-w-md mx-auto space-y-6">
        <ProfileHeader user={currentUser} />

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">{t('profile.yourStats')}</h2>
          <div className="grid grid-cols-2 gap-4">
            {mockStats.map((stat, index) => (
              <StatsCard
                key={index}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
                subtitle={stat.subtitle}
              />
            ))}
          </div>
        </div>

        <ProfileMenuSection />
      </div>
    </div>
  );
}
