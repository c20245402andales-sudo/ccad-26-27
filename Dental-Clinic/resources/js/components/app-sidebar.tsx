
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
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';

import {
    LayoutDashboard,
    Users,
    Stethoscope,
    ClipboardList,
    CalendarDays,
    Home,
} from 'lucide-react';

import AppLogo from './app-logo';

// Main Navigation
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Patients',
        url: '/patients',
        icon: Users,
    },
    {
        title: 'Dentists',
        url: '/dentists',
        icon: Stethoscope,
    },
    {
        title: 'Procedures',
        url: '/procedures',
        icon: ClipboardList,
    },
    {
        title: 'Appointments',
        url: '/dental-appointments',
        icon: CalendarDays,
    },
];

// Footer Navigation
const footerNavItems: NavItem[] = [
    {
        title: 'Home Page',
        url: '/',
        icon: Home,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">

            {/* Sidebar Header */}
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            {/* Main Navigation */}
            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            {/* Sidebar Footer */}
            <SidebarFooter>
                <NavFooter
                    items={footerNavItems}
                    className="mt-auto"
                />

                <NavUser />
            </SidebarFooter>

        </Sidebar>
    );
}
