"use client"

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { throttle } from 'lodash';
import { Quicksand } from 'next/font/google';
import homepagebg from '@/public/assets/homepagebg.webp'
import homepage24 from '@/public/assets/homepage24.webp'
import homepage14 from '@/public/assets/homepage14.webp'
import homepage34 from '@/public/assets/homepage34.webp'
import homepage44 from '@/public/assets/homepage44.webp'
import homepageblog1 from '@/public/assets/homepageblog1.webp'
import homepageblog2 from '@/public/assets/homepageblog2.webp'
import homepageblog3 from '@/public/assets/homepageblog3.webp'
import homepageblog4 from '@/public/assets/homepageblog4.webp'
import homepageblog5 from '@/public/assets/homepageblog5.webp'
import podcastbgphoto from '@/public/assets/podcastbgphoto.webp'
const quicksand = Quicksand({
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"], // Ensure Latin characters are loaded
    variable: "--font-quicksand", // Set a CSS variable
});




const Home = () => {
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleClick = () => {
            // Simply mark as mobile if the user taps the screen
            if (!isMobile) {
                setIsMobile(true);
            }
        };

        // Add a one-time touch event listener to the document
        document.addEventListener('touchstart', handleClick, { once: true });

        // Cleanup
        return () => document.removeEventListener('touchstart', handleClick);
    }, [isMobile]);

    const handleQuoteClick = () => {
        // Toggle flip state on any device that registers a click
        setIsFlipped(!isFlipped);
    };


    useEffect(() => {
        const handleScroll = throttle(() => {
            if (parallaxRef.current) {
                const scrollPosition = window.scrollY;
                parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }
        }, 16); // ~60fps

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative w-full bg-black text-white">
            {/* Hero Section (with Parallax) */}
            <div className="relative h-screen overflow-hidden">
                {/* Parallax Background - Using position relative with Next.js Image */}
                <div ref={parallaxRef} className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-[120%]  -top-[8%]">
                        <Image
                            src={homepagebg}
                            alt="Hero background"
                            fill
                            priority
                            className="object-cover  object-center"
                            sizes="100vw"
                        />
                    </div>
                </div>

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>

                {/* Content */}
                <div className="relative z-20 h-full text-white flex flex-col justify-center items-center px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-16 h-1 bg-yellow-500 mx-auto mb-4 sm:mb-8"></div>
                        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 tracking-wide">
                            HERGÜNEBİ'ŞEY<span className="text-yellow-500">.</span>
                        </h1>
                        <p className="text-base sm:text-xl max-w-2xl mx-auto mb-6 sm:mb-12 text-white/90">
                            Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş <br /> dehalardan da alıntıların bulunduğu site.
                        </p>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-6 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                        <p className="text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">Aşağı Kaydır</p>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* About Us Section */}
            <div className="relative bg-black text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute text-9xl font-bold text-white whitespace-nowrap top-[10%] -left-[5%]">
                        BİLİM TEKNOLOJİ
                    </div>
                    <div className="absolute text-9xl font-bold text-white whitespace-nowrap top-[80%] left-[18%]">
                        KÜLTÜR TARİH
                    </div>
                </div>

                <div id='what-we-do' className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
                        <div className="w-full lg:w-1/2">
                            <div className="w-10 h-1 bg-yellow-500 mb-4 sm:mb-6"></div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-4 sm:mb-6">NELER YAPIYORUZ<span className="text-yellow-500">?</span></h2>
                            <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">
                                Bu sitede bilim, felsefe, tarih, teknoloji, kültür ve diğer pek çok farklı kategoride üç farklı formatta içerik paylaşıyoruz. Evrene kıyasla kısacık ömrümüzde elimizden geldiğince merakımızı gidermek amacıyla ilgimizi çeken hemen her konuda kendimizce bir şeyler yazıp çiziyoruz. Bu esnada da düşüncelerimizi kendimize saklamayıp ilgilenen herkesle de paylaşmaya çalışıyoruz.
                            </p>
                            <p className="text-base sm:text-lg text-white/80 mb-8 sm:mb-10">
                                Sitenin adının hergünebi'şey olmasının ise bir kıymeti var elbette. Her ne kadar her gün paylaşım yapmasak da mutlaka bir şeyler öğrenmeye, okumaya ve araştırmaya devam ediyoruz. Böylece her geçen gün iki bin gramlık heybemizde bir şeyler biriktirip kendi hayatımıza değer ve anlam katıyoruz.
                            </p>
                            <Link href="/about" className="px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-2xl  tracking-wider text-xs sm:text-sm hover:bg-gray-200 group-hover:scale-110 hover:text-black transition-colors duration-300">
                                Hikayemiz
                            </Link>
                        </div>
                        <div className="w-full lg:w-1/2 grid grid-cols-2 gap-2 sm:gap-4 mt-8 lg:mt-0">
                            <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={homepage14}
                                        alt="Blog yazıları"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                            <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden mt-6 sm:mt-12">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={homepage24}
                                        alt="Podcast kayıtları"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                            <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={homepage34}
                                        alt="İlham verici alıntılar"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                            <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden mt-6 sm:mt-12">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={homepage44}
                                        alt="Kültürel içerikler"
                                        fill
                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Blog Section */}
            <div className="relative bg-black text-white py-24 overflow-hidden">
                {/* Updated background pattern - subtle geometric shapes */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute w-full h-full">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                    <circle cx="2" cy="2" r="1" fill="white" />
                                </pattern>
                            </defs>
                            <rect width="100%" height="100%" fill="url(#dots)" />
                        </svg>
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className=" mx-auto">
                        <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
                        <h2 className="text-4xl md:text-6xl font-bold ">YAZI<span className="text-yellow-500">.</span></h2>

                        <div className="flex flex-col lg:flex-row gap-12 items-center">
                            <div className="w-full lg:w-1/2">
                                <p className="text-base sm:text-lg text-white/80 mb-10">
                                    Bilimsel teorilerden Antik Roma İmparatorluğu’na geniş bir yelpazede ele alınan konuları ile tüm yazılarımız kahve eşliğinde okumanız için sizleri bekliyor.
                                </p>

                                <div className="flex flex-wrap gap-3 mb-10">
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Düşünce</span>
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Bilim</span>
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Teknoloji</span>
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Felsefe</span>
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Tarih</span>
                                </div>

                                <Link
                                    href="/blog"
                                    className='px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-2xl  tracking-wider text-xs sm:text-sm hover:bg-gray-200 group-hover:scale-110 hover:text-black transition-colors duration-300'
                                >
                                    Yazılar

                                </Link>
                            </div>

                            <div className="w-full lg:w-1/2">
                                <div className="relative backdrop-blur-sm p-3 bg-white/5 rounded-lg">
                                    {/* Decorative accent */}
                                    <div className="absolute top-0 left-0 w-full h-full rounded-lg border border-yellow-500/20 -m-2 z-0"></div>

                                    {/* Image collage with rounded corners */}
                                    <div className="grid grid-cols-3 gap-3 relative z-10">
                                        <div className="col-span-2 h-64 overflow-hidden rounded-lg">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={homepageblog2}
                                                    alt="Blog teması"
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 66vw"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <div className="h-32 overflow-hidden rounded-lg">
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={homepageblog3}
                                                        alt="Blog yazısı"
                                                        fill
                                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                </div>
                                            </div>
                                            <div className="h-32 overflow-hidden rounded-lg">
                                                <div className="relative w-full h-full">
                                                    <Image
                                                        src={homepageblog1}
                                                        alt="Blog yazısı"
                                                        fill
                                                        className="object-cover hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-32 overflow-hidden rounded-lg">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={homepageblog4}
                                                    alt="Blog yazısı"
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        </div>
                                        <div className="h-32 col-span-2 overflow-hidden rounded-lg">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={homepageblog5}
                                                    alt="Blog yazısı"
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                                    sizes="(max-width: 768px) 100vw, 66vw"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Podcast Section */}
            <div className="relative w-full bg-black text-white py-32 overflow-hidden">

                {/* Updated background pattern - Footer translateX */}
                <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
                    <div className="absolute w-full h-16 bg-yellow-500 transform rotate-1 -translate-y-12"></div>
                </div>


                {/* Dynamic Background Waves */}
                <div className="absolute inset-0 opacity-100">

                    <svg
                        viewBox="0 0 1440 320"
                        className="absolute w-full"
                        style={{ top: '60%' }}
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="rgba(255,255,255,0.1)"
                            fillOpacity="0.5"
                            d="M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,128C672,128,768,192,864,202.7C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                        ></path>
                    </svg>
                </div>




                <div className="container  mx-auto px-4 relative z-10">
                    <div className="  mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            {/* Left Content */}
                            <div className="w-full md:w-1/2">
                                <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
                                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                                    PODCAST<span className="text-yellow-500">.</span>
                                </h2>
                                <p className="text-base sm:text-lg text-white/80 mb-8">
                                    Çeşitli konularda fikirlerimizi paylaştığımız podcast yayınlarımızda sohbetimize ortak  olmak için hemen dinlemeye başlayın.
                                </p>

                                <div className="flex flex-wrap gap-3 mb-10">
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Düşünce</span>
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Bilim</span>
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Teknoloji</span>
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Felsefe</span>
                                    <span className="px-4 py-2 rounded-full hover:text-black hover:bg-white hover:cursor-default bg-white/10 transform duration-300 text-sm">Tarih</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <Link
                                        href="/podcast"
                                        className="px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-2xl  tracking-wider text-xs sm:text-sm hover:bg-gray-200 group-hover:scale-110 hover:text-black transition-colors duration-300"
                                    >
                                        Podcast
                                    </Link>

                                </div>
                            </div>

                            {/* Right Content - New Design */}
                            <div className="w-full md:w-1/2 flex justify-center">
                                <div className="relative perspective-1000">
                                    {/* Album artwork with 3D effect */}
                                    <div className="w-80 h-80 relative transition-transform hover:rotate-y-10 hover:scale-105 cursor-pointer shadow-2xl">
                                        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-yellow-500 via-yellow-600 to-yellow-400 transform -rotate-6"></div>
                                        <div className="absolute inset-0 rounded-xl overflow-hidden transform rotate-3 border-2 border-white/20">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src={podcastbgphoto}
                                                    alt="Podcast Cover"
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            </div>
                                        </div>

                                        {/* Podcast controls overlay */}
                                        <div className="absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                                            <div className="text-lg font-bold">Yeni Bölüm</div>
                                            <div className="flex flex-col">
                                                <div className="text-sm opacity-80 mb-2">23:45</div>
                                                <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                                                    <div className="h-full w-2/3 bg-yellow-500 rounded-full"></div>
                                                </div>
                                                <div className="flex justify-between mt-4">
                                                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061c.75-.43 1.683.113 1.683.977v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061c.75-.43 1.683.113 1.683.977v8.122Z" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-3 rounded-full bg-white text-black hover:bg-yellow-500 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                                                        </svg>
                                                    </button>
                                                    <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative mic icon with animated rings */}
                                    <div className="absolute -bottom-8 -right-8 flex items-center justify-center">
                                        <div className="absolute w-16 h-16 rounded-full border border-gray-500/40 animate-ping-slow"></div>
                                        <div className="absolute w-20 h-20 rounded-full border border-gray-500/30 animate-ping-slow animation-delay-500"></div>
                                        <div className="absolute w-24 h-24 rounded-full border border-gray-500/20 animate-ping-slow animation-delay-1000"></div>
                                        <div className="w-12 h-12 rounded-full bg-black border border-gray-400 flex items-center justify-center shadow-lg z-10">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Platform logos - Updated with hover effects */}
                        <div className="mt-16 flex flex-wrap justify-center gap-8">
                            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 cursor-pointer group">
                                <svg className="w-7 h-7 fill-current text-white group-hover:text-[#b150e2] transition-colors"
                                    viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier">
                                        <path d="M7.12 0c-3.937-0.011-7.131 3.183-7.12 7.12v17.76c-0.011 3.937 3.183 7.131 7.12 7.12h17.76c3.937 0.011 7.131-3.183 7.12-7.12v-17.76c0.011-3.937-3.183-7.131-7.12-7.12zM15.817 3.421c3.115 0 5.932 1.204 8.079 3.453 1.631 1.693 2.547 3.489 3.016 5.855 0.161 0.787 0.161 2.932 0.009 3.817-0.5 2.817-2.041 5.339-4.317 7.063-0.812 0.615-2.797 1.683-3.115 1.683-0.12 0-0.129-0.12-0.077-0.615 0.099-0.792 0.192-0.953 0.64-1.141 0.713-0.296 1.932-1.167 2.677-1.911 1.301-1.303 2.229-2.932 2.677-4.719 0.281-1.1 0.244-3.543-0.063-4.672-0.969-3.595-3.907-6.385-7.5-7.136-1.041-0.213-2.943-0.213-4 0-3.636 0.751-6.647 3.683-7.563 7.371-0.245 1.004-0.245 3.448 0 4.448 0.609 2.443 2.188 4.681 4.255 6.015 0.407 0.271 0.896 0.547 1.1 0.631 0.447 0.192 0.547 0.355 0.629 1.14 0.052 0.485 0.041 0.62-0.072 0.62-0.073 0-0.62-0.235-1.199-0.511l-0.052-0.041c-3.297-1.62-5.407-4.364-6.177-8.016-0.187-0.943-0.224-3.187-0.036-4.052 0.479-2.323 1.396-4.135 2.921-5.739 2.199-2.319 5.027-3.543 8.172-3.543zM16 7.172c0.541 0.005 1.068 0.052 1.473 0.14 3.715 0.828 6.344 4.543 5.833 8.229-0.203 1.489-0.713 2.709-1.619 3.844-0.448 0.573-1.537 1.532-1.729 1.532-0.032 0-0.063-0.365-0.063-0.803v-0.808l0.552-0.661c2.093-2.505 1.943-6.005-0.339-8.296-0.885-0.896-1.912-1.423-3.235-1.661-0.853-0.161-1.031-0.161-1.927-0.011-1.364 0.219-2.417 0.744-3.355 1.672-2.291 2.271-2.443 5.791-0.348 8.296l0.552 0.661v0.813c0 0.448-0.037 0.807-0.084 0.807-0.036 0-0.349-0.213-0.683-0.479l-0.047-0.016c-1.109-0.885-2.088-2.453-2.495-3.995-0.244-0.932-0.244-2.697 0.011-3.625 0.672-2.505 2.521-4.448 5.079-5.359 0.547-0.193 1.509-0.297 2.416-0.281zM15.823 11.156c0.417 0 0.828 0.084 1.131 0.24 0.645 0.339 1.183 0.989 1.385 1.677 0.62 2.104-1.609 3.948-3.631 3.005h-0.015c-0.953-0.443-1.464-1.276-1.475-2.36 0-0.979 0.541-1.828 1.484-2.328 0.297-0.156 0.709-0.235 1.125-0.235zM15.812 17.464c1.319-0.005 2.271 0.463 2.625 1.291 0.265 0.62 0.167 2.573-0.292 5.735-0.307 2.208-0.479 2.765-0.905 3.141-0.589 0.52-1.417 0.667-2.209 0.385h-0.004c-0.953-0.344-1.157-0.808-1.553-3.527-0.452-3.161-0.552-5.115-0.285-5.735 0.348-0.823 1.296-1.285 2.624-1.291z"></path>
                                    </g></svg>
                                <span className="text-sm group-hover:text-[#b150e2] transition-colors">Apple Podcasts</span>
                            </div>

                            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 cursor-pointer group">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white group-hover:text-green-500 transition-colors">
                                    <path d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75c-0.5,0.15-1-0.15-1.15-0.6c-0.15-0.5,0.15-1,0.6-1.15 c3.55-1.05,9.4-0.85,13.1,1.35c0.45,0.25,0.6,0.85,0.35,1.3C19.95,11 19.35,11.15,17.9,10.9z M16.8,13.9 c-0.25,0.35-0.7,0.5-1.05,0.25c-2.7-1.65-6.8-2.15-9.95-1.15c-0.4,0.1-0.85-0.1-0.95-0.5c-0.1-0.4,0.1-0.85,0.5-0.95 c3.65-1.1,8.15-0.6,11.25,1.35C16.9,13.1,17.05,13.55,16.8,13.9z M15.9,16.9c-0.2,0.3-0.55,0.4-0.85,0.2 c-2.35-1.45-5.3-1.75-8.8-0.95c-0.35,0.05-0.65-0.15-0.75-0.45c-0.1-0.35,0.15-0.65,0.45-0.75c3.8-0.85,7.1-0.5,9.7,1.1 C16,16.25,16.1,16.6,15.9,16.9z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z"></path>
                                </svg>
                                <span className="text-sm group-hover:text-green-500 transition-colors">Spotify</span>
                            </div>

                            <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 cursor-pointer group">
                                <svg className="w-8 h-8 fill-current text-white group-hover:text-red-500 transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 49 49" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M39.256,6.5H9.744C4.371,6.5,0,10.885,0,16.274v16.451c0,5.39,4.371,9.774,9.744,9.774h29.512 c5.373,0,9.744-4.385,9.744-9.774V16.274C49,10.885,44.629,6.5,39.256,6.5z M47,32.726c0,4.287-3.474,7.774-7.744,7.774H9.744 C5.474,40.5,2,37.012,2,32.726V16.274C2,11.988,5.474,8.5,9.744,8.5h29.512c4.27,0,7.744,3.488,7.744,7.774V32.726z"></path> <path d="M33.36,24.138l-13.855-8.115c-0.308-0.18-0.691-0.183-1.002-0.005S18,16.527,18,16.886v16.229 c0,0.358,0.192,0.69,0.502,0.868c0.154,0.088,0.326,0.132,0.498,0.132c0.175,0,0.349-0.046,0.505-0.137l13.855-8.113 c0.306-0.179,0.495-0.508,0.495-0.863S33.667,24.317,33.36,24.138z M20,31.37V18.63l10.876,6.371L20,31.37z"></path> </g> </g> </g></svg>

                                <span className="text-sm group-hover:text-red-500 transition-colors">Youtube</span>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

            {/* Quote Section with Fixed Animation */}
            <div className="relative bg-black text-white py-24 overflow-hidden">
                {/* Abstract background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-yellow-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl"></div>
                </div>

                {/* Quote marks as decorative elements */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-yellow-500/10 pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="currentColor" className="rotate-180">
                        <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
                    </svg>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        {/* Section title */}
                        <div className="flex flex-col items-center mb-16">
                            <div className="w-12 h-1 bg-yellow-500 mb-6"></div>
                            <h2 className="text-4xl md:text-6xl font-bold text-center">
                                ALINTI<span className="text-yellow-500">.</span>
                            </h2>
                        </div>

                        {/* Quote card */}
                        <div className="quote-card-container relative">
                            {/* Card container with glass effect */}
                            <div className="relative backdrop-blur-md bg-white/5 rounded-xl border border-white/10 shadow-2xl p-8 md:p-12 overflow-visible">
                                {/* Animated accent line */}
                                <div className="absolute inset-x-0 h-1 top-0 bg-gradient-to-r from-transparent via-yellow-500 to-transparent"></div>

                                {/* Subtle diagonal lines pattern - make sure it doesn't block clicks */}
                                <div className="absolute inset-0 opacity-5 pointer-events-none">
                                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                                        <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="20" height="20" patternTransform="rotate(45)">
                                            <line x1="0" y1="0" x2="0" y2="20" stroke="white" strokeWidth="1" />
                                        </pattern>
                                        <rect width="100%" height="100%" fill="url(#diagonalLines)" />
                                    </svg>
                                </div>

                                {/* Quote content */}
                                <div className="text-center relative select-none z-10">
                                    <div className="relative mb-16 mt-12 md:mb-20 h-24 perspective-1000 group">
                                        {/* Decorative quote mark */}
                                        <div className="absolute -top-8 -left-2 text-yellow-500/20 text-4xl font-serif">"</div>

                                        {/* Quote flip container */}
                                        <div
                                            onClick={handleQuoteClick}
                                            className={`relative w-full h-full preserve-3d transition-transform duration-700 ease-in-out 
                    ${!isMobile ? 'group-hover:rotate-x-180' : ''} ${isFlipped ? 'rotate-x-180' : ''}`}
                                        >
                                            {/* Latin quote - front side */}
                                            <div className="absolute w-full h-full backface-hidden">
                                                <p className={`${quicksand.variable} text-2xl italic md:text-4xl font-light leading-relaxed ${isMobile ? 'cursor-pointer' : ''}`}>
                                                    Vivamus, moriendum est.
                                                    {isMobile && <span className="block text-xs text-yellow-500/70 mt-2">(Tap to translate)</span>}
                                                </p>
                                            </div>

                                            {/* Turkish translation - back side */}
                                            <div className="absolute w-full h-full backface-hidden rotate-x-180">
                                                <p className={`${quicksand.variable} text-2xl italic md:text-4xl font-light leading-relaxed ${isMobile ? 'cursor-pointer' : ''}`}>
                                                    Yaşayalım, nasılsa öleceğiz.
                                                    {isMobile && <span className="block text-xs text-yellow-500/70 mt-2">(Tap to return)</span>}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Decorative quote mark */}
                                        <div className="absolute -bottom-8 -right-2 text-yellow-500/20 text-4xl font-serif rotate-180">"</div>
                                    </div>

                                    <div className="flex flex-col items-center space-y-8">
                                        {/* Author info */}
                                        <div className="flex flex-col items-center">
                                            <h3 className="text-lg md:text-xl font-normal">Seneca</h3>
                                            <p className="text-xs text-white/60">Filozof, MÖ 4 - MS 65</p>
                                        </div>

                                        {/* Decorative separator */}
                                        <div className="w-16 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent my-4"></div>

                                        {/* Button for quotes page */}
                                        <Link
                                            href="/quote"
                                            className="inline-block px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-2xl tracking-wider text-xs sm:text-sm hover:bg-gray-200 hover:text-black transition-colors duration-300 cursor-pointer relative z-30"
                                        >
                                            Alıntılar
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* Subtle accent glow - ensure it doesn't block clicks */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Add these CSS styles to your global.css file or a <style> tag */}

        </div >
    );
};

export default Home;