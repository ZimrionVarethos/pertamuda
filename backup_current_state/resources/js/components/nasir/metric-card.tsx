import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
    label: string;
    value?: string | number | null;
    unit?: string;
    periodContext?: string;
    icon?: LucideIcon;
    highlight?: boolean;
    helperText?: string;
}

export function MetricCard({
    label,
    value,
    unit,
    periodContext,
    icon: Icon,
    highlight,
    helperText,
}: MetricCardProps) {
    const hasValue = value !== null && value !== undefined;
    return (
        <div
            className={`relative flex flex-col justify-between rounded-xl border p-5 transition-colors ${
                highlight
                    ? 'border-[#F87171]/40 bg-[#21222D] shadow-sm ring-1 ring-[#F87171]/20'
                    : 'border-[#2B2B36] bg-[#21222D]'
            }`}
        >
            <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-medium tracking-wide text-[#8C8D99] uppercase">{label}</span>
                {Icon && (
                    <div className="p-1.5 rounded-lg bg-[#171821] text-[#A9DFD8]">
                        <Icon className="h-4 w-4" />
                    </div>
                )}
            </div>

            <div className="mt-4 flex items-baseline gap-2">
                {hasValue ? (
                    <>
                        <span className="text-2xl font-bold tracking-tight text-[#FFFFFF] font-metric">{value}</span>
                        {unit && <span className="text-xs font-medium text-[#8C8D99]">{unit}</span>}
                    </>
                ) : (
                    <span className="text-sm font-medium text-[#8C8D99]">Data belum cukup</span>
                )}
            </div>

            {(periodContext || helperText) && (
                <div className="mt-3 border-t border-[#2B2B36]/60 pt-2 text-[11px] text-[#8C8D99]">
                    {periodContext && <span>Periode: {periodContext}</span>}
                    {helperText && <span className="block mt-0.5">{helperText}</span>}
                </div>
            )}
        </div>
    );
}