import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export function LoginFooter() {
  const { t } = useTranslation();

  return (
    <>
      <div className="text-center mt-4">
        <p className="text-sm text-white/80">
          {t('landing.noAcc')}{' '}
          <Link href="/signup" className="text-primary font-medium hover:underline">
            {t('landing.signUp')}
          </Link>
        </p>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/20" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-transparent px-2 text-white/60">{t('auth.or')}</span>
        </div>
      </div>
    </>
  );
}
