import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface LoginButtonProps {
  type: 'button' | 'submit';
  onClick?: () => void;
  isLoading: boolean;
  loadingText: string;
  text: string;
}

export function LoginButton({ type, onClick, isLoading, loadingText, text }: LoginButtonProps) {
  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className="h-12 rounded-lg text-base font-medium mt-2 w-full"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          {loadingText}
        </>
      ) : (
        text
      )}
    </Button>
  );
}
