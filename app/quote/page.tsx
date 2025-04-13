"use client"
import { useState, useEffect } from 'react';
import { urlFor, client } from '@/lib/sanity';
import { motion } from 'framer-motion';

// Tip tanımı
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

                // Kategorilere göre ayırma
                const daily = fetchedQuotes.find((q: Quote) => q.type === 'daily') || null;
                const weekly = fetchedQuotes.find((q: Quote) => q.type === 'weekly') || null;
                const monthly = fetchedQuotes.find((q: Quote) => q.type === 'monthly') || null;

                setQuotes({ daily, weekly, monthly });
                setLoading(false);
            } catch (error) {
                console.error("Alıntılar yüklenirken hata oluştu:", error);
                setLoading(false);
            }
        };

        fetchQuotes();
    }, []);

    const fadeInVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.8,
                ease: "easeOut"
            }
        })
    };

    // Alıntı kartı bileşeni
    const QuoteCard = ({
        quote,
        title,
        index,
        bgGradient
    }: {
        quote: Quote | null;
        title: string;
        index: number;
        bgGradient: string;
    }) => {
        if (!quote) return (
            <motion.div
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                className={`rounded-xl shadow-xl p-8 ${bgGradient} h-full flex flex-col justify-between`}
            >
                <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
                <p className="text-gray-200 italic">Yükleniyor...</p>
            </motion.div>
        );

        return (
            <motion.div
                custom={index}
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
                className={`rounded-xl shadow-xl p-8 ${bgGradient} h-full flex flex-col justify-between relative overflow-hidden`}
            >
                {quote.image && (
                    <div className="absolute inset-0 opacity-20 bg-black">
                        <img
                            src={urlFor(quote.image).width(800).url()}
                            alt=""
                            className="w-full h-full object-cover mix-blend-overlay"
                        />
                    </div>
                )}

                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-4 text-white">{title}</h3>
                    <p className="text-xl text-white font-medium italic leading-relaxed mb-6">"{quote.content}"</p>

                    <div className="mt-auto">
                        <p className="text-gray-200 text-right font-semibold">— {quote.author}</p>
                        <p className="text-gray-300 text-sm text-right mt-2">
                            {new Date(quote.publishedAt).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <main className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-gray-900 to-black">
            <div className="container mx-auto px-4">
                {/* Sayfa başlığı */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Günün, Haftanın ve Ayın Alıntıları</h1>
                    <p className="text-gray-300 text-lg md:w-2/3 mx-auto">
                        Düşündüren, ilham veren ve sizi harekete geçiren seçkin alıntılar. Her gün, her hafta ve her ay yenilenen özenle seçilmiş sözler.
                    </p>
                </motion.div>

                {/* Ana içerik */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <QuoteCard
                            quote={quotes.daily}
                            title="Günün Alıntısı"
                            index={0}
                            bgGradient="bg-gradient-to-br from-purple-600 to-blue-700"
                        />

                        <QuoteCard
                            quote={quotes.weekly}
                            title="Haftanın Alıntısı"
                            index={1}
                            bgGradient="bg-gradient-to-br from-yellow-600 to-orange-700"
                        />

                        <QuoteCard
                            quote={quotes.monthly}
                            title="Ayın Alıntısı"
                            index={2}
                            bgGradient="bg-gradient-to-br from-green-600 to-teal-700"
                        />
                    </div>
                )}

                {/* Alt bilgi */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="mt-16 text-center"
                >
                    <p className="text-gray-400 italic">
                        Her bir alıntı, hayatınıza farklı bir perspektif ve derinlik katmak için özenle seçilmiştir.
                    </p>
                </motion.div>
            </div>
        </main>
    );
}