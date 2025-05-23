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
                // Optimized query to get the most recent quote of each type in a single query
                const query = `{
                    "daily": *[_type == "quote" && type == "daily" && publishedAt <= now()][0...1] | order(publishedAt desc)[0],
                    "weekly": *[_type == "quote" && type == "weekly" && publishedAt <= now()][0...1] | order(publishedAt desc)[0],
                    "monthly": *[_type == "quote" && type == "monthly" && publishedAt <= now()][0...1] | order(publishedAt desc)[0]
                }`;

                const result = await client.fetch(query);

                // Define default quotes to use when none are available
                const defaultQuotes = {
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
                };

                // Use fetched quotes or fallback to defaults
                setQuotes({
                    daily: result.daily || defaultQuotes.daily,
                    weekly: result.weekly || defaultQuotes.weekly,
                    monthly: result.monthly || defaultQuotes.monthly
                });

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
                    src="/assets/fedo.webp"
                    alt="Background"
                    fill
                    priority
                    className="object-cover object-right-top opacity-90"
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
                        accent: 'bg-yellow-500',
                        text: 'text-yellow-500',
                        border: 'border-yellow-500/30',
                        glow: 'bg-yellow-500/10',
                        icon: 'text-yellow-500',
                        gradient: 'from-yellow-500/20 to-transparent'
                    };
                case 'monthly':
                    return {
                        accent: 'bg-yellow-500',
                        text: 'text-yellow-500',
                        border: 'border-yellow-500/30',
                        glow: 'bg-yellow-500/10',
                        icon: 'text-yellow-500',
                        gradient: 'from-yellow-500/20 to-transparent'
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

                >
                    <Card className={`backdrop-blur-lg bg-black/50 border ${colors.border} shadow-lg shadow-${type === 'daily' ? 'yellow' : type === 'weekly' ? 'purple' : 'blue'}-500/10`}>
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
                                className="text-2xl italic sm:text-4xl text-white font-medium  leading-relaxed mb-12 text-center py-8"
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
                        ALINTI<span className="text-yellow-500">.</span>
                    </h1>



                    <p
                        className="text-base sm:text-xl max-w-2xl mx-auto mb-12 text-white/90"
                    >
                        İnsanlığa fikren ve manen büyük katkılarda bulunmuş kişilerden alıntılar ile hayatınıza yeni bir bakış açısı katın.
                    </p>

                </div>
                <div className="absolute bottom-6 sm:bottom-5  text-white left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce duration-100">
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
                sectionRef={monthlyRef}
            />
        </div>
    );
}