// app/blog/page.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts, getCategories, urlFor } from '@/lib/sanity'
import { formatDistance } from 'date-fns'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { Search, X } from 'lucide-react'

interface BlogPost {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: SanityImageSource
    publishedAt: string
    categories?: string[]
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

    return (
        <div className="min-h-screen pt-20 bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-4 text-gray-800">Our Blog</h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover the latest insights, updates, and stories from our team</p>
                        <div className="w-24 h-1 bg-yellow-500 mx-auto mt-6"></div>
                    </div>

                    {/* Search and Filter Section */}
                    <div className="mb-12">
                        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-6 rounded-xl shadow-md">
                            {/* Search Bar */}
                            <div className="relative w-full md:w-1/2">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Search className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>

                            {/* Categories Filter */}
                            <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-end">
                                {categories.map((category) => (
                                    <button
                                        key={category._id}
                                        onClick={() => setSelectedCategory(selectedCategory === category.title ? null : category.title)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedCategory === category.title
                                            ? 'bg-yellow-500 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            }`}
                                    >
                                        {category.title}
                                    </button>
                                ))}

                                {(searchQuery || selectedCategory) && (
                                    <button
                                        onClick={clearFilters}
                                        className="flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                                    >
                                        <X className="h-4 w-4" />
                                        Clear
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Results Count */}
                        <div className="text-gray-600 mt-4 text-sm">
                            {isLoading ? (
                                'Loading posts...'
                            ) : (
                                <>Showing {filteredPosts.length} of {posts.length} posts</>
                            )}
                        </div>
                    </div>

                    {/* Posts Grid */}
                    {isLoading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-md animate-pulse">
                                    <div className="h-48 bg-gray-300"></div>
                                    <div className="p-6">
                                        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                                        <div className="h-8 bg-gray-300 rounded w-full mb-4"></div>
                                        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-xl font-medium text-gray-600 mb-2">No posts found</div>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post: BlogPost) => (
                                <Link href={`/blog/${post.slug.current}`} key={post._id}>
                                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
                                        {post.mainImage ? (
                                            <div className="relative h-56 w-full">
                                                <Image
                                                    src={urlFor(post.mainImage).url()}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="h-56 bg-gray-200 flex items-center justify-center">
                                                <span className="text-gray-400">No image</span>
                                            </div>
                                        )}

                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="flex flex-wrap gap-2 mb-3">
                                                {post.categories?.map((category: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full px-3 py-1"
                                                    >
                                                        {category}
                                                    </span>
                                                ))}
                                            </div>

                                            <h2 className="text-xl font-bold mb-3 text-gray-800">{post.title}</h2>

                                            {post.excerpt && (
                                                <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>
                                            )}

                                            <div className="flex justify-between items-center text-sm mt-auto pt-4 border-t border-gray-100">
                                                <time dateTime={post.publishedAt} className="text-gray-500">
                                                    {formatDistance(new Date(post.publishedAt), new Date(), {
                                                        addSuffix: true
                                                    })}
                                                </time>
                                                <span className="text-yellow-600 font-medium flex items-center">
                                                    Read More
                                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                                    </svg>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}