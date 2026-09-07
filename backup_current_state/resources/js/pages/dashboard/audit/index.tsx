import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import {
    History,
    Search,
    Filter,
    FileJson,
    X,
    CheckCircle2,
    Database,
    Shield,
    Boxes,
    FileText,
    Wrench,
    ArrowRight
} from 'lucide-react';

interface AuditEventItem {
    id: number;
    actor_name: string;
    action: string;
    entity_type: string;
    entity_id: number;
    payload_before: Record<string, any> | null;
    payload_after: Record<string, any> | null;
    occurred_at: string;
}

interface AuditIndexProps {
    facility: {
        id: number;
        code: string;
        name: string;
        sector: string;
    } | null;
    events: AuditEventItem[];
    filters: {
        action: string | null;
        entity: string | null;
    };
    availableActions: string[];
    availableEntities: string[];
}

export default function AuditIndex({
    facility,
    events,
    filters,
    availableActions,
    availableEntities
}: AuditIndexProps) {
    const [selectedEvent, setSelectedEvent] = useState<AuditEventItem | null>(null);
    const [actionFilter, setActionFilter] = useState(filters.action || '');
    const [entityFilter, setEntityFilter] = useState(filters.entity || '');

    const applyFilters = (newAction: string, newEntity: string) => {
        setActionFilter(newAction);
        setEntityFilter(newEntity);

        const params: Record<string, string> = {};
        if (newAction) params.action = newAction;
        if (newEntity) params.entity = newEntity;

        router.get('/dashboard/audit', params, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const resetFilters = () => {
        setActionFilter('');
        setEntityFilter('');
        router.get('/dashboard/audit', {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getActionBadgeColor = (action: string) => {
        if (action.includes('dibuat') || action.includes('diimpor')) {
            return 'border-[#4ADE80]/30 bg-[#4ADE80]/15 text-[#4ADE80]';
        }
        if (action.includes('diperbarui') || action.includes('ditinjau')) {
            return 'border-[#FEB95A]/30 bg-[#FEB95A]/15 text-[#FEB95A]';
        }
        if (action.includes('dihapus') || action.includes('gagal')) {
            return 'border-[#FB7185]/30 bg-[#FB7185]/15 text-[#FB7185]';
        }
        return 'border-[#2B2B36] bg-[#171821] text-[#8C8D99]';
    };

    const getEntityIcon = (entityType: string) => {
        switch (entityType.toLowerCase()) {
            case 'asset':
                return <Boxes className="h-4 w-4 text-[#FEB95A]" />;
            case 'import':
                return <Database className="h-4 w-4 text-[#20AEF3]" />;
            case 'maintenancetask':
                return <Wrench className="h-4 w-4 text-[#FEB95A]" />;
            case 'report':
            case 'reportversion':
                return <FileText className="h-4 w-4 text-[#A9DFD8]" />;
            default:
                return <Shield className="h-4 w-4 text-[#8C8D99]" />;
        }
    };

    return (
        <NasirDashboardLayout
            title="Jejak Audit"
            breadcrumbs={[{ label: 'Jejak Audit' }]}
        >
            <Head title="Jejak Audit | NASIR" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-[#2B2B36] pb-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A9DFD8]">
                            <History className="h-4 w-4" />
                            <span>Integritas & Kepatuhan Operasional</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#FFFFFF] mt-1">
                            Jejak Audit Sistem
                        </h1>
                        <p className="text-sm text-[#8C8D99] mt-1">
                            Log peristiwa kronologis dengan prinsip append-only untuk memverifikasi setiap tindakan personil, mutasi aset, impor berkas, dan pengesahan laporan.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="rounded-lg border border-[#2B2B36] bg-[#21222D] px-3 py-2 text-xs text-[#C5C7D0]">
                            <span className="text-[#8C8D99]">Fasilitas:</span>{' '}
                            <span className="font-semibold text-[#FFFFFF]">{facility?.name ?? 'Fasilitas Utama'}</span>
                        </div>
                    </div>
                </div>

                {/* Banner Integritas Audit */}
                <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 text-xs text-[#C5C7D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <div className="rounded-lg bg-[#A9DFD8]/10 p-2 text-[#A9DFD8] border border-[#A9DFD8]/30 shrink-0 mt-0.5 sm:mt-0">
                            <Shield className="h-4 w-4" />
                        </div>
                        <div>
                            <p className="font-semibold text-[#FFFFFF]">
                                Prinsip Rekam Jejak Append-Only (Immutable)
                            </p>
                            <p className="text-[#8C8D99] mt-0.5">
                                Catatan ini tidak dapat dihapus atau diubah melalui antarmuka pengguna demi memastikan keabsahan riwayat kepatuhan untuk verifikator independen dan auditor internal.
                            </p>
                        </div>
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded bg-[#171821] border border-[#2B2B36] px-3 py-1.5 text-[11px] font-code text-[#4ADE80] shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#4ADE80]" />
                        <span>Integritas Terverifikasi</span>
                    </div>
                </div>

                {/* Bar Filter */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 rounded-xl border border-[#2B2B36] bg-[#21222D] p-4">
                    <div className="flex items-center gap-2 text-xs text-[#8C8D99] shrink-0">
                        <Filter className="h-4 w-4 text-[#A9DFD8]" />
                        <span className="font-medium text-[#FFFFFF]">Penyaring Data:</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        {/* Filter Aksi */}
                        <div>
                            <select
                                value={actionFilter}
                                onChange={(e) => applyFilters(e.target.value, entityFilter)}
                                className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                            >
                                <option value="">Semua Aksi Peristiwa</option>
                                {availableActions.map((action) => (
                                     <option key={action} value={action}>
                                         Aksi: {action}
                                     </option>
                                ))}
                            </select>
                        </div>

                        {/* Filter Entitas */}
                        <div>
                            <select
                                value={entityFilter}
                                onChange={(e) => applyFilters(actionFilter, e.target.value)}
                                className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                            >
                                <option value="">Semua Tipe Entitas</option>
                                {availableEntities.map((ent) => (
                                     <option key={ent} value={ent}>
                                         Entitas: {ent}
                                     </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {(actionFilter || entityFilter) && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#8C8D99] hover:text-[#FFFFFF] hover:border-[#8C8D99] transition shrink-0"
                        >
                            Atur Ulang
                        </button>
                    )}
                </div>

                {/* Tabel Peristiwa Audit */}
                <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="border-b border-[#2B2B36] bg-[#171821] text-[#8C8D99] uppercase tracking-wider font-semibold">
                                <tr>
                                    <th className="px-4 py-3.5">Waktu Kejadian</th>
                                    <th className="px-4 py-3.5">Pelaksana / Aktor</th>
                                    <th className="px-4 py-3.5">Aksi Peristiwa</th>
                                    <th className="px-4 py-3.5">Tipe Entitas</th>
                                    <th className="px-4 py-3.5">ID Entitas</th>
                                    <th className="px-4 py-3.5 text-right">Muatan Data</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2B2B36] text-[#C5C7D0]">
                                {events.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-4 py-12 text-center text-[#8C8D99]">
                                            Tidak ada catatan peristiwa audit yang cocok dengan filter yang dipilih.
                                        </td>
                                    </tr>
                                ) : (
                                    events.map((evt) => (
                                        <tr key={evt.id} className="hover:bg-[#171821]/50 transition">
                                            <td className="px-4 py-3 font-metric text-[11px] text-[#FFFFFF] whitespace-nowrap">
                                                {evt.occurred_at}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-[#FFFFFF]">
                                                {evt.actor_name}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-[11px] font-code ${getActionBadgeColor(evt.action)}`}>
                                                    {evt.action}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="inline-flex items-center gap-1.5 text-[#C5C7D0]">
                                                    {getEntityIcon(evt.entity_type)}
                                                    <span>{evt.entity_type}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 font-code text-[11px] text-[#8C8D99]">
                                                #{evt.entity_id}
                                            </td>
                                            <td className="px-4 py-3 text-right">
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedEvent(evt)}
                                                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#2B2B36] bg-[#171821] px-2.5 py-1 text-[11px] font-medium text-[#C5C7D0] hover:text-[#A9DFD8] hover:border-[#A9DFD8]/40 transition"
                                                >
                                                    <FileJson className="h-3 w-3" />
                                                    <span>Inspeksi</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="border-t border-[#2B2B36] bg-[#171821] px-4 py-3 flex items-center justify-between text-xs text-[#8C8D99]">
                        <span>Menampilkan {events.length} catatan audit terbaru</span>
                        <span>Stempel Waktu: WIB (Asia/Jakarta)</span>
                    </div>
                </div>
            </div>

            {/* Modal Inspeksi Payload */}
            {selectedEvent && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
                    <div className="relative w-full max-w-3xl rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 shadow-2xl my-8">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-[#2B2B36] pb-4">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-mono text-[#A9DFD8]">
                                    <FileJson className="h-4 w-4" />
                                    <span>Audit ID #{selectedEvent.id}</span>
                                </div>
                                <h3 className="text-lg font-bold text-[#FFFFFF] mt-1">
                                    Inspeksi Perubahan Data
                                </h3>
                                <p className="text-xs text-[#8C8D99] mt-0.5">
                                    Aksi: <span className="text-[#FFFFFF] font-semibold">{selectedEvent.action}</span> oleh <span className="text-[#FFFFFF] font-semibold">{selectedEvent.actor_name}</span> pada {selectedEvent.occurred_at}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setSelectedEvent(null)}
                                className="rounded-lg p-1.5 text-[#8C8D99] hover:bg-[#171821] hover:text-[#FFFFFF] transition"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="mt-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-xs">
                                <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3">
                                    <span className="text-[#8C8D99] block">Tipe Entitas:</span>
                                    <span className="font-semibold text-[#FFFFFF] mt-0.5 block">{selectedEvent.entity_type}</span>
                                </div>
                                <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3">
                                    <span className="text-[#8C8D99] block">ID Entitas:</span>
                                    <span className="font-semibold font-code text-[#A9DFD8] mt-0.5 block">#{selectedEvent.entity_id}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Payload Sebelum */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-[#8C8D99]">
                                        <span>Status Sebelumnya (Before)</span>
                                    </div>
                                    <div className="rounded-xl border border-[#2B2B36] bg-[#171821] p-3 font-code text-[11px] text-[#C5C7D0] overflow-x-auto max-h-64 overflow-y-auto">
                                        {selectedEvent.payload_before ? (
                                            <pre className="whitespace-pre-wrap">
                                                {JSON.stringify(selectedEvent.payload_before, null, 2)}
                                            </pre>
                                        ) : (
                                            <span className="text-[#8C8D99] italic">
                                                Tidak ada data sebelumnya (entitas baru dibuat).
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Payload Sesudah */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-[#4ADE80]">
                                        <span>Status Sesudahnya (After)</span>
                                    </div>
                                    <div className="rounded-xl border border-[#2B2B36] bg-[#171821] p-3 font-code text-[11px] text-[#C5C7D0] overflow-x-auto max-h-64 overflow-y-auto">
                                        {selectedEvent.payload_after ? (
                                            <pre className="whitespace-pre-wrap">
                                                {JSON.stringify(selectedEvent.payload_after, null, 2)}
                                            </pre>
                                        ) : (
                                            <span className="text-[#8C8D99] italic">
                                                Tidak ada data muatan setelahnya.
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="mt-6 border-t border-[#2B2B36] pt-4 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setSelectedEvent(null)}
                                className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6] transition"
                            >
                                Tutup Panel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </NasirDashboardLayout>
    );
}
