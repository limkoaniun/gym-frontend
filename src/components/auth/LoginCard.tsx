interface LoginCardProps {
    children: React.ReactNode;
}

export function LoginCard({ children }: LoginCardProps) {
    return (
        <div className="w-full max-w-[400px]">
            <div className="p-0">
                {children}
            </div>
        </div>
    );
}