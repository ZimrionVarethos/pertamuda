import React from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { StatusBadge, getTierRowClass, getTierScoreTextColor, TierRevealLabel } from '@/components/nasir/status-badge';
import { MetricCard } from '@/components/nasir/metric-card';
import { Link } from '@inertiajs/react';
import { ShieldAlert, ArrowUpRight, Gauge, Activity, Flame, Info } from 'lucide-react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface RiskIndexProps {
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
    tierCounts: Record<string, number>;
    rankedAssets: Array<{
        id: number;
        code: string;
        name: string;
        type: string;
        composite_score: number | null;
        corrosion_score: number | null;
        leak_score: number | null;
        emission_signal_score: number | null;
        tier: string;
        explanation?: string;
        evaluated_at?: string;
    }>;
}

export default function RiskIndex({ facility, method, tierCounts, rankedAssets }: RiskIndexProps) {
    const tierData = [
        { name: 'Rendah', count: tierCounts['Rendah'] || 0, color: '#4ADE80' },
        { name: 'Sedang', count: tierCounts['Sedang'] || 0, color: '#FEB95A' },
        { name: 'Tinggi', count: tierCounts['Tinggi'] || 0, color: '#FB7185' },
        { name: 'Kritis', count: tierCounts['Kritis'] || 0, color: '#E11D48' },
        { name: 'Belum cukup', count: tierCounts['Data belum cukup'] || 0, color: '#8C8D99' },
    ];

    const topRankedForChart = rankedAssets
        .filter((a) => a.composite_score !== null)
        .slice(0, 8)
        .map((a) => ({
            code: a.code,
            score: a.composite_score,
            tier: a.tier,
        }));

    return (
        <NasirDashboardLayout
            title="Analisis Risiko Fasilitas"
            breadcrumbs={[{ label: 'Analisis Risiko' }]}
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                        Analisis Triase Risiko Integritas Aset
                    </h1>
                    <p className="text-xs text-[#8C8D99] mt-1">
                        Metode evaluasi deterministik berbasis aturan demonstrasi untuk {facility.name}.
                    </p>
                </div>

                <div className="rounded-lg border border-[#2B2B36] bg-[#21222D] px-3.5 py-1.5 text-xs text-[#8C8D99]">
                    Versi Metode: <span className="font-code text-[#A9DFD8] font-semibold">{method?.version ?? 'v1.0-demo'}</span>
                </div>
            </div>

            {/* Method Box & Formula Information */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FEB95A] uppercase tracking-wider mb-2">
                    <Info className="h-4 w-4" />
                    <span>Metode Demonstrasi Berbasis Aturan (Bukan Model AI/Blackbox)</span>
                </div>
                <p className="text-xs text-[#C5C7D0] leading-relaxed mb-3">
                    Skor komposit dihitung deterministik: <code className="text-[#A9DFD8] bg-[#171821] px-1.5 py-0.5 rounded font-code">0.35 × Korosi + 0.40 × Kebocoran + 0.25 × Sinyal Emisi</code>. Jika ada masukan wajib yang belum tersedia atau kadaluarsa (&gt;24 jam), sistem mempertahankan label <strong>Data belum cukup</strong>.
                </p>
                <div className="text-[11px] text-[#8C8D99]">
                    Rujukan asal: {method?.provenance ?? 'Handbook Opsi C Sintetis'}
                </div>
            </div>

            {/* Charts Row (8 + 4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* Ranked Bar Chart (8 cols) */}
                <div className="lg:col-span-8 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5">
                    <h2 className="text-sm font-semibold text-[#FFFFFF] mb-1">Peringkat Skor Risiko Tertinggi</h2>
                    <p className="text-xs text-[#8C8D99] mb-4">Aset dengan skor mendekati ambang batas kritis (skala 0 sampai 100)</p>

                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={topRankedForChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <XAxis dataKey="code" stroke="#8C8D99" fontSize={11} tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-code)' }} />
                                <YAxis stroke="#8C8D99" fontSize={11} tickLine={false} axisLine={false} domain={[0, 100]} style={{ fontFamily: 'var(--font-metric)' }} />
                                <Tooltip
                                    cursor={{ fill: '#2B2B36', opacity: 0.3 }}
                                    contentStyle={{ backgroundColor: '#171821', borderColor: '#2B2B36', borderRadius: '10px', fontSize: '12px', color: '#FFFFFF', fontFamily: 'var(--font-metric)' }}
                                    formatter={(v: any) => [`${v} / 100`, 'Skor Risiko']}
                                />
                                <Bar dataKey="score" radius={[8, 8, 8, 8]} barSize={18}>
                                    {topRankedForChart.map((entry, index) => {
                                        const color = entry.score! >= 75 ? '#FB7185' : entry.score! >= 50 ? '#FEB95A' : entry.score! >= 25 ? '#20AEF3' : '#4ADE80';
                                        return <Cell key={`cell-${index}`} fill={color} />;
                                    })}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Tier Distribution (4 cols) */}
                <div className="lg:col-span-4 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 flex flex-col justify-between">
                    <div>
                        <h2 className="text-sm font-semibold text-[#FFFFFF] mb-1">Distribusi Tier Risiko</h2>
                        <p className="text-xs text-[#8C8D99] mb-4">Klasifikasi seluruh peralatan fasilitas</p>

                        <div className="space-y-2.5">
                            {tierData.map((t) => (
                                <div
                                    key={t.name}
                                    className={`flex items-center justify-between p-2.5 rounded-lg border border-[#2B2B36] bg-[#171821] overflow-hidden ${getTierRowClass(t.name)} cursor-default`}
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: t.color }}></span>
                                        <span className="text-xs text-[#FFFFFF] font-medium">{t.name}</span>
                                    </div>
                                    <span className="text-xs font-metric font-bold text-[#FFFFFF]">{t.count} unit</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#2B2B36] text-[11px] text-[#8C8D99]">
                        Total Aset Terhitung: <span className="font-metric text-[#A9DFD8] font-semibold">{rankedAssets.length}</span>
                    </div>
                </div>
            </div>

            {/* Ranked Assets Table */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden">
                <div className="p-4 border-b border-[#2B2B36]">
                    <h2 className="font-semibold text-sm text-[#FFFFFF]">Tabel Rincian Faktor Triase per Aset</h2>
                    <p className="text-xs text-[#8C8D99]">Transparansi lengkap subskor dan penjelasan dasar pembentukan skor</p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-[#2B2B36] bg-[#171821] text-[#8C8D99] uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="py-3 px-4 min-w-[150px]">Kode Aset</th>
                                <th className="py-3 px-4">Nama</th>
                                <th className="py-3 px-4">Subskor Korosi</th>
                                <th className="py-3 px-4">Subskor Tekanan</th>
                                <th className="py-3 px-4">Subskor Metana</th>
                                <th className="py-3 px-4">Skor Komposit</th>
                                <th className="py-3 px-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                            {rankedAssets.map((a) => (
                                <tr key={a.id} className={getTierRowClass(a.tier)}>
                                    <td className="py-3.5 px-4 font-code font-bold text-[#FFFFFF] whitespace-nowrap">
                                        <TierRevealLabel tier={a.tier} />
                                        <span>{a.code}</span>
                                    </td>
                                    <td className="py-3.5 px-4 text-[#FFFFFF] font-medium">{a.name}</td>
                                    <td className="py-3.5 px-4 font-metric">{a.corrosion_score !== null ? `${a.corrosion_score}/100` : '-'}</td>
                                    <td className="py-3.5 px-4 font-metric">{a.leak_score !== null ? `${a.leak_score}/100` : '-'}</td>
                                    <td className="py-3.5 px-4 font-metric">{a.emission_signal_score !== null ? `${a.emission_signal_score}/100` : '-'}</td>
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
                                            <span>Buka</span>
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
