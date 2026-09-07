import React, { useState } from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { StatusBadge } from '@/components/nasir/status-badge';
import { Link, useForm } from '@inertiajs/react';
import { Database, Upload, Download, ArrowUpRight, X, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DataIndexProps {
    facility: {
        id: number;
        code: string;
        name: string;
    };
    dataSources: Array<{
        id: number;
        type: string;
        label: string;
        mode: string;
        last_import_at: string;
    }>;
    imports: Array<{
        id: number;
        file_hash: string;
        status: string;
        row_count: number;
        valid_count: number;
        error_count: number;
        actor_name: string;
        created_at: string;
    }>;
}

export default function DataIndex({ facility, dataSources, imports }: DataIndexProps) {
    const [showUploadModal, setShowUploadModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null as File | null,
        source_id: (dataSources[0]?.id || '').toString(),
    });

    const handleUploadSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/data/upload', {
            onSuccess: () => {
                setShowUploadModal(false);
                reset();
            },
        });
    };

    return (
        <NasirDashboardLayout
            title="Sumber Data dan Impor"
            breadcrumbs={[{ label: 'Sumber Data' }]}
        >
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                        Sumber Data dan Riwayat Impor
                    </h1>
                    <p className="text-xs text-[#8C8D99] mt-1">
                        Pusat penerimaan data sensor lapangan dan catatan pengukuran untuk {facility.name}.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <a
                        href="/dashboard/data/template"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#2B2B36] bg-[#21222D] px-3.5 py-2 text-xs font-semibold text-[#FFFFFF] hover:border-[#A9DFD8] transition shadow-sm"
                    >
                        <Download className="h-3.5 w-3.5 text-[#A9DFD8]" />
                        <span>Unduh Template CSV</span>
                    </a>

                    <button
                        type="button"
                        onClick={() => setShowUploadModal(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-bold text-[#171821] hover:bg-[#96d2cb] transition shadow-sm"
                    >
                        <Upload className="h-3.5 w-3.5" />
                        <span>Unggah Berkas CSV</span>
                    </button>
                </div>
            </div>

            {/* Data Sources Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {dataSources.map((ds) => (
                    <div key={ds.id} className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="h-9 w-9 rounded-lg bg-[#171821] flex items-center justify-center text-[#A9DFD8]">
                                <Database className="h-4 w-4" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-xs text-[#FFFFFF]">{ds.label}</h3>
                                <span className="text-[10px] text-[#8C8D99] uppercase tracking-wider">Mode: {ds.mode}</span>
                            </div>
                        </div>
                        <div className="border-t border-[#2B2B36] pt-3 flex items-center justify-between text-[11px] text-[#8C8D99]">
                            <span>Pembaruan terakhir:</span>
                            <span className="font-medium text-[#C5C7D0]">{ds.last_import_at}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Import History Table */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden shadow-sm">
                <div className="p-4 border-b border-[#2B2B36] flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-sm text-[#FFFFFF]">Riwayat Berkas Impor</h2>
                        <p className="text-xs text-[#8C8D99]">Setiap impor memiliki hash SHA256 untuk memastikan idempotensi dan integritas rekam jejak</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-[#2B2B36] bg-[#171821]/40 text-[#8C8D99] uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="py-3 px-4">Hash Berkas</th>
                                <th className="py-3 px-4">Waktu Unggah</th>
                                <th className="py-3 px-4">Pengunggah</th>
                                <th className="py-3 px-4">Total Baris</th>
                                <th className="py-3 px-4">Baris Valid</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Rincian</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                            {imports.length > 0 ? (
                                imports.map((i) => (
                                    <tr key={i.id} className="hover:bg-[#171821]/40 transition">
                                        <td className="py-3.5 px-4 font-code text-[#FFFFFF]">{i.file_hash}</td>
                                        <td className="py-3.5 px-4">{i.created_at}</td>
                                        <td className="py-3.5 px-4">{i.actor_name}</td>
                                        <td className="py-3.5 px-4 font-metric">{i.row_count}</td>
                                        <td className="py-3.5 px-4 font-metric text-[#4ADE80]">{i.valid_count}</td>
                                        <td className="py-3.5 px-4">
                                            <StatusBadge status={i.status} size="sm" />
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <Link
                                                href={`/dashboard/data/imports/${i.id}`}
                                                className="inline-flex items-center gap-1 font-semibold text-[#A9DFD8] hover:underline"
                                            >
                                                <span>Buka</span>
                                                <ArrowUpRight className="h-3 w-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-[#8C8D99]">
                                        Belum ada riwayat berkas impor yang tercatat.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-[#2B2B36] pb-3">
                            <h3 className="font-bold text-base text-[#FFFFFF]">Unggah Berkas Observasi CSV</h3>
                            <button
                                type="button"
                                onClick={() => setShowUploadModal(false)}
                                className="text-[#8C8D99] hover:text-[#FFFFFF]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleUploadSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Sumber Data Terkait</label>
                                <select
                                    value={data.source_id}
                                    onChange={(e) => setData('source_id', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                >
                                    {dataSources.map((ds) => (
                                        <option key={ds.id} value={ds.id}>{ds.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Pilih Berkas CSV (Maksimal 5 MB)</label>
                                <input
                                    type="file"
                                    accept=".csv,text/csv"
                                    onChange={(e) => setData('file', e.target.files ? e.target.files[0] : null)}
                                    className="w-full text-xs text-[#C5C7D0] file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#171821] file:text-[#FFFFFF] hover:file:bg-[#2B2B36] cursor-pointer"
                                    required
                                />
                                {errors.file && <p className="mt-1 text-[11px] text-[#F87171]">{errors.file}</p>}
                            </div>

                            <div className="rounded-lg bg-[#171821] p-3 text-[11px] text-[#8C8D99] space-y-1">
                                <div>• Format kolom: asset_code, observed_at, parameter, value, unit, interval_end, source_ref</div>
                                <div>• Parameter diizinkan: pressure, wall_loss, methane_concentration, methane_mass_rate, h2s_concentration</div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowUploadModal(false)}
                                    className="rounded-lg border border-[#2B2B36] px-4 py-2 text-xs font-semibold text-[#8C8D99] hover:text-[#FFFFFF]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-bold text-[#171821] hover:bg-[#96d2cb] transition disabled:opacity-50"
                                >
                                    Verifikasi dan Unggah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NasirDashboardLayout>
    );
}
