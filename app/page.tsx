"use client"
import { useState, useEffect, useRef } from 'react';

// İçerik tipleri için tanımlama
type Content = {
  id: number;
  type: string; // 'blog', 'podcast', 'quote'
  category: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
};

// Örnek içerik
const contents: Content[] = [
  {
    id: 1,
    type: 'blog',
    category: 'Kişisel Gelişim',
    title: 'DÜŞÜNCE',
    subtitle: 'DÖNÜŞÜMÜ',
    description: 'Günlük alışkanlıklarınızı değiştirerek zihinsel dönüşümü nasıl başlatabileceğinizi keşfedin. Bu blog yazısında pratik yaklaşımlar bulabilirsiniz.',
    imageUrl: 'https://images.unsplash.com/photo-1531366599837-ce0c0e17657c?q=80&w=2070',
  },
  {
    id: 2,
    type: 'podcast',
    category: 'Teknoloji',
    title: 'DİJİTAL',
    subtitle: 'DÜNYAMIZ',
    description: 'Yapay zeka ve hayatımıza etkileri hakkında uzmanlarla gerçekleştirdiğimiz derinlemesine bir sohbeti dinleyin. Geleceğe dair öngörüler ve güncel gelişmeler.',
    imageUrl: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070',
  },
  {
    id: 3,
    type: 'blog',
    category: 'Kültür & Sanat',
    title: 'İSTANBUL',
    subtitle: 'HIKAYELERI',
    description: 'İstanbulun unutulmuş sokakları ve bu sokaklarda gizlenen hikayeleri keşfedin. Şehrin tarihine farklı bir bakış açısı sunuyoruz.',
    imageUrl: 'https://images.unsplash.com/photo-1548195667-1a6bd674c08d?q=80&w=2070',
  },
  {
    id: 4,
    type: 'quote',
    category: 'Motivasyon',
    title: 'HAYAT',
    subtitle: 'YOLCULUĞU',
    description: '"Kendi yolculuğunu başkalarının fikirlerine göre şekillendirme. Senin kalbin, senin pusulun olsun." - Hergünebişey haftanın alıntısı',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070',
  },
  {
    id: 5,
    type: 'podcast',
    category: 'Yaşam',
    title: 'MİNDFULNESS',
    subtitle: 'PRATİKLERİ',
    description: 'Günlük hayatta uygulayabileceğiniz mindfulness tekniklerini ve faydalarını konuştuğumuz bu bölümde uzman konuğumuzla birlikteyiz.',
    imageUrl: 'https://images.unsplash.com/photo-1600697230088-4992c83b2804?q=80&w=2070',
  },
];

const SLIDE_DURATION = 6000; // milisaniye cinsinden (6 saniye)

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const slideshowRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Giriş bölümü için parallax efekti
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        const threshold = window.innerHeight * 0.8;

        // Arkaplan için parallax efekti
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;

        // Eşik aşıldığında döngüyü göster
        if (scrollPosition > threshold && !showCarousel) {
          setShowCarousel(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showCarousel]);

  // Sonraki slayta geç
  const handleNextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === contents.length - 1 ? 0 : prev + 1));
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Geçişin tamamlanmasını bekle
  };

  // Önceki slayta dön
  const handlePrevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? contents.length - 1 : prev - 1));

    // İlerleme çubuğunu sıfırla
    setProgress(0);
    startProgressTimer();

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // İçerik bölümüne kaydır
  const scrollToCarousel = () => {
    const carouselSection = document.getElementById('content-carousel');
    if (carouselSection) {
      carouselSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // İlerleme sayacını başlat
  const startProgressTimer = () => {
    // Mevcut interval'ları temizle
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // İlerlemeyi sıfırla
    setProgress(0);

    // Saniyede 10 güncelleme yapan (100ms) ilerleme sayacını başlat
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (SLIDE_DURATION / 100));
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    progressIntervalRef.current = interval;
  };

  // Otomatik dönen slayt gösterisi
  useEffect(() => {
    if (!showCarousel) return;

    // Mevcut zamanlayıcıları temizle ve sayacı yeniden başlat
    if (slideshowRef.current) {
      clearTimeout(slideshowRef.current);
    }

    // İlerleme sayacını başlat
    startProgressTimer();

    // Slaytların otomatik ilerlemesi için zamanlayıcı ayarla
    slideshowRef.current = setTimeout(() => {
      handleNextSlide();
    }, SLIDE_DURATION);

    return () => {
      // Bileşen değiştiğinde veya kaldırıldığında sayaçları temizle
      if (slideshowRef.current) {
        clearTimeout(slideshowRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentSlide, showCarousel]);

  // Şu anki içerik
  const currentContent = contents[currentSlide];

  // Görünür içerik kartları (şu ankinden başlayarak)
  const visibleContents = [];
  for (let i = 0; i < 4; i++) {
    const index = (currentSlide + i) % contents.length;
    visibleContents.push(contents[index]);
  }

  // Slider ilerlemesini hesapla (toplamın içinde kaçıncı slayt)
  const sliderCountProgress = ((currentSlide) / (contents.length - 1)) * 100;

  // İçerik tipine göre ikon belirle
  const getContentIcon = (type: string) => {
    switch (type) {
      case 'blog':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        );
      case 'podcast':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
          </svg>
        );
      case 'quote':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full">
      {/* Hero Giriş Bölümü (Parallax ile) */}
      <div className="relative h-screen overflow-hidden">
        {/* Parallax Arkaplan */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1502209524164-acea936639a2?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120%', // Parallax için ekstra yükseklik
            top: '-10%'     // Yukarı doğru hareket için konum
          }}
        />

        {/* Karanlık Katman */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* İçerik */}
        <div className="relative z-20 h-full text-white flex flex-col justify-center items-center px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
            <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
              HERGÜNEBİ'ŞEY
            </h1>
            <h2 className="text-2xl md:text-3xl mb-8">
              Her gün yeni bir keşif, ilham ve bilgi
            </h2>
            <p className="text-lg max-w-2xl mx-auto mb-12 text-white/90">
              Blog yazılarından podcastlere, düşündürücü alıntılardan ilham veren hikayelere -
              hayatınıza her gün yeni bir şey katma fırsatı sunuyoruz. Türkiye'nin en seçkin
              içerik platformuna hoş geldiniz.
            </p>
            <button
              onClick={scrollToCarousel}
              className="px-8 py-4 bg-yellow-500 text-black rounded-full uppercase tracking-widest text-sm font-bold hover:bg-yellow-400 transition-colors duration-300"
            >
              İçerikleri Keşfet
            </button>
          </div>

          {/* Kaydırma göstergesi */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <p className="text-sm uppercase tracking-widest mb-2">Aşağı Kaydır</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Hakkımızda Bölümü */}
      <div className="relative bg-black text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '10%', left: '-5%' }}>
            HER GÜN YENİ
          </div>
          <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '50%', left: '20%' }}>
            KEŞFET ÖĞREN
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="w-full lg:w-1/2">
              <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">NELER YAPIYORUZ?</h2>
              <p className="text-lg text-white/80 mb-6">
                Hergünebi'şey, günlük hayatınıza ilham, bilgi ve değer katmak için
                oluşturulmuş bir içerik platformudur. Deneyimli yazarlarımız ve
                uzmanlarımızın kaleminden çıkan blog yazıları, derinlemesine konuları
                ele aldığımız podcast'ler ve düşündürücü alıntılarla her gün yeni bir şey
                öğrenmenizi sağlıyoruz.
              </p>
              <p className="text-lg text-white/80 mb-8">
                İçeriklerimiz, kişisel gelişimden teknolojiye, kültür ve sanattan günlük yaşama
                kadar geniş bir yelpazede sizlere ulaşıyor. Amacımız, okuyucularımıza her gün
                yeni bir bakış açısı kazandırmak ve hayatlarına dokunmaktır.
              </p>
              <button className="px-8 py-3 border border-white rounded-full uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-300">
                Hikayemiz
              </button>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="h-64 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2069"
                  alt="Blog yazıları"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden mt-12">
                <img
                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076"
                  alt="Podcast kayıtları"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035"
                  alt="İlham verici alıntılar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 rounded-lg overflow-hidden mt-12">
                <img
                  src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=2070"
                  alt="Kültürel içerikler"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* İçerik Döngüsü Bölümü */}
      <div id="content-carousel" className="relative w-full h-screen overflow-hidden">
        {/* Arka plan görüntüsü */}
        <div
          className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
            }`}
          style={{
            backgroundImage: `url(${currentContent.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Metin okunabilirliği için karanlık katman */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Ana içerik */}
        <div className="relative z-10 h-full text-white flex flex-col">
          {/* Ana İçerik Alanı */}
          <div className="flex-1 flex flex-col">
            {/* İçerik Bölümü */}
            <div className="flex flex-1 px-4 md:px-16">
              {/* Sol taraf - Metin içeriği */}
              <div className="w-full lg:w-1/2 flex flex-col justify-center">
                <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
                  <div className="mb-6">
                    <div className="w-10 h-1 bg-white mb-4"></div>
                    <div className="flex items-center gap-2">
                      {getContentIcon(currentContent.type)}
                      <p className="text-xl">{currentContent.category}</p>
                    </div>
                  </div>

                  <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-wide">
                    {currentContent.title}
                  </h1>
                  <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-wide">
                    {currentContent.subtitle}
                  </h2>

                  <p className="max-w-md text-white/90 mb-10">
                    {currentContent.description}
                  </p>

                  <div className="flex items-center gap-6">
                    <button className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                    </button>

                    <button className="px-8 py-3 border border-white rounded-full uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-300">
                      İçeriği Oku/Dinle
                    </button>
                  </div>
                </div>
              </div>

              {/* Sağ taraf - Slayt kartları (alt hizalı) - Sadece büyük ekranlarda görünür */}
              <div className="hidden lg:flex w-1/2 items-end justify-end">
                <div className="flex gap-4 relative mb-8">
                  {visibleContents.map((content, index) => (
                    <div
                      key={`${content.id}-${index}`}
                      className={`relative w-48 h-72 rounded-lg overflow-hidden transition-all duration-500 
                        ${index === 0 ? 'opacity-100 scale-100' : 'opacity-70 scale-95 hover:opacity-90'}`}
                      style={{
                        transform: `translateX(${index * -16}px)`,
                        zIndex: 4 - index,
                      }}
                    >
                      <div className="absolute inset-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url(${content.imageUrl})` }}
                        />
                      </div>
                      <div className="absolute inset-0 bg-black/40"></div>
                      <div className="absolute top-4 right-4">
                        {getContentIcon(content.type)}
                      </div>
                      <div className="absolute bottom-0 left-0 p-4 text-white">
                        <div className="w-6 h-0.5 bg-white mb-2"></div>
                        <p className="text-xs mb-1">{content.category}</p>
                        <h3 className="text-lg font-bold">{content.title}</h3>
                        <h4 className="text-lg font-bold">{content.subtitle}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alt Kontrol Bölümü */}
            <div className="p-6 md:p-10 flex justify-center items-center relative">
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrevSlide}
                  className="w-10 h-10 md:w-12 md:h-12 border border-white/50 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>

                <button
                  onClick={handleNextSlide}
                  className="w-10 h-10 md:w-12 md:h-12 border border-white/50 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>

              {/* Slayt Sayısı İlerleme Çubuğu */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-1/2 md:w-1/3">
                <div className="h-0.5 bg-white/30 w-full">
                  <div
                    className="h-full bg-yellow-500 transition-all duration-300"
                    style={{ width: `${sliderCountProgress}%` }}
                  ></div>
                </div>
              </div>

              {/* Şu anki slayt numarası */}
              <div className="absolute right-6 md:right-12 bottom-6 md:bottom-8 text-4xl md:text-6xl font-bold text-white/30">
                {(currentSlide + 1).toString().padStart(2, '0')}
              </div>

              {/* Zamanlayıcı ilerleme göstergesi */}
              <div className="absolute right-20 md:right-32 bottom-8 md:bottom-10 w-16 md:w-20 h-1 bg-white/20 overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;