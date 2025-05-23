// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    // Your domain - replace with your actual domain
    const domain = 'https://www.hergunebisey.net';

    return {
        rules: {
            userAgent: '*',
            allow: [
                '/',
                '/blog',
                '/blog/*', // Allow all blog posts with their slugs
                '/podcast',
                '/podcast/*', // Allow all podcast episodes with their slugs
                '/about',
                '/quote',
            ],
            // Protect admin and API routes from indexing
            disallow: [
                '/profile/',
                '/api/',
                '/admin/',
                '/studio/', // If you have Sanity Studio embedded
                '/_next/'   // Next.js internal routes
            ],
        },
        // Link to your sitemap
        sitemap: `${domain}/sitemap.xml`,
        host: domain,
    };
}