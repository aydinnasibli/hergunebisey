"use client"
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

const PodcastPage = () => {
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const parallaxRef = useRef<HTMLDivElement>(null);

    // Categories for filter
    const categories = [
        { id: "all", name: "Tümü" },
        { id: "culture", name: "Kültür" },
        { id: "tech", name: "Teknoloji" },
        { id: "science", name: "Bilim" },
        { id: "personal", name: "Kişisel Gelişim" }
    ];

    // Platform links
    const platforms = [
        {
            name: "Apple Podcasts",
            url: "https://podcasts.apple.com/your-podcast",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 fill-current text-white">
                    <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 12.986328 A 1.0001 1.0001 0 0 0 24 14 L 24 26.5 A 1.0001 1.0001 0 0 0 24.5 27.5 L 32.5 31.5 A 1.0001 1.0001 0 0 0 33.521484 31.060547 A 1.0001 1.0001 0 0 0 33 30 L 33 17.5 A 1.0001 1.0001 0 0 0 32.5 16.5 L 25.5 12.986328 A 1.0001 1.0001 0 0 0 24.984375 12.986328 z"></path>
                </svg>
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
            name: "Google Podcasts",
            url: "https://podcasts.google.com/feed/your-podcast",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
                    <path d="M12 0C8.068 0 4.733 2.156 3.106 5.334h6.12a.773.773 0 0 1 .775.776c0 .427-.348.774-.775.774H2.17c-.247.67-.422 1.366-.503 2.101h3.559a.774.774 0 0 1 0 1.55H1.55c.017.713.102 1.407.252 2.082h4.924a.774.774 0 0 1 0 1.55H2.172c.254.7.583 1.36.976 1.97h7.703a.773.773 0 0 1 .776.776.773.773 0 0 1-.776.775H3.504C5.091 21.066 8.278 23.25 12 23.25s6.91-2.184 8.496-5.344h-7.703a.773.773 0 0 1-.776-.776c0-.427.348-.775.776-.775h7.703c.393-.61.722-1.27.976-1.97h-4.924a.774.774 0 0 1 0-1.55h4.925c.15-.675.234-1.37.252-2.082h-5.177a.774.774 0 0 1 0-1.55h5.177a10.245 10.245 0 0 0-.503-2.101h-7.054a.773.773 0 0 1-.776-.774c0-.428.348-.776.776-.776h6.12C19.267 2.156 15.932 0 12 0zm0 8.5c.62 0 1.118.5 1.118 1.124v4.752c0 .624-.499 1.124-1.118 1.124-.62 0-1.118-.5-1.118-1.124V9.624c0-.624.499-1.124 1.118-1.124zm3.5.05c.604 0 1.083.548 1.083 1.192v4.516c0 .644-.479 1.192-1.083 1.192-.604 0-1.083-.548-1.083-1.192V9.742c0-.644.479-1.192 1.083-1.192zm-7 0c.604 0 1.083.548 1.083 1.192v4.516c0 .644-.479 1.192-1.083 1.192-.604 0-1.083-.548-1.083-1.192V9.742c0-.644.479-1.192 1.083-1.192zm10.5.05c.589 0 1.059.595 1.059 1.317v4.066c0 .722-.47 1.317-1.059 1.317-.589 0-1.059-.595-1.059-1.317V9.917c0-.722.47-1.317 1.059-1.317zm-14 0c.589 0 1.059.595 1.059 1.317v4.066c0 .722-.47 1.317-1.059 1.317-.589 0-1.059-.595-1.059-1.317V9.917c0-.722.47-1.317 1.059-1.317z"></path>
                </svg>
            )
        },
        {
            name: "Anchor",
            url: "https://anchor.fm/your-podcast",
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
                    <path d="M12 22a10 10 0 0 1-10-10 10 10 0 0 1 10-10 10 10 0 0 1 10 10 10 10 0 0 1-10 10m0-2a8 8 0 0 0 8-8 8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8m-2.25-10.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M13 16l5-5-1.41-1.42L13 13.17l-2.59-2.59L9 12m0-4.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0"></path>
                </svg>
            )
        }
    ];

    // Featured shows (showcase-only, not episodes)
    const featuredShows = [
        {
            id: 1,
            title: "Bilim ve Sanat",
            description: "Bilim dünyasının en yeni keşiflerini ve sanat dünyasındaki gelişmeleri ele alıyoruz.",
            image: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=2070",
            categories: ["science", "culture"],
            duration: "45-60 dk"
        },
        {
            id: 2,
            title: "Teknoloji Bugün",
            description: "Güncel teknoloji trendlerini ve dijital dünyadan en son haberleri değerlendiriyoruz.",
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070",
            categories: ["tech"],
            duration: "30-45 dk"
        },
        {
            id: 3,
            title: "Kişisel Dönüşüm",
            description: "Uzmanlarla kişisel gelişim, mindfulness ve daha dengeli bir yaşam üzerine sohbetler.",
            image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080",
            categories: ["personal"],
            duration: "40-50 dk"
        },
        {
            id: 4,
            title: "Kültür Koridoru",
            description: "Edebiyattan sinemaya, müzikten tiyatroya kültür dünyasına geniş bir bakış.",
            image: "https://images.unsplash.com/photo-1533621373733-daa8a4477a98?q=80&w=2074",
            categories: ["culture"],
            duration: "50-65 dk"
        }
    ];

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

    // Filter shows by category
    const filteredShows = activeCategory === 'all'
        ? featuredShows
        : featuredShows.filter(show => show.categories.includes(activeCategory));

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

                        <p className="text-lg max-w-2xl mx-auto mb-12 text-white/90">
                            Uzmanlarla derinlemesine sohbetler, ilham verici hikayeler ve Türkiye'nin gündemine
                            farklı bakış açıları sunan podcast yayınlarımız yolda, sporda veya evde -
                            her anınıza eşlik etmek için burada.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 mt-10">
                            {platforms.map((platform, index) => (
                                <a
                                    key={index}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-6 py-3 bg-black/40 backdrop-blur-md hover:bg-black/60 transition-all duration-300 rounded-full"
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

            {/* About Podcast Section */}
            <div className="relative bg-black text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '10%', left: '-5%' }}>
                        PODCAST
                    </div>
                    <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '50%', left: '20%' }}>
                        DİNLE KEŞFET
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="w-full lg:w-1/2">
                            <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">PODCASTLERİMİZ</h2>
                            <p className="text-lg text-white/80 mb-6">
                                Hergünebi'şey podcastleri, günlük hayatınıza ilham, bilgi ve değer katmak için
                                titizlikle hazırlanan sesli içeriklerdir. Teknolojiden bilime, kültürden kişisel
                                gelişime kadar farklı alanlarda uzman konuklarımızla gerçekleştirdiğimiz
                                sohbetleri sizlerle buluşturuyoruz.
                            </p>
                            <p className="text-lg text-white/80 mb-8">
                                İster yolculukta, ister sporda, isterseniz günün yorgunluğunu atarken dinleyebileceğiniz
                                podcastlerimiz, sizlere farklı bakış açıları kazandırmayı ve bilgi dağarcığınızı
                                zenginleştirmeyi amaçlıyor.
                            </p>

                            {/* Audio Player Demo */}
                            <div className="w-full bg-white/5 backdrop-blur-sm p-4 rounded-lg mb-8">
                                <div className="flex items-center gap-4">
                                    <button className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-400 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                        </svg>
                                    </button>

                                    <div className="flex-1">
                                        <p className="text-sm text-yellow-500 mb-1">ŞİMDİ DİNLE</p>
                                        <h3 className="text-lg font-medium mb-1">Son Bölüm: Teknolojinin Geleceği</h3>
                                        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                            <div className="w-1/3 h-full bg-yellow-500"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <div className="relative">
                                {/* Decorative rings */}
                                <div className="absolute inset-0 rounded-full border-4 border-yellow-500/10 animate-pulse"></div>
                                <div className="absolute inset-0 scale-125 rounded-full border-4 border-yellow-500/5"></div>

                                {/* Main image */}
                                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl">
                                    <img
                                        src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070"
                                        alt="Podcast stüdyosu"
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end p-6">
                                        <div>
                                            <div className="w-8 h-1 bg-yellow-500 mb-2"></div>
                                            <h3 className="text-2xl font-bold mb-2">Profesyonel Stüdyo</h3>
                                            <p className="text-white/80">En yüksek ses kalitesi için profesyonel stüdyo ortamında kayıt</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Microphone icon */}
                                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg z-20">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Shows Section */}
            <div
                className="relative text-white py-24 overflow-hidden"
                style={{
                    background: "linear-gradient(to bottom, #000000, #0f172a)"
                }}
            >
                <div className="container mx-auto px-4 relative z-10">
                    <div className="mb-16 text-center">
                        <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
                        <h2 className="text-4xl md:text-6xl font-bold mb-8">PROGRAMLARIMIZ</h2>
                        <p className="text-lg max-w-2xl mx-auto text-white/80">
                            Her biri kendi alanında uzman konuklarla hazırladığımız podcast programlarımız,
                            geniş bir yelpazede ilgi çekici konuları ele alıyor.
                        </p>

                        {/* Category filters */}
                        <div className="flex flex-wrap justify-center gap-4 mt-10">
                            {categories.map(category => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-6 py-2 rounded-full transition-all duration-300 ${activeCategory === category.id
                                        ? 'bg-yellow-500 text-black'
                                        : 'bg-white/10 hover:bg-white/20'
                                        }`}
                                >
                                    {category.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Shows grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {filteredShows.map(show => (
                            <div
                                key={show.id}
                                className="relative rounded-xl overflow-hidden group hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="absolute inset-0">
                                    <img
                                        src={show.image}
                                        alt={show.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                                </div>

                                <div className="relative p-8 flex flex-col h-full min-h-80">
                                    <div className="flex-1">
                                        <div className="flex gap-2 mb-3">
                                            {show.categories.map(cat => {
                                                const categoryObj = categories.find(c => c.id === cat);
                                                return (
                                                    <span key={cat} className="px-3 py-1 bg-white/10 rounded-full text-xs">
                                                        {categoryObj?.name || cat}
                                                    </span>
                                                );
                                            })}
                                            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs">
                                                {show.duration}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-2">{show.title}</h3>
                                        <p className="text-white/70 mb-6">{show.description}</p>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <button className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-400 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                            </svg>
                                        </button>

                                        <Link
                                            href={`/podcast/${show.id}`}
                                            className="px-6 py-3 bg-transparent border border-yellow-500 text-yellow-500 rounded-full uppercase tracking-widest text-xs font-medium hover:bg-yellow-500 hover:text-black transition-colors duration-300"
                                        >
                                            Daha Fazla Bilgi
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                                Favorite <span className="text-yellow-500">platformunuzda</span> bizi takip edin
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