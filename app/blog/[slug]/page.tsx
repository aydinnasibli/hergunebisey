// app/blog/[slug]/page.tsx
import Image from 'next/image'
import { getBlogPostBySlug, urlFor } from '@/lib/sanity'
import { PortableText, PortableTextReactComponents } from '@portabletext/react'

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

    const components: Partial<PortableTextReactComponents> = {
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
            link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
                const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined
                const target = !value.href.startsWith('/') ? '_blank' : undefined
                return (
                    <a href={value.href} rel={rel} target={target} className="text-blue-600 underline">
                        {children}
                    </a>
                )
            },
        },
    }

    return (
        <div className="min-h-screen pt-24 bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-3xl mx-auto">
                    <Link href="/blog" className="flex items-center text-gray-600 mb-8 hover:text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Back to Blog
                    </Link>

                    <article>
                        <div className="mb-8">
                            <div className="flex flex-wrap gap-2 mb-4">
                                {post.categories?.map((category: string, i: number) => (
                                    <span key={i} className="text-xs bg-gray-200 rounded-full px-3 py-1">
                                        {category}
                                    </span>
                                ))}
                            </div>
                            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                            <time dateTime={post.publishedAt} className="text-gray-500">
                                {new Date(post.publishedAt).toLocaleDateString('tr-TR', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric'
                                })}
                            </time>
                        </div>

                        {post.mainImage && (
                            <div className="relative w-full h-80 md:h-96 mb-8">
                                <Image
                                    src={urlFor(post.mainImage).url()}
                                    alt={post.title}
                                    fill
                                    className="object-cover rounded-lg"
                                />
                            </div>
                        )}

                        <div className="prose max-w-none">
                            <PortableText
                                value={post.body}
                                components={components}
                            />
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}