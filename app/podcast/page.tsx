import React from 'react'
import PodcastPage from './PodcastClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Podcast | Hergünebi\’şey',
    description: 'Farklı konseptler ile sohbet kıvamındaki podcast yayınlarımız yolda, sporda ya da evde- her anınıza eşlik etmek için burada.',
    keywords: ['Podcast', 'Hergunebisey', 'blog', 'podcast', 'quote'],
    openGraph: {
        title: 'Hergünebi\'şey',
        description: 'Farklı konseptler ile sohbet kıvamındaki podcast yayınlarımız yolda, sporda ya da evde- her anınıza eşlik etmek için burada.',
        url: 'https://www.hergunebisey.net/podcast',
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
        <PodcastPage />
    )
}

export default page