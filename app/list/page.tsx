'use client';

import { ArrowLeft, CalendarDays, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { getSupabaseBrowserClient } from '@/lib/supabase/client';

type ItemListRow = {
  id: string;
  title: string;
  region: string | null;
  published_at: string;
  created_at: string;
};

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? '날짜 미정'
    : dateFormatter.format(date);
}

function LoadingCards() {
  return (
    <output
      className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      aria-label="목록을 불러오는 중"
    >
      {[0, 1, 2].map((item) => (
        <div
          key={item}
          className="min-h-48 animate-pulse border-3 border-foreground bg-white p-6 shadow-[6px_6px_0_#211b17]"
        >
          <div className="h-5 w-20 bg-[#ffd44d]" />
          <div className="mt-8 h-7 w-4/5 bg-[#e8dfcf]" />
          <div className="mt-7 h-4 w-2/5 bg-[#e8dfcf]" />
        </div>
      ))}
      <span className="sr-only">불러오는 중...</span>
    </output>
  );
}

export default function ListPage() {
  const [items, setItems] = useState<ItemListRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    async function loadItems() {
      const supabase = getSupabaseBrowserClient();

      if (!supabase) {
        if (isActive) {
          setErrorMessage(
            'Supabase 연결 정보가 필요해요. 환경변수를 확인해 주세요.',
          );
          setIsLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from('items')
        .select('id, title, region, published_at, created_at')
        .order('published_at', { ascending: false });

      if (!isActive) return;

      if (error) {
        setErrorMessage(
          '목록을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.',
        );
      } else {
        setItems((data ?? []) as ItemListRow[]);
      }
      setIsLoading(false);
    }

    void loadItems();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <main className="brutal-grid min-h-screen bg-background px-5 py-8 text-foreground sm:px-8 sm:py-12">
      <div className="mx-auto w-full max-w-6xl">
        <header className="mb-10 flex flex-col items-start gap-6 sm:mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 border-2 border-foreground bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0_#211b17] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#211b17] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2e5bff]/30"
          >
            <ArrowLeft className="size-4" strokeWidth={3} aria-hidden="true" />
            첫 화면
          </Link>
          <div>
            <p className="mb-4 inline-block -rotate-1 border-3 border-foreground bg-[#ffd44d] px-3 py-2 text-xs font-black shadow-[4px_4px_0_#211b17] sm:text-sm">
              DIRECT INSURANCE GUIDE
            </p>
            <h1 className="text-4xl font-black tracking-[-0.06em] sm:text-5xl">
              둘러보기
            </h1>
            <p className="mt-4 max-w-2xl border-l-4 border-foreground pl-4 text-sm font-bold leading-6 sm:text-base">
              자동차 다이렉트 보험을 알아볼 때 필요한 내용을 지역과 날짜별로
              확인하세요.
            </p>
          </div>
        </header>

        {isLoading ? <LoadingCards /> : null}

        {!isLoading && errorMessage ? (
          <section
            className="border-3 border-foreground bg-[#ffb39e] p-7 shadow-[6px_6px_0_#211b17]"
            role="alert"
          >
            <h2 className="text-xl font-black">목록을 표시할 수 없어요</h2>
            <p className="mt-2 font-bold leading-6">{errorMessage}</p>
          </section>
        ) : null}

        {!isLoading && !errorMessage && items.length === 0 ? (
          <section className="border-3 border-foreground bg-white p-10 text-center shadow-[6px_6px_0_#211b17]">
            <p className="text-xl font-black sm:text-2xl">
              아직 등록된 글이 없어요
            </p>
            <p className="mt-3 text-sm font-bold text-muted-foreground">
              새로운 안내 글이 등록되면 이곳에서 확인할 수 있어요.
            </p>
          </section>
        ) : null}

        {!isLoading && !errorMessage && items.length > 0 ? (
          <section
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            aria-label="등록된 글 목록"
          >
            {items.map((item, index) => (
              <article
                key={item.id}
                className="benefit-card-brutal border-3 border-foreground bg-white p-6 shadow-[6px_6px_0_#211b17]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center gap-2 text-sm font-black text-[#a53f20]">
                  <MapPin
                    className="size-5"
                    strokeWidth={2.7}
                    aria-hidden="true"
                  />
                  <span>{item.region?.trim() || '지역 미정'}</span>
                </div>
                <h2 className="mt-8 text-xl font-black leading-snug tracking-[-0.04em] sm:text-2xl">
                  {item.title}
                </h2>
                <div className="mt-8 flex items-center gap-2 border-t-2 border-foreground pt-4 text-sm font-bold">
                  <CalendarDays
                    className="size-5"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <time dateTime={item.published_at || item.created_at}>
                    {formatDate(item.published_at || item.created_at)}
                  </time>
                </div>
              </article>
            ))}
          </section>
        ) : null}
      </div>
    </main>
  );
}
