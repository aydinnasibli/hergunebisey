"use client"
import { useEffect, useRef } from 'react';
import Link from 'next/link';
const Home = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Reinstate the parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {/* Hero Section (with Parallax) */}
      <div className="relative h-screen overflow-hidden">
        {/* Parallax Background */}
        <div
          ref={parallaxRef}
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1502209524164-acea936639a2?q=80&w=2070)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '120%', // Extra height for parallax
            top: '-10%'     // Position for upward movement
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 h-full text-white flex flex-col justify-center items-center px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-4 sm:mb-8"></div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 tracking-wide">
              HERGÜNEBİ'ŞEY
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-12 text-white/90">
              Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da<br /> alıntıların bulunduğu platform.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <p className="text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2">Aşağı Kaydır</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-6 sm:h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="relative bg-black text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '10%', left: '-5%' }}>
            HER GÜN YENİ
          </div>
          <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '50%', left: '20%' }}>
            KEŞFET ÖĞREN
          </div>
        </div>

        <div id='what-we-do' className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            <div className="w-full lg:w-1/2">
              <div className="w-10 h-1 bg-yellow-500 mb-4 sm:mb-6"></div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">NELER YAPIYORUZ?</h2>
              <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">
                Bu sitede bilim, felsefe, tarih, teknoloji, kültür ve diğer pek çok farklı kategoride üç farklı formatta içerik paylaşıyoruz. Evrene kıyasla kısacık ömrümüzde elimizden geldiğince merakımızı gidermek amacıyla ilgimizi çeken hemen her konuda kendimizce bir şeyler yazıp çiziyoruz. Bu esnada da düşüncelerimizi kendimize saklamayıp ilgilenen herkesle de paylaşmaya çalışıyoruz.
              </p>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
                Sitenin adının hergünebi'şey olmasının ise bir kıymeti var elbette. Her ne kadar her gün paylaşım yapmasak da mutlaka bir şeyler öğrenmeye, okumaya ve araştırmaya devam ediyoruz. Böylece her geçen gün iki bin gramlık heybemizde bir şeyler biriktirip kendi hayatımıza değer ve anlam katıyoruz.
              </p>
              <button className="px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-full uppercase tracking-widest text-xs sm:text-sm hover:bg-white hover:text-black transition-colors duration-300">
                Hikayemiz
              </button>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-2 sm:gap-4 mt-8 lg:mt-0">
              <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2069"
                  alt="Blog yazıları"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden mt-6 sm:mt-12">
                <img
                  src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?q=80&w=2076"
                  alt="Podcast kayıtları"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2035"
                  alt="İlham verici alıntılar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden mt-6 sm:mt-12">
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

      {/* Blog Section */}
      <div className="relative bg-gradient-to-b from-black to-gray-900 text-white py-24 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">BLOG<span className="text-yellow-500">.</span></h2>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              <div className="w-full lg:w-1/2">
                <p className="text-lg text-white/80 mb-8">
                  Günlük hayattan düşüncelere, bilimsel konulardan felsefi sorgulamalara kadar uzanan geniş bir
                  yelpazede kaleme aldığımız yazılarımızı blogumuzda bulabilirsiniz. Her yazıda farklı bir bakış
                  açısı, belki de hiç düşünmediğiniz bir perspektif sizleri bekliyor.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Düşünce</span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Bilim</span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Teknoloji</span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Felsefe</span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Tarih</span>
                </div>

                <Link
                  href="/blog"
                  className="px-8 py-3 bg-yellow-500 text-black rounded-full uppercase tracking-widest text-sm font-bold hover:bg-yellow-400 transition-colors duration-300 inline-flex items-center"
                >
                  Tüm Yazılar
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              <div className="w-full lg:w-1/2">
                <div className="relative">
                  {/* Decorative elements */}
                  <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-yellow-500"></div>
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-yellow-500"></div>

                  {/* Image collage */}
                  <div className="grid grid-cols-3 gap-2 p-2 bg-white/5 backdrop-blur-sm">
                    <div className="col-span-2 h-64 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070"
                        alt="Blog teması"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="h-32 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1432821596592-e2c18b78144f?q=80&w=2070"
                          alt="Blog yazısı"
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="h-32 overflow-hidden">
                        <img
                          src="https://images.unsplash.com/photo-1519791883288-dc8bd696e667?q=80&w=2070"
                          alt="Blog yazısı"
                          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div className="h-32 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=2070"
                        alt="Blog yazısı"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="h-32 col-span-2 overflow-hidden">
                      <img
                        src="https://images.unsplash.com/photo-1468779036391-52341f60b55d?q=80&w=2068"
                        alt="Blog yazısı"
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Podcast Section */}
      <div className="relative w-full bg-black text-white py-24 overflow-hidden">
        {/* Background gradient and pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-black to-blue-900/30"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-full h-full overflow-hidden">
            <svg viewBox="0 0 400 400" className="absolute right-0 top-0 w-full h-full opacity-20">
              <defs>
                <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#smallGrid)" />
            </svg>
          </div>
        </div>

        <div
          className="container mx-auto px-4 relative z-10"
          style={{
            backgroundImage: "url(https://images.unsplash.com/photo-1502209524164-acea936639a2?q=80&w=2070)",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "overlay"
          }}
        >
          <div className="rounded-2xl overflow-hidden bg-black/70 backdrop-blur-md p-10 md:p-16">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">DİNLE<span className="text-yellow-500">.</span></h2>
                <p className="text-lg text-white/80 mb-8">
                  Podcastlerimizde uzmanlarla derinlemesine sohbetler, ilham verici hikayeler
                  ve Türkiye'nin gündemine farklı bakış açıları sunuyoruz. Yolda, sporda
                  veya evde - her anınıza eşlik edecek içerikler sizi bekliyor.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Kültür</span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Teknoloji</span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Bilim</span>
                  <span className="px-4 py-2 rounded-full bg-white/10 text-sm">Kişisel Gelişim</span>
                </div>

                <div className="flex items-center gap-4">
                  <a
                    href="/podcast"
                    className="px-8 py-3 bg-yellow-500 text-black rounded-full uppercase tracking-widest text-sm font-bold hover:bg-yellow-400 transition-colors duration-300"
                  >
                    Podcastler
                  </a>

                  <button className="w-12 h-12 rounded-full border border-white/50 flex items-center justify-center hover:bg-white/10 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative">
                  {/* Decorative rings around the podcast icon */}
                  <div className="absolute inset-0 rounded-full border-4 border-white/10 animate-pulse"></div>
                  <div className="absolute inset-0 scale-125 rounded-full border-4 border-white/5"></div>
                  <div className="absolute inset-0 scale-150 rounded-full border-4 border-white/5"></div>

                  {/* Inner circle with podcast icon */}
                  <div className="w-56 h-56 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 shadow-xl flex items-center justify-center z-10 relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform logos */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 fill-current text-white">
                  <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 12.986328 A 1.0001 1.0001 0 0 0 24 14 L 24 26.5 A 1.0001 1.0001 0 0 0 24.5 27.5 L 32.5 31.5 A 1.0001 1.0001 0 0 0 33.521484 31.060547 A 1.0001 1.0001 0 0 0 33 30 L 33 17.5 A 1.0001 1.0001 0 0 0 32.5 16.5 L 25.5 12.986328 A 1.0001 1.0001 0 0 0 24.984375 12.986328 z"></path>
                </svg>
                <span className="text-sm">Apple Podcasts</span>
              </div>

              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
                  <path d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75c-0.5,0.15-1-0.15-1.15-0.6c-0.15-0.5,0.15-1,0.6-1.15 c3.55-1.05,9.4-0.85,13.1,1.35c0.45,0.25,0.6,0.85,0.35,1.3C19.95,11 19.35,11.15,17.9,10.9z M16.8,13.9 c-0.25,0.35-0.7,0.5-1.05,0.25c-2.7-1.65-6.8-2.15-9.95-1.15c-0.4,0.1-0.85-0.1-0.95-0.5c-0.1-0.4,0.1-0.85,0.5-0.95 c3.65-1.1,8.15-0.6,11.25,1.35C16.9,13.1,17.05,13.55,16.8,13.9z M15.9,16.9c-0.2,0.3-0.55,0.4-0.85,0.2 c-2.35-1.45-5.3-1.75-8.8-0.95c-0.35,0.05-0.65-0.15-0.75-0.45c-0.1-0.35,0.15-0.65,0.45-0.75c3.8-0.85,7.1-0.5,9.7,1.1 C16,16.25,16.1,16.6,15.9,16.9z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z"></path>
                </svg>
                <span className="text-sm">Spotify</span>
              </div>
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white">
                  <path d="M12 22a10 10 0 0 1-10-10 10 10 0 0 1 10-10 10 10 0 0 1 10 10 10 10 0 0 1-10 10m0-2a8 8 0 0 0 8-8 8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8m-2.25-10.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M13 16l5-5-1.41-1.42L13 13.17l-2.59-2.59L9 12m0-4.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0"></path>
                </svg>
                <span className="text-sm">Anchor</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Quote Section */}
      <div className="relative bg-black text-white py-20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '30%', left: '5%' }}>
            DÜŞÜN İLHAM AL
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="w-8 sm:w-10 h-1 bg-yellow-500 mx-auto mb-8 sm:mb-16"></div>
            <div className="relative">
              {/* Large quote marks */}
              <div className="absolute -top-8 sm:-top-16 -left-4 sm:-left-8 text-6xl sm:text-9xl text-yellow-500/20 font-serif">"</div>
              <div className="absolute -bottom-16 sm:-bottom-32 -right-4 sm:-right-8 text-6xl sm:text-9xl text-yellow-500/20 font-serif">"</div>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6 sm:mb-10 text-center leading-tight">
                Bilginin değeri, onu paylaştıkça değil, onunla eylemde bulundukça artar.
              </h2>

              <div className="flex items-center justify-center mb-6 sm:mb-10">
                <div>
                  <h3 className="text-lg sm:text-xl italic font-normal">Aristo</h3>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-6 sm:mt-10">
              <button className="px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-full uppercase tracking-widest text-xs sm:text-sm hover:bg-white hover:text-black transition-colors duration-300">
                Tüm Alıntılar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;