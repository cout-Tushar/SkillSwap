

import type { Metadata } from "next";
import { Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import AnimatedRedBackground from "./components/AnimatedRedBackground";
import Footer from "./components/Footer";
import {MyProvider} from "./context/MyContext" // import here
import { use } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

export const metadata: Metadata = {
  title: "SkillSwap",
  description: "Trade skills. Build your future.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${sora.variable}`}
    >
      <body className="antialiased font-sans">
           <MyProvider>
        <SessionProvider>
          <AnimatedRedBackground />
          {children}
          <Footer />
        </SessionProvider>
        </MyProvider>
      </body>
    </html>
  );
}