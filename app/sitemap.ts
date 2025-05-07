// app/sitemap.ts
import { MetadataRoute } from 'next';
import { groq } from 'next-sanity';
import { client } from '@/lib/sanity'; // Adjust this import to match your Sanity client setup

// Define types for Sanity content
interface SanityContent {
    slug: string;
    _updatedAt: string;
}

// Next.js expects specific types for sitemap entries
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all content types with their slugs and last updated dates
    const [blogs, podcasts] = await Promise.all<SanityContent[]>([
        // Blog posts
        client.fetch<SanityContent[]>(
            groq`*[_type == "blog"] {
        "slug": slug.current,
        _updatedAt
      }`
        ),

        // Podcast episodes
        client.fetch<SanityContent[]>(
            groq`*[_type == "podcast"] {
        "slug": slug.current,
        _updatedAt
      }`
        ),

    ]);

    // Your domain - replace with your actual domain
    const domain = 'https://www.hergunebisey.net';

    // Define static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: `${domain}`,
            lastModified: new Date(),
        },
        {
            url: `${domain}/about`,
            lastModified: new Date(),
        },
        {
            url: `${domain}/blog`,
            lastModified: new Date(),
        },
        {
            url: `${domain}/podcast`,
            lastModified: new Date(),
        },
        {
            url: `${domain}/quote`,
            lastModified: new Date(),
        },

    ];

    // Map Sanity content to URLs using your Next.js route structure
    const blogUrls: MetadataRoute.Sitemap = blogs.map((blog) => ({
        url: `${domain}/blog/${blog.slug}`,
        lastModified: new Date(blog._updatedAt),
    }));

    // Podcast episodes
    const podcastUrls: MetadataRoute.Sitemap = podcasts.map((podcast) => ({
        url: `${domain}/podcast/${podcast.slug}`,
        lastModified: new Date(podcast._updatedAt),
    }));



    return [...staticPages, ...blogUrls, ...podcastUrls,];
}

