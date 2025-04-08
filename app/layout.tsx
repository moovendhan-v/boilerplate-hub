'use client';

import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from '@/components/Navigation';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navigation />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}