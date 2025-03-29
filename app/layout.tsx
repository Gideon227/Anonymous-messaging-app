import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Arimo } from 'next/font/google'
import ProgressProvider from "@/components/ProgressProvider";
import "./globals.css";


const arimo = Arimo({
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={arimo.className}
      >
        <ProgressProvider>
          <Toaster />
          {children}
        </ProgressProvider>
      </body>
    </html>
  );
}