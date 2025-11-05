import Link from 'next/link';

export function LoginFooter() {
    return (
        <>
            <div className="text-center mt-4">
                <p className="text-sm text-white/80">
                    Don't have an account?{' '}
                    <Link
                        href="/signup"
                        className="text-primary font-medium hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs">
                    <span className="bg-transparent px-2 text-white/60">OR</span>
                </div>
            </div>
        </>
    );
}