'use client';

import { useState, useEffect, useId } from 'react';

export default function SoundWaveAnimation() {
    const [isMounted, setIsMounted] = useState(false);
    // Generate stable IDs for the elements
    const baseId = useId();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="flex items-end space-x-1">
            {[...Array(10)].map((_, index) => {
                const elementId = `${baseId}-wave-${index}`;
                return (
                    <div
                        key={elementId}
                        className={`w-4 bg-white rounded-t-full ${isMounted
                                ? `sound-wave-bar sound-wave-${index % 5 + 1}`
                                : ''
                            }`}
                        style={{ height: isMounted ? undefined : `${20 + (index % 3) * 10}px` }}
                    />
                );
            })}
        </div>
    );
}