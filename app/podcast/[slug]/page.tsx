// app/podcast/[slug]/page.tsx
"use client"
import { useState, useEffect } from 'react';
import { use } from 'react'; // Import React.use
import Image from 'next/image';
import Link from 'next/link';
import { getPodcastBySlug, urlFor } from '@/lib/sanity';
import { Podcast } from '@/types/sanity';
import { PortableText } from '@portabletext/react';

export default function PodcastDetailPage({ params }: { params: { slug: string } }) {
    // Unwrap the params Promise with React.use()
    const unwrappedParams = use(params);
    const slug = unwrappedParams.slug;

    const [podcast, setPodcast] = useState<Podcast | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const fetchPodcast = async () => {
            try {
                setIsLoading(true);
                const fetchedPodcast = await getPodcastBySlug(slug);
                setPodcast(fetchedPodcast);
            } catch (error) {
                console.error('Error fetching podcast:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPodcast();
    }, [slug]);

    // Format date to Turkish
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="relative w-full min-h-screen bg-black text-white p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="w-16 h-1 bg-yellow-500 mb-8"></div>
                    <div className="h-10 w-64 bg-white/10 animate-pulse mb-12"></div>

                    <div className="h-80 bg-white/5 rounded-xl animate-pulse mb-12"></div>
                    <div className="space-y-4">
                        <div className="h-6 bg-white/10 animate-pulse w-3/4"></div>
                        <div className="h-6 bg-white/10 animate-pulse w-1/2"></div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (!podcast) {
        return (
            <div className="relative w-full min-h-screen bg-black text-white p-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-3xl font-bold mb-4">Podcast bulunamadı</h1>
                    <p className="mb-8">Aradığınız podcast bulunamadı veya mevcut değil.</p>
                    <Link
                        href="/podcast"
                        className="px-6 py-3 bg-yellow-500 text-black rounded-full hover:bg-yellow-400 transition-colors"
                    >
                        Tüm Podcastlere Dön
                    </Link>
                </div>
            </div>
        );
    }

    const {
        title,
        description,
        coverImage,
        publishedAt,
        duration,
        categories,
        hosts,
        guests,
        transcript,
        platforms
    } = podcast;

    return (
        <div className="bg-black text-white min-h-screen">
            {/* Hero Section */}
            <div className="relative h-screen">
                {/* Background Image */}
                <div className="absolute inset-0">
                    {coverImage ? (
                        <Image
                            src={urlFor(coverImage).url()}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <Image
                            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070"
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/50"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4">
                    <div className="max-w-4xl">
                        <div className="w-16 h-1 bg-yellow-500 mb-8"></div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {categories?.map((cat) => (
                                <span key={cat.id} className="px-3 py-1 bg-white/10 rounded-full text-xs">
                                    {cat.name}
                                </span>
                            ))}
                            {duration && (
                                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">
                                    {duration}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{title}</h1>
                        <p className="text-xl text-white/80 mb-8">{description}</p>

                        <div className="flex flex-wrap items-center gap-6 mb-12">
                            <div>
                                <div className="text-sm text-white/60 mb-1">
                                    Yayınlanma Tarihi: {formatDate(publishedAt)}
                                </div>
                                <div className="text-sm text-white/60">
                                    Süre: {duration}
                                </div>
                            </div>
                        </div>

                        {/* Platform Links */}
                        {platforms && Object.values(platforms).some(url => url) && (
                            <div className="mb-12">
                                <h3 className="text-lg font-medium mb-4">Dinle:</h3>
                                <div className="flex flex-wrap gap-4">
                                    {platforms.spotify && (
                                        <a
                                            href={platforms.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 rounded-full border border-white/20"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white">
                                                <path d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75c-0.5,0.15-1-0.15-1.15-0.6c-0.15-0.5,0.15-1,0.6-1.15 c3.55-1.05,9.4-0.85,13.1,1.35c0.45,0.25,0.6,0.85,0.35,1.3C19.95,11 19.35,11.15,17.9,10.9z M16.8,13.9 c-0.25,0.35-0.7,0.5-1.05,0.25c-2.7-1.65-6.8-2.15-9.95-1.15c-0.4,0.1-0.85-0.1-0.95-0.5c-0.1-0.4,0.1-0.85,0.5-0.95 c3.65-1.1,8.15-0.6,11.25,1.35C16.9,13.1,17.05,13.55,16.8,13.9z M15.9,16.9c-0.2,0.3-0.55,0.4-0.85,0.2 c-2.35-1.45-5.3-1.75-8.8-0.95c-0.35,0.05-0.65-0.15-0.75-0.45c-0.1-0.35,0.15-0.65,0.45-0.75c3.8-0.85,7.1-0.5,9.7,1.1 C16,16.25,16.1,16.6,15.9,16.9z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z"></path>
                                            </svg>
                                            <span>Spotify</span>
                                        </a>
                                    )}
                                    {platforms.applePodcasts && (
                                        <a
                                            href={platforms.applePodcasts}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 rounded-full border border-white/20"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 fill-current text-white">
                                                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 12.986328 A 1.0001 1.0001 0 0 0 24 14 L 24 26.5 A 1.0001 1.0001 0 0 0 24.5 27.5 L 32.5 31.5 A 1.0001 1.0001 0 0 0 33.521484 31.060547 A 1.0001 1.0001 0 0 0 33 30 L 33 17.5 A 1.0001 1.0001 0 0 0 32.5 16.5 L 25.5 12.986328 A 1.0001 1.0001 0 0 0 24.984375 12.986328 z"></path>
                                            </svg>
                                            <span>Apple Podcasts</span>
                                        </a>
                                    )}
                                    {platforms.googlePodcasts && (
                                        <a
                                            href={platforms.googlePodcasts}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 rounded-full border border-white/20"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white">
                                                <path d="M12 0a1 1 0 0 0-1 1v22a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1zm-8 7a1 1 0 0 0-1 1v8a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zm16 0a1 1 0 0 0-1 1v8a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1zM8 4a1 1 0 0 0-1 1v14a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1zm8 0a1 1 0 0 0-1 1v14a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1z" />
                                            </svg>
                                            <span>Google Podcasts</span>
                                        </a>
                                    )}
                                    {platforms.youtube && (
                                        <a
                                            href={platforms.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 rounded-full border border-white/20"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current text-white">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                            </svg>
                                            <span>YouTube</span>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="bg-black">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left Column: Hosts & Guests */}
                        <div className="lg:col-span-1">
                            {/* Hosts */}
                            {hosts && hosts.length > 0 && (
                                <div className="mb-12">
                                    <h2 className="text-2xl font-bold mb-6">Sunucular</h2>
                                    <div className="space-y-8">
                                        {hosts.map((host, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                {host.image && (
                                                    <div className="w-16 h-16 rounded-full overflow-hidden">
                                                        <Image
                                                            src={urlFor(host.image).width(200).height(200).url()}
                                                            alt={host.name}
                                                            width={64}
                                                            height={64}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-medium">{host.name}</h3>
                                                    {host.position && (
                                                        <p className="text-sm text-white/60">{host.position}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Guests */}
                            {guests && guests.length > 0 && (
                                <div>
                                    <h2 className="text-2xl font-bold mb-6">Konuklar</h2>
                                    <div className="space-y-8">
                                        {guests.map((guest, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                {guest.image && (
                                                    <div className="w-16 h-16 rounded-full overflow-hidden">
                                                        <Image
                                                            src={urlFor(guest.image).width(200).height(200).url()}
                                                            alt={guest.name}
                                                            width={64}
                                                            height={64}
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                )}
                                                <div>
                                                    <h3 className="font-medium">{guest.name}</h3>
                                                    {guest.title && (
                                                        <p className="text-sm text-white/60">{guest.title}</p>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column: Transcript */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold mb-6">Transkript</h2>
                            {transcript ? (
                                <div className="prose prose-invert max-w-none">
                                    <PortableText value={transcript} />
                                </div>
                            ) : (
                                <div className="bg-white/5 p-8 rounded-xl">
                                    <p className="text-white/70">Bu bölüm için transkript bulunmamaktadır.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Podcasts Button */}
            <div className="container mx-auto px-4 py-12 text-center">
                <Link
                    href="/podcast"
                    className="px-8 py-4 bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full inline-flex items-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Tüm Podcastlere Dön
                </Link>
            </div>
        </div>
    );
}