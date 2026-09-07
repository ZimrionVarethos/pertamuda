import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Boxes,
    Database,
    ShieldAlert,
    Wind,
    Wrench,
    FileText,
    History,
    Settings,
    BookOpen,
    FolderGit2,
} from 'lucide-react';
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
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Ringkasan',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Aset Fasilitas',
        href: '/dashboard/assets',
        icon: Boxes,
    },
    {
        title: 'Sumber Data',
        href: '/dashboard/data',
        icon: Database,
    },
    {
        title: 'Analisis Risiko',
        href: '/dashboard/risk',
        icon: ShieldAlert,
    },
    {
        title: 'Kuantifikasi Emisi',
        href: '/dashboard/emissions',
        icon: Wind,
    },
    {
        title: 'Pemeliharaan',
        href: '/dashboard/maintenance',
        icon: Wrench,
    },
    {
        title: 'Draf Laporan',
        href: '/dashboard/reports',
        icon: FileText,
    },
    {
        title: 'Jejak Audit',
        href: '/dashboard/audit',
        icon: History,
    },
    {
        title: 'Pengaturan',
        href: '/dashboard/settings',
        icon: Settings,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/ZimrionVarethos',
        icon: FolderGit2,
    },
    {
        title: 'Dokumentasi',
        href: 'https://drive.google.com/drive/folders/1nGo-_eUc7gphwi5axzFsIE_liiNUXAfw',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset" className="border-r border-[#2B2B36] bg-[#171821]">
            <SidebarHeader className="border-b border-[#2B2B36]/60 pb-2">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
                            <Link href="/dashboard" prefetch className="flex items-center gap-3 py-1">
                                <img
                                    src="/icon.png"
                                    alt="NASIR"
                                    className="h-8 w-auto max-w-[140px] object-contain group-data-[collapsible=icon]:hidden"
                                />
                                <div className="hidden group-data-[collapsible=icon]:flex h-8 w-8 items-center justify-center">
                                    <img
                                        src="/cut-icon.png"
                                        alt="NASIR"
                                        className="h-8 w-8 object-contain rounded-lg"
                                    />
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter className="border-t border-[#2B2B36]">
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
