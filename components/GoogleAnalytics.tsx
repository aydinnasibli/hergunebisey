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
            command: 'config' | 'event' | 'js' | 'set' | 'consent',
            targetId: string | Date,
            config?: Record<string, unknown>
        ) => void;
        dataLayer: unknown[];
    }
}

export default function GoogleAnalytics({ GA_MEASUREMENT_ID }: GoogleAnalyticsProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { consent } = useCookieConsent();
    const [isLoaded, setIsLoaded] = useState(false);

    // Only track when consent is explicitly given
    const shouldTrack = consent === true;

    // Initialize GA once
    useEffect(() => {
        if (!shouldTrack || typeof window === 'undefined') return;

        // Safely check and create dataLayer
        window.dataLayer = window.dataLayer || [];

        // Define gtag function if it doesn't exist
        if (!window.gtag) {
            window.gtag = function () {
                window.dataLayer.push(arguments);
            };
        }

        // Initialize gtag
        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
            anonymize_ip: true,
            page_location: window.location.href,
            page_path: pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : ''),
            transport_type: 'beacon'
        });

    }, [shouldTrack, GA_MEASUREMENT_ID]);

    // Track page views on route change
    useEffect(() => {
        if (!shouldTrack || !isLoaded || typeof window === 'undefined') return;

        const handleRouteChange = () => {
            const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');

            // Send page view with full details to ensure accuracy
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_location: window.location.origin + url,
                page_path: url,
                page_title: document.title
            });

            // Also log a custom event for backup tracking
            window.gtag('event', 'page_view', {
                page_location: window.location.origin + url,
                page_path: url,
                page_title: document.title,
                send_to: GA_MEASUREMENT_ID
            });
        };

        // Send initial page view
        handleRouteChange();

    }, [pathname, searchParams, GA_MEASUREMENT_ID, shouldTrack, isLoaded]);

    // Don't render anything if no consent
    if (!shouldTrack) return null;

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                onLoad={() => setIsLoaded(true)}
                onError={(e) => console.error('Google Analytics failed to load:', e)}
            />

            {/* No need for a second initialization script as we do it in the useEffect */}
        </>
    );
}