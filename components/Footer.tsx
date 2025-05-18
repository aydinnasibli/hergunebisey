"use client"
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const Footer = () => {
    const [currentYear] = useState<number>(new Date().getFullYear());
    const [isEmbedLoaded, setIsEmbedLoaded] = useState<boolean>(false);
    const embedRef = useRef<HTMLDivElement | null>(null);

    // Handle beehiiv embed loading
    useEffect(() => {
        // Create a new beehiiv embed on client-side only
        if (typeof window !== 'undefined' && embedRef.current) {
            // Force iframe to reload after component mounts
            const iframe = document.createElement('iframe');
            iframe.src = "https://embeds.beehiiv.com/a61b55fa-b6ac-4c3c-b174-964cf902b10e?slim=true";
            iframe.dataset.testId = "beehiiv-embed"; // Use dataset for data attributes
            iframe.height = "52";
            iframe.style.border = "none"; // Use style instead of deprecated frameBorder
            iframe.style.overflow = "hidden"; // Use style instead of deprecated scrolling
            iframe.loading = "lazy";
            iframe.title = "E-bülten aboneliği";
            iframe.style.width = '100%';
            iframe.style.margin = '0';
            iframe.style.borderRadius = '0';
            iframe.style.backgroundColor = 'transparent';

            // Add event listener to handle successful load
            iframe.onload = () => setIsEmbedLoaded(true);

            // Clear container and append new iframe
            const container = embedRef.current;
            if (container) {
                container.innerHTML = '';
                container.appendChild(iframe);
            }
        }

        // Clean up function to prevent memory leaks
        return () => {
            if (embedRef.current) {
                embedRef.current.innerHTML = '';
            }
        };
    }, []); // Empty dependency array means this runs once on mount

    // Social media icons array for better maintainability
    const socialIcons = [

        {
            name: 'Instagram',
            href: 'https://instagram.com/flavumnullus',
            icon: <>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </>
        },
        {
            name: 'X',
            href: 'https://x.com/flavumnullus',
            icon: (
                <path d="M17.53 3H21L14.16 10.8 22.34 21h-6.27l-4.76-6.05L5.74 21H2l7.3-7.93L.66 3h6.43l4.38 5.6L17.53 3Z" />
            ),
        },


        // {
        //     name: 'YouTube',
        //     href: 'https://youtube.com/c/yourchannelhere', // Replace with your actual YouTube channel URL
        //     icon: <>
        //         <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
        //         <polygon fill="currentColor" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        //     </>
        // },
    ];

    // Interface for footer links
    interface FooterLink {
        name: string;
        href: string;
    }

    interface FooterCategory {
        title: string;
        links: FooterLink[];
    }

    // Footer link categories for better organization
    const footerLinks: FooterCategory[] = [
        {
            title: 'İçerikler',
            links: [
                { name: 'Yazı', href: '/blog' },
                { name: 'Podcast', href: '/podcast' },
                { name: 'Alıntı', href: '/quote' },
                { name: 'Hakkımızda', href: '/about' },
            ]
        },
        {
            title: 'Kurumsal',
            links: [
                { name: 'Gizlilik', href: '/privacy' },
                { name: 'Kullanım Şartları', href: '/terms' },
                { name: 'Çerez Politikası', href: '/cookies' },
            ]
        }
    ];

    return (
        <footer
            id="main-footer"
            className="bg-black text-white relative overflow-hidden opacity-100"
            aria-label="Site footer"
        >
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute text-9xl font-bold text-white whitespace-nowrap" style={{ top: '20%', left: '-5%' }}>
                    HERGÜNEBİ&apos;ŞEY
                </div>
            </div>

            {/* Diagonal line divider (static) */}

            <div className="absolute top-0 left-0 w-full h-8 overflow-hidden">
                <div className="absolute w-full h-16 bg-yellow-500 transform -rotate-1 -translate-y-12"></div>
            </div>
            <div className="container mx-auto px-4 pt-20 pb-8">
                <div className="flex flex-col md:flex-row justify-between mb-16 gap-12">
                    {/* Logo and info */}
                    <div className="w-full md:w-1/3">
                        <Link href="/" className="text-white font-bold text-3xl tracking-wider inline-block mb-6" aria-label="Hergünebi'şey ana sayfaya dön">
                            Hergünebi&apos;şey
                            <span className="text-yellow-500 inline-block">.</span>
                        </Link>
                        <p className="text-white/70 mb-8 max-w-md">
                            Hayatınıza değer ve anlam katacak içerikler
                        </p>
                        <div className="flex space-x-4">
                            {/* Social icons */}
                            {socialIcons.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transition-colors hover:bg-yellow-500 duration-300"
                                    aria-label={`${social.name}'da bizi takip edin`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        {social.icon}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links - two column layout */}
                    <div className="w-full md:w-1/3 grid grid-cols-2 gap-8">
                        {footerLinks.map((category, idx) => (
                            <div key={idx}>
                                <h3 className="text-yellow-500 uppercase tracking-wider text-sm font-bold mb-6 relative inline-block">
                                    {category.title}
                                </h3>
                                <ul className="space-y-3">
                                    {category.links.map((link, linkIdx) => (
                                        <li key={linkIdx}>
                                            <Link
                                                href={link.href}
                                                className="text-white/70 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 rounded"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Newsletter signup with beehiiv embed */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-yellow-500 uppercase tracking-wider text-sm font-bold mb-6 relative inline-block">
                            Bültene Abone Ol
                        </h3>
                        <p className="text-white/70 mb-6">
                            En yeni içeriklerden haberdar olmak için e-posta listemize katıl.
                        </p>

                        {/* beehiiv embed container */}
                        <div className="relative w-full bg-white/10 p-2 rounded-lg min-h-14">
                            {/* Embed container reference */}
                            <div
                                ref={embedRef}
                                className="w-full h-full min-h-12"
                                aria-label="E-bülten abonelik formu"
                            />

                            {/* Loading indicator */}
                            {!isEmbedLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/5">
                                    <div className="w-6 h-6 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                        </div>

                        {/* Subscriber count indicator */}
                        {/* <div className="flex items-center mt-4 text-white/50 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>1,500+ kişi abone oldu</span>
                        </div> */}
                    </div>
                </div>

                {/* Bottom bar with copyright */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-white/50 text-sm mb-4 md:mb-0">
                        © {currentYear} Hergünebi&apos;şey. Tüm hakları saklıdır.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;