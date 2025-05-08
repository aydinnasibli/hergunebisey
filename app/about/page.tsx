import React from 'react'
import AboutUs from './AboutClient'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Hakkımızda',
    description: 'Biz bilginin ve merakın peşinden koşan ve öğrendiklerimizi tutku ile paylaşmayı seven bir ekibiz. Her bilgi parçasının değerli olduğuna inanıyoruz.',
    keywords: ['Hakkımızda', 'Hergunebisey', 'blog', 'podcast', 'quote'],
    openGraph: {
        title: 'Hergünebi\'şey',
        description: 'Biz bilginin ve merakın peşinden koşan ve öğrendiklerimizi tutku ile paylaşmayı seven bir ekibiz. Her bilgi parçasının değerli olduğuna inanıyoruz.',
        url: 'https://www.hergunebisey.net/about',
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
        <AboutUs />
    )
}

export default page