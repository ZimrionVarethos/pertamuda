import React, { PropsWithChildren } from 'react';
import { Head, usePage } from '@inertiajs/react';
import { CircleCheck, AlertCircle } from 'lucide-react';

interface DashboardLayoutProps extends PropsWithChildren {
    title?: string;
    breadcrumbs?: Array<{ label: string; href?: string }>;
}

export function NasirDashboardLayout({ title = 'Dashboard', children }: DashboardLayoutProps) {
    const { flash } = usePage().props as any;

    return (
        <div className="min-h-full w-full bg-[#171821] text-[#FFFFFF] font-sans selection:bg-[#A9DFD8] selection:text-[#171821]">
            <Head title={`${title} | NASIR Dashboard`} />

            {/* Flash Notifications */}
            {flash?.success && (
                <div className="mx-4 sm:mx-6 mt-4 flex items-center gap-2 rounded-lg border border-[#2B2B36] bg-[#21222D] px-4 py-3 text-xs text-[#4ADE80]">
                    <CircleCheck className="h-4 w-4 shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}
            {flash?.error && (
                <div className="mx-4 sm:mx-6 mt-4 flex items-center gap-2 rounded-lg border border-[#2B2B36] bg-[#21222D] px-4 py-3 text-xs text-[#F87171]">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>{flash.error}</span>
                </div>
            )}

            {/* Page Content Container - Full width responsive */}
            <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
                {children}
            </main>
        </div>
    );
}