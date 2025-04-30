"use client";

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { throttle } from 'lodash';

const AboutUs = () => {
    return (
        <div className="relative w-full bg-black text-white">
            {/* Hero Section (with modern reveal design) */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden ">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full">
                        <Image
                            src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2940&auto=format&fit=crop"
                            alt="About us background"
                            fill
                            priority
                            className="object-cover object-center"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-8">
                    <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                        {/* Left side - Text Content */}
                        <div className="hero-content-left text-left space-y-6 ">
                            <div className="w-16 h-1 bg-yellow-500 mb-4"></div>
                            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                HİKAYEMİZ<span className="text-yellow-500">.</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl">
                                Biz bilginin ve merakın peşinden koşan ve öğrendiklerimizi tutku ile paylaşmayı seven bir ekibiz. Her bilgi parçasının değerli olduğuna inanıyoruz.
                            </p>

                        </div>

                        {/* Right side - Floating Image with Design Elements */}
                        <div className="hero-content-right relative h-80 md:h-auto">
                            <div className="relative h-full w-full">
                                {/* Decorative elements */}
                                <div className="absolute -top-6 -left-6 w-24 h-24 border border-yellow-500/30 rounded-xl"></div>
                                <div className="absolute -bottom-6 -right-6 w-24 h-24 border border-yellow-500/30 rounded-xl"></div>

                                {/* Main Image */}
                                <div className="relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-white/5 to-white/10 p-1 shadow-2xl shadow-yellow-500/10">
                                    <div className="w-full h-full overflow-hidden rounded-lg">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src="https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=2940&auto=format&fit=crop"
                                                alt="Kütüphane"
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Floating accent elements */}
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500/20 backdrop-blur-md rounded-full"></div>
                                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-yellow-500/20 backdrop-blur-md rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <a href="#story" className="text-xs uppercase tracking-widest mb-2 flex flex-col items-center text-white/80 hover:text-yellow-500 transition-colors">
                        <span>Aşağı Kaydır</span>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                        </svg>
                    </a>
                </div>
            </div>

            {/* Content Sections */}
            <div className="bg-black">
                {/* Our Story Section */}
                <div id="story" className="py-20 transition-opacity duration-500">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col lg:flex-row items-start gap-16">
                            {/* Left Column */}
                            <div className="w-full lg:w-1/2 lg:sticky lg:top-24 self-start">
                                <div className="relative">
                                    {/* Decorative elements */}
                                    <div className="absolute -top-6 -left-6 w-16 h-16 border border-yellow-500/30 rounded-xl"></div>
                                    <div className="absolute -bottom-6 -right-6 w-16 h-16 border border-yellow-500/30 rounded-xl"></div>

                                    {/* Main Image */}
                                    <div className="relative overflow-hidden rounded-xl aspect-square bg-gradient-to-br from-white/5 to-white/10 p-1">
                                        <div className="w-full h-full overflow-hidden rounded-lg">
                                            <div className="relative w-full h-full">
                                                <Image
                                                    src="https://images.unsplash.com/photo-1492551557933-34265f7af79e?q=80&w=2940&auto=format&fit=crop"
                                                    alt="Kütüphane"
                                                    fill
                                                    className="object-cover hover:scale-105 transition-transform duration-700"
                                                    sizes="(max-width: 768px) 100vw, 50vw"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Image Caption */}
                                <div className="mt-6 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                                    <p className="text-sm text-white/80 italic">
                                        "Bilgi, öğrenmek için duyulan açlıktan doğar ve paylaşıldıkça büyür."
                                    </p>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="w-full lg:w-1/2">
                                <div className="w-10 h-1 bg-yellow-500 mb-8"></div>
                                <h2 className="text-3xl md:text-5xl font-bold mb-8">Neden <span className="text-yellow-500">HERGÜNEBİ'ŞEY?</span></h2>

                                <div className="space-y-6 text-white/80">
                                    <p className="text-lg">
                                        <span className="text-yellow-500 font-medium">HERGÜNEBİ'ŞEY</span> bir merak yolculuğunun ürünüdür. 2021 yılında, sürekli öğrenme ve bilgi paylaşımı tutkusuyla doğdu. Adımız, hayat felsefemizi yansıtıyor: Her gün yeni bir şey öğrenmek ve bunu paylaşmak.
                                    </p>

                                    <p>
                                        Bu platform, bilginin sadece akademik çevrelere ait olmadığı, herkesin anlayabileceği şekilde sunulduğunda ne kadar değerli olabileceği inancıyla kuruldu. Dünyayı anlamaya çalışırken öğrendiklerimizi, merak eden herkesle paylaşmak için buradayız.
                                    </p>

                                    <p>
                                        İnsanoğlunun en temel özelliklerinden biri meraktır. Bu merakı beslemek, yeni sorular sormak ve cevaplar aramak için var olan platformumuz, bilimden felsefeye, tarihten teknolojiye uzanan geniş bir yelpazede içerikler sunuyor.
                                    </p>

                                    <div className="p-5 bg-white/5 rounded-xl my-10 backdrop-blur-sm border border-white/10">
                                        <h3 className="text-xl font-medium mb-3 text-yellow-500">Neden "Her gün bir şey"?</h3>
                                        <p>
                                            İnsan beyni yaklaşık 2 kilogram ağırlığındadır ve bu küçük biyolojik kütlenin içinde sınırsız potansiyel vardır. Her gün yeni bir şey öğrenmek, bu potansiyeli açığa çıkarmanın en iyi yoludur. Biz de her gün farklı bir konu hakkında öğrendiklerimizi, düşündüklerimizi ve merak ettiklerimizi paylaşarak bu yolculukta rehberlik etmek istiyoruz.
                                        </p>
                                    </div>

                                    <p>
                                        Zamanla büyüyen ve gelişen içerik arşivimiz, sadece anlık bilgi ihtiyacını karşılamakla kalmıyor, aynı zamanda kalıcı bir dijital kütüphane olma yolunda ilerliyor. Her yazı, her podcast ve her alıntı, bilgi hazinemizdeki yeni bir cevher.
                                    </p>

                                    <p>
                                        Bizimle birlikte öğrenmeye ve keşfetmeye devam etmek istiyorsanız, düzenli olarak sitemizi ziyaret edin veya sosyal medya hesaplarımızı takip edin. Çünkü öğrenmenin sonu yok ve her yeni gün, yeni bir keşif fırsatı sunuyor.
                                    </p>
                                </div>

                                {/* Stats cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                                    <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 group hover:border-yellow-500/50 transition-all duration-300">
                                        <div className="text-4xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">250+</div>
                                        <div className="text-sm text-white/70">Yayınlanan İçerik</div>
                                    </div>
                                    <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 group hover:border-yellow-500/50 transition-all duration-300">
                                        <div className="text-4xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">48</div>
                                        <div className="text-sm text-white/70">Podcast Bölümü</div>
                                    </div>
                                    <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 group hover:border-yellow-500/50 transition-all duration-300">
                                        <div className="text-4xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">15+</div>
                                        <div className="text-sm text-white/70">Konu Kategorisi</div>
                                    </div>
                                    <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 group hover:border-yellow-500/50 transition-all duration-300">
                                        <div className="text-4xl font-bold mb-2 group-hover:text-yellow-500 transition-colors">3</div>
                                        <div className="text-sm text-white/70">Yıllık Deneyim</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default AboutUs;