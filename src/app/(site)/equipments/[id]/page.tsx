'use client';

import UsageListItem from '@/components/equipments/UsageListItem';
import { useParams, useRouter } from 'next/navigation';
import { Equipment, Usage } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { addFavoriteEquipments, fetchEquipmentById } from '@/lib/api/equipment';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

export default function UsagesPage() {
  const params = useParams();
  const { t } = useTranslation();
  const { currentUser } = useAppContext();
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
  }, [id]);

  const handleClick = (id: number | string) => {
    router.push(`/equipments/usages/${id}`);
  };

  const handleSave = () => {
    addFavoriteEquipments(id as string).then(() => {
      toast.success('The equipment has been saved to your favourites');
    });
  };

  return (
    <div className="flex flex-col mt-1 overflow-auto h-[calc(100%-100px)] px-6">
      <h1 className="font-semibold text-center text-2xl">{equipment.name}</h1>
      <p className="my-4">{equipment.description} </p>
      <div className="max-w-full max-auto">
        {equipment.usages &&
          equipment.usages.map((usage: Usage) => (
            <UsageListItem usage={usage} key={usage.id} onClick={() => handleClick(usage.id)} />
          ))}
      </div>
      {!currentUser && (
        <>
          <div className="mt-4 border-2 p-5 rounded-md flex justify-center flex-col">
            <p className="text-lg py-3">{t('equipment.wantToSave')}</p>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full">
                {t('equipment.loginToSave')}
              </Button>
            </Link>
          </div>
          <Link href="/equipments">
            <div className="flex py-5 justify-center mt-10">
              <Button variant="secondary" size="lg" className="w-full bg-white/20">
                {t('equipment.done')}
              </Button>
            </div>
          </Link>
        </>
      )}

      {currentUser && (
        <div className="flex py-5 justify-between mt-10">
          <Button variant="cta" size="lg" className="w-1/2 me-3" onClick={handleSave}>
            {t('equipment.save')}
          </Button>
          <Link
            href="/equipments"
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'lg' }),
              'w-1/2 bg-white/20'
            )}
          >
            {t('equipment.done')}
          </Link>
        </div>
      )}
    </div>
  );
}
