import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "AbdElrahman Desouki | Accountant & Odoo ERP Specialist",
  description:
    "Professional portfolio of AbdElrahman Desouki - Accountant, Odoo ERP Specialist, and Tech-Oriented Business Systems Developer. Bridging finance and technology for business optimization.",
  keywords: [
    "AbdElrahman Desouki",
    "Accountant",
    "Odoo ERP",
    "ERP Specialist",
    "Business Systems",
    "Financial Operations",
    "Egypt",
    "Cairo",
  ],
  authors: [{ name: "AbdElrahman Desouki" }],
  creator: "AbdElrahman Desouki",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "AbdElrahman Desouki | Accountant & Odoo ERP Specialist",
    description:
      "Professional portfolio of AbdElrahman Desouki - Bridging finance and technology for business optimization.",
    siteName: "AbdElrahman Desouki Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "AbdElrahman Desouki | Accountant & Odoo ERP Specialist",
    description:
      "Professional portfolio of AbdElrahman Desouki - Bridging finance and technology for business optimization.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f1419",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
