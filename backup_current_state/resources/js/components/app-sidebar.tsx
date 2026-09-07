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
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch className="flex items-center gap-3">
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#A9DFD8] text-[#171821] font-black text-lg shadow-sm">
                                    N
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                    <span className="truncate font-bold text-base text-[#FFFFFF]">NASIR</span>
                                    <span className="truncate text-[10px] text-[#8C8D99] tracking-wider uppercase">Analitik Emisi</span>
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
