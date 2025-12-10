'use client';

import EquipmentListItem from '@/components/equipments/EquipmentListItem';
import { useEquipment } from '@/hooks/useEquipment';

export default function Page() {
  const { equipments, loading, error } = useEquipment();

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="flex flex-col">
      {equipments &&
        equipments.map(equipment => <EquipmentListItem equipment={equipment} key={equipment.id} />)}
    </div>
  );
}
