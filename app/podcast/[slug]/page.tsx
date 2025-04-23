// app/podcast/[slug]/page.tsx
import { getPodcastBySlug } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const generateMetadata = async ({ params }: { params: { slug: string } }) => {
    const podcast = await getPodcastBySlug(params.slug);

    if (!podcast) {
        return {
            title: 'Podcast Bulunamadı',
        };
    }

    return {
        title: `${podcast.title} | Podcast`,
        description: podcast.description,
    };
};

export default async function PodcastDetail({ params }: { params: { slug: string } }) {
    const podcast = await getPodcastBySlug(params.slug);

    if (!podcast) {
        notFound();
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 w-full h-full bg-center bg-cover"
                    style={{
                        backgroundImage: `url(${podcast.coverImage ? urlFor(podcast.coverImage).url() : 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070'})`,
                    }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/30"></div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-end px-4 sm:px-6 lg:px-8 pb-16 max-w-7xl mx-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {podcast.categories?.map((category: any) => (
                            <span key={category.id} className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">
                                {category.name}
                            </span>
                        ))}
                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs">
                            {podcast.duration}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl">{podcast.title}</h1>

                    <p className="text-lg text-white/70 mb-6 max-w-3xl">{podcast.description}</p>

                    <div className="flex flex-wrap items-center gap-6">
                        {/* Host Info */}
                        <div className="flex items-center gap-4">
                            <div className="flex -space-x-2">
                                {podcast.hosts?.map((host: any, index: number) => (
                                    <div key={index} className="relative w-10 h-10 rounded-full border-2 border-black overflow-hidden">
                                        {host.image ? (
                                            <img
                                                src={urlFor(host.image).width(100).height(100).url()}
                                                alt={host.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                                                <span className="text-xs">{host.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p className="text-sm text-white/70">Sunucu{podcast.hosts?.length > 1 ? 'lar' : ''}</p>
                                <p className="font-medium">
                                    {podcast.hosts?.map((host: any) => host.name).join(', ')}
                                </p>
                            </div>
                        </div>

                        {/* Published Date */}
                        <div>
                            <p className="text-sm text-white/70">Yayınlanma Tarihi</p>
                            <p className="font-medium">{formatDate(podcast.publishedAt)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content - Transcript */}
                    <div className="lg:col-span-2">
                        <div className="mb-12">
                            <div className="mb-8">
                                <h2 className="text-3xl font-bold mb-6">Bölüm Transkripti</h2>
                                <div className="w-16 h-1 bg-yellow-500 mb-8"></div>
                            </div>

                            {podcast.transcript ? (
                                <div className="prose prose-invert prose-yellow max-w-none">
                                    <PortableText value={podcast.transcript} />
                                </div>
                            ) : (
                                <div className="bg-white/5 p-8 rounded-xl text-center">
                                    <p className="text-xl text-white/70">Bu bölüm için transkript henüz eklenmemiştir.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-12">
                        {/* Audio Player Section */}
                        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Podcast'i Dinle</h3>
                            <div className="space-y-4">
                                {Object.entries(podcast.platforms || {}).map(([platform, url]: [string, any]) => {
                                    if (!url) return null;

                                    const getPlatformInfo = (platform: string) => {
                                        switch (platform) {
                                            case 'spotify':
                                                return {
                                                    name: 'Spotify',
                                                    icon: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                                            <path d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75c-0.5,0.15-1-0.15-1.15-0.6c-0.15-0.5,0.15-1,0.6-1.15 c3.55-1.05,9.4-0.85,13.1,1.35c0.45,0.25,0.6,0.85,0.35,1.3C19.95,11 19.35,11.15,17.9,10.9z M16.8,13.9 c-0.25,0.35-0.7,0.5-1.05,0.25c-2.7-1.65-6.8-2.15-9.95-1.15c-0.4,0.1-0.85-0.1-0.95-0.5c-0.1-0.4,0.1-0.85,0.5-0.95 c3.65-1.1,8.15-0.6,11.25,1.35C16.9,13.1,17.05,13.55,16.8,13.9z M15.9,16.9c-0.2,0.3-0.55,0.4-0.85,0.2 c-2.35-1.45-5.3-1.75-8.8-0.95c-0.35,0.05-0.65-0.15-0.75-0.45c-0.1-0.35,0.15-0.65,0.45-0.75c3.8-0.85,7.1-0.5,9.7,1.1 C16,16.25,16.1,16.6,15.9,16.9z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z"></path>
                                                        </svg>
                                                    )
                                                };
                                            case 'applePodcasts':
                                                return {
                                                    name: 'Apple Podcasts',
                                                    icon: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-6 h-6 fill-current">
                                                            <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 12.986328 A 1.0001 1.0001 0 0 0 24 14 L 24 26.5 A 1.0001 1.0001 0 0 0 24.5 27.5 L 32.5 31.5 A 1.0001 1.0001 0 0 0 33.521484 31.060547 A 1.0001 1.0001 0 0 0 33 30 L 33 17.5 A 1.0001 1.0001 0 0 0 32.5 16.5 L 25.5 12.986328 A 1.0001 1.0001 0 0 0 24.984375 12.986328 z"></path>
                                                        </svg>
                                                    )
                                                };
                                            case 'googlePodcasts':
                                                return {
                                                    name: 'Google Podcasts',
                                                    icon: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                                            <path d="M12 0L8 4H4v4L0 12l4 4v4h4l4 4 4-4h4v-4l4-4-4-4V4h-4L12 0zm0 8a4 4 0 110 8 4 4 0 010-8z" />
                                                        </svg>
                                                    )
                                                };
                                            case 'youtube':
                                                return {
                                                    name: 'YouTube',
                                                    icon: (
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                                                            <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
                                                        </svg>
                                                    )
                                                };
                                            default:
                                                return {
                                                    name: platform.charAt(0).toUpperCase() + platform.slice(1),
                                                    icon: null
                                                };
                                        }
                                    };

                                    const platformInfo = getPlatformInfo(platform);

                                    return (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
                                        >
                                            {platformInfo.icon && (
                                                <span className="text-white">
                                                    {platformInfo.icon}
                                                </span>
                                            )}
                                            <span>{platformInfo.name}</span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Highlights Section */}
                        {podcast.highlights && podcast.highlights.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">Öne Çıkan Anlar</h3>
                                <div className="space-y-4">
                                    {podcast.highlights.map((highlight: any, index: number) => (
                                        <div key={index} className="border-l-2 border-yellow-500 pl-4 py-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-medium">{highlight.title}</h4>
                                                <span className="text-sm bg-white/10 px-2 py-1 rounded text-white/70">
                                                    {highlight.timestamp}
                                                </span>
                                            </div>
                                            {highlight.description && (
                                                <p className="text-sm text-white/70">{highlight.description}</p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Guest Section */}
                        {podcast.guests && podcast.guests.length > 0 && (
                            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6">
                                <h3 className="text-lg font-semibold mb-4">Bölüm Konukları</h3>
                                <div className="space-y-4">
                                    {podcast.guests.map((guest: any, index: number) => (
                                        <div key={index} className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-700">
                                                {guest.image ? (
                                                    <img
                                                        src={urlFor(guest.image).width(100).height(100).url()}
                                                        alt={guest.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span>{guest.name.charAt(0)}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <h4 className="font-medium">{guest.name}</h4>
                                                {guest.title && (
                                                    <p className="text-sm text-white/70">{guest.title}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back to podcasts */}
                        <div className="pt-4">
                            <Link href="/podcast" className="inline-flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                                </svg>
                                Tüm podcastlere dön
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}