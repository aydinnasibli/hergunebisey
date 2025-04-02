import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { PortableTextBlock } from "@portabletext/types";

export interface Author {
    _id: string;
    name: string;
    slug: {
        current: string;
    };
    image: SanityImageSource;
    bio: PortableTextBlock[];
}

export interface Category {
    _id: string;
    title: string;
    description?: string;
}

export interface Blog {
    _id: string;
    title: string;
    subtitle?: string;
    slug: {
        current: string;
    };
    author: Author;
    mainImage: SanityImageSource;
    category: Category;
    publishedAt: string;
    excerpt?: string;
    content: PortableTextBlock[];
}

export interface Comment {
    _id: string;
    name: string;
    email: string;
    clerkId: string;
    comment: string;
    blog: {
        _ref: string;
    };
    publishedAt: string;
}