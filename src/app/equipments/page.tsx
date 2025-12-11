'use client';

import EquipmentListItem from '@/components/equipments/EquipmentListItem';
import { Equipment } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { fetchEquipments } from '@/lib/api/equipment';
import { useAppContext } from '@/context/AppContext';

export default function Page() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const { setLoadingMask } = useAppContext();

  useEffect(() => {
    if (setLoadingMask) {
      setLoadingMask(true);
    }

    fetchEquipments()
      .then(data => {
        setEquipments(data as Equipment[]);
      })
      .finally(() => {
        if (setLoadingMask) {
          setLoadingMask(false);
        }
      });
  }, [setLoadingMask]);

  return (
    <div className="flex flex-col">
      {equipments &&
        equipments.map(equipment => <EquipmentListItem equipment={equipment} key={equipment.id} />)}
    </div>
  );
}
