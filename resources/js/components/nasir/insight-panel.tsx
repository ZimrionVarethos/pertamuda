import React from 'react';
import { ShieldAlert, ArrowUpRight } from 'lucide-react';
import { Link } from '@inertiajs/react';

interface InsightPanelProps {
    title: string;
    description: string;
    source: string;
    actionLabel?: string;
    actionHref?: string;
}

export function InsightPanel({
    title,
    description,
    source,
    actionLabel,
    actionHref,
}: InsightPanelProps) {
    return (
        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
            <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#171821] text-[#A9DFD8]">
                    <ShieldAlert className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-semibold text-[#FFFFFF]">{title}</h3>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-[#C5C7D0]">{description}</p>

            <div className="mt-4 flex items-center justify-between border-t border-[#2B2B36] pt-3 text-[11px]">
                <span className="text-[#8C8D99]">Sumber: {source}</span>
                {actionLabel && actionHref && (
                    <Link
                        href={actionHref}
                        className="inline-flex items-center gap-1 font-medium text-[#A9DFD8] hover:underline"
                    >
                        <span>{actionLabel}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                )}
            </div>
        </div>
    );
}