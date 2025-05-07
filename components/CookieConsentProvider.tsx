'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type ConsentType = boolean | null;

interface CookieConsentContextType {
    consent: ConsentType;
    setConsent: (value: ConsentType) => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function useCookieConsent() {
    const context = useContext(CookieConsentContext);
    if (context === undefined) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider');
    }
    return context;
}

interface CookieConsentProviderProps {
    children: ReactNode;
}

export default function CookieConsentProvider({ children }: CookieConsentProviderProps) {
    // Start with null (undecided) consent state
    const [consent, setConsentState] = useState<ConsentType>(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        // Check for existing consent in localStorage on mount
        try {
            const storedConsent = localStorage.getItem('cookie-consent');
            if (storedConsent === 'true') {
                setConsentState(true);
            } else if (storedConsent === 'false') {
                setConsentState(false);
            }
        } catch (error) {
            console.error('Error accessing localStorage:', error);
        }
        setIsInitialized(true);
    }, []);

    // Update localStorage when consent changes
    useEffect(() => {
        if (!isInitialized) return;

        try {
            if (consent !== null) {
                localStorage.setItem('cookie-consent', String(consent));
            }
        } catch (error) {
            console.error('Error writing to localStorage:', error);
        }
    }, [consent, isInitialized]);

    const setConsent = (value: ConsentType) => {
        setConsentState(value);
    };

    const value = {
        consent,
        setConsent
    };

    return (
        <CookieConsentContext.Provider value={value}>
            {children}
        </CookieConsentContext.Provider>
    );
}