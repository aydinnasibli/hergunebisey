'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import { useCookieConsent } from './CookieConsentProvider';

interface GoogleAnalyticsProps {
    GA_MEASUREMENT_ID: string;
}

declare global {
    interface Window {
        gtag: (
            command: 'config' | 'event' | 'js' | 'set',
            targetId: string,
            config?: Record<string, unknown>
        ) => void;
        dataLayer: unknown[];
    }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { consent } = useCookieConsent();
    const [isInitialized, setIsInitialized] = useState(false);

    // Only track when consent is explicitly given
    const shouldTrack = consent === true;

    // Handle page view tracking
    useEffect(() => {
        // Skip if no consent, no measurement ID, not initialized, or if we're in SSR
        if (!shouldTrack || !GA_MEASUREMENT_ID || !isInitialized || typeof window === 'undefined') return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

        // Make sure gtag is defined before using it
        if (window.gtag) {
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: url,
                send_page_view: true
            });
        }
    }, [pathname, searchParams, GA_MEASUREMENT_ID, shouldTrack, isInitialized]);

    // Don't render the scripts if user hasn't consented
    if (!shouldTrack) return null;

    return (
        <>
            {/* Load the gtag script */}
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                onLoad={() => {
                    setIsInitialized(true);
                }}
            />

            {/* Initialize gtag */}
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
                            anonymize_ip: true, // GDPR compliance - anonymize IP addresses
                            transport_type: 'beacon' // More reliable data transmission
                        });
                    `,
                }}
            />
        </>
    );
}