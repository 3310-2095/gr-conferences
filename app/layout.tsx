import type { Metadata } from "next";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata: Metadata = {
  title: "GR Conferences – Connecting Global Research Communities",
  description:
    "GR Conferences is a central ecosystem platform showcasing 13+ global research conference brands under the GR Foundation umbrella.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
