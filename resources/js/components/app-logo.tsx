import { usePage } from '@inertiajs/react';

export default function AppLogo() {
    const { name } = usePage().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg overflow-hidden">
                <img src="/cut-icon.png" alt="NASIR" className="size-8 object-contain" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold text-[#FFFFFF]">
                    {name ?? 'NASIR'}
                </span>
            </div>
        </>
    );
}
