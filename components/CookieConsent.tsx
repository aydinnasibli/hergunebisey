'use client';

import { useState, useEffect } from 'react';
import { useCookieConsent } from './CookieConsentProvider';

export default function CookieConsent() {
    const { consent, setConsent } = useCookieConsent();
    const [bannerVisible, setBannerVisible] = useState(false);

    useEffect(() => {
        // Only show banner if consent is null (not yet decided)
        setBannerVisible(consent === null);
    }, [consent]);

    const handleAccept = () => {
        setConsent(true);
        setBannerVisible(false);
    };

    const handleDecline = () => {
        setConsent(false);
        setBannerVisible(false);
    };

    if (!bannerVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-md z-50">
            <div className="max-w-screen-lg mx-auto">
                <p className="text-sm md:text-base">
                    Bu site, deneyiminizi geliştirmek ve GDPR gereksinimlerine uymak için çerezler kullanmaktadır.
                    Kabul ederek, Google Analytics ve gelecekteki reklam hizmetlerinin kullanımına izin vermiş olursunuz.
                </p>
                <div className="mt-2 flex gap-2">
                    <button
                        onClick={handleAccept}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded text-sm transition-colors"
                    >
                        Kabul Et
                    </button>
                    <button
                        onClick={handleDecline}
                        className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded text-sm transition-colors"
                    >
                        Reddet
                    </button>
                </div>
            </div>
        </div>
    );
}