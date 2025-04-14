"use client"
import { useState, useEffect, useRef } from 'react';
import { client } from '@/lib/sanity';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Quote definition
interface Quote {
    _id: string;
    content: string;
    author: string;
    type: 'daily' | 'weekly' | 'monthly';
    publishedAt: string;
}

export default function QuotePage() {
    const [quotes, setQuotes] = useState<{
        daily: Quote | null;
        weekly: Quote | null;
        monthly: Quote | null;
    }>({
        daily: null,
        weekly: null,
        monthly: null,
    });

    const [loading, setLoading] = useState(true);

    // Refs for parallax sections
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

    // Main scroll progress for the entire page
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start", "end"]
    });

    // Enhanced parallax effects for different sections
    const headerParallax = useTransform(scrollYProgress, [0, 0.3], [0, -200]);
    const dailyParallax = useTransform(scrollYProgress, [0.1, 0.4], [100, -100]);
    const weeklyParallax = useTransform(scrollYProgress, [0.3, 0.6], [100, -100]);
    const monthlyParallax = useTransform(scrollYProgress, [0.5, 0.8], [100, -100]);

    // Enhanced background effects based on scroll
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const dailyOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.4], [0, 1, 0]);
    const weeklyOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.6], [0, 1, 0]);
    const monthlyOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 0]);

    // Additional parallax effects for quote content
    const quoteScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1.1]);

    // Replace the current scrollToSection function with this new approach
    const scrollToSection = (section: 'daily' | 'weekly' | 'monthly') => {
        // Calculate the position to scroll to based on viewport height
        // First section (hero) is at 0, then daily at 1×viewHeight, weekly at 2×viewHeight, etc.
        let scrollPosition;

        switch (section) {
            case 'daily':
                scrollPosition = window.innerHeight * 0.9; // 1 viewport height
                break;
            case 'weekly':
                scrollPosition = window.innerHeight * 1.9; // 2 viewport heights
                break;
            case 'monthly':
                scrollPosition = window.innerHeight * 2.9; // 3 viewport heights
                break;
            default:
                scrollPosition = 0;
        }

        // Scroll to the calculated position
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const query = `
                    *[_type == "quote"] {
                        _id,
                        content,
                        author,
                        type,
                        publishedAt
                    }
                `;

                const fetchedQuotes = await client.fetch(query);

                // Categorize by type
                const daily = fetchedQuotes.find((q: Quote) => q.type === 'daily') || null;
                const weekly = fetchedQuotes.find((q: Quote) => q.type === 'weekly') || null;
                const monthly = fetchedQuotes.find((q: Quote) => q.type === 'monthly') || null;

                setQuotes({ daily, weekly, monthly });
                setLoading(false);
            } catch (error) {
                console.error("Error loading quotes:", error);
                setLoading(false);
            }
        };

        // Fix for hydration issues - run fetch only on client side
        if (typeof window !== 'undefined') {
            fetchQuotes();
        }
    }, []);



    // Dark themed background gradients
    const getDarkBackgroundGradient = (index: number) => {
        const darkGradients = [
            'from-indigo-950 via-gray-900 to-black',   // Dark indigo to black
            'from-violet-950 via-gray-900 to-black',   // Dark violet to black  
            'from-blue-950 via-gray-900 to-black'      // Dark blue to black
        ];
        return darkGradients[index % darkGradients.length];
    };

    // Dark accent colors
    const getDarkAccentColor = (index: number) => {
        const darkAccents = ['indigo-600', 'violet-600', 'blue-600'];
        return darkAccents[index % darkAccents.length];
    };

    // Get actual quote by type
    const getQuoteByType = (type: 'daily' | 'weekly' | 'monthly' | null) => {
        if (!type) return null;
        return quotes[type];
    };

    // Particle animation component
    // Improved FloatingParticles component with better animation and positioning
    const FloatingParticles = () => {
        // Pre-generate random positions and sizes for consistent rendering
        const particles = Array.from({ length: 15 }).map((_, i) => ({
            id: i,
            initialX: `${Math.random() * 100}%`,
            initialY: `${Math.random() * 100}%`,
            destinationX: `${Math.random() * 100}%`,
            destinationY: `${Math.random() * 100}%`,
            scale: Math.random() * 0.5 + 0.5,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
            size: Math.random() > 0.7 ? 2 : 1, // Varying particle sizes
        }));

        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        className={`absolute w-${particle.size} h-${particle.size} bg-white rounded-full opacity-30`}
                        initial={{
                            x: particle.initialX,
                            y: particle.initialY,
                            scale: particle.scale,
                            opacity: 0,
                        }}
                        animate={{
                            x: [particle.initialX, particle.destinationX, particle.initialX],
                            y: [particle.initialY, particle.destinationY, particle.initialY],
                            opacity: [0.1, 0.4, 0.1],
                        }}
                        transition={{
                            duration: particle.duration,
                            delay: particle.delay,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                        }}
                        style={{
                            // Use inline styles for more predictable width/height values
                            width: `${particle.size * 4}px`,
                            height: `${particle.size * 4}px`,
                            left: particle.initialX,
                            top: particle.initialY,
                        }}
                    />
                ))}
            </div>
        );
    };

    // Enhanced Parallax Quote Section with darker design
    const ParallaxQuoteSection = ({
        quote,
        title,
        motionStyle,
        opacityStyle,
        index,
        type
    }: {
        quote: Quote | null;
        title: string;
        motionStyle: any;
        opacityStyle: any;
        index: number;
        type: 'daily' | 'weekly' | 'monthly';
    }) => {
        // Individual section scroll for enhanced parallax effect
        const sectionRef = useRef<HTMLDivElement>(null);
        const { scrollYProgress: sectionScroll } = useScroll({
            target: sectionRef,
            offset: ["start end", "end start"]
        });

        // Additional parallax effects specific to each section
        const contentY = useTransform(sectionScroll, [0, 1], [100, -100]);
        const patternParallax = useTransform(sectionScroll, [0, 1], [0, -50]);
        const [isHovered, setIsHovered] = useState(false);

        if (!quote) return (
            <motion.div
                className="h-screen flex items-center justify-center"
                style={{ y: motionStyle }}
            >
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mx-auto mb-4"></div>
                    <p className="text-xl">Yükleniyor...</p>
                </div>
            </motion.div>
        );

        // Calculate darker colors
        const bgGradient = getDarkBackgroundGradient(index);
        const accentColor = getDarkAccentColor(index);

        return (
            <motion.div
                ref={sectionRef}
                id={`${type}-section`} // Move the id here to ensure it's on the outer container
                className="h-screen flex items-center justify-center relative overflow-hidden"
                style={{ y: motionStyle }}
            >
                {/* Darker background with subtle patterns */}
                <motion.div
                    className={`absolute inset-0 w-full h-full bg-gradient-to-br ${bgGradient}`}
                    style={{
                        opacity: opacityStyle,
                    }}
                >
                    {/* Animated particles */}
                    <FloatingParticles />

                    {/* Subtle decorative patterns */}
                    <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{ y: patternParallax }}
                    >
                        {/* Grid pattern */}
                        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-20"></div>

                        {/* Minimal floating shapes */}
                        <div className="absolute top-20 left-20 w-40 h-40 rounded-full border border-white/5"></div>
                        <div className="absolute bottom-40 right-20 w-64 h-64 rounded-full border border-white/5"></div>
                        <div className="absolute top-1/4 right-1/4 w-20 h-20 rotate-45 border border-white/5"></div>
                        <div className="absolute bottom-1/3 left-1/3 w-32 h-32 rounded-full border border-white/5"></div>
                    </motion.div>

                    {/* Glow effects - Fixed classes to avoid hydration issues */}
                    <div className={`absolute top-1/4 left-1/3 w-32 h-32 rounded-full bg-${accentColor}/5 filter blur-3xl`}></div>
                    <div className={`absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-${accentColor}/5 filter blur-3xl`}></div>

                    {/* Darker gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/90"></div>
                </motion.div>

                {/* Content with enhanced parallax effect */}
                <motion.div
                    className="relative z-10 max-w-4xl mx-auto px-8 py-16 backdrop-blur-sm rounded-xl border border-white/5"
                    style={{ y: contentY, scale: quoteScale }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    whileHover={{
                        boxShadow: `0 0 30px 0 rgba(${index === 0 ? '79, 70, 229' : index === 1 ? '124, 58, 237' : '37, 99, 235'}, 0.2)`,
                        transition: { duration: 0.3 }
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        {/* Animated decorative elements - Fixed to use specific classes instead of dynamic ones */}
                        <motion.div
                            className={index === 0 ? "w-16 h-1 bg-indigo-600 mb-8" :
                                index === 1 ? "w-16 h-1 bg-violet-600 mb-8" :
                                    "w-16 h-1 bg-blue-600 mb-8"}
                            whileInView={{ width: "4rem" }}
                            initial={{ width: "0rem" }}
                            transition={{ duration: 1 }}
                        ></motion.div>

                        <div className="flex items-center mb-10">
                            {/* Icon based on quote type - Fixed to use specific classes instead of dynamic ones */}
                            <motion.div
                                className={index === 0 ? "mr-3 text-indigo-600" :
                                    index === 1 ? "mr-3 text-violet-600" :
                                        "mr-3 text-blue-600"}
                                initial={{ rotate: 0 }}
                                animate={{ rotate: isHovered ? 360 : 0 }}
                                transition={{ duration: 1, ease: "easeInOut" }}
                            >
                                {type === 'daily' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                )}
                                {type === 'weekly' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                    </svg>
                                )}
                                {type === 'monthly' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                    </svg>
                                )}
                            </motion.div>
                            <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-wide">{title}</h3>
                        </div>

                        {/* Subtle quote marks with parallax effect - Fixed classes */}
                        <div className="relative w-full">
                            <motion.div
                                className={index === 0 ? "absolute -top-16 -left-8 text-8xl text-indigo-600/20 font-serif" :
                                    index === 1 ? "absolute -top-16 -left-8 text-8xl text-violet-600/20 font-serif" :
                                        "absolute -top-16 -left-8 text-8xl text-blue-600/20 font-serif"}
                                style={{ y: useTransform(sectionScroll, [0, 1], [-10, 10]) }}
                            >
                                "
                            </motion.div>
                            <motion.div
                                className={index === 0 ? "absolute -bottom-24 -right-8 text-8xl text-indigo-600/20 font-serif" :
                                    index === 1 ? "absolute -bottom-24 -right-8 text-8xl text-violet-600/20 font-serif" :
                                        "absolute -bottom-24 -right-8 text-8xl text-blue-600/20 font-serif"}
                                style={{ y: useTransform(sectionScroll, [0, 1], [10, -10]) }}
                            >
                                "
                            </motion.div>

                            <p className="text-2xl sm:text-3xl text-white font-medium italic leading-relaxed mb-10 text-center">
                                {quote.content}
                            </p>
                        </div>

                        <div className="mt-auto text-center">
                            <p className="text-xl text-white font-semibold">— {quote.author}</p>
                            <p className="text-gray-400 text-sm mt-2">
                                {new Date(quote.publishedAt).toLocaleDateString('tr-TR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>

                        {/* Enhanced sharing buttons with hover effects and tooltips */}


                    </motion.div>
                </motion.div>
            </motion.div>
        );
    };

    // Enhanced navigation menu with fixed smooth scrolling
    const NavigationMenu = () => {
        return (
            <motion.div
                className="fixed left-1/2 transform -translate-x-1/2 bottom-8 z-30"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                <div className="bg-black/50 backdrop-blur-md px-6 py-3 rounded-full flex items-center gap-4 border border-white/10">
                    <button
                        onClick={() => scrollToSection('daily')}
                        className="text-white/70 hover:text-white px-3 py-1 rounded-full hover:bg-indigo-900/30 transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        <span className="hidden sm:inline text-sm">Günlük</span>
                    </button>
                    <button
                        onClick={() => scrollToSection('weekly')}
                        className="text-white/70 hover:text-white px-3 py-1 rounded-full hover:bg-indigo-900/30 transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        <span className="hidden sm:inline text-sm">Haftalık</span>
                    </button>
                    <button
                        onClick={() => scrollToSection('monthly')}
                        className="text-white/70 hover:text-white px-3 py-1 rounded-full hover:bg-indigo-900/30 transition-colors flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                        </svg>
                        <span className="hidden sm:inline text-sm">Aylık</span>
                    </button>
                </div>
            </motion.div>
        );
    };

    // Hero header section with parallax effects
    const HeroHeader = () => {
        return (
            <motion.div
                ref={headerRef}
                className="h-screen flex items-center justify-center relative overflow-hidden"
                style={{ y: headerParallax }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black"
                    style={{ opacity: headerOpacity }}
                >
                    {/* Animated background elements */}
                    <FloatingParticles />

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-10"></div>

                    {/* Decorative elements */}
                    <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-indigo-900/20 filter blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full bg-blue-900/10 filter blur-3xl"></div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/80"></div>
                </motion.div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            className="w-20 h-1 bg-indigo-600 mx-auto mb-8"
                            initial={{ width: 0 }}
                            animate={{ width: "5rem" }}
                            transition={{ duration: 1, delay: 0.3 }}
                        ></motion.div>

                        <motion.h1
                            className="text-4xl sm:text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500">
                                İlham Verici
                            </span> Alıntılar
                        </motion.h1>

                        <motion.p
                            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            GünlGünlük, haftalık ve aylık alıntılarla düşüncelerinizi zenginleştirin ve motivasyonunuzu yükseltin.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                        >
                            <button
                                onClick={() => scrollToSection('daily')}
                                className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-full inline-flex items-center gap-2 transition-colors"
                            >
                                Keşfet
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                                </svg>
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        );
    };

    // Client-side only rendering guard - helps with hydration issues
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return <div className="h-screen flex items-center justify-center bg-black">
            <div className="text-center text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-600 mx-auto mb-4"></div>
                <p className="text-xl">Sayfa yükleniyor...</p>
            </div>
        </div>;
    }

    return (
        <div ref={containerRef} className="bg-black min-h-screen">
            {/* Hero Header */}
            <HeroHeader />

            {/* Daily Quote Section */}
            <ParallaxQuoteSection
                quote={quotes.daily}
                title="Günün Alıntısı"
                motionStyle={dailyParallax}
                opacityStyle={dailyOpacity}
                index={0}
                type="daily"
            />

            {/* Weekly Quote Section */}
            <ParallaxQuoteSection
                quote={quotes.weekly}
                title="Haftanın Alıntısı"
                motionStyle={weeklyParallax}
                opacityStyle={weeklyOpacity}
                index={1}
                type="weekly"
            />

            {/* Monthly Quote Section */}
            <ParallaxQuoteSection
                quote={quotes.monthly}
                title="Ayın Alıntısı"
                motionStyle={monthlyParallax}
                opacityStyle={monthlyOpacity}
                index={2}
                type="monthly"
            />

            {/* Navigation Menu */}
            <NavigationMenu />
        </div>
    );
}