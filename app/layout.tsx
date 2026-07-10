import type { Metadata } from "next";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "GR Conferences – Connecting Global Research Communities",
  description:
    "GR Conferences is a central ecosystem platform showcasing 13+ global research conference brands under the GR Foundation umbrella.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "GR Conferences – Connecting Global Research Communities",
    description:
      "GR Conferences is a central ecosystem platform showcasing 13+ global research conference brands under the GR Foundation umbrella.",
    url: "https://grconferences.com",
    siteName: "GR Conferences",
    images: [
      {
        url: "/favicon.png",
        width: 512,
        height: 512,
        alt: "GR Conferences",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "GR Conferences – Connecting Global Research Communities",
    description:
      "GR Conferences is a central ecosystem platform showcasing 13+ global research conference brands under the GR Foundation umbrella.",
    images: ["/favicon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-full antialiased", "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <PageLoader />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
