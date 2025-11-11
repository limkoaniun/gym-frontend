"use client"

import {LoginForm} from "@/components/auth/LoginForm"
import ButtonUsage from "@/components/login/ButtonLanguages";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <header className="p-4 sm:p-6 md:p-8 flex justify-between items-center">
                <h1 className="text-lg font-semibold text-foreground">GymBuddy</h1>
                <ButtonUsage/>
            </header>
            <main className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-8 -mt-16">
                <LoginForm/>
            </main>
        </div>
    )
}