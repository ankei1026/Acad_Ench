import { LoginForm } from '@/components/login-form';
import { Head } from '@inertiajs/react';

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FCF8F1]/30 to-white">
            <Head title="Login" />
            <div className="container mx-auto flex min-h-screen items-center justify-center p-0">
                <div className="grid h-screen w-full grid-cols-1 lg:grid-cols-2">
                    {/* Left Side - Login Form (50%) */}
                    <div className="flex items-center justify-center p-6 md:p-12 lg:p-16 dark:bg-white">
                        <div className="w-full max-w-md">
                            <LoginForm />
                        </div>
                    </div>

                    {/* Right Side - Image (50%) */}
                    <div className="hidden items-center justify-center bg-gradient-to-br from-yellow-50/50 to-white p-8 lg:flex">
                        <div className="relative h-full w-full">
                            <img
                                src="/assets/mockupy.avif"
                                alt="AcadEnch learning platform showcase"
                                className="h-full w-full rounded-lg object-cover"
                            />
                            {/* Overlay gradient for better readability */}
                            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/10 to-transparent"></div>

                            {/* Optional text overlay */}
                            <div className="absolute right-8 bottom-8 left-8 rounded-lg text-white">
                                <div className="mb-2 text-2xl font-bold">Connect with Tutors Experts</div>
                                <div className="text-lg opacity-90">Join thousands of learners accelerating their careers</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
