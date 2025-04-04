// app/blog/[slug]/page.tsx
import Image from 'next/image'
import { getBlogPostBySlug, urlFor } from '@/lib/sanity'
import { PortableText, PortableTextMarkComponentProps } from '@portabletext/react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
export const revalidate = 60 // revalidate this page every 60 seconds

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getBlogPostBySlug(resolvedParams.slug)

    if (!post) {
        notFound()
    }

    const components = {
        types: {
            image: ({ value }: { value: SanityImageSource }) => (
                <div className="relative w-full h-96 my-8">
                    <Image
                        src={urlFor(value).url()}
                        alt="Post image"
                        fill
                        className="object-cover rounded-lg"
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
                    <a href={href} rel={rel} target={target} className="text-yellow-500 underline">
                        {children}
                    </a>
                )
            },
        },
    }

    return (
        <div className="min-h-screen pt-24 bg-black/90 text-gray-200">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <Link href="/blog" className="flex items-center text-gray-400 mb-8 hover:text-yellow-500 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Blog'a Geri Dön
                    </Link>

                    <article className="bg-transparent rounded-2xl overflow-hidden">
                        {post.mainImage && (
                            <div className="relative w-full h-80 md:h-96">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover rounded-t-2xl"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>

                                {/* Categories overlay */}
                                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-20">
                                    {post.categories?.map((category: string, i: number) => (
                                        <span key={i} className="text-xs font-medium bg-yellow-500 text-gray-900 rounded-lg px-3 py-1 shadow-md">
                                            {category}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="p-8 pt-6">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold mb-6 text-gray-100">{post.title}</h1>

                                <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-700">
                                    {/* Author information */}
                                    {post.author && (
                                        <div className="flex items-center">
                                            {post.author.image && (
                                                <div className="relative w-12 h-12 mr-3 rounded-full overflow-hidden border-2 border-yellow-500">
                                                    <Image
                                                        src={urlFor(post.author.image).url()}
                                                        alt={post.author.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium text-yellow-500">{post.author.name}</div>
                                                {post.author.bio && (
                                                    <div className="text-sm text-gray-400 line-clamp-1">{post.author.bio}</div>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* Date */}
                                    <time dateTime={post.publishedAt} className="text-gray-400 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2 text-yellow-500">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </time>
                                </div>
                            </div>

                            <div className="prose prose-invert max-w-none prose-headings:text-yellow-500 prose-a:text-yellow-500">
                                <PortableText
                                    value={post.body}
                                    components={components}
                                />
                            </div>

                            {/* Author bio section */}
                            {post.author && post.author.bio && (
                                <div className="mt-12 pt-8 border-t border-gray-700">
                                    <h3 className="text-2xl font-semibold mb-4 text-yellow-500">Yazar Hakkında</h3>
                                    <div className="flex items-start">
                                        {post.author.image && (
                                            <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden flex-shrink-0 border-2 border-yellow-500">
                                                <Image
                                                    src={urlFor(post.author.image).url()}
                                                    alt={post.author.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h4 className="text-xl font-medium text-gray-100 mb-2">{post.author.name}</h4>
                                            <p className="text-gray-400">{post.author.bio}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Sharing options */}
                            <div className="mt-12 pt-8 border-t border-gray-700">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <h3 className="text-lg font-medium text-gray-200 mb-4 sm:mb-0">Bu İçeriği Paylaş:</h3>
                                    <div className="flex space-x-4">
                                        <button
                                            onClick="window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('${post.title}')}`, '_blank')"
                                            className="bg-[#1DA1F2] hover:bg-[#1a91da] text-white p-2 rounded-full transition-colors duration-300"
                                            aria-label="Twitter'da Paylaş"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick="window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')"
                                            className="bg-[#1877F2] hover:bg-[#166fe5] text-white p-2 rounded-full transition-colors duration-300"
                                            aria-label="Facebook'ta Paylaş"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick="window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')"
                                            className="bg-[#0A66C2] hover:bg-[#0958a5] text-white p-2 rounded-full transition-colors duration-300"
                                            aria-label="LinkedIn'de Paylaş"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick="navigator.clipboard.writeText(window.location.href); alert('Link kopyalandı!');"
                                            className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-full transition-colors duration-300"
                                            aria-label="Linki Kopyala"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
                                                <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick="window.print()"
                                            className="bg-gray-600 hover:bg-gray-500 text-white p-2 rounded-full transition-colors duration-300"
                                            aria-label="Yazdır"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M5 1a2 2 0 0 0-2 2v1h10V3a2 2 0 0 0-2-2H5zm6 8H5a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                                                <path d="M0 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-1v-2a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2H2a2 2 0 0 1-2-2V7zm2.5 1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}