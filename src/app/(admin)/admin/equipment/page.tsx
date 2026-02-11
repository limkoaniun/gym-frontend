'use client';

import { Dumbbell } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import React from 'react';

export default function EquipmentPage() {
  return (
    <>
      <AdminHeader title="Equipment" icon={<Dumbbell />} subtitle="Manage Equipment" />
    </>
  );
}
