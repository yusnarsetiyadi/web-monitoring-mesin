import { BookCopy, BookOpen, ChartBarIcon, ChartNetwork, ChartNoAxesCombined, Coins, FileCog, Hammer, Handshake, Home, LucideIcon, MonitorCog, ServerCog, User2, User2Icon } from "lucide-react";


export interface NavigationItem {
    routeName: string;
    title: string;
    icon: LucideIcon;
    badge?: number;
    items?: {
        routeName: string;
        title: string;
        badge?: string;
    }[];
}


export const roleNavigationConfig: Record<string, NavigationItem[]> = {
    admin: [
        {
            routeName: 'dashboard',
            title: 'Dashboard',
            icon: Home,
        },
        {
            routeName: 'mesin.index',
            title: 'Management Mesin',
            icon: ServerCog,
        },
        {
            routeName: 'users.index',
            title: 'Management Users',
            icon: User2,
        },
        {
            routeName: 'kerusakans.index',
            title: 'Monitoring Kerusakan',
            icon: MonitorCog,
        },
        {
            routeName: 'report.index',
            title: 'Laporan',
            icon: ChartNetwork,
        },
    ],

    teknisi: [
        {
            routeName: 'dashboard',
            title: 'Dashboard',
            icon: Home
        },
        {
            routeName: 'kerusakans.index',
            title: 'Monitoring Kerusakan',
            icon: MonitorCog,
        },
        {
            routeName: 'perbaikan.index',
            title: 'Input Perbaikan',
            icon: Hammer,
        },
        {
            routeName: 'history',
            title: 'Histori Perbaikan',
            icon: FileCog,
        },
    ],

    operator: [
        {
            routeName: 'dashboard',
            title: 'Dashboard',
            icon: Home,
        },
        {
            routeName: 'kerusakans.index',
            title: 'Monitoring Kerusakan',
            icon: MonitorCog,
        },
        {
            routeName: 'history',
            title: 'Histori Perbaikan',
            icon: FileCog,
        },
    ],

}

export const getNavigationByRole = (role: string) : NavigationItem[] => {
    return roleNavigationConfig[role] || [];
}