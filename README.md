# NASIR

Nusantara Asset Integrity and Risk Platform

## Tentang Platform

NASIR adalah sistem cerdas berbasis web untuk memantau integritas fasilitas industri energi, minyak dan gas, serta petrokimia. Platform ini dirancang untuk menjawab tantangan penuaan fasilitas pipa dan tangki penyimpanan dengan mengintegrasikan manajemen risiko berbasis standar industri API 580 serta kuantifikasi emisi gas metana berbasis kerangka OGMP 2.0.

Melalui digitalisasi data inspeksi lapangan, NASIR mentransformasi pencatatan manual menjadi wawasan prediktif untuk mencegah insiden kegagalan struktur, menekan potensi kerugian finansial, serta mendukung target keberlanjutan operasional perusahaan.

## Cara Kerja MVP

Alur operasional Minimum Viable Product NASIR terbagi dalam enam tahapan utama:

1. Registrasi dan Pemetaan Aset
Pengguna mendaftarkan unit peralatan seperti jaringan perpipaan, tangki penyimpanan, bejana tekan, atau kompresor. Setiap aset dilengkapi informasi lokasi, spesifikasi teknis, batas ketebalan aman, serta visualisasi spasial tiga dimensi interaktif.

2. Impor Data Observasi Lapangan
Sistem menyediakan fasilitas impor berkas observasi dalam format CSV. Pengguna dapat mengunggah pembacaan sensor ketebalan dinding, laju korosi, anomali getaran, dan konsentrasi pelepasan gas. Sistem secara otomatis memvalidasi kelengkapan data sebelum konfirmasi penyimpanan ke database.

3. Komputasi Skor Integritas dan Risiko
Engine analitik mengolah parameter observasi menjadi beberapa indikator terukur:
a. Skor Korosi untuk mengukur degradasi fisik material pipa atau tangki
b. Skor Kebocoran untuk mendeteksi risiko hilangnya integritas fluida
c. Skor Sinyal Emisi untuk memetakan konsentrasi gas metana yang terdeteksi
d. Skor Komposit Integritas untuk mengelompokkan aset ke dalam empat kategori tingkat risiko mulai dari prioritas kritis hingga kondisi aman

4. Kuantifikasi Emisi Fugitive
Sistem mengalkulasi estimasi volume gas metana yang terlepas ke lingkungan berdasarkan faktor emisi dan tingkat konsentrasi observasi. Hasil perhitungan disajikan dalam satuan ton setara karbon dioksida per tahun guna mendukung pelaporan lingkungan.

5. Penugasan Tugas Pemeliharaan
Berdasarkan tingkat risiko aset, manajer operasional dapat menerbitkan tiket tugas pemeliharaan preventif maupun korektif. Setiap tiket mencakup tenggat waktu, tingkat urgensi, catatan teknis lapangan, serta penanggung jawab perbaikan.

6. Pelaporan Kepatuhan dan Ekspor Dokumen
Platform menyediakan modul penyusunan draf dokumen audit resmi. Pengguna dapat meninjau draf laporan, mencetak dokumen resmi untuk kebutuhan audit regulator, serta mengekspor seluruh catatan observasi ke dalam berkas CSV.

## Arsitektur Teknologi

1. Lapisan Backend
Menggunakan kerangka kerja Laravel versi 13 dan bahasa PHP 8.2 ke atas. Menyediakan arsitektur routing modular, middleware autentikasi, serta sistem manajemen database Eloquent.

2. Lapisan Frontend
Menggunakan React versi 19 dengan TypeScript dan integrasi Inertia.js untuk pengalaman navigasi cepat tanpa memuat ulang peramban. Tampilan dibangun menggunakan Tailwind CSS dan scene tiga dimensi interaktif berbasis Three.js.

3. Basis Data
Mendukung database relasional MySQL dan SQLite untuk keandalan penyimpanan data aset, observasi, pengguna, dan catatan pemeliharaan.

## Panduan Menjalankan Proyek

1. Unduh atau clone repositori ke komputer lokal
2. Masuk ke direktori proyek melalui terminal
3. Jalankan perintah instalasi paket backend:
composer install
4. Siapkan konfigurasi berkas env:
Salin berkas env contoh menjadi berkas env kerja
php artisan key:generate
5. Jalankan migrasi skema database:
php artisan migrate
6. Jalankan instalasi paket frontend:
npm install
7. Kompilasi aset frontend untuk produksi:
npm run build
8. Jalankan server lokal:
php artisan serve
