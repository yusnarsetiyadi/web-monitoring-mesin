import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface CardDashboardProps {
    cardDescription: string;
    cardTitle: string;
    cardAction?: ElementType | null
    footerTitle:string;
    footerDescription:string;
}

export interface FlashMessages {
    success?: string,
    errorMessage: string
}

export interface Mesin {
    id: string
    kode_mesin: string
    nama_mesin: string
    lokasi: string
    kategori: string
    created_at: string;
    updated_at: string;
}

export interface UsersRole {
    id: string;
    name: string;
    email: string;
    role: string;
}

export interface Kerusakan {
    id: string;
    mesin_id: string;
    user_id: string;
    deskripsi: string;
    status: string;
    waktu_lapor: string;
}

export interface PagePropsMachine extends Record<string, any> {
    flash: FlashMessages;
    data: Mesin[];
    filters : {
        search: string | null;
    }
}

export interface PagePropsUserList extends Record<string, any> {
    flash: FlashMessages;
    data: UsersRole[];
    filters : {
        search: string | null;
    }
}

export interface PagePropsKerusakanList extends Record<string, any> {
    flash: FlashMessages;
    data: Kerusakan[];
    teknisi: User[];
    filters: {
        search: string | null;
    }
}

export interface pagePropsAssignKerusakan extends Record<string, any> {
    teknisi: User[],
    kerusakan: Kerusakan,
}


export interface pagePropsPerbaikan extends Record<string, any> {
    flash: FlashMessages;
    perbaikan: Perbaikan[];
    filters: {
        search: string | null;
    }
}

export interface pagePropsDashboard extends Record<string, any> {
    flash: FlashMessages;
    jumlahMesin: number;
    jumlahUser: number;
    totalPerbaikan: number;
    totalKerusakanBulanIni: number;
    listTeknisi: User[];
    kerusakanTerbaru: Kerusakan[];
}

export interface DashboardByRole extends Record<string, any> {
    jumlahMesin: number;
    jumlahUser: number;
    totalPerbaikan: number;
    totalKerusakanBulanIni: number;
    listTeknisi: User[];
    kerusakanTerbaru: Kerusakan[];
}