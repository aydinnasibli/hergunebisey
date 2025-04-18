'use client';

import { useState, useEffect } from 'react';

export default function SoundWaveAnimation() {
    // Start with a consistent initial state for server rendering
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Mark component as client-side rendered
        setIsClient(true);
    }, []);

    // Use CSS classes instead of inline random styles
    return (
        <div className="flex items-end space-x-1">
            {[...Array(10)].map((_, index) => (
                <div
                    key={index}
                    className={`w-4 bg-white rounded-t-full ${isClient
                        ? `sound-wave-bar sound-wave-${index % 5 + 1}`
                        : 'h-8' // Static height for server render
                        }`}
                />
            ))}
        </div>
    );
}