"use client";

import Image from 'next/image';
import gradientPhoto from '@/public/assets/evieaboutphoto.webp'
import capturePhoto from '@/public/assets/writingaboutphoto.webp'
import mainPhoto from '@/public/assets/mainaboutphoto.webp'

const AboutUs = () => {
    return (
        <div className="relative w-full bg-black text-white">
            {/* Hero Section (with modern reveal design) */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden ">
                {/* Background Image with Gradient Overlay */}
                <div className="absolute inset-0 w-full h-full">
                    <div className="relative w-full h-full">
                        <Image
                            src={gradientPhoto}
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
                                HAKKIMIZDA<span className="text-yellow-500">.</span>
                            </h1>
                            <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-xl">
                                Bu sitede bilginin ve merakın peşinden koşarken öğrendiklerimizi paylaşıyoruz çünkü paylaşıp anlatmanın da en az öğrenmek kadar kıymetli olduğuna inanıyoruz.
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
                                                src={capturePhoto}
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

                <div className="absolute bottom-6 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                    <p className="text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">Aşağı Kaydır</p>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
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
                                                    src={mainPhoto}
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
                                <h2 className="text-3xl md:text-5xl font-bold mb-8">HERGÜNEBİ'ŞEY </h2>

                                <div className="space-y-6 text-white/80">
                                    <p className="text-lg">
                                        Merak etmek, araştırmak ve paylaşmak. Bu üç kelime ile özetlenebilecek olan hikayemiz; temelinde merak ettiğimiz bir konuyu birden fazla kaynaktan inceleyerek araştırmaya, bu esnada da kendi yorumumuzu katarak içeriğe dönüştürmeye dayanıyor.


                                    </p>

                                    <p>
                                        Doğru sorularla merakımızı ateşleyip daha fazlasını öğrenme hevesimizle de konunun üstüne gidiyoruz. Konu hakkında kaliteli bulduğumuz kaynakları tüketip işin detayını öğreniyor, ardından kendi geçmiş bilgi ve tecrübelerimiz ile harmanlayıp ortaya bir yazı ya da podcast yayını çıkarıyoruz. Bu araştırmalar esnasında karşılaştığımız az sözle çok şey anlatan cümleleri de alıntı olarak düzenli periyotlarla yayınlıyoruz. Tüm bu süreçte öğrendiklerimizin bizim hayatlarımıza anlam ve değer katacağına da yürekten inanıyoruz.


                                    </p>

                                    <p>
                                        Bu sitede ürettiğimiz içerikleri takipçilerimize iletiyoruz. Bunun karşılığında ufak da olsa insanların hayatlarına dokunuyor ve bir topluluk kuruyoruz. Bu topluluğu, elimizden geldiğince çok kişiye ulaştırarak; ulaştığımız kişilere hap bilgi seviyesinde olmayan, çok daha anlamlı ve zengin içerikler sunarak büyütmeye çabalıyoruz. Bu esnada pek çok hata yapacağımızın da farkında olarak bu yaratmaya çalıştığımız topluluğun desteğini bekliyoruz. Düzeltmeler için gerekli her noktada lütfen bizimle iletişime geçmekten çekinmeyin.


                                    </p>
                                    <p>

                                        Özetle bu sitede hayatı yaşamaya değer kılıyor, insanları da merak edip öğrenmeye davet ediyoruz.

                                    </p>

                                    <div className="p-5 bg-white/5 rounded-xl my-10 backdrop-blur-sm border border-white/10">
                                        <h3 className="text-xl font-medium mb-3 text-yellow-500">Neden Hergünebi'şey ?</h3>
                                        <p>
                                            Hergünebi’şey aslen bir alıntı yayınlama sitesi olarak başladı. Ancak pek çok güzel fikrin de geliştirildiği gibi bi’ yürüyüş esnasında bu fikir biraz daha detaylandırıldı. Sonuç olarak podcast ve yazı paylaşmanın hem içerik zenginliği hem de değerli bulduğumuz düşünceleri daha rahat paylaşma açısından daha güzel olacağına karar verildi. “r” harfinin yerini alan kesme işareti de bu fikre son noktayı koydu.
                                        </p>
                                    </div>


                                </div>


                                {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
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
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default AboutUs;