import React, { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { NasirDashboardLayout } from '@/layouts/nasir-dashboard-layout';
import {
    Settings,
    User,
    Building2,
    Users,
    Cpu,
    Shield,
    CheckCircle2,
    Lock,
    Save,
    Info,
    Calendar,
    Code,
    Sliders
} from 'lucide-react';

interface MemberItem {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface MethodItem {
    id: number;
    kind: string;
    version: string;
    config: Record<string, any> | null;
    provenance: string;
    created_at: string;
}

interface SettingsIndexProps {
    facility: {
        id: number;
        code: string;
        name: string;
        sector: string;
    } | null;
    organization: {
        id: number;
        name: string;
        is_demo: boolean;
        timezone: string;
    };
    members: MemberItem[];
    methods: MethodItem[];
    currentUserRole: string;
}

export default function SettingsIndex({
    facility,
    organization,
    members,
    methods,
    currentUserRole
}: SettingsIndexProps) {
    const { auth } = usePage().props as any;
    const currentUser = auth?.user;

    const [activeTab, setActiveTab] = useState<'profile' | 'org' | 'members' | 'methods'>('profile');

    const profileForm = useForm({
        name: currentUser?.name || '',
        email: currentUser?.email || '',
    });

    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        profileForm.patch('/dashboard/settings/profile', {
            preserveScroll: true,
        });
    };

    const formatRoleLabel = (role: string) => {
        switch (role.toLowerCase()) {
            case 'owner':
                return 'Owner (Pemilik Fasilitas)';
            case 'analyst':
                return 'Analyst (Analis Emisi & Risiko)';
            case 'technician':
            case 'tech':
                return 'Technician (Teknisi Lapangan)';
            case 'reviewer':
                return 'Reviewer (Peninjau Independen)';
            default:
                return role;
        }
    };

    return (
        <NasirDashboardLayout
            title="Pengaturan"
            breadcrumbs={[{ label: 'Pengaturan' }]}
        >
            <Head title="Pengaturan Sistem | NASIR" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b border-[#2B2B36] pb-6">
                    <div>
                        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#A9DFD8]">
                            <Settings className="h-4 w-4" />
                            <span>Konfigurasi & Administrasi</span>
                        </div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#FFFFFF] mt-1">
                            Pengaturan Sistem
                        </h1>
                        <p className="text-sm text-[#8C8D99] mt-1">
                            Kelola profil pengguna, identitas organisasi kerja, pembagian peran personil, dan spesifikasi metode demonstrasi.
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="rounded-lg border border-[#2B2B36] bg-[#21222D] px-3 py-2 text-xs text-[#C5C7D0]">
                            <span className="text-[#8C8D99]">Peran Anda:</span>{' '}
                            <span className="font-semibold text-[#A9DFD8] uppercase tracking-wider">{currentUserRole}</span>
                        </div>
                    </div>
                </div>

                {/* Tabs Nav */}
                <div className="flex flex-wrap gap-2 border-b border-[#2B2B36] pb-3">
                    <button
                        type="button"
                        onClick={() => setActiveTab('profile')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                            activeTab === 'profile'
                                ? 'bg-[#A9DFD8] text-[#171821]'
                                : 'text-[#8C8D99] hover:bg-[#21222D] hover:text-[#FFFFFF]'
                        }`}
                    >
                        <User className="h-4 w-4" />
                        <span>Profil Pengguna</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('org')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                            activeTab === 'org'
                                ? 'bg-[#A9DFD8] text-[#171821]'
                                : 'text-[#8C8D99] hover:bg-[#21222D] hover:text-[#FFFFFF]'
                        }`}
                    >
                        <Building2 className="h-4 w-4" />
                        <span>Organisasi & Fasilitas</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('members')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                            activeTab === 'members'
                                ? 'bg-[#A9DFD8] text-[#171821]'
                                : 'text-[#8C8D99] hover:bg-[#21222D] hover:text-[#FFFFFF]'
                        }`}
                    >
                        <Users className="h-4 w-4" />
                        <span>Anggota & Otorisasi</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab('methods')}
                        className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold transition ${
                            activeTab === 'methods'
                                ? 'bg-[#A9DFD8] text-[#171821]'
                                : 'text-[#8C8D99] hover:bg-[#21222D] hover:text-[#FFFFFF]'
                        }`}
                    >
                        <Cpu className="h-4 w-4" />
                        <span>Versi Metode Demonstrasi</span>
                    </button>
                </div>

                {/* Tab 1: Profil Pengguna */}
                {activeTab === 'profile' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 space-y-6">
                            <div>
                                <h3 className="text-base font-bold text-[#FFFFFF]">
                                    Informasi Akun
                                </h3>
                                <p className="text-xs text-[#8C8D99] mt-0.5">
                                    Perbarui nama personil dan alamat surat elektronik resmi Anda.
                                </p>
                            </div>

                            <form onSubmit={handleProfileSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-medium text-[#8C8D99] mb-1.5">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        value={profileForm.data.name}
                                        onChange={(e) => profileForm.setData('name', e.target.value)}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3.5 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                        required
                                    />
                                    {profileForm.errors.name && (
                                        <span className="text-[11px] text-[#FB7185] mt-1 block">
                                            {profileForm.errors.name}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-[#8C8D99] mb-1.5">
                                        Alamat Email Resmi
                                    </label>
                                    <input
                                        type="email"
                                        value={profileForm.data.email}
                                        onChange={(e) => profileForm.setData('email', e.target.value)}
                                        className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3.5 py-2 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                        required
                                    />
                                    {profileForm.errors.email && (
                                        <span className="text-[11px] text-[#FB7185] mt-1 block">
                                            {profileForm.errors.email}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-[#8C8D99] mb-1.5">
                                        Peran Operasional
                                    </label>
                                    <div className="rounded-lg border border-[#2B2B36] bg-[#171821] px-3.5 py-2 text-xs text-[#8C8D99] flex items-center justify-between">
                                        <span className="font-medium text-[#FFFFFF]">{formatRoleLabel(currentUserRole)}</span>
                                        <span className="text-[10px] text-[#8C8D99] uppercase tracking-wider flex items-center gap-1">
                                            <Lock className="h-3 w-3" />
                                            Dikelola Pemilik
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-2 flex justify-end">
                                    <button
                                        type="submit"
                                        disabled={profileForm.processing}
                                        className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6] transition disabled:opacity-50"
                                    >
                                        <Save className="h-4 w-4" />
                                        <span>Simpan Perubahan</span>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="space-y-6">
                            <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 space-y-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-[#A9DFD8]">
                                    Hak Akses Peran Anda
                                </h4>
                                <p className="text-xs text-[#C5C7D0]">
                                    Sebagai pengguna dengan peran <strong className="text-[#FFFFFF] uppercase">{currentUserRole}</strong>, seluruh tindakan Anda dicatat dalam jejak audit kepatuhan.
                                </p>
                                <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3 text-xs text-[#8C8D99] space-y-2">
                                    <div className="flex items-center gap-2 text-[#4ADE80]">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span>Akses modul operasional aktif</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[#4ADE80]">
                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                        <span>Pemisahan tugas verifikasi ketat</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 2: Organisasi & Fasilitas */}
                {activeTab === 'org' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 space-y-4">
                            <h3 className="text-base font-bold text-[#FFFFFF]">
                                Profil Organisasi
                            </h3>
                            <div className="space-y-3 text-xs">
                                <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3">
                                    <span className="text-[#8C8D99] block">Nama Organisasi:</span>
                                    <span className="font-semibold text-[#FFFFFF] text-sm mt-0.5 block">{organization.name}</span>
                                </div>
                                <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3">
                                    <span className="text-[#8C8D99] block">Status Lingkungan:</span>
                                    <div className="mt-1">
                                        {organization.is_demo ? (
                                            <span className="inline-flex items-center rounded bg-[#FEB95A]/15 border border-[#FEB95A]/30 px-2.5 py-1 text-xs font-semibold text-[#FEB95A]">
                                                <span>Akun Demo Evaluasi</span>
                                            </span>
                                        ) : (
                                            <span className="inline-flex items-center rounded bg-[#4ADE80]/15 border border-[#4ADE80]/30 px-2.5 py-1 text-xs font-semibold text-[#4ADE80]">
                                                <span>Produksi Aktif</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3">
                                    <span className="text-[#8C8D99] block">Zona Waktu Operasional:</span>
                                    <span className="font-semibold text-[#FFFFFF] mt-0.5 block">{organization.timezone} (WIB)</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 space-y-4">
                            <h3 className="text-base font-bold text-[#FFFFFF]">
                                Fasilitas Terdaftar
                            </h3>
                            {facility ? (
                                <div className="space-y-3 text-xs">
                                    <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3">
                                        <span className="text-[#8C8D99] block">Nama Fasilitas:</span>
                                        <span className="font-semibold text-[#FFFFFF] text-sm mt-0.5 block">{facility.name}</span>
                                    </div>
                                    <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3">
                                        <span className="text-[#8C8D99] block">Kode Fasilitas:</span>
                                        <span className="font-semibold font-code text-[#A9DFD8] mt-0.5 block">{facility.code}</span>
                                    </div>
                                    <div className="rounded-lg border border-[#2B2B36] bg-[#171821] p-3">
                                        <span className="text-[#8C8D99] block">Sektor Industri:</span>
                                        <span className="font-semibold text-[#FFFFFF] mt-0.5 block">{facility.sector}</span>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-xs text-[#8C8D99]">Belum ada fasilitas yang dikonfigurasi.</p>
                            )}
                        </div>

                        <div className="lg:col-span-2 rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 space-y-3">
                            <div className="flex items-center gap-2 text-xs font-semibold text-[#A9DFD8]">
                                <Shield className="h-4 w-4" />
                                <span>Isolasi Multi-Tenant & Perlindungan Data</span>
                            </div>
                            <p className="text-xs text-[#C5C7D0] leading-relaxed">
                                Arsitektur NASIR menerapkan pemisahan data tingkat penyewa (multi-tenancy) secara ketat. Seluruh permintaan query, observasi sensor, kalkulasi emisi, dan draf laporan dibatasi hanya dalam lingkup ID organisasi pemilik token sesi aktif. Organisasi lain tidak dapat membaca atau memodifikasi data fasilitas ini.
                            </p>
                        </div>
                    </div>
                )}

                {/* Tab 3: Anggota & Otorisasi */}
                {activeTab === 'members' && (
                    <div className="space-y-6">
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] overflow-hidden">
                            <div className="p-6 border-b border-[#2B2B36]">
                                <h3 className="text-base font-bold text-[#FFFFFF]">
                                    Daftar Personil Organisasi
                                </h3>
                                <p className="text-xs text-[#8C8D99] mt-0.5">
                                    Anggota terdaftar beserta peran operasional masing-masing personil dalam fasilitas ini.
                                </p>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-[#2B2B36] bg-[#171821] text-[#8C8D99] uppercase tracking-wider font-semibold">
                                        <tr>
                                            <th className="px-6 py-3.5">Nama Personil</th>
                                            <th className="px-6 py-3.5">Alamat Email</th>
                                            <th className="px-6 py-3.5">Peran Otorisasi</th>
                                            <th className="px-6 py-3.5 text-right">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#2B2B36] text-[#C5C7D0]">
                                        {members.map((m) => (
                                            <tr key={m.id} className="hover:bg-[#171821]/50 transition">
                                                <td className="px-6 py-3.5 font-medium text-[#FFFFFF]">
                                                    {m.name}
                                                </td>
                                                <td className="px-6 py-3.5 font-mono text-[11px] text-[#8C8D99]">
                                                    {m.email}
                                                </td>
                                                <td className="px-6 py-3.5">
                                                    <span className="inline-flex items-center gap-1.5 rounded border border-[#2B2B36] bg-[#171821] px-2.5 py-1 text-xs font-semibold text-[#A9DFD8]">
                                                        {formatRoleLabel(m.role)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-3.5 text-right">
                                                    <span className="text-[11px] font-medium text-[#4ADE80]">
                                                        Aktif
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab 4: Versi Metode Demonstrasi */}
                {activeTab === 'methods' && (
                    <div className="space-y-6">
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-4 text-xs text-[#C5C7D0] flex items-start gap-3">
                            <div className="rounded-lg bg-[#A9DFD8]/10 p-2 text-[#A9DFD8] border border-[#A9DFD8]/30 shrink-0">
                                <Info className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="font-semibold text-[#FFFFFF]">
                                    Transparansi Metode Demonstrasi
                                </p>
                                <p className="text-[#8C8D99] mt-0.5">
                                    Seluruh parameter perhitungan risiko dan kuantifikasi emisi terikat pada versi metode aktif di bawah ini untuk menjamin auditabilitas hasil kalkulasi.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {methods.map((method) => (
                                <div key={method.id} className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 space-y-4">
                                    <div className="flex items-start justify-between">
                                         <div>
                                            <span className="text-[10px] font-code uppercase tracking-wider text-[#A9DFD8]">
                                                {method.kind}
                                            </span>
                                            <h4 className="text-base font-bold text-[#FFFFFF] mt-0.5">
                                                Versi {method.version}
                                            </h4>
                                        </div>
                                        <span className="inline-flex items-center gap-1 rounded bg-[#4ADE80]/15 border border-[#4ADE80]/30 px-2 py-0.5 text-[11px] font-semibold text-[#4ADE80]">
                                            Aktif
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-xs">
                                        <div className="text-[#8C8D99]">
                                            <span>Asal Usul (Provenance):</span>
                                            <p className="text-[#C5C7D0] font-medium mt-0.5">
                                                {method.provenance}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <span className="text-xs font-semibold text-[#8C8D99]">
                                            Konfigurasi Parameter:
                                        </span>
                                        <div className="rounded-xl border border-[#2B2B36] bg-[#171821] p-3 font-code text-[11px] text-[#C5C7D0] overflow-x-auto">
                                            <pre className="whitespace-pre-wrap">
                                                {JSON.stringify(method.config, null, 2)}
                                            </pre>
                                        </div>
                                    </div>

                                    <div className="pt-2 border-t border-[#2B2B36] flex items-center justify-between text-[11px] text-[#8C8D99]">
                                        <span>Didaftarkan: {method.created_at}</span>
                                        <span className="font-code text-[#A9DFD8]">ID #{method.id}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </NasirDashboardLayout>
    );
}
