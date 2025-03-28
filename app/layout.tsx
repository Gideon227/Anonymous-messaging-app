import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Arimo } from 'next/font/google'
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
        <Toaster />
        {children}
      </body>
    </html>
  );
}