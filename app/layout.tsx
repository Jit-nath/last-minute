// app/layout.tsx (or wherever your root layout lives)
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
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
    <ClerkProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <html lang="en" className={geistSans.variable}>
          {/* we’ll let next-themes toggle “dark” here */}
          <body
            className={`${geistMono.variable} antialiased `}
          >
            {children}
          </body>
        </html>
      </ThemeProvider>
    </ClerkProvider>
  );
}
