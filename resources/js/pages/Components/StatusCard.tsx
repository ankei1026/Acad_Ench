import { Link } from '@inertiajs/react';

interface StatusCardProps {
    title?: string;
    value?: number;
    description?: string;
    className?: string;
    icon?: React.ReactNode;
    link?: string;
    prefix?: string;
}

export default function StatusCard({
    title,
    description,
    className,
    value,
    icon,
    link,
    prefix
}: StatusCardProps) {
    return (
        <Link href={link}>
            <div
                className={`flex h-full w-full flex-col items-start justify-between bg-[#FFFFFF] p-4 ${className}`}
            >
                <div className="flex w-full items-center justify-between">
                    <h1 className="font-base text-md text-gray-700 md:text-lg lg:text-xl">
                        {title}
                    </h1>
                    <div>{icon}</div>
                </div>
                <h1 className="text-5xl font-bold md:text-2xl lg:text-5xl">
                    {prefix} {value}
                </h1>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
        </Link>
    );
}
