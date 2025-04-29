// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    // Your domain - replace with your actual domain
    const domain = 'https://hergunebisey.net';

    return {
        rules: {
            userAgent: '*',
            allow: '/',
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