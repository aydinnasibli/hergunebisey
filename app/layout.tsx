import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HorizontalScrollBar from "@/components/HorizontalScrollBar";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import PageTransition from "@/components/PageTransition";

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
        url: '@public/wp.jpg',
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
      <html lang="tr">

        <body className={`${poppins.variable} `}>
          <PageTransition type="fadeSlideUp"
            transition="smooth"
            className="min-h-[calc(100vh-64px)]">
            <Navbar />

            <div className="">
              {children}
              <HorizontalScrollBar />
            </div>
            <Footer />
          </PageTransition>
        </body>
      </html>
    </ClerkProvider>
  );
}
