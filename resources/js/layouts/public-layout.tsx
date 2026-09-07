import React, { PropsWithChildren } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';

interface PublicLayoutProps extends PropsWithChildren {
    title?: string;
}

export function PublicLayout({ title = 'Analitik Operasional dan Pelaporan Emisi Migas', children }: PublicLayoutProps) {
    const { auth } = usePage().props as any;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

    return (
        <div className="min-h-screen bg-[#171821] text-[#FFFFFF] flex flex-col font-sans selection:bg-[#A9DFD8] selection:text-[#171821]">
            <Head title={title ? `${title} | NASIR` : 'NASIR'} />

            {/* Top Navigation */}
            <header className="sticky top-0 z-40 w-full border-b border-[#2B2B36] bg-[#171821]/90 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
                    {/* Left: Expanded Logo */}
                    <div className="flex items-center flex-1 justify-start">
                        <Link href="/" className="flex items-center">
                            <img
                                src="/icon.png"
                                alt="NASIR"
                                className="h-8 sm:h-9 w-auto object-contain"
                            />
                        </Link>
                    </div>

                    {/* Center: Navigation Options */}
                    <nav className="hidden md:flex items-center justify-center gap-8 text-sm font-medium text-[#8C8D99] flex-1">
                        <Link
                            href="/"
                            className={`transition ${currentPath === '/' ? 'text-[#A9DFD8] font-semibold' : 'hover:text-[#A9DFD8]'}`}
                        >
                            Beranda
                        </Link>
                        <Link
                            href="/solusi"
                            className={`transition ${currentPath.startsWith('/solusi') ? 'text-[#A9DFD8] font-semibold' : 'hover:text-[#A9DFD8]'}`}
                        >
                            Solusi
                        </Link>
                        <Link
                            href="/metodologi"
                            className={`transition ${currentPath.startsWith('/metodologi') ? 'text-[#A9DFD8] font-semibold' : 'hover:text-[#A9DFD8]'}`}
                        >
                            Metodologi
                        </Link>
                        <Link
                            href="/tentang"
                            className={`transition ${currentPath.startsWith('/tentang') ? 'text-[#A9DFD8] font-semibold' : 'hover:text-[#A9DFD8]'}`}
                        >
                            Tentang & Tim
                        </Link>
                    </nav>

                    {/* Right: CTA Button */}
                    <div className="flex items-center justify-end gap-3 flex-1">
                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6] transition shadow-md"
                            >
                                Buka Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="inline-flex items-center gap-2 rounded-lg bg-[#A9DFD8] px-4 py-2 text-xs font-semibold text-[#171821] hover:bg-[#8ecec6] transition shadow-md"
                            >
                                <span>Masuk ke Platform</span>
                                <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                        )}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1">
                {children}
            </main>

            {/* Footer */}
            <footer className="border-t border-[#2B2B36] bg-[#171821] text-xs text-[#8C8D99] pt-10 pb-4">
                <div className="mx-auto max-w-7xl px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6">
                        <div className="md:col-span-2">
                            <div className="mb-3">
                                <img
                                    src="/icon.png"
                                    alt="NASIR"
                                    className="h-7 w-auto object-contain"
                                />
                            </div>
                            <p className="text-xs text-[#C5C7D0] max-w-md leading-relaxed">
                                Platform analitik operasional dan persiapan draf pelaporan emisi untuk fasilitas migas. Menghubungkan data sensor lapangan dengan prioritas pemeliharaan aset dan ketertelusuran dokumen karbon.
                            </p>
                            <p className="mt-3 text-[11px] text-[#8C8D99]">
                                Prototipe aktif menggunakan data sintetis berlabel.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold text-[#FFFFFF] uppercase tracking-wider text-[11px] mb-3">Navigasi</h4>
                            <ul className="space-y-2">
                                <li><Link href="/" className="hover:text-[#A9DFD8] transition">Beranda</Link></li>
                                <li><Link href="/solusi" className="hover:text-[#A9DFD8] transition">Solusi Sektor Migas</Link></li>
                                <li><Link href="/metodologi" className="hover:text-[#A9DFD8] transition">Metodologi dan Batas</Link></li>
                                <li><Link href="/tentang" className="hover:text-[#A9DFD8] transition">Tentang dan Minat Pilot</Link></li>
                                <li><Link href="/privasi" className="hover:text-[#A9DFD8] transition">Kebijakan Privasi</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-[#FFFFFF] uppercase tracking-wider text-[11px] mb-3">Kompetisi & Tim</h4>
                            <p className="text-xs text-[#C5C7D0] mb-2 leading-relaxed">
                                Dikembangkan untuk Pertamuda Seed and Scale 2026.
                            </p>
                            <p className="text-[11px] text-[#8C8D99]">
                                Tim Geng Solo · IPB University
                            </p>
                        </div>
                    </div>

                    <div className="relative border-t border-[#2B2B36] pt-3 mt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-[#8C8D99]">
                        {/* Spacer kiri penyeimbang flex */}
                        <div className="hidden sm:block flex-1" />

                        {/* Hak Cipta di tengah */}
                        <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 text-center text-[#8C8D99]/75 tracking-tight">
                            <span>© 2026 NASIR. Hak cipta dilindungi undang-undang.</span>
                        </div>

                        {/* Privasi dan Indeks di kanan */}
                        <div className="flex items-center justify-center sm:justify-end gap-3 flex-1 text-right">
                            <Link href="/privasi" className="hover:text-[#A9DFD8] transition">Privasi</Link>
                            <span className="text-[#2B2B36]">•</span>
                            <span>Indeks Fasilitas Migas</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}