import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spond Club Signup',
  description: 'Join a club and register for activities',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="py-6 text-center text-gray-500 text-sm">
          © 2025 Spond Club. All rights reserved.
        </footer>
      </body>
    </html>
  );
}