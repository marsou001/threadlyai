import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = "https://threadly.pro";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "ThreadlyAI",
  description: "ThreadlyAI helps you craft engaging, AI-powered social media threads in seconds. Boost your content game with smart automation and creativity.",
  keywords: "AI social media, thread generator, AI threads, content creation, social media automation, Twitter threads, AI copywriting, AI content tool, ThreadlyAI",
  openGraph: {
    url: "/",
    images: {
      url: "/threadly.png",
    }
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased dark`}
      >
        <ClerkProvider>
            <Navbar />
            {children}
            <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
