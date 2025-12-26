import { Button } from '@/components/ui/button';
import { GoogleIcon, WeChatIcon } from '@/components/ui/icons';
import { Apple, Phone } from 'lucide-react';
import React from 'react';
import { useTranslation } from 'react-i18next';

const SocialMediaButtons = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-3">
      <Button
        variant="outline"
        className="w-full h-12 py-3 text-white rounded-lg justify-start border-input hover:bg-accent/10"
      >
        <GoogleIcon /> {t('auth.signInGoogle')}
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 py-3 text-white rounded-lg justify-start border-input hover:bg-accent/10"
      >
        <WeChatIcon /> {t('auth.signInWechat')}
      </Button>

      <Button
        variant="outline"
        className="w-full h-12 py-3 text-white rounded-lg justify-start border-input hover:bg-accent/10"
      >
        <Apple className="mr-2 h-5 w-5" /> {t('auth.signInApple')}
      </Button>
    </div>
  );
};

export default SocialMediaButtons;
