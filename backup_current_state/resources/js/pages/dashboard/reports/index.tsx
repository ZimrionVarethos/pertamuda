import React, { useState } from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { StatusBadge } from '@/components/nasir/status-badge';
import { Link, useForm, router } from '@inertiajs/react';
import { FileText, Plus, Filter, ArrowUpRight, X, Calendar, CheckCircle2 } from 'lucide-react';

interface ReportsIndexProps {
    facility: {
        id: number;
        code: string;
        name: string;
    };
    reports: Array<{
        id: number;
        type: string;
        raw_type: string;
        period_start: string;
        period_end: string;
        status: string;
        current_version: number;
        author_name: string;
        completeness_pct: number;
        updated_at: string;
    }>;
    filters: {
        type?: string;
        status?: string;
    };
}

export default function ReportsIndex({ facility, reports, filters }: ReportsIndexProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        type: 'dram',
        period_start: '2026-08-31',
        period_end: '2026-09-07',
    });

    const handleFilterType = (type: string) => {
        router.get('/dashboard/reports', { ...filters, type: filters.type === type ? '' : type }, { preserveState: true });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/reports', {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            },
        });
    };

    return (
        <NasirDashboardLayout
            title="Draf Dokumen Emisi"
            breadcrumbs={[{ label: 'Laporan Emisi' }]}
        >
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                        Draf Dokumen Pelaporan Mitigasi Emisi
                    </h1>
                    <p className="text-xs text-[#8C8D99] mt-1">
                        Penyusunan dan penelaahan internal draf dokumen DRAM dan LCAM untuk {facility.name}.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-4 py-2.5 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6] transition self-start sm:self-auto"
                >
                    <Plus className="h-4 w-4" />
                    <span>Buat Draf Laporan Baru</span>
                </button>
            </div>

            {/* Filter Bar */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[#8C8D99] flex items-center gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filter Jenis:</span>
                    </span>
                    {['dram', 'lcam'].map((tp) => (
                        <button
                            key={tp}
                            type="button"
                            onClick={() => handleFilterType(tp)}
                            className={`rounded-md px-3 py-1 text-xs font-medium uppercase border transition ${
                                filters.type === tp
                                    ? 'border-[#A9DFD8] bg-[#A9DFD8]/15 text-[#A9DFD8] font-semibold'
                                    : 'border-[#2B2B36] bg-[#171821] text-[#8C8D99] hover:text-[#FFFFFF]'
                            }`}
                        >
                            Draf {tp.toUpperCase()}
                        </button>
                    ))}
                </div>

                <div className="text-[11px] text-[#8C8D99]">
                    Total Dokumen: <span className="font-metric text-[#A9DFD8] font-semibold">{reports.length}</span>
                </div>
            </div>

            {/* Reports Table */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-[#2B2B36] bg-[#171821] text-[#8C8D99] uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="py-3 px-4">Jenis Dokumen</th>
                                <th className="py-3 px-4">Periode Observasi</th>
                                <th className="py-3 px-4">Versi Snapshot</th>
                                <th className="py-3 px-4">Penyusun</th>
                                <th className="py-3 px-4">Kelengkapan</th>
                                <th className="py-3 px-4">Status Review</th>
                                <th className="py-3 px-4 text-right">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                            {reports.length > 0 ? (
                                reports.map((r) => (
                                    <tr key={r.id} className="hover:bg-[#171821]/40 transition">
                                        <td className="py-3.5 px-4 font-bold text-[#FFFFFF]">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-4 w-4 text-[#FEB95A]" />
                                                <span>Draf {r.type}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4 text-[#C5C7D0]">
                                            {r.period_start} s/d {r.period_end}
                                        </td>
                                        <td className="py-3.5 px-4 font-code font-semibold text-[#A9DFD8]">
                                            v{r.current_version}
                                        </td>
                                        <td className="py-3.5 px-4">{r.author_name}</td>
                                        <td className="py-3.5 px-4 font-metric">
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-1.5 rounded-full bg-[#171821] overflow-hidden">
                                                    <div className="h-full bg-[#A9DFD8]" style={{ width: `${r.completeness_pct}%` }}></div>
                                                </div>
                                                <span>{r.completeness_pct}%</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <StatusBadge status={r.status} size="sm" />
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <Link
                                                href={`/dashboard/reports/${r.id}`}
                                                className="inline-flex items-center gap-1 font-semibold text-[#A9DFD8] hover:underline"
                                            >
                                                <span>Buka Editor</span>
                                                <ArrowUpRight className="h-3 w-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-[#8C8D99]">
                                        Belum ada draf laporan yang dibuat.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Report Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-[#2B2B36] pb-3">
                            <h3 className="font-bold text-base text-[#FFFFFF]">Buat Draf Dokumen Baru</h3>
                            <button type="button" onClick={() => setShowCreateModal(false)} className="text-[#8C8D99] hover:text-[#FFFFFF]">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Jenis Dokumen Pelaporan</label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                >
                                    <option value="dram">DRAM (Dokumen Rancangan Aksi Mitigasi)</option>
                                    <option value="lcam">LCAM (Laporan Capaian Aksi Mitigasi)</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-[#8C8D99] mb-1">Mulai Periode</label>
                                    <input
                                        type="date"
                                        value={data.period_start}
                                        onChange={(e) => setData('period_start', e.target.value)}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#8C8D99] mb-1">Akhir Periode</label>
                                    <input
                                        type="date"
                                        value={data.period_end}
                                        onChange={(e) => setData('period_end', e.target.value)}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="rounded-lg bg-[#171821] p-3 text-[11px] text-[#8C8D99] leading-relaxed">
                                Sistem akan mengagregasi kuantifikasi emisi metana dari aset fasilitas {facility.name} dalam rentang tanggal yang dipilih dan membuat snapshot versi 1.
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="rounded-lg border border-[#2B2B36] px-4 py-2 text-xs font-semibold text-[#8C8D99] hover:text-[#FFFFFF]">
                                    Batal
                                </button>
                                <button type="submit" disabled={processing} className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6]">
                                    Buat Draf
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NasirDashboardLayout>
    );
}
