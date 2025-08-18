import type { Metadata } from "next";
import "./globals.css";
import FloatingBear from "@/components/FloatingBear";

export const metadata: Metadata = {
  title: "Birthday for Bear 🐻",
  description: "A special birthday website for the philologist who loves rivers, birds, and tiny svinkas",
  keywords: ["birthday", "philologist", "birds", "rivers", "svinkas", "nature"],
  authors: [{ name: "Gino" }],
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <FloatingBear />
      </body>
    </html>
  );
}
