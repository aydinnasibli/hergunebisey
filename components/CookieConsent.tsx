'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
interface CookieConsentProps {
    message?: string;
    buttonText?: string;
    cookieName?: string;
    expirationDays?: number;
    privacyPolicyUrl?: string;
    cookiePolicyUrl?: string;
}

export default function CookieConsent({
    message = "Bu web sitesini ziyaret ederek çerezleri ve gizlilik politikamızı kabul etmiş olursunuz.",
    buttonText = "Kabul Et",
    cookieName = "hergunebisey-consent",
    expirationDays = 7,
    privacyPolicyUrl = "/gizlilik-politikasi",
    cookiePolicyUrl = "/cerez-politikasi"
}: CookieConsentProps) {
    const [showBanner, setShowBanner] = useState(false);

    const getCookie = (name: string): string | null => {
        if (typeof document === 'undefined') return null;
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop()?.split(';').shift() || null;
        }
        return null;
    };

    const setCookie = (name: string, value: string, days: number): void => {
        if (typeof document === 'undefined') return;
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    };

    const handleAccept = (): void => {
        setCookie(cookieName, 'accepted', expirationDays);
        setShowBanner(false);
        toast.success('Çerez politikamızı kabul ettiniz.', {
            duration: 3000,
            position: 'bottom-right',
            style: {
                background: '#000',
                color: '#fff',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '14px'
            }
        });
    };



    useEffect(() => {
        const consent = getCookie(cookieName);
        if (!consent) {
            setShowBanner(true);
        }
    }, [cookieName]);

    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-3 right-6 z-50 w-96">
            <div className="bg-black text-white rounded-2xl p-6 shadow-2xl border border-gray-800 max-w-full">
                {/* Cookie Icon */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="text-black"
                        >
                            <circle cx="12" cy="12" r="10" fill="currentColor" />
                            <circle cx="9" cy="9" r="1" fill="white" />
                            <circle cx="15" cy="10" r="0.8" fill="white" />
                            <circle cx="10" cy="15" r="0.8" fill="white" />
                            <circle cx="16" cy="16" r="1" fill="white" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold">Çerez Bildirimi</h3>
                </div>

                <div className="mb-6">
                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                        {message}
                    </p>

                    {/* Privacy Policy Notice */}
                    <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                        <p className="text-xs text-gray-400 leading-relaxed">
                            <strong className="text-white">Gizliliğiniz bizim için önemlidir.</strong> Kişisel verilerinizi web sitelerimizi ve hizmetlerimizi geliştirmek, kampanyalarımıza destek olmak ve kişiselleştirilmiş içerik sunmak için işliyoruz. Daha fazla bilgi için{' '}
                            <a
                                href={privacyPolicyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
                            >
                                Gizlilik Politikamızı
                            </a>{' '}
                            ve <a
                                href={cookiePolicyUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline transition-colors"
                            >
                                Çerez Politikamızı
                            </a>{' '}
                            inceleyebilirsiniz.
                        </p>
                    </div>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={handleAccept}
                        className="flex-1 px-4 cursor-pointer py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-black"
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
}