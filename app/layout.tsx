import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vibe3-smoky.vercel.app'),
  title: '멍메이트 | 자동차 다이렉트 가 좋은이유',
  description:
    '자동차 다이렉트의 장점을 쉽고 편안하게 살펴보는 멍메이트 안내 페이지입니다.',
  openGraph: {
    title: '멍메이트',
    description: '자동차 다이렉트 가 좋은이유',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '멍메이트',
    description: '자동차 다이렉트 가 좋은이유',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
