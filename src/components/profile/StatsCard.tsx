'use client';

import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
}

export function StatsCard({ icon, title, value, subtitle }: StatsCardProps) {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/10 p-4 hover:bg-white/15 transition-all duration-200">
      <div className="flex items-start space-x-3">
        <div className="text-white/80 mt-1">{icon}</div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white/70 leading-tight">{title}</h3>
          <div className="mt-1">
            <p className="text-2xl font-bold text-white leading-none">{value}</p>
            <p className="text-xs text-white/50 mt-1">{subtitle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
