import React, { useState } from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { StatusBadge } from '@/components/nasir/status-badge';
import { Link, useForm } from '@inertiajs/react';
import {
    ArrowLeft,
    Printer,
    Download,
    Send,
    CheckCircle2,
    Clock,
    FileText,
    ShieldCheck,
    AlertTriangle,
    Save,
    X,
    History
} from 'lucide-react';

interface ReportShowProps {
    report: {
        id: number;
        type: string;
        raw_type: string;
        period_start: string;
        period_end: string;
        status: string;
        current_version: number;
        author_id: number;
        author_name: string;
        created_at: string;
    };
    facility: {
        id: number;
        code: string;
        name: string;
    };
    latestVersion: {
        version: number;
        content: any;
        calculations: Array<{
            asset_code: string;
            asset_name: string;
            methane_mass_kg: number | null;
            co2e_kg: number | null;
            coverage_ratio: number;
            uncertainty: string;
            exclusions?: string;
        }>;
        evidence: any;
        completeness_pct: number;
        reviewer_notes: string | null;
        reviewed_by: string | null;
        reviewed_at: string | null;
    } | null;
    versions: Array<{
        id: number;
        version: number;
        completeness_pct: number;
        reviewer_notes: string | null;
        reviewer_name: string | null;
        reviewed_at: string | null;
        created_at: string;
    }>;
    canReview: boolean;
}

export default function ReportShow({
    report,
    facility,
    latestVersion,
    versions,
    canReview,
}: ReportShowProps) {
    const initialContent = latestVersion?.content || {};
    const [content, setContent] = useState(initialContent);
    const [showReviewModal, setShowReviewModal] = useState(false);

    const { data: updateData, setData: setUpdateData, patch, processing: updateProcessing } = useForm({
        content: initialContent,
    });

    const { post: postSubmit, processing: submitProcessing } = useForm();

    const { data: reviewData, setData: setReviewData, post: postReview, processing: reviewProcessing } = useForm({
        decision: 'reviewed',
        notes: '',
    });

    const handleSaveContent = (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateData('content', content);
        patch(`/dashboard/reports/${report.id}`);
    };

    const handleSubmitForReview = (e: React.FormEvent) => {
        e.preventDefault();
        postSubmit(`/dashboard/reports/${report.id}/submit-review`);
    };

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postReview(`/dashboard/reports/${report.id}/review`, {
            onSuccess: () => setShowReviewModal(false),
        });
    };

    const calculations = latestVersion?.calculations || [];

    return (
        <NasirDashboardLayout
            title={`Draf ${report.type} v${report.current_version}`}
            breadcrumbs={[
                { label: 'Laporan Emisi', href: '/dashboard/reports' },
                { label: `Draf ${report.type} v${report.current_version}` },
            ]}
        >
            {/* Header & Export Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-[#2B2B36] pb-5">
                <div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard/reports"
                            className="p-1 rounded-md border border-[#2B2B36] bg-[#21222D] text-[#8C8D99] hover:text-[#FFFFFF]"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                            Draf {report.type} v{report.current_version}
                        </h1>
                        <StatusBadge status={report.status} size="md" />
                        <span className="rounded bg-[#FEB95A]/15 border border-[#FEB95A]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#FEB95A] uppercase">
                            Draf Prototipe. Belum Diverifikasi.
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8C8D99] mt-2">
                        <span>Fasilitas: {facility.name} ({facility.code})</span>
                        <span>•</span>
                        <span>Periode: {report.period_start} s/d {report.period_end}</span>
                        <span>•</span>
                        <span>Penyusun: {report.author_name}</span>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <a
                        href={`/dashboard/reports/${report.id}/print`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#2B2B36] bg-[#21222D] px-3 py-2 text-xs font-semibold text-[#FFFFFF] hover:border-[#8C8D99] transition"
                    >
                        <Printer className="h-3.5 w-3.5 text-[#FEB95A]" />
                        <span>Cetak / Simpan PDF</span>
                    </a>

                    <a
                        href={`/dashboard/reports/${report.id}/export-csv`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#2B2B36] bg-[#21222D] px-3 py-2 text-xs font-semibold text-[#FFFFFF] hover:border-[#8C8D99] transition"
                    >
                        <Download className="h-3.5 w-3.5 text-[#20AEF3]" />
                        <span>Ekspor CSV</span>
                    </a>

                    {report.status === 'draft' && (
                        <form onSubmit={handleSubmitForReview}>
                            <button
                                type="submit"
                                disabled={submitProcessing}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6] transition disabled:opacity-50"
                            >
                                <Send className="h-3.5 w-3.5" />
                                <span>Ajukan Tinjauan</span>
                            </button>
                        </form>
                    )}

                    {report.status === 'in_review' && canReview && (
                        <button
                            type="button"
                            onClick={() => setShowReviewModal(true)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-[#4ADE80] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#3ec470] transition"
                        >
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span>Tinjau Laporan</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Document Workspace Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Main Document Editor Area (8 cols) */}
                <div className="lg:col-span-8 space-y-6">
                    <form onSubmit={handleSaveContent} className="space-y-6">
                        {/* Section 1 */}
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <h2 className="text-sm font-bold text-[#FFFFFF] uppercase tracking-wider mb-4 border-b border-[#2B2B36] pb-2">
                                1. Identitas Fasilitas dan Cakupan Operasional
                            </h2>
                            <div className="space-y-3 text-xs">
                                <div>
                                    <label className="block text-[#8C8D99] mb-1">Ringkasan Batas Operasional dan Aksi</label>
                                    <textarea
                                        rows={2}
                                        value={content.section_1_facility?.scope_summary || ''}
                                        onChange={(e) => setContent({
                                            ...content,
                                            section_1_facility: { ...content.section_1_facility, scope_summary: e.target.value }
                                        })}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] p-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <h2 className="text-sm font-bold text-[#FFFFFF] uppercase tracking-wider mb-4 border-b border-[#2B2B36] pb-2">
                                2. Periode Pemantauan dan Asal Sumber Data
                            </h2>
                            <div className="space-y-3 text-xs">
                                <p className="text-[#C5C7D0]">
                                    Periode: <strong className="text-[#FFFFFF] font-metric">{report.period_start}</strong> s/d <strong className="text-[#FFFFFF] font-metric">{report.period_end}</strong>
                                </p>
                                <div>
                                    <label className="block text-[#8C8D99] mb-1">Catatan Asal Data</label>
                                    <input
                                        type="text"
                                        value={content.section_2_period?.data_source_mode || ''}
                                        onChange={(e) => setContent({
                                            ...content,
                                            section_2_period: { ...content.section_2_period, data_source_mode: e.target.value }
                                        })}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] p-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <h2 className="text-sm font-bold text-[#FFFFFF] uppercase tracking-wider mb-4 border-b border-[#2B2B36] pb-2">
                                3. Metode Kuantifikasi, Satuan, dan Asumsi
                            </h2>
                            <div className="space-y-3 text-xs">
                                <div>
                                    <label className="block text-[#8C8D99] mb-1">Metode Kuantifikasi</label>
                                    <input
                                        type="text"
                                        value={content.section_3_method?.quantification_method || ''}
                                        onChange={(e) => setContent({
                                            ...content,
                                            section_3_method: { ...content.section_3_method, quantification_method: e.target.value }
                                        })}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] p-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[#8C8D99] mb-1">Asumsi Dasar</label>
                                    <textarea
                                        rows={2}
                                        value={content.section_3_method?.assumptions || ''}
                                        onChange={(e) => setContent({
                                            ...content,
                                            section_3_method: { ...content.section_3_method, assumptions: e.target.value }
                                        })}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] p-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        {/* Section 4 */}
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <h2 className="text-sm font-bold text-[#FFFFFF] uppercase tracking-wider mb-4 border-b border-[#2B2B36] pb-2">
                                4. Hasil Kuantifikasi Emisi per Aset
                            </h2>

                            <div className="overflow-x-auto mb-4">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-[#2B2B36] text-[#8C8D99] uppercase text-[10px]">
                                        <tr>
                                            <th className="py-2 px-3">Kode Aset</th>
                                            <th className="py-2 px-3">Nama</th>
                                            <th className="py-2 px-3">Massa Metana</th>
                                            <th className="py-2 px-3">Cakupan Waktu</th>
                                            <th className="py-2 px-3">Ketidakpastian</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                                        {calculations.map((c, idx) => (
                                            <tr key={idx}>
                                                <td className="py-2 px-3 text-[#FFFFFF] font-bold font-code">{c.asset_code}</td>
                                                <td className="py-2 px-3">{c.asset_name}</td>
                                                <td className="py-2 px-3 font-semibold font-metric text-[#20AEF3]">
                                                    {c.methane_mass_kg !== null ? `${c.methane_mass_kg} kg` : 'Data belum cukup'}
                                                </td>
                                                <td className="py-2 px-3 font-metric">{c.coverage_ratio > 0 ? `${Math.round(c.coverage_ratio * 100)}%` : '-'}</td>
                                                <td className="py-2 px-3 text-[#8C8D99]">{c.uncertainty}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-3 rounded-lg bg-[#171821] text-xs text-[#C5C7D0]">
                                <span className="text-[#8C8D99] block mb-1">Ringkasan Total:</span>
                                <strong>{content.section_4_results?.summary_text}</strong>
                            </div>
                        </div>

                        {/* Section 5 & 6 */}
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <h2 className="text-sm font-bold text-[#FFFFFF] uppercase tracking-wider mb-4 border-b border-[#2B2B36] pb-2">
                                5. Referensi Observasi dan Bukti Sumber
                            </h2>
                            <textarea
                                rows={2}
                                value={content.section_5_evidence?.notes || ''}
                                onChange={(e) => setContent({
                                    ...content,
                                    section_5_evidence: { ...content.section_5_evidence, notes: e.target.value }
                                })}
                                className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] p-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                            ></textarea>
                        </div>

                        {/* Save Button */}
                        <div className="flex items-center justify-end">
                            <button
                                type="submit"
                                disabled={updateProcessing}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-5 py-2.5 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6] transition disabled:opacity-50"
                            >
                                <Save className="h-4 w-4" />
                                <span>Simpan Perubahan Draf</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Side Quality & Review Panel (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Checklist Box */}
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-bold text-xs text-[#FFFFFF] uppercase tracking-wider">
                                Kelengkapan Internal
                            </h3>
                            <span className="font-metric font-bold text-sm text-[#A9DFD8]">
                                {latestVersion?.completeness_pct ?? 0}%
                            </span>
                        </div>

                        <div className="w-full h-2 rounded-full bg-[#171821] overflow-hidden mb-4">
                            <div
                                className="h-full bg-[#A9DFD8] transition-all duration-300"
                                style={{ width: `${latestVersion?.completeness_pct ?? 0}%` }}
                            ></div>
                        </div>

                        <div className="space-y-2 text-xs text-[#C5C7D0]">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#4ADE80]" />
                                <span>Identitas fasilitas dan cakupan</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#4ADE80]" />
                                <span>Rentang periode dan sumber data</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#4ADE80]" />
                                <span>Metode kuantifikasi dan asumsi</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-[#4ADE80]" />
                                <span>Kuantifikasi terintegrasi per aset</span>
                            </div>
                        </div>

                        <p className="text-[11px] text-[#8C8D99] mt-4 pt-3 border-t border-[#2B2B36] leading-normal">
                            Checklist ini memeriksa struktur formal draf internal NASIR dan bukan jaminan kelulusan audit verifikator resmi.
                        </p>
                    </div>

                    {/* Review Notes Panel */}
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5">
                        <h3 className="font-bold text-xs text-[#FFFFFF] uppercase tracking-wider mb-3 flex items-center gap-2">
                            <ShieldCheck className="h-4 w-4 text-[#FEB95A]" />
                            <span>Catatan Penelaah Internal</span>
                        </h3>

                        {latestVersion?.reviewer_notes ? (
                            <div className="p-3.5 rounded-lg border border-[#2B2B36] bg-[#171821] space-y-2">
                                <p className="text-xs text-[#C5C7D0] leading-relaxed">
                                    {latestVersion.reviewer_notes}
                                </p>
                                <div className="text-[11px] text-[#8C8D99] pt-2 border-t border-[#2B2B36]">
                                    Ditelaah oleh: <strong className="text-[#FFFFFF]">{latestVersion.reviewed_by}</strong> ({latestVersion.reviewed_at})
                                </div>
                            </div>
                        ) : (
                            <div className="text-xs text-[#8C8D99] p-4 text-center rounded-lg border border-[#2B2B36] bg-[#171821]">
                                Belum ada catatan telaah formal yang disimpan untuk versi snapshot ini.
                            </div>
                        )}
                    </div>

                    {/* Version History List */}
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5">
                        <h3 className="font-bold text-xs text-[#FFFFFF] uppercase tracking-wider mb-3 flex items-center gap-2">
                            <History className="h-4 w-4 text-[#8C8D99]" />
                            <span>Riwayat Versi Snapshot</span>
                        </h3>

                        <div className="space-y-2 text-xs">
                            {versions.map((v) => (
                                <div
                                    key={v.id}
                                    className={`p-2.5 rounded-lg border transition ${
                                        v.version === report.current_version
                                            ? 'border-[#A9DFD8] bg-[#A9DFD8]/10'
                                            : 'border-[#2B2B36] bg-[#171821]'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="font-bold text-[#FFFFFF]">Versi {v.version}</span>
                                        <span className="text-[11px] text-[#8C8D99]">{v.created_at}</span>
                                    </div>
                                    <div className="text-[11px] text-[#8C8D99] mt-1">
                                        Kelengkapan: {v.completeness_pct}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Review */}
            {showReviewModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-[#2B2B36] pb-3">
                            <h3 className="font-bold text-base text-[#FFFFFF]">Penelaahan Internal Laporan</h3>
                            <button type="button" onClick={() => setShowReviewModal(false)} className="text-[#8C8D99] hover:text-[#FFFFFF]">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleReviewSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Keputusan Telaah</label>
                                <select
                                    value={reviewData.decision}
                                    onChange={(e) => setReviewData('decision', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                >
                                    <option value="reviewed">Setujui (Ditinjau Internal)</option>
                                    <option value="revision_requested">Minta Revisi Tambahan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Catatan Penelaah (Wajib)</label>
                                <textarea
                                    rows={4}
                                    value={reviewData.notes}
                                    onChange={(e) => setReviewData('notes', e.target.value)}
                                    placeholder="Tuliskan catatan verifikasi kesesuaian data sumber dan metodologi..."
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    required
                                ></textarea>
                            </div>

                            <p className="text-[11px] text-[#8C8D99]">
                                Status 'Ditinjau internal' mencatat bahwa anggota tim penelaah telah memeriksa kesesuaian draf sebelum pelaporan formal.
                            </p>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowReviewModal(false)} className="rounded-lg border border-[#2B2B36] px-4 py-2 text-xs font-semibold text-[#8C8D99] hover:text-[#FFFFFF]">
                                    Batal
                                </button>
                                <button type="submit" disabled={reviewProcessing} className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6]">
                                    Kirim Telaah
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NasirDashboardLayout>
    );
}
