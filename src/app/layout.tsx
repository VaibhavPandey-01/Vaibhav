import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Vaibhav Pandey | C++ Developer",
  description: "I build structured thinking into digital systems. C++ Developer based in Greater Noida.",
};

import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark no-scrollbar">
      <body className={`${outfit.variable} font-sans antialiased bg-black text-white selection:bg-accent/30 selection:text-white`}>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
