"use client";

import {cva, VariantProps} from "class-variance-authority"
import {Slot} from "@radix-ui/react-slot";
import {cn} from "@/lib/utils";
import React from "react";


const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
    {
        variants: {
            variant: {
                default: "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 active:scale-95",
                cta: "bg-cta text-cta-foreground shadow-lg hover:bg-cta/90 hover:shadow-xl active:scale-95",
                secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-95",
                ghost: "text-foreground hover:bg-secondary active:scale-95",
                link: "text-accent underline-offset-4 hover:underline",
                outline: "border-2 border-border bg-transparent hover:bg-secondary active:scale-95",
            },
            size: {
                default: "h-12 px-6 py-3",
                sm: "h-10 px-4 py-2 text-sm",
                lg: "h-14 px-8 py-4 text-lg",
                icon: "h-12 w-12",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({className, variant, size, asChild = false, ...props}, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({variant, size, className}))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export {Button, buttonVariants}