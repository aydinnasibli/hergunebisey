import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HorizontalScrollBar from "@/components/HorizontalScrollBar";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import CookieConsentProvider from "@/components/CookieConsentProvider";
import CookieConsent from "@/components/CookieConsent";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"], // Ensure Latin characters are loaded
  variable: "--font-poppins", // Set a CSS variable
});

export const metadata: Metadata = {
  title: {
    template: "%s | Hergünebi'şey",
    default: "Hergünebi'şey",
  },
  description: 'Bilimden tarihe, kültürden teknolojiye birbirinden farklı pek çok konuda podcast ve yazının yanı sıra tarihe yön vermiş dehalardan da alıntıların bulunduğu platform.',
  metadataBase: new URL('https://hergunebisey.net'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://hergunebisey.net',
    siteName: "Hergünebi'şey",
    images: [
      {
        url: '/wp.jpg', // Fixed path, removed @ prefix
        width: 1200,
        height: 630,
        alt: 'Site preview image',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="tr" className="scrollbar-hide">
        <body className={`${poppins.variable} overflow-y-auto`}>
          <CookieConsentProvider>
            <Navbar />

            {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
              <>
                <CookieConsent />
                <GoogleAnalytics
                  GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
                />
              </>
            )}

            <div className="">
              {children}
              <HorizontalScrollBar />
            </div>
            <Footer />
          </CookieConsentProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}