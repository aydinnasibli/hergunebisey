"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    const { isSignedIn } = useUser();

    // Track scroll position to change header style
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Toggle mobile menu
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {/* Fixed header that changes style on scroll */}
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-black/80 backdrop-blur-md py-4'
                    : 'bg-gradient-to-b from-black/70 to-transparent py-6'
                    }`}
            >
                <div className="container mx-auto px-4 flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="text-white font-bold text-2xl tracking-wider">
                        Hergünebi'şey<span className="text-yellow-500">.</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <NavLinks />

                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-4">
                            {isSignedIn ? (
                                <UserButton
                                    afterSignOutUrl="/"
                                    userProfileUrl="/profile"
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "w-10 h-10"
                                        }
                                    }}
                                />
                            ) : (
                                <>
                                    <SignInButton mode="modal">
                                        <button className="text-white uppercase tracking-wider font-medium hover:text-yellow-500 transition-colors text-sm">
                                            Giriş
                                        </button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                        <button className="px-6 py-2 bg-yellow-500 text-black font-medium rounded-full uppercase tracking-wider text-sm hover:bg-yellow-400 transition-colors">
                                            Kayıt
                                        </button>
                                    </SignUpButton>
                                </>
                            )}
                        </div>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden text-white p-2"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Mobile Navigation Overlay */}
            <div
                className={`fixed inset-0 bg-black z-40 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                    }`}
            >
                <div className="h-full flex flex-col justify-center items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="absolute top-6 right-6 text-white"
                        aria-label="Close mobile menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <nav className="flex flex-col items-center space-y-8">
                        <NavLinks isMobile={true} closeMenu={() => setMobileMenuOpen(false)} />

                        {/* Auth Buttons for Mobile */}
                        {isSignedIn ? (
                            <div className="py-4">
                                <UserButton
                                    afterSignOutUrl="/"
                                    userProfileUrl="/profile"
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: "w-12 h-12"
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col space-y-4">
                                <SignInButton mode="modal">
                                    <button className="text-white uppercase tracking-wider font-medium hover:text-yellow-500 transition-colors text-xl">
                                        Giriş
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button className="px-8 py-3 bg-yellow-500 text-black font-medium rounded-full uppercase tracking-wider text-sm hover:bg-yellow-400 transition-colors">
                                        Kayıt
                                    </button>
                                </SignUpButton>
                            </div>
                        )}
                    </nav>
                </div>
            </div>
        </>
    );
};

// Shared navigation links component
interface NavLinksProps {
    isMobile?: boolean;
    closeMenu?: () => void;
}

const NavLinks: React.FC<NavLinksProps> = ({ isMobile = false, closeMenu = () => { } }) => {
    const linkClasses = `text-white uppercase tracking-wider font-medium hover:text-yellow-500 transition-colors ${isMobile ? 'text-3xl' : 'text-sm'
        }`;

    const links = [
        { name: 'Blog', path: '/blog' },
        { name: 'Podcast', path: '/podcast' },
        { name: 'Quote', path: '/quote' },
        { name: 'Hakkımızda', path: '/hakkimizda' },
    ];

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.path}
                    className={linkClasses}
                    onClick={isMobile ? closeMenu : undefined}
                >
                    {link.name}
                </Link>
            ))}
        </>
    );
};

export default Navbar;



