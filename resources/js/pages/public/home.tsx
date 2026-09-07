import React, { Suspense, lazy } from 'react';
import { Head, Link } from '@inertiajs/react';
import { PublicLayout } from '@/layouts/public-layout';
import {
    ArrowRight,
    Wrench,
    Wind,
    Move3d,
    ChevronDown
} from 'lucide-react';

const FacilityHeroScene = lazy(() => import('@/scenes/facility-hero-scene'));

export default function Home() {
    return (
        <PublicLayout title="Beranda">
            <Head title="NASIR: Platform Analitik Emisi & Risiko Migas" />

            {/* 1. Pure 3D Showcase (Fokus 3D Bersih & Realistis) */}
            <section className="relative w-full h-[calc(100vh-64px)] min-h-[560px] flex items-center justify-center overflow-hidden border-b border-[#2B2B36] bg-[#171821]">
                <div className="absolute inset-0 w-full h-full z-0">
                    <Suspense
                        fallback={
                            <div className="w-full h-full flex items-center justify-center bg-[#171821] text-xs font-code text-[#8C8D99]">
                                Memuat pemodelan 3D fasilitas...
                            </div>
                        }
                    >
                        <FacilityHeroScene className="w-full h-full" />
                    </Suspense>
                </div>

                {/* Subtle bottom fade transition */}
                <div className="absolute bottom-0 inset-x-0 h-24 pointer-events-none bg-gradient-to-t from-[#171821] to-transparent z-[1]" />

                {/* Minimalist 3D Interaction Control Guide */}
                <div className="absolute bottom-6 right-4 sm:right-8 z-10 flex items-center gap-2 rounded-lg border border-[#2B2B36] bg-[#171821]/80 backdrop-blur-md px-3 py-1.5 text-xs text-[#C5C7D0] shadow-lg pointer-events-none">
                    <Move3d className="h-3.5 w-3.5 text-[#A9DFD8]" />
                    <span className="text-[11px]">Putar 360° · Scroll untuk zoom</span>
                </div>

                {/* Minimalist Scroll Cue */}
                <a
                    href="#ringkasan"
                    aria-label="Gulir ke ringkasan platform"
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-[11px] font-medium text-[#8C8D99] hover:text-[#A9DFD8] transition pointer-events-auto"
                >
                    <span>Jelajahi</span>
                    <ChevronDown className="h-4 w-4 animate-bounce text-[#A9DFD8]" />
                </a>
            </section>

            {/* 2. Ringkasan Platform & Aksi Cepat (Sederhana & Ringkas) */}
            <section id="ringkasan" className="py-16 sm:py-20 border-b border-[#2B2B36] bg-[#171821]">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <div className="inline-flex items-center rounded-md border border-[#2B2B36] bg-[#21222D] px-3.5 py-1 text-xs font-semibold text-[#A9DFD8] mb-4">
                        Platform Analitik Fasilitas Migas
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-extrabold text-[#FFFFFF] tracking-tight leading-tight mb-4 font-sans">
                        Sistem Analitik Emisi & Integritas Fasilitas Migas
                    </h1>

                    <p className="text-sm sm:text-base text-[#C5C7D0] max-w-2xl mx-auto leading-relaxed mb-8">
                        Menghubungkan telemetri sensor operasional ke dalam triase pemeliharaan fisik dan kuantifikasi emisi metana yang transparan dan dapat diaudit.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3.5 mb-8">
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#171821] hover:bg-[#8ecec6] transition shadow-md font-sans"
                        >
                            <span>Buka Dashboard Demo</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/solusi"
                            className="inline-flex items-center gap-2 rounded-lg border border-[#2B2B36] bg-[#21222D] px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#FFFFFF] hover:border-[#8C8D99] transition font-sans"
                        >
                            <span>Pelajari Solusi</span>
                        </Link>
                    </div>

                    {/* Akun Demo Ringkas */}
                    <div className="inline-flex flex-wrap items-center justify-center gap-3 rounded-xl border border-[#2B2B36] bg-[#21222D] px-4 py-2 text-xs font-code text-[#C5C7D0]">
                        <span className="text-[#8C8D99] font-sans">Akses Demo:</span>
                        <span><span className="text-[#8C8D99]">Akun:</span> <strong className="text-[#A9DFD8]">demo@nasir.test</strong></span>
                        <span className="text-[#2B2B36]">•</span>
                        <span><span className="text-[#8C8D99]">Sandi:</span> <strong className="text-[#FFFFFF]">password</strong></span>
                    </div>
                </div>
            </section>

            {/* 3. Dua Pilar Fungsional (2 Card Sederhana) */}
            <section className="py-16 sm:py-20 border-b border-[#2B2B36] bg-[#171821]">
                <div className="mx-auto max-w-5xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Pilar 1: Triase Pemeliharaan Fisik */}
                        <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-8 flex flex-col justify-between hover:border-[#FEB95A]/40 transition">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center rounded bg-[#FEB95A]/15 border border-[#FEB95A]/30 px-2.5 py-1 text-xs font-semibold text-[#FEB95A] font-code">
                                        TRIASE RISIKO
                                    </span>
                                    <Wrench className="h-5 w-5 text-[#FEB95A]" />
                                </div>
                                <h2 className="text-lg font-bold text-[#FFFFFF] mb-2 font-sans">
                                    Integritas & Pemeliharaan Fisik
                                </h2>
                                <p className="text-xs sm:text-sm text-[#8C8D99] leading-relaxed">
                                    Mendeteksi laju degradasi dinding pipa, anomali tekanan, dan akumulasi gas untuk menghasilkan rekomendasi tiket kerja tim teknisi lapangan.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[#2B2B36]">
                                <Link
                                    href="/solusi#alur-mekanikal"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#FEB95A] hover:underline"
                                >
                                    <span>Pelajari alur triase risiko</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>

                        {/* Pilar 2: Kuantifikasi Emisi Karbon */}
                        <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-8 flex flex-col justify-between hover:border-[#A9DFD8]/40 transition">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="inline-flex items-center rounded bg-[#A9DFD8]/15 border border-[#A9DFD8]/30 px-2.5 py-1 text-xs font-semibold text-[#A9DFD8] font-code">
                                        KUANTIFIKASI EMISI
                                    </span>
                                    <Wind className="h-5 w-5 text-[#A9DFD8]" />
                                </div>
                                <h2 className="text-lg font-bold text-[#FFFFFF] mb-2 font-sans">
                                    Kuantifikasi & Draf Dokumen Regulasi
                                </h2>
                                <p className="text-xs sm:text-sm text-[#8C8D99] leading-relaxed">
                                    Menghitung massa emisi metana (kg CH4) dengan metode deterministik terverifikasi guna penyusunan draf pelaporan DRAM dan LCAM standar regulasi.
                                </p>
                            </div>
                            <div className="mt-6 pt-4 border-t border-[#2B2B36]">
                                <Link
                                    href="/solusi#alur-emisi"
                                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A9DFD8] hover:underline"
                                >
                                    <span>Pelajari alur kuantifikasi emisi</span>
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Banner Eksplorasi Ringkas */}
            <section className="py-14 sm:py-16 bg-[#171821]">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
                    <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-10">
                        <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] mb-2 font-sans">
                            Eksplorasi Platform Demonstrasi
                        </h2>
                        <p className="text-xs sm:text-sm text-[#8C8D99] max-w-md mx-auto mb-6">
                            Masuk dengan akun operator demo untuk mencoba modul triase risiko, simulasi aset, dan draf dokumen pelaporan.
                        </p>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-6 py-2.5 text-xs sm:text-sm font-bold text-[#171821] hover:bg-[#8ecec6] transition shadow-md font-sans"
                        >
                            <span>Masuk ke Dashboard</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}