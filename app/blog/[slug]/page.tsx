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
            image: ({ value }: { value: any }) => {
                const alignment = value?.alignment || 'center';
                const customSize = value?.customSize?.width || '100%';

                // Create alignment and width style
                const containerStyle: React.CSSProperties = {
                    position: 'relative',
                    width: customSize,
                    margin: alignment === 'center' ? '2rem auto' :
                        alignment === 'left' ? '2rem 0' : '2rem 0 2rem auto',
                    height: '0',
                    paddingBottom: '56.25%', // 16:9 aspect ratio
                };

                return (
                    <div style={containerStyle}>
                        <Image
                            src={urlFor(value).url()}
                            alt={value.alt || "Blog image"}
                            fill
                            className="object-cover rounded-lg"
                            sizes={`(max-width: 768px) 100vw, ${customSize}`}
                        />
                    </div>
                );
            },
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
                <div className="max-w-4xl mx-auto">
                    <Link href="/blog" className="flex items-center text-gray-400 mb-8 hover:text-yellow-500 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Blog'a Geri Dön
                    </Link>

                    <article className=" rounded-2xl overflow-hidden shadow-lg">
                        <div className="p-8">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold mb-6 text-gray-100">{post.title}</h1>

                                <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-700">
                                    {/* Author information */}
                                    {post.author && (
                                        <div className="flex items-center">
                                            {post.author.image && (
                                                <div className="relative w-12 h-12 mr-3 rounded-full overflow-hidden border-2 ">
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
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}