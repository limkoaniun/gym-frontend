"use client";

import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import React, {useState} from "react";
import {signup} from "@/lib/api/auth";
import {SignupPayload} from "@/lib/interfaces";
import SocialMediaButtons from "@/components/ui/socialMedia";
import {useRouter} from "next/navigation";
import {toast} from "react-toastify";

// --- Main Component ---
export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState<SignupPayload>({email: "", username: "", password: ""});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {id, value} = e.target;
        setForm((prev) => ({...prev, [id]: value}));
    };

    const handleSubmit = async () => {
        console.log("Submitted data:", form);
        const response = await signup(form);
        if (response) {
            toast.success("Signup successful! Please log in.", {
                position: "top-center",
                toastId: "signup-success",
            });
            // Redirect to login page or show success message
            router.push('/login');
        }
        console.log("Signup response:", response);
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="p-4 sm:p-6 md:p-8 flex justify-between items-center">
                <h1 className="text-lg font-semibold text-foreground">GymBuddy</h1>
            </header>

            {/* Main Content */}
            <main className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8 -mt-16">
                <Card className="w-full max-w-sm shadow-none border-none bg-transparent">

                    {/* Title */}
                    <CardHeader className="text-center p-0 mb-6">
                        <CardTitle className="text-2xl font-semibold mb-6">Create your account</CardTitle>
                    </CardHeader>

                    {/* Form Fields */}
                    <CardContent className="p-0 space-y-4">
                        {/* Email */}
                        <div>
                            <Label htmlFor="email">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Email address"
                                value={form.email}
                                onChange={handleChange}
                                className="text-base h-12 mt-1 rounded-lg border-input focus:border-primary focus:ring-primary"
                            />
                        </div>

                        {/* Username */}
                        <div>
                            <Label htmlFor="email">Username</Label>
                            <Input
                                id="username"
                                type="username"
                                placeholder="Username"
                                value={form.username}
                                onChange={handleChange}
                                className="text-base h-12 mt-1 rounded-lg border-input focus:border-primary focus:ring-primary"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="text-base h-12 mt-1 rounded-lg border-input focus:border-primary focus:ring-primary"
                            />
                        </div>

                        {/* Submit Button */}
                        <Button
                            onClick={handleSubmit}
                            className="w-full h-12 py-3 text-base rounded-lg bg-primary hover:bg-primary/90"
                        >
                            Continue
                        </Button>

                        {/* Redirect Link */}
                        <div className="text-center my-4">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="text-accent hover:underline">
                                    Log in
                                </Link>
                            </p>
                        </div>

                        {/* Divider */}
                        <div className="relative my-6">
                            <Separator className="absolute top-1/2 left-0 w-full -translate-y-1/2"/>
                            <span
                                className="relative z-10 flex justify-center text-sm text-muted-foreground bg-background px-2">
                             OR
                            </span>
                        </div>

                        <SocialMediaButtons/>
                    </CardContent>

                    {/* Footer */}
                    <CardFooter className="flex flex-col items-center justify-center mt-8 p-0">
                        <div className="text-xs text-muted-foreground space-x-2">
                            <Link href="#" className="hover:underline">Terms of Use</Link>
                            <span>|</span>
                            <Link href="#" className="hover:underline">Privacy Policy</Link>
                        </div>
                    </CardFooter>
                </Card>
            </main>
        </div>
    );
}
    