"use client"
import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { subscribeToNewsletter } from '@/app/actions/newsletter.actions';

interface FormState {
    status: 'idle' | 'submitting' | 'success' | 'error';
    message: string;
}

const Footer = () => {
    const [currentYear] = useState<number>(new Date().getFullYear());
    const [email, setEmail] = useState<string>('');
    const [formState, setFormState] = useState<FormState>({
        status: 'idle',
        message: '',
    });

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Update form state to submitting
        setFormState({ status: 'submitting', message: 'Gönderiliyor...' });

        try {
            // Call the server action
            const result = await subscribeToNewsletter(email);

            if (result.success) {
                setFormState({
                    status: 'success',
                    message: result.message || 'Bültenimize başarıyla kaydoldunuz!',
                });
                setEmail(''); // Clear email input on success
            } else {
                setFormState({
                    status: 'error',
                    message: result.message || 'Bir hata oluştu. Lütfen tekrar deneyin.',
                });
            }
        } catch (error) {
            setFormState({
                status: 'error',
                message: 'Bir hata oluştu. Lütfen tekrar deneyin.',

            });
            console.log('Error during form submission:', error);
        }
    };

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

                    {/* Newsletter subscription form */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-yellow-500 uppercase tracking-wider text-sm font-bold mb-6 relative inline-block">
                            Bültenimize Abone Olun
                        </h3>
                        <p className="text-white/70 mb-6">
                            En yeni içeriklerimizden haberdar olmak için bültenimize abone olun.
                        </p>
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-posta adresiniz"
                                className="w-full bg-white/10 rounded-l-md py-3 px-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-500 border-r-0 border border-white/20"
                                required
                                aria-label="E-posta adresiniz"
                                disabled={formState.status === 'submitting'}
                            />
                            <button
                                type="submit"
                                className={`absolute right-0 top-0 h-full px-4 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-r-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-700 ${formState.status === 'submitting' ? 'opacity-70 cursor-not-allowed' : ''
                                    }`}
                                disabled={formState.status === 'submitting'}
                            >
                                {formState.status === 'submitting' ? (
                                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    "Abone Ol"
                                )}
                            </button>
                        </form>
                        {formState.status !== 'idle' && (
                            <p className={`mt-2 text-sm ${formState.status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {formState.message}
                            </p>
                        )}
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