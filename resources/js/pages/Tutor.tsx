import { Head, useForm } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import LandingHeader from './landing-header';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function TutorApplication() {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        email: '',
        subject: '',
        documents: null as File | null,
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0] || null;
        setData('documents', file);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post('/tutor-application', {
            onSuccess: () => {
                toast.success('Application submitted successfully! We will review it within 2-7 days.');
                setData({
                    full_name: '',
                    email: '',
                    subject: '',
                    documents: null,
                });
            },
            onError: () => {
                toast.error('Failed to submit application. Please check the form and try again.');
            },
        });
    };

    return (
        <>
            <Head title="Tutor Application" />
            <Toaster position="top-right" />

            {/* Page background */}
            <div className="min-h-screen bg-[#FCF8F1]">
                <LandingHeader />

                <section className="py-10 sm:py-16 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">

                            {/* LEFT SIDE — CONTENT */}
                            <div className="lg:col-span-2">
                                <h1 className="text-4xl font-bold text-gray-900">
                                    Become a Tutor 🎓
                                </h1>

                                <p className="mt-4 text-lg text-gray-700 max-w-xl">
                                    Share your knowledge, inspire learners, and earn
                                    doing what you love.
                                </p>

                                <ul className="mt-6 space-y-3 text-gray-700">
                                    <li>✔ Teach subjects you’re passionate about</li>
                                    <li>✔ Your per hour rate</li>
                                    <li>✔ Be a part of our team</li>
                                </ul>

                                <p className="mt-6 text-sm text-gray-500 max-w-lg">
                                    Fill out the form and we’ll review your application
                                    within 2 - 7 days.
                                    <br />
                                    Your account will be sent through email.
                                </p>
                                <div className="mt-8 rounded-lg border border-yellow-200 bg-yellow-50 p-6">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        What to submit 📄
                                    </h3>

                                    <ul className="mt-4 space-y-2 text-sm text-gray-700">
                                        <li>• Your most recent resume (PDF preferred)</li>
                                        <li>• Teaching certificates or credentials (if any)</li>
                                        <li>• Academic transcripts (optional)</li>
                                        <li>• Any supporting documents that showcase your expertise</li>
                                    </ul>

                                    <p className="mt-4 text-xs text-gray-500">
                                        Accepted format: PDF
                                    </p>
                                </div>

                            </div>

                            {/* RIGHT SIDE — FORM */}
                            <Card className="bg-white text-gray-900 shadow-lg border-gray-200">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Tutor Application
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Tell us a bit about yourself
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        <div className="space-y-2">
                                            <Label htmlFor="full_name">Full Name</Label>
                                            <Input
                                                id="full_name"
                                                placeholder="John Doe"
                                                value={data.full_name}
                                                onChange={(e) =>
                                                    setData('full_name', e.target.value)
                                                }
                                                className={
                                                    errors.full_name
                                                        ? 'border-red-500'
                                                        : ''
                                                }
                                            />
                                            {errors.full_name && (
                                                <p className="text-xs text-red-500">
                                                    {errors.full_name}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="jon@example.com"
                                                value={data.email}
                                                onChange={(e) =>
                                                    setData('email', e.target.value)
                                                }
                                                className={
                                                    errors.email
                                                        ? 'border-red-500'
                                                        : ''
                                                }
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-red-500">
                                                    {errors.email}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">
                                                Subject You Want to Teach
                                            </Label>
                                            <Input
                                                id="subject"
                                                placeholder="Ex. Mathematics"
                                                value={data.subject}
                                                onChange={(e) =>
                                                    setData('subject', e.target.value)
                                                }
                                                className={
                                                    errors.subject
                                                        ? 'border-red-500'
                                                        : ''
                                                }
                                            />
                                            {errors.subject && (
                                                <p className="text-xs text-red-500">
                                                    {errors.subject}
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="documents">
                                                Resume & Credentials
                                            </Label>

                                            <Input
                                                id="documents"
                                                type="file"
                                                accept=".pdf"
                                                className="cursor-pointer bg-white"
                                                onChange={handleFileChange}
                                            />

                                            <p className="text-xs text-gray-500">
                                                Upload one file (PDF), format (Lastname, Firstname MiddleInitial) Ex: Doe, Jon R.
                                            </p>

                                            {errors.documents && (
                                                <p className="text-xs text-red-500">
                                                    {errors.documents}
                                                </p>
                                            )}
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={processing}
                                            className="w-full bg-yellow-400 text-black hover:bg-yellow-500 disabled:opacity-50"
                                        >
                                            {processing
                                                ? 'Submitting...'
                                                : 'Submit Application'}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>

                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
