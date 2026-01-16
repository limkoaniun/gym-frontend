'use client';

import { useParams } from 'next/navigation';
import { Equipment, Usage, Step, Muscle, Media, User } from '@/lib/interfaces';
import { useEffect, useState } from 'react';
import { fetchUsageById } from '@/lib/api/equipment';
import { Button, buttonVariants } from '@/components/ui/button';
import { Carousel } from 'flowbite-react';
import { index } from 'd3-array';
import StepSlide from '@/components/equipments/StepSlide';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const API = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function StepPage() {
  const params = useParams();
  const { t } = useTranslation();
  const { currentUser } = useAppContext();
  const id = params.id; // Access the 'slug' dynamic parameter
  const [usage, setUsage] = useState<Usage>({
    id: 0,
    name: '',
    description: '',
    muscles: [],
    steps: [],
    medias: [],
  });
  const [setupSteps, setSetupSteps] = useState<Step[]>([]);
  const [executeSteps, setExecuteSteps] = useState<Step[]>([]);

  useEffect(() => {
    fetchUsageById(id as string).then((data: Usage) => {
      setUsage(data);
      const newSetups: Step[] = [];
      const newExecutes: Step[] = [];
      data.steps.forEach(step => {
        if (!step.setUp) {
          newExecutes.push(step);
        } else {
          newSetups.push(step);
        }
      });
      setSetupSteps(newSetups);
      setExecuteSteps(newExecutes);
    });
  }, []);

  const [showPreparation, setShowPreparation] = useState(false);

  const handleShowPreparation = () => {
    setShowPreparation(!showPreparation);
  };



  return (
    <div>
      <h1 className=" py-3 text-2xl font-bold">{usage.name}</h1>
      <div className="my-4 flex-col">
        {usage.muscles.map(muscle => (
          <span
            key={muscle.name}
            className="me-4 inline-flex items-center rounded-md bg-white/10 px-3 py-2 text-xs font-medium text-white ring-1 ring-inset ring-white/20"
          >
            {muscle.name}
          </span>
        ))}
      </div>

      {showPreparation && (
        <div>
          <div className="mt-6 flex justify-between">
            <h2 className="py-3 text-xl font-bold">{t('equipment.preparation')}</h2>
            <Button variant="outline" size="sm" onClick={handleShowPreparation}>
              {t('equipment.hidePreparation')}
            </Button>
          </div>
          <StepSlide steps={setupSteps} />
        </div>
      )}
      <div className="mt-6 flex justify-between">
        <div className="py-3 text-xl font-bold">{t('equipment.execution')}</div>
        {!showPreparation && (
          <Button variant="outline" size="sm" onClick={handleShowPreparation}>
            {t('equipment.showPreparation')}
          </Button>
        )}
      </div>
      <StepSlide steps={executeSteps} />
      <Link
        href="/equipments"
        className={cn(
          buttonVariants({ variant: 'secondary', size: 'lg' }),
          'w-full bg-white/20 mt-6'
        )}
      >
        {t('equipment.done')}
      </Link>
    </div>
  );
}
