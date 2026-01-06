'use client';

import UsageListItem from '@/components/equipments/UsageListItem';
import { useParams, useRouter } from 'next/navigation';
import { Equipment, Usage } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { fetchEquipmentById } from '@/lib/api/equipment';

export default function UsagesPage() {
  const params = useParams();
  const id = params.id; // Access the 'slug' dynamic parameter
  const [equipment, setEquipment] = useState<Equipment>({
    description: '',
    id: 0,
    medias: [],
    name: '',
    tags: [],
    usages: [],
  });
  const router = useRouter();

  useEffect(() => {
    fetchEquipmentById(id as string).then((data: Equipment) => {
      setEquipment(data);
    });
  }, []);

  const handleClick = (id: number | string) => {
    router.push(`/equipments/usages/${id}`);
  };

  return (
    <div className="flex flex-col mt-1 overflow-auto h-[calc(100%-100px)]">
      <h1 className="font-semibold text-center text-2xl">{equipment.name}</h1>
      <p className="my-4">{equipment.description} </p>
      <div className="max-w-full max-auto">
        {equipment.usages &&
          equipment.usages.map((usage: Usage) => (
            <UsageListItem usage={usage} key={usage.id} onClick={() => handleClick(usage.id)} />
          ))}
      </div>
    </div>
  );
}
