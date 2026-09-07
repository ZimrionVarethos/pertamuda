import React from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { MetricCard } from '@/components/nasir/metric-card';
import { getTierRowClass, getTierScoreTextColor, TierRevealLabel, getStatusRowClass, StatusRevealLabel } from '@/components/nasir/status-badge';
import { Link, router } from '@inertiajs/react';
import {
    Boxes,
    ShieldAlert,
    Wind,
    FileText,
    ArrowUpRight,
    Activity,
    Clock,
    AlertTriangle
} from 'lucide-react';
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

interface OverviewProps {
    facility: {
        id: number;
        code: string;
        name: string;
        sector: string;
    };
    periodDays: number;
    kpi: {
        total_assets: number;
        high_risk_assets: number;
        methane_mass_kg: number | null;
        pending_reports: number;
    };
    tierDistribution: Record<string, number>;
    priorityAssets: Array<{
        id: number;
        code: string;
        name: string;
        type: string;
        composite_score: number | null;
        corrosion_score: number | null;
        leak_score: number | null;
        emission_signal_score: number | null;
        tier: string;
        updated_at?: string;
    }>;
    recentTasks: Array<{
        id: number;
        title: string;
        asset_code?: string;
        priority: string;
        status: string;
        assignee_name: string;
        due_at?: string;
    }>;
    recentReports: Array<{
        id: number;
        type: string;
        period: string;
        status: string;
        version: number;
        completeness_pct: number;
    }>;
    timelineTrend?: Array<{
        date: string;
        day: string;
        rate: number;
    }>;
    subMetrics?: {
        corrosion: Array<{ code: string; label: string; value: number }>;
        leak: Array<{ code: string; label: string; value: number }>;
        emission: Array<{ code: string; label: string; value: number }>;
    };
}

export default function Overview({
    facility,
    periodDays,
    kpi,
    tierDistribution,
    priorityAssets,
    recentTasks,
    recentReports,
    timelineTrend,
    subMetrics,
}: OverviewProps) {
    const [chartMode, setChartMode] = React.useState<'area' | 'bar'>('area');

    const chartData = [
        { name: 'Rendah', count: tierDistribution['Rendah'] || 0, color: '#4ADE80' },
        { name: 'Sedang', count: tierDistribution['Sedang'] || 0, color: '#FEB95A' },
        { name: 'Tinggi', count: tierDistribution['Tinggi'] || 0, color: '#F87171' },
        { name: 'Kritis', count: tierDistribution['Kritis'] || 0, color: '#FB7185' },
        { name: 'Belum cukup', count: tierDistribution['Data belum cukup'] || 0, color: '#8C8D99' },
    ];

    const effectiveTimelineTrend = (timelineTrend && timelineTrend.length > 0)
        ? timelineTrend
        : [
            { date: '01 Sep', day: 'M', rate: 1.2 },
            { date: '02 Sep', day: 'T', rate: 1.6 },
            { date: '03 Sep', day: 'W', rate: 1.1 },
            { date: '04 Sep', day: 'T', rate: 2.4 },
            { date: '05 Sep', day: 'F', rate: 1.9 },
            { date: '06 Sep', day: 'S', rate: 2.8 },
            { date: '07 Sep', day: 'S', rate: 1.5 },
        ];

    const corrosionData = (subMetrics?.corrosion && subMetrics.corrosion.length > 0)
        ? subMetrics.corrosion
        : priorityAssets.slice(0, 6).map(a => ({
            code: a.code,
            label: a.code,
            value: a.corrosion_score ?? 0,
        }));

    const leakData = (subMetrics?.leak && subMetrics.leak.length > 0)
        ? subMetrics.leak
        : priorityAssets.slice(0, 6).map(a => ({
            code: a.code,
            label: a.code,
            value: a.leak_score ?? 0,
        }));

    const emissionData = (subMetrics?.emission && subMetrics.emission.length > 0)
        ? subMetrics.emission
        : priorityAssets.slice(0, 6).map(a => ({
            code: a.code,
            label: a.code,
            value: a.emission_signal_score ?? 0,
        }));

    const handlePeriodChange = (days: number) => {
        router.get('/dashboard', { days }, { preserveState: true });
    };

    return (
        <NasirDashboardLayout title="Ringkasan Operasional">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                            Ringkasan Fasilitas
                        </h1>
                        <span className="rounded-lg bg-[#21222D] border border-[#2B2B36] px-2.5 py-0.5 text-[11px] font-medium text-[#8C8D99]">
                            {facility.code} · {facility.name}
                        </span>
                    </div>
                    <p className="text-xs text-[#8C8D99] mt-1">
                        Sektor Minyak dan Gas Bumi. Evaluasi triase risiko peralatan dan pemantauan draf emisi.
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-[#8C8D99]">Jendela evaluasi:</span>
                    <div className="inline-flex rounded-lg border border-[#2B2B36] bg-[#21222D] p-0.5 text-xs">
                        <button
                            type="button"
                            onClick={() => handlePeriodChange(7)}
                            className={`px-2.5 py-1 rounded-md font-medium transition ${
                                periodDays === 7 ? 'bg-[#A9DFD8] text-[#171821] font-semibold' : 'text-[#8C8D99] hover:text-[#FFFFFF]'
                            }`}
                        >
                            7 Hari
                        </button>
                        <button
                            type="button"
                            onClick={() => handlePeriodChange(30)}
                            className={`px-2.5 py-1 rounded-md font-medium transition ${
                                periodDays === 30 ? 'bg-[#A9DFD8] text-[#171821] font-semibold' : 'text-[#8C8D99] hover:text-[#FFFFFF]'
                            }`}
                        >
                            30 Hari
                        </button>
                    </div>
                </div>
            </div>

            {/* 4 KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <MetricCard
                    label="Aset Terpantau"
                    value={kpi.total_assets}
                    unit="unit"
                    periodContext="Peralatan aktif terdaftar"
                    icon={Boxes}
                />
                <MetricCard
                    label="Aset Prioritas Tinggi"
                    value={kpi.high_risk_assets}
                    unit="unit"
                    periodContext="Tier Tinggi atau Kritis"
                    highlight={kpi.high_risk_assets > 0}
                    icon={ShieldAlert}
                />
                <MetricCard
                    label="Massa Metana Terhitung"
                    value={kpi.methane_mass_kg}
                    unit="kg CH4"
                    periodContext={`Periode ${periodDays} hari terakhir`}
                    icon={Wind}
                />
                <MetricCard
                    label="Laporan Perlu Tinjauan"
                    value={kpi.pending_reports}
                    unit="draf"
                    periodContext="Tahap penelaahan internal"
                    icon={FileText}
                />
            </div>

            {/* Row 2: Analysis (8 + 4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {/* Hero Chart (8 cols) - Flutter 'Steps Overview' Reference Style */}
                <div className="lg:col-span-8 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 flex flex-col justify-between shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-sm font-semibold text-[#FFFFFF]">
                                    {chartMode === 'area' ? 'Tren Laju Emisi Kontinu (kg/h)' : 'Distribusi Tier Risiko Aset'}
                                </h2>
                                <span className="rounded bg-[#171821] border border-[#2B2B36] px-2 py-0.5 text-[10px] font-medium text-[#A9DFD8]">
                                    {chartMode === 'area' ? 'Spline Curve' : 'Pill Bars'}
                                </span>
                            </div>
                            <p className="text-xs text-[#8C8D99] mt-0.5">
                                {chartMode === 'area'
                                    ? 'Observasi laju alir interval massa terukur & dinamika fluktuasi'
                                    : 'Evaluasi deterministik berdasarkan observasi 24 jam terakhir'}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="inline-flex rounded-lg border border-[#2B2B36] bg-[#171821] p-0.5 text-xs">
                                <button
                                    type="button"
                                    onClick={() => setChartMode('area')}
                                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                                        chartMode === 'area' ? 'bg-[#A9DFD8] text-[#171821] font-semibold' : 'text-[#8C8D99] hover:text-[#FFFFFF]'
                                    }`}
                                >
                                    Kurva Tren
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setChartMode('bar')}
                                    className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
                                        chartMode === 'bar' ? 'bg-[#A9DFD8] text-[#171821] font-semibold' : 'text-[#8C8D99] hover:text-[#FFFFFF]'
                                    }`}
                                >
                                    Distribusi
                                </button>
                            </div>
                            <Link
                                href="/dashboard/risk"
                                className="inline-flex items-center gap-1 text-xs font-medium text-[#A9DFD8] hover:underline ml-1"
                            >
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Link>
                        </div>
                    </div>

                    <div className="h-60 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            {chartMode === 'area' ? (
                                <AreaChart data={effectiveTimelineTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="flutterMintGlow" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#A9DFD8" stopOpacity={0.38} />
                                            <stop offset="95%" stopColor="#A9DFD8" stopOpacity={0.0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="date"
                                        stroke="#8C8D99"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        style={{ fontFamily: 'var(--font-metric)' }}
                                    />
                                    <YAxis
                                        stroke="#8C8D99"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        style={{ fontFamily: 'var(--font-metric)' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#171821',
                                            borderColor: '#2B2B36',
                                            borderRadius: '10px',
                                            fontSize: '12px',
                                            color: '#FFFFFF',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
                                            fontFamily: 'var(--font-metric)'
                                        }}
                                        formatter={(val: any) => [`${val} kg/h`, 'Laju Emisi']}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="rate"
                                        stroke="#A9DFD8"
                                        strokeWidth={2.5}
                                        fillOpacity={1}
                                        fill="url(#flutterMintGlow)"
                                        dot={false}
                                        activeDot={{ r: 5, fill: '#A9DFD8', stroke: '#171821', strokeWidth: 2 }}
                                    />
                                </AreaChart>
                            ) : (
                                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#8C8D99"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        style={{ fontFamily: 'var(--font-metric)' }}
                                    />
                                    <YAxis
                                        stroke="#8C8D99"
                                        fontSize={11}
                                        tickLine={false}
                                        axisLine={false}
                                        allowDecimals={false}
                                        style={{ fontFamily: 'var(--font-metric)' }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: '#2B2B36', opacity: 0.3 }}
                                        contentStyle={{
                                            backgroundColor: '#171821',
                                            borderColor: '#2B2B36',
                                            borderRadius: '10px',
                                            fontSize: '12px',
                                            color: '#FFFFFF',
                                            fontFamily: 'var(--font-metric)'
                                        }}
                                    />
                                    <Bar dataKey="count" radius={[8, 8, 8, 8]} barSize={22}>
                                        {chartData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>

                    <div className="mt-3 pt-3 border-t border-[#2B2B36] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#8C8D99]">
                        <span>
                            {chartMode === 'area'
                                ? 'Model interpolasi Monotone Cubic Spline untuk estimasi pelepasan gas'
                                : 'Skala: Rendah (<25), Sedang (25-49), Tinggi (50-74), Kritis (≥75)'}
                        </span>
                        <span className="font-metric text-[#C5C7D0]">
                            {chartMode === 'area'
                                ? `Total Periode: ${kpi.methane_mass_kg ?? 0} kg CH4`
                                : `Total: ${kpi.total_assets} Aset`}
                        </span>
                    </div>
                </div>

                {/* Reporting Status Panel (4 cols) */}
                <div className="lg:col-span-4 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 flex flex-col justify-between shadow-sm">
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-sm font-semibold text-[#FFFFFF]">Status Draf Dokumen</h2>
                            <Link
                                href="/dashboard/reports"
                                className="text-xs text-[#A9DFD8] hover:underline"
                            >
                                Kelola
                            </Link>
                        </div>
                        <p className="text-xs text-[#8C8D99] mb-4">
                            Persiapan draf pelaporan emisi mitigasi (DRAM dan LCAM)
                        </p>

                        <div className="space-y-3">
                            {recentReports.length > 0 ? (
                                recentReports.map((rep) => (
                                    <Link
                                        key={rep.id}
                                        href={`/dashboard/reports/${rep.id}`}
                                        className={`block p-3 rounded-lg border border-[#2B2B36] bg-[#171821]/60 hover:border-[#8C8D99] transition ${getStatusRowClass(rep.status)}`}
                                    >
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center font-bold text-xs text-[#FFFFFF]">
                                                <StatusRevealLabel status={rep.status} />
                                                <span>Draf {rep.type} v{rep.version}</span>
                                            </div>
                                            <ArrowUpRight className="h-3.5 w-3.5 text-[#8C8D99] shrink-0" />
                                        </div>
                                        <div className="text-[11px] text-[#8C8D99]">{rep.period}</div>
                                        <div className="mt-2 flex items-center justify-between text-[10px] text-[#C5C7D0]">
                                            <span>Kelengkapan internal:</span>
                                            <span className="font-metric font-semibold">{rep.completeness_pct}%</span>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-xs text-[#8C8D99] text-center py-6">
                                    Belum ada draf laporan dibuat.
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[#2B2B36] text-[11px] text-[#8C8D99]">
                        Setiap angka tertaut ke bukti dan rekam jejak versi statis.
                    </div>
                </div>
            </div>

            {/* Row 2.5: Trio Pill Bar Charts ("Activity / Nutrition / Hydration" reference style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Card 1: Activity / Corrosion (Amber) */}
                <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span className="text-[11px] font-semibold text-[#FEB95A] uppercase tracking-wider">Aktivitas Korosi</span>
                            <h3 className="text-xs font-medium text-[#FFFFFF] mt-0.5">Penipisan Dinding Pipa (Wall Loss)</h3>
                        </div>
                        <span className="text-xs font-metric font-bold text-[#FEB95A]">
                            {corrosionData.length > 0 ? Math.round(corrosionData.reduce((acc, c) => acc + c.value, 0) / corrosionData.length) : 0}%
                        </span>
                    </div>
                    <div className="h-20 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={corrosionData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="label" stroke="#8C8D99" fontSize={9} tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-code)' }} />
                                <Tooltip
                                    cursor={{ fill: '#2B2B36', opacity: 0.2 }}
                                    contentStyle={{ backgroundColor: '#171821', borderColor: '#2B2B36', borderRadius: '8px', fontSize: '11px', color: '#FFFFFF' }}
                                    formatter={(v: any) => [`${v}%`, 'Subskor Korosi']}
                                />
                                <Bar dataKey="value" fill="#FEB95A" radius={[6, 6, 6, 6]} barSize={10} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Card 2: Leak / Pressure Deviation (Pink) */}
                <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span className="text-[11px] font-semibold text-[#F2C8ED] uppercase tracking-wider">Deviasi Tekanan</span>
                            <h3 className="text-xs font-medium text-[#FFFFFF] mt-0.5">Indikasi Kebocoran Flensa</h3>
                        </div>
                        <span className="text-xs font-metric font-bold text-[#F2C8ED]">
                            {leakData.length > 0 ? Math.round(leakData.reduce((acc, c) => acc + c.value, 0) / leakData.length) : 0}%
                        </span>
                    </div>
                    <div className="h-20 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={leakData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="label" stroke="#8C8D99" fontSize={9} tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-code)' }} />
                                <Tooltip
                                    cursor={{ fill: '#2B2B36', opacity: 0.2 }}
                                    contentStyle={{ backgroundColor: '#171821', borderColor: '#2B2B36', borderRadius: '8px', fontSize: '11px', color: '#FFFFFF' }}
                                    formatter={(v: any) => [`${v}%`, 'Deviasi Tekanan']}
                                />
                                <Bar dataKey="value" fill="#F2C8ED" radius={[6, 6, 6, 6]} barSize={10} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Card 3: Methane Concentration / Sniffer (Sky Blue) */}
                <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 flex flex-col justify-between shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <span className="text-[11px] font-semibold text-[#20AEF3] uppercase tracking-wider">Sinyal Metana</span>
                            <h3 className="text-xs font-medium text-[#FFFFFF] mt-0.5">Deteksi Sniffer Sensor (ppm)</h3>
                        </div>
                        <span className="text-xs font-metric font-bold text-[#20AEF3]">
                            {emissionData.length > 0 ? Math.round(emissionData.reduce((acc, c) => acc + c.value, 0) / emissionData.length) : 0} ppm
                        </span>
                    </div>
                    <div className="h-20 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={emissionData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
                                <XAxis dataKey="label" stroke="#8C8D99" fontSize={9} tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-code)' }} />
                                <Tooltip
                                    cursor={{ fill: '#2B2B36', opacity: 0.2 }}
                                    contentStyle={{ backgroundColor: '#171821', borderColor: '#2B2B36', borderRadius: '8px', fontSize: '11px', color: '#FFFFFF' }}
                                    formatter={(v: any) => [`${v} ppm`, 'Konsentrasi CH4']}
                                />
                                <Bar dataKey="value" fill="#20AEF3" radius={[6, 6, 6, 6]} barSize={10} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Row 3: Operational (8 + 4 cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Priority Assets Table (8 cols) */}
                <div className="lg:col-span-8 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-sm font-semibold text-[#FFFFFF]">Aset Prioritas Pemeriksaan</h2>
                            <p className="text-xs text-[#8C8D99]">Peringkat teratas berdasarkan skor triase komposit</p>
                        </div>
                        <Link
                            href="/dashboard/assets"
                            className="inline-flex items-center gap-1 text-xs font-medium text-[#A9DFD8] hover:underline"
                        >
                            <span>Semua Aset</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead className="border-b border-[#2B2B36] text-[#8C8D99] uppercase text-[10px] tracking-wider bg-[#171821]/30">
                                <tr>
                                    <th className="py-2.5 px-3 pl-4 min-w-[140px]">Kode</th>
                                    <th className="py-2.5 px-3">Nama Aset</th>
                                    <th className="py-2.5 px-3">Tipe</th>
                                    <th className="py-2.5 px-3">Skor Triase</th>
                                    <th className="py-2.5 px-3 text-right pr-4">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                                {priorityAssets.map((asset) => (
                                    <tr key={asset.id} className={getTierRowClass(asset.tier)}>
                                        <td className="py-3 px-3 pl-4 font-code font-bold text-[#FFFFFF] whitespace-nowrap">
                                            <TierRevealLabel tier={asset.tier} />
                                            <span>{asset.code}</span>
                                        </td>
                                        <td className="py-3 px-3 text-[#FFFFFF] font-medium">{asset.name}</td>
                                        <td className="py-3 px-3 text-[#8C8D99] capitalize">{asset.type}</td>
                                        <td className="py-3 px-3 font-metric font-semibold">
                                            {asset.composite_score !== null ? (
                                                <span className={getTierScoreTextColor(asset.composite_score)}>
                                                    {asset.composite_score}/100
                                                </span>
                                            ) : (
                                                <span className="text-[#8C8D99]">Data belum cukup</span>
                                            )}
                                        </td>
                                        <td className="py-3 px-3 text-right pr-4">
                                            <Link
                                                href={`/dashboard/assets/${asset.id}`}
                                                className="inline-flex items-center gap-1 font-semibold text-[#A9DFD8] hover:underline"
                                            >
                                                <span>Detail</span>
                                                <ArrowUpRight className="h-3 w-3" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Maintenance Tasks (4 cols) */}
                <div className="lg:col-span-4 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-sm font-semibold text-[#FFFFFF]">Tugas Pemeliharaan</h2>
                            <p className="text-xs text-[#8C8D99]">Aktivitas inspeksi terkini</p>
                        </div>
                        <Link
                            href="/dashboard/maintenance"
                            className="text-xs text-[#A9DFD8] hover:underline"
                        >
                            Lihat Semua
                        </Link>
                    </div>

                    <div className="space-y-3">
                        {recentTasks.length > 0 ? (
                            recentTasks.map((t) => (
                                <div
                                    key={t.id}
                                    className={`p-3 rounded-lg border border-[#2B2B36] bg-[#171821]/60 flex flex-col gap-2 hover:border-[#8C8D99] transition ${getStatusRowClass(t.status)}`}
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex items-center font-semibold text-xs text-[#FFFFFF] leading-tight">
                                            <StatusRevealLabel status={t.status} />
                                            <span>{t.title}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px] text-[#8C8D99]">
                                        <span>Aset: <span className="font-code font-semibold text-[#FFFFFF]">{t.asset_code ?? '-'}</span></span>
                                        <span>PIC: {t.assignee_name}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-xs text-[#8C8D99] text-center py-6">
                                Belum ada tugas dibuat.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </NasirDashboardLayout>
    );
}