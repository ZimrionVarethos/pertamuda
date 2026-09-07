import React, { Suspense, lazy } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public-layout';
import {
    ArrowRight,
    Activity,
    Database,
    FileText,
    ChevronDown,
    Layers,
    Sparkles,
    Wrench,
    Move3d,
    CheckCircle2
} from 'lucide-react';

const FacilityHeroScene = lazy(() => import('@/scenes/facility-hero-scene'));

export default function Home() {
    return (
        <PublicLayout title="Beranda">
            <Head title="NASIR: Platform Analitik Emisi & Risiko Migas" />

            {/* 1. Full-Screen Immersive 3D Hero Section */}
            <section className="relative w-full min-h-[calc(100vh-64px)] flex items-center overflow-hidden border-b border-[#2B2B36] bg-[#171821]">
                {/* 3D Scene Background Canvas (Full Viewport) */}
                <div className="absolute inset-0 w-full h-full z-0">
                    <Suspense
                        fallback={
                            <div className="w-full h-full flex items-center justify-center bg-[#171821] text-xs font-mono text-[#8C8D99]">
                                Memuat pemodelan 3D...
                            </div>
                        }
                    >
                        <FacilityHeroScene className="w-full h-full" />
                    </Suspense>
                </div>

                {/* Dark Vignette and Readability Overlays */}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#171821] via-[#171821]/85 md:via-[#171821]/65 to-transparent z-[1]" />
                <div className="absolute bottom-0 inset-x-0 h-36 pointer-events-none bg-gradient-to-t from-[#171821] to-transparent z-[1]" />

                {/* Hero Foreground Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-12 md:py-20 pointer-events-none">
                    <div className="max-w-2xl pointer-events-auto">
                        <div className="inline-flex items-center rounded-md border border-[#2B2B36] bg-[#21222D]/90 backdrop-blur-sm px-3.5 py-1.5 text-xs font-semibold text-[#A9DFD8] w-fit mb-6">
                            <span>Platform Analitik Operasional & Pelaporan Emisi Migas</span>
                        </div>

                        <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-[#FFFFFF] leading-[1.1] mb-6 drop-shadow-sm">
                            Kenali risiko aset.<br />
                            <span className="text-[#A9DFD8]">Telusuri data emisi.</span>
                        </h1>

                        <p className="text-base sm:text-lg text-[#C5C7D0] leading-relaxed max-w-xl mb-8 drop-shadow-sm">
                            NASIR menghubungkan data sensor operasional dengan prioritas pemeliharaan aset dan penyusunan draf pelaporan emisi DRAM serta LCAM yang dapat diverifikasi secara transparan.
                        </p>

                        <div className="flex flex-wrap items-center gap-4 mb-8">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2.5 rounded-lg bg-[#A9DFD8] px-7 py-3.5 text-sm font-semibold text-[#171821] hover:bg-[#8ecec6] transition shadow-xl"
                            >
                                <span>Masuk ke Platform</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/solusi"
                                className="inline-flex items-center gap-2 rounded-lg border border-[#2B2B36] bg-[#21222D]/90 backdrop-blur-sm px-6 py-3.5 text-sm font-semibold text-[#FFFFFF] hover:border-[#8C8D99] transition"
                            >
                                <span>Pelajari Solusi</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-[#8C8D99]">
                            <span>Data sintetis berlabel. Akun pengujian tersedia di halaman masuk.</span>
                        </div>
                    </div>
                </div>

                {/* Floating 3D Interaction Badge (Bottom Right) */}
                <div className="absolute bottom-6 right-6 z-10 hidden sm:flex items-center gap-2 rounded-lg border border-[#2B2B36] bg-[#21222D]/80 backdrop-blur-md px-3 py-1.5 text-xs text-[#C5C7D0]">
                    <Move3d className="h-4 w-4 text-[#A9DFD8]" />
                    <span>Geser kursor untuk memutar model 3D fasilitas</span>
                </div>

                {/* Subtle Scroll Down Prompt (Bottom Center) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-1 text-[11px] text-[#8C8D99] pointer-events-none animate-pulse">
                    <span>Gulir ke bawah</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                </div>
            </section>

            {/* 2. Masalah Operasional & Regulasi */}
            <section className="py-20 border-b border-[#2B2B36] bg-[#171821]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="max-w-2xl mb-12">
                        <span className="text-xs font-semibold text-[#A9DFD8] uppercase tracking-wider">Tantangan Industri</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-2 mb-4">
                            Data operasional, prioritas inspeksi, dan pelaporan belum terpadu
                        </h2>
                        <p className="text-sm text-[#C5C7D0] leading-relaxed">
                            Di banyak fasilitas migas, ribuan jam pencatatan sensor dan pemeliharaan tersimpan di arsip terpisah. Saat kewajiban penyusunan dokumen mitigasi tiba, tim teknis harus mengumpulkan bukti secara manual.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#FB7185] mb-4">
                                <Activity className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold text-[#FFFFFF] mb-2">Pemisahan Jalur Data</h3>
                            <p className="text-xs text-[#8C8D99] leading-relaxed">
                                Sinyal korosi dan penurunan tekanan seringkali tidak langsung terhubung ke pemodelan estimasi kebocoran emisi gas metana.
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#FEB95A] mb-4">
                                <Wrench className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold text-[#FFFFFF] mb-2">Triase Prioritas Aset</h3>
                            <p className="text-xs text-[#8C8D99] leading-relaxed">
                                Teknisi pemeliharaan memerlukan kepastian aset mana yang harus diperiksa lebih dulu sebelum risiko kerusakan struktural membesar.
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#4ADE80] mb-4">
                                <FileText className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold text-[#FFFFFF] mb-2">Keterlacakan Dokumen Karbon</h3>
                            <p className="text-xs text-[#8C8D99] leading-relaxed">
                                Setiap angka kuantifikasi metana dalam draf DRAM dan LCAM wajib memiliki rekam jejak interval dan referensi sensor yang jelas.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Dua Jalur Output yang Berbeda */}
            <section className="py-20 border-b border-[#2B2B36] bg-[#171821]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="text-xs font-semibold text-[#A9DFD8] uppercase tracking-wider">Arsitektur Fungsional</span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-2 mb-4">
                            Dua Jalur Output yang Berbeda
                        </h2>
                        <p className="text-sm text-[#C5C7D0] leading-relaxed">
                            NASIR secara tegas memisahkan alur kerja pemeliharaan lapangan dari alur penyusunan dokumen pelaporan eksternal guna menghindari konflik kepentingan dan inkonsistensi data.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Jalur 1: Pemeliharaan */}
                        <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-8 relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEB95A]/5 rounded-bl-full pointer-events-none"></div>
                            <div>
                                <div className="inline-flex items-center gap-2 rounded bg-[#FEB95A]/15 border border-[#FEB95A]/30 px-2.5 py-1 text-xs font-semibold text-[#FEB95A] mb-4">
                                    Jalur 1
                                </div>
                                <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">Triase Risiko Pemeliharaan</h3>
                                <p className="text-xs text-[#8C8D99] leading-relaxed mb-6">
                                    Menggabungkan data ketebalan dinding pipa (wall loss), tekanan diferensial, dan konsentrasi gas untuk menentukan tingkatan urgensi inspeksi fisik.
                                </p>
                                <ul className="space-y-2.5 text-xs text-[#C5C7D0]">
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#FEB95A] mt-1.5 shrink-0"></div>
                                        <span>Formula deterministik transparan dengan 4 tingkatan risiko (Rendah, Sedang, Tinggi, Kritis).</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#FEB95A] mt-1.5 shrink-0"></div>
                                        <span>Pencegahan bias estimasi jika data sensor hilang atau kadaluarsa.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#FEB95A] mt-1.5 shrink-0"></div>
                                        <span>Penerbitan tiket tugas inspeksi terstruktur untuk personil lapangan.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 pt-4 border-t border-[#2B2B36] flex items-center justify-between text-xs">
                                <span className="text-[#8C8D99]">Target Pengguna:</span>
                                <span className="font-semibold text-[#FFFFFF]">Analis Integritas & Teknisi</span>
                            </div>
                        </div>

                        {/* Jalur 2: Pelaporan */}
                        <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-8 relative overflow-hidden flex flex-col justify-between">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#A9DFD8]/5 rounded-bl-full pointer-events-none"></div>
                            <div>
                                <div className="inline-flex items-center gap-2 rounded bg-[#A9DFD8]/15 border border-[#A9DFD8]/30 px-2.5 py-1 text-xs font-semibold text-[#A9DFD8] mb-4">
                                    Jalur 2
                                </div>
                                <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">Penyusunan Draf Pelaporan</h3>
                                <p className="text-xs text-[#8C8D99] leading-relaxed mb-6">
                                    Menghitung massa emisi metana (kg CH4) murni dari observasi laju massa dengan pencatatan interval waktu dan rasio kelengkapan data.
                                </p>
                                <ul className="space-y-2.5 text-xs text-[#C5C7D0]">
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#A9DFD8] mt-1.5 shrink-0"></div>
                                        <span>Kuantifikasi metana murni dengan validasi interval tanpa tumpang-tindih.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#A9DFD8] mt-1.5 shrink-0"></div>
                                        <span>Penyusunan 6 bagian draf dokumen DRAM dan LCAM dengan checklist kelengkapan.</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-[#A9DFD8] mt-1.5 shrink-0"></div>
                                        <span>Pemisahan tugas verifikasi independen sebelum draf dapat dicetak atau diekspor.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-8 pt-4 border-t border-[#2B2B36] flex items-center justify-between text-xs">
                                <span className="text-[#8C8D99]">Target Pengguna:</span>
                                <span className="font-semibold text-[#FFFFFF]">Analis Emisi & Peninjau Dokumen</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Fitur Utama */}
            <section className="py-20 border-b border-[#2B2B36] bg-[#171821]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <span className="text-xs font-semibold text-[#A9DFD8] uppercase tracking-wider">Kapabilitas Sistem</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-[#FFFFFF] mt-2 mb-4">
                            Didesain untuk Standar Kepatuhan dan Audit
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#FEB95A] mb-4">
                                <Database className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold text-[#FFFFFF] mb-2">Impor CSV Idempoten</h3>
                            <p className="text-xs text-[#8C8D99] leading-relaxed">
                                Validasi berkas baris per baris dengan deteksi hash SHA256 untuk mencegah duplikasi unggahan observasi.
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#20AEF3] mb-4">
                                <Activity className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold text-[#FFFFFF] mb-2">Kalkulasi Deterministik</h3>
                            <p className="text-xs text-[#8C8D99] leading-relaxed">
                                Setiap skor risiko dan nilai kilogram metana dihasilkan dari rumus matematis teruji, tanpa nilai acak.
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#4ADE80] mb-4">
                                <FileText className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold text-[#FFFFFF] mb-2">Jejak Audit Append-Only</h3>
                            <p className="text-xs text-[#8C8D99] leading-relaxed">
                                Seluruh mutasi aset, perubahan tugas, dan tindakan peninjauan dicatat permanen dalam rekam jejak kepatuhan.
                            </p>
                        </div>

                        <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6">
                            <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#A9DFD8] mb-4">
                                <Layers className="h-5 w-5" />
                            </div>
                            <h3 className="text-base font-semibold text-[#FFFFFF] mb-2">Inspeksi Visual Objek 3D</h3>
                            <p className="text-xs text-[#8C8D99] leading-relaxed">
                                Membantu tim teknis membedakan segmen pipa, bejana, dan katup secara interaktif pada layar detail aset.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Mulai Akses Platform & CTA */}
            <section className="py-20 bg-[#171821]">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-8 sm:p-12">
                        <span className="text-xs font-semibold text-[#A9DFD8] uppercase tracking-wider">Mulai Eksplorasi</span>
                        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-3 mb-4">
                            Masuk ke Platform NASIR
                        </h2>
                        <p className="text-sm text-[#C5C7D0] max-w-xl mx-auto leading-relaxed mb-8">
                            Akses 12 aset fasilitas migas sintetis, coba impor data pengukuran, telusuri pembentukan skor triase, dan periksa draf dokumen laporan emisi.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-7 py-3.5 text-sm font-semibold text-[#171821] hover:bg-[#8ecec6] transition shadow-lg"
                            >
                                <span>Masuk ke Platform</span>
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/metodologi"
                                className="inline-flex items-center gap-2 rounded-lg border border-[#2B2B36] bg-[#171821] px-6 py-3.5 text-sm font-semibold text-[#FFFFFF] hover:border-[#8C8D99] transition"
                            >
                                <span>Pelajari Metodologi</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}