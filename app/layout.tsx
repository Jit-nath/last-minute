"use client";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body className={`${geistMono.variable} antialiased`}>{children}</body>
      </html>
    </SessionProvider>
  );
}
