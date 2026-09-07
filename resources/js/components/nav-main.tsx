import { Link } from '@inertiajs/react';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavItem } from '@/types';

export function NavMain({ items }: { items: NavItem[] }) {
    const { isCurrentUrl, isCurrentOrParentUrl } = useCurrentUrl();

    const isItemActive = (href: string) => {
        if (href === '/dashboard') {
            return isCurrentUrl(href);
        }
        return isCurrentOrParentUrl(href);
    };

    return (
        <SidebarGroup className="px-2 py-2">
            <SidebarGroupLabel className="text-[10px] uppercase font-bold tracking-wider text-[#8C8D99] px-2 mb-1">
                Platform Operasional
            </SidebarGroupLabel>
            <SidebarMenu className="space-y-1">
                {items.map((item) => {
                    const active = isItemActive(item.href as string);
                    return (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={active}
                                tooltip={{ children: item.title }}
                                className={`rounded-lg transition font-medium ${
                                    active
                                        ? 'bg-[#A9DFD8] text-[#171821] font-semibold hover:bg-[#A9DFD8] hover:text-[#171821]'
                                        : 'text-[#8C8D99] hover:bg-[#21222D] hover:text-[#FFFFFF]'
                                }`}
                            >
                                <Link href={item.href} prefetch className="flex items-center gap-2.5">
                                    {item.icon && (
                                        <item.icon className={`h-4 w-4 shrink-0 ${active ? 'text-[#171821]' : 'text-[#8C8D99]'}`} />
                                    )}
                                    <span className="truncate">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
