"use client"
import { useState, useEffect, useRef } from 'react';
import { urlFor, client } from '@/lib/sanity';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';

// Quote definition
interface Quote {
    _id: string;
    content: string;
    author: string;
    type: 'daily' | 'weekly' | 'monthly';
    publishedAt: string;
    image?: any;
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

    // Refs for parallax sections with proper HTMLDivElement type
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const dailyRef = useRef<HTMLDivElement>(null);
    const weeklyRef = useRef<HTMLDivElement>(null);
    const monthlyRef = useRef<HTMLDivElement>(null);

    // Main scroll progress for the entire page
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start", "end"]
    });

    // Enhanced parallax effects for different sections - increased the movement range
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
    const quoteBgParallax = useTransform(scrollYProgress, [0, 1], [0, -150]);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const query = `
                    *[_type == "quote"] {
                        _id,
                        content,
                        author,
                        type,
                        publishedAt,
                        image
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

        fetchQuotes();
    }, []);

    // Enhanced Parallax Quote Section with better image handling
    const ParallaxQuoteSection = ({
        quote,
        title,
        motionStyle,
        opacityStyle,
        index
    }: {
        quote: Quote | null;
        title: string;
        motionStyle: any;
        opacityStyle: any;
        index: number;
    }) => {
        // Individual section scroll for enhanced parallax effect
        const sectionRef = useRef<HTMLDivElement>(null);
        const { scrollYProgress: sectionScroll } = useScroll({
            target: sectionRef,
            offset: ["start end", "end start"]
        });

        // Additional parallax effects specific to each section
        const contentY = useTransform(sectionScroll, [0, 1], [100, -100]);
        const imageScale = useTransform(sectionScroll, [0, 1], [1.2, 1]);

        if (!quote) return (
            <motion.div
                className="h-screen flex items-center justify-center"
                style={{ y: motionStyle }}
            >
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-xl">Yükleniyor...</p>
                </div>
            </motion.div>
        );

        // Calculate a darker accent color for each section
        const accentColors = ['yellow-600', 'yellow-500', 'amber-500'];
        const accentColor = accentColors[index % accentColors.length];

        // Background images for sections if no image is provided
        const defaultBackgrounds = [
            '/images/bg-daily.jpg',
            '/images/bg-weekly.jpg',
            '/images/bg-monthly.jpg',
        ];

        return (
            <motion.div
                ref={sectionRef}
                className="h-screen flex items-center justify-center relative overflow-hidden"
                style={{ y: motionStyle }}
            >
                {/* Enhanced background with parallax effect */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        opacity: opacityStyle,
                        scale: imageScale,
                    }}
                >
                    {quote.image ? (
                        // Improved image handling with proper error fallback
                        <div className="relative w-full h-full">
                            <img
                                src={urlFor(quote.image).width(1920).height(1080).quality(90).url()}
                                alt=""
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    // Fallback to default image on error
                                    const target = e.target as HTMLImageElement;
                                    target.src = defaultBackgrounds[index % defaultBackgrounds.length];
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/50"
                                style={{ y: quoteBgParallax }}
                            ></motion.div>
                        </div>
                    ) : (
                        // Enhanced default background with parallax effect
                        <div className="w-full h-full relative">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black">
                                <motion.div
                                    className="absolute inset-0 bg-[url('/images/stars.png')] bg-repeat opacity-30"
                                    style={{ y: quoteBgParallax }}
                                ></motion.div>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Content with enhanced parallax effect */}
                <motion.div
                    className="relative z-10 max-w-4xl mx-auto px-8 py-16 backdrop-blur-sm rounded-xl border border-white/10"
                    style={{ y: contentY, scale: quoteScale }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center"
                    >
                        {/* Enhanced decorative elements */}
                        <motion.div
                            className="w-16 h-1 bg-yellow-500 mb-8"
                            whileInView={{ width: "4rem" }}
                            initial={{ width: "0rem" }}
                            transition={{ duration: 1 }}
                        ></motion.div>

                        <h3 className="text-3xl sm:text-4xl font-bold mb-10 text-white tracking-wide">{title}</h3>

                        {/* Enhanced quote marks with parallax effect */}
                        <div className="relative w-full">
                            <motion.div
                                className="absolute -top-16 -left-8 text-8xl text-yellow-500/20 font-serif"
                                style={{ y: useTransform(sectionScroll, [0, 1], [-10, 10]) }}
                            >
                                "
                            </motion.div>
                            <motion.div
                                className="absolute -bottom-24 -right-8 text-8xl text-yellow-500/20 font-serif"
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
                            <p className="text-gray-300 text-sm mt-2">
                                {new Date(quote.publishedAt).toLocaleDateString('tr-TR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>

                        {/* Enhanced sharing buttons with hover effects */}
                        <div className="mt-10 flex items-center gap-4">
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186z" />
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                                className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                </svg>
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <main ref={containerRef} className="relative min-h-screen bg-black">
            {/* Enhanced hero section with more pronounced parallax effect */}
            <motion.div
                ref={headerRef}
                className="h-screen flex items-center justify-center relative overflow-hidden"
                style={{ y: headerParallax }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black"
                    style={{ opacity: headerOpacity }}
                >
                    <motion.div
                        className="absolute inset-0 bg-[url('/images/stars.png')] bg-repeat opacity-50"
                        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
                    ></motion.div>

                    {/* Enhanced decorative patterns with parallax effect */}
                    <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -200]) }}
                    >
                        <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '30%', left: '5%' }}>
                            DÜŞÜN İLHAM AL
                        </div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative z-10 text-center px-4 max-w-4xl mx-auto"
                    style={{ y: useTransform(scrollYProgress, [0, 0.3], [0, 100]) }}
                >
                    <motion.div
                        className="w-16 h-1 bg-yellow-500 mx-auto mb-8"
                        initial={{ width: 0 }}
                        animate={{ width: "4rem" }}
                        transition={{ duration: 1, delay: 0.5 }}
                    ></motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide"
                    >
                        DÜŞÜNCEYE DAVET
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
                    >
                        Günün, Haftanın ve Ayın ilham veren alıntılarıyla yolculuğunuza derinlik katın
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="animate-bounce mt-8"
                    >
                        <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Quote sections with enhanced parallax effects */}
            {loading ? (
                <div className="h-screen flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                </div>
            ) : (
                <>
                    <motion.div ref={dailyRef}>
                        <ParallaxQuoteSection
                            quote={quotes.daily}
                            title="Günün Alıntısı"
                            motionStyle={dailyParallax}
                            opacityStyle={dailyOpacity}
                            index={0}
                        />
                    </motion.div>

                    <motion.div ref={weeklyRef}>
                        <ParallaxQuoteSection
                            quote={quotes.weekly}
                            title="Haftanın Alıntısı"
                            motionStyle={weeklyParallax}
                            opacityStyle={weeklyOpacity}
                            index={1}
                        />
                    </motion.div>

                    <motion.div ref={monthlyRef}>
                        <ParallaxQuoteSection
                            quote={quotes.monthly}
                            title="Ayın Alıntısı"
                            motionStyle={monthlyParallax}
                            opacityStyle={monthlyOpacity}
                            index={2}
                        />
                    </motion.div>
                </>
            )}

            {/* Enhanced footer with parallax effect */}
            <motion.footer
                className="py-12 text-center bg-black text-gray-400 border-t border-white/5 relative overflow-hidden"
                style={{
                    y: useTransform(scrollYProgress, [0.8, 1], [100, 0])
                }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-30"
                    style={{
                        y: useTransform(scrollYProgress, [0.8, 1], [50, 0])
                    }}
                ></motion.div>

                <div className="max-w-4xl mx-auto px-4 relative z-10">
                    <motion.div
                        className="w-10 h-1 bg-yellow-500/50 mx-auto mb-8"
                        initial={{ width: 0 }}
                        whileInView={{ width: "2.5rem" }}
                        transition={{ duration: 1 }}
                        viewport={{ once: true }}
                    ></motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="italic text-lg mb-6"
                    >
                        "İlham peşinde koşmayın. Çalışmaya devam edin ve ilham sizi kovalar."
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="text-white/50"
                    >
                        — Hayao Miyazaki
                    </motion.p>
                </div>
            </motion.footer>
        </main>
    );
}