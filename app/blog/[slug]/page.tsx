import { getBlogBySlug, getCommentsByBlogId } from '@/lib/sanity.queries';
import { PortableText } from '@portabletext/react';
import { urlFor } from '@/sanity/lib/image';
import { notFound } from 'next/navigation';
import CommentForm from '@/components/CommentForm';
import Comments from '@/components/Comments';
import AuthorCard from '@/components/AuthorCard';
import Image from 'next/image';
import { format } from 'date-fns';

export const revalidate = 60; // Revalidate this page every 60 seconds

// Define the portable text components
const ptComponents = {
    types: {
        image: ({ value }) => {
            return (
                <div className="relative w-full h-96 my-8">
                    <Image
                        src={urlFor(value).url()}
                        alt={value.alt || ''}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover rounded-lg"
                        priority={false}
                    />
                </div>
            );
        },
    },
};

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    // Destructure the slug from params
    const { slug } = params;

    try {
        // Fetch the blog post by slug
        const blog = await getBlogBySlug(slug);

        if (!blog) {
            notFound();
        }

        // Fetch comments for this blog post
        const comments = await getCommentsByBlogId(blog._id);

        // Format the date
        const formattedDate = format(new Date(blog.publishedAt), 'dd MMMM yyyy');

        return (
            <div className="min-h-screen pt-24 bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    {/* Hero Section */}
                    <div className="relative h-[50vh] md:h-[60vh] w-full mb-8 rounded-xl overflow-hidden">
                        <Image
                            src={urlFor(blog.mainImage).url()}
                            alt={blog.title}
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority={true}
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10 text-white">
                            <div className="max-w-3xl">
                                <div className="flex items-center mb-4">
                                    <div className="w-10 h-1 bg-yellow-500 mr-4"></div>
                                    <span className="text-lg">{blog.category.title}</span>
                                </div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">{blog.title}</h1>
                                {blog.subtitle && (
                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">{blog.subtitle}</h2>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Main Content */}
                        <div className="lg:w-2/3">
                            <div className="bg-white rounded-xl shadow-md p-6 md:p-10">
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                                            <Image
                                                src={urlFor(blog.author.image).url()}
                                                alt={blog.author.name}
                                                width={48}
                                                height={48}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-medium">{blog.author.name}</p>
                                            <p className="text-sm text-gray-500">{formattedDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                                            </svg>
                                        </button>
                                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="prose max-w-none">
                                    <PortableText value={blog.content} components={ptComponents} />
                                </div>
                            </div>

                            {/* Comments Section */}
                            <div className="mt-12 bg-white rounded-xl shadow-md p-6 md:p-10">
                                <h3 className="text-2xl font-bold mb-6">Yorumlar</h3>
                                <CommentForm blogId={blog._id} />
                                <Comments comments={comments} />
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-1/3">
                            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                                <h3 className="text-xl font-bold mb-4">Yazar Hakkında</h3>
                                <AuthorCard author={blog.author} />
                            </div>

                            <div className="bg-black text-white rounded-xl shadow-md p-6">
                                <div className="w-10 h-1 bg-yellow-500 mb-4"></div>
                                <h3 className="text-xl font-bold mb-4">Hergünebi'şey'e Abone Olun</h3>
                                <p className="text-gray-300 mb-6">Her hafta yeni içeriklerimizden haberdar olmak için e-bültenimize abone olun.</p>
                                <form className="space-y-4">
                                    <input
                                        type="email"
                                        placeholder="E-posta adresiniz"
                                        className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    />
                                    <button className="w-full px-4 py-3 bg-yellow-500 text-black rounded-lg font-medium hover:bg-yellow-400 transition-colors">
                                        Abone Ol
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Error fetching blog post:', error);
        notFound();
    }
}