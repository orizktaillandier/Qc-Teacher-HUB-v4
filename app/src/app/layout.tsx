import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quebec Teacher Hub v4",
  description: "Quebec education content generation platform - v4 development environment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Kalam:wght@400;700&family=Fredoka:wght@400;600&family=Bubblegum+Sans&family=Indie+Flower&family=Permanent+Marker&family=Caveat:wght@400;700&family=Patrick+Hand&family=Schoolbell&family=Architects+Daughter&family=Amatic+SC:wght@400;700&family=Shadows+Into+Light&family=Gloria+Hallelujah&family=Baloo+2:wght@400;700&family=Comfortaa:wght@400;700&family=Quicksand:wght@400;600&family=Mali:wght@400;600&family=Kaushan+Script&family=Pacifico&family=Dancing+Script:wght@400;700&family=Satisfy&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
