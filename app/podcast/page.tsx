"use client"
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor, getPodcasts, getPodcastCategories } from '@/lib/sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
interface Podcast {
    _id: string;
    title: string;
    slug: { current: string };
    description?: string;
    coverImage?: SanityImageSource;
    duration?: string;
    publishedAt: string;
    categories?: Array<{ id: string, name: string }>;
    hosts?: Array<{ name: string, image?: SanityImageSource, position?: string }>;
}

interface Category {
    _id: string;
    id: string;
    name: string;
    description?: string;
}

const PodcastPage = () => {
    const [podcasts, setPodcasts] = useState<Podcast[]>([]);
    const [categoriesData, setCategoriesData] = useState<Category[]>([]);
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
    const parallaxRef = useRef<HTMLDivElement>(null);

    // Process categories data to include "All" option
    const categories = [
        { id: "all", name: "Tümü", _id: "all" },
        ...(categoriesData || [])
    ];

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedPodcasts = await getPodcasts();
                const fetchedCategories = await getPodcastCategories();

                setPodcasts(fetchedPodcasts || []); // Ensure we have an array even if API returns null
                setCategoriesData(fetchedCategories || []);
            } catch (error) {
                console.error('Error fetching podcast data:', error);
                // Set empty arrays to prevent errors when mapping
                setPodcasts([]);
                setCategoriesData([]);
            }
        };

        fetchData();
    }, []);

    // Filter podcasts when activeCategory or podcasts change
    useEffect(() => {
        if (activeCategory === 'all') {
            setFilteredPodcasts(podcasts);
        } else {
            const filtered = podcasts.filter(podcast =>
                podcast.categories && podcast.categories.some(cat => cat.id === activeCategory)
            );
            setFilteredPodcasts(filtered);
        }
    }, [activeCategory, podcasts]);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current) {
                const scrollPosition = window.scrollY;
                parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Platform links - these should be updated with your actual links
    const platforms = [
        {
            name: "Apple Podcasts",
            url: "https://podcasts.apple.com/your-podcast",
            icon: (
                <svg className="w-8 h-8 fill-current text-white" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier">
                    <path d="M7.12 0c-3.937-0.011-7.131 3.183-7.12 7.12v17.76c-0.011 3.937 3.183 7.131 7.12 7.12h17.76c3.937 0.011 7.131-3.183 7.12-7.12v-17.76c0.011-3.937-3.183-7.131-7.12-7.12zM15.817 3.421c3.115 0 5.932 1.204 8.079 3.453 1.631 1.693 2.547 3.489 3.016 5.855 0.161 0.787 0.161 2.932 0.009 3.817-0.5 2.817-2.041 5.339-4.317 7.063-0.812 0.615-2.797 1.683-3.115 1.683-0.12 0-0.129-0.12-0.077-0.615 0.099-0.792 0.192-0.953 0.64-1.141 0.713-0.296 1.932-1.167 2.677-1.911 1.301-1.303 2.229-2.932 2.677-4.719 0.281-1.1 0.244-3.543-0.063-4.672-0.969-3.595-3.907-6.385-7.5-7.136-1.041-0.213-2.943-0.213-4 0-3.636 0.751-6.647 3.683-7.563 7.371-0.245 1.004-0.245 3.448 0 4.448 0.609 2.443 2.188 4.681 4.255 6.015 0.407 0.271 0.896 0.547 1.1 0.631 0.447 0.192 0.547 0.355 0.629 1.14 0.052 0.485 0.041 0.62-0.072 0.62-0.073 0-0.62-0.235-1.199-0.511l-0.052-0.041c-3.297-1.62-5.407-4.364-6.177-8.016-0.187-0.943-0.224-3.187-0.036-4.052 0.479-2.323 1.396-4.135 2.921-5.739 2.199-2.319 5.027-3.543 8.172-3.543zM16 7.172c0.541 0.005 1.068 0.052 1.473 0.14 3.715 0.828 6.344 4.543 5.833 8.229-0.203 1.489-0.713 2.709-1.619 3.844-0.448 0.573-1.537 1.532-1.729 1.532-0.032 0-0.063-0.365-0.063-0.803v-0.808l0.552-0.661c2.093-2.505 1.943-6.005-0.339-8.296-0.885-0.896-1.912-1.423-3.235-1.661-0.853-0.161-1.031-0.161-1.927-0.011-1.364 0.219-2.417 0.744-3.355 1.672-2.291 2.271-2.443 5.791-0.348 8.296l0.552 0.661v0.813c0 0.448-0.037 0.807-0.084 0.807-0.036 0-0.349-0.213-0.683-0.479l-0.047-0.016c-1.109-0.885-2.088-2.453-2.495-3.995-0.244-0.932-0.244-2.697 0.011-3.625 0.672-2.505 2.521-4.448 5.079-5.359 0.547-0.193 1.509-0.297 2.416-0.281zM15.823 11.156c0.417 0 0.828 0.084 1.131 0.24 0.645 0.339 1.183 0.989 1.385 1.677 0.62 2.104-1.609 3.948-3.631 3.005h-0.015c-0.953-0.443-1.464-1.276-1.475-2.36 0-0.979 0.541-1.828 1.484-2.328 0.297-0.156 0.709-0.235 1.125-0.235zM15.812 17.464c1.319-0.005 2.271 0.463 2.625 1.291 0.265 0.62 0.167 2.573-0.292 5.735-0.307 2.208-0.479 2.765-0.905 3.141-0.589 0.52-1.417 0.667-2.209 0.385h-0.004c-0.953-0.344-1.157-0.808-1.553-3.527-0.452-3.161-0.552-5.115-0.285-5.735 0.348-0.823 1.296-1.285 2.624-1.291z"></path>
                </g></svg>
            )
        },
        {
            name: "Spotify",
            url: "https://open.spotify.com/show/your-podcast",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
                    <path d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75c-0.5,0.15-1-0.15-1.15-0.6c-0.15-0.5,0.15-1,0.6-1.15 c3.55-1.05,9.4-0.85,13.1,1.35c0.45,0.25,0.6,0.85,0.35,1.3C19.95,11 19.35,11.15,17.9,10.9z M16.8,13.9 c-0.25,0.35-0.7,0.5-1.05,0.25c-2.7-1.65-6.8-2.15-9.95-1.15c-0.4,0.1-0.85-0.1-0.95-0.5c-0.1-0.4,0.1-0.85,0.5-0.95 c3.65-1.1,8.15-0.6,11.25,1.35C16.9,13.1,17.05,13.55,16.8,13.9z M15.9,16.9c-0.2,0.3-0.55,0.4-0.85,0.2 c-2.35-1.45-5.3-1.75-8.8-0.95c-0.35,0.05-0.65-0.15-0.75-0.45c-0.1-0.35,0.15-0.65,0.45-0.75c3.8-0.85,7.1-0.5,9.7,1.1 C16,16.25,16.1,16.6,15.9,16.9z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z"></path>
                </svg>
            )
        },
        {
            name: "Youtube",
            url: "https://open.youtube.com/show/your-podcast",
            icon: (
                <svg className='w-9 h-9 text-white fill-current' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49" ><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M39.256,6.5H9.744C4.371,6.5,0,10.885,0,16.274v16.451c0,5.39,4.371,9.774,9.744,9.774h29.512 c5.373,0,9.744-4.385,9.744-9.774V16.274C49,10.885,44.629,6.5,39.256,6.5z M47,32.726c0,4.287-3.474,7.774-7.744,7.774H9.744 C5.474,40.5,2,37.012,2,32.726V16.274C2,11.988,5.474,8.5,9.744,8.5h29.512c4.27,0,7.744,3.488,7.744,7.774V32.726z"></path> <path d="M33.36,24.138l-13.855-8.115c-0.308-0.18-0.691-0.183-1.002-0.005S18,16.527,18,16.886v16.229 c0,0.358,0.192,0.69,0.502,0.868c0.154,0.088,0.326,0.132,0.498,0.132c0.175,0,0.349-0.046,0.505-0.137l13.855-8.113 c0.306-0.179,0.495-0.508,0.495-0.863S33.667,24.317,33.36,24.138z M20,31.37V18.63l10.876,6.371L20,31.37z"></path> </g> </g> </g></svg>
            )
        },
    ];



    // Format date to Turkish
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };

    return (
        <div className="relative w-full">
            {/* Hero Section with Parallax */}
            <div className="relative h-screen overflow-hidden">
                {/* Parallax Background */}
                <div
                    ref={parallaxRef}
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '120%',
                        top: '-10%'
                    }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10"></div>

                {/* Content */}
                <div className="relative z-20 h-full text-white flex flex-col justify-center items-center px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-8 tracking-wide">
                            PODCAST<span className="text-yellow-500">.</span>
                        </h1>

                        <p className="text-base sm:text-xl max-w-2xl mx-auto mb-12 text-white/90">
                            Farklı konseptler ile sohbet kıvamındaki podcast yayınlarımız yolda, sporda ya da evde- her anınıza eşlik etmek için burada.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 mt-10">
                            {platforms.map((platform, index) => (
                                <a
                                    key={index}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-md hover:bg-white/10 transition-all duration-300 rounded-full"
                                >
                                    {platform.icon}
                                    <span>{platform.name}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                        <p className="text-sm uppercase tracking-widest mb-2">Aşağı Kaydır</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Featured Shows Section */}
            <div
                className="relative text-white py-24 overflow-hidden bg-black"

            >
                <div className="container mx-auto px-4 relative z-10">
                    <div className="mb-16 text-center">
                        <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">KATEGORİLER</h2>
                        <p className="text-lg max-w-2xl mx-auto text-white/80">
                            Birbirinden farklı kategorilerde hazırladığımız podcast yayınlarımız geniş bir yelpazede ilgi çekici konuları ele alıyor.
                        </p>

                        {/* Category filters */}
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-6 py-2 sm:px-8 sm:py-3 border cursor-pointer border-white rounded-2xl  tracking-wider text-xs sm:text-sm hover:bg-gray-200 group-hover:scale-110 hover:text-black transition-colors duration-300 ${activeCategory === category.id
                                        ? 'bg-white text-black'
                                        : 'bg-white/10  hover:bg-white'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Podcast Grid */}
                    {filteredPodcasts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredPodcasts.map((podcast) => (
                                <div
                                    key={podcast._id}
                                    className="relative rounded-xl overflow-hidden border border-white/30 group hover:shadow-xl hover:shadow-white/20  transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                                >
                                    {/* Cover Image with Overlay */}
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        {podcast.coverImage ? (
                                            <Image
                                                src={urlFor(podcast.coverImage).url()}
                                                alt={podcast.title}
                                                fill
                                                className="object-cover transition-transform duration-500"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                priority={true}
                                            />
                                        ) : (
                                            <Image
                                                src="/images/podcast-placeholder.jpg" // Consider using a local placeholder image
                                                alt={podcast.title}
                                                fill
                                                className="object-cover transition-transform duration-500 "
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        )}

                                        {/* Duration Badge - Positioned on the image */}
                                        {podcast.duration && (
                                            <span className="absolute top-4 right-4 px-3 py-1 bg-yellow-500 text-black rounded-full text-xs font-medium">
                                                {podcast.duration}
                                            </span>
                                        )}
                                    </div>

                                    {/* Content Area */}
                                    <div className="relative p-6 flex flex-col flex-grow ">
                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {podcast.categories && podcast.categories.map((cat) => (
                                                <span
                                                    key={cat.id}
                                                    className=" select-none px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300 hover:bg-gray-700 transition-colors"
                                                >
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Title with hover effect */}
                                        <Link href={`/podcast/${podcast.slug.current}`} className="text-xl font-bold mb-2 hover:text-white/60  duration-300 transition-colors">
                                            {podcast.title}
                                        </Link>

                                        {/* Description with line clamp for consistent height */}
                                        {podcast.description && (
                                            <p className="text-gray-400 mb-4 line-clamp-3">
                                                {podcast.description}
                                            </p>
                                        )}

                                        {/* Date and Actions - at the bottom */}
                                        <div className="mt-auto">
                                            <p className="text-gray-300/90 text-sm mb-4">
                                                {formatDate(podcast.publishedAt)}
                                            </p>

                                            <div className="flex items-center gap-3">
                                                {/* Details link */}
                                                <Link
                                                    href={`/podcast/${podcast.slug.current}`}
                                                    className="flex-grow px-4 py-2 bg-transparent border border-white text-white rounded-lg text-sm font-medium text-center hover:bg-white hover:text-black transition-colors duration-300"
                                                >
                                                    Daha Fazla
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty state */}
                    {filteredPodcasts.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-700 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                            <h3 className="text-xl font-medium mb-2">No podcasts found</h3>
                            <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Call to Action Section */}
            <div className="relative bg-black text-white py-20 overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute right-0 top-0 w-full h-full overflow-hidden">
                        <svg viewBox="0 0 400 400" className="absolute right-0 top-0 w-full h-full opacity-20">
                            <defs>
                                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#smallGrid)" />
                        </svg>
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="rounded-2xl overflow-hidden bg-gradient-to-r from-yellow-500/20 to-black/70 backdrop-blur-md p-12 md:p-16">
                        <div className="max-w-4xl mx-auto text-center">
                            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-2">
                                Bizi <span className="text-yellow-500">favori</span> platforumunuzda
                            </h2>
                            <h2 className='text-4xl md:text-5xl font-bold mb-2'>
                                takip edin<span className=' text-yellow-500'>.</span>
                            </h2>
                            <p className="text-lg text-white/80 mb-12">
                                Yeni bölümlerden haberdar olmak ve podcastlerimizi dilediğiniz zaman dinlemek için
                                tercih ettiğiniz podcast platformunda bizi takip etmeyi unutmayın.
                            </p>

                            <div className="flex flex-wrap justify-center gap-6">
                                {platforms.map((platform, index) => (
                                    <a
                                        key={index}
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 transition-all duration-300 rounded-full"
                                    >
                                        {platform.icon}
                                        <span className="font-medium">{platform.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PodcastPage;