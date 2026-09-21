import { ArrowLeft, FilePlus2 } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

export default async function NewPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect('/login?next=/new');
  }

  return (
    <main className="brutal-grid min-h-[calc(100vh-65px)] px-5 py-10 text-foreground sm:px-8">
      <section className="mx-auto w-full max-w-3xl">
        <Link
          href="/list"
          className="inline-flex items-center gap-2 border-2 border-foreground bg-white px-4 py-2 text-sm font-black shadow-[3px_3px_0_#211b17]"
        >
          <ArrowLeft className="size-4" strokeWidth={3} aria-hidden="true" />
          목록으로
        </Link>
        <div className="mt-8 border-3 border-foreground bg-white p-7 shadow-[8px_8px_0_#211b17] sm:p-10">
          <FilePlus2 className="size-10" strokeWidth={2.5} aria-hidden="true" />
          <h1 className="mt-5 text-3xl font-black tracking-[-0.05em] sm:text-4xl">
            상담·견적 요청 등록
          </h1>
          <p className="mt-4 border-l-4 border-foreground pl-4 font-bold leading-7">
            로그인된 사용자만 볼 수 있는 등록 화면입니다. 상담 요청 양식은 다음
            단계에서 연결할 수 있어요.
          </p>
        </div>
      </section>
    </main>
  );
}
