'use client';

import EquipmentListItem from '@/components/equipments/EquipmentListItem';
import { Equipment } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { fetchEquipments } from '@/lib/api/equipment';

export default function Page() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEquipments().then(data => {
      setEquipments(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      {equipments &&
        equipments.map(equipment => <EquipmentListItem equipment={equipment} key={equipment.id} />)}
    </div>
  );
}
