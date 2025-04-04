"use client"
import { useState, useEffect, useRef } from 'react';
import { getLatestBlogPostsForCarousel } from '../lib/sanity';
import { urlFor } from '../lib/sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Blog post type definition
type BlogPost = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  mainImage: SanityImageSource;
  publishedAt: string;
  categories: string[];
};

const SLIDE_DURATION = 6000; // milliseconds (6 seconds)

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCarousel, setShowCarousel] = useState(false);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const slideshowRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Fetch blog posts from Sanity
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const posts = await getLatestBlogPostsForCarousel(5);
        setBlogPosts(posts);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    fetchBlogPosts();
  }, []);

  // Parallax effect for intro section
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        const threshold = window.innerHeight * 0.8;

        // Background parallax effect
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.4}px)`;

        // Show carousel when threshold is passed
        if (scrollPosition > threshold && !showCarousel) {
          setShowCarousel(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showCarousel]);

  // Move to next slide
  const handleNextSlide = () => {
    if (blogPosts.length === 0) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === blogPosts.length - 1 ? 0 : prev + 1));
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Wait for transition to complete
  };

  // Move to previous slide
  const handlePrevSlide = () => {
    if (isTransitioning || blogPosts.length === 0) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? blogPosts.length - 1 : prev - 1));

    // Reset progress bar
    setProgress(0);
    startProgressTimer();

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Scroll to carousel section
  const scrollToCarousel = () => {
    const carouselSection = document.getElementById('content-carousel');
    if (carouselSection) {
      carouselSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Start progress timer
  const startProgressTimer = () => {
    // Clear existing intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Reset progress
    setProgress(0);

    // Start progress counter that updates 10 times per second (100ms)
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (SLIDE_DURATION / 100));
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    progressIntervalRef.current = interval;
  };

  // Auto-rotating slideshow
  useEffect(() => {
    if (!showCarousel || blogPosts.length === 0) return;

    // Clear existing timers and restart counter
    if (slideshowRef.current) {
      clearTimeout(slideshowRef.current);
    }

    // Start progress timer
    startProgressTimer();

    // Set timer for auto-advancing slides
    slideshowRef.current = setTimeout(() => {
      handleNextSlide();
    }, SLIDE_DURATION);

    return () => {
      // Clean up counters when component changes or unmounts
      if (slideshowRef.current) {
        clearTimeout(slideshowRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentSlide, showCarousel, blogPosts.length]);

  // Current content
  const currentContent = blogPosts[currentSlide];

  // Visible content cards (starting from current)
  const visibleContents = [];
  if (blogPosts.length > 0) {
    for (let i = 0; i < 4; i++) {
      const index = (currentSlide + i) % blogPosts.length;
      visibleContents.push(blogPosts[index]);
    }
  }

  // Calculate slider progress (which slide out of total)
  const sliderCountProgress = blogPosts.length > 1
    ? ((currentSlide) / (blogPosts.length - 1)) * 100
    : 0;

  // Splitting title into main and subtitle parts (first word and rest)
  const getTitleParts = (title: string) => {
    if (!title) return { main: '', sub: '' };
    const words = title.split(' ');
    return {
      main: words[0],
      sub: words.slice(1).join(' ')
    };
  };

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

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <p className="text-sm uppercase tracking-widest mb-2">Aşağı Kaydır</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
            <div className="w-10 h-1 bg-yellow-500 mx-auto mb-16"></div>

            <div className="relative">
              {/* Large quote marks */}
              <div className="absolute -top-16 -left-8 text-9xl text-yellow-500/20 font-serif">"</div>
              <div className="absolute -bottom-32 -right-8 text-9xl text-yellow-500/20 font-serif">"</div>

              <h2 className="text-3xl md:text-5xl font-bold mb-10 text-center leading-tight">
                Bilginin değeri, onu paylaştıkça değil, onunla eylemde bulundukça artar.
              </h2>

              <div className="flex items-center justify-center mb-10">

                <div>
                  <h3 className="text-xl italic font-normal">Aristo</h3>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-10">
              <button className="px-8 py-3 border border-white rounded-full uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-300">
                Tüm Alıntılar
              </button>
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






      {/* Content Carousel Section */}
      {/* Content Carousel Section */}
      // Content Carousel Section
      {blogPosts.length > 0 && currentContent && (
        <div id="content-carousel" className="relative w-full h-screen overflow-hidden bg-black">
          {/* Background image with proper overlay gradient */}
          <div
            className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
              }`}
            style={{
              backgroundImage: `url(${urlFor(currentContent.mainImage).url()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />

          {/* Improved overlay with gradient for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />

          {/* Main content */}
          <div className="relative z-10 h-full text-white flex flex-col">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
              {/* Content Section */}
              <div className="flex flex-1 px-4 md:px-16">
                {/* Left side - Text content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
                    <div className="mb-6">
                      <div className="w-12 h-1 bg-yellow-500 mb-4"></div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                        </svg>
                        <p className="text-lg uppercase tracking-wider">{currentContent.categories?.[0] || "Blog"}</p>
                      </div>
                    </div>

                    {/* Title with consistent styling */}
                    <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-wide">
                      {getTitleParts(currentContent.title).main}
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white/90 tracking-wide">
                      {getTitleParts(currentContent.title).sub}
                    </h2>

                    <p className="max-w-md text-white/80 text-lg mb-12">
                      {currentContent.excerpt}
                    </p>

                    <div className="flex items-center gap-6">
                      <button className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center hover:bg-yellow-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-black">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                      </button>

                      <a
                        href={`/blog/${currentContent.slug.current}`}
                        className="px-8 py-4 bg-transparent border border-yellow-500 text-yellow-500 rounded-full uppercase tracking-widest text-sm font-medium hover:bg-yellow-500 hover:text-black transition-colors duration-300"
                      >
                        İçeriği Oku
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right side - Slide cards for desktop */}
                <div className="hidden lg:flex w-1/2 items-end justify-end">
                  <div className="flex gap-2 relative mb-5 mr-1">
                    {visibleContents.map((post, index) => (
                      <div
                        key={`${post._id}-${index}`}
                        className={`relative w-44 h-64 rounded-lg overflow-hidden transition-all duration-500 cursor-pointer
                    ${index === 0 ? 'opacity-100 scale-100 shadow-xl' : index === 1 ? 'opacity-80 scale-95 hover:opacity-90' : 'opacity-60 scale-90 hover:opacity-70'}`}
                        style={{
                          transform: `translateX(${index * -24}px)`,
                          zIndex: 4 - index,
                        }}
                        onClick={() => index !== 0 && setCurrentSlide((currentSlide + index) % blogPosts.length)}
                      >
                        <div className="absolute inset-0">
                          <div
                            className="w-full h-full bg-cover bg-center"
                            style={{ backgroundImage: `url(${urlFor(post.mainImage).url()})` }}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                        <div className="absolute top-4 right-4">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                          </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 p-3 text-white">
                          <div className="w-6 h-0.5 bg-yellow-500 mb-1"></div>
                          <p className="text-xs uppercase mb-1 text-yellow-500">{post.categories?.[0] || "Blog"}</p>
                          <h3 className="text-sm font-bold leading-tight">{getTitleParts(post.title).main}</h3>
                          <h4 className="text-xs font-bold text-white/80 leading-tight">{getTitleParts(post.title).sub}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Control Section - improved styling */}
              <div className="p-8 md:p-12 flex justify-center items-center relative">
                <div className="flex items-center gap-6">
                  <button
                    onClick={handlePrevSlide}
                    className="w-12 h-12 md:w-14 md:h-14 border border-yellow-500/70 rounded-full flex items-center justify-center hover:bg-yellow-500/10 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  <button
                    onClick={handleNextSlide}
                    className="w-12 h-12 md:w-14 md:h-14 border border-yellow-500/70 rounded-full flex items-center justify-center hover:bg-yellow-500/10 transition-colors cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-yellow-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Slide Count Progress Bar - more visible */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-1/2 md:w-1/3">
                  <div className="h-1 bg-white/20 w-full rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 transition-all duration-300 rounded-full"
                      style={{ width: `${sliderCountProgress}%` }}
                    ></div>
                  </div>
                </div>

                {/* More visible slide counter */}
                <div className="absolute right-8 md:right-16 bottom-8 md:bottom-10">
                  <div className="flex items-baseline">
                    <span className="text-4xl md:text-6xl font-bold text-yellow-500">
                      {(currentSlide + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-lg text-white/50 ml-1">/{blogPosts.length.toString().padStart(2, '0')}</span>
                  </div>
                </div>

                {/* Timer progress indicator */}
                <div className="absolute right-24 md:right-40 bottom-10 md:bottom-12 w-20 md:w-24 h-1 bg-white/20 overflow-hidden rounded-full">
                  <div
                    className="h-full bg-yellow-500/80 transition-all duration-100 ease-linear rounded-full"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;