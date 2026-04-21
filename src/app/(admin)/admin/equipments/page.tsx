'use client';

import { Dumbbell } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import React, { useEffect, useState } from 'react';
import MediaDialog from '@/components/admin/MediaDialog';
import { Media } from '@/lib/interfaces';
import Link from 'next/link';

export default function EquipmentPage() {
  return (
    <>
      <AdminHeader title="Equipments" icon={<Dumbbell />} subtitle="Manage Equipment" />
      <div>
        <div>Equipment table</div>
        <Link href="equipments/create"> Create </Link>
      </div>
    </>
  );
}
