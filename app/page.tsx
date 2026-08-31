import { ArrowRight, BadgeCheck, Clock3, WalletCards } from 'lucide-react';

import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: WalletCards,
    eyebrow: '합리적인 선택',
    title: '중간 비용은 덜고',
    description: '복잡한 유통 단계를 줄여 필요한 보장과 가격을 직접 비교해요.',
  },
  {
    icon: Clock3,
    eyebrow: '간편한 과정',
    title: '내 시간은 아끼고',
    description: '원하는 시간에 휴대폰으로 살펴보고 부담 없이 결정할 수 있어요.',
  },
  {
    icon: BadgeCheck,
    eyebrow: '든든한 기준',
    title: '선택은 더 분명하게',
    description: '꼭 필요한 정보를 쉬운 말로 확인하고 나에게 맞게 선택해요.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative isolate min-h-screen">
        <div aria-hidden="true" className="warm-glow warm-glow-one" />
        <div aria-hidden="true" className="warm-glow warm-glow-two" />

        <header className="mx-auto flex w-full max-w-6xl items-center px-5 py-6 sm:px-8 sm:py-8 lg:px-10">
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/30"
            aria-label="멍메이트 처음으로"
          >
            <span className="brand-mark" aria-hidden="true">
              M
            </span>
            <span className="text-xl font-extrabold tracking-[-0.04em] sm:text-2xl">
              멍메이트
            </span>
          </a>
        </header>

        <div
          id="top"
          className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 pb-14 pt-6 sm:px-8 sm:pb-20 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:pb-24 lg:pt-14"
        >
          <div className="relative z-10 max-w-2xl">
            <p className="mb-5 inline-flex items-center rounded-full border border-primary/15 bg-white/70 px-4 py-2 text-sm font-bold text-primary shadow-sm backdrop-blur">
              내 차를 위한 다정한 선택 가이드
            </p>
            <h1 className="text-balance text-[clamp(3.35rem,9vw,6.8rem)] font-black leading-[0.92] tracking-[-0.075em] text-primary">
              멍메이트
            </h1>
            <p className="mt-6 max-w-xl text-balance text-2xl font-bold leading-snug tracking-[-0.035em] text-foreground sm:text-3xl lg:text-[2.15rem]">
              자동차 다이렉트 가 좋은이유
            </p>
            <p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              어렵게 느껴지는 자동차 다이렉트, 멍메이트가 꼭 필요한 내용만
              쉽고 편안하게 안내해 드릴게요.
            </p>
            <Button
              size="lg"
              className="mt-8 h-14 rounded-full px-7 text-base font-bold shadow-[0_12px_30px_rgba(148,73,36,0.2)] transition-transform hover:-translate-y-0.5 sm:h-16 sm:px-9 sm:text-lg"
            >
              둘러보기
              <ArrowRight className="ml-1 size-5" aria-hidden="true" />
            </Button>
          </div>

          <div className="relative z-10 grid gap-3 sm:gap-4" aria-label="멍메이트 소개">
            {benefits.map(({ icon: Icon, eyebrow, title, description }, index) => (
              <article
                key={title}
                className="benefit-card group flex gap-4 rounded-[1.75rem] border border-white/80 bg-white/76 p-5 shadow-[0_18px_50px_rgba(89,55,31,0.09)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-1 sm:gap-5 sm:p-6"
                style={{ animationDelay: `${160 + index * 110}ms` }}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary sm:size-14">
                  <Icon className="size-6 sm:size-7" strokeWidth={2.1} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-xs font-extrabold tracking-[0.12em] text-accent-foreground">
                    {eyebrow}
                  </p>
                  <h2 className="mt-1 text-xl font-extrabold tracking-[-0.035em] sm:text-2xl">
                    {title}
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
