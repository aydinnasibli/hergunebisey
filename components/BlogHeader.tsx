// components/BlogHeader.tsx
import Link from 'next/link'
import { getCategories } from '@/lib/sanity'

export default async function BlogHeader() {
    const categories = await getCategories()

    return (
        <div className="bg-gray-800 text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-2xl font-bold">HergüneBi'şey Blog</h2>
                        <p className="text-gray-300">Keşfet, öğren, ilham al</p>
                    </div>

                    <div className="flex flex-wrap gap-4">
                        <Link href="/blog" className="text-sm hover:text-yellow-500 transition-colors">
                            Tüm Yazılar
                        </Link>
                        {categories.map((category: any) => (
                            <Link
                                href={`/blog/category/${category.title.toLowerCase()}`}
                                key={category._id}
                                className="text-sm hover:text-yellow-500 transition-colors"
                            >
                                {category.title}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}