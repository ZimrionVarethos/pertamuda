import React, { useState, Suspense, lazy } from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { StatusBadge } from '@/components/nasir/status-badge';
import { MetricCard } from '@/components/nasir/metric-card';
import { useForm } from '@inertiajs/react';
import {
    Activity,
    Wrench,
    Gauge,
    Flame,
    X
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine
} from 'recharts';
import { SEGMENTS, SegmentInfo } from '@/scenes/asset-inspector-data';

const AssetInspectorScene = lazy(() => import('@/scenes/asset-inspector-scene'));

interface AssetShowProps {
    asset: {
        id: number;
        code: string;
        name: string;
        type: string;
        demo_baseline_pressure_bar: number | null;
        metadata?: any;
    };
    facility: {
        id: number;
        code: string;
        name: string;
    };
    assessment: {
        composite_score: number | null;
        corrosion_score: number | null;
        leak_score: number | null;
        emission_signal_score: number | null;
        tier: string;
        explanation: string;
        evaluated_at: string;
        input_refs?: any;
    } | null;
    sensorHistory: {
        pressure: Array<{ time: string; value: number; baseline: number }>;
        methane: Array<{ time: string; value: number }>;
        wallLoss: Array<{ time: string; value: number }>;
    };
    tasks: Array<{
        id: number;
        title: string;
        status: string;
        priority: string;
        due_at?: string;
        assignee_name: string;
        notes?: string;
    }>;
    recentObservations: Array<{
        id: number;
        parameter: string;
        value: number;
        unit: string;
        observed_at: string;
        quality: string;
        source_ref?: string;
    }>;
}

export default function AssetShow({
    asset,
    facility,
    assessment,
    sensorHistory,
    tasks,
    recentObservations,
}: AssetShowProps) {
    const [activeTab, setActiveTab] = useState<'ringkasan' | 'pengukuran' | 'riwayat'>('ringkasan');
    const [viewMode, setViewMode] = useState<'2D' | '3D'>('2D');
    const [selectedSegment, setSelectedSegment] = useState<SegmentInfo>(SEGMENTS[0]);
    const [showTaskModal, setShowTaskModal] = useState(false);

    const { data: taskData, setData: setTaskData, post: postTask, processing: taskProcessing, reset: resetTask } = useForm({
        asset_id: asset.id,
        title: `Pemeriksaan Integritas ${asset.code} (${asset.name})`,
        priority: 'high',
        notes: '',
    });

    const handleCreateTaskSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postTask('/dashboard/maintenance', {
            onSuccess: () => {
                setShowTaskModal(false);
                resetTask();
            },
        });
    };

    return (
        <NasirDashboardLayout
            title={`Inspeksi Aset ${asset.code}`}
            breadcrumbs={[
                { label: 'Aset Fasilitas', href: '/dashboard/assets' },
                { label: asset.code },
            ]}
        >
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6 border-b border-[#2B2B36] pb-5">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF] font-code">
                            {asset.code}
                        </h1>
                        <span className="text-lg text-[#8C8D99]">· {asset.name}</span>
                        <StatusBadge tier={assessment?.tier} size="md" />
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#8C8D99] mt-2">
                        <span>Fasilitas: {facility.name} ({facility.code})</span>
                        <span>•</span>
                        <span className="capitalize">Tipe: {asset.type}</span>
                        <span>•</span>
                        <span>Baseline: {asset.demo_baseline_pressure_bar ? `${asset.demo_baseline_pressure_bar} bar` : 'Tidak diset'}</span>
                        <span>•</span>
                        <span>Evaluasi Terakhir: {assessment?.evaluated_at ?? 'Belum dievaluasi'}</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => setShowTaskModal(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-bold text-[#171821] hover:bg-[#96d2cb] transition shadow-sm"
                    >
                        <Wrench className="h-4 w-4" />
                        <span>Buat Tugas Inspeksi</span>
                    </button>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-[#2B2B36] mb-6 text-xs font-medium">
                <button
                    type="button"
                    onClick={() => setActiveTab('ringkasan')}
                    className={`pb-3 px-3 border-b-2 transition ${
                        activeTab === 'ringkasan'
                            ? 'border-[#A9DFD8] text-[#A9DFD8] font-semibold'
                            : 'border-transparent text-[#8C8D99] hover:text-[#FFFFFF]'
                    }`}
                >
                    Ringkasan dan Skema
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('pengukuran')}
                    className={`pb-3 px-3 border-b-2 transition ${
                        activeTab === 'pengukuran'
                            ? 'border-[#A9DFD8] text-[#A9DFD8] font-semibold'
                            : 'border-transparent text-[#8C8D99] hover:text-[#FFFFFF]'
                    }`}
                >
                    Grafik Pengukuran (7 Hari)
                </button>
                <button
                    type="button"
                    onClick={() => setActiveTab('riwayat')}
                    className={`pb-3 px-3 border-b-2 transition ${
                        activeTab === 'riwayat'
                            ? 'border-[#A9DFD8] text-[#A9DFD8] font-semibold'
                            : 'border-transparent text-[#8C8D99] hover:text-[#FFFFFF]'
                    }`}
                >
                    Riwayat Observasi dan Tugas
                </button>
            </div>

            {/* TAB 1: Ringkasan dan Skema */}
            {activeTab === 'ringkasan' && (
                <div className="space-y-6">
                    {/* Scores Overview Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <MetricCard
                            label="Skor Triase Komposit"
                            value={assessment?.composite_score ?? null}
                            unit="/100"
                            periodContext="Bobot: 35% Korosi, 40% Bocor, 25% Emisi"
                            highlight={true}
                            helperText={assessment?.tier ?? 'Data belum cukup'}
                        />
                        <MetricCard
                            label="Subskor Korosi (Wall Loss)"
                            value={assessment?.corrosion_score ?? null}
                            unit="/100"
                            periodContext="Normalisasi: wall_loss / 50%"
                            icon={Gauge}
                        />
                        <MetricCard
                            label="Subskor Deviasi Tekanan"
                            value={assessment?.leak_score ?? null}
                            unit="/100"
                            periodContext="Normalisasi: deviasi / 20%"
                            icon={Activity}
                        />
                        <MetricCard
                            label="Subskor Sinyal Metana"
                            value={assessment?.emission_signal_score ?? null}
                            unit="/100"
                            periodContext="Konsentrasi sniffer ppm"
                            icon={Flame}
                        />
                    </div>

                    {/* Schematic / 3D Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Schematic View Area (8 cols) */}
                        <div className="lg:col-span-8 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-sm font-semibold text-[#FFFFFF]">
                                            Visualisasi Komponen Aset
                                        </h2>
                                        <span className="rounded bg-[#171821] border border-[#2B2B36] px-2 py-0.5 text-[10px] text-[#8C8D99]">
                                            Skema ilustratif
                                        </span>
                                    </div>
                                    <p className="text-xs text-[#8C8D99] mt-0.5">
                                        Pilih segmen untuk memeriksa kondisi spesifik perpipaan dan katup
                                    </p>
                                </div>

                                {/* Toggle 2D / 3D */}
                                <div className="inline-flex rounded-lg border border-[#2B2B36] bg-[#171821] p-0.5 text-xs">
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('2D')}
                                        className={`px-3 py-1 rounded-md font-medium transition ${
                                            viewMode === '2D' ? 'bg-[#A9DFD8] text-[#171821] font-semibold' : 'text-[#8C8D99] hover:text-[#FFFFFF]'
                                        }`}
                                    >
                                        Skema 2D
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setViewMode('3D')}
                                        className={`px-3 py-1 rounded-md font-medium transition ${
                                            viewMode === '3D' ? 'bg-[#A9DFD8] text-[#171821] font-semibold' : 'text-[#8C8D99] hover:text-[#FFFFFF]'
                                        }`}
                                    >
                                        Inspeksi 3D
                                    </button>
                                </div>
                            </div>

                            {viewMode === '2D' ? (
                                <div className="relative w-full h-[360px] rounded-xl border border-[#2B2B36] bg-[#171821] p-6 flex flex-col justify-center">
                                    {/* SVG 2D Schematic */}
                                    <svg viewBox="0 0 600 240" className="w-full h-full">
                                        {/* Inlet Flange */}
                                        <rect
                                            x="40" y="90" width="30" height="60" rx="4"
                                            fill={selectedSegment.id === 'seg-inlet-flange' ? '#A9DFD8' : '#F87171'}
                                            className="cursor-pointer transition hover:opacity-80"
                                            onClick={() => setSelectedSegment(SEGMENTS[0])}
                                        />
                                        <text x="55" y="80" textAnchor="middle" fill="#8C8D99" fontSize="10">Inlet Flange</text>

                                        {/* Inlet Pipe */}
                                        <rect x="70" y="105" width="80" height="30" fill="#2B2B36" />

                                        {/* Vessel Body Shell */}
                                        <rect
                                            x="150" y="60" width="260" height="120" rx="20"
                                            fill={selectedSegment.id === 'seg-vessel-shell' ? '#A9DFD8' : '#21222D'}
                                            stroke="#2B2B36" strokeWidth="2"
                                            className="cursor-pointer transition hover:opacity-80"
                                            onClick={() => setSelectedSegment(SEGMENTS[1])}
                                        />
                                        <text x="280" y="125" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                                            Separator Shell (Zone A)
                                        </text>

                                        {/* Emergency Relief Valve */}
                                        <rect
                                            x="260" y="20" width="40" height="40" rx="4"
                                            fill={selectedSegment.id === 'seg-control-valve' ? '#A9DFD8' : '#FB7185'}
                                            className="cursor-pointer transition hover:opacity-80"
                                            onClick={() => setSelectedSegment(SEGMENTS[2])}
                                        />
                                        <text x="280" y="14" textAnchor="middle" fill="#FB7185" fontSize="10" fontWeight="bold">Katup EV-01</text>

                                        {/* Outlet Nozzle & Header */}
                                        <rect x="410" y="105" width="80" height="30" fill="#2B2B36" />
                                        <rect
                                            x="490" y="90" width="30" height="60" rx="4"
                                            fill={selectedSegment.id === 'seg-outlet-pipe' ? '#A9DFD8' : '#4ADE80'}
                                            className="cursor-pointer transition hover:opacity-80"
                                            onClick={() => setSelectedSegment(SEGMENTS[3])}
                                        />
                                        <text x="505" y="80" textAnchor="middle" fill="#8C8D99" fontSize="10">Gas Outlet</text>
                                    </svg>
                                    <div className="text-center text-[11px] text-[#8C8D99] mt-2">
                                        Klik segmen pada skema 2D untuk menyorot informasi komponen teknis
                                    </div>
                                </div>
                            ) : (
                                <Suspense
                                    fallback={
                                        <div className="w-full h-[360px] rounded-xl border border-[#2B2B36] bg-[#171821] flex items-center justify-center text-xs text-[#8C8D99]">
                                            Memuat tampilan 3D...
                                        </div>
                                    }
                                >
                                    <AssetInspectorScene
                                        activeSegmentId={selectedSegment.id}
                                        onSelectSegment={(seg) => setSelectedSegment(seg)}
                                    />
                                </Suspense>
                            )}

                            {/* HTML List of Segments */}
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {SEGMENTS.map((seg) => (
                                    <button
                                        key={seg.id}
                                        type="button"
                                        onClick={() => setSelectedSegment(seg)}
                                        className={`p-2 rounded-lg border text-left text-xs transition ${
                                            selectedSegment.id === seg.id
                                                ? 'border-[#A9DFD8] bg-[#A9DFD8]/10 text-[#FFFFFF]'
                                                : 'border-[#2B2B36] bg-[#171821] text-[#8C8D99] hover:text-[#FFFFFF]'
                                        }`}
                                    >
                                        <div className="font-semibold truncate">{seg.name}</div>
                                        <div className="text-[10px] text-[#8C8D99] mt-0.5 truncate">{seg.type}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Segment Detail Panel (4 cols) */}
                        <div className="lg:col-span-4 rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 flex flex-col justify-between shadow-sm">
                            <div>
                                <div className="mb-2">
                                    <h3 className="font-bold text-sm text-[#FFFFFF]">{selectedSegment.name}</h3>
                                </div>
                                <span className="text-xs text-[#8C8D99] block mb-4">{selectedSegment.type}</span>

                                <div className="space-y-3 text-xs">
                                    <div className="p-3 rounded-lg border border-[#2B2B36] bg-[#171821]">
                                        <span className="text-[11px] text-[#8C8D99] block">Status Korosi Dinding Pipa:</span>
                                        <span className="font-semibold text-[#FFFFFF] mt-0.5 block">{selectedSegment.corrosionRisk}</span>
                                        <span className="text-[11px] text-[#8C8D99] mt-1 block">Ketebalan: {selectedSegment.wallThickness}</span>
                                    </div>

                                    <div className="p-3 rounded-lg border border-[#2B2B36] bg-[#171821]">
                                        <span className="text-[11px] text-[#8C8D99] block">Sinyal Tekanan dan Kebocoran:</span>
                                        <span className="font-semibold text-[#FFFFFF] mt-0.5 block">{selectedSegment.leakRisk}</span>
                                    </div>

                                    <div className="p-3 rounded-lg border border-[#2B2B36] bg-[#171821]">
                                        <span className="text-[11px] text-[#8C8D99] block">Deskripsi Operasional:</span>
                                        <p className="text-xs text-[#C5C7D0] mt-1 leading-relaxed">
                                            {selectedSegment.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-[#2B2B36]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setTaskData('title', `Pemeriksaan Segmen ${selectedSegment.name}`);
                                        setShowTaskModal(true);
                                    }}
                                    className="w-full py-2 rounded-lg border border-[#A9DFD8] text-[#A9DFD8] text-xs font-semibold hover:bg-[#A9DFD8]/10 transition"
                                >
                                    Jadwalkan Perbaikan Segmen Ini
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 2: Pengukuran Sensor 7 Hari */}
            {activeTab === 'pengukuran' && (
                <div className="space-y-6">
                    {/* Pressure Chart */}
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-semibold text-[#FFFFFF]">Grafik Tekanan Operasional (bar)</h3>
                                <p className="text-xs text-[#8C8D99]">Baseline fasilitas: {asset.demo_baseline_pressure_bar ?? '-'} bar</p>
                            </div>
                        </div>
                        <div className="h-56 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sensorHistory.pressure} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="pressureGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#20AEF3" stopOpacity={0.35} />
                                            <stop offset="95%" stopColor="#20AEF3" stopOpacity={0.0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" stroke="#8C8D99" fontSize={11} tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-metric)' }} />
                                    <YAxis stroke="#8C8D99" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} style={{ fontFamily: 'var(--font-metric)' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#171821', borderColor: '#2B2B36', borderRadius: '10px', fontSize: '12px', color: '#FFFFFF', fontFamily: 'var(--font-metric)' }}
                                    />
                                    {asset.demo_baseline_pressure_bar && (
                                        <ReferenceLine y={asset.demo_baseline_pressure_bar} stroke="#A9DFD8" strokeDasharray="3 3" label="Baseline" />
                                    )}
                                    <Area type="monotone" dataKey="value" stroke="#20AEF3" strokeWidth={2.5} fillOpacity={1} fill="url(#pressureGrad)" dot={false} activeDot={{ r: 5, fill: '#20AEF3', stroke: '#171821', strokeWidth: 2 }} name="Tekanan (bar)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Methane Concentration Chart */}
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-semibold text-[#FFFFFF]">Konsentrasi Gas Metana Sniffer (ppm)</h3>
                                <p className="text-xs text-[#8C8D99]">Sinyal deteksi kebocoran lokal di sekitar flens dan katup</p>
                            </div>
                        </div>
                        <div className="h-56 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={sensorHistory.methane} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="snifferGrad" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#A9DFD8" stopOpacity={0.35} />
                                            <stop offset="95%" stopColor="#A9DFD8" stopOpacity={0.0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="time" stroke="#8C8D99" fontSize={11} tickLine={false} axisLine={false} style={{ fontFamily: 'var(--font-metric)' }} />
                                    <YAxis stroke="#8C8D99" fontSize={11} tickLine={false} axisLine={false} domain={['auto', 'auto']} style={{ fontFamily: 'var(--font-metric)' }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#171821', borderColor: '#2B2B36', borderRadius: '10px', fontSize: '12px', color: '#FFFFFF', fontFamily: 'var(--font-metric)' }}
                                    />
                                    <Area type="monotone" dataKey="value" stroke="#A9DFD8" strokeWidth={2.5} fillOpacity={1} fill="url(#snifferGrad)" dot={false} activeDot={{ r: 5, fill: '#A9DFD8', stroke: '#171821', strokeWidth: 2 }} name="Metana (ppm)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* TAB 3: Riwayat Observasi dan Tugas */}
            {activeTab === 'riwayat' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Maintenance Tasks */}
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-[#FFFFFF] mb-4">Tugas Pemeliharaan Aset Ini</h3>
                        <div className="space-y-3">
                            {tasks.length > 0 ? (
                                tasks.map((t) => (
                                    <div key={t.id} className="p-3.5 rounded-lg border border-[#2B2B36] bg-[#171821]/60">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="font-semibold text-xs text-[#FFFFFF]">{t.title}</span>
                                            <StatusBadge status={t.status} size="sm" />
                                        </div>
                                        <div className="text-[11px] text-[#8C8D99] flex items-center justify-between">
                                            <span>PIC: {t.assignee_name}</span>
                                            <span>Tenggat: {t.due_at ?? '-'}</span>
                                        </div>
                                        {t.notes && <p className="mt-2 text-xs text-[#C5C7D0]">{t.notes}</p>}
                                    </div>
                                ))
                            ) : (
                                <div className="text-xs text-[#8C8D99] text-center py-6">
                                    Belum ada tugas dibuat untuk aset ini.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Observations Log */}
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-5 shadow-sm">
                        <h3 className="text-sm font-semibold text-[#FFFFFF] mb-4">Log Observasi Lapangan Terbaru</h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs">
                                <thead className="border-b border-[#2B2B36] text-[#8C8D99] uppercase text-[10px]">
                                    <tr>
                                        <th className="py-2 px-3">Parameter</th>
                                        <th className="py-2 px-3">Nilai</th>
                                        <th className="py-2 px-3">Waktu</th>
                                        <th className="py-2 px-3">Sumber</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                                    {recentObservations.map((o) => (
                                        <tr key={o.id}>
                                            <td className="py-2.5 px-3 font-code">{o.parameter}</td>
                                            <td className="py-2.5 px-3 font-metric font-semibold text-[#FFFFFF]">
                                                {o.value} {o.unit}
                                            </td>
                                            <td className="py-2.5 px-3 text-[11px] text-[#8C8D99]">{o.observed_at}</td>
                                            <td className="py-2.5 px-3 text-[11px] text-[#8C8D99]">{o.source_ref ?? '-'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

            {/* Create Task Modal */}
            {showTaskModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-[#2B2B36] pb-3">
                            <h3 className="font-bold text-base text-[#FFFFFF]">Buat Tugas Pemeliharaan</h3>
                            <button
                                type="button"
                                onClick={() => setShowTaskModal(false)}
                                className="text-[#8C8D99] hover:text-[#FFFFFF]"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTaskSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Judul Tindakan</label>
                                <input
                                    type="text"
                                    value={taskData.title}
                                    onChange={(e) => setTaskData('title', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Prioritas</label>
                                <select
                                    value={taskData.priority}
                                    onChange={(e) => setTaskData('priority', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                >
                                    <option value="low">Rendah</option>
                                    <option value="medium">Sedang</option>
                                    <option value="high">Tinggi</option>
                                    <option value="critical">Kritis</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1">Catatan dan Instruksi Pemeriksaan</label>
                                <textarea
                                    rows={3}
                                    value={taskData.notes}
                                    onChange={(e) => setTaskData('notes', e.target.value)}
                                    placeholder="Instruksi verifikasi lapangan atau pengetesan ketebalan dinding..."
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowTaskModal(false)}
                                    className="rounded-lg border border-[#2B2B36] px-4 py-2 text-xs font-semibold text-[#8C8D99] hover:text-[#FFFFFF]"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={taskProcessing}
                                    className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-bold text-[#171821] hover:bg-[#96d2cb] transition disabled:opacity-50"
                                >
                                    Simpan Tugas
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NasirDashboardLayout>
    );
}
