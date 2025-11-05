"use client";

import * as React from "react";
import {useContext} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from 'next/navigation';
import {Alert, AlertDescription} from "@/components/ui/alert";

import {type LoginFormData, LoginSchema} from "@/lib/schemas";
import {login} from "@/lib/api/auth";
import {LoginCard} from "./LoginCard";
import {LoginHeader} from "./LoginHeader";
import {EmailStep} from "./EmailStep";
import {PasswordStep} from "./PasswordStep";
import {LoginFooter} from "./LoginFooter";
import SocialMediaButtons from "@/components/ui/social-media";
import {LoginButton} from "@/components/auth/LoginButton";
import {LoginUserContext} from "@/components/auth/LoginUserContext";


export function LoginForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = React.useState(false);
    const [step, setStep] = React.useState<'email' | 'password'>('email');
    const [error, setError] = React.useState<string | null>(null);

    const form = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginUserContext = useContext(LoginUserContext);

    if (!loginUserContext) {
        throw new Error("LoginForm must be used within a LoginUserContext.Provider");
    }

    const {setCurrentUser} = loginUserContext;

    const handleContinueClick = async () => {
        setIsLoading(true);
        setError(null);
        const emailIsValid = await form.trigger("email");
        setIsLoading(false);
        if (emailIsValid) {
            setStep('password');
        }
    };

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
            <LoginHeader/>

            {error && (
                <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <form
                onSubmit={form.handleSubmit(onSubmitActualLogin)}
                className="flex flex-col gap-4"
            >
                <EmailStep
                    control={form.control}
                    errors={form.formState.errors}
                    isLoading={isLoading}
                    step={step}
                />

                {step === 'password' && (
                    <PasswordStep
                        control={form.control}
                        errors={form.formState.errors}
                        isLoading={isLoading}
                    />
                )}

                {step === 'email' ? (
                    <LoginButton
                        type="button"
                        onClick={handleContinueClick}
                        isLoading={isLoading}
                        loadingText="Continuing..."
                        text="Continue"
                    />
                ) : (
                    <LoginButton
                        type="submit"
                        isLoading={isLoading}
                        loadingText="Logging in..."
                        text="Login"
                    />
                )}
            </form>

            <LoginFooter/>
            <SocialMediaButtons/>
        </LoginCard>
    );
}