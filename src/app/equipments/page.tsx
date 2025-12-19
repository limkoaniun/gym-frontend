'use client';

import EquipmentListItem from '@/components/equipments/EquipmentListItem';
import { Equipment } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { searchEquipments } from '@/lib/api/equipment';
import { useAppContext } from '@/context/AppContext';
import SearchBar from '@/components/dashboard/SearchBar';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const { setLoadingMask } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    fetchEquipmentFromApi();
  }, []);

  const fetchEquipmentFromApi = (query?: string) => {
    setLoadingMask(true);
    searchEquipments(query)
      .then(data => {
        setEquipments(data as Equipment[]);
      })
      .finally(() => {
        setLoadingMask(false);
      });
  };

  const handleSearch = (inputText: string) => {
    fetchEquipmentFromApi(inputText);
  };

  const handleClick = (id: number | string) => {
    router.push(`/equipments/${id}`);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />

      <div className="flex flex-col mt-1 overflow-auto h-[calc(100%-100px)]">
        <div className="max-w-full max-auto">
          {equipments &&
            equipments.map(equipment => (
              <EquipmentListItem
                equipment={equipment}
                key={equipment.id}
                onClick={() => handleClick(equipment.id)}
              />
            ))}
        </div>
      </div>
    </>
  );
}
