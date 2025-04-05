"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [visibleSection, setVisibleSection] = useState<string | null>(null);
    const sectionRefs = {
        vision: useRef<HTMLDivElement>(null),
        team: useRef<HTMLDivElement>(null),
        journey: useRef<HTMLDivElement>(null),
        values: useRef<HTMLDivElement>(null),
    };

    // Parallax effect for intro section
    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current) {
                const scrollPosition = window.scrollY;
                parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
            }

            // Check which section is in view
            Object.entries(sectionRefs).forEach(([key, ref]) => {
                if (ref.current) {
                    const rect = ref.current.getBoundingClientRect();
                    if (rect.top < window.innerHeight * 0.7 && rect.bottom > 0) {
                        setVisibleSection(key);
                    }
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Team members data
    const teamMembers = [
        {
            name: "Ahmet Yılmaz",
            title: "Kurucu & Baş Editör",
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887",
            bio: "Uzun yıllar medya sektöründe deneyim sahibi olan Ahmet, HERGÜNEBİ'ŞEY'in kuruluş vizyonunu oluşturdu.",
        },
        {
            name: "Zeynep Kaya",
            title: "İçerik Direktörü",
            image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1888",
            bio: "Zeynep, edebiyat ve kültür-sanat alanında uzmanlaşmış üstün içerik geliştirme becerileriyle ekibimize liderlik ediyor.",
        },
        {
            name: "Mehmet Demir",
            title: "Podcast Yapımcısı",
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887",
            bio: "On yıllık radyo ve podcast tecrübesiyle Mehmet, ses içeriklerimizin kalitesini en üst seviyeye taşıyor.",
        },
        {
            name: "Elif Yıldız",
            title: "Teknoloji Editörü",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888",
            bio: "Teknoloji dünyasında gazeteci olarak çalışan Elif, güncel gelişmeleri herkesin anlayabileceği şekilde aktarıyor.",
        },
    ];

    // Company values
    const values = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            title: "Yenilikçilik",
            description: "Sürekli kendimizi geliştirerek okuyucularımıza en güncel ve yaratıcı içerikleri sunmayı hedefliyoruz."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
                </svg>
            ),
            title: "Dürüstlük",
            description: "İçeriklerimizde doğruluğu ve güvenilirliği ön planda tutarak okuyucularımızla güvene dayalı bir ilişki kuruyoruz."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
            ),
            title: "Topluluk",
            description: "Okuyucularımızla kurduğumuz bağ, platformumuzun temel yapı taşıdır. Fikirlerinizi ve geri bildirimlerinizi önemsiyoruz."
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
            ),
            title: "Erişilebilirlik",
            description: "Bilginin herkes için ulaşılabilir olması gerektiğine inanıyoruz. İçeriklerimizi geniş kitlelere ulaştırmayı amaçlıyoruz."
        },
    ];

    // Timeline data
    const timeline = [
        {
            year: "2019",
            title: "İlk Adım",
            description: "HERGÜNEBİ'ŞEY fikri, küçük bir blog olarak hayata geçirildi. İlk yılımızda 100'den fazla makale yayınladık."
        },
        {
            year: "2020",
            title: "Büyüme",
            description: "Ekibimiz genişledi ve ilk podcastlerimizi yayınlamaya başladık. Aylık okuyucu sayımız 10.000'i aştı."
        },
        {
            year: "2022",
            title: "Yeni Platform",
            description: "Tamamen yenilenmiş tasarımımız ve genişletilmiş içerik kategorilerimizle modern platformumuza geçiş yaptık."
        },
        {
            year: "2023",
            title: "Topluluk Odaklı",
            description: "Okuyucu katkılarını kabul etmeye başladık ve ilk canlı etkinliklerimizi düzenledik."
        },
        {
            year: "2025",
            title: "Bugün",
            description: "Aylık 100.000'den fazla okuyucuya ulaşıyor, 20'den fazla yazar ve içerik üreticisiyle çalışıyoruz."
        }
    ];

    return (
        <div className="relative w-full">
            {/* Hero Section (with Parallax) */}
            <div className="relative h-screen overflow-hidden">
                {/* Parallax Background */}
                <div
                    ref={parallaxRef}
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=2070)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '120%', // Extra height for parallax
                        top: '-10%'     // Position for upward movement
                    }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10"></div>

                {/* Content */}
                <div className="relative z-20 h-full text-white flex flex-col justify-center items-center px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
                            HİKAYEMİZ
                        </h1>
                        <h2 className="text-2xl md:text-3xl mb-8">
                            Her günün değerini biliyoruz
                        </h2>
                        <p className="text-lg max-w-2xl mx-auto mb-12 text-white/90">
                            HERGÜNEBİ'ŞEY, 2019 yılından bu yana Türkiye'nin en kaliteli içerik platformu olma yolunda ilerliyor.
                            Misyonumuz, okuyucularımıza her gün yeni bir şey öğrenme ve keşfetme fırsatı sunmak.
                        </p>

                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="#vizyon" className="px-8 py-4 bg-yellow-500 text-black rounded-full uppercase tracking-widest text-sm font-bold hover:bg-yellow-400 transition-colors duration-300">
                                Vizyonumuz
                            </a>
                            <a href="#ekip" className="px-8 py-4 border border-white rounded-full uppercase tracking-widest text-sm font-bold hover:bg-white/10 transition-colors duration-300">
                                Ekibimiz
                            </a>
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

            {/* Vision Section */}
            <div
                id="vizyon"
                ref={sectionRefs.vision}
                className="relative bg-black text-white py-24"
            >
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '30%', left: '5%' }}>
                        VİZYON MİSYON
                    </div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="w-full lg:w-1/2">
                            <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">VİZYONUMUZ</h2>
                            <p className="text-lg text-white/80 mb-6">
                                HERGÜNEBİ'ŞEY olarak vizyonumuz, bilginin ve ilhamın herkes için erişilebilir olmasını sağlamak.
                                Her okuyucumuzun hayatına dokunarak, onların dünyaya farklı bir perspektiften bakmalarını sağlamak
                                istiyoruz.
                            </p>
                            <p className="text-lg text-white/80 mb-8">
                                İçerik platformu olmanın ötesinde, bir topluluk ve bir hareket olmayı hedefliyoruz. Bilgi paylaşımının
                                gücüne inanıyor ve her gün yeni bir şey öğrenmenin değerini biliyoruz. Amacımız sadece bilgi vermek değil,
                                ilham olmak ve düşündürmek.
                            </p>

                            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm border border-white/20">
                                <h3 className="text-xl font-bold mb-3 text-yellow-500">Misyonumuz</h3>
                                <p className="text-white/90">
                                    Kaliteli içeriklerle okuyucularımızın hayatına değer katmak, bilgiyi erişilebilir kılmak ve
                                    her gün yeni bir şey öğrenmenin heyecanını paylaşmak.
                                </p>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="relative">
                                <div className="w-full aspect-square rounded-lg overflow-hidden border-2 border-yellow-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071"
                                        alt="Ekip çalışması"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-2/3 aspect-square rounded-lg overflow-hidden border-2 border-yellow-500">
                                    <img
                                        src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070"
                                        alt="İçerik çalışması"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -top-6 -left-6 w-1/3 aspect-square rounded-lg overflow-hidden border-2 border-yellow-500 bg-yellow-500 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-black">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                                    </svg>
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

