import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    Clock,
    MoreVertical,
    User2,
    Edit,
    CheckCircle,
    XCircle,
    Clock3,
    X,
} from 'lucide-react';

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
        learner: 'John Doe',
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
        learner: 'John Doe',
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
        learner: 'Dela Cruz',
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

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                        <DropdownMenuItem
                                                            onSelect={(e) => e.preventDefault()}
                                                        >
                                                            <Edit className="mr-2 h-4 w-4" />
                                                            Update Lecture
                                                        </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Update Lecture
                                                                </AlertDialogTitle>
                                                            </AlertDialogHeader>
                                                            <Button
                                                                type="button"
                                                                variant="ghost"
                                                                size="icon"
                                                                className="absolute right-4 top-4"
                                                                onClick={() =>
                                                                    document.dispatchEvent(
                                                                        new KeyboardEvent('keydown', { key: 'Escape' })
                                                                    )
                                                                }
                                                            >
                                                                <X className="h-4 w-4" />
                                                            </Button>
                                                            <div className="space-y-3">
                                                                <div>
                                                                    <Label>
                                                                        Platform
                                                                    </Label>
                                                                    <Input
                                                                        defaultValue={
                                                                            lecture.platform
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label>
                                                                        Platform Code
                                                                    </Label>
                                                                    <Input
                                                                        defaultValue={
                                                                            lecture.platformCode
                                                                        }
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <Label>
                                                                        Platform Link
                                                                    </Label>
                                                                    <Input
                                                                        defaultValue={
                                                                            lecture.platformLink
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <AlertDialogFooter>
                                                                <Button>
                                                                    Save Changes
                                                                </Button>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>

                                                    <DropdownMenuSub>
                                                    <DropdownMenuSubTrigger>
                                                        <Clock3 className="mr-2 h-4 w-4" />
                                                        Update Status
                                                    </DropdownMenuSubTrigger>
                                                        <DropdownMenuSubContent>
                                                            <DropdownMenuItem>
                                                                <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                                                                Completed
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                <XCircle className="mr-2 h-4 w-4 text-red-600" />
                                                                Failed
                                                            </DropdownMenuItem>
                                                        </DropdownMenuSubContent>
                                                    </DropdownMenuSub>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </CardHeader>

                                    <CardHeader>
                                        <div className="flex items-center gap-2">
                                            <User2 className="h-4 w-4 text-gray-400" />
                                            <span className="text-gray-400">
                                                Learner:{' '}
                                            </span>
                                            <span className="text-lg font-medium">
                                                {lecture.learner}
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

                                            <div className="flex items-center justify-between mt-6">
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
