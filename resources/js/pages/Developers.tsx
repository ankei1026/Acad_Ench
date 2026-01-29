import { Head } from '@inertiajs/react';
import { Users2 } from 'lucide-react';
import { useState } from 'react';
import LandingHeader from './landing-header';

interface TeamMember {
    name: string;
    role: string;
    description: string;
    imageUrl: string; // Replace with actual image URLs
    color: string;
}

export default function TutorApplication() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const teamMembers: TeamMember[] = [
        {
            name: 'Ralf Louie Ranario',
            role: 'Frontend Developer',
            description:
                'Creates intuitive user interfaces and enhances user experience.',
            imageUrl: '/assets/ryan.png',
            color: 'from-amber-500/90 to-orange-600/90',
        },
        {
            name: 'Jenn Ludo',
            role: 'Data Analyst',
            description:
                'Transforms complex data into actionable insights that drive decision-making.',
            imageUrl: '/assets/Jenn.jpg',
            color: 'from-amber-500/90 to-orange-600/90',
        },
        {
            name: 'Precious Lea',
            role: 'UI/UX Designer',
            description:
                'Crafts beautiful, functional experiences that balance aesthetics with usability.',
            imageUrl: '/assets/Precious.jpg',
            color: 'from-amber-500/90 to-orange-600/90',
        },
        {
            name: 'PrienceArhnamael Suan Polvorosa',
            role: 'Backend Developer',
            description:
                'Builds robust, scalable systems that power seamless applications.',
            imageUrl: '/assets/prince.png',
            color: 'from-amber-500/90 to-orange-600/90',
        },
        {
            name: 'Jiro Lugagay',
            role: 'DevOps Engineer',
            description:
                'Ensures smooth deployment and operation of applications in production.',
            imageUrl: '/assets/Jiro.png',
            color: 'from-amber-500/90 to-orange-600/90',
        },
    ];

    return (
        <>
            <Head title="Our Team" />

            <div className="min-h-screen bg-gradient-to-b from-[#FCF8F1] to-yellow-50">
                <LandingHeader />

                <section className="py-12 sm:py-16 lg:py-24">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        {/* Header */}
                        <div className="mb-8">
                            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-orange-100 to-yellow-100 px-4 py-2">
                                <Users2 className="h-5 w-5 text-yellow-600" />
                                <span className="text-sm font-semibold text-yellow-900">
                                    Meet Our Team
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900">
                                <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                    AcadEnch
                                </span>{' '}
                                Team
                            </h1>
                            <p className="mt-4 max-w-2xl text-lg text-gray-600">
                                The talented minds behind AcadEnch, dedicated to
                                revolutionizing education through technology and
                                innovation.
                            </p>
                        </div>

                        {/* Team Grid */}
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className="group relative h-80 cursor-pointer overflow-hidden rounded-2xl shadow-lg"
                                    onMouseEnter={() => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110"
                                        style={{
                                            backgroundImage: `url(${member.imageUrl})`,
                                        }}
                                    >
                                        {/* Gradient Overlay */}
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-b ${member.color} transition-opacity duration-500 ${hoveredIndex === index ? 'opacity-90' : 'opacity-70'}`}
                                        />

                                        {/* Blur Overlay on Hover */}
                                        <div
                                            className={`absolute inset-0 backdrop-blur-sm transition-all duration-500 ${hoveredIndex === index ? 'opacity-50' : 'opacity-0'}`}
                                        />
                                    </div>

                                    {/* Initial State (Visible when not hovering) */}
                                    <div
                                        className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-all duration-500 ${hoveredIndex === index ? 'opacity-0' : 'opacity-100'}`}
                                    >
                                        <div className="relative mb-4">
                                            {/* Profile Image Circle */}
                                            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white/30 shadow-2xl">
                                                <img
                                                    src={member.imageUrl}
                                                    alt={member.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            {/* Glow Effect */}
                                            <div className="absolute -inset-4 rounded-full bg-white/20 blur-xl" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white drop-shadow-lg">
                                            {member.name.split(' ')[0]}
                                        </h3>
                                        <p className="mt-1 text-white/90 drop-shadow">
                                            {member.role}
                                        </p>
                                    </div>

                                    {/* Hover State (Appears on hover) */}
                                    <div
                                        className={`absolute inset-0 top-0 flex flex-col justify-end p-6 transition-all duration-500 ${hoveredIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                                    >
                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold text-white drop-shadow-lg">
                                                {member.name}
                                            </h3>
                                            <p className="mt-1 text-sm font-medium text-white/90 drop-shadow">
                                                {member.role}
                                            </p>
                                            <p className="mt-3 line-clamp-3 text-sm text-white/80 drop-shadow">
                                                {member.description}
                                            </p>
                                        </div>

                                        {/* Bottom Gradient */}
                                        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}
