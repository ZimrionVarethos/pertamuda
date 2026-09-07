import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({ className, alt = 'NASIR', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/icon.png"
            alt={alt}
            className={`object-contain ${className ?? 'size-9'}`}
            {...props}
        />
    );
}

