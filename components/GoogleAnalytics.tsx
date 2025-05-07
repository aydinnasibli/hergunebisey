'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';
import { useCookieConsent } from './CookieConsentProvider';

interface GoogleAnalyticsProps {
    GA_MEASUREMENT_ID: string;
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

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { consent } = useCookieConsent();

    // Only track when consent is explicitly given
    const shouldTrack = consent === true;

    useEffect(() => {
        // Skip if no consent or gtag not loaded
        if (!shouldTrack || !window.gtag) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        // Send pageview with updated URL
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }, [pathname, searchParams, GA_MEASUREMENT_ID, shouldTrack]);

    // Don't render the scripts if user hasn't consented
    if (!shouldTrack) return null;

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
                            send_page_view: false,
                            anonymize_ip: true // GDPR compliance - anonymize IP addresses
                        });
                    `,
                }}
            />
        </>
    );
}