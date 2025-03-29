"use client"
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Define types for our destinations
type Destination = {
  id: number;
  location: string;
  region: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
};

// Sample data
const destinations: Destination[] = [
  {
    id: 1,
    location: 'Switzerland Alps',
    region: 'Switzerland',
    title: 'SAINT',
    subtitle: 'ANTÖNIEN',
    description: 'Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.',
    imageUrl: 'https://images.unsplash.com/photo-1531366599837-ce0c0e17657c?q=80&w=2070',
  },
  {
    id: 2,
    location: 'Japan Alps',
    region: 'Japan',
    title: 'NAGANO',
    subtitle: 'PREFECTURE',
    description: 'Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.',
    imageUrl: 'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?q=80&w=2070',
  },
  {
    id: 3,
    location: 'Sahara Desert',
    region: 'Morocco',
    title: 'MARRAKECH',
    subtitle: 'MERZOUGA',
    description: 'Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.',
    imageUrl: 'https://images.unsplash.com/photo-1548195667-1a6bd674c08d?q=80&w=2070',
  },
  {
    id: 4,
    location: 'Sierra Nevada',
    region: 'United States',
    title: 'YOSEMITE',
    subtitle: 'NATIONAL PARK',
    description: 'Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=2070',
  },
  {
    id: 5,
    location: 'Tarifa',
    region: 'Spain',
    title: 'LOS LANCES',
    subtitle: 'BEACH',
    description: 'Mauris malesuada nisi sit amet augue accumsan tincidunt. Maecenas tincidunt, velit ac porttitor pulvinar, tortor eros facilisis libero.',
    imageUrl: 'https://images.unsplash.com/photo-1600697230088-4992c83b2804?q=80&w=2070',
  },
];

const SLIDE_DURATION = 6000; // in milliseconds (6 seconds)

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideshowRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to advance to the next slide
  const handleNextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === destinations.length - 1 ? 0 : prev + 1));
    setTimeout(() => {
      setIsTransitioning(false);
    }, 600); // Allow transition to complete
  };

  // Function to go to the previous slide
  const handlePrevSlide = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev === 0 ? destinations.length - 1 : prev - 1));

    // Reset progress
    setProgress(0);
    startProgressTimer();

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  };

  // Reset and start progress timer
  const startProgressTimer = () => {
    // Clear any existing intervals
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // Reset progress
    setProgress(0);

    // Start progress timer that updates 10 times per second (100ms)
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (SLIDE_DURATION / 100));
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100);

    progressIntervalRef.current = interval;
  };

  // Setup auto-rotating slideshow
  useEffect(() => {
    // Clear any existing timeouts and restart timer
    if (slideshowRef.current) {
      clearTimeout(slideshowRef.current);
    }

    // Start the progress timer
    startProgressTimer();

    // Set new timeout for auto-advancing slides
    slideshowRef.current = setTimeout(() => {
      handleNextSlide();
    }, SLIDE_DURATION);

    return () => {
      // Clean up timers when component unmounts or slide changes
      if (slideshowRef.current) {
        clearTimeout(slideshowRef.current);
      }
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [currentSlide]);

  // Get current destination
  const currentDestination = destinations[currentSlide];

  // Get visible destination cards (starting from current one)
  const visibleDestinations = [];
  for (let i = 0; i < 4; i++) {
    const index = (currentSlide + i) % destinations.length;
    visibleDestinations.push(destinations[index]);
  }

  // Calculate slider count progress (which slide we're on out of total)
  const sliderCountProgress = ((currentSlide) / (destinations.length - 1)) * 100;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image with fade transition */}
      <div
        className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${isTransitioning ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        style={{
          backgroundImage: `url(${currentDestination.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Main content */}
      <div className="relative z-10 h-full text-white flex flex-col">
        {/* Navigation bar */}
        <nav className="flex items-center justify-between p-8">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-white/80 flex items-center justify-center">
              <span className="text-white">🌐</span>
            </div>
            <span className="font-bold tracking-widest text-sm">GLOBE EXPRESS</span>
          </div>

          <div className="hidden md:flex gap-6 uppercase text-sm font-medium">
            <a href="#" className="hover:text-white/80 border-b-2 border-white py-2">Home</a>
            <a href="#" className="hover:text-white/80 py-2">Holidays</a>
            <a href="#" className="hover:text-white/80 py-2">Destinations</a>
            <a href="#" className="hover:text-white/80 py-2">Flights</a>
            <a href="#" className="hover:text-white/80 py-2">Offers</a>
            <a href="#" className="hover:text-white/80 py-2">Contacts</a>
          </div>

          <div className="flex gap-4">
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <button className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Content Section */}
          <div className="flex flex-1 px-4 md:px-16">
            {/* Left side - Text content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center">
              <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 translate-y-10' : 'opacity-100 translate-y-0'}`}>
                <div className="mb-6">
                  <div className="w-10 h-1 bg-white mb-4"></div>
                  <p className="text-xl">{currentDestination.location}</p>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-wide">
                  {currentDestination.title}
                </h1>
                <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-wide">
                  {currentDestination.subtitle}
                </h2>

                <p className="max-w-md text-white/90 mb-10">
                  {currentDestination.description}
                </p>

                <div className="flex items-center gap-6">
                  <button className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                    </svg>
                  </button>

                  <button className="px-8 py-3 border border-white rounded-full uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-colors duration-300">
                    Discover Location
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Slide cards (bottom-aligned) - Only visible on larger screens */}
            <div className="hidden lg:flex w-1/2 items-end justify-end">
              <div className="flex gap-4 relative mb-8">
                {visibleDestinations.map((dest, index) => (
                  <div
                    key={`${dest.id}-${index}`}
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
                        style={{ backgroundImage: `url(${dest.imageUrl})` }}
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute bottom-0 left-0 p-4 text-white">
                      <div className="w-6 h-0.5 bg-white mb-2"></div>
                      <p className="text-xs mb-1">{dest.location} - {dest.region}</p>
                      <h3 className="text-lg font-bold">{dest.title}</h3>
                      <h4 className="text-lg font-bold">{dest.subtitle}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer with Controls */}
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

            {/* Slide Count Progress Bar - Shows which slide we're on out of total */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-1/2 md:w-1/3">
              <div className="h-0.5 bg-white/30 w-full">
                <div
                  className="h-full bg-yellow-500 transition-all duration-300"
                  style={{ width: `${sliderCountProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Current slide number */}
            <div className="absolute right-6 md:right-12 bottom-6 md:bottom-8 text-4xl md:text-6xl font-bold text-white/30">
              {(currentSlide + 1).toString().padStart(2, '0')}
            </div>

            {/* Timer progress indicator - For individual slide duration */}
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
  );
};

export default Home;