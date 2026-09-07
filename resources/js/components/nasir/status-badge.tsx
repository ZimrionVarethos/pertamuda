import React from 'react';
import { CircleAlert, CircleCheck, Info, TriangleAlert, ShieldAlert } from 'lucide-react';

interface StatusBadgeProps {
    tier?: string | null;
    status?: string | null;
    size?: 'sm' | 'md';
}

export function StatusBadge({ tier, status, size = 'md' }: StatusBadgeProps) {
    const val = tier || status || 'Data belum cukup';
    const py = size === 'sm' ? 'py-0.5 text-xs' : 'py-1 text-xs font-medium';

    switch (val) {
        case 'Rendah':
        case 'completed':
        case 'done':
        case 'reviewed':
            return (
                <span className={`inline-flex items-center gap-1.5 rounded border border-[#1b3d2b] bg-[#0d2218] px-2.5 ${py} text-[#4ADE80]`}>
                    <CircleCheck className="h-3.5 w-3.5" />
                    <span>{val === 'reviewed' ? 'Ditinjau internal' : val}</span>
                </span>
            );
        case 'Sedang':
        case 'in_progress':
        case 'in_review':
        case 'ready':
            return (
                <span className={`inline-flex items-center gap-1.5 rounded-lg border border-[#FEB95A]/30 bg-[#FEB95A]/10 px-2.5 ${py} text-[#FEB95A]`}>
                    <TriangleAlert className="h-3.5 w-3.5" />
                    <span>{val === 'in_review' ? 'Perlu tinjauan' : val === 'in_progress' ? 'Sedang berjalan' : val}</span>
                </span>
            );
        case 'Tinggi':
        case 'revision_requested':
        case 'needs_fix':
            return (
                <span className={`inline-flex items-center gap-1.5 rounded-lg border border-[#F87171]/30 bg-[#F87171]/10 px-2.5 ${py} text-[#F87171]`}>
                    <CircleAlert className="h-3.5 w-3.5" />
                    <span>{val === 'revision_requested' ? 'Perlu revisi' : val}</span>
                </span>
            );
        case 'Kritis':
        case 'critical':
        case 'failed':
            return (
                <span className={`inline-flex items-center gap-1.5 rounded-lg border border-[#FB7185]/30 bg-[#FB7185]/10 px-2.5 ${py} font-semibold text-[#FB7185]`}>
                    <ShieldAlert className="h-3.5 w-3.5" />
                    <span>{val}</span>
                </span>
            );
        default:
            return (
                <span className={`inline-flex items-center gap-1.5 rounded-lg border border-[#2B2B36] bg-[#171821] px-2.5 ${py} text-[#8C8D99]`}>
                    <Info className="h-3.5 w-3.5" />
                    <span>{val}</span>
                </span>
            );
    }
}

export function getTierRowClass(tier?: string | null): string {
    switch (tier) {
        case 'Kritis':
            return 'tier-row-kritis';
        case 'Tinggi':
            return 'tier-row-tinggi';
        case 'Sedang':
            return 'tier-row-sedang';
        case 'Rendah':
            return 'tier-row-rendah';
        default:
            return 'tier-row-default';
    }
}

export function getTierScoreTextColor(score: number | null): string {
    if (score === null || score === undefined) return 'text-[#8C8D99]';
    return 'text-[#FFFFFF]';
}

export function TierRevealLabel({ tier }: { tier?: string | null }) {
    if (!tier || tier === 'Data belum cukup') return null;
    return (
        <span className="tier-reveal-label">
            {tier.toLowerCase()}
        </span>
    );
}

export function getStatusRowClass(status?: string | null): string {
    switch (status?.toLowerCase()) {
        case 'done':
        case 'completed':
        case 'selesai':
        case 'reviewed':
            return 'status-row-selesai';
        case 'in_progress':
        case 'berjalan':
        case 'sedang berjalan':
        case 'in_review':
            return 'status-row-berjalan';
        case 'open':
        case 'dibuka':
        case 'terbuka':
        case 'draft':
            return 'status-row-dibuka';
        case 'cancelled':
        case 'canceled':
        case 'batal':
        case 'dibatalkan':
            return 'status-row-batal';
        case 'revision_requested':
            return 'status-row-revisi';
        default:
            return 'status-row-default';
    }
}

export function StatusRevealLabel({ status }: { status?: string | null }) {
    if (!status) return null;
    let label = '';
    let colorClass = '';

    switch (status.toLowerCase()) {
        case 'done':
        case 'completed':
        case 'selesai':
            label = 'selesai';
            colorClass = 'text-[#4ADE80]';
            break;
        case 'reviewed':
            label = 'ditinjau';
            colorClass = 'text-[#4ADE80]';
            break;
        case 'in_progress':
        case 'berjalan':
        case 'sedang berjalan':
            label = 'berjalan';
            colorClass = 'text-[#FEB95A]';
            break;
        case 'in_review':
            label = 'tinjauan';
            colorClass = 'text-[#FEB95A]';
            break;
        case 'open':
        case 'dibuka':
        case 'terbuka':
            label = 'dibuka';
            colorClass = 'text-[#A9DFD8]';
            break;
        case 'draft':
            label = 'draft';
            colorClass = 'text-[#A9DFD8]';
            break;
        case 'cancelled':
        case 'canceled':
        case 'batal':
        case 'dibatalkan':
            label = 'batal';
            colorClass = 'text-[#8C8D99]';
            break;
        case 'revision_requested':
            label = 'revisi';
            colorClass = 'text-[#FB7185]';
            break;
        default:
            label = status.toLowerCase();
            colorClass = 'text-[#8C8D99]';
    }

    return (
        <span className={`status-reveal-label ${colorClass}`}>
            {label}
        </span>
    );
}