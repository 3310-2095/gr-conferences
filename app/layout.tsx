import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GR Conferences – Connecting Global Research Communities",
  description:
    "GR Conferences is a central ecosystem platform showcasing 13+ global research conference brands under the GR Foundation umbrella.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col" style={{ background: "#0f2410" }}>
        {children}
      </body>
    </html>
  );
}
