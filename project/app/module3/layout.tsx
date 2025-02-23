import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Churn Prediction Dashboard',
  description: 'AI-Powered Churn Prediction & Retention Strategies Dashboard',
  icons: {
    icon: '/vercel.svg', // Using vercel.svg as a temporary icon since we know it exists
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}