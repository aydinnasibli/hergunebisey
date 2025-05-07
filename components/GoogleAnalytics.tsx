// app/components/GoogleAnalytics.tsx
'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

interface GoogleAnalyticsProps {
    GA_MEASUREMENT_ID: string;
    loadScript?: boolean; // Make it optional with a default value
}
declare global {

    interface Window {

        gtag: (

            command: 'config' | 'event' | 'js' | 'set',

            targetId: string,

            config?: Record<string, any>

        ) => void;

        dataLayer: any[];

    }

}
export default function GoogleAnalytics({
    GA_MEASUREMENT_ID,
    loadScript = true // Default to true if not provided
}: GoogleAnalyticsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!loadScript || !window.gtag) return; // Skip if loadScript is false

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        // Send pageview with updated URL
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }, [pathname, searchParams, GA_MEASUREMENT_ID, loadScript]);

    // Don't render anything if loadScript is false
    if (!loadScript) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false
            });
          `,
                }}
            />
        </>
    );
}