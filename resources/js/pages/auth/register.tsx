import { Head, Link } from '@inertiajs/react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export default function Register() {
    return (
        <>
            <Head title="Pendaftaran Akun Terbatas" />
            <div className="flex flex-col gap-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FB7185]/15 text-[#FB7185] border border-[#FB7185]/30">
                    <ShieldAlert className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-[#FFFFFF] font-sans">Pendaftaran Publik Dinonaktifkan</h2>
                    <p className="mt-2 text-xs text-[#C5C7D0] leading-relaxed">
                        Sistem NASIR menerapkan kontrol akses tertutup. Akun pengguna dikonfigurasi langsung oleh pemilik organisasi fasilitas migas (Organization Owner) atau dapat dicoba melalui sesi demo publik.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    <Link
                        href="/login"
                        className="inline-flex w-full items-center justify-center rounded-lg bg-[#A9DFD8] py-2.5 text-xs font-bold text-[#171821] hover:bg-[#8ecec6] transition font-sans"
                    >
                        Kembali ke Halaman Masuk
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-1.5 text-xs text-[#8C8D99] hover:text-[#FFFFFF] transition"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        <span>Buka Beranda & Workspace Demo</span>
                    </Link>
                </div>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Pendaftaran Akun Terbatas',
    description: 'Akses pendaftaran mandiri dinonaktifkan.',
};
