import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { debounce } from 'lodash';
import {
    Book,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Search,
    Star,
    User,
    X,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Booking',
        href: '/learner/book-tutor',
    },
];

interface Tutor {
    id: number;
    tutor_id: string;
    subject: string;
    specializations: string;
    rate_per_hour: number;
    bio: string;
    location?: string;
    photo?: string;
    rating?: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface BookTutorProps {
    tutors: {
        data: Tutor[];
        links: any[];
        total: number;
    };
    filters: {
        search: string;
        subject: string;
    };
    subjects: string[];
}

/* ---------------- Skeleton ---------------- */

const TutorCardSkeleton = () => (
    <Card>
        <CardContent className="flex gap-4 p-4">
            <Skeleton className="h-20 w-20 rounded-full" />
            <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-32" />
            </div>
        </CardContent>
        <CardFooter className="flex gap-2 p-4 pt-0">
            <Skeleton className="h-8 flex-1" />
            <Skeleton className="h-8 flex-1" />
        </CardFooter>
    </Card>
);

/* ---------------- Tutor Card ---------------- */

const TutorCard = ({ tutor }: { tutor: Tutor }) => {
    const imageSrc = tutor.photo
        ? `/storage/${tutor.photo}`
        : '/assets/default.webp';

    return (
        <Card>
            <CardContent className="flex gap-4 p-4">
                <img
                    src={imageSrc}
                    alt={tutor.user.name}
                    className="h-20 w-20 rounded-full object-cover"
                    onError={(e) =>
                        (e.currentTarget.src = '/assets/default.webp')
                    }
                />

                <div className="flex flex-1 flex-col gap-1">
                    <div className="flex items-start justify-between">
                        <h3 className="leading-tight font-semibold">
                            {tutor.user.name}
                        </h3>

                        {tutor.rating && (
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                {tutor.rating.toFixed(1)}
                            </div>
                        )}
                    </div>

                    <span className="text-sm text-muted-foreground">
                        {tutor.subject}
                    </span>

                    <div className="flex flex-wrap gap-1">
                        {tutor.specializations
                            ?.split(',')
                            .slice(0, 3)
                            .map((spec) => (
                                <Badge
                                    key={spec}
                                    variant="secondary"
                                    className="text-xs"
                                >
                                    {spec}
                                </Badge>
                            ))}
                    </div>

                    <span className="text-sm font-medium">
                        ₱{tutor.rate_per_hour.toLocaleString('en-PH')}
                        <span className="text-muted-foreground"> / hr</span>
                    </span>

                    {tutor.location && (
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            {tutor.location}
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex w-full flex-col gap-2 p-4 pt-0">
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full flex-1 py-1"
                    asChild
                >
                    <Link href={`/learner/book-tutor/tutor/${tutor.tutor_id}`}>
                        <User /> Profile
                    </Link>
                </Button>

                <Button size="sm" className="w-full flex-1 py-1" asChild>
                    <Link href={`/learner/book-tutor/${tutor.id}/schedule`}>
                        <Book /> Book
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

/* ---------------- Filters ---------------- */

const FiltersSection = ({
    search,
    selectedSubject,
    subjects,
    totalTutors,
    onSearchChange,
    onSubjectChange,
    onClearFilters,
    hasActiveFilters,
}: any) => {
    const debouncedSearch = useCallback(
        debounce((value: string) => onSearchChange(value), 400),
        [],
    );

    return (
        <div className="w-full rounded-lg border bg-background p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-1 flex-col gap-3 md:flex-row">
                    <div className="relative w-full md:max-w-xs">
                        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            defaultValue={search}
                            placeholder="Search tutors..."
                            onChange={(e) => debouncedSearch(e.target.value)}
                            className="pl-9"
                        />
                    </div>

                    <Select
                        value={selectedSubject}
                        onValueChange={onSubjectChange}
                    >
                        <SelectTrigger className="w-full md:w-48">
                            <SelectValue placeholder="All subjects" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All subjects</SelectItem>
                            {subjects.map((subject: string) => (
                                <SelectItem key={subject} value={subject}>
                                    {subject}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="gap-1"
                        >
                            <X className="h-3 w-3" />
                            Clear
                        </Button>
                    )}
                </div>

                <div className="text-sm text-muted-foreground">
                    {totalTutors} result{totalTutors !== 1 && 's'}
                </div>
            </div>
        </div>
    );
};

/* ---------------- Pagination ---------------- */

const Pagination = ({ links, onPageChange }: any) => (
    <div className="flex justify-center gap-1 pt-6">
        {links.map((link: any, index: number) => {
            if (!link.url) return null;

            if (link.label.includes('Previous'))
                return (
                    <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(link.url)}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                );

            if (link.label.includes('Next'))
                return (
                    <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        onClick={() => onPageChange(link.url)}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                );

            return (
                <Button
                    key={index}
                    variant={link.active ? 'secondary' : 'outline'}
                    size="icon"
                    onClick={() => onPageChange(link.url)}
                >
                    {link.label}
                </Button>
            );
        })}
    </div>
);

/* ---------------- Page ---------------- */

export default function BookTutor({
    tutors,
    filters,
    subjects,
}: BookTutorProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedSubject, setSelectedSubject] = useState(
        filters.subject || 'all',
    );
    const [loading, setLoading] = useState(false);

    const hasActiveFilters = useMemo(
        () =>
            !!(
                filters.search ||
                (filters.subject && filters.subject !== 'all')
            ),
        [filters],
    );

    useEffect(() => {
        const params: any = {};
        if (search) params.search = search;
        if (selectedSubject !== 'all') params.subject = selectedSubject;

        const timeout = setTimeout(() => {
            router.get('/learner/book-tutor', params, {
                preserveState: true,
                replace: true,
                onStart: () => setLoading(true),
                onFinish: () => setLoading(false),
            });
        }, 300);

        return () => clearTimeout(timeout);
    }, [search, selectedSubject]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Tutor" />

            <div className="flex flex-col gap-6 p-6">
                {/* Header + Filters */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl leading-tight font-semibold">
                            Find a Tutor
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Browse and book available tutors
                        </p>
                    </div>

                    <div className="w-full lg:max-w-3xl">
                        <FiltersSection
                            search={search}
                            selectedSubject={selectedSubject}
                            subjects={subjects}
                            totalTutors={tutors.total}
                            onSearchChange={setSearch}
                            onSubjectChange={setSelectedSubject}
                            onClearFilters={() => {
                                setSearch('');
                                setSelectedSubject('all');
                                router.get('/learner/book-tutor');
                            }}
                            hasActiveFilters={hasActiveFilters}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <TutorCardSkeleton key={i} />
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {tutors.data.map((tutor) => (
                                <TutorCard key={tutor.id} tutor={tutor} />
                            ))}
                        </div>

                        <Pagination
                            links={tutors.links}
                            onPageChange={(url: string) =>
                                router.get(url, {}, { preserveState: true })
                            }
                        />
                    </>
                )}
            </div>
        </AppLayout>
    );
}
