'use client';

import * as React from 'react';
import { useContext } from 'react';
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
import { AppContext } from '@/context/AppContext';
import { useTranslation } from 'react-i18next';

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

  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('LoginForm must be used within a AppContext.Provider');
  }

  const { setCurrentUser } = appContext;

  const onSubmitActualLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const currentUser = await login(data);

      if (currentUser) {
        const user = {
          id: currentUser.userId,
          name: currentUser.username,
          email: currentUser.email,
        };

        setCurrentUser(user);
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
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
