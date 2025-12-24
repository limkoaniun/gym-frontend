'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export default function Page() {
  const { t } = useTranslation();

  return (
    <div className="absolute bottom-0 w-full">
      <h1 className="text-5xl font-bold text-white leading-tight italic mb-10">
        {t('landing.title')}
        <br />
        {t('landing.subtitle')}
      </h1>

      <div className="space-y-4">
        <Link
          href="/equipments"
          className={cn(
            buttonVariants({ variant: 'cta', size: 'lg' }),
            'w-full uppercase tracking-wider font-bold text-lg'
          )}
        >
          {t('landing.start')}
        </Link>

        <div className="text-center">
          <Link
            href="/login"
            className="text-white/60 hover:text-white/80 text-base transition-colors"
          >
            {t('landing.login')}
          </Link>
        </div>
      </div>
    </div>
  );
}
