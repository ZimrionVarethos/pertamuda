import React from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { StatusBadge } from '@/components/nasir/status-badge';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, CheckCircle2, AlertTriangle, Database, ShieldCheck } from 'lucide-react';

interface ImportDetailProps {
    import: {
        id: number;
        file_hash: string;
        status: string;
        row_count: number;
        valid_count: number;
        error_count: number;
        errors: string[];
        created_at: string;
    };
    previewRows: Array<Record<string, string>>;
}

export default function ImportDetail({ import: importItem, previewRows }: ImportDetailProps) {
    const { post, processing } = useForm();

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        post(`/dashboard/data/imports/${importItem.id}/confirm`);
    };

    const isReady = importItem.status === 'ready';
    const isCompleted = importItem.status === 'completed';

    return (
        <NasirDashboardLayout
            title={`Detail Impor #${importItem.id}`}
            breadcrumbs={[
                { label: 'Sumber Data', href: '/dashboard/data' },
                { label: `Impor #${importItem.id}` },
            ]}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-[#2B2B36] pb-5">
                <div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard/data"
                            className="p-1 rounded-md border border-[#2B2B36] bg-[#21222D] text-[#8C8D99] hover:text-[#FFFFFF]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                            Hasil Validasi Berkas Impor #{importItem.id}
                        </h1>
                        <StatusBadge status={importItem.status} size="md" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#8C8D99] mt-2 font-mono">
                        <span>SHA256: {importItem.file_hash}</span>
                        <span>•</span>
                        <span>Diunggah: {importItem.created_at}</span>
                    </div>
                </div>

                {isReady && (
                    <form onSubmit={handleConfirm}>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-5 py-2.5 text-xs font-bold text-[#171821] hover:bg-[#96d2cb] transition shadow-md disabled:opacity-50"
                        >
                            <CheckCircle2 className="h-4 w-4" />
                            <span>Konfirmasi dan Simpan ke Observasi</span>
                        </button>
                    </form>
                )}
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 shadow-sm">
                    <span className="text-[11px] font-medium text-[#8C8D99] uppercase">Total Baris Terbaca</span>
                    <div className="text-2xl font-bold text-[#FFFFFF] font-mono mt-1">{importItem.row_count}</div>
                </div>
                <div className="rounded-xl border border-[#4ADE80]/30 bg-[#4ADE80]/10 p-4 shadow-sm">
                    <span className="text-[11px] font-medium text-[#4ADE80] uppercase">Baris Lolos Validasi</span>
                    <div className="text-2xl font-bold text-[#4ADE80] font-mono mt-1">{importItem.valid_count}</div>
                </div>
                <div className="rounded-xl border border-[#F87171]/30 bg-[#F87171]/10 p-4 shadow-sm">
                    <span className="text-[11px] font-medium text-[#F87171] uppercase">Kesalahan Validasi</span>
                    <div className="text-2xl font-bold text-[#F87171] font-mono mt-1">{importItem.error_count}</div>
                </div>
            </div>

            {/* Error Details Box if any */}
            {importItem.error_count > 0 && (
                <div className="rounded-xl border border-[#F87171]/30 bg-[#21222D] p-5 mb-6 shadow-sm">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#F87171] mb-3">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>Daftar Kesalahan per Baris</span>
                    </div>
                    <p className="text-xs text-[#C5C7D0] mb-3">
                        Sistem NASIR menerapkan aturan integritas atomik: berkas tidak dapat dikomit jika terdapat baris yang tidak sesuai dengan parameter yang sah.
                    </p>
                    <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs font-mono text-[#F87171] bg-[#171821] p-3 rounded-lg border border-[#F87171]/30">
                        {importItem.errors.map((err, idx) => (
                            <div key={idx}>• {err}</div>
                        ))}
                    </div>
                </div>
            )}

            {/* Completed Success Banner */}
            {isCompleted && (
                <div className="rounded-xl border border-[#4ADE80]/30 bg-[#21222D] p-4 mb-6 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-3 text-xs text-[#4ADE80]">
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                        <div>
                            <span className="font-bold block">Impor Berhasil Diselesaikan</span>
                            <span>{importItem.valid_count} observasi telah disimpan dan evaluasi risiko fasilitas telah diperbarui secara otomatis.</span>
                        </div>
                    </div>
                    <Link
                        href="/dashboard/assets"
                        className="rounded-lg bg-[#A9DFD8] px-3 py-1.5 text-xs font-bold text-[#171821] hover:bg-[#96d2cb] transition shadow-sm"
                    >
                        Lihat Aset
                    </Link>
                </div>
            )}

            {/* Preview Table */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden shadow-sm">
                <div className="p-4 border-b border-[#2B2B36] flex items-center justify-between">
                    <div>
                        <h2 className="font-semibold text-sm text-[#FFFFFF]">Pratinjau Data Observasi (Maksimal 25 Baris Pertama)</h2>
                        <p className="text-xs text-[#8C8D99]">Format observasi panjang sesuai standar skema NASIR</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {previewRows.length > 0 ? (
                        <table className="w-full text-left text-xs font-mono">
                            <thead className="border-b border-[#2B2B36] bg-[#171821]/40 text-[#8C8D99] uppercase text-[10px]">
                                <tr>
                                    {Object.keys(previewRows[0]).map((key) => (
                                        <th key={key} className="py-2.5 px-3">{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                                {previewRows.map((row, idx) => (
                                    <tr key={idx} className="hover:bg-[#171821]/40 transition">
                                        {Object.values(row).map((val, cIdx) => (
                                            <td key={cIdx} className="py-2 px-3 text-[11px] whitespace-nowrap">
                                                {val || '-'}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-8 text-center text-xs text-[#8C8D99]">
                            Tidak ada baris pratinjau yang dapat ditampilkan.
                        </div>
                    )}
                </div>
            </div>
        </NasirDashboardLayout>
    );
}
