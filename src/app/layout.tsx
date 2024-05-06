import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NextAuthProvider } from "@/components/session-provider";
import PrelineScript from "@/components/preline";
const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MerchantLive",
  description: "Make you online Card",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <PrelineScript />{" "}
        <NextAuthProvider>
          {/* <PrelineScript /> */}
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
