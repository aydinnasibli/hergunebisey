import React from 'react'
import QuotePage from './QuoteClient'
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Alıntı | Hergünebi\’şey',
    description: 'İnsanlığa fikren ve manen büyük katkılarda bulunmuş kişilerden alıntılar ile hayatınıza yeni bir bakış açısı katın.',
    keywords: ['Alıntı', 'Hergunebisey', 'blog', 'podcast', 'quote'],
    openGraph: {
        title: 'Hergünebi\'şey',
        description: 'İnsanlığa fikren ve manen büyük katkılarda bulunmuş kişilerden alıntılar ile hayatınıza yeni bir bakış açısı katın.',
        url: 'https://www.hergunebisey.net/quote',
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
        <QuotePage />
    )
}

export default page