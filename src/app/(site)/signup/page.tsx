'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useState } from 'react';
import { signup } from '@/lib/api/auth';
import { SignupPayload } from '@/lib/interfaces';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next'; // --- Main Component ---
// --- Main Component ---
export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState<SignupPayload>({
    email: '',
    username: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<SignupPayload>({ email: null, username: null });
  const { t } = useTranslation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === 'email' || id === 'username') {
      setErrors(prev => ({ ...prev, email: 'Email has already been registered.' }));
      setErrors(prev => ({ ...prev, username: 'Username has already been taken.' }));
      // send request to check existing
      // if exist
      //      show error msg
      //      return
    }
    setForm(prev => ({
      ...prev,
      [id]: value,
    }));
    console.log(form);
  };

  const handleSubmit = async () => {
    console.log('Submitted data:', form);
    const response = await signup(form);
    if (response) {
      toast.success('Signup successful! Please log in.', {
        position: 'top-center',
        toastId: 'signup-success',
      });
      // Redirect to login page or show success message
      router.push('/login');
    }
    console.log('Signup response:', response);
  };

  return (
    <div className="m-auto w-[400px] pt-8">
      {/* Main Content */}
      <Card className="w-full max-w-sm shadow-none border-none bg-transparent">
        {/* Title */}
        <CardHeader className="text-center p-0 mb-6">
          <CardTitle className="text-2xl font-semibold"> {t('landing.createAcc')}</CardTitle>
        </CardHeader>

        {/* Form Fields */}
        <CardContent className="p-0 space-y-4">
          {/* Email */}
          <div>
            <Label htmlFor="email"> {t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('auth.email')}
              value={form.email}
              onChange={handleChange}
              className="text-base h-12 mt-1 rounded-lg border-input focus:border-primary focus:ring-primary"
            />
            {errors.email && <div className="text-red-600">{errors.email}</div>}
          </div>

          {/* Username */}
          <div>
            <Label htmlFor="email">{t('auth.userName')}</Label>
            <Input
              id="username"
              type="username"
              placeholder={t('auth.userName')}
              value={form.username}
              onChange={handleChange}
              className="text-base h-12 mt-1 rounded-lg border-input focus:border-primary focus:ring-primary"
            />
            {errors.username && <div className="text-red-600">{errors.username}</div>}
          </div>

          {/* Password */}
          <div>
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              placeholder={t('auth.password')}
              value={form.password}
              onChange={handleChange}
              className="text-base h-12 mt-1 rounded-lg border-input focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor={'firstName'}>{t('auth.firstName')}</Label>
            <Input
              id="firstName"
              type="firstName"
              placeholder={t('auth.firstName')}
              value={form.firstName}
              onChange={handleChange}
              className="text-base h-12 mt-1 rounded-lg border-input focus:border-primary focus:ring-primary"
            />
          </div>
          <div>
            <Label htmlFor={'lastName'}>{t('auth.lastName')}</Label>
            <Input
              id="lastName"
              type="lastName"
              placeholder={t('auth.lastName')}
              value={form.lastName}
              onChange={handleChange}
              className="text-base h-12 mt-1 rounded-lg border-input focus:border-primary focus:ring-primary"
            />
          </div>
          {/* Submit Button */}
          <Button
            onClick={handleSubmit}
            className="w-full h-12 py-3 text-base rounded-lg bg-primary hover:bg-primary/90"
          >
            {t('landing.signUp')}
          </Button>

          {/* Redirect Link */}
          <div className="text-center my-4">
            <p className="text-sm text-muted-foreground">
              {t('landing.haveAcc')}{' '}
              <Link href="/login" className="text-accent hover:underline">
                {t('landing.login')}
              </Link>
            </p>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="flex flex-col items-center justify-center mt-8 p-0">
          <div className="text-xs text-muted-foreground space-x-2">
            <Link href="#" className="hover:underline">
              {' '}
              {t('landing.termOfUse')}
            </Link>
            <span>|</span>
            <Link href="#" className="hover:underline">
              {' '}
              {t('landing.privacyPolicy')}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
