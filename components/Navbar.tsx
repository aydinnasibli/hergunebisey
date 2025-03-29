"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useLayoutEffect } from "react"
import { usePathname } from "next/navigation"

export default function Navbar() {
    const [activeTab, setActiveTab] = useState("")
    const [hoverTab, setHoverTab] = useState("")
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)
    const [isTop, setIsTop] = useState(true)

    const menuItems = [
        { name: "BLOG", href: "/blog" },
        { name: "PODCAST", href: "#podcast" },
        { name: "QUOTE", href: "#quote" },
        { name: "HAKKIMIZDA", href: "#hakkimizda" },
    ]

    const pathname = usePathname()
    const isHomePage = pathname === "/"

    useLayoutEffect(() => {
        let ticking = false
        const threshold = 10

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY || document.documentElement.scrollTop

                    if (Math.abs(lastScrollY - scrollY) > threshold) {
                        setIsVisible(scrollY < lastScrollY)
                        setLastScrollY(scrollY)
                    }

                    setIsTop(scrollY < 10) // Fix for Safari detecting top correctly
                    ticking = false
                })

                ticking = true
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [lastScrollY])

    return (
        <>
            {isHomePage && (
                <header
                    className={`md:fixed absolute top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out
                    ${isVisible ? "translate-y-0" : "-translate-y-full"} 
                    ${isTop ? "bg-transparent" : "bg-black/70 shadow-md"}`}
                    style={{ willChange: "transform", backfaceVisibility: "hidden" }}
                >
                    <div className="flex items-center justify-between py-4 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                        <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/placeholder.svg?height=64&width=64"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="rounded-full bg-black"
                                />
                            </div>
                            <Link onClick={() => setActiveTab("")} href="/" className="px-4 text-2xl text-white tracking-widest font-medium">
                                Hergünebi'şey
                            </Link>
                        </div>

                        <nav className="hidden md:flex items-center justify-center space-x-16 relative">
                            {menuItems.map((item) => (
                                <div key={item.name} className="relative">
                                    <Link
                                        href={item.href}
                                        className={`relative py-2 px-2 tracking-widest font-medium transition-colors 
                                        ${activeTab === item.name ? "text-white" : "text-white/70 hover:text-white"} `}
                                        onClick={() => setActiveTab(item.name)}
                                        onMouseEnter={() => setHoverTab(item.name)}
                                        onMouseLeave={() => setHoverTab("")}
                                    >
                                        {item.name}
                                        <span
                                            className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-[150%] bg-black transition-all transform duration-300 
                                            ${activeTab === item.name || hoverTab === item.name ? "scale-100" : "scale-0"}`}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>
                </header>
            )}

            {!isHomePage && (
                <header
                    className={`sticky top-0 left-0 w-full z-50 transition-transform duration-300 ease-in-out
                        ${isVisible ? "translate-y-0" : "-translate-y-full"} 
                        ${isTop ? "bg-transparent" : "bg-black/70 shadow-md"}`}
                    style={{ willChange: "transform", backfaceVisibility: "hidden" }}
                >
                    <div className="flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
                        <div className="flex items-center space-x-3">
                            <div className="relative w-10 h-10">
                                <Image
                                    src="/placeholder.svg?height=64&width=64"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                    className="rounded-full bg-black"
                                />
                            </div>
                            <Link onClick={() => setActiveTab("")} href="/" className="px-4 text-2xl tracking-widest font-medium">
                                Hergünebi'şey
                            </Link>
                        </div>

                        <nav className="flex items-center justify-center space-x-16 relative">
                            {menuItems.map((item) => (
                                <div key={item.name} className="relative">
                                    <Link
                                        href={item.href}
                                        className={`relative py-2 px-2 tracking-widest font-medium transition-colors 
                                        ${activeTab === item.name ? "text-black" : "text-black/70 hover:text-black"}`}
                                        onClick={() => setActiveTab(item.name)}
                                        onMouseEnter={() => setHoverTab(item.name)}
                                        onMouseLeave={() => setHoverTab("")}
                                    >
                                        {item.name}
                                        <span
                                            className={`absolute left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-[150%] bg-black transition-all transform duration-300 
                                            ${activeTab === item.name || hoverTab === item.name ? "scale-100" : "scale-0"}`}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </nav>
                    </div>
                </header>
            )}
        </>
    )
}
