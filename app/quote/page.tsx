"use client"
import { useState, useEffect, useRef } from 'react';
import { urlFor, client } from '@/lib/sanity';
import { motion, useScroll, useTransform } from 'framer-motion';

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

    // Refs for parallax sections
    const containerRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const dailyRef = useRef<HTMLDivElement>(null);
    const weeklyRef = useRef<HTMLDivElement>(null);
    const monthlyRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start", "end"]
    });

    // Parallax effects for different sections
    const headerParallax = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
    const dailyParallax = useTransform(scrollYProgress, [0.1, 0.4], [0, -50]);
    const weeklyParallax = useTransform(scrollYProgress, [0.3, 0.6], [0, -50]);
    const monthlyParallax = useTransform(scrollYProgress, [0.5, 0.8], [0, -50]);

    // Background opacity for each section based on scroll
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const dailyOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.4], [0, 1, 0]);
    const weeklyOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.6], [0, 1, 0]);
    const monthlyOpacity = useTransform(scrollYProgress, [0.5, 0.7, 0.9], [0, 1, 0]);

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

    // Quote section component with parallax
    const ParallaxQuoteSection = ({
        quote,
        title,
        motionStyle,
        opacityStyle,
        ref,
        index
    }: {
        quote: Quote | null;
        title: string;
        motionStyle: any;
        opacityStyle: any;
        ref: React.RefObject<HTMLDivElement>;
        index: number;
    }) => {
        if (!quote) return (
            <motion.div
                ref={ref}
                className="h-screen flex items-center justify-center"
                style={{ y: motionStyle }}
            >
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-xl">Yükleniyor...</p>
                </div>
            </motion.div>
        );

        return (
            <motion.div
                ref={ref}
                className="h-screen flex items-center justify-center relative overflow-hidden"
                style={{ y: motionStyle }}
            >
                {quote.image && (
                    <motion.div
                        className="absolute inset-0 w-full h-full"
                        style={{ opacity: opacityStyle }}
                    >
                        <img
                            src={urlFor(quote.image).width(1920).url()}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                    </motion.div>
                )}

                <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 backdrop-blur-sm bg-black bg-opacity-30 rounded-xl">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-3xl sm:text-4xl font-bold mb-6 text-white">{title}</h3>
                        <p className="text-2xl sm:text-3xl text-white font-medium italic leading-relaxed mb-8">"{quote.content}"</p>

                        <div className="mt-auto">
                            <p className="text-xl text-white font-semibold">— {quote.author}</p>
                            <p className="text-gray-300 text-sm mt-2">
                                {new Date(quote.publishedAt).toLocaleDateString('tr-TR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        );
    };

    return (
        <main ref={containerRef} className="relative min-h-screen bg-black">
            {/* Hero section with parallax effect */}
            <motion.div
                ref={headerRef}
                className="h-screen flex items-center justify-center relative overflow-hidden"
                style={{ y: headerParallax }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-purple-900 to-black"
                    style={{ opacity: headerOpacity }}
                >
                    <div className="absolute inset-0 bg-[url('/images/stars.png')] bg-repeat opacity-50"></div>
                </motion.div>

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                    >
                        Düşünceye Davet
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
                        className="animate-bounce"
                    >
                        <svg className="w-8 h-8 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

            {/* Quote sections with parallax effects */}
            {loading ? (
                <div className="h-screen flex justify-center items-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                </div>
            ) : (
                <>
                    <ParallaxQuoteSection
                        quote={quotes.daily}
                        title="Günün Alıntısı"
                        motionStyle={dailyParallax}
                        opacityStyle={dailyOpacity}
                        ref={dailyRef}
                        index={0}
                    />

                    <ParallaxQuoteSection
                        quote={quotes.weekly}
                        title="Haftanın Alıntısı"
                        motionStyle={weeklyParallax}
                        opacityStyle={weeklyOpacity}
                        ref={weeklyRef}
                        index={1}
                    />

                    <ParallaxQuoteSection
                        quote={quotes.monthly}
                        title="Ayın Alıntısı"
                        motionStyle={monthlyParallax}
                        opacityStyle={monthlyOpacity}
                        ref={monthlyRef}
                        index={2}
                    />
                </>
            )}

            {/* Footer */}
            <footer className="py-8 text-center bg-black text-gray-400">
                <p className="italic max-w-2xl mx-auto px-4">
                    "İlham peşinde koşmayın. Çalışmaya devam edin ve ilham sizi kovalar." — Hayao Miyazaki
                </p>
            </footer>
        </main>
    );
}