'use client';

import EquipmentListItem from '@/components/equipments/EquipmentListItem';
import { Equipment } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { fetchEquipments, searchEquipmentsWithAI } from '@/lib/api/equipment';
import { useAppContext } from '@/context/AppContext';
import SearchBar from '@/components/dashboard/SearchBar';

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

  const handleSearch = (inputText: string) => {
    const res = searchEquipmentsWithAI(inputText);
    console.log('receiving data from api', res);

    // console.log('sending request to search: ' + inputText);
  };

  return (
    <>
      <SearchBar handleSearch={handleSearch} />

      <div className="flex flex-col mt-1 overflow-auto h-[calc(100%-100px)]">
        <div className="max-w-full max-auto">
          {equipments &&
            equipments.map(equipment => (
              <EquipmentListItem equipment={equipment} key={equipment.id} />
            ))}
        </div>
      </div>
    </>
  );
}
