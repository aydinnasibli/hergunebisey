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

                    <article className="bg-gray-800/60 rounded-2xl overflow-hidden shadow-lg">
                        {post.mainImage && (
                            <div className="relative w-full h-80 md:h-96">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover"
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

                        <div className="p-8">
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
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}