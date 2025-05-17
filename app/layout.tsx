import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HorizontalScrollBar from "@/components/HorizontalScrollBar";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import PlausibleProvider from 'next-plausible'
const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"], // Ensure Latin characters are loaded
  variable: "--font-poppins", // Set a CSS variable
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.hergunebisey.net'),
  alternates: {
    canonical: '/',
  },
  title: {
    template: "%s | Hergünebi'şey",
    default: "Hergünebi'şey"
  },
  description: 'Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da alıntıların bulunduğu platform.',
  keywords: ['blog', 'podcast', 'quote', 'alıntı', 'site'],
  authors: [{ name: 'Hergünebişey', url: 'https://www.hergunebisey.net' }],
  creator: 'Hergünebişey',
  publisher: 'Hergünebişey',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: '/',
    siteName: "Hergünebi'şey",
    title: "Hergünebi'şey",
    description: 'Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da alıntıların bulunduğu platform.',
    images: [
      {
        url: '/images/og-image.jpg', // Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: 'Your Site Name',
      },
    ],
  },

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],

  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="tr" className="scrollbar-hide">
        <body className={`${poppins.className} overflow-y-auto`}>
          <PlausibleProvider domain="hergunebisey.net">
            <Navbar />


            <div className="">
              {children}
              <HorizontalScrollBar />
            </div>
            <Footer />

          </PlausibleProvider>
        </body>
      </html>
    </ClerkProvider >
  );
}