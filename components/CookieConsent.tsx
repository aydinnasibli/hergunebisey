// app/components/CookieConsent.tsx
'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
    const [consent, setConsent] = useState<boolean | null>(null);

    useEffect(() => {
        const storedConsent = localStorage.getItem('cookie-consent');
        setConsent(storedConsent === 'true');
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'true');
        setConsent(true);
        window.location.reload(); // Reload to activate GA
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'false');
        setConsent(false);
    };

    if (consent !== null) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-100 p-4 shadow-md">
            <p>We use cookies to improve your experience.</p>
            <div className="mt-2">
                <button onClick={handleAccept} className="mr-2 bg-blue-500 text-white px-4 py-1 rounded">
                    Accept
                </button>
                <button onClick={handleDecline} className="bg-gray-300 px-4 py-1 rounded">
                    Decline
                </button>
            </div>
        </div>
    );
}