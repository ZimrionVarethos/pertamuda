import React from 'react';
import { PublicLayout } from '@/layouts/public-layout';
import { useForm } from '@inertiajs/react';
import { Users, Send, CheckCircle2 } from 'lucide-react';

interface TeamMember {
    name: string;
    role: string;
    institution: string;
    photo: string;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Rafi Fakhri Alaudin',
        role: 'Teknologi Rekayasa Perangkat Lunak',
        institution: 'Sekolah Vokasi IPB University',
        photo: '/pasfotofinal.png',
    },
    {
        name: 'Moch. Farrel Azqila Simbolon',
        role: 'Teknologi Rekayasa Perangkat Lunak',
        institution: 'Sekolah Vokasi IPB University',
        photo: '/pasfotofinal.png',
    },
    {
        name: 'Daffa Bisma Rudidharma',
        role: 'Teknologi Rekayasa Perangkat Lunak',
        institution: 'Sekolah Vokasi IPB University',
        photo: '/pasfotofinal.png',
    },
];

export default function About() {
    const { data, setData, post, processing, errors, recentlySuccessful, reset } = useForm({
        name: '',
        email: '',
        organization: '',
        message: '',
        consent: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/pilot-interest', {
            onSuccess: () => reset(),
        });
    };

    return (
        <PublicLayout title="Tentang dan Minat Pilot">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
                {/* Team Info */}
                <div className="mb-16">
                    <span className="text-xs font-semibold text-[#A9DFD8] uppercase tracking-wider">Identitas Pengembang</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-2 mb-4 font-sans">
                        Tim Geng Solo · IPB University
                    </h1>
                    <p className="text-sm text-[#C5C7D0] leading-relaxed mb-8">
                        Proyek ini dikembangkan oleh mahasiswa Program Studi Teknologi Rekayasa Perangkat Lunak, Sekolah Vokasi IPB University untuk kompetisi Pertamuda Seed and Scale 2026.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {teamMembers.map((member) => (
                            <div
                                key={member.name}
                                className="overflow-hidden rounded-xl border border-[#2B2B36] bg-[#21222D] flex flex-col transition hover:border-[#A9DFD8]/40"
                            >
                                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#171821]">
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className="h-full w-full object-cover object-top transition duration-300 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#21222D] via-transparent to-transparent opacity-60 pointer-events-none" />
                                </div>
                                <div className="p-5 flex flex-col flex-1 justify-between">
                                    <div>
                                        <h3 className="font-bold text-sm text-[#FFFFFF] font-sans">
                                            {member.name}
                                        </h3>
                                        <p className="text-xs text-[#8C8D99] mt-1">
                                            {member.role}
                                        </p>
                                    </div>
                                    <p className="text-[11px] text-[#A9DFD8] mt-3 font-medium">
                                        {member.institution}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pilot Interest Form */}
                <div id="pilot" className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-8 sm:p-10">
                    <span className="text-xs font-semibold text-[#FEB95A] uppercase tracking-wider">Kolaborasi dan Evaluasi</span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mt-2 mb-3 font-sans">
                        Formulir Minat Pilot Fasilitas
                    </h2>
                    <p className="text-xs text-[#8C8D99] mb-8 leading-relaxed">
                        Kami menyambut diskusi dan evaluasi metodologi bersama praktisi HSE migas dan tim pemeliharaan aset industri.
                    </p>

                    {recentlySuccessful && (
                        <div className="mb-6 flex items-center gap-2 rounded-lg border border-[#4ADE80]/30 bg-[#4ADE80]/10 p-4 text-xs text-[#4ADE80]">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            <span>Terima kasih. Pesan minat pilot Anda telah tersimpan dalam basis data kami.</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1.5">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-[11px] text-[#FB7185]">{errors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-[#C5C7D0] mb-1.5">Alamat Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                                    required
                                />
                                {errors.email && <p className="mt-1 text-[11px] text-[#FB7185]">{errors.email}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#C5C7D0] mb-1.5">Nama Perusahaan atau Instansi (Opsional)</label>
                            <input
                                type="text"
                                value={data.organization}
                                onChange={(e) => setData('organization', e.target.value)}
                                className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-[#C5C7D0] mb-1.5">Pesan atau Kebutuhan Pilot</label>
                            <textarea
                                rows={4}
                                value={data.message}
                                onChange={(e) => setData('message', e.target.value)}
                                className="w-full rounded-lg border border-[#2B2B36] bg-[#171821] px-3.5 py-2.5 text-xs text-[#FFFFFF] focus:border-[#A9DFD8] focus:outline-none leading-relaxed"
                                required
                            ></textarea>
                            {errors.message && <p className="mt-1 text-[11px] text-[#FB7185]">{errors.message}</p>}
                        </div>

                        <div className="flex items-start gap-2.5">
                            <input
                                type="checkbox"
                                id="consent"
                                checked={data.consent}
                                onChange={(e) => setData('consent', e.target.checked)}
                                className="mt-0.5 rounded border-[#2B2B36] bg-[#171821] text-[#A9DFD8] focus:ring-[#A9DFD8]"
                                required
                            />
                            <label htmlFor="consent" className="text-[11px] text-[#8C8D99] leading-tight">
                                Saya menyetujui penyimpanan data kontak ini untuk keperluan korespondensi evaluasi pilot NASIR.
                            </label>
                        </div>
                        {errors.consent && <p className="text-[11px] text-[#FB7185]">{errors.consent}</p>}

                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-6 py-2.5 text-xs font-bold text-[#171821] hover:bg-[#8ecec6] transition disabled:opacity-50 font-sans"
                        >
                            <span>Kirim Minat Pilot</span>
                            <Send className="h-3.5 w-3.5" />
                        </button>
                    </form>
                </div>
            </div>
        </PublicLayout>
    );
}