import React from 'react'
import BlogPage from './BlogClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Yazılar',
    description: 'Bilim, tarih ve kültür ağırlıklı konularda yazdığımız zaman zaman ise teknoloji ve felsefe gibi alanlara da değindiğimiz yazılarımız ile okurken hem öğrenin hem de keyifli zaman geçirin.',
    keywords: ['Yazılar', 'Hergunebisey', 'blog', 'podcast', 'quote'],
    openGraph: {
        title: 'Hergünebi\'şey',
        description: 'Bilim, tarih ve kültür ağırlıklı konularda yazdığımız zaman zaman ise teknoloji ve felsefe gibi alanlara da değindiğimiz yazılarımız ile okurken hem öğrenin hem de keyifli zaman geçirin.',
        url: 'https://www.hergunebisey.net/blog',
        siteName: 'Hergünebi\'şey',
        locale: 'tr_TR',
        type: 'website',
        images: [
            {
                url: 'https://yourdomain.com/images/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Your Brand Name - Homepage Preview',
            },
        ],
    },


};

function page() {
    return (
        <BlogPage />
    )
}

export default page