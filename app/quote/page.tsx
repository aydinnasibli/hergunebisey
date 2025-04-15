"use client"
import { useState, useEffect, useRef } from 'react';
import { client } from '@/lib/sanity';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
    motion,
    useScroll,
    useTransform,
    MotionValue,
    useSpring,
    cubicBezier,
} from 'framer-motion';

// Quote definition
interface Quote {
    _id: string;
    content: string;
    author: string;
    type: 'daily' | 'weekly' | 'monthly';
    publishedAt: string;
}

// Add proper type definitions for DynamicShapes
interface ShapeConfig {
    type: 'circle' | 'square' | 'triangle' | 'hexagon';
    baseX: number;
    baseY: number;
    size: number;
    rotation: number;
    opacity: number;
}

interface ParallaxQuoteSectionProps {
    quote: Quote | null;
    title: string;
    motionStyle: MotionValue<number>;
    opacityStyle: MotionValue<number>;
    rotateX: MotionValue<number>;
    scaleStyle: MotionValue<number>;
    index: number;
    type: 'daily' | 'weekly' | 'monthly';
    color: string;
    sectionRef: React.RefObject<HTMLDivElement>;
}



interface DynamicShapesProps {
    sectionType: string;
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

    // Client-side only rendering guard
    const [isClient, setIsClient] = useState(false);

    // Mouse position for hover effects

    // Viewport size for responsive calculations
    const [viewport, setViewport] = useState({ width: 0, height: 0 });

    // Active section for enhanced focus
    const [activeSection, setActiveSection] = useState<string | null>(null);

    // Main container ref
    const containerRef = useRef<HTMLDivElement>(null);

    const headerRef = useRef<HTMLDivElement>(null);
    const dailyRef = useRef<HTMLDivElement>(null);
    const weeklyRef = useRef<HTMLDivElement>(null);
    const monthlyRef = useRef<HTMLDivElement>(null);

    // Main scroll progress with smoother animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start", "end start"] // Changed from ["start", "end"]
    });
    // Smoothed scroll progress for more fluid animations
    const smoothScrollProgress = useSpring(scrollYProgress, {
        stiffness: 50,       // Reduced from 100
        damping: 20,         // Reduced from 30
        restDelta: 0.01      // Less precision for better performance
    });

    // Advanced parallax effects with custom easing
    const customEase = cubicBezier(0.16, 1, 0.3, 1);

    // Hero header effects
    const headerParallax = useTransform(smoothScrollProgress, [0, 0.25], [0, -100]);
    const headerScale = useTransform(smoothScrollProgress, [0, 0.15], [1, 0.9]);
    const headerRotate = useTransform(smoothScrollProgress, [0, 0.2], [0, -3]);

    const headerOpacity = useTransform(smoothScrollProgress, [0, 0.22], [1, 0]);

    // Section effects with overlapping transitions for smoother blending
    const dailyParallax = useTransform(smoothScrollProgress, [0.15, 0.4], [100, -50]);
    const weeklyParallax = useTransform(smoothScrollProgress, [0.35, 0.6], [100, -50]);
    const monthlyParallax = useTransform(smoothScrollProgress, [0.55, 0.8], [100, -50]);
    // Progressive reveal and fade effects
    const dailyOpacity = useTransform(smoothScrollProgress, [0.15, 0.25, 0.35, 0.4], [0, 1, 1, 0.7]);
    const weeklyOpacity = useTransform(smoothScrollProgress, [0.35, 0.45, 0.55, 0.6], [0, 1, 1, 0.7]);
    const monthlyOpacity = useTransform(smoothScrollProgress, [0.55, 0.65, 0.75, 0.8], [0, 1, 1, 0.7]);

    // 3D rotation effects based on scroll position
    const dailyRotateX = useTransform(smoothScrollProgress, [0.15, 0.4], [15, 0]);
    const weeklyRotateX = useTransform(smoothScrollProgress, [0.35, 0.6], [15, 0]);
    const monthlyRotateX = useTransform(smoothScrollProgress, [0.55, 0.8], [15, 0]);

    // Scale effects for emphasizing active sections
    const dailyScale = useTransform(smoothScrollProgress, [0.2, 0.3, 0.4], [0.9, 1.05, 0.95]);
    const weeklyScale = useTransform(smoothScrollProgress, [0.4, 0.5, 0.6], [0.9, 1.05, 0.95]);
    const monthlyScale = useTransform(smoothScrollProgress, [0.6, 0.7, 0.8], [0.9, 1.05, 0.95]);


    // Handle viewport sizing
    useEffect(() => {
        const handleResize = () => {
            setViewport({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        if (typeof window !== 'undefined') {
            handleResize();
            window.addEventListener('resize', handleResize);

            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }
    }, []);

    // Track active section based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const scrollPosition = window.scrollY + window.innerHeight / 3; // Changed from /2 to /3

            const sections = [
                { ref: headerRef, id: 'header' },
                { ref: dailyRef, id: 'daily' },
                { ref: weeklyRef, id: 'weekly' },
                { ref: monthlyRef, id: 'monthly' }
            ];

            for (const section of sections) {
                if (!section.ref.current) continue;

                const rect = section.ref.current.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY;
                const sectionBottom = sectionTop + rect.height;

                if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Client-side setup
    useEffect(() => {
        setIsClient(true);

        // Add smooth scroll behavior with better performance
        if (typeof window !== 'undefined') {
            document.documentElement.style.scrollBehavior = 'smooth';
        }

        return () => {
            if (typeof window !== 'undefined') {
                document.documentElement.style.scrollBehavior = '';
            }
        };
    }, []);

    // Fetch quotes from Sanity
    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const query = `
                    *[_type == "quote"] {
                        _id,
                        content,
                        author,
                        type,
                        publishedAt
                    }
                `;

                const fetchedQuotes = await client.fetch(query);

                // Add error handling for empty results
                if (!fetchedQuotes || fetchedQuotes.length === 0) {
                    console.error("No quotes found in the database");
                    return;
                }

                // Categorize by type with default values
                const daily = fetchedQuotes.find((q: Quote) => q.type === 'daily') || {
                    _id: 'default-daily',
                    content: 'Her güne pozitif bir not ile başla.',
                    author: 'Hergünebi\'şey',
                    type: 'daily',
                    publishedAt: new Date().toISOString()
                };

                const weekly = fetchedQuotes.find((q: Quote) => q.type === 'weekly') || {
                    _id: 'default-weekly',
                    content: 'Haftanın her günü yeni bir fırsat sunar.',
                    author: 'Hergünebi\'şey',
                    type: 'weekly',
                    publishedAt: new Date().toISOString()
                };

                const monthly = fetchedQuotes.find((q: Quote) => q.type === 'monthly') || {
                    _id: 'default-monthly',
                    content: 'Her ay yeni hedefler belirlemek için bir şans.',
                    author: 'Hergünebi\'şey',
                    type: 'monthly',
                    publishedAt: new Date().toISOString()
                };

                setQuotes({ daily, weekly, monthly });

            } catch (error) {
                console.error("Error loading quotes:", error);
                // Set default quotes when error occurs
                setQuotes({
                    daily: {
                        _id: 'error-daily',
                        content: 'Her güne pozitif bir not ile başla.',
                        author: 'Hergünebi\'şey',
                        type: 'daily',
                        publishedAt: new Date().toISOString()
                    },
                    weekly: {
                        _id: 'error-weekly',
                        content: 'Haftanın her günü yeni bir fırsat sunar.',
                        author: 'Hergünebi\'şey',
                        type: 'weekly',
                        publishedAt: new Date().toISOString()
                    },
                    monthly: {
                        _id: 'error-monthly',
                        content: 'Her ay yeni hedefler belirlemek için bir şans.',
                        author: 'Hergünebi\'şey',
                        type: 'monthly',
                        publishedAt: new Date().toISOString()
                    }
                });
            }
        };

        // Fix for hydration issues - run fetch only on client side
        if (typeof window !== 'undefined') {
            fetchQuotes();
        }
    }, []);



    // Optimized DynamicShapes component with reduced complexity
    // Enhanced DynamicShapes component with more interesting visuals and animations
    const DynamicShapes = ({ sectionType }: DynamicShapesProps) => {
        // More varied and visually interesting shapes for each section
        const shapes: Record<string, ShapeConfig[]> = {
            header: [
                { type: 'circle', baseX: 10, baseY: 20, size: 240, rotation: 0, opacity: 0.15 }, // Increased size
                { type: 'circle', baseX: 80, baseY: 70, size: 180, rotation: 0, opacity: 0.12 }, // Increased size
                { type: 'hexagon', baseX: 75, baseY: 15, size: 160, rotation: 25, opacity: 0.08 }, // Increased size
                { type: 'triangle', baseX: 20, baseY: 80, size: 120, rotation: 45, opacity: 0.1 } // Added an extra shape
            ],
            daily: [
                { type: 'circle', baseX: 15, baseY: 25, size: 200, rotation: 0, opacity: 0.15 }, // Increased size
                { type: 'square', baseX: 70, baseY: 60, size: 140, rotation: 45, opacity: 0.10 }, // Increased opacity
                { type: 'triangle', baseX: 85, baseY: 30, size: 160, rotation: 180, opacity: 0.12 }, // Increased size and opacity
                { type: 'circle', baseX: 30, baseY: 75, size: 100, rotation: 0, opacity: 0.08 } // Added extra shape
            ],
            weekly: [
                { type: 'hexagon', baseX: 75, baseY: 25, size: 180, rotation: 10, opacity: 0.15 }, // Increased size
                { type: 'circle', baseX: 20, baseY: 65, size: 160, rotation: 0, opacity: 0.10 }, // Increased size and opacity
                { type: 'triangle', baseX: 12, baseY: 20, size: 140, rotation: 0, opacity: 0.12 }, // Increased size and opacity
                { type: 'square', baseX: 82, baseY: 80, size: 120, rotation: 30, opacity: 0.08 } // Added extra shape
            ],
            monthly: [
                { type: 'circle', baseX: 80, baseY: 20, size: 220, rotation: 0, opacity: 0.15 }, // Increased size
                { type: 'square', baseX: 25, baseY: 70, size: 160, rotation: 15, opacity: 0.10 }, // Increased size and opacity
                { type: 'hexagon', baseX: 15, baseY: 25, size: 180, rotation: 30, opacity: 0.12 }, // Increased size and opacity
                { type: 'triangle', baseX: 65, baseY: 78, size: 120, rotation: 60, opacity: 0.08 } // Added extra shape
            ]
        };

        // Check if this section is currently active
        const isActive = activeSection === sectionType;

        // Use appropriate shapes based on section type
        const sectionShapes = shapes[sectionType] || shapes.header;

        // Helper function to get shape color based on section type with better color gradients
        const getShapeColor = (type: string, opacity = 0.8) => {
            switch (type) {
                case 'daily': return `rgba(234, 179, 8, ${opacity})`; // Yellow
                case 'weekly': return `rgba(147, 51, 234, ${opacity})`; // Purple
                case 'monthly': return `rgba(59, 130, 246, ${opacity})`; // Blue
                default: return `rgba(234, 179, 8, ${opacity})`;
            }
        };

        // Get secondary color for gradient effects
        const getSecondaryColor = (type: string, opacity = 0.4) => {
            switch (type) {
                case 'daily': return `rgba(250, 204, 21, ${opacity})`; // Lighter yellow
                case 'weekly': return `rgba(168, 85, 247, ${opacity})`; // Lighter purple
                case 'monthly': return `rgba(96, 165, 250, ${opacity})`; // Lighter blue
                default: return `rgba(250, 204, 21, ${opacity})`;
            }
        };

        // Random floating animation durations for more organic movement
        const getRandomDuration = () => {
            return 25 + Math.random() * 20; // Increased from 20-40 to 25-45 seconds
        };

        return (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {sectionShapes.map((shape, index) => {
                    // Base style with better positioning
                    const baseStyle = {
                        width: `${shape.size}px`,
                        height: shape.type === 'hexagon' ? `${shape.size * 0.866}px` : `${shape.size}px`,
                        left: `${shape.baseX}%`,
                        top: `${shape.baseY}%`,
                        opacity: isActive ? shape.opacity * 1.5 : shape.opacity, // Brighten when active
                        transform: `rotate(${shape.rotation}deg)`,
                        transition: 'opacity 0.8s ease-in-out',
                    };

                    // Create animation variants based on shape type
                    // Fix for the DynamicShapes component variants
                    const variants = {
                        float: {
                            x: [20, -20, 20],
                            y: [10, -10, 10],
                            rotate: [shape.rotation, shape.rotation + 15, shape.rotation],
                            transition: {
                                duration: getRandomDuration(),
                                repeat: Infinity,
                                repeatType: "reverse" as const,  // Type assertion needed
                                ease: "easeInOut"
                            }
                        }
                    };

                    // Enhanced gradient effects with dual colors for each shape
                    const gradientStyle = {
                        background: `radial-gradient(circle, ${getSecondaryColor(sectionType)} 0%, ${getShapeColor(sectionType, 0.1)} 70%, transparent 100%)`,
                        boxShadow: isActive ? `0 0 40px 5px ${getShapeColor(sectionType, 0.1)}` : 'none'
                    };

                    // Render different shape types with animations and effects
                    switch (shape.type) {
                        case 'circle':
                            return (
                                <motion.div
                                    key={index}
                                    className="absolute border-2 backdrop-blur-sm"
                                    style={{
                                        ...baseStyle,
                                        borderRadius: '50%',
                                        borderColor: getShapeColor(sectionType, 0.4),
                                        ...gradientStyle
                                    }}
                                    variants={variants}
                                    animate="float"
                                />
                            );
                        case 'square':
                            return (
                                <motion.div
                                    key={index}
                                    className="absolute border-2 backdrop-blur-sm"
                                    style={{
                                        ...baseStyle,
                                        borderColor: getShapeColor(sectionType, 0.4),
                                        ...gradientStyle
                                    }}
                                    variants={variants}
                                    animate="float"
                                />
                            );
                        case 'triangle':
                            return (
                                <motion.div
                                    key={index}
                                    className="absolute backdrop-blur-sm"
                                    style={{
                                        ...baseStyle,
                                        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                        border: `2px solid ${getShapeColor(sectionType, 0.4)}`,
                                        ...gradientStyle
                                    }}
                                    variants={variants}
                                    animate="float"
                                />
                            );
                        case 'hexagon':
                            return (
                                <motion.div
                                    key={index}
                                    className="absolute border-2 backdrop-blur-sm"
                                    style={{
                                        ...baseStyle,
                                        clipPath: 'polygon(0% 50%, 25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%)',
                                        borderColor: getShapeColor(sectionType, 0.4),
                                        ...gradientStyle
                                    }}
                                    variants={variants}
                                    animate="float"
                                />
                            );
                        default:
                            return null;
                    }
                })}

                {/* Add subtle particles for additional depth */}
                {isActive && Array.from({ length: 10 }).map((_, i) => {
                    const size = 2 + Math.random() * 4;
                    return (
                        <motion.div
                            key={`particle-${i}`}
                            className="absolute rounded-full"
                            style={{
                                width: `${size}px`,
                                height: `${size}px`,
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: getShapeColor(sectionType, 0.7),
                                opacity: 0.4,
                            }}
                            animate={{
                                y: [0, -100],
                                x: [0, Math.random() * 40 - 20],
                                opacity: [0.4, 0],
                            }}
                            transition={{
                                duration: 5 + Math.random() * 5,
                                repeat: Infinity,
                                delay: Math.random() * 5,
                            }}
                        />
                    );
                })}

                {/* Optional light beam effect for active sections */}
                {isActive && (
                    <motion.div
                        className="absolute"
                        style={{
                            width: '120%',
                            height: '10px',
                            left: '-10%',
                            top: '50%',
                            background: `linear-gradient(90deg, transparent 0%, ${getShapeColor(sectionType, 0.1)} 50%, transparent 100%)`,
                            transform: 'rotate(-30deg)',
                            filter: 'blur(8px)'
                        }}
                        animate={{
                            opacity: [0, 0.5, 0],
                            scale: [0.8, 1, 0.8],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                        }}
                    />
                )}
            </div>
        );
    };
    // Enhanced Parallax Quote Section with 3D transformations and interactions
    // Enhanced Parallax Quote Section with 3D transformations and interactions

    // Enhanced Parallax Quote Section using shadcn/ui
    const ParallaxQuoteSection = ({
        quote,
        title,
        motionStyle,
        opacityStyle,
        rotateX,
        scaleStyle,
        index,
        type,
        sectionRef
    }: ParallaxQuoteSectionProps) => {
        // Individual section scroll tracking
        const { scrollYProgress: sectionScroll } = useScroll({
            target: sectionRef,
            offset: ["start end", "end start"]
        });

        // Spring-based smoother section scroll for better feel
        const smoothSectionScroll = useSpring(sectionScroll, {
            stiffness: 80,
            damping: 20,
            restDelta: 0.001
        });

        // Additional parallax effects specific to each section
        const contentY = useTransform(smoothSectionScroll, [0, 1], [150, -150], { ease: customEase }); // Increased from [100, -100]
        const contentX = useTransform(smoothSectionScroll, [0, 1], [index % 2 === 0 ? -30 : 30, 0]); // Added subtle horizontal movement
        const quoteMarkTopParallax = useTransform(smoothSectionScroll, [0, 1], [-30, 30]); // Increased from [-20, 20]
        const quoteMarkBottomParallax = useTransform(smoothSectionScroll, [0, 1], [30, -30]); // Increased from [20, -20]
        const cardRotateZ = useTransform(smoothSectionScroll, [0, 1], [index % 2 === 0 ? -2 : 2, 0]);

        // Is this section currently active
        const isActive = activeSection === type;

        // Get color variables based on quote type
        const getColorClasses = () => {
            switch (type) {
                case 'daily':
                    return {
                        accent: 'bg-yellow-500',
                        text: 'text-yellow-500',
                        border: 'border-yellow-500/30', // Increased opacity from /20 to /30
                        glow: 'bg-yellow-500/10', // Increased from /5 to /10
                        icon: 'text-yellow-500',
                        gradient: 'from-yellow-500/20 to-transparent' // New gradient class
                    };
                case 'weekly':
                    return {
                        accent: 'bg-purple-500',
                        text: 'text-purple-500',
                        border: 'border-purple-500/30', // Increased opacity
                        glow: 'bg-purple-500/10', // Increased glow
                        icon: 'text-purple-500',
                        gradient: 'from-purple-500/20 to-transparent' // New gradient class
                    };
                case 'monthly':
                    return {
                        accent: 'bg-blue-500',
                        text: 'text-blue-500',
                        border: 'border-blue-500/30', // Increased opacity
                        glow: 'bg-blue-500/10', // Increased glow
                        icon: 'text-blue-500',
                        gradient: 'from-blue-500/20 to-transparent' // New gradient class
                    };
                default:
                    return {
                        accent: 'bg-yellow-500',
                        text: 'text-yellow-500',
                        border: 'border-yellow-500/30',
                        glow: 'bg-yellow-500/10',
                        icon: 'text-yellow-500',
                        gradient: 'from-yellow-500/20 to-transparent'
                    };
            }
        };

        const colors = getColorClasses();

        // Loading state with themed colors
        if (!quote) return (
            <motion.div
                ref={sectionRef}
                className="h-screen flex items-center justify-center"
                style={{ y: motionStyle }}
            >
                <div className="text-center text-white">
                    <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${colors.border.replace('/20', '')} mx-auto mb-4`}></div>
                    <p className="text-xl">Yükleniyor...</p>
                </div>
            </motion.div>
        );

        // Calculate dynamic background gradient
        const getBgGradient = () => {
            switch (type) {
                case 'daily':
                    return 'from-gray-950 via-gray-900 to-black';
                case 'weekly':
                    return 'from-gray-950 via-gray-900 to-black';
                case 'monthly':
                    return 'from-gray-950 via-gray-900 to-black';
                default:
                    return 'from-gray-950 via-gray-900 to-black';
            }
        };

        return (
            <motion.div
                ref={sectionRef}
                id={`${type}-section`}
                className="min-h-screen flex items-center justify-center relative overflow-hidden py-20" // Added py-20 padding
                style={{ y: motionStyle }}
            >
                {/* Dynamic background without particles */}
                <motion.div
                    className={`absolute inset-0 w-full h-full bg-gradient-to-br ${getBgGradient()}`}
                    style={{ opacity: opacityStyle }}
                >
                    {/* Dynamic shapes with mouse interaction */}
                    <DynamicShapes sectionType={type} />

                    {/* Subtle decorative patterns with parallax */}
                    <motion.div
                        className="absolute inset-0 opacity-5"
                        style={{
                            y: useTransform(smoothSectionScroll, [0, 1], [0, -80]), // Increased from -50 to -80
                        }}
                    >
                        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-10"></div>
                    </motion.div>

                    <div className={`absolute top-1/4 left-1/3 w-96 h-96 rounded-full ${colors.glow} filter blur-3xl`}></div>
                    <div className={`absolute bottom-1/3 right-1/4 w-128 h-128 rounded-full ${colors.glow} filter blur-3xl`}></div>

                    {/* Gradient overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-radial from-transparent to-black/90"></div>
                </motion.div>

                {/* Use shadcn/ui Card component */}
                <motion.div
                    className="relative z-10 w-full max-w-4xl mx-8"
                    style={{
                        y: contentY,
                        x: contentX, // Added horizontal movement
                        scale: scaleStyle,
                        rotateX: rotateX,
                        rotateZ: cardRotateZ, // Added Z-axis rotation
                        transformPerspective: 1200, // Increased from 1000
                    }}
                >
                    <Card className={`backdrop-blur-lg bg-black/50 border ${colors.border} shadow-lg shadow-${type === 'daily' ? 'yellow' : type === 'weekly' ? 'purple' : 'blue'}-500/10`}>
                        <CardHeader className="text-center relative overflow-hidden">
                            <div className={`absolute inset-0 bg-gradient-to-b ${colors.gradient} opacity-20`}></div>

                            <motion.div
                                className={`w-20 h-1 ${colors.accent} mb-6 mx-auto rounded-full`} // Increased width and margin
                                whileInView={{ width: isActive ? "8rem" : "5rem" }} // Increased from 6rem/4rem
                                initial={{ width: "0rem" }}
                                animate={{ width: isActive ? "8rem" : "5rem" }}
                                transition={{ duration: 1 }}
                            ></motion.div>

                            <div className="flex items-center justify-center mb-6"> {/* Increased margin */}
                                <div className={`mr-4 ${colors.icon}`}> {/* Increased margin */}
                                    {type === 'daily' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10"> {/* Increased size */}
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                        </svg>
                                    )}
                                    {type === 'weekly' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                                        </svg>
                                    )}
                                    {type === 'monthly' && (
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                                        </svg>
                                    )}
                                </div>
                                <h3 className={`text-3xl sm:text-5xl font-bold text-white tracking-wide`}>{title}</h3> {/* Increased font size */}
                            </div>
                        </CardHeader>

                        <CardContent className="relative px-8 py-6"> {/* Increased padding */}
                            {/* Quote marks with enhanced parallax */}
                            <motion.div
                                className={`absolute -top-14 -left-6 text-7xl ${colors.text.replace('text-', 'text-')}/20 font-serif`} // Larger text and positioning
                                style={{ y: quoteMarkTopParallax }}
                            >
                                "
                            </motion.div>
                            <motion.div
                                className={`absolute -bottom-20 -right-6 text-7xl ${colors.text.replace('text-', 'text-')}/20 font-serif`} // Larger text and positioning
                                style={{ y: quoteMarkBottomParallax }}
                            >
                                "
                            </motion.div>

                            {/* Quote text with enhanced animation */}
                            <motion.p
                                className="text-2xl sm:text-4xl text-white font-medium italic leading-relaxed mb-12 text-center py-8" // Larger text and spacing
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                            >
                                {quote.content}
                            </motion.p>
                        </CardContent>

                        <CardFooter className="flex justify-center flex-col text-center pb-8"> {/* Increased padding */}
                            <motion.p
                                className={`text-2xl font-semibold ${colors.text}`} // Increased font size
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                — {quote.author}
                            </motion.p>
                            <motion.p
                                className="text-gray-400 text-sm mt-3" // Increased margin
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {new Date(quote.publishedAt).toLocaleDateString('tr-TR', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </motion.p>
                        </CardFooter>
                    </Card>
                </motion.div>
            </motion.div>
        );
    };

    // Simplified HeroHeader without particle effects and reduced animations
    const HeroHeader = () => {
        return (
            <motion.div
                ref={headerRef}
                className="h-screen flex items-center justify-center relative overflow-hidden"
                style={{
                    y: headerParallax,
                    scale: headerScale,
                    rotateX: headerRotate,
                }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-black"
                    style={{ opacity: headerOpacity }}
                >
                    {/* Dynamic shapes only - no particles */}
                    <DynamicShapes sectionType="header" />

                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>
                </motion.div>

                {/* Main hero content with animated entrance */}
                <motion.div
                    className="relative z-10 text-center px-6"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    <motion.h1
                        className="text-5xl md:text-7xl font-bold text-white mb-6"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <span className="text-yellow-500">Hergünebi'</span>şey
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-10"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    >
                        Günlük ilham veren alıntılarla, düşüncelerinizi ve gününüzü aydınlatın.
                    </motion.p>
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                    >
                        <motion.button
                            className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 px-8 rounded-md transition-all"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => document.getElementById('daily-section')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            Günün Alıntısı
                        </motion.button>
                    </motion.div>

                    {/* Animated scroll indicator */}
                    <motion.div
                        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
                        animate={{
                            y: [0, 10, 0],
                            opacity: [0.5, 0.8, 0.5]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </motion.div>
                </motion.div>
            </motion.div>
        );
    };

    // Loading screen while client-side rendering
    if (!isClient) {
        return (
            <div className="h-screen flex items-center justify-center bg-black">
                <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500 mx-auto mb-4"></div>
                    <p className="text-xl">Sayfa yükleniyor...</p>
                </div>
            </div>
        );
    }

    return (
        <div ref={containerRef} className="bg-black min-h-screen">
            {/* Hero Header */}
            <HeroHeader />

            {/* Daily Quote Section with yellow theme */}
            <ParallaxQuoteSection
                quote={quotes.daily}
                title="Günün Alıntısı"
                motionStyle={dailyParallax}
                opacityStyle={dailyOpacity}
                rotateX={dailyRotateX}
                scaleStyle={dailyScale}
                index={0}
                type="daily"
                color="yellow"
                sectionRef={dailyRef}
            />

            {/* Weekly Quote Section with purple theme */}
            <ParallaxQuoteSection
                quote={quotes.weekly}
                title="Haftanın Alıntısı"
                motionStyle={weeklyParallax}
                opacityStyle={weeklyOpacity}
                rotateX={weeklyRotateX}
                scaleStyle={weeklyScale}
                index={1}
                type="weekly"
                color="purple"
                sectionRef={weeklyRef}
            />

            {/* Monthly Quote Section with blue theme */}
            <ParallaxQuoteSection
                quote={quotes.monthly}
                title="Ayın Alıntısı"
                motionStyle={monthlyParallax}
                opacityStyle={monthlyOpacity}
                rotateX={monthlyRotateX}
                scaleStyle={monthlyScale}
                index={2}
                type="monthly"
                color="blue"
                sectionRef={monthlyRef}
            />



            {/* Minimal copyright text */}
            <div className="h-16 bg-black flex items-center justify-center">
                <p className="text-gray-500 text-sm">© 2025 Hergünebi'şey. Tüm Hakları Saklıdır.</p>
            </div>
        </div>
    );
}