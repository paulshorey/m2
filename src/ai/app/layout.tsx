import '#/styles/reset.scss';
import '#/styles/tailwind.css';
import '#/styles/colors.scss';
import '#/styles/layout.scss';
import '#/styles/classes.scss';
import '#/styles/global.scss';
import '#/styles/responsive.scss';
import '@fontsource/public-sans';
import { Inter } from 'next/font/google';

const primaryFont = Inter({
  subsets: ['latin'],
  variable: '--primary-font',
});

export const metadata = {
  title: {
    default: 'Next.js App Router',
    template: '%s | Next.js App Router',
  },
  description:
    'A playground to explore new Next.js App Router features such as nested layouts, instant loading states, streaming, and component level data fetching.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-mui-color-scheme="dark">
      <head />
      <body className={`${primaryFont.variable} font-sans`}>{children}</body>
    </html>
  );
}
