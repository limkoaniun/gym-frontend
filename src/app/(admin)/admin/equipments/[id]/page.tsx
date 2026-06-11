'use client';

import React, { useEffect, useState } from 'react';
import { Equipment } from '@/lib/interfaces';
import { useParams } from 'next/navigation';
import { fetchEquipmentById } from '@/lib/api/equipment';
import EquipmentEdit from '@/components/admin/EquipmentEdit';

export default function EquipmentEditPage(){
  const params = useParams();
  const [equipment, setEquipment] = useState<Equipment>({
    description: '',
    medias: [],
    name: '',
    tags: [],
    usages: [],
  });
  useEffect(() => {
    fetchEquipmentById(params.id as string).then(data => setEquipment(data));
  }, []);
  return(
    <>
      <EquipmentEdit existingEquipment={equipment} />
    </>
  )
}
