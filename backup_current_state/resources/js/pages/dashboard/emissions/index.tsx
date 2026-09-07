import React from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { MetricCard } from '@/components/nasir/metric-card';
import { Link, router } from '@inertiajs/react';
import { Wind, Info, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface EmissionIndexProps {
    facility: {
        id: number;
        code: string;
        name: string;
    };
    method: {
        version: string;
        provenance: string;
        config: any;
    } | null;
    period: {
        days: number;
        start: string;
        end: string;
    };
    totalMethaneKg: number;
    assetSummaries: Array<{
        asset_id: number;
        code: string;
        name: string;
        type: string;
        methane_mass_kg: number | null;
        co2e_kg: number | null;
        coverage_ratio: number;
        uncertainty: string;
        exclusions: string | null;
        period: string;
    }>;
}

export default function EmissionIndex({
    facility,
    method,
    period,
    totalMethaneKg,
    assetSummaries,
}: EmissionIndexProps) {
    const topEmitters = assetSummaries
        .filter((a) => a.methane_mass_kg !== null && a.methane_mass_kg > 0)
        .slice(0, 8)
        .map((a) => ({
            code: a.code,
            mass: a.methane_mass_kg,
        }));

    const handlePeriodChange = (days: number) => {
        router.get('/dashboard/emissions', { days }, { preserveState: true });
    };

    return (
        <NasirDashboardLayout
            title="Kuantifikasi Emisi Metana"
            breadcrumbs={[{ label: 'Kuantifikasi Emisi' }]}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                        Kuantifikasi Emisi Metana Tertelusur
                    </h1>
                    <p className="text-xs text-[#8C8D99] mt-1">
                        Integrasi laju massa kg/h terhadap interval waktu terukur untuk {facility.name}.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8C8D99]">Periode:</span>
                    <div className="inline-flex rounded-lg border border-[#2B2B36] bg-[#171821] p-0.5 text-xs">
                        <button
                            type="button"
                            onClick={() => handlePeriodChange(7)}
                            className={`px-3 py-1 rounded-md font-medium transition ${
                                period.days === 7 ? 'bg-[#A9DFD8] text-[#171821] font-semibold' : 'text-[#8C8D99] hover:text-[#FFFFFF]'
                            }`}
                        >
                            7 Hari
                        </button>
                        <button
                            type="button"
                            onClick={() => handlePeriodChange(30)}
                            className={`px-3 py-1 rounded-md font-medium transition ${
                                period.days === 30 ? 'bg-[#A9DFD8] text-[#171821] font-semibold' : 'text-[#8C8D99] hover:text-[#FFFFFF]'
                            }`}
                        >
                            30 Hari
                        </button>
                    </div>
                </div>
            </div>

            {/* Methodology & Boundary Note */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#20AEF3] uppercase tracking-wider mb-2">
                    <Info className="h-4 w-4" />
                    <span>Kaidah Kuantifikasi Emisi Metana Murni</span>
                </div>
                <p className="text-xs text-[#C5C7D0] leading-relaxed mb-2">
                    Kuantifikasi massa hanya dihitung dari pembacaan laju massa (<code className="text-[#20AEF3] bg-[#171821] px-1 py-0.5 rounded">methane_mass_rate</code> dalam kg/h) yang memiliki pasangan waktu mulai dan selesai interval yang sah. Interval negatif atau tumpang tindih ditolak oleh sistem.
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[11px] text-[#8C8D99]">
                    <span>Metode: {method?.provenance ?? 'Protokol GRK Kuantifikasi Laju Massa'}</span>
                    <span>•</span>
                    <span>Status CO2e: <span className="text-[#C5C7D0]">Faktor konversi belum ditetapkan</span></span>
                </div>
            </div>

            {/* KPI & Chart Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-4 space-y-4">
                    <MetricCard
                        label="Total Massa Metana Periode"
                        value={totalMethaneKg}
                        unit="kg CH4"
                        periodContext={`${period.start} s/d ${period.end}`}
                        highlight={true}
                    />
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 text-xs text-[#C5C7D0] space-y-3">
                        <div className="font-semibold text-[#FFFFFF]">Integritas Data Emisi</div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#4ADE80] shrink-0 mt-0.5" />
                            <span>Interval waktu terbuka [start, end) mencegah duplikasi pencatatan.</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#4ADE80] shrink-0 mt-0.5" />
                            <span>Konsentrasi sniffer ppm dipisahkan dari perhitungan tonase massa.</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-[#4ADE80] shrink-0 mt-0.5" />
                            <span>Gas H2S dicatat terpisah untuk aspek keselamatan dan tidak dicampur ke metana.</span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5">
                    <h2 className="text-sm font-semibold text-[#FFFFFF] mb-1">Peringkat Emisi Metana per Aset (kg CH4)</h2>
                    <p className="text-xs text-[#8C8D99] mb-4">Total pelepasan kumulatif dalam jendela evaluasi {period.days} hari</p>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topEmitters} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <XAxis dataKey="code" stroke="#8C8D99" fontSize={11} tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-code)' }} />
                                <YAxis stroke="#8C8D99" fontSize={11} tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-metric)' }} />
                                <Tooltip
                                    cursor={{ fill: '#2B2B36', opacity: 0.3 }}
                                    contentStyle={{ backgroundColor: '#171821', borderColor: '#2B2B36', borderRadius: '10px', fontSize: '12px', color: '#FFFFFF', fontFamily: 'var(--font-metric)' }}
                                    formatter={(v: any) => [`${v} kg CH4`, 'Massa Metana']}
                                />
                                <Bar dataKey="mass" fill="#20AEF3" radius={[8, 8, 8, 8]} barSize={18} name="Massa (kg CH4)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Assets Table */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden">
                <div className="p-4 border-b border-[#2B2B36]">
                    <h2 className="font-semibold text-sm text-[#FFFFFF]">Tabel Kuantifikasi Emisi per Peralatan</h2>
                    <p className="text-xs text-[#8C8D99]">Cakupan waktu pengukuran dan catatan ketidakpastian baku</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-[#2B2B36] bg-[#171821] text-[#8C8D99] uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="py-3 px-4">Kode Aset</th>
                                <th className="py-3 px-4">Nama Aset</th>
                                <th className="py-3 px-4">Tipe</th>
                                <th className="py-3 px-4">Massa Metana</th>
                                <th className="py-3 px-4">Cakupan Waktu</th>
                                <th className="py-3 px-4">Tingkat Ketidakpastian</th>
                                <th className="py-3 px-4 text-right">Rincian</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                            {assetSummaries.map((a) => (
                                <tr key={a.asset_id} className="hover:bg-[#171821]/40 transition">
                                    <td className="py-3.5 px-4 font-code font-bold text-[#FFFFFF]">{a.code}</td>
                                    <td className="py-3.5 px-4 text-[#FFFFFF]">{a.name}</td>
                                    <td className="py-3.5 px-4 text-[#8C8D99] capitalize">{a.type}</td>
                                    <td className="py-3.5 px-4 font-metric font-semibold">
                                        {a.methane_mass_kg !== null ? (
                                            <span className="text-[#20AEF3]">{a.methane_mass_kg} kg</span>
                                        ) : (
                                            <span className="text-[#8C8D99]">Data belum cukup</span>
                                        )}
                                    </td>
                                    <td className="py-3.5 px-4 font-metric">
                                        {a.coverage_ratio > 0 ? `${Math.round(a.coverage_ratio * 100)}%` : '-'}
                                    </td>
                                    <td className="py-3.5 px-4 text-[#8C8D99]">{a.uncertainty}</td>
                                    <td className="py-3.5 px-4 text-right">
                                        <Link
                                            href={`/dashboard/assets/${a.asset_id}`}
                                            className="inline-flex items-center gap-1 font-semibold text-[#A9DFD8] hover:underline"
                                        >
                                            <span>Lihat</span>
                                            <ArrowUpRight className="h-3 w-3" />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </NasirDashboardLayout>
    );
}
