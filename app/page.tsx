"use client"

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Home = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);

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
    <div className="relative w-full bg-black text-white">
      {/* Hero Section (with Parallax) */}
      <div className="relative h-screen overflow-hidden">
        {/* Parallax Background - Using position relative with Next.js Image */}
        <div ref={parallaxRef} className="absolute inset-0 w-full h-full">
          <div className="relative w-full h-[120%] -top-[10%]">
            <Image
              src="https://images.unsplash.com/photo-1502209524164-acea936639a2?q=80&w=2070"
              alt="Hero background"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Content */}
        <div className="relative z-20 h-full text-white flex flex-col justify-center items-center px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-1 bg-yellow-500 mx-auto mb-4 sm:mb-8"></div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-8 tracking-wide">
              HERGÜNEBİ'ŞEY<span className="text-yellow-500">.</span>
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 sm:mb-12 text-white/90">
              Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da alıntıların bulunduğu platform.
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">NELER YAPIYORUZ<span className="text-yellow-500">?</span></h2>
              <p className="text-base sm:text-lg text-white/80 mb-4 sm:mb-6">
                Bu sitede bilim, felsefe, tarih, teknoloji, kültür ve diğer pek çok farklı kategoride üç farklı formatta içerik paylaşıyoruz. Evrene kıyasla kısacık ömrümüzde elimizden geldiğince merakımızı gidermek amacıyla ilgimizi çeken hemen her konuda kendimizce bir şeyler yazıp çiziyoruz. Bu esnada da düşüncelerimizi kendimize saklamayıp ilgilenen herkesle de paylaşmaya çalışıyoruz.
              </p>
              <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8">
                Sitenin adının hergünebi'şey olmasının ise bir kıymeti var elbette. Her ne kadar her gün paylaşım yapmasak da mutlaka bir şeyler öğrenmeye, okumaya ve araştırmaya devam ediyoruz. Böylece her geçen gün iki bin gramlık heybemizde bir şeyler biriktirip kendi hayatımıza değer ve anlam katıyoruz.
              </p>
              <Link href="/about-us" className="px-6 py-2 sm:px-8 sm:py-3 border border-white rounded-full uppercase tracking-widest text-xs sm:text-sm hover:bg-white hover:text-black transition-colors duration-300">
                Hikayemiz
              </Link>
            </div>
            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-2 sm:gap-4 mt-8 lg:mt-0">
              <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=2080&auto=format&fit=crop"
                    alt="Blog yazıları"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden mt-6 sm:mt-12">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=2070&auto=format&fit=crop"
                    alt="Podcast kayıtları"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop"
                    alt="İlham verici alıntılar"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="h-40 sm:h-52 md:h-64 rounded-lg overflow-hidden mt-6 sm:mt-12">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=2073&auto=format&fit=crop"
                    alt="Kültürel içerikler"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Section */}
      <div className="relative bg-black text-white py-24 overflow-hidden">
        {/* Updated background pattern - subtle geometric shapes */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-full">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        </div>

        {/* Accent lines */}
        <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-yellow-500/0 via-yellow-500/30 to-yellow-500/0"></div>
        <div className="absolute left-0 bottom-0 h-1 w-1/3 bg-gradient-to-r from-yellow-500/0 to-yellow-500/30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Yazılar<span className="text-yellow-500">.</span></h2>

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
                <div className="relative backdrop-blur-sm p-3 bg-white/5 rounded-lg">
                  {/* Decorative accent */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-lg border border-yellow-500/20 -m-2 z-0"></div>

                  {/* Image collage with rounded corners */}
                  <div className="grid grid-cols-3 gap-3 relative z-10">
                    <div className="col-span-2 h-64 overflow-hidden rounded-lg">
                      <div className="relative w-full h-full">
                        <Image
                          src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop"
                          alt="Blog teması"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="h-32 overflow-hidden rounded-lg">
                        <div className="relative w-full h-full">
                          <Image
                            src="https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=2074&auto=format&fit=crop"
                            alt="Blog yazısı"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                      <div className="h-32 overflow-hidden rounded-lg">
                        <div className="relative w-full h-full">
                          <Image
                            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
                            alt="Blog yazısı"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 768px) 100vw, 33vw"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="h-32 overflow-hidden rounded-lg">
                      <div className="relative w-full h-full">
                        <Image
                          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
                          alt="Blog yazısı"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>
                    <div className="h-32 col-span-2 overflow-hidden rounded-lg">
                      <div className="relative w-full h-full">
                        <Image
                          src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074&auto=format&fit=crop"
                          alt="Blog yazısı"
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 66vw"
                        />
                      </div>
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
        {/* Dynamic Background Waves */}
        <div className="absolute inset-0 opacity-100">
          <svg
            viewBox="0 0 1440 320"
            className="absolute w-full"
            style={{ top: '10%' }}
            preserveAspectRatio="none"
          >
            <path
              fill="rgba(255,255,255,0.1)"
              fillOpacity="0.5"
              d="M0,160L48,176C96,192,192,224,288,229.3C384,235,480,213,576,181.3C672,149,768,107,864,90.7C960,75,1056,85,1152,101.3C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
          <svg
            viewBox="0 0 1440 320"
            className="absolute w-full"
            style={{ top: '40%' }}
            preserveAspectRatio="none"
          >
            <path
              fill="rgba(234,179,8,0.08)"
              fillOpacity="0.5"
              d="M0,64L48,96C96,128,192,192,288,192C384,192,480,128,576,128C672,128,768,192,864,202.7C960,213,1056,171,1152,144C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>

        {/* Animated sound wave effect */}
        <div className="absolute inset-0 flex justify-center items-center opacity-100">
          <div className="flex items-end space-x-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
              <div
                key={item}
                className="w-6 bg-white rounded-t-full"
                style={{
                  height: `${Math.floor(Math.random() * 40) + 10}px`,
                  animation: `soundWave ${Math.random() * 1 + 0.5}s ease-in-out infinite alternate`
                }}
              ></div>
            ))}
          </div>
        </div>

        <style jsx>{`
    @keyframes soundWave {
      0% { height: 10px; }
      100% { height: 50px; }
    }
  `}</style>

        <div className="container mx-auto px-4 relative z-10">
          <div className="backdrop-blur-sm bg-black/30 rounded-3xl overflow-hidden p-10 md:p-16 border border-white/5">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Left Content */}
              <div className="w-full md:w-1/2">
                <div className="w-10 h-1 bg-yellow-500 mb-6"></div>
                <h2 className="text-4xl md:text-6xl font-bold mb-6">
                  Podcast<span className="text-yellow-500">.</span>
                </h2>
                <p className="text-lg text-white/80 mb-8">
                  Podcastlerimizde uzmanlarla derinlemesine sohbetler, ilham verici hikayeler
                  ve Türkiye'nin gündemine farklı bakış açıları sunuyoruz. Yolda, sporda
                  veya evde - her anınıza eşlik edecek içerikler sizi bekliyor.
                </p>

                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-4 py-2 rounded-full bg-purple-900/50 backdrop-blur-sm text-sm border border-purple-500/20 hover:bg-purple-800/50 transition-colors cursor-pointer">Kültür</span>
                  <span className="px-4 py-2 rounded-full bg-blue-900/50 backdrop-blur-sm text-sm border border-blue-500/20 hover:bg-blue-800/50 transition-colors cursor-pointer">Teknoloji</span>
                  <span className="px-4 py-2 rounded-full bg-green-900/50 backdrop-blur-sm text-sm border border-green-500/20 hover:bg-green-800/50 transition-colors cursor-pointer">Bilim</span>
                  <span className="px-4 py-2 rounded-full bg-yellow-900/50 backdrop-blur-sm text-sm border border-yellow-500/20 hover:bg-yellow-800/50 transition-colors cursor-pointer">Kişisel Gelişim</span>
                </div>

                <div className="flex items-center gap-4">
                  <Link
                    href="/podcast"
                    className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black rounded-full uppercase tracking-widest text-sm font-bold hover:from-yellow-400 hover:to-yellow-500 transition-colors duration-300 shadow-lg shadow-yellow-500/20"
                  >
                    Podcastler
                  </Link>

                  <button className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors group">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-yellow-500 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Right Content - New Design */}
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative perspective-1000">
                  {/* Album artwork with 3D effect */}
                  <div className="w-64 h-64 relative transition-transform hover:rotate-y-10 hover:scale-105 cursor-pointer shadow-2xl">
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-yellow-500 via-yellow-600 to-yellow-400 transform -rotate-6"></div>
                    <div className="absolute inset-0 rounded-xl overflow-hidden transform rotate-3 border-2 border-white/20">
                      <div className="relative w-full h-full">
                        <Image
                          src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=1740&auto=format&fit=crop"
                          alt="Podcast Cover"
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      </div>
                    </div>

                    {/* Podcast controls overlay */}
                    <div className="absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                      <div className="text-lg font-bold">Yeni Bölüm</div>
                      <div className="flex flex-col">
                        <div className="text-sm opacity-80 mb-2">23:45</div>
                        <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="h-full w-2/3 bg-yellow-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between mt-4">
                          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061c.75-.43 1.683.113 1.683.977v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061c.75-.43 1.683.113 1.683.977v8.122Z" />
                            </svg>
                          </button>
                          <button className="p-3 rounded-full bg-white text-black hover:bg-yellow-500 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                          </button>
                          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative mic icon with animated rings */}
                  <div className="absolute -bottom-8 -right-8 flex items-center justify-center">
                    <div className="absolute w-16 h-16 rounded-full border border-yellow-500/30 animate-ping-slow"></div>
                    <div className="absolute w-20 h-20 rounded-full border border-yellow-500/20 animate-ping-slow animation-delay-500"></div>
                    <div className="absolute w-24 h-24 rounded-full border border-yellow-500/10 animate-ping-slow animation-delay-1000"></div>
                    <div className="w-12 h-12 rounded-full bg-purple-900 flex items-center justify-center shadow-lg z-10">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Platform logos - Updated with hover effects */}
            <div className="mt-16 flex flex-wrap justify-center gap-8">
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className="w-8 h-8 fill-current text-white group-hover:text-yellow-500 transition-colors">
                  <path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24.984375 12.986328 A 1.0001 1.0001 0 0 0 24 14 L 24 26.5 A 1.0001 1.0001 0 0 0 24.5 27.5 L 32.5 31.5 A 1.0001 1.0001 0 0 0 33.521484 31.060547 A 1.0001 1.0001 0 0 0 33 30 L 33 17.5 A 1.0001 1.0001 0 0 0 32.5 16.5 L 25.5 12.986328 A 1.0001 1.0001 0 0 0 24.984375 12.986328 z"></path>
                </svg>
                <span className="text-sm group-hover:text-yellow-500 transition-colors">Apple Podcasts</span>
              </div>

              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white group-hover:text-green-500 transition-colors">
                  <path d="M17.9,10.9C14.7,9 9.35,8.8 6.3,9.75c-0.5,0.15-1-0.15-1.15-0.6c-0.15-0.5,0.15-1,0.6-1.15 c3.55-1.05,9.4-0.85,13.1,1.35c0.45,0.25,0.6,0.85,0.35,1.3C19.95,11 19.35,11.15,17.9,10.9z M16.8,13.9 c-0.25,0.35-0.7,0.5-1.05,0.25c-2.7-1.65-6.8-2.15-9.95-1.15c-0.4,0.1-0.85-0.1-0.95-0.5c-0.1-0.4,0.1-0.85,0.5-0.95 c3.65-1.1,8.15-0.6,11.25,1.35C16.9,13.1,17.05,13.55,16.8,13.9z M15.9,16.9c-0.2,0.3-0.55,0.4-0.85,0.2 c-2.35-1.45-5.3-1.75-8.8-0.95c-0.35,0.05-0.65-0.15-0.75-0.45c-0.1-0.35,0.15-0.65,0.45-0.75c3.8-0.85,7.1-0.5,9.7,1.1 C16,16.25,16.1,16.6,15.9,16.9z M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z"></path>
                </svg>
                <span className="text-sm group-hover:text-green-500 transition-colors">Spotify</span>
              </div>
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white group-hover:text-blue-500 transition-colors">
                  <path d="M12 22a10 10 0 0 1-10-10 10 10 0 0 1 10-10 10 10 0 0 1 10 10 10 10 0 0 1-10 10m0-2a8 8 0 0 0 8-8 8 8 0 0 0-8-8 8 8 0 0 0-8 8 8 8 0 0 0 8 8m-2.25-10.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0M13 16l5-5-1.41-1.42L13 13.17l-2.59-2.59L9 12m0-4.25a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0"></path>
                </svg>
                <span className="text-sm group-hover:text-blue-500 transition-colors">Anchor</span>
              </div>

              {/* Added Google Podcasts */}
              <div className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-all hover:scale-110 cursor-pointer group">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" className="fill-current text-white group-hover:text-red-500 transition-colors">
                  <path d="M12 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3m0-2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-7 5c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm16 0c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm-8-8c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zm0 16c0 .55-.45 1-1 1s-1-.45-1-1 .45-1 1-1 1 .45 1 1zM5.99 3.04c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0a.9959.9959 0 010-1.41c.39-.38 1.03-.39 1.41 0zm12.02 18.92c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0a.9959.9959 0 010-1.41c.39-.39 1.02-.39 1.41 0zM6 18.98c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0a.9959.9959 0 010-1.41c.39-.39 1.02-.39 1.41 0zm12-14.94c.39.39.39 1.02 0 1.41-.39.39-1.02.39-1.41 0a.9959.9959 0 010-1.41c.39-.39 1.02-.39 1.41 0z" />
                </svg>
                <span className="text-sm group-hover:text-red-500 transition-colors">Google Podcasts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quote Section - Increased height */}
      <div className="relative bg-black text-white py-12 overflow-hidden"> {/* Increased py-20 to py-40 */}
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute text-3xl md:text-8xl font-bold text-white whitespace-nowrap" style={{ top: '50%', left: '5%' }}>
            DÜŞÜN İLHAM AL
          </div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto py-16"> {/* Added padding */}
            <div className="w-12 sm:w-16 h-1 bg-yellow-500 mx-auto mb-12 sm:mb-20"></div> {/* Increased sizes */}
            <div className="relative">
              {/* Larger quote marks */}
              <div className="absolute -top-12 sm:-top-24 -left-4 sm:-left-12 text-8xl sm:text-12xl text-yellow-500/20 font-serif">"</div>
              <div className="absolute -bottom-24 sm:-bottom-40 -right-4 sm:-right-12 text-8xl sm:text-12xl text-yellow-500/20 font-serif">"</div>

              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-10 sm:mb-16 text-center leading-tight px-4">
                Bilginin değeri, onu paylaştıkça değil, onunla eylemde bulundukça artar.
              </h2>

              <div className="flex items-center justify-center mb-12 sm:mb-16"> {/* Increased margins */}
                <div>
                  <h3 className="text-xl sm:text-2xl italic font-normal">Aristo</h3> {/* Increased text size */}
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10 sm:mt-16"> {/* Increased margins */}
              <Link href="/quotes" className="px-8 py-3 sm:px-10 sm:py-4 border-2 border-white rounded-full uppercase tracking-widest text-sm sm:text-base hover:bg-white hover:text-black transition-colors duration-300">
                Tüm Alıntılar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Home;