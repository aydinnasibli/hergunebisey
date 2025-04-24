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
            name: 'Facebook',
            href: 'https://facebook.com/hergunebiseycom',
            icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        },
        {
            name: 'Instagram',
            href: 'https://instagram.com/hergunebiseycom',
            icon: <>
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </>
        },
        {
            name: 'Twitter',
            href: 'https://twitter.com/hergunebiseycom',
            icon: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        },
        {
            name: 'LinkedIn',
            href: 'https://linkedin.com/company/hergunebiseycom',
            icon: <>
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
            </>
        }
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
                { name: 'Blog', href: '/blog' },
                { name: 'Podcast', href: '/podcast' },
                { name: 'Alıntılar', href: '/quote' },
                { name: 'Videolar', href: '/videos' },
                { name: 'Tüm İçerikler', href: '/content' }
            ]
        },
        {
            title: 'Kurumsal',
            links: [
                { name: 'Hakkımızda', href: '/about' },
                { name: 'İletişim', href: '/contact' },
                { name: 'Gizlilik', href: '/privacy' },
                { name: 'Kullanım Şartları', href: '/terms' },
                { name: 'SSS', href: '/faq' }
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
                                    className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center transition-colors hover:bg-yellow-500"
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
                        <div className="flex items-center mt-4 text-white/50 text-sm">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                            <span>1,500+ kişi abone oldu</span>
                        </div>
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