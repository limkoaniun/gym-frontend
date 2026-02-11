'use client';

import { Tags } from 'lucide-react';
import AdminHeader from '@/components/admin/AdminHeader';
import React from 'react';

export default function TagsPage() {
  return (
    <>
      <AdminHeader title="Tags" icon={<Tags />} subtitle="Manage Tags" />
    </>
  );
}
