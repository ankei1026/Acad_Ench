import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Home',
        href: '/learner/home',
    },
];

export default function Home() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Home" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col items-center justify-center mt-12">
                    <img
                        src="/assets/home.png"
                        alt="Home Image"
                        className="h-60 w-80 ml-10"
                    />
                    <p className="mt-6 mb-6 text-sm font-bold">Book a tutor to learn</p>
                    <Button className="rounded-full bg-yellow-400 text-black hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300">
                        Find Tutor
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
