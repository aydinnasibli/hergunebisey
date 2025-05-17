// app/podcast/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { getPodcastBySlug, urlFor } from '@/lib/sanity';
import { Podcast } from '@/types/sanity';
import { PortableText } from '@portabletext/react';
import { Metadata } from 'next';
import podcastphoto from '@/public/assets/podcastbgphoto.webp'


export async function generateMetadata(
    { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
    // Fetch the podcast data
    const resolvedParams = await params;
    const podcast = await getPodcastBySlug(resolvedParams.slug);

    // If no podcast is found, return basic metadata
    if (!podcast) {
        return {
            title: 'Podcast Bulunamadı',
            description: 'Aradığınız podcast bulunamadı veya mevcut değil.',
        };
    }

    // Get the cover image URL if it exists
    const imageUrl = podcast.coverImage ? urlFor(podcast.coverImage).width(1200).height(630).url() : null;

    // Get the host and guest names for keywords
    const hostNames = podcast.hosts ? podcast.hosts.map((host) => host.name).join(', ') : '';
    const guestNames = podcast.guests ? podcast.guests.map((guest) => guest.name).join(', ') : '';

    // Get category names for keywords
    const categoryNames = podcast.categories ? podcast.categories.map((cat) => cat.name).join(', ') : '';

    // Create a list of keywords
    const keywords = [
        podcast.title,
        'podcast',
        hostNames,
        guestNames,
        categoryNames
    ].filter(Boolean).join(', ');

    // Return the metadata
    return {
        title: podcast.title,
        description: podcast.description,
        keywords: keywords,
        openGraph: {
            title: podcast.title,
            description: podcast.description,
            images: imageUrl ? [imageUrl] : [],
            type: 'article',
            publishedTime: podcast.publishedAt,
            authors: podcast.hosts ? podcast.hosts.map((host) => host.name) : [],
        },

        // Add structured data for podcast
        other: {
            'script:ld+json': JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'PodcastEpisode',
                'name': podcast.title,
                'description': podcast.description,
                'datePublished': podcast.publishedAt,
                'timeRequired': podcast.duration,
                'author': podcast.hosts ? podcast.hosts.map((host) => ({
                    '@type': 'Person',
                    'name': host.name
                })) : [],
                ...(podcast.coverImage && {
                    'image': urlFor(podcast.coverImage).url()
                })
            })
        }
    };
}

export default async function PodcastPage({ params }: { params: Promise<{ slug: string }> }) {
    // Server components can use async/await directly
    let podcast: Podcast | null = null;

    try {
        podcast = await getPodcastBySlug((await params).slug);
    } catch (error) {
        console.error('Error fetching podcast:', error);
    }


    // Format date to Turkish
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    // Error state
    if (!podcast) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white p-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Podcast bulunamadı</h1>
                    <p className="mb-8">Aradığınız podcast bulunamadı veya mevcut değil.</p>
                    <Link
                        href="/podcast"
                        className="inline-block px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-2xl tracking-wider text-xs sm:text-sm hover:bg-gray-200 hover:text-black transition-colors duration-300 cursor-pointer relative z-30"

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
                            src={podcastphoto}
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
                                            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300 rounded-full border border-white/20"
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
                                            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300 rounded-full border border-white/20"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 fill-current text-white">
                                                <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 12.986328 A 1.0001 1.0001 0 0 0 24 14 L 24 26.5 A 1.0001 1.0001 0 0 0 24.5 27.5 L 32.5 31.5 A 1.0001 1.0001 0 0 0 33.521484 31.060547 A 1.0001 1.0001 0 0 0 33 30 L 33 17.5 A 1.0001 1.0001 0 0 0 32.5 16.5 L 25.5 12.986328 A 1.0001 1.0001 0 0 0 24.984375 12.986328 z"></path>
                                            </svg>
                                            <span>Apple Podcasts</span>
                                        </a>
                                    )}
                                    {platforms.youtube && (
                                        <a
                                            href={platforms.youtube}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-black/40 backdrop-blur-md hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300 rounded-full border border-white/20"
                                        >
                                            <svg className="w-6 h-6 fill-current text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49">
                                                <g>
                                                    <path d="M39.256,6.5H9.744C4.371,6.5,0,10.885,0,16.274v16.451c0,5.39,4.371,9.774,9.744,9.774h29.512 c5.373,0,9.744-4.385,9.744-9.774V16.274C49,10.885,44.629,6.5,39.256,6.5z M47,32.726c0,4.287-3.474,7.774-7.744,7.774H9.744 C5.474,40.5,2,37.012,2,32.726V16.274C2,11.988,5.474,8.5,9.744,8.5h29.512c4.27,0,7.744,3.488,7.744,7.774V32.726z"></path>
                                                    <path d="M33.36,24.138l-13.855-8.115c-0.308-0.18-0.691-0.183-1.002-0.005S18,16.527,18,16.886v16.229 c0,0.358,0.192,0.69,0.502,0.868c0.154,0.088,0.326,0.132,0.498,0.132c0.175,0,0.349-0.046,0.505-0.137l13.855-8.113 c0.306-0.179,0.495-0.508,0.495-0.863S33.667,24.317,33.36,24.138z M20,31.37V18.63l10.876,6.371L20,31.37z"></path>
                                                </g>
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
                                    <h2 className="text-2xl text-yellow-500 font-bold mb-6">Sunucular</h2>
                                    <div className="space-y-8">
                                        {hosts.map((host, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                {host.image && (
                                                    <div className="w-12 h-12 rounded-full overflow-hidden">
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
                                    <h2 className="text-2xl text-yellow-500/80 font-bold mb-6">Konuklar</h2>
                                    <div className="space-y-8">
                                        {guests.map((guest, index) => (
                                            <div key={index} className="flex items-center gap-4">
                                                {guest.image && (
                                                    <div className="w-12 h-12 rounded-full overflow-hidden">
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
                            <h2 className="text-2xl text-yellow-500 font-bold mb-6">Transkript</h2>
                            {transcript ? (
                                <div className="prose text-white/80 prose-invert max-w-none">
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
                    className="inline-block px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-2xl tracking-wider text-xs sm:text-sm hover:bg-gray-200 hover:text-black transition-colors duration-300 cursor-pointer relative z-30"

                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    Geri Dön
                </Link>
            </div>
        </div>

    );
}