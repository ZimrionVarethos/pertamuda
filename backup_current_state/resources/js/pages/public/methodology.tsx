import React from 'react';
import { PublicLayout } from '@/layouts/public-layout';
import { ShieldCheck, ArrowRight, AlertTriangle } from 'lucide-react';

export default function Methodology() {
    return (
        <PublicLayout title="Metodologi dan Batas Prototipe">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
                <div className="max-w-2xl mb-12">
                    <span className="text-xs font-semibold text-[#A9DFD8] uppercase tracking-wider">Transparansi dan Kaidah Ilmiah</span>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-2 mb-4 font-sans">
                        Metodologi Perhitungan dan Batas Klaim
                    </h1>
                    <p className="text-sm text-[#C5C7D0] leading-relaxed">
                        Kami memisahkan secara ketat antara skor triase untuk pemeliharaan fasilitas dan angka kuantifikasi untuk dokumen emisi karbon.
                    </p>
                </div>

                <div className="space-y-8 text-xs sm:text-sm text-[#C5C7D0] leading-relaxed">
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-8">
                        <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] mb-3 font-sans">
                            1. Perbedaan Mendasar: Skor Triase vs Pengukuran Emisi
                        </h2>
                        <p className="mb-3 text-[#8C8D99]">
                            Skor triase risiko (0 sampai 100) dirancang untuk membantu menentukan prioritas pemeriksaan aset. Skor tersebut bukan angka tonase gas dan tidak boleh dijadikan dasar klaim kredit emisi.
                        </p>
                        <p className="text-[#8C8D99]">
                            Sebaliknya, massa emisi metana hanya dihitung dari observasi laju alir massa dalam satuan kg/h yang memiliki durasi interval terukur. Konsentrasi metana ppm sendirian tidak menghasilkan angka massa tanpa model dispersi dan parameter laju alir yang sah.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-8">
                        <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] mb-3 font-sans">
                            2. Formula Triase Demonstrasi
                        </h2>
                        <p className="text-[#8C8D99] mb-3">
                            Formula yang digunakan pada prototipe awal adalah konfigurasi deterministik sintetis:
                        </p>
                        <div className="rounded-lg bg-[#171821] border border-[#2B2B36] p-4 font-code text-xs text-[#4ADE80] mb-3 overflow-x-auto leading-relaxed">
                            corrosion_score = clamp100(wall_loss_pct / 50 * 100)<br />
                            leak_score = clamp100(abs(pressure - baseline) / baseline / 0.20 * 100)<br />
                            emission_signal = clamp100(methane_ppm / 100 * 100)<br />
                            composite_score = 0.35 * corrosion + 0.40 * leak + 0.25 * emission_signal
                        </div>
                        <p className="text-[#8C8D99]">
                            Jika ada parameter wajib yang hilang atau berada di luar jendela kesegaran 24 jam, skor komposit bernilai null dengan label <strong className="text-[#FFFFFF]">Data belum cukup</strong>. Kami tidak mengganti nilai hilang dengan nol.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-8">
                        <h2 className="text-base sm:text-lg font-bold text-[#FFFFFF] mb-3 font-sans">
                            3. Kuantifikasi Laju Massa Metana
                        </h2>
                        <p className="text-[#8C8D99] mb-3">
                            Perhitungan massa metana menggunakan integrasi interval waktu:
                        </p>
                        <div className="rounded-lg bg-[#171821] border border-[#2B2B36] p-4 font-code text-xs text-[#20AEF3] mb-3 overflow-x-auto leading-relaxed">
                            interval_hours = (interval_end - observed_at) dalam jam<br />
                            methane_mass_kg = sum(methane_rate_kg_h * interval_hours)
                        </div>
                        <p className="text-[#8C8D99]">
                            Interval tumpang tindih ditolak untuk aset yang sama. Bila terdapat celah waktu pengukuran, sistem menyajikan rasio cakupan waktu dan menandainya sebagai total parsial.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#FB7185]/30 bg-[#FB7185]/10 p-6 sm:p-8">
                        <div className="flex items-center gap-2 text-[#FB7185] font-semibold mb-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Batas Tanggung Jawab Prototipe</span>
                        </div>
                        <p className="text-xs text-[#C5C7D0] leading-relaxed">
                            NASIR adalah perangkat lunak dalam tahap prototipe kompetisi. Seluruh draf laporan yang dihasilkan berlabel <em className="text-[#FEB95A]">Draf prototipe. Belum diverifikasi</em>. NASIR tidak memberikan jaminan kelulusan audit instansi verifikator atau badan sertifikasi resmi.
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}