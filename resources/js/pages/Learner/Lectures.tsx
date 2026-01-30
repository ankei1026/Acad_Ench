import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Clock, User2 } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Lectures',
        href: '/tutor/lectures',
    },
];

// Sample data for lectures
const lectures = [
    {
        id: 1,
        lectureCode: 'LECT-A1B2C3',
        courseName: 'Mathematics',
        tutor: 'Ralf Louie Ranario',
        date: 'Feb 2, 2026',
        schedule: '9:00 AM - 10:30 AM',
        platform: 'Zoom Meeting',
        platformCode: 'qwqwe-242-ssdd',
        platformLink: 'https://zoom.us/j/1234567890',
        status: 'completed',
    },
    {
        id: 2,
        lectureCode: 'LECT-D4E5F6',
        courseName: 'Mathematics',
        tutor: 'Ralf Louie Ranario',
        date: 'Feb 5, 2026',
        schedule: '1:00 PM - 2:30 PM',
        platform: 'Google Meet',
        platformCode: 'eecszx-242-242',
        platformLink: 'https://meet.google.com/abc-defg-hij',
        status: 'failed',
    },
    {
        id: 3,
        lectureCode: 'LECT-G7H8I9',
        courseName: 'Mathematics',
        tutor: 'Ralf Louie Ranario',
        date: 'Feb 10, 2026',
        schedule: '3:00 PM - 4:30 PM',
        platform: 'Microsoft Teams',
        platformCode: 'sfszx-242-ssdd',
        platformLink: 'https://teams.microsoft.com',
        status: 'upcoming',
    },
];

export default function Lectures() {
    const [open, setOpen] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lectures" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Lectures
                    </h1>
                    <p className="text-muted-foreground">
                        Manage your lecture sessions and classes
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="mid:grid-cols-1 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Left Column - Active Lectures */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {lectures.map((lecture) => (
                                <Card
                                    key={lecture.id}
                                    className="overflow-hidden transition-shadow hover:shadow-lg"
                                >
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <CardTitle className="text-lg">
                                                    {lecture.lectureCode}
                                                </CardTitle>
                                                <CardDescription className="text-base font-medium text-foreground">
                                                    {lecture.courseName}
                                                </CardDescription>
                                            </div>
                                        </div>
                                    </CardHeader>

                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <User2 className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-400">
                                                Tutor:{' '}
                                            </span>
                                            <span className="text-lg font-medium">
                                                {lecture.tutor}
                                            </span>
                                        </div>
                                    </CardHeader>

                                    <CardContent className="pb-3">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm font-medium">
                                                    {lecture.date} •{' '}
                                                    {lecture.schedule}
                                                </span>
                                            </div>

                                            <div className="mt-6 flex items-center justify-between">
                                                <span className="text-sm text-muted-foreground">
                                                    {lecture.platform}
                                                </span>
                                                <span className="text-sm text-muted-foreground">
                                                    {lecture.platformCode}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>

                                    <CardFooter className="flex flex-col gap-2">
                                        <Button
                                            className="w-full"
                                            onClick={() =>
                                                window.open(
                                                    lecture.platformLink,
                                                    '_blank',
                                                )
                                            }
                                        >
                                            Enter Session
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
