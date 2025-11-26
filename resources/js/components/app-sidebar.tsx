import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookCopy, BookOpen, ChartNoAxesCombined, Coins, Folder, Handshake, Home, icons, LayoutGrid, List, User2, User2Icon } from 'lucide-react';
import AppLogo from './app-logo';
import { getNavigationByRole, NavigationItem } from '@/config/navigation';

const transformToNavItems = (items: NavigationItem[]): NavItem[] => {
    return items.map(item => ({
        title: item.title,
        href: route(item.routeName),
        icon: item.icon,
        items: item.items?.map(subItem => ({
            title: subItem.title,
            href: route(subItem.routeName),
            icon: List,
            badge: subItem.badge,
        })),
    }));
};

export function AppSidebar() {

    const { auth } = usePage<SharedData>().props;
    
    const userRole = auth?.user?.role as string;

    const navigationConfig = getNavigationByRole(userRole);
    const navLinks = transformToNavItems(navigationConfig);


    return (
        <Sidebar collapsible="icon" variant="inset">
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

            <SidebarContent>
                <NavMain items={navLinks} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
