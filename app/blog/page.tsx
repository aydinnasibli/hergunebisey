// app/blog/page.tsx
import Link from 'next/link'
import Image from 'next/image'
import { getBlogPosts, urlFor } from '@/lib/sanity'
import { formatDistance } from 'date-fns'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
export const revalidate = 60 // revalidate this page every 60 seconds
interface BlogPost {
    _id: string
    title: string
    slug: { current: string }
    excerpt?: string
    mainImage?: SanityImageSource
    publishedAt: string
    categories?: string[]
}

export default async function BlogPage() {
    const posts = await getBlogPosts()

    return (
        <div className="min-h-screen pt-24 bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-10">
                        <h1 className="text-4xl font-bold mb-4">Blog</h1>
                        <div className="w-20 h-1 bg-yellow-500"></div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: BlogPost) => (
                            <Link href={`/blog/${post.slug.current}`} key={post._id}>
                                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                                    {post.mainImage && (
                                        <div className="relative h-48 w-full">
                                            <Image
                                                src={urlFor(post.mainImage).url()}
                                                alt={post.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.categories?.map((category: string, i: number) => (
                                                <span key={i} className="text-xs bg-gray-200 rounded-full px-3 py-1">
                                                    {category}
                                                </span>
                                            ))}
                                        </div>
                                        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                                        {post.excerpt && (
                                            <p className="text-gray-700 mb-4 line-clamp-3">{post.excerpt}</p>
                                        )}
                                        <div className="flex justify-between items-center text-sm text-gray-500">
                                            <time dateTime={post.publishedAt}>
                                                {formatDistance(new Date(post.publishedAt), new Date(), {
                                                    addSuffix: true
                                                })}
                                            </time>
                                            <span className="text-yellow-500 font-medium">Read More</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}