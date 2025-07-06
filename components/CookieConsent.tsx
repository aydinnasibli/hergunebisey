'use client';

import { useState, useEffect } from 'react';

interface CookieConsentProps {
    message?: string;
    buttonText?: string;
    cookieName?: string;
    expirationDays?: number;
}

const CookieConsent: React.FC<CookieConsentProps> = ({
    message = "By visiting this website, you agree to our use of cookies and privacy policy.",
    buttonText = "Accept",
    cookieName = "cookie-consent",
    expirationDays = 7
}) => {
    const [showBanner, setShowBanner] = useState(false);

    // Check if consent cookie exists
    const getCookie = (name: string): string | null => {
        if (typeof document === 'undefined') return null;

        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || null;
        }
        return null;
    };

    // Set cookie with expiration
    const setCookie = (name: string, value: string, days: number): void => {
        if (typeof document === 'undefined') return;

        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    // Handle accept button click
    const handleAccept = (): void => {
        setCookie(cookieName, 'accepted', expirationDays);
        setShowBanner(false);
    };

    // Check consent status on component mount
    useEffect(() => {
        const consent = getCookie(cookieName);
        if (!consent) {
            setShowBanner(true);
        }
    }, [cookieName]);

    // Don't render anything if banner shouldn't be shown
    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 shadow-lg z-50">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex-1 text-sm sm:text-base">
                    <p>{message}</p>
                </div>
                <div className="flex-shrink-0">
                    <button
                        onClick={handleAccept}
                        className="bg-yellow-500 z-10 hover:bg-yellow-700 text-white px-6 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;