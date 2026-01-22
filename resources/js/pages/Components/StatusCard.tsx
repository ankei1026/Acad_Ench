interface StatusCardProps {
    title?: string;
    value?: string;
    description?: string;
    className?: string;
    icon?: React.ReactNode;
}

export default function StatusCard({ title, description, className, value, icon }: StatusCardProps) {
    return (
        <div className={`p-4 flex flex-col justify-between items-start h-full w-full ${className}`}>
            <div className="flex justify-between items-center w-full">
                <h1 className="text-lg md:text-sm lg:text-xl font-base text-gray-700">{title}</h1>
                <div>{icon}</div>
            </div>
            <h1 className="text-5xl md:text-2xl lg:text-5xl font-bold">{value}</h1>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );
}
