'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { client } from '@/lib/sanity';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Plus } from 'lucide-react';

// Import Sanity-powered Block Editor dynamically to avoid SSR issues
const BlockEditor = dynamic(() => import('@/components/BlockEditor'), { ssr: false });

export default function EditorPage() {
    const { user, isLoaded } = useUser();
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [authors, setAuthors] = useState<any[]>([]);
    const [selectedAuthor, setSelectedAuthor] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mainImage, setMainImage] = useState<any>(null);

    // Fetch categories and authors
    useEffect(() => {
        const fetchData = async () => {
            const fetchedCategories = await client.fetch(`*[_type == "category"] { _id, title }`);
            const fetchedAuthors = await client.fetch(`*[_type == "author"] { _id, name }`);

            setCategories(fetchedCategories);
            setAuthors(fetchedAuthors);

            // Set defaults if available
            if (fetchedAuthors.length > 0) {
                setSelectedAuthor(fetchedAuthors[0]._id);
            }
            if (fetchedCategories.length > 0) {
                setSelectedCategory(fetchedCategories[0]._id);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Create a slug from the title
            const slug = title
                .toLowerCase()
                .replace(/[^\w\s]/g, '')
                .replace(/\s+/g, '-');

            // Prepare the document
            const doc = {
                _type: 'blog',
                title,
                slug: { _type: 'slug', current: slug },
                excerpt,
                body: content,
                mainImage: mainImage ? { _type: 'image', asset: { _ref: mainImage._id } } : undefined,
                publishedAt: new Date().toISOString(),
                author: { _type: 'reference', _ref: selectedAuthor },
                categories: [{ _type: 'reference', _ref: selectedCategory }]
            };

            // Create the document in Sanity
            const result = await client.create(doc);

            if (result) {
                router.push(`/blog/${slug}`);
            }
        } catch (error) {
            console.error('Error creating blog post:', error);
            alert('Failed to create blog post. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle image upload
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files || event.target.files.length === 0) return;

        const file = event.target.files[0];
        try {
            const result = await client.assets.upload('image', file);
            setMainImage(result);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        }
    };

    // If user is not loaded yet, show loading state
    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    // If no user is authenticated, we shouldn't see this page (middleware should handle this)
    if (!user) {
        router.push('/');
        return null;
    }

    return (
        <div className="container mx-auto py-10">
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Blog Editor</CardTitle>
                    <CardDescription>
                        Create and publish new blog posts
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter blog post title"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="excerpt">Excerpt</Label>
                        <Textarea
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="A short summary of the blog post"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="author">Author</Label>
                            <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select author" />
                                </SelectTrigger>
                                <SelectContent>
                                    {authors.map(author => (
                                        <SelectItem key={author._id} value={author._id}>
                                            {author.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(category => (
                                        <SelectItem key={category._id} value={category._id}>
                                            {category.title}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mainImage">Main Image</Label>
                        <Input
                            id="mainImage"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                        {mainImage && (
                            <div className="mt-2">
                                <p className="text-sm text-green-600">Image uploaded successfully!</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label>Content</Label>
                        <div className="border rounded-md p-4">
                            <BlockEditor value={content} onChange={setContent} />
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !title || !content.length}
                        className="ml-auto"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Publishing...
                            </>
                        ) : (
                            <>
                                <Plus className="mr-2 h-4 w-4" />
                                Publish Post
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}