import React, { useState } from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { StatusBadge, getTierRowClass, getTierScoreTextColor, TierRevealLabel } from '@/components/nasir/status-badge';
import { Link, useForm, router } from '@inertiajs/react';
import { Search, Plus, Filter, ArrowUpRight, X, Boxes } from 'lucide-react';

interface AssetsIndexProps {
    facility: {
        id: number;
        code: string;
        name: string;
    };
    assets: Array<{
        id: number;
        code: string;
        name: string;
        type: string;
        demo_baseline_pressure_bar: number | null;
        composite_score: number | null;
        corrosion_score: number | null;
        leak_score: number | null;
        emission_signal_score: number | null;
        tier: string;
        evaluated_at?: string;
    }>;
    filters: {
        search?: string;
        tier?: string;
        type?: string;
    };
    assetTypes: string[];
}

export default function AssetsIndex({ facility, assets, filters, assetTypes }: AssetsIndexProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [showCreateModal, setShowCreateModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
        name: '',
        type: 'pipeline',
        demo_baseline_pressure_bar: '',
    });

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/dashboard/assets', { ...filters, search }, { preserveState: true });
    };

    const handleFilterTier = (tier: string) => {
        router.get('/dashboard/assets', { ...filters, tier: filters.tier === tier ? '' : tier }, { preserveState: true });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dashboard/assets', {
            onSuccess: () => {
                setShowCreateModal(false);
                reset();
            },
        });
    };

    return (
        <NasirDashboardLayout
            title="Daftar Aset Fasilitas"
            breadcrumbs={[{ label: 'Aset Fasilitas' }]}
        >
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                        Aset Fasilitas Migas
                    </h1>
                    <p className="text-xs text-[#8C8D99] mt-1">
                        Peralatan terpantau pada {facility.name} ({facility.code}).
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-4 py-2.5 text-xs font-bold text-[#171821] hover:bg-[#96d2cb] transition self-start sm:self-auto shadow-sm"
                >
                    <Plus className="h-4 w-4" />
                    <span>Tambah Aset Baru</span>
                </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 mb-6 space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                    <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-80">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#8C8D99]" />
                        <input
                            type="text"
                            placeholder="Cari kode atau nama aset..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] pl-9 pr-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none placeholder-[#8C8D99]"
                        />
                    </form>

                    <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                        <span className="text-xs text-[#8C8D99] flex items-center gap-1">
                            <Filter className="h-3.5 w-3.5" />
                            <span>Filter Tier:</span>
                        </span>
                        {['Rendah', 'Sedang', 'Tinggi', 'Kritis', 'Data belum cukup'].map((t) => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => handleFilterTier(t)}
                                className={`rounded-md px-2.5 py-1 text-[11px] font-medium border transition ${
                                    filters.tier === t
                                        ? 'border-[#A9DFD8] bg-[#A9DFD8]/15 text-[#A9DFD8]'
                                        : 'border-[#2B2B36] bg-[#171821] text-[#8C8D99] hover:text-[#FFFFFF]'
                                }`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Assets Table */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-[#2B2B36] bg-[#171821]/40 text-[#8C8D99] uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="py-3 px-4 min-w-[150px]">Kode Aset</th>
                                <th className="py-3 px-4">Nama dan Tipe</th>
                                <th className="py-3 px-4">Baseline Tekanan</th>
                                <th className="py-3 px-4">Subskor (K/L/E)</th>
                                <th className="py-3 px-4">Skor Triase</th>
                                <th className="py-3 px-4 text-right">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                            {assets.length > 0 ? (
                                assets.map((a) => (
                                    <tr key={a.id} className={getTierRowClass(a.tier)}>
                                        <td className="py-3.5 px-4 font-code font-bold text-[#FFFFFF] whitespace-nowrap">
                                            <TierRevealLabel tier={a.tier} />
                                            <span>{a.code}</span>
                                        </td>
                                        <td className="py-3.5 px-4">
                                            <div className="font-medium text-[#FFFFFF]">{a.name}</div>
                                            <div className="text-[11px] text-[#8C8D99] capitalize">{a.type}</div>
                                        </td>
                                        <td className="py-3.5 px-4 font-metric">
                                            {a.demo_baseline_pressure_bar ? `${a.demo_baseline_pressure_bar} bar` : '-'}
                                        </td>
                                        <td className="py-3.5 px-4 font-metric text-[11px] text-[#8C8D99]">
                                            {a.composite_score !== null ? (
                                                <span>{a.corrosion_score ?? '-'} / {a.leak_score ?? '-'} / {a.emission_signal_score ?? '-'}</span>
                                            ) : (
                                                <span>Data parsial</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 font-metric font-semibold">
                                            {a.composite_score !== null ? (
                                                <span className={getTierScoreTextColor(a.composite_score)}>
                                                    {a.composite_score}/100
                                                </span>
                                            ) : (
                                                <span className="text-[#8C8D99] font-normal">Data belum cukup</span>
                                            )}
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <Link
                                                href={`/dashboard/assets/${a.id}`}
                                                className="inline-flex items-center gap-1 font-semibold text-[#A9DFD8] hover:underline"
                                            >
                                                <span>Inspeksi</span>
                                                <ArrowUpRight className="h-3.5 w-3.5" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="py-8 text-center text-xs text-[#8C8D99]">
                                        Tidak ada aset terdaftar pada fasilitas ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create Asset Sheet / Dialog */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
                    <div className="w-full max-w-md rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-[#2B2B36] pb-3">
                            <h3 className="text-base font-bold text-[#FFFFFF]">Tambah Aset Peralatan Baru</h3>
                            <button
                                type="button"
                                onClick={() => setShowCreateModal(false)}
                                className="text-xs text-[#8C8D99] hover:text-[#FFFFFF]"
                            >
                                Tutup
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Kode Aset</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: S10"
                                    value={data.code}
                                    onChange={(e) => setData('code', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] uppercase font-code focus:border-[#A9DFD8] focus:outline-none"
                                    required
                                />
                                {errors.code && <p className="mt-1 text-[11px] text-[#F87171]">{errors.code}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Nama Aset</label>
                                <input
                                    type="text"
                                    placeholder="Contoh: Secondary Gas Compressor"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-[11px] text-[#F87171]">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Tipe Peralatan</label>
                                <select
                                    value={data.type}
                                    onChange={(e) => setData('type', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                >
                                    <option value="pipeline">Pipeline (Perpipaan)</option>
                                    <option value="separator">Separator (Bejana Pemisah)</option>
                                    <option value="compressor">Compressor (Kompresor Gas)</option>
                                    <option value="valve">Valve (Katup Pengaman)</option>
                                    <option value="tank">Tank (Tangki Penyimpanan)</option>
                                    <option value="wellhead">Wellhead (Kepala Sumur)</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Baseline Tekanan Normal (bar)</label>
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="Contoh: 10.0"
                                    value={data.demo_baseline_pressure_bar}
                                    onChange={(e) => setData('demo_baseline_pressure_bar', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] font-metric focus:border-[#A9DFD8] focus:outline-none"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowCreateModal(false)}
                                    className="rounded-lg border border-[#2B2B36] px-4 py-2 text-xs font-semibold text-[#8C8D99] hover:text-[#FFFFFF]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-bold text-[#171821] hover:bg-[#96d2cb] transition disabled:opacity-50"
                                >
                                    Simpan Aset
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NasirDashboardLayout>
    );
}