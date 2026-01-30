import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { BookOpen, CreditCard } from 'lucide-react';

interface TutorProfileProps {
    tutor: {
        id: number;
        tutor_id: string;
        subject: string;
        specializations: string;
        rate_per_hour: number;
        bio: string;
        location?: string;
        photo?: string;
        mop?: string;
        number?: string;
        portfolio_link?: string;
        total_sessions?: number;
        user: {
            id: number;
            name: string;
            email: string;
        };
    };
}

export default function TutorProfileView({ tutor }: TutorProfileProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Book Tutor',
            href: '/learner/book-tutor',
        },
        {
            title: 'Tutor Profile',
            href: `/learner/book-tutor/tutor/${tutor.id}`,
        },
    ];

    const getImageSrc = () => {
        if (tutor?.photo) return `/storage/${tutor.photo}`;
        return '/assets/default.webp';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${tutor.user.name}'s Profile`} />

            <div className="m-4 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Tutor Profile
                        </h1>
                        <p className="text-muted-foreground">
                            View professional profile information
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/learner/book-tutor">
                                Back to Tutors
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Left column - Profile Picture & Basic Info */}
                    <Card className="md:col-span-1">
                        <CardContent className="flex flex-col items-center gap-6 p-6">
                            <div className="relative">
                                <img
                                    src={getImageSrc()}
                                    alt={`${tutor.user.name}'s profile`}
                                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            '/assets/default.webp';
                                    }}
                                />
                            </div>

                            <div className="w-full text-center">
                                <p className="text-2xl font-bold">
                                    {tutor.user.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {tutor.user.email}
                                </p>

                                {tutor.portfolio_link ? (
                                    <p className="text-sm text-muted-foreground">
                                        <a
                                            href={tutor.portfolio_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            {tutor.portfolio_link}
                                        </a>
                                    </p>
                                ) : null}
                                {tutor.tutor_id && (
                                    <div className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1">
                                        <span className="font-mono text-xs text-gray-600">
                                            ID: {tutor.tutor_id}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Right column - Professional Information */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle>Professional Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <Separator />

                                <div className="space-y-4">
                                    <h3 className="flex items-center text-sm font-medium text-gray-700">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Teaching Information
                                    </h3>
                                    <div className="space-y-4">
                                        <InfoField
                                            label="Subject"
                                            value={tutor?.subject}
                                        />
                                        <InfoField
                                            label="Specializations"
                                            value={tutor?.specializations}
                                        />
                                        <InfoField
                                            label="Rate per hour"
                                            value={`₱${tutor?.rate_per_hour?.toLocaleString('en-PH') || '0.00'}`}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                {/* Payment Information */}
                                <div className="space-y-4">
                                    <h3 className="flex items-center text-sm font-medium text-gray-700">
                                        <CreditCard className="mr-2 h-4 w-4" />
                                        Payment Information
                                    </h3>
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <InfoField
                                            label="Mode of Payment"
                                            value={tutor.mop}
                                        />
                                        <InfoField
                                            label="Payment Number"
                                            value={tutor.number}
                                        />
                                    </div>
                                </div>

                                <Separator />

                                {/* Bio */}
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="flex items-center text-sm font-medium text-gray-700">
                                            Bio
                                        </h3>
                                    </div>
                                    <div className="rounded-lg bg-gray-50 p-4">
                                        <p className="whitespace-pre-line text-gray-700">
                                            {tutor.bio || 'No bio provided.'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}

function InfoField({ label, value }: { label: string; value?: string }) {
    return (
        <div>
            <span className="mb-1 block text-xs text-gray-500">{label}</span>
            <span className="text-sm font-medium text-gray-900">
                {value || 'Not specified'}
            </span>
        </div>
    );
}
