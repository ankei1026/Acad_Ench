import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Homepage() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const menuItems = [
        { label: 'Features', href: '#' },
        { label: 'Materials', href: '#' },
        { label: 'Tutors', href: '#' },
        { label: 'Pricing', href: '#' },
    ];

    return (
        <>
            <Head title="Welcome" />
            <div className="bg-[FBFCF8]">
                {/* Header */}
                <header className="bg-opacity-30 bg-[#FCF8F1]">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between lg:h-20">
                            {/* Logo */}
                            <div className="flex-shrink-0 flex items-center justify-center gap-2">
                                <img src="/assets/Logo2.png" alt="AcadEnch Logo" className="h-14 w-16" />
                                <h1 className='text-2xl font-bold text-yellow-700'>AcadEnch</h1>
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                type="button"
                                onClick={toggleMenu}
                                className="inline-flex rounded-md p-2 text-black transition-all duration-200 hover:bg-gray-100 focus:bg-gray-100 lg:hidden"
                                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            >
                                {isMenuOpen ? (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                                    </svg>
                                )}
                            </button>

                            {/* Desktop Navigation */}
                            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
                                {menuItems.map((item) => (
                                    <a
                                        key={item.label}
                                        href={item.href}
                                        className="hover:text-opacity-80 text-base text-black transition-all duration-200"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <Link
                                href="/auth/signup"
                                className="hidden items-center justify-center rounded-full bg-black px-5 py-2.5 text-base font-semibold text-white transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:bg-yellow-300 focus:text-black lg:inline-flex"
                                role="button"
                            >
                                Join Now
                            </Link>
                        </div>

                        {/* Mobile Navigation Menu */}
                        {isMenuOpen && (
                            <div className="lg:hidden">
                                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                                    {menuItems.map((item) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            className="hover:text-opacity-80 block px-3 py-2 text-base font-medium text-black transition-all duration-200"
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                    <Link
                                        href="/auth/signup"
                                        className="mt-4 block w-full rounded-md bg-black px-3 py-2 text-center text-base font-semibold text-white transition-all duration-200 hover:bg-gray-800"
                                        role="button"
                                    >
                                        Join Now
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </header>

                {/* Hero Section */}
                <section className="bg-opacity-30 bg-[#FCF8F1] py-10 sm:py-16 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            {/* Hero Content */}
                            <div>
                                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">A key to learn for learners</p>
                                <h1 className="mt-4 text-4xl font-bold text-black sm:text-6xl lg:mt-8 xl:text-8xl">
                                    Connect & learn from the tutors
                                </h1>
                                <p className="mt-4 text-base text-black sm:text-xl lg:mt-8">Learn and grow as an AcadEnch learner.</p>

                                {/* CTA Button */}
                                <Link
                                    href="/auth/signup"
                                    className="group mt-8 inline-flex items-center rounded-full bg-yellow-300 px-6 py-4 font-semibold text-black transition-all duration-200 hover:bg-yellow-400 focus:bg-yellow-400 lg:mt-16"
                                    role="button"
                                >
                                    Join for free
                                    <svg
                                        className="-mr-2 ml-8 h-6 w-6 transition-transform duration-200 group-hover:translate-x-1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </Link>

                                {/* Login Link */}
                                <p className="mt-5 text-gray-600">
                                    Already joined us?{' '}
                                    <Link href="/auth/login" className="text-black transition-all duration-200 hover:underline">
                                        Log in
                                    </Link>
                                </p>
                            </div>

                            {/* Hero Image */}
                            <div>
                                <img className="w-full rounded-md" src="assets/mockupy.avif" alt="People collaborating and learning" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
