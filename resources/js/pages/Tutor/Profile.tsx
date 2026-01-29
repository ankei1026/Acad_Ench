import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BookOpen, Camera, CreditCard, DollarSign, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Profile() {
    const { user, tutor } = usePage().props as any;
    const [editing, setEditing] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [characterCount, setCharacterCount] = useState(tutor?.bio?.length || 0);

    const { data, setData, post, processing, errors } = useForm({
        name: user.name || '',
        email: user.email || '',
        number: tutor?.number || '',
        subject: tutor?.subject || '',
        specializations: tutor?.specializations || '',
        rate_per_hour: tutor?.rate_per_hour || '',
        bio: tutor?.bio || '',
        mop: tutor?.mop || '',
        photo: null as File | null,
        _method: 'put',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/tutor/profile', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setEditing(false);
                setPreview(null);
            },
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate image size (2MB = 2048KB)
        if (file.size > 2 * 1024 * 1024) {
            alert('Image size should be less than 2MB');
            return;
        }

        // Validate image type
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file');
            return;
        }

        setData('photo', file);
        const previewUrl = URL.createObjectURL(file);
        setPreview(previewUrl);
    };

    const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setData('bio', value);
        setCharacterCount(value.length);
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const getImageSrc = () => {
        if (preview) return preview;
        if (tutor?.photo) return `/storage/${tutor.photo}`;
        return '/assets/default.webp';
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Profile', href: '/tutor/profile' }]}>
            <Head title="Profile" />

            <div className="m-4 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Tutor Profile
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your professional profile information
                        </p>
                    </div>
                    {!editing ? (
                        <Button onClick={() => setEditing(true)}>
                            Edit Profile
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setEditing(false);
                                    setPreview(null);
                                    if (data.photo) {
                                        URL.revokeObjectURL(preview || '');
                                        setData('photo', null);
                                    }
                                    setCharacterCount(tutor?.bio?.length || 0);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form="profile-form"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Left column - Profile Picture & Basic Info */}
                    <Card className="md:col-span-1">
                        <CardContent className="flex flex-col items-center gap-6 p-6">
                            <div className="relative">
                                <img
                                    src={getImageSrc()}
                                    alt={`${user.name}'s profile`}
                                    className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            '/assets/default.webp';
                                    }}
                                />
                                {editing && (
                                    <label className="absolute right-0 bottom-0 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary/90">
                                        <Camera size={18} />
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                    </label>
                                )}
                            </div>

                            <div className="w-full text-center">
                                <p className="text-lg font-semibold">
                                    {user.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {user.email}
                                </p>

                                {tutor?.tutor_id && (
                                    <div className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1">
                                        <span className="font-mono text-xs text-gray-600">
                                            ID: {tutor.tutor_id}
                                        </span>
                                    </div>
                                )}

                                {preview && (
                                    <p className="mt-3 text-xs font-medium text-blue-600">
                                        New photo selected
                                    </p>
                                )}

                                {errors.photo && (
                                    <p className="mt-3 text-xs font-medium text-red-600">
                                        {errors.photo}
                                    </p>
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
                            {!editing ? (
                                <div className="space-y-6">
                                    <Separator />

                                    {/* Professional Info */}
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
                                        <div className="space-y-4">
                                            <InfoField
                                                label="Mode of Payment"
                                                value={tutor?.mop}
                                            />
                                            <InfoField
                                                label="Payment Number"
                                                value={tutor?.number}
                                            />
                                        </div>
                                    </div>

                                    <Separator />

                                    {/* Bio */}
                                    <div>
                                        <div className="mb-3 flex items-center justify-between">
                                            <h3 className="text-sm font-medium text-gray-700">
                                                Bio
                                            </h3>
                                            <span className="text-xs text-gray-500">
                                                {tutor?.bio?.length || 0}/60 characters
                                            </span>
                                        </div>
                                        <div className="rounded-lg bg-gray-50 p-4">
                                            <p className="whitespace-pre-line text-gray-700">
                                                {tutor?.bio ||
                                                    'No bio provided.'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <form
                                    id="profile-form"
                                    onSubmit={submit}
                                    className="space-y-6"
                                >
                                    <Separator />

                                    {/* Professional Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-gray-700">
                                            Professional Information
                                        </h3>
                                        <Field
                                            label="Subject *"
                                            error={errors.subject}
                                        >
                                            <div className="flex items-center">
                                                <BookOpen className="mr-2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    value={data.subject}
                                                    onChange={(e) =>
                                                        setData(
                                                            'subject',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="e.g., Mathematics"
                                                    required
                                                    maxLength={255}
                                                />
                                            </div>
                                            {errors.subject && (
                                                <p className="text-xs text-red-500">
                                                    {errors.subject}
                                                </p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-500">
                                                Required field (max 255 characters)
                                            </p>
                                        </Field>

                                        <Field
                                            label="Specializations"
                                            error={errors.specializations}
                                        >
                                            <div className="flex items-center">
                                                <BookOpen className="mr-2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    value={data.specializations}
                                                    onChange={(e) =>
                                                        setData(
                                                            'specializations',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="e.g., Algebra, Calculus, Geometry"
                                                    maxLength={255}
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">
                                                Separate with commas (max 255 characters)
                                            </p>
                                        </Field>

                                        <Field
                                            label="Rate per hour *"
                                            error={errors.rate_per_hour}
                                        >
                                            <div className="flex items-center">
                                                <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={data.rate_per_hour}
                                                    onChange={(e) =>
                                                        setData(
                                                            'rate_per_hour',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="0.00"
                                                    required
                                                />
                                            </div>
                                            {errors.rate_per_hour && (
                                                <p className="text-xs text-red-500">
                                                    {errors.rate_per_hour}
                                                </p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-500">
                                                Required field (minimum: ₱0)
                                            </p>
                                        </Field>
                                    </div>

                                    <Separator />

                                    {/* Payment Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-medium text-gray-700">
                                            Payment Information
                                        </h3>

                                        <Field
                                            label="Mode of Payment *"
                                            error={errors.mop}
                                        >
                                            <div className="flex items-center">
                                                <CreditCard className="mr-2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    value={data.mop}
                                                    onChange={(e) =>
                                                        setData(
                                                            'mop',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="e.g., GCash, Maya, Bank Transfer"
                                                    required
                                                    maxLength={10}
                                                />
                                            </div>
                                            {errors.mop && (
                                                <p className="text-xs text-red-500">
                                                    {errors.mop}
                                                </p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-500">
                                                Required field (max 10 characters)
                                            </p>
                                        </Field>

                                        <Field
                                            label="Number *"
                                            error={errors.number}
                                        >
                                            <div className="flex items-center">
                                                <CreditCard className="mr-2 h-4 w-4 text-gray-400" />
                                                <Input
                                                    value={data.number}
                                                    onChange={(e) =>
                                                        setData(
                                                            'number',
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="09123456789"
                                                    required
                                                    maxLength={11}
                                                    pattern="[0-9]*"
                                                    inputMode="numeric"
                                                />
                                            </div>
                                            {errors.number && (
                                                <p className="text-xs text-red-500">
                                                    {errors.number}
                                                </p>
                                            )}
                                            <p className="mt-1 text-xs text-gray-500">
                                                Required field (max 11 digits, numbers only)
                                            </p>
                                        </Field>
                                    </div>

                                    <Separator />

                                    {/* Bio */}
                                    <Field label="Bio" error={errors.bio}>
                                        <div className="relative">
                                            <Textarea
                                                rows={5}
                                                value={data.bio}
                                                onChange={handleBioChange}
                                                placeholder="Tell learners about your teaching experience, qualifications, and teaching style..."
                                                maxLength={60}
                                                className={`pr-16 ${characterCount > 60 ? 'border-red-300' : ''}`}
                                            />
                                            <div className="absolute bottom-2 right-2">
                                                <span className={`text-xs ${characterCount > 60 ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                                                    {characterCount}/60
                                                </span>
                                            </div>
                                        </div>
                                        {errors.bio && (
                                            <p className="text-xs text-red-500">
                                                {errors.bio}
                                            </p>
                                        )}
                                        <p className="mt-1 text-xs text-gray-500">
                                            Maximum 60 characters
                                        </p>
                                    </Field>
                                </form>
                            )}
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

function Field({
    label,
    error,
    children,
}: {
    label: string;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            {children}
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
