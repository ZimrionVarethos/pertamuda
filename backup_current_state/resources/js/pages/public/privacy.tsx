import React from 'react';
import { PublicLayout } from '@/layouts/public-layout';

export default function Privacy() {
    return (
        <PublicLayout title="Kebijakan Privasi">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
                <span className="text-xs font-semibold text-[#A9DFD8] uppercase tracking-wider">Kebijakan Privasi</span>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-2 mb-6 font-sans">
                    Pengelolaan dan Perlindungan Data
                </h1>

                <div className="space-y-6 text-xs sm:text-sm text-[#C5C7D0] leading-relaxed">
                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-8">
                        <h2 className="text-base font-bold text-[#FFFFFF] mb-2 font-sans">1. Data yang Disimpan</h2>
                        <p className="text-[#8C8D99]">
                            Platform prototipe NASIR menyimpan data akun pengujian lokal, catatan aset sintetis, observasi pengukuran yang diunggah melalui berkas CSV, draf dokumen laporan internal, dan formulir minat pilot yang dikirimkan secara sukarela.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-8">
                        <h2 className="text-base font-bold text-[#FFFFFF] mb-2 font-sans">2. Tujuan Penggunaan</h2>
                        <p className="text-[#8C8D99]">
                            Seluruh data diproses khusus untuk menjalankan demonstrasi alur kerja platform: pemetaan triase risiko fasilitas, agregasi interval massa metana, penyusunan draf dokumen DRAM dan LCAM, serta penelaahan internal.
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#2B2B36] bg-[#21222D] p-6 sm:p-8">
                        <h2 className="text-base font-bold text-[#FFFFFF] mb-2 font-sans">3. Retensi dan Keamanan Berkas</h2>
                        <p className="text-[#8C8D99]">
                            Berkas impor disimpan pada penyimpanan lokal terlindungi dan tidak dapat diakses publik secara langsung. Sesi demonstrasi sintetis memiliki masa kedaluwarsa berkala dan dapat dibersihkan melalui seeder lokal.
                        </p>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}