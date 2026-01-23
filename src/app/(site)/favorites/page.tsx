'use client';

import EquipmentListItem from '@/components/equipments/EquipmentListItem';
import { Equipment, User } from '@/lib/interfaces';
import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { fetchUserById } from '@/lib/api/user';

export default function Page() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const { currentUser } = useAppContext();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if(currentUser) {
      fetchUserById(currentUser.id).then((data: User) => {
        setEquipments(data.favouredEquipments);
      });
    }
  }, []);

  const handleClick = (id: number | string) => {
    router.push(`/equipments/${id}`);
  };

  return (
    <>
      <h1 className=" py-3 text-2xl font-bold flex justify-center">
        <Heart color="#ec5555" strokeWidth={4} size={30} className="mx-2" /> {t('menu.favorites')}
      </h1>

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
