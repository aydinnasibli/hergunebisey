// app/blog/page.tsx
'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts, getCategories, urlFor } from '@/lib/sanity'
import { format } from 'date-fns' // Changed from formatDistance
import { tr } from 'date-fns/locale'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Search, X, ChevronRight, Clock, ChevronLeft } from 'lucide-react'

interface BlogPost {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: SanityImageSource
    publishedAt: string
    categories?: string[]
    author?: {
        name: string
        image?: SanityImageSource
        bio?: string
    }
}

interface Category {
    _id: string
    title: string
    description?: string
}

export default function BlogPage() {
    const parallaxRef = useRef<HTMLDivElement>(null);
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 9
    const [totalPages, setTotalPages] = useState(1)
    const [paginatedPosts, setPaginatedPosts] = useState<BlogPost[]>([])

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const fetchedPosts = await getBlogPosts()
                const fetchedCategories = await getCategories()

                setPosts(fetchedPosts)
                setFilteredPosts(fetchedPosts)
                setCategories(fetchedCategories)
            } catch (error) {
                console.error('Error fetching data:', error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        // Filter posts based on search query and selected category
        let results = posts

        if (searchQuery) {
            results = results.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()))
            )
        }

        if (selectedCategory) {
            results = results.filter(post =>
                post.categories && post.categories.includes(selectedCategory)
            )
        }

        setFilteredPosts(results)
        // Reset to first page when filters change
        setCurrentPage(1)
    }, [searchQuery, selectedCategory, posts])

    // Update pagination whenever filtered posts change
    useEffect(() => {
        const total = Math.ceil(filteredPosts.length / postsPerPage)
        setTotalPages(total || 1) // Ensure at least 1 page even if no results

        // Get current posts for pagination
        const indexOfLastPost = currentPage * postsPerPage
        const indexOfFirstPost = indexOfLastPost - postsPerPage
        setPaginatedPosts(filteredPosts.slice(indexOfFirstPost, indexOfLastPost))
    }, [filteredPosts, currentPage])

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCategory(null)
    }

    // Pagination navigation
    const goToPage = (pageNumber: number) => {
        // Scroll to blog section
        const blogSection = document.getElementById('blog-content')
        if (blogSection) {
            blogSection.scrollIntoView({ behavior: 'smooth' })
        }
        setCurrentPage(pageNumber)
    }

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1)
        }
    }

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1)
        }
    }
    // Generate page numbers for pagination
    const renderPaginationNumbers = () => {
        const pageNumbers = []
        const maxPagesToShow = 5 // Show at most 5 page numbers

        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

        // Adjust start page if we're near the end
        if (totalPages - startPage < maxPagesToShow - 1) {
            startPage = Math.max(1, totalPages - maxPagesToShow + 1)
        }

        // First page
        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key="page-1"
                    onClick={() => goToPage(1)}
                    className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 transition-all"
                >
                    1
                </button>
            )

            // Show dots if not directly after first page
            if (startPage > 2) {
                pageNumbers.push(
                    <span key="dots-1" className="px-2 text-gray-500">...</span>
                )
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={`page-${i}`}
                    onClick={() => goToPage(i)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md transition-all cursor-pointer ${currentPage === i
                        ? 'bg-yellow-500 text-gray-900 font-medium shadow-lg shadow-yellow-500/20'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                        }`}
                >
                    {i}
                </button>
            )
        }

        // Last page
        if (endPage < totalPages) {
            // Show dots if not directly before last page
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <span key="dots-2" className="px-2 text-gray-500">...</span>
                )
            }

            pageNumbers.push(
                <button
                    key={`page-${totalPages}`}
                    onClick={() => goToPage(totalPages)}
                    className="w-10 h-10 flex items-center justify-center rounded-md bg-white/10 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 transition-all"
                >
                    {totalPages}
                </button>
            )
        }

        return pageNumbers
    }

    return (
        <>
            <div className="relative h-screen overflow-hidden">
                {/* Parallax Background */}
                <div
                    ref={parallaxRef}
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '120%',
                        top: '-10%'
                    }}
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60 z-10"></div>

                {/* Content */}
                <div className="relative z-20 h-full text-white flex flex-col justify-center items-center px-4 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="w-16 h-1 bg-yellow-500 mx-auto mb-8"></div>
                        <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-wide">
                            YAZI<span className="text-yellow-500">.</span>
                        </h1>

                        <p className="text-base sm:text-xl max-w-2xl mx-auto mb-12 text-white/90">
                            Bilim, tarih ve kültür ağırlıklı konularda yazdığımız zaman zaman ise teknoloji ve felsefe gibi alanlara da değindiğimiz yazılarımız ile okurken hem öğrenin hem de keyifli zaman geçirin.
                        </p>

                        {/* Scroll indicator */}
                        <div className="absolute bottom-6 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                            <p className="text-sm uppercase tracking-widest mb-2">Aşağı Kaydır</p>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div id="blog-content" className="relative bg-black text-white py-24 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute text-9xl font-bold text-white whitespace-nowrap top-64 left-10" >
                        BLOG
                    </div>
                    <div className="absolute text-9xl font-bold text-white whitespace-nowrap top-7/12 left-32" >
                        OKU, KEŞFET
                    </div>
                    <div className="absolute text-9xl font-bold text-white whitespace-nowrap bottom-10 right-10" >
                        BLOG
                    </div>
                </div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Search and Filter Section */}
                        <div className="mb-12 bg-white/5 backdrop-blur-sm p-8 rounded-xl">
                            <div className="flex flex-col md:flex-row gap-8 items-center justify-between mb-6">
                                {/* Categories Section */}

                                <div className="mt-1 ">
                                    <h3 className="text-yellow-500 font-medium mb-4">Kategoriler</h3>
                                    <div className="flex flex-wrap gap-3">
                                        <button
                                            onClick={() => setSelectedCategory(null)}
                                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${selectedCategory === null
                                                ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/20'
                                                : 'bg-white/10 hover:bg-white/20 text-gray-300'
                                                }`}
                                        >
                                            Tümü
                                        </button>
                                        {categories.map((category) => (
                                            <button
                                                key={category._id}
                                                onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${selectedCategory === category.title
                                                    ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/20'
                                                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                                                    }`}
                                            >
                                                {category.title}
                                            </button>
                                        ))}
                                        {(searchQuery || selectedCategory) && (
                                            <button
                                                onClick={clearFilters}
                                                className="flex items-center gap-1 px-6 py-2 rounded-full text-sm font-medium bg-red-900/50 text-red-200 hover:bg-red-800 transition-all duration-300 border border-red-800/50 cursor-pointer"
                                            >
                                                <X className="h-4 w-4" />
                                                Filtreleri Temizle
                                            </button>
                                        )}
                                    </div>
                                </div>

                            </div>

                            {/* Search Bar Section */}
                            <div className="relative w-full md:w-96 group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Search className="h-5 w-5 text-yellow-500" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-3 bg-white/10 rounded-xl border border-gray-700 focus:border-yellow-500 text-gray-200 placeholder-gray-500 transition-all duration-300 focus:outline-none"
                                    placeholder="Yazılarda ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Posts Grid */}
                        {isLoading ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {[...Array(9)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse"
                                    >
                                        <div className="h-48 bg-gray-700"></div>
                                        <div className="p-6">
                                            <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                                            <div className="h-8 bg-gray-700 rounded w-full mb-4"></div>
                                            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                                            <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="text-center py-16">
                                <div className="text-xl font-medium text-gray-300 mb-2">İçerik bulunamadı</div>
                                <p className="text-gray-400">Lütfen arama veya filtre kriterlerinizi değiştirin</p>
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedPosts.map((post) => (
                                    <div
                                        key={post._id}
                                        className="hover:-translate-y-2 transition-transform duration-300"
                                    >
                                        <Link href={`/blog/${post.slug.current}`}>
                                            <div className="relative border border-white/40 group bg-black/25 rounded-xl overflow-hidden shadow-lg h-full flex flex-col transform transition-all duration-300 hover:shadow-yellow-500/25">
                                                <div className="absolute inset-0 transition-opacity duration-300 z-10"></div>

                                                {post.mainImage ? (
                                                    <div className="relative h-64 w-full overflow-hidden">
                                                        <div className="absolute inset-0">
                                                            <Image
                                                                src={urlFor(post.mainImage).url()}
                                                                alt={post.title}
                                                                fill
                                                                className="object-cover transition-transform duration-700 transform-origin-center"
                                                                style={{ transformOrigin: 'center center' }}
                                                            />
                                                        </div>
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none"></div>

                                                        {/* Categories on image */}
                                                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-20">
                                                            {post.categories?.map((category, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="text-xs text-white font-medium bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 shadow-md"
                                                                >
                                                                    {category}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="h-64 bg-gray-700 flex items-center justify-center relative">
                                                        <span className="text-gray-500">Görsel yok</span>

                                                        {/* Categories on placeholder */}
                                                        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                                            {post.categories?.map((category, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="text-xs font-medium bg-white/10 text-white rounded-full px-3 py-1 shadow-md"
                                                                >
                                                                    {category}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Divider Line - Adding the thin line here */}
                                                <div className="h-px bg-white/25 w-full"></div>

                                                <div className="p-6 flex flex-col flex-grow">
                                                    <h2 className="text-2xl font-bold mb-3 text-gray-100 line-clamp-2 transition-colors duration-300">
                                                        {post.title}
                                                    </h2>

                                                    {post.excerpt && (
                                                        <p className="text-gray-400 mb-6 line-clamp-3 flex-grow">
                                                            {post.excerpt}
                                                        </p>
                                                    )}

                                                    {/* Author information */}
                                                    {post.author && (
                                                        <div className="flex items-center mb-4">
                                                            {post.author.image ? (
                                                                <div className="relative w-8 h-8 mr-2 rounded-full overflow-hidden border border-yellow-500/50">
                                                                    <Image
                                                                        src={urlFor(post.author.image).url()}
                                                                        alt={post.author.name}
                                                                        fill
                                                                        className="object-cover"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                <div className="w-8 h-8 mr-2 rounded-full bg-gray-700 flex items-center justify-center text-yellow-500">
                                                                    {post.author.name.charAt(0)}
                                                                </div>
                                                            )}
                                                            <span className="text-sm text-gray-300">{post.author.name}</span>
                                                        </div>
                                                    )}

                                                    <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t border-gray-700">
                                                        <time dateTime={post.publishedAt} className="text-gray-400 flex items-center">
                                                            <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                                                            {/* Changed from formatDistance to format */}
                                                            {format(new Date(post.publishedAt), 'd MMMM yyyy', {
                                                                locale: tr
                                                            })}
                                                        </time>

                                                        <span className="flex items-center group/button">
                                                            <span className="text-yellow-500 font-medium mr-1 transition-all duration-300 group-hover/button:mr-2">
                                                                Makaleyi Oku
                                                            </span>
                                                            <div className="bg-yellow-500 rounded-full p-1">
                                                                <ChevronRight className="w-4 h-4 text-gray-900" />
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {!isLoading && filteredPosts.length > 0 && (
                            <div className="mt-16 flex flex-wrap justify-center items-center gap-2">
                                {/* Previous Page Button */}
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className={`flex items-center justify-center px-4 py-2 rounded-md ${currentPage === 1
                                        ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                        : 'bg-white/10 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 transition-all cursor-pointer'
                                        }`}
                                >
                                    <ChevronLeft className="w-5 h-5 mr-1" />
                                    <span className="hidden sm:inline">Önceki</span>
                                </button>

                                {/* Page Numbers */}
                                <div className="flex items-center gap-2 px-2">
                                    {renderPaginationNumbers()}
                                </div>

                                {/* Next Page Button */}
                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className={`flex items-center justify-center px-4 py-2 rounded-md ${currentPage === totalPages
                                        ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                                        : 'bg-white/10 text-gray-300 hover:bg-yellow-500 hover:text-gray-900 transition-all cursor-pointer'
                                        }`}
                                >
                                    <span className="hidden sm:inline">Sonraki</span>
                                    <ChevronRight className="w-5 h-5 ml-1" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}