'use client';

import {Heart} from "lucide-react";
import React from "react";
import AdminHeader from '@/components/admin/AdminHeader';
export default function TrainingMethodPage() {
  return <>
   <AdminHeader title="Traning Method" icon={<Heart />} subtitle="Manage Training Method"/>
  </>;
}
