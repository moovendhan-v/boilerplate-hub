import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import { Navigation } from './components/Navigation';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Boilerplate Hub',
    default: 'Boilerplate Hub'
  },
  description: 'Discover, share, and use boilerplate code for your next project',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}