// app/blog/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts, getCategories, urlFor } from '@/lib/sanity'
import { formatDistance } from 'date-fns'
import { tr } from 'date-fns/locale'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Search, X, ChevronRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

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
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

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
    }, [searchQuery, selectedCategory, posts])

    const clearFilters = () => {
        setSearchQuery('')
        setSelectedCategory(null)
    }

    // Framer Motion animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    return (
        <div className="min-h-screen pt-20 bg-black/90 text-gray-200">
            <div className="container mx-auto px-4 py-12">
                <motion.div
                    className="max-w-6xl mx-auto"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-16">
                        <motion.h1
                            className="text-5xl font-bold mb-4 text-yellow-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Blogumuz
                        </motion.h1>
                        <motion.p
                            className="text-lg text-gray-400 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Ekibimizden en son içgörüleri, güncellemeleri ve hikayeleri keşfedin
                        </motion.p>
                        <motion.div
                            className="w-24 h-1 bg-yellow-500 mx-auto mt-6"
                            initial={{ width: 0 }}
                            animate={{ width: 96 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        ></motion.div>
                    </div>

                    {/* REDESIGNED Search and Filter Section */}
                    <motion.div
                        className="mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                            {/* Elegant Search Bar */}
                            <div className="relative w-full md:w-96 group">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                                    <Search className="h-5 w-5 text-yellow-500" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-12 pr-4 py-3 bg-transparent border-b-2 border-gray-700 focus:border-yellow-500 text-gray-200 placeholder-gray-500 transition-all duration-300 focus:outline-none"
                                    placeholder="Makalelerde ara..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <motion.div
                                    className="absolute bottom-0 left-0 h-0.5 bg-yellow-500 w-0"
                                    initial={{ width: 0 }}
                                    animate={{ width: searchQuery ? '100%' : 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-500"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </div>

                            {/* Results Count */}
                            <div className="text-gray-400 text-sm">
                                {isLoading ? (
                                    'İçerikler yükleniyor...'
                                ) : (
                                    <>Toplam <span className="text-yellow-500 font-medium">{posts.length}</span> içerikten <span className="text-yellow-500 font-medium">{filteredPosts.length}</span> tanesi gösteriliyor</>
                                )}
                            </div>
                        </div>

                        {/* Categories Section - Separate */}
                        <div className="mt-6 pb-6 border-b border-gray-800">
                            <h3 className="text-yellow-500 font-medium mb-4">Kategoriler</h3>
                            <div className="flex flex-wrap gap-3">
                                <motion.button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === null
                                        ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/20'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                        }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Tümü
                                </motion.button>

                                {categories.map((category) => (
                                    <motion.button
                                        key={category._id}
                                        onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category.title
                                            ? 'bg-yellow-500 text-gray-900 shadow-lg shadow-yellow-500/20'
                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                                            }`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {category.title}
                                    </motion.button>
                                ))}

                                {(searchQuery || selectedCategory) && (
                                    <motion.button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium bg-red-900/50 text-red-200 hover:bg-red-800 transition-all duration-300 border border-red-800/50"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X className="h-4 w-4" />
                                        Filtreleri Temizle
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    {/* Posts Grid */}
                    {isLoading ? (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {[...Array(6)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="bg-gray-800 rounded-xl overflow-hidden shadow-md animate-pulse"
                                    variants={itemVariants}
                                >
                                    <div className="h-48 bg-gray-700"></div>
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-700 rounded w-3/4 mb-4"></div>
                                        <div className="h-8 bg-gray-700 rounded w-full mb-4"></div>
                                        <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : filteredPosts.length === 0 ? (
                        <motion.div
                            className="text-center py-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="text-xl font-medium text-gray-300 mb-2">İçerik bulunamadı</div>
                            <p className="text-gray-400">Lütfen arama veya filtre kriterlerinizi değiştirin</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {filteredPosts.map((post: BlogPost) => (
                                // app/blog/page.tsx (partial update - only showing the blog card part)

                                // Inside the filteredPosts.map function where you render each post card
                                <motion.div
                                    key={post._id}
                                    variants={itemVariants}
                                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                                >
                                    <Link href={`/blog/${post.slug.current}`}>
                                        <div className="relative group bg-gray-800 rounded-2xl overflow-hidden shadow-lg h-full flex flex-col transform transition-all duration-300 hover:shadow-yellow-500/20">
                                            <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

                                            {post.mainImage ? (
                                                <div className="relative h-64 w-full overflow-hidden">
                                                    <Image
                                                        src={urlFor(post.mainImage).url()}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>

                                                    {/* Categories on image */}
                                                    <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-20">
                                                        {post.categories?.map((category: string, i: number) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs font-medium bg-yellow-500 text-gray-900 rounded-lg px-3 py-1 shadow-md"
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
                                                        {post.categories?.map((category: string, i: number) => (
                                                            <span
                                                                key={i}
                                                                className="text-xs font-medium bg-yellow-500 text-gray-900 rounded-lg px-3 py-1 shadow-md"
                                                            >
                                                                {category}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            <div className="p-6 flex flex-col flex-grow">
                                                <h2 className="text-2xl font-bold mb-3 text-gray-100 line-clamp-2 group-hover:text-yellow-500 transition-colors duration-300">
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
                                                        {formatDistance(new Date(post.publishedAt), new Date(), {
                                                            addSuffix: true,
                                                            locale: tr
                                                        })}
                                                    </time>

                                                    <span className="flex items-center group/button">
                                                        <span className="text-yellow-500 font-medium mr-1 transition-all duration-300 group-hover/button:mr-2">
                                                            Makaleyi Oku
                                                        </span>
                                                        <motion.div
                                                            className="bg-yellow-500 rounded-full p-1"
                                                            whileHover={{ scale: 1.1 }}
                                                        >
                                                            <ChevronRight className="w-4 h-4 text-gray-900" />
                                                        </motion.div>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    )
}