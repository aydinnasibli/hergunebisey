// app/blog/[slug]/page.tsx
import Image from 'next/image'
import { getBlogPostBySlug, getBlogPostsByCategory, urlFor } from '@/lib/sanity'
import { PortableText, PortableTextMarkComponentProps, PortableTextTypeComponentProps, PortableTextComponentProps } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import ShareButtons from './ShareButtons' // Import the client component
import { PortableTextBlock } from 'sanity'
export const revalidate = 60 // revalidate this page every 60 seconds


// Define BlogPost type
interface BlogPost {
    _id: string;
    title: string;
    slug: { current: string };
    excerpt?: string;
    mainImage?: SanityImageSource;
    publishedAt: string;
    body?: PortableTextBlock;
    categories?: string[];
    author?: {
        name: string;
        image?: SanityImageSource;
        bio?: string;
        twitter?: string;
        linkedin?: string;
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getBlogPostBySlug(resolvedParams.slug)

    if (!post) {
        notFound()
    }

    // Fetch related posts from the same category
    const relatedPosts: BlogPost[] = post.categories && post.categories.length > 0
        ? await getBlogPostsByCategory(post.categories[0])
        : []

    // Filter out the current post and limit to 3 related posts
    const filteredRelatedPosts = relatedPosts
        .filter(relatedPost => relatedPost._id !== post._id)
        .slice(0, 3)

    // Define proper type for the components object
    const components = {
        types: {
            image: ({ value }: PortableTextTypeComponentProps<SanityImageSource>) => (
                <div className="relative w-full h-80 my-8 overflow-hidden group rounded-lg">
                    <div className="absolute inset-0 bg-yellow-500 mix-blend-multiply opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                    <Image
                        src={urlFor(value).url()}
                        alt="Post image"
                        fill
                        className="object-cover w-full transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            ),
        },
        marks: {
            link: ({ children, value }: PortableTextMarkComponentProps) => {
                const href = value?.href || '';
                const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined
                const target = !href.startsWith('/') ? '_blank' : undefined
                return (
                    <a href={href} rel={rel} target={target} className="text-yellow-400 underline decoration-2 underline-offset-4 hover:text-yellow-300 transition-colors duration-300">
                        {children}
                    </a>
                )
            },
        },
        // Fix: Use the correct PortableTextComponentProps type
        block: {
            h1: ({ children }: PortableTextComponentProps<any>) => (
                <h1 className="text-4xl md:text-5xl font-black mt-14 mb-6 leading-tight text-white">{children}</h1>
            ),
            h2: ({ children }: PortableTextComponentProps<any>) => (
                <h2 className="text-3xl md:text-4xl font-bold mt-10 mb-5 leading-tight text-yellow-400">{children}</h2>
            ),
            h3: ({ children }: PortableTextComponentProps<any>) => (
                <h3 className="text-2xl md:text-3xl font-semibold mt-8 mb-4 text-yellow-300">{children}</h3>
            ),
            h4: ({ children }: PortableTextComponentProps<any>) => (
                <h4 className="text-xl md:text-2xl font-medium mt-6 mb-3 text-yellow-200">{children}</h4>
            ),
            normal: ({ children }: PortableTextComponentProps<any>) => (
                <p className="text-lg leading-relaxed mb-6 text-gray-200">{children}</p>
            ),
            blockquote: ({ children }: PortableTextComponentProps<any>) => (
                <blockquote className="border-l-4 border-yellow-500 pl-6 py-1 my-8 italic text-xl text-gray-300">
                    {children}
                </blockquote>
            ),
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('tr-TR', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            {/* Hero Section - Reduced height and improved positioning */}
            <div className="relative h-[70vh] min-h-[500px] max-h-[700px]">
                {post.mainImage && (
                    <>
                        <div className="absolute inset-0">
                            <Image
                                src={urlFor(post.mainImage).url()}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-gray-900"></div>
                        </div>
                    </>
                )}

                <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-12 pt-32">
                    {/* Navigation and Date - Moved down from the very top */}
                    <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center z-10 mt-12">
                        <Link
                            href="/blog"
                            className="flex items-center bg-yellow-500 text-black px-4 py-2 rounded-full font-medium hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1 group shadow-lg"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            Blog'a Dön
                        </Link>

                        <time dateTime={post.publishedAt} className="text-yellow-400 font-mono text-sm md:text-base mt-4 sm:mt-0 bg-black/30 px-4 py-2 rounded-full">
                            {formatDate(post.publishedAt)}
                        </time>
                    </div>

                    <div className="max-w-4xl z-10 mt-auto">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight text-white drop-shadow-lg">{post.title}</h1>

                        {post.excerpt && (
                            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">{post.excerpt}</p>
                        )}

                        {post.author && (
                            <div className="flex items-center p-3 rounded-lg">
                                {post.author.image && (
                                    <div className="relative w-12 h-12 mr-4 rounded-full overflow-hidden border-2 border-white">
                                        <Image
                                            src={urlFor(post.author.image).url()}
                                            alt={post.author.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                                <div>
                                    <div className="font-medium text-white">{post.author.name}</div>
                                    {post.author.bio && (
                                        <div className="text-gray-300 text-sm line-clamp-1">{post.author.bio}</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="hidden md:block animate-bounce text-center z-10 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-yellow-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Content Section - Improved spacing and readability */}
            <div className="container mx-auto px-4 md:px-8 py-12">
                <div className="max-w-3xl mx-auto bg-gray-800/50 p-6 md:p-10 rounded-xl shadow-xl">
                    <article className="prose prose-lg prose-invert max-w-none">
                        <PortableText
                            value={post.body}
                            components={components}
                        />
                    </article>

                    {/* Share Section - Using client component */}
                    <div className="border-t border-gray-700 mt-10 pt-6">
                        <h3 className="text-xl font-bold text-yellow-400 mb-4">Bu İçeriği Paylaş</h3>
                        <ShareButtons
                            title={post.title}
                            slug={post.slug.current}
                        />
                    </div>
                </div>
            </div>

            {/* Related Articles - Now showing actual related posts */}
            <div className="container mx-auto px-4 md:px-8 py-12">
                <h2 className="text-3xl font-bold mb-8 text-center text-yellow-400">Benzer İçerikler</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRelatedPosts.length > 0 ? (
                        filteredRelatedPosts.map((relatedPost) => (
                            <div key={relatedPost._id} className="bg-gray-800/70 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
                                <div className="h-48 relative">
                                    {relatedPost.mainImage ? (
                                        <Image
                                            src={urlFor(relatedPost.mainImage).url()}
                                            alt={relatedPost.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="h-full bg-gray-700"></div>
                                    )}
                                    {relatedPost.categories && relatedPost.categories.length > 0 && (
                                        <div className="absolute bottom-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1">
                                            {relatedPost.categories[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <time className="text-yellow-400 text-sm mb-2 font-mono">
                                        {formatDate(relatedPost.publishedAt)}
                                    </time>
                                    <h3 className="text-lg font-bold mb-2 text-white hover:text-yellow-400 transition-colors">
                                        {relatedPost.title}
                                    </h3>
                                    <p className="text-gray-400 mb-4 text-sm flex-grow">
                                        {relatedPost.excerpt || 'Bu makale hakkında detaylı bilgi için tıklayın...'}
                                    </p>
                                    <Link
                                        href={`/blog/${relatedPost.slug.current}`}
                                        className="text-yellow-500 font-medium flex items-center hover:text-yellow-400 mt-auto self-start"
                                    >
                                        Okumaya Devam Et
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Placeholder items if no related posts are found
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className="bg-gray-800/70 rounded-xl overflow-hidden shadow-lg flex flex-col h-full">
                                <div className="h-48 bg-gray-700 animate-pulse"></div>
                                <div className="p-5 flex flex-col flex-grow">
                                    <div className="w-1/3 h-4 bg-gray-700 animate-pulse mb-3 rounded"></div>
                                    <div className="w-full h-6 bg-gray-700 animate-pulse mb-3 rounded"></div>
                                    <div className="w-full h-4 bg-gray-700 animate-pulse mb-2 rounded"></div>
                                    <div className="w-2/3 h-4 bg-gray-700 animate-pulse mb-4 rounded"></div>
                                    <div className="w-1/2 h-5 bg-gray-700 animate-pulse mt-auto self-start rounded"></div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>


        </div>
    )
}