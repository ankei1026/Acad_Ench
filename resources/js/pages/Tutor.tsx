import { Head } from '@inertiajs/react';
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
    return (
        <>
            <Head title="Tutor Application" />

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
                                    <li>✔ Competitive pay</li>
                                    <li>✔ Be a part of our team</li>
                                </ul>

                                <p className="mt-6 text-sm text-gray-500 max-w-lg">
                                    Fill out the form and we’ll review your application
                                    within 48 hours.
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
                                        Accepted formats: PDF, DOC, DOCX · Max size: 5MB
                                    </p>
                                </div>

                            </div>

                            {/* RIGHT SIDE — FORM */}
                            <Card className="bg-white text-gray-900 shadow-lg">
                                <CardHeader>
                                    <CardTitle className="text-xl">
                                        Tutor Application
                                    </CardTitle>
                                    <CardDescription className="text-gray-600">
                                        Tell us a bit about yourself
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <form className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input id="name" placeholder="John Doe" />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="subject">
                                                Subject You Want to Teach
                                            </Label>
                                            <Input
                                                id="subject"
                                                placeholder="Mathematics, Physics, English..."
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="documents">
                                                Resume & Credentials
                                            </Label>

                                            <Input
                                                id="documents"
                                                type="file"
                                                multiple
                                                accept=".pdf,.doc,.docx"
                                                className="cursor-pointer bg-white"
                                            />

                                            <p className="text-xs text-gray-500">
                                                Upload one or more files (PDF, DOC, DOCX)
                                            </p>
                                        </div>


                                        <Button
                                            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
                                        >
                                            Submit Application
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
