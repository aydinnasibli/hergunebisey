'use client';

import { useState, useEffect } from 'react';

export default function SoundWaveAnimation() {
    // Control mounting rather than conditional rendering
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // Mark component as mounted on client-side
        setIsMounted(true);
    }, []);

    // Render the bars with a consistent structure on both server and client
    return (
        <div className="flex items-end space-x-1">
            {[...Array(10)].map((_, index) => (
                <div
                    key={index}
                    className={`w-4 bg-white rounded-t-full ${
                        // Apply animation classes only after client mounting
                        isMounted
                            ? `sound-wave-bar sound-wave-${index % 5 + 1}`
                            : `h-${8 + (index % 3) * 4}` // Static but varied heights for server render
                        }`}
                    style={!isMounted ? { height: `${20 + (index % 3) * 10}px` } : {}}
                />
            ))}
        </div>
    );
}