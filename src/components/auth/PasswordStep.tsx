import { Controller, Control, FieldErrors } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { type LoginFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useTranslation } from 'react-i18next';

interface PasswordStepProps {
    control: Control<LoginFormData>;
    errors: FieldErrors<LoginFormData>;
    isLoading: boolean;
}

export function PasswordStep({ control, errors, isLoading }: PasswordStepProps) {
  const { t } = useTranslation();

  return (
        <div className="space-y-2">
            <Controller
                name="password"
                control={control}
                render={({ field }) => (
                    <Input
                        {...field}
                        type="password"
                        placeholder={t('auth.password')}
                        disabled={isLoading}
                        className={cn(
                            "h-12 rounded-lg bg-white/10 border-white/30 text-white placeholder:text-white/70",
                            "focus-visible:border-primary focus-visible:ring-primary",
                            errors.password && "border-destructive focus-visible:border-destructive focus-visible:ring-destructive"
                        )}
                    />
                )}
            />
            {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
            )}
        </div>
    );
}