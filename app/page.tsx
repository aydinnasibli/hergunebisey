import React from 'react'
import { Metadata } from 'next';
import Home from '@/components/HomeClient';
export const metadata: Metadata = {
  title: 'Ana Sayfa | Hergünebi\’şey',
  description: 'Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da alıntıların bulunduğu site.',
  keywords: ['Ana Sayfa', 'Hergunebisey', 'blog', 'podcast', 'quote'],
  openGraph: {
    title: 'Hergünebi\'şey',
    description: 'Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da alıntıların bulunduğu site.',
    url: 'https://www.hergunebisey.net/',
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
    <Home />
  )
}

export default page