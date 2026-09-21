import type { Metadata } from 'next';

import { AuthHeader } from '@/components/auth-header';
import { createClient } from '@/lib/supabase/server';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vibe3-smoky.vercel.app'),
  title: '자동차 다이렉트 가 좋은이유',
  description:
    '자동차 다이렉트의 장점을 쉽고 편안하게 살펴보는 안내 페이지입니다.',
  openGraph: {
    title: '자동차 다이렉트 가 좋은이유',
    description: '자동차 다이렉트 가 좋은이유',
    images: ['/hero-brutal.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '자동차 다이렉트 가 좋은이유',
    description: '자동차 다이렉트 가 좋은이유',
    images: ['/hero-brutal.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email =
    typeof data?.claims?.email === 'string' ? data.claims.email : null;

  return (
    <html lang="ko">
      <body>
        <AuthHeader email={email} />
        {children}
      </body>
    </html>
  );
}
