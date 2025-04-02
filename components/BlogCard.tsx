"use client";

import { Blog } from '@/types/sanity';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { motion } from 'framer-motion';

interface BlogCardProps {
    blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
    // Format the date in Turkish
    const formattedDate = format(new Date(blog.publishedAt), 'dd MMMM yyyy', { locale: tr });

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
        >
            <Link href={`/blog/${blog.slug}`}>
                <div className="relative h-56 w-full">
                    <Image
                        src={urlFor(blog.mainImage).width(600).height(400).url()}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                </div>
            </Link>

            <div className="p-6">
                <div className="flex items-center mb-4">
                    <div className="w-6 h-1 bg-yellow-500 mr-3"></div>
                    <span className="text-sm font-medium text-gray-600">{blog.category.title}</span>
                </div>

                <Link href={`/blog/${blog.slug}`}>
                    <h2 className="text-xl font-bold mb-2 hover:text-yellow-600 transition-colors">{blog.title}</h2>
                </Link>

                {blog.subtitle && (
                    <h3 className="text-lg font-medium text-gray-700 mb-3">{blog.subtitle}</h3>
                )}

                <p className="text-gray-600 mb-4 line-clamp-3">{blog.excerpt}</p>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                            <Image
                                src={urlFor(blog.author.image).width(32).height(32).url()}
                                alt={blog.author.name}
                                width={32}
                                height={32}
                                className="object-cover"
                            />
                        </div>
                        <span className="text-sm text-gray-600">{blog.author.name}</span>
                    </div>

                    <span className="text-xs text-gray-500">{formattedDate}</span>
                </div>
            </div>
        </motion.div>
    );
}