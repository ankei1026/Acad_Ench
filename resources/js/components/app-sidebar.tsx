import { Link, usePage } from '@inertiajs/react';
import {
    Book,
    BookOpen,
    DollarSignIcon,
    File,
    Home,
    LayoutGrid,
    Pen,
    User2,
    Users,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
// import { dashboard } from '@/routes';
import { type NavItem } from '@/types';

import AppLogo from './app-logo';
import { NavSecondary } from './nav-secondary';

const adminMainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutGrid,
    },
    // {
    //     title: 'Revenue',
    //     href: '/admin/revenue',
    //     icon: DollarSignIcon,
    // },
    {
        title: 'Learners',
        href: '/admin/learners',
        icon: BookOpen,
    },
    {
        title: 'Tutors',
        href: '/admin/tutors',
        icon: Users,
    },
];

const adminSecondaryNavItems: NavItem[] = [
    {
        title: 'Tutor Applications',
        href: '/admin/tutor-applications',
        icon: File,
    },
];

const tutorMainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/tutor/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Bookings',
        href: '/tutor/bookings',
        icon: Book,
    },
    {
        title: 'Lectures',
        href: '/tutor/lectures',
        icon: Pen,
    },
    {
        title: 'Tutor Profile',
        href: '/tutor/profile',
        icon: User2,
    },
];

const learnerMainNavItems: NavItem[] = [
    {
        title: 'Home',
        href: '/learner/home',
        icon: Home,
    },
    {
        title: 'Book Tutor',
        href: '/learner/book-tutor',
        icon: Book,
    },
    {
        title: 'Lectures',
        href: '/learner/lectures',
        icon: Pen,
    },
];

const roleNavMap: Record<string, NavItem[]> = {
    admin: [...adminMainNavItems, ...adminSecondaryNavItems],
    tutor: tutorMainNavItems,
    learner: learnerMainNavItems,
};

// Define the props type for the component
interface AppSidebarProps {
    userData?: any; // Adjust this type based on your actual user data structure
}

// Define the PageProps type for Inertia
interface PageProps {
    auth: {
        user: {
            id: number;
            name: string;
            email: string;
            role: string; // 'admin', 'tutor', 'learner'
            // Add other user properties as needed
        };
    };
    // Add other props as needed
}

export function AppSidebar({ userData: propsUserData }: AppSidebarProps) {
    const page = usePage<PageProps>();
    const user = page.props.auth.user;

    // Get navigation items based on user role
    const mainNavItems = roleNavMap[user.role] || [];

    // For now, we're not separating secondary items in the roleNavMap
    // If you need secondary items separately, adjust the roleNavMap structure
    const secondaryNavItems: NavItem[] = [];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={`/${user.role}/dashboard`} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {secondaryNavItems.length > 0 && (
                    <NavSecondary items={secondaryNavItems} />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
