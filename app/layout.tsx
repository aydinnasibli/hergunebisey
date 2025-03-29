import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import HorizontalScrollBar from "@/components/HorizontalScrollBar";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"], // Ensure Latin characters are loaded
  variable: "--font-poppins", // Set a CSS variable
});


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className={`${poppins.variable} `}>
        <div className="">
          {children}
          <HorizontalScrollBar />
        </div>
        <Footer />
      </body>
    </html>
  );
}
