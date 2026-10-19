import type { Metadata } from "next";
import "./globals.css";
import "./particles.css";

export const metadata: Metadata = {
  title: "Vaibhav Pandey — Software & AI Developer",
  description: "Computer Science & AI/ML student at IILM University. Building offline AI, mobile applications, and software for real-world problems.",
};

import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
