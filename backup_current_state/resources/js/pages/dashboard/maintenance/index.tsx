import React, { useState } from 'react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import { StatusBadge } from '@/components/nasir/status-badge';
import { Link, useForm, router } from '@inertiajs/react';
import { Wrench, Plus, Filter, X, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

interface MaintenanceIndexProps {
    facility: {
        id: number;
        code: string;
        name: string;
    };
    tasks: Array<{
        id: number;
        title: string;
        asset_id: number;
        asset_code?: string;
        asset_name?: string;
        assignee_id?: number;
        assignee_name: string;
        priority: string;
        status: string;
        due_at?: string;
        notes?: string;
        created_at: string;
    }>;
    members: Array<{
        id: number;
        name: string;
        role: string;
    }>;
    assets: Array<{
        id: number;
        code: string;
        name: string;
    }>;
    filters: {
        status?: string;
        priority?: string;
    };
}

export default function MaintenanceIndex({
    facility,
    tasks,
    members,
    assets,
    filters,
}: MaintenanceIndexProps) {
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingTask, setEditingTask] = useState<typeof tasks[0] | null>(null);

    const { data: createData, setData: setCreateData, post: postCreate, processing: createProcessing, reset: resetCreate } = useForm({
        asset_id: assets[0]?.id?.toString() || '',
        title: '',
        priority: 'medium',
        assignee_id: members[0]?.id?.toString() || '',
        due_at: '',
        notes: '',
    });

    const { data: editData, setData: setEditData, patch: patchEdit, processing: editProcessing } = useForm({
        status: 'open',
        notes: '',
        assignee_id: '',
    });

    const handleFilterStatus = (status: string) => {
        router.get('/dashboard/maintenance', { ...filters, status: filters.status === status ? '' : status }, { preserveState: true });
    };

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postCreate('/dashboard/maintenance', {
            onSuccess: () => {
                setShowCreateModal(false);
                resetCreate();
            },
        });
    };

    const handleOpenEdit = (task: typeof tasks[0]) => {
        setEditingTask(task);
        setEditData({
            status: task.status,
            notes: task.notes || '',
            assignee_id: task.assignee_id ? task.assignee_id.toString() : '',
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask) return;
        patchEdit(`/dashboard/maintenance/${editingTask.id}`, {
            onSuccess: () => {
                setEditingTask(null);
            },
        });
    };

    return (
        <NasirDashboardLayout
            title="Tugas Pemeliharaan"
            breadcrumbs={[{ label: 'Pemeliharaan' }]}
        >
            {/* Header & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-[#FFFFFF]">
                        Tugas Pemeliharaan dan Pemeriksaan
                    </h1>
                    <p className="text-xs text-[#8C8D99] mt-1">
                        Tindak lanjut temuan risiko korosi dan anomali emisi pada {facility.name}.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowCreateModal(true)}
                    className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-4 py-2.5 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6] transition self-start sm:self-auto"
                >
                    <Plus className="h-4 w-4" />
                    <span>Buat Tugas Baru</span>
                </button>
            </div>

            {/* Filter Bar */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 mb-6 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[#8C8D99] flex items-center gap-1">
                        <Filter className="h-3.5 w-3.5" />
                        <span>Filter Status:</span>
                    </span>
                    {['open', 'in_progress', 'done', 'cancelled'].map((st) => (
                        <button
                            key={st}
                            type="button"
                            onClick={() => handleFilterStatus(st)}
                            className={`rounded-md px-2.5 py-1 text-[11px] font-medium border transition ${
                                filters.status === st
                                    ? 'border-[#A9DFD8] bg-[#A9DFD8]/15 text-[#A9DFD8] font-semibold'
                                    : 'border-[#2B2B36] bg-[#171821] text-[#8C8D99] hover:text-[#FFFFFF]'
                            }`}
                        >
                            {st === 'open' ? 'Terbuka' : st === 'in_progress' ? 'Sedang Berjalan' : st === 'done' ? 'Selesai' : 'Dibatalkan'}
                        </button>
                    ))}
                </div>

                <div className="text-[11px] text-[#8C8D99]">
                    Total Tugas: <span className="font-metric text-[#A9DFD8] font-semibold">{tasks.length}</span>
                </div>
            </div>

            {/* Tasks Table */}
            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="border-b border-[#2B2B36] bg-[#171821] text-[#8C8D99] uppercase text-[10px] tracking-wider">
                            <tr>
                                <th className="py-3 px-4">Tugas</th>
                                <th className="py-3 px-4">Aset Terkait</th>
                                <th className="py-3 px-4">Prioritas</th>
                                <th className="py-3 px-4">Penanggung Jawab</th>
                                <th className="py-3 px-4">Tenggat</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-4 text-right">Tindakan</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#2B2B36]/60 text-[#C5C7D0]">
                            {tasks.length > 0 ? (
                                tasks.map((t) => (
                                    <tr key={t.id} className="hover:bg-[#171821]/40 transition">
                                        <td className="py-3.5 px-4">
                                            <div className="font-semibold text-[#FFFFFF]">{t.title}</div>
                                            {t.notes && <p className="text-[11px] text-[#8C8D99] mt-0.5 line-clamp-1">{t.notes}</p>}
                                        </td>
                                        <td className="py-3.5 px-4 font-code">
                                            <Link href={`/dashboard/assets/${t.asset_id}`} className="text-[#A9DFD8] hover:underline">
                                                {t.asset_code}
                                            </Link>
                                        </td>
                                        <td className="py-3.5 px-4 capitalize">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                t.priority === 'critical' ? 'bg-[#E11D48]/15 text-[#FB7185] border border-[#E11D48]/30' :
                                                t.priority === 'high' ? 'bg-[#FB7185]/15 text-[#FB7185] border border-[#FB7185]/30' :
                                                t.priority === 'medium' ? 'bg-[#FEB95A]/15 text-[#FEB95A] border border-[#FEB95A]/30' :
                                                'bg-[#171821] text-[#8C8D99] border border-[#2B2B36]'
                                            }`}>
                                                {t.priority}
                                            </span>
                                        </td>
                                        <td className="py-3.5 px-4">{t.assignee_name}</td>
                                        <td className="py-3.5 px-4 font-metric">{t.due_at ?? '-'}</td>
                                        <td className="py-3.5 px-4">
                                            <StatusBadge status={t.status} size="sm" />
                                        </td>
                                        <td className="py-3.5 px-4 text-right">
                                            <button
                                                type="button"
                                                onClick={() => handleOpenEdit(t)}
                                                className="text-xs font-semibold text-[#A9DFD8] hover:underline"
                                            >
                                                Ubah Status
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="py-8 text-center text-[#8C8D99]">
                                        Tidak ada tugas pemeliharaan sesuai kriteria filter.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Buat Tugas */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-[#2B2B36] pb-3">
                            <h3 className="font-bold text-base text-[#FFFFFF]">Buat Tugas Pemeliharaan Baru</h3>
                            <button type="button" onClick={() => setShowCreateModal(false)} className="text-[#8C8D99] hover:text-[#FFFFFF]">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleCreateSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Aset Terkait</label>
                                <select
                                    value={createData.asset_id}
                                    onChange={(e) => setCreateData('asset_id', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                >
                                    {assets.map((a) => (
                                        <option key={a.id} value={a.id}>{a.code} · {a.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Judul Tindakan</label>
                                <input
                                    type="text"
                                    value={createData.title}
                                    onChange={(e) => setCreateData('title', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-medium text-[#8C8D99] mb-1">Prioritas</label>
                                    <select
                                        value={createData.priority}
                                        onChange={(e) => setCreateData('priority', e.target.value)}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    >
                                        <option value="low">Rendah</option>
                                        <option value="medium">Sedang</option>
                                        <option value="high">Tinggi</option>
                                        <option value="critical">Kritis</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-[#8C8D99] mb-1">Tenggat Waktu</label>
                                    <input
                                        type="date"
                                        value={createData.due_at}
                                        onChange={(e) => setCreateData('due_at', e.target.value)}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Penanggung Jawab (PIC)</label>
                                <select
                                    value={createData.assignee_id}
                                    onChange={(e) => setCreateData('assignee_id', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                >
                                    {members.map((m) => (
                                        <option key={m.id} value={m.id}>{m.name} ({m.role})</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Catatan dan Petunjuk Lapangan</label>
                                <textarea
                                    rows={3}
                                    value={createData.notes}
                                    onChange={(e) => setCreateData('notes', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                ></textarea>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowCreateModal(false)} className="rounded-lg border border-[#2B2B36] px-4 py-2 text-xs font-semibold text-[#8C8D99] hover:text-[#FFFFFF]">
                                    Batal
                                </button>
                                <button type="submit" disabled={createProcessing} className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6]">
                                    Simpan Tugas
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal Ubah Status Tugas */}
            {editingTask && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
                    <div className="w-full max-w-md rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 shadow-2xl">
                        <div className="flex items-center justify-between mb-4 border-b border-[#2B2B36] pb-3">
                            <h3 className="font-bold text-base text-[#FFFFFF]">Pembaruan Status Tugas #{editingTask.id}</h3>
                            <button type="button" onClick={() => setEditingTask(null)} className="text-[#8C8D99] hover:text-[#FFFFFF]">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Status Progres</label>
                                <select
                                    value={editData.status}
                                    onChange={(e) => setEditData('status', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                >
                                    <option value="open">Terbuka (Belum Dimulai)</option>
                                    <option value="in_progress">Sedang Berjalan</option>
                                    <option value="done">Selesai Dikerjakan</option>
                                    <option value="cancelled">Dibatalkan</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#8C8D99] mb-1">Catatan Hasil Pemeriksaan Lapangan</label>
                                <textarea
                                    rows={3}
                                    value={editData.notes}
                                    onChange={(e) => setEditData('notes', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                ></textarea>
                            </div>

                            <p className="text-[11px] text-[#8C8D99]">
                                Catatan: Menyelesaikan tugas mencatat rekam jejak teknisi, namun skor risiko hanya diperbarui bila data observasi baru diimpor.
                            </p>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setEditingTask(null)} className="rounded-lg border border-[#2B2B36] px-4 py-2 text-xs font-semibold text-[#8C8D99] hover:text-[#FFFFFF]">
                                    Batal
                                </button>
                                <button type="submit" disabled={editProcessing} className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6]">
                                    Perbarui Status
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </NasirDashboardLayout>
    );
}
