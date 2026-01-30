'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';

import { type LoginFormData, LoginSchema } from '@/lib/schemas';
import { login } from '@/lib/api/auth';
import { LoginCard } from './LoginCard';
import { LoginHeader } from './LoginHeader';
import { EmailStep } from './EmailStep';
import { PasswordStep } from './PasswordStep';
import { LoginFooter } from './LoginFooter';
import SocialMediaButtons from '@/components/ui/socialMedia';
import { LoginButton } from '@/components/auth/LoginButton';
import { useAppContext } from '@/context/AppContext';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { User } from '@/lib/interfaces';
export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [step, setStep] = React.useState<'email' | 'password'>('email');
  const [error, setError] = React.useState<string | null>(null);
  const { t } = useTranslation();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { setCurrentUser } = useAppContext();

  const onSubmitActualLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const currentUser = await login(data);

      if (currentUser) {
        const user: User = {
          id: currentUser.id,
          username: currentUser.username,
          email: currentUser.email,
          role: currentUser.role,
          firstName: currentUser.firstName,
          lastName: currentUser.lastName,
          favouredEquipments: [],
        };
        Cookies.set('currentUser', JSON.stringify(user), {
          path: '/',
          sameSite: 'lax',
        });
        setCurrentUser(user);
        if (user.role == 'customer') {
          router.push('/equipments');
        } else {
          router.push('/admin');
        }
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginCard>
      <LoginHeader />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={form.handleSubmit(onSubmitActualLogin)} className="flex flex-col gap-4">
        <EmailStep
          control={form.control}
          errors={form.formState.errors}
          isLoading={isLoading}
          step={step}
        />

        <PasswordStep control={form.control} errors={form.formState.errors} isLoading={isLoading} />

        <LoginButton
          type="submit"
          isLoading={isLoading}
          loadingText="Logging in..."
          text={t('landing.login')}
        />
      </form>

      <LoginFooter />
      <SocialMediaButtons />
    </LoginCard>
  );
}
