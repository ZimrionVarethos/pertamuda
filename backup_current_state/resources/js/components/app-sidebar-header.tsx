import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Link, usePage } from '@inertiajs/react';

const routeTitleMap: Record<string, string> = {
    '/dashboard': 'Ringkasan',
    '/dashboard/assets': 'Aset Fasilitas',
    '/dashboard/data': 'Sumber Data',
    '/dashboard/risk': 'Analisis Risiko',
    '/dashboard/emissions': 'Kuantifikasi Emisi',
    '/dashboard/maintenance': 'Pemeliharaan',
    '/dashboard/reports': 'Draf Laporan',
    '/dashboard/audit': 'Jejak Audit',
    '/dashboard/settings': 'Pengaturan',
};

export function AppSidebarHeader({
    breadcrumbs = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
}) {
    const page = usePage();
    const pathname = new URL(
        page.url,
        typeof window !== 'undefined' ? window.location.origin : 'http://localhost'
    ).pathname;

    const resolvedBreadcrumbs: BreadcrumbItemType[] =
        breadcrumbs.length > 0
            ? breadcrumbs
            : (() => {
                  const items: BreadcrumbItemType[] = [
                      { title: 'Dashboard', href: '/dashboard' },
                  ];

                  if (pathname === '/dashboard') {
                      return items;
                  }

                  for (const [routePath, label] of Object.entries(routeTitleMap)) {
                      if (routePath !== '/dashboard' && pathname.startsWith(routePath)) {
                          items.push({ title: label, href: routePath });

                          if (pathname !== routePath) {
                              if (pathname.includes('/assets/')) {
                                  items.push({ title: 'Detail Aset', href: pathname });
                              } else if (pathname.includes('/reports/')) {
                                  items.push({ title: 'Editor Laporan', href: pathname });
                              } else if (pathname.includes('/imports/')) {
                                  items.push({ title: 'Detail Impor', href: pathname });
                              }
                          }
                          break;
                      }
                  }

                  return items;
              })();

    return (
        <header className="border-b border-[#2B2B36] bg-[#171821]/90 backdrop-blur-md flex h-16 shrink-0 items-center justify-between gap-2 px-4 sm:px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-14">
            <div className="flex items-center gap-3">
                <SidebarTrigger className="-ml-1 text-[#8C8D99] hover:text-[#FFFFFF] hover:bg-[#21222D]" />
                <Breadcrumbs breadcrumbs={resolvedBreadcrumbs} />
            </div>

            <div className="flex items-center gap-3">
                <Link
                    href="/"
                    target="_blank"
                    className="text-xs text-[#8C8D99] hover:text-[#171821] hover:bg-[#A9DFD8] transition px-2.5 py-1 rounded-md border border-[#2B2B36] bg-[#21222D]"
                >
                    Portal Publik
                </Link>
            </div>
        </header>
    );
}
