'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ShareButtonsProps {
    title: string
    slug: string
}

export default function ShareButtons({ title, slug }: ShareButtonsProps) {
    const [showTooltip, setShowTooltip] = useState(false)
    const [baseUrl, setBaseUrl] = useState('')

    // Set the base URL on the client side to avoid SSR issues
    useEffect(() => {
        setBaseUrl(
            process.env.NEXT_PUBLIC_SITE_URL ||
            (typeof window !== 'undefined' ? window.location.origin : 'YOUR-ACTUAL-DOMAIN.COM')
        )
    }, [])

    const fullUrl = `${baseUrl}/blog/${slug}`

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(fullUrl)
            setShowTooltip(true)

            // Reset the tooltip after 2 seconds
            setTimeout(() => {
                setShowTooltip(false)
            }, 2000)
        } catch (err) {
            console.error('Failed to copy: ', err)
        }
    }

    const shareOptions = [
        {
            name: 'Twitter',
            color: '#1DA1F2',
            hoverColor: '#0c85d0',
            url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fullUrl)}`,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
            )
        },
        {
            name: 'Facebook',
            color: '#1877F2',
            hoverColor: '#0d6efd',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
                </svg>
            )
        },
        {
            name: 'LinkedIn',
            color: '#0A66C2',
            hoverColor: '#0a509c',
            url: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(fullUrl)}&title=${encodeURIComponent(title)}`,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                </svg>
            )
        },
        {
            name: 'WhatsApp',
            color: '#25D366',
            hoverColor: '#1da851',
            url: `https://wa.me/?text=${encodeURIComponent(`${title} - ${fullUrl}`)}`,
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.3-.15-1.263-.465-2.403-1.485-.888-.795-1.484-1.77-1.66-2.07-.174-.3-.019-.465.13-.615.136-.135.301-.345.451-.523.146-.181.194-.301.297-.496.1-.21.049-.375-.025-.524-.075-.15-.672-1.62-.922-2.206-.24-.584-.487-.51-.672-.51-.172-.015-.371-.015-.571-.015-.2 0-.523.074-.797.359-.273.3-1.045 1.02-1.045 2.475s1.07 2.865 1.219 3.075c.149.18 2.095 3.195 5.076 4.483.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.196-.57-.346m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
            )
        }
    ]

    return (
        <div className="pt-8 pb-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Paylaş</h3>
            <div className="flex flex-wrap gap-4">
                {/* Social Media Share Buttons */}
                {shareOptions.map((option) => (
                    <a
                        key={option.name}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center w-10 h-10 rounded-full text-white shadow-md transition-transform duration-300 hover:scale-110"
                        style={{ backgroundColor: option.color }}
                        aria-label={`Share on ${option.name}`}
                    >
                        <span className="absolute opacity-0 group-hover:opacity-100 -top-10 text-xs bg-gray-800 text-white px-2 py-1 rounded transition-opacity duration-300">
                            {option.name}
                        </span>
                        {option.icon}
                    </a>
                ))}

                {/* Copy Link Button */}
                <div className="relative">
                    <button
                        onClick={handleCopyLink}
                        className="relative flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full text-white shadow-md transition-transform duration-300 hover:scale-110 hover:bg-gray-900"
                        aria-label="Copy link"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-5 h-5"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                            />
                        </svg>
                    </button>

                    {/* Success Tooltip */}
                    {showTooltip && (
                        <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap"
                        >
                            Link kopyalandı!
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}