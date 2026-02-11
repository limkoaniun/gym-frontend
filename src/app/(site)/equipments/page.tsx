'use client';

import EquipmentListItem from '@/components/equipments/EquipmentListItem';
import { Equipment } from '@/lib/interfaces';
import { useCallback, useEffect, useState } from 'react';
import { searchEquipments, searchEquipmentsByImage } from '@/lib/api/equipment';
import { useAppContext } from '@/context/AppContext';
import SearchBar from '@/components/dashboard/SearchBar';
import { useRouter } from 'next/navigation';

export default function Page() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const { setLoadingMask } = useAppContext();
  const router = useRouter();

  const fetchEquipmentViaTextSearching = useCallback(
    (query?: string) => {
      setLoadingMask(true);
      searchEquipments(query)
        .then(data => {
          setEquipments(data as Equipment[]);
        })
        .finally(() => {
          setLoadingMask(false);
        });
    },
    [setLoadingMask]
  );

  const fetchEquipmentViaImageSearching = (file: File) => {
    setLoadingMask(true);
    searchEquipmentsByImage(file)
      .then(data => {
        setEquipments(data as Equipment[]);
      })
      .finally(() => {
        setLoadingMask(false);
      });
  };

  useEffect(() => {
    fetchEquipmentViaTextSearching();
  }, [fetchEquipmentViaTextSearching]);

  const handleTextSearch = (inputText: string) => {
    fetchEquipmentViaTextSearching(inputText);
  };

  const handleImageSearch = (file?: File) => {
    if (!file) {
      return;
    }
    fetchEquipmentViaImageSearching(file);
  };

  const handleClick = (id: number | string) => {
    router.push(`/equipments/${id}`);
  };

  return (
    <>
      <SearchBar handleTextSearch={handleTextSearch} handleImageSearch={handleImageSearch} />

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
