"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function LanguageSwitcher() {
    const [languageFocused, setLanguageFocused] = React.useState<string | null>("Ch");

    return (
        <div className="inline-flex rounded-md shadow-sm" role="group">
            <Button
                key="En"
                size="sm"
                variant={languageFocused === 'En' ? 'default' : 'outline'}
                className={cn(
                    "rounded-r-none",
                    languageFocused === 'En' ? 'text-white' : 'text-gray-500'
                )}
                onClick={() => setLanguageFocused('En')}
            >
                En
            </Button>
            <Button
                key="Ch"
                size="sm"
                variant={languageFocused === 'Ch' ? 'destructive' : 'outline'}
                className={cn(
                    "rounded-l-none border-l-0",
                    languageFocused === 'Ch' ? 'text-white' : 'text-gray-500'
                )}
                onClick={() => setLanguageFocused('Ch')}
            >
                中
            </Button>
        </div>
    );
}