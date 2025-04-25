import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {Providers} from "@/app/providers";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Web Boardgame - Discover and Play",
  description: "Explore a wide range of board games, find detailed information, and connect with other players. Your ultimate board game companion!",
  keywords: [
    "board games",
    "play board games",
    "board game community",
    "game details",
    "multiplayer games"
  ],
  openGraph: {
    title: "Web Boardgame - Discover and Play",
    description: "Explore a wide range of board games, find detailed information, and connect with other players. Your ultimate board game companion!",
    url: "https://yourwebsite.com",
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Web Boardgame Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Boardgame - Discover and Play",
    description: "Explore a wide range of board games, find detailed information, and connect with other players. Your ultimate board game companion!",
    images: ["https://yourwebsite.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <Providers>
        {children}
      </Providers>
      </body>
    </html>
  );
}
