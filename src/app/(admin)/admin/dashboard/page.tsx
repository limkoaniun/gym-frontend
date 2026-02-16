'use client';

import DashboardGrid from './DashboardGrid';

export default function DashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Monitor your gym&#39;s performance and manage operations
        </p>
      </div>
      <DashboardGrid />
    </div>
  );
}
