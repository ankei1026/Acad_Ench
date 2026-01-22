import { Link } from '@inertiajs/react';
import { BookOpen, DollarSignIcon, Folder, LayoutGrid, PaperclipIcon, Users } from 'lucide-react';

import { NavFooter } from '@/components/nav-footer';
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
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';

import AppLogo from './app-logo';
import { NavSecondary } from './nav-secondary';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Revenue',
        href: dashboard(),
        icon: DollarSignIcon,
    },
    {
        title: 'Learners',
        href: dashboard(),
        icon: BookOpen,
    },
    {
        title: 'Tutors',
        href: dashboard(),
        icon: Users,
    },
];

const secondaryNavItems: NavItem[] = [
    {
        title: 'Files',
        href: dashboard(),
        icon: PaperclipIcon,
    },
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                <NavSecondary items={secondaryNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
