"use client";

import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // Include the weights you need
  variable: '--font-roboto',     // optional CSS variable
  display: 'swap',
});


export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
