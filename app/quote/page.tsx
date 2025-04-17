"use client"
import { useState, useEffect, useRef } from 'react';
import { client } from '@/lib/sanity';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue,
    useSpring,
    cubicBezier,
} from 'framer-motion';

// Quote definition
interface Quote {
    _id: string;
    content: string;
    author: string;
    type: 'daily' | 'weekly' | 'monthly';
    publishedAt: string;
}



interface ParallaxQuoteSectionProps {
    quote: Quote | null;
    title: string;
    motionStyle: MotionValue<number>;
    rotateX: MotionValue<number>;
    scaleStyle: MotionValue<number>;
    index: number;
    type: 'daily' | 'weekly' | 'monthly';
    color: string;
    sectionRef: React.RefObject<HTMLDivElement | null>; // Changed from React.RefObject<HTMLDivElement>
}






export default function QuotePage() {

    const [quotes, setQuotes] = useState<{
        daily: Quote | null;
        weekly: Quote | null;
        monthly: Quote | null;
    }>({
        daily: {
            _id: 'default-daily',
            content: 'Her güne pozitif bir not ile başla.',
            author: 'Hergünebi\'şey',
            type: 'daily',
            publishedAt: new Date().toISOString()
        },
        weekly: {
            _id: 'default-weekly',
            content: 'Haftanın her günü yeni bir fırsat sunar.',
            author: 'Hergünebi\'şey',
            type: 'weekly',
            publishedAt: new Date().toISOString()
        },
        monthly: {
            _id: 'default-monthly',
            content: 'Her ay yeni hedefler belirlemek için bir şans.',
            author: 'Hergünebi\'şey',
            type: 'monthly',
            publishedAt: new Date().toISOString()
        }
    });



    // Active section for enhanced focus
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Main container ref
    const containerRef = useRef<HTMLDivElement>(null);

    const headerRef = useRef<HTMLDivElement>(null);
    const dailyRef = useRef<HTMLDivElement>(null);
    const weeklyRef = useRef<HTMLDivElement>(null);
    const monthlyRef = useRef<HTMLDivElement>(null);

    // Main scroll progress with smoother animation
    // Main scroll progress with smoother animation - FIXED
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start", "end start"],
        layoutEffect: false // Add this to prevent layout thrashing
    });
    // Smoothed scroll progress for more fluid animations
    const smoothScrollProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 25,
        restDelta: 0.01
    });
    // Advanced parallax effects with custom easing
    const customEase = cubicBezier(0.16, 1, 0.3, 1);

    // Hero header effects
    const headerParallax = useTransform(smoothScrollProgress, [0, 0.25], [0, -100]);
    const headerScale = useTransform(smoothScrollProgress, [0, 0.15], [1, 0.9]);
    const headerRotate = useTransform(smoothScrollProgress, [0, 0.2], [0, -3]);


    // Update these values for smoother transitions
    // Reduce the parallax motion values to create less space
    const dailyParallax = useTransform(smoothScrollProgress, [0.15, 0.4], [50, -25], { clamp: false });
    const weeklyParallax = useTransform(smoothScrollProgress, [0.35, 0.6], [50, -25], { clamp: false });
    const monthlyParallax = useTransform(smoothScrollProgress, [0.55, 0.8], [50, -25], { clamp: false });
    const dailyRotateX = useTransform(smoothScrollProgress, [0.15, 0.4], [15, 0]);
    const weeklyRotateX = useTransform(smoothScrollProgress, [0.35, 0.6], [15, 0]);
    const monthlyRotateX = useTransform(smoothScrollProgress, [0.55, 0.8], [15, 0]);

    // Scale effects for emphasizing active sections
    const dailyScale = useTransform(smoothScrollProgress, [0.2, 0.3, 0.4], [0.98, 1.0, 0.98]);
    const weeklyScale = useTransform(smoothScrollProgress, [0.4, 0.5, 0.6], [0.98, 1.0, 0.98]);
    const monthlyScale = useTransform(smoothScrollProgress, [0.6, 0.7, 0.8], [0.98, 1.0, 0.98]);



    // Track active section based on scroll position
    // REPLACE the scroll handler with this optimized version:
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const scrollPosition = window.scrollY + window.innerHeight / 3;

            // Use requestAnimationFrame for smoother performance
            requestAnimationFrame(() => {
                const sections = [
                    { ref: headerRef, id: 'header' },
                    { ref: dailyRef, id: 'daily' },
                    { ref: weeklyRef, id: 'weekly' },
                    { ref: monthlyRef, id: 'monthly' }
                ];

                for (const section of sections) {
                    if (!section.ref.current) continue;

                    const rect = section.ref.current.getBoundingClientRect();
                    const sectionTop = rect.top + window.scrollY;
                    const sectionBottom = sectionTop + rect.height;

                    if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                        if (activeSection !== section.id) {
                            setActiveSection(section.id);
                        }
                        break;
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeSection]); // Add activeSection to dependency array


    // Fetch quotes from Sanity
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

                // Add error handling for empty results
                if (!fetchedQuotes || fetchedQuotes.length === 0) {
                    console.error("No quotes found in the database");
                    return;
                }

                // Categorize by type with default values
                const daily = fetchedQuotes.find((q: Quote) => q.type === 'daily') || {
                    _id: 'default-daily',
                    content: 'Her güne pozitif bir not ile başla.',
                    author: 'Hergünebi\'şey',
                    type: 'daily',
                    publishedAt: new Date().toISOString()
                };

                const weekly = fetchedQuotes.find((q: Quote) => q.type === 'weekly') || {
                    _id: 'default-weekly',
                    content: 'Haftanın her günü yeni bir fırsat sunar.',
                    author: 'Hergünebi\'şey',
                    type: 'weekly',
                    publishedAt: new Date().toISOString()
                };

                const monthly = fetchedQuotes.find((q: Quote) => q.type === 'monthly') || {
                    _id: 'default-monthly',
                    content: 'Her ay yeni hedefler belirlemek için bir şans.',
                    author: 'Hergünebi\'şey',
                    type: 'monthly',
                    publishedAt: new Date().toISOString()
                };

                setQuotes({ daily, weekly, monthly });

            } catch (error) {
                console.error("Error loading quotes:", error);
                // Set default quotes when error occurs
                setQuotes({
                    daily: {
                        _id: 'error-daily',
                        content: 'Her güne pozitif bir not ile başla.',
                        author: 'Hergünebi\'şey',
                        type: 'daily',
                        publishedAt: new Date().toISOString()
                    },
                    weekly: {
                        _id: 'error-weekly',
                        content: 'Haftanın her günü yeni bir fırsat sunar.',
                        author: 'Hergünebi\'şey',
                        type: 'weekly',
                        publishedAt: new Date().toISOString()
                    },
                    monthly: {
                        _id: 'error-monthly',
                        content: 'Her ay yeni hedefler belirlemek için bir şans.',
                        author: 'Hergünebi\'şey',
                        type: 'monthly',
                        publishedAt: new Date().toISOString()
                    }
                });
            }
        };

        // Fix for hydration issues - run fetch only on client side
        if (typeof window !== 'undefined') {
            fetchQuotes();
        }
    }, []);


    const GlobalBackground = () => {
        return (
            <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <Image
                    src="/quote.jpeg"
                    alt="Background"
                    fill
                    quality={75}
                    priority
                    className="object-cover opacity-90"
                />
            </div>
        );
    };


    // Enhanced Parallax Quote Section using shadcn/ui
    const ParallaxQuoteSection = ({
        quote,
        title,
        motionStyle,
        rotateX,
        scaleStyle,
        index,
        type,
        sectionRef
    }: ParallaxQuoteSectionProps) => {
        // Individual section scroll tracking
        const { scrollYProgress: sectionScroll } = useScroll({
            target: sectionRef,
            offset: ["start end", "end start"]
        });

        // Spring-based smoother section scroll for better feel
        const smoothSectionScroll = useSpring(sectionScroll, {
            stiffness: 80,
            damping: 20,
            restDelta: 0.001
        });

        // Additional parallax effects specific to each section
        // Remove the parallax pop-up effect by setting static values (0)
        const contentY = useTransform(smoothSectionScroll, [0, 1], [0, 0], { ease: customEase });
        const contentX = useTransform(smoothSectionScroll, [0, 1], [0, 0]);
        const quoteMarkTopParallax = useTransform(smoothSectionScroll, [0, 1], [-30, 30]);
        const quoteMarkBottomParallax = useTransform(smoothSectionScroll, [0, 1], [30, -30]);
        const cardRotateZ = useTransform(smoothSectionScroll, [0, 1], [index % 2 === 0 ? -2 : 2, 0]);

        // Is this section currently active
        const isActive = activeSection === type;

        // Get color variables based on quote type
        const getColorClasses = () => {
            switch (type) {
                case 'daily':
                    return {
                        accent: 'bg-yellow-500',
                        text: 'text-yellow-500',
                        border: 'border-yellow-500/30',
                        glow: 'bg-yellow-500/10',
                        icon: 'text-yellow-500',
                        gradient: 'from-yellow-500/20 to-transparent'
                    };
                case 'weekly':
                    return {
                        accent: 'bg-purple-500',
                        text: 'text-purple-500',
                        border: 'border-purple-500/30',
                        glow: 'bg-purple-500/10',
                        icon: 'text-purple-500',
                        gradient: 'from-purple-500/20 to-transparent'
                    };
                case 'monthly':
                    return {
                        accent: 'bg-blue-500',
                        text: 'text-blue-500',
                        border: 'border-blue-500/30',
                        glow: 'bg-blue-500/10',
                        icon: 'text-blue-500',
                        gradient: 'from-blue-500/20 to-transparent'
                    };
                default:
                    return {
                        accent: 'bg-yellow-500',
                        text: 'text-yellow-500',
                        border: 'border-yellow-500/30',
                        glow: 'bg-yellow-500/10',
                        icon: 'text-yellow-500',
                        gradient: 'from-yellow-500/20 to-transparent'
                    };
            }
        };

        const colors = getColorClasses();

        // Loading state with themed colors
        if (!quote) return (
            <motion.div
                ref={sectionRef}
                className="h-screen flex items-center justify-center"
                style={{ y: motionStyle }}
            >
                <div className="text-center text-white">
                    <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${colors.border.replace('/20', '')} mx-auto mb-4`}></div>
                    <p className="text-xl">Yükleniyor...</p>
                </div>
            </motion.div>
        );

        return (
            <motion.div
                ref={sectionRef}
                id={`${type}-section`}
                className="min-h-screen flex items-center justify-center relative overflow-hidden py-8"
                style={{ y: motionStyle }}
            >
                {/* REMOVED: Background section and DynamicShapes */}

                {/* Use shadcn/ui Card component */}
                <motion.div
                    className="relative z-10 w-full max-w-4xl mx-8"
                    style={{
                        y: contentY,
                        x: contentX,
                        scale: scaleStyle,
                        rotateX: rotateX,
                        rotateZ: cardRotateZ,
                        transformPerspective: 1200,
                    }}
                    whileHover={{
                        scale: 1.02,
                        y: -5,
                        transition: { duration: 1, ease: "easeOut" }
                    }}
                >
                    <Card className={`backdrop-blur-lg bg-black/50 border ${colors.border} shadow-lg shadow-${type === 'daily' ? 'yellow' : type === 'weekly' ? 'purple' : 'blue'}-500/10`}>
                        {/* Rest of your card content remains the same */}
                        <CardHeader className="text-center relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} opacity-20`}></div>

                            <motion.div
                                className={`w-20 h-1 ${colors.accent} mb-6 mx-auto rounded-full`}
                                whileInView={{ width: isActive ? "7rem" : "5rem" }}
                                initial={{ width: "5rem" }}
                                animate={{ width: isActive ? "7rem" : "5rem" }}
                                transition={{ duration: 0.5 }}
                            ></motion.div>

                            <div className="flex items-center justify-center mb-6">
                                <div className={`mr-4 ${colors.icon}`}>
                                    {type === 'daily' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                        </svg>
                                    )}
                                    {type === 'weekly' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                        </svg>
                                    )}
                                    {type === 'monthly' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>
                                    )}
                                </div>
                                <h3 className={`text-3xl sm:text-5xl font-bold text-white tracking-wide`}>{title}</h3>
                            </div>
                        </CardHeader>

                        <CardContent className="relative px-8 py-6">
                            <motion.div
                                className="absolute -top-14 -left-6 text-7xl text-white/30 font-serif"
                                style={{ y: quoteMarkTopParallax }}
                            >
                                "
                            </motion.div>
                            <motion.div
                                className="absolute -bottom-20 -right-6 text-7xl text-white/30 font-serif"
                                style={{ y: quoteMarkBottomParallax }}
                            >
                                "
                            </motion.div>

                            <motion.p
                                className="text-2xl sm:text-4xl text-white font-medium italic leading-relaxed mb-12 text-center py-8"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                key={`quote-content-${quote._id}`}
                            >
                                {quote.content}
                            </motion.p>
                        </CardContent>

                        <CardFooter className="flex justify-center flex-col text-center pb-8">
                            <motion.p
                                className={`text-2xl font-semibold ${colors.text}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                key={`quote-author-${quote._id}`}
                            >
                                — {quote.author}
                            </motion.p>
                            <motion.p
                                className="text-gray-400 text-sm mt-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                key={`quote-date-${quote._id}`}
                            >
                                {new Date(quote.publishedAt).toLocaleDateString('tr-TR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </motion.p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </motion.div>
        );
    };

    // Simplified HeroHeader without particle effects and reduced animations
    const HeroHeader = () => {
        return (
            <div
                ref={headerRef}
                className="h-screen flex items-center justify-center relative overflow-hidden"
            >

                {/* Main hero content with animated entrance */}
                <div
                    className="relative z-10 text-center px-6"
                >
                    <div
                        className="w-16 h-1 bg-yellow-500 mx-auto mb-6" />
                    <h1
                        key="hero-title"
                        className="text-5xl md:text-7xl font-bold text-white mb-3"
                    >
                        Alıntı<span className="text-yellow-500">.</span>
                    </h1>



                    <p
                        className="text-xl md:text-lg text-gray-300 max-w-2xl mx-auto mb-6"
                    >
                        Günlük ilham veren alıntılarla, düşüncelerinizi ve gününüzü aydınlatın.
                    </p>

                </div>
                <div className="absolute bottom-10  text-white left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <p className="text-sm uppercase tracking-widest mb-2">Aşağı Kaydır</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                </div>
            </div>
        );
    };

    return (
        <div ref={containerRef} className="bg-black min-h-screen">
            {/* Global background */}
            <GlobalBackground />

            {/* Hero Header */}
            <HeroHeader />

            {/* Daily Quote Section with yellow theme */}
            <ParallaxQuoteSection
                quote={quotes.daily}
                title="Günün Alıntısı"
                motionStyle={dailyParallax}
                rotateX={dailyRotateX}
                scaleStyle={dailyScale}
                index={0}
                type="daily"
                color="yellow"
                sectionRef={dailyRef}
            />

            {/* Weekly Quote Section with purple theme */}
            <ParallaxQuoteSection
                quote={quotes.weekly}
                title="Haftanın Alıntısı"
                motionStyle={weeklyParallax}
                rotateX={weeklyRotateX}
                scaleStyle={weeklyScale}
                index={1}
                type="weekly"
                color="purple"
                sectionRef={weeklyRef}
            />

            {/* Monthly Quote Section with blue theme */}
            <ParallaxQuoteSection
                quote={quotes.monthly}
                title="Ayın Alıntısı"
                motionStyle={monthlyParallax}
                rotateX={monthlyRotateX}
                scaleStyle={monthlyScale}
                index={2}
                type="monthly"
                color="blue"
                sectionRef={monthlyRef}
            />
        </div>
    );
}