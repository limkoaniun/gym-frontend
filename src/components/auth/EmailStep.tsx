import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type LoginFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";

interface EmailStepProps {
    control: Control<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    isLoading: boolean;
    step: 'email' | 'password';
}

export function EmailStep({ control, errors, isLoading, step }: EmailStepProps) {
    return (
        <div className="space-y-2">
            <Controller
                name="email"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type="email"
                        placeholder="Email"
                        disabled={isLoading || step === 'password'}
                        className={cn(
                            "h-12 rounded-lg bg-white/10 border-white/30 text-white placeholder:text-white/70",
                            "focus-visible:border-primary focus-visible:ring-primary",
                            errors.email && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                        )}
                    />
                )}
            />
            {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
        </div>
    );
}