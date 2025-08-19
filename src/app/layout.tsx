import type { Metadata } from "next";
import "./globals.css";
import FloatingBear from "@/components/FloatingBear";
import DevBanner from "@/components/DevBanner";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Birthday for Bear 🐻",
  description:
    "A special birthday website for the philologist who loves rivers, birds, and tiny svinkas",
  keywords: ["birthday", "philologist", "birds", "rivers", "svinkas", "nature"],
  authors: [{ name: "Gino" }],
  viewport: "width=device-width, initial-scale=1",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          as="style"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <LanguageProvider>
          {children}
          <FloatingBear />
        </LanguageProvider>
      </body>
    </html>
  );
}
