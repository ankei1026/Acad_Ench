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
    Calendar,
    ChevronLeft,
    ChevronRight,
    Filter,
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
    mop?: string;
    number?: string;
    rating?: number;
    total_sessions?: number;
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
        current_page: number;
        last_page: number;
        total: number;
        per_page: number;
    };
    filters: {
        search: string;
        subject: string;
    };
    subjects: string[];
}

// --------------------- Skeleton ---------------------
const TutorCardSkeleton = () => (
    <Card className="animate-pulse overflow-hidden rounded-xl border border-border shadow-sm">
        <CardContent className="p-0">
            <Skeleton className="h-52 w-full rounded-t-xl" />
            <div className="space-y-3 p-6">
                <Skeleton className="h-6 w-32 rounded" />
                <Skeleton className="h-4 w-48 rounded" />
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-16 w-full rounded" />
            </div>
        </CardContent>
        <CardFooter className="space-x-2 p-6 pt-0">
            <Skeleton className="h-10 flex-1 rounded" />
            <Skeleton className="h-10 flex-1 rounded" />
        </CardFooter>
    </Card>
);

// --------------------- Empty State ---------------------
const EmptyState = ({
    hasFilters,
    onClearFilters,
}: {
    hasFilters: boolean;
    onClearFilters: () => void;
}) => (
    <Card className="rounded-xl border-dashed">
        <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
                <User className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
                {hasFilters
                    ? 'No matching tutors found'
                    : 'No tutors available'}
            </h3>
            <p className="mb-6 max-w-md text-muted-foreground">
                {hasFilters
                    ? 'Try adjusting your search criteria or filters to find more results.'
                    : 'Check back later for available tutors in your subjects of interest.'}
            </p>
            {hasFilters && (
                <Button
                    variant="outline"
                    onClick={onClearFilters}
                    className="gap-2"
                >
                    <X className="h-4 w-4" />
                    Clear all filters
                </Button>
            )}
        </CardContent>
    </Card>
);

// --------------------- Tutor Card ---------------------
// Inside TutorCard component
const TutorCard = ({ tutor }: { tutor: Tutor }) => {
    const getImageSrc = (tutor: Tutor) =>
        tutor.photo ? `/storage/${tutor.photo}` : '/assets/default.webp';
    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
        e.currentTarget.src = '/assets/default.webp';
    };

    return (
        <Card className="group overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            {/* Tutor Image */}
            <center>
                <div className="relative h-36 w-36 overflow-hidden rounded-full">
                    <img
                        src={getImageSrc(tutor)}
                        alt={tutor.user.name}
                        className="h-full w-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={handleImageError}
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-10" />
                    {tutor.rating && (
                        <Badge className="absolute top-3 right-3 bg-yellow-200 font-semibold text-yellow-900 shadow">
                            <Star className="h-3 w-3 fill-yellow-400" />{' '}
                            {tutor.rating.toFixed(1)}
                        </Badge>
                    )}
                </div>
            </center>
            <CardContent className="space-y-3 p-6">
                <h3 className="truncate text-lg font-semibold">
                    {tutor.user.name}
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                        {tutor.subject}
                    </Badge>
                    {tutor.specializations &&
                        tutor.specializations.split(',').map((spec) => (
                            <Badge
                                key={spec}
                                variant="outline"
                                className="border-yellow-200 text-yellow-900"
                            >
                                {spec}
                            </Badge>
                        ))}
                </div>

                {tutor.location && (
                    <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3 text-yellow-600" />{' '}
                        {tutor.location}
                    </div>
                )}

                <div className="flex flex-col items-start justify-between border-t pt-4 sm:flex-row sm:items-center">
                    <div className="flex flex-col gap-1">
                        <span className="font-bold text-yellow-700">
                            ₱{tutor.rate_per_hour?.toLocaleString('en-PH')}
                            <span className="text-sm font-normal text-muted-foreground">
                                /hour
                            </span>
                        </span>
                        {tutor.mop && (
                            <span className="font-bold text-yellow-700">
                                MOP:{' '}
                                <span className="text-sm font-normal text-muted-foreground">
                                    {tutor.mop}
                                </span>
                            </span>
                        )}
                        {tutor.number && (
                            <span className="font-bold text-yellow-700">
                                Number:{' '}
                                <span className="text-sm font-normal text-muted-foreground">
                                    {tutor.number}
                                </span>
                            </span>
                        )}
                    </div>

                    {tutor.total_sessions && (
                        <div className="mt-2 text-xs text-muted-foreground sm:mt-0">
                            {tutor.total_sessions.toLocaleString()} sessions
                        </div>
                    )}
                </div>
            </CardContent>

            <CardFooter className="flex w-full flex-col gap-2 p-6 pt-0">
                <Button
                    variant="outline"
                    className="w-full flex-1 border-yellow-400 text-yellow-700 hover:bg-yellow-50"
                    asChild
                >
                    <Link href={`/learner/book-tutor/tutor/${tutor.tutor_id}`}>
                        View Profile
                    </Link>
                </Button>
                <Button
                    className="w-full flex-1 gap-2 bg-yellow-500 text-white hover:bg-yellow-600"
                    asChild
                >
                    <Link href={`/learner/book-tutor/${tutor.id}/schedule`}>
                        <Calendar className="h-4 w-4" /> Book Now
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

// --------------------- Pagination ---------------------
const Pagination = ({
    links,
    current_page,
    last_page,
    onPageChange,
}: {
    links: any[];
    current_page: number;
    last_page: number;
    onPageChange: (url: string) => void;
}) => {
    if (last_page <= 1) return null;

    const visiblePages = useMemo(() => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;
        for (let i = 1; i <= last_page; i++) {
            if (
                i === 1 ||
                i === last_page ||
                (i >= current_page - delta && i <= current_page + delta)
            ) {
                range.push(i);
            }
        }
        range.forEach((i) => {
            if (l) {
                if (i - l === 2) rangeWithDots.push(l + 1);
                else if (i - l !== 1) rangeWithDots.push('...');
            }
            rangeWithDots.push(i);
            l = i;
        });
        return rangeWithDots;
    }, [current_page, last_page]);

    return (
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
            <div className="text-sm text-muted-foreground">
                Page <span className="font-semibold">{current_page}</span> of{' '}
                <span className="font-semibold">{last_page}</span>
            </div>

            <div className="flex items-center gap-1">
                {links.map((link, index) => {
                    if (link.label.includes('Previous'))
                        return (
                            <Button
                                key={`prev-${index}`}
                                variant="outline"
                                size="icon"
                                className="h-9 w-9"
                                disabled={!link.url}
                                onClick={() =>
                                    link.url && onPageChange(link.url)
                                }
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                        );
                    if (link.label.includes('Next'))
                        return (
                            <Button
                                key={`next-${index}`}
                                variant="outline"
                                size="icon"
                                className="h-9 w-9"
                                disabled={!link.url}
                                onClick={() =>
                                    link.url && onPageChange(link.url)
                                }
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        );
                    return null;
                })}

                <div className="ml-2 flex items-center gap-1">
                    {visiblePages.map((page, index) =>
                        page === '...' ? (
                            <span
                                key={`dots-${index}`}
                                className="px-2 text-muted-foreground"
                            >
                                ...
                            </span>
                        ) : (
                            <Button
                                key={`page-${page}`}
                                variant={
                                    current_page === page
                                        ? 'default'
                                        : 'outline'
                                }
                                size="icon"
                                className={`h-9 w-9 rounded-md ${current_page === page ? 'bg-primary text-white' : 'hover:bg-primary/10'}`}
                                onClick={() => {
                                    const url = links.find(
                                        (l) => l.label === String(page),
                                    )?.url;
                                    if (url) onPageChange(url);
                                }}
                            >
                                {page}
                            </Button>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
};

// --------------------- Filters ---------------------
const FiltersSection = ({
    search,
    selectedSubject,
    subjects,
    totalTutors,
    onSearchChange,
    onSubjectChange,
    onClearFilters,
    hasActiveFilters,
}: {
    search: string;
    selectedSubject: string;
    subjects: string[];
    totalTutors: number;
    onSearchChange: (value: string) => void;
    onSubjectChange: (value: string) => void;
    onClearFilters: () => void;
    hasActiveFilters: boolean;
}) => {
    const debouncedSearch = useCallback(
        debounce((value: string) => onSearchChange(value), 500),
        [],
    );

    const handleSearch = (value: string) => debouncedSearch(value);

    return (
        <Card className="rounded-xl border border-border shadow-lg">
            <CardContent className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <h2 className="flex items-center gap-2 text-lg font-semibold">
                        <Filter className="h-4 w-4 text-primary" /> Filters
                    </h2>
                    {hasActiveFilters && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearFilters}
                            className="h-8 gap-2"
                        >
                            <X className="h-3 w-3" /> Clear all
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search tutors by name, subject..."
                            defaultValue={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="pl-9 focus:border-primary focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    {/* Subject */}
                    <Select
                        value={selectedSubject}
                        onValueChange={onSubjectChange}
                    >
                        <SelectTrigger
                            id="subject-filter"
                            className="rounded-lg border"
                        >
                            <SelectValue placeholder="All Subjects" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Subjects</SelectItem>
                            {subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                    {subject}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    {/* Results Summary */}
                    <div className="flex items-center justify-end">
                        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                            {totalTutors}{' '}
                            {totalTutors === 1 ? 'tutor' : 'tutors'} available
                        </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

// --------------------- Main Component ---------------------
export default function BookTutor({
    tutors,
    filters,
    subjects,
}: BookTutorProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedSubject, setSelectedSubject] = useState(
        filters.subject || 'all',
    );
    const [isLoading, setIsLoading] = useState(false);

    const hasActiveFilters = useMemo(
        () =>
            !!(
                filters.search ||
                (filters.subject && filters.subject !== 'all')
            ),
        [filters],
    );

    useEffect(() => {
        const params: Record<string, string> = {};
        if (search && search.trim()) params.search = search.trim();
        if (selectedSubject && selectedSubject !== 'all')
            params.subject = selectedSubject;

        const timeoutId = setTimeout(() => {
            router.get('/learner/book-tutor', params, {
                preserveState: true,
                replace: true,
                onStart: () => setIsLoading(true),
                onFinish: () => setIsLoading(false),
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [search, selectedSubject]);

    const handleClearFilters = () => {
        setSearch('');
        setSelectedSubject('all');
        router.get('/learner/book-tutor', {}, { preserveState: true });
    };

    const handlePageChange = (url: string) => {
        router.get(url, {}, { preserveState: true });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Book Tutor" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <header className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Find Your Perfect Tutor
                    </h1>
                    <p className="text-lg text-muted-foreground">
                        Browse through our qualified tutors and book sessions
                        that fit your schedule
                    </p>
                </header>

                {/* Filters */}
                <FiltersSection
                    search={search}
                    selectedSubject={selectedSubject}
                    subjects={subjects}
                    totalTutors={tutors.total}
                    onSearchChange={setSearch}
                    onSubjectChange={setSelectedSubject}
                    onClearFilters={handleClearFilters}
                    hasActiveFilters={hasActiveFilters}
                />

                {/* Tutors List */}
                {isLoading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <TutorCardSkeleton key={`skeleton-${i}`} />
                        ))}
                    </div>
                ) : tutors.data.length === 0 ? (
                    <EmptyState
                        hasFilters={hasActiveFilters}
                        onClearFilters={handleClearFilters}
                    />
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                            {tutors.data.map((tutor) => (
                                <TutorCard
                                    key={`tutor-${tutor.id}`}
                                    tutor={tutor}
                                />
                            ))}
                        </div>
                        <Pagination
                            links={tutors.links}
                            current_page={tutors.current_page}
                            last_page={tutors.last_page}
                            onPageChange={handlePageChange}
                        />
                    </>
                )}
            </div>
        </AppLayout>
    );
}
