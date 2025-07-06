// app/layout.tsx
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HorizontalScrollBar from "@/components/HorizontalScrollBar";
import Navbar from "@/components/Navbar";
import PageTransition from "@/components/PageTransition";
import PlausibleProvider from 'next-plausible'
import CookieConsent from "@/components/CookieConsent";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: 'swap', // Improve font loading performance
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
  robots: {
    index: true,
    follow: true,
  },
  description: 'Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da alıntıların bulunduğu site.',
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
    description: 'Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da alıntıların bulunduğu site.',
    images: [
      {
        url: '/images/og-image.jpg',
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
    <html lang="tr" className="scrollbar-hide">
      <body className={`${poppins.className} overflow-y-auto antialiased`}>
        <PlausibleProvider domain="hergunebisey.net">
          {/* Keep Navbar outside transition for better UX */}
          <Navbar />

          {/* Main content with transitions */}
          <main className="relative">
            <PageTransition>
              <div className="min-h-screen">
                {children}
              </div>
            </PageTransition>

            {/* Keep HorizontalScrollBar outside transition if it's global */}
            <HorizontalScrollBar />
          </main>

          {/* Keep Footer outside transition for better UX */}
          <Footer />
        </PlausibleProvider>

        {/* Cookie Consent - placed at the end for highest z-index */}
        <CookieConsent
          message="Bu web sitesini ziyaret ederek çerezleri ve gizlilik politikamızı kabul etmiş olursunuz."
          buttonText="Kabul Et"
          cookieName="hergunebisey-consent"
          expirationDays={7}
        />
      </body>
    </html>
  );
}