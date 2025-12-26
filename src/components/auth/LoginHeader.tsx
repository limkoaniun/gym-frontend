import { useTranslation } from 'react-i18next';

export function LoginHeader() {
  const { t } = useTranslation();

  return (
    <div className="text-center mb-6">
      <h1 className="text-white text-2xl font-semibold mb-3">{t('landing.welcome')}</h1>
    </div>
  );
}
