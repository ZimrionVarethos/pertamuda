import React from 'react';
import { PublicLayout } from '@/layouts/public-layout';
import { Link } from '@inertiajs/react';
import { Flame, Wind, Gauge, Shield, ArrowRight, Layers, ArrowUpRight } from 'lucide-react';

export default function Solution() {
    return (
        <PublicLayout title="Solusi Sektor Migas">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16">
                <div className="max-w-2xl mb-12">
                    <span className="text-xs font-semibold text-[#A9DFD8] uppercase tracking-wider">Solusi Sektor Migas</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-2 mb-4">
                        Penanganan Emisi Fugitif dan Integritas Fasilitas
                    </h1>
                    <p className="text-sm text-[#C5C7D0] leading-relaxed">
                        NASIR memusatkan perhatian pada titik pelepasan metana yang luput dari pemantauan berkala, memetakan risiko korosi H2S dan kebocoran pipa menuju draf pelaporan karbon yang terorganisir.
                    </p>
                </div>

                {/* Migas Modules */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-8">
                        <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#20AEF3] mb-5">
                            <Wind className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-bold text-[#FFFFFF] mb-3">Modul Emisi Metana Fugitif</h2>
                        <p className="text-xs text-[#8C8D99] leading-relaxed mb-4">
                            Menganalisis hasil pembacaan kamera Optical Gas Imaging (OGI) dan sensor konsentrasi sniffer untuk mendeteksi fluktuasi gas di sekitar katup flens, segel kompresor, dan saluran buang drum knockout.
                        </p>
                        <div className="border-t border-[#2B2B36] pt-4 text-xs text-[#C5C7D0] space-y-2">
                            <div>• Kuantifikasi berbasis laju alir massa kg/h</div>
                            <div>• Pencatatan interval waktu terbuka untuk mencegah duplikasi</div>
                            <div>• Pemisahan tegas sinyal ppm dari penghitungan ton emisi</div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-8">
                        <div className="h-10 w-10 rounded-lg bg-[#171821] flex items-center justify-center text-[#FEB95A] mb-5">
                            <Gauge className="h-5 w-5" />
                        </div>
                        <h2 className="text-xl font-bold text-[#FFFFFF] mb-3">Modul Integritas Korosi dan Tekanan</h2>
                        <p className="text-xs text-[#8C8D99] leading-relaxed mb-4">
                            Menghubungkan penurunan ketebalan dinding pipa hasil uji ultrasonik dan penurunan tekanan terhadap baseline operasional.
                        </p>
                        <div className="border-t border-[#2B2B36] pt-4 text-xs text-[#C5C7D0] space-y-2">
                            <div>• Penilaian wall loss terhadap batas toleransi teknis</div>
                            <div>• Deteksi anomali deviasi tekanan diferensial</div>
                            <div>• Pemantauan parameter gas beracun H2S secara terpisah</div>
                        </div>
                    </div>
                </div>

                {/* Batas Integrasi & Roadmap Sektor */}
                <div className="rounded-2xl border border-[#2B2B36] bg-[#21222D] p-8 mb-16">
                    <h2 className="text-lg font-bold text-[#FFFFFF] mb-2">Batas Integrasi Prototipe Saat Ini</h2>
                    <p className="text-xs text-[#C5C7D0] leading-relaxed mb-6">
                        NASIR saat ini beroperasi melalui impor CSV tervalidasi dan penyedia skor demonstrasi deterministik. Sistem ini tidak tersambung langsung ke jaringan SCADA pabrik, gerbang API kementerian, atau portal registri karbon pemerintah.
                    </p>

                    <h3 className="text-xs font-semibold text-[#8C8D99] uppercase tracking-wider mb-3">Rencana Pengembangan Sektor Lain</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                        <div className="p-4 rounded-xl border border-[#2B2B36] bg-[#171821]">
                            <div className="font-semibold text-[#FFFFFF]">Pembangkit Listrik Tenaga Uap (PLTU)</div>
                            <div className="text-[#8C8D99] mt-1">Efisiensi pembakaran cerobong dan integrasi data CEMS kontinu.</div>
                        </div>
                        <div className="p-4 rounded-xl border border-[#2B2B36] bg-[#171821]">
                            <div className="font-semibold text-[#FFFFFF]">Industri Semen</div>
                            <div className="text-[#8C8D99] mt-1">Perhitungan faktor emisi kalsinasi dan bauran bahan bakar alternatif.</div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link
                        href="/metodologi"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#A9DFD8] hover:underline"
                    >
                        <span>Lanjutkan membaca rincian metodologi kuantifikasi</span>
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </PublicLayout>
    );
}