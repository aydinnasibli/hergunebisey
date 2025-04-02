import { getPaginatedBlogs } from '@/lib/sanity.queries';
import BlogCard from '@/components/BlogCard';
import Pagination from '@/components/Pagination';
import { Suspense } from 'react';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function BlogPage({
    searchParams,
}: {
    searchParams: { page?: string };
}) {
    const currentPage = Number(searchParams.page) || 1;
    const pageSize = 6;

    const { blogs, total } = await getPaginatedBlogs(currentPage, pageSize);
    const totalPages = Math.ceil(total / pageSize);

    return (
        <div className="min-h-screen pt-24 bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <div className="w-16 h-1 bg-yellow-500 mx-auto mb-4"></div>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">BLOG YAZILARIMIZ</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Her gün yeni bir bakış açısı kazandıran, ilham veren ve düşündüren içeriklerimizi keşfedin.
                    </p>
                </div>

                <Suspense fallback={<div>Yükleniyor...</div>}>
                    {blogs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogs.map((blog) => (
                                    <BlogCard key={blog._id} blog={blog} />
                                ))}
                            </div>

                            <div className="mt-12">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    basePath="/blog"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-lg text-gray-600">Henüz blog yazısı bulunmamaktadır.</p>
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
}