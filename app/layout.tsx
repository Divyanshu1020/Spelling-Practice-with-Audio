import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Spelling Practice with Audio',
  description: 'Improve your spelling skills by listening to words and typing them correctly. A fun and interactive way to enhance your vocabulary!',
  keywords: ['spelling practice', 'audio spelling', 'learn spelling', 'spelling test', 'word practice', 'improve spelling'],
  authors: { name: 'Divyanshu' },
  openGraph: {
    title: 'Spelling Practice with Audio',
    description: 'Practice spelling by listening to words and typing them accurately. Perfect for learners of all ages!',
    type: 'website',
    // url: 'https://yourportfolio.com', // Replace with your actual portfolio URL
    // images: [
    //   {
    //     url: 'https://yourportfolio.com/og-image.png', // Replace with your actual OG image
    //     width: 1200,
    //     height: 630,
    //     alt: 'Spelling Practice with Audio',
    //   },
    // ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spelling Practice with Audio',
    description: 'Listen to words and type them correctly to improve your spelling skills.',
    images: ['https://yourportfolio.com/og-image.png'], // Replace with your actual image
  },
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}