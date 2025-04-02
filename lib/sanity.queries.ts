import { groq } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import { Blog, Comment } from '@/types/sanity';

// Get all blogs
export async function getAllBlogs(): Promise<Blog[]> {
    return client.fetch(
        groq`*[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      subtitle,
      "slug": slug.current,
      "author": author->{_id, name, "slug": slug.current, "image": image},
      "mainImage": mainImage,
      "category": category->{_id, title, description},
      publishedAt,
      excerpt
    }`
    );
}

// Get a specific blog by slug
export async function getBlogBySlug(slug: string): Promise<Blog> {
    return client.fetch(
        groq`*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      subtitle,
      "slug": slug.current,
      "author": author->{_id, name, "slug": slug.current, "image": image, bio},
      "mainImage": mainImage,
      "category": category->{_id, title, description},
      publishedAt,
      excerpt,
      content
    }`,
        { slug }
    );
}

// Get blogs by category
export async function getBlogsByCategory(categoryId: string): Promise<Blog[]> {
    return client.fetch(
        groq`*[_type == "blog" && category._ref == $categoryId] | order(publishedAt desc) {
      _id,
      title,
      subtitle,
      "slug": slug.current,
      "author": author->{_id, name, "slug": slug.current, "image": image},
      "mainImage": mainImage,
      "category": category->{_id, title, description},
      publishedAt,
      excerpt
    }`,
        { categoryId }
    );
}

// Get all categories
export async function getAllCategories() {
    return client.fetch(
        groq`*[_type == "category"] {
      _id,
      title,
      description
    }`
    );
}

// Get comments for a specific blog
export async function getCommentsByBlogId(blogId: string): Promise<Comment[]> {
    return client.fetch(
        groq`*[_type == "comment" && blog._ref == $blogId] | order(publishedAt desc) {
      _id,
      name,
      email,
      clerkId,
      comment,
      publishedAt
    }`,
        { blogId }
    );
}

// Create a new comment
export async function createComment(comment: {
    name: string;
    email: string;
    clerkId: string;
    comment: string;
    blogId: string;
}) {
    return client.create({
        _type: 'comment',
        name: comment.name,
        email: comment.email,
        clerkId: comment.clerkId,
        comment: comment.comment,
        blog: {
            _type: 'reference',
            _ref: comment.blogId,
        },
        publishedAt: new Date().toISOString(),
    });
}

// Get all blogs with pagination
export async function getPaginatedBlogs(page: number = 1, pageSize: number = 6): Promise<{ blogs: Blog[], total: number }> {
    const offset = (page - 1) * pageSize;

    const blogs = await client.fetch(
        groq`{
      "blogs": *[_type == "blog"] | order(publishedAt desc) [$start...$end] {
        _id,
        title,
        subtitle,
        "slug": slug.current,
        "author": author->{_id, name, "slug": slug.current, "image": image},
        "mainImage": mainImage,
        "category": category->{_id, title, description},
        publishedAt,
        excerpt
      },
      "total": count(*[_type == "blog"])
    }`,
        { start: offset, end: offset + pageSize - 1 }
    );

    return blogs;
}