import { ArrowDownRight, BadgeCheck, Clock3, WalletCards } from 'lucide-react';

import { Button } from '@/components/ui/button';

const benefits = [
  {
    icon: WalletCards,
    number: '01',
    title: '중간 비용은 덜고',
    description: '필요한 보장과 가격을 직접 비교해요.',
    color: 'bg-[#ffd44d]',
  },
  {
    icon: Clock3,
    number: '02',
    title: '내 시간은 아끼고',
    description: '원하는 시간에 휴대폰으로 살펴봐요.',
    color: 'bg-[#ff7148]',
  },
  {
    icon: BadgeCheck,
    number: '03',
    title: '선택은 분명하게',
    description: '꼭 필요한 정보를 쉬운 말로 확인해요.',
    color: 'bg-[#2e5bff] text-white',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <section id="top" className="brutal-grid relative isolate min-h-screen border-b-4 border-foreground">
        <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-10">
          <a
            href="#top"
            className="brutal-logo focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#2e5bff]/40"
            aria-label="처음으로"
          >
            M
          </a>
          <p className="rotate-1 border-2 border-foreground bg-white px-3 py-2 text-[11px] font-black tracking-[0.16em] shadow-[3px_3px_0_#211b17] sm:text-xs">
            DIRECT GUIDE / 2026
          </p>
        </header>

        <div className="mx-auto grid w-full max-w-7xl gap-9 px-5 pb-14 pt-5 sm:px-8 sm:pb-20 sm:pt-9 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-14 lg:px-10 lg:pb-24 lg:pt-12">
          <div className="relative z-10">
            <p className="mb-6 inline-block -rotate-1 border-3 border-foreground bg-[#ffd44d] px-4 py-2 text-sm font-black shadow-[5px_5px_0_#211b17] sm:text-base">
              내 차를 위한 다정한 선택 가이드
            </p>
            <h1 className="max-w-2xl text-[clamp(3.1rem,8vw,6.65rem)] font-black leading-[0.94] tracking-[-0.075em] text-foreground">
              자동차
              <br />
              다이렉트가
              <br />
              <span className="title-swipe">좋은 이유</span>
            </h1>
            <p className="mt-7 max-w-lg border-l-4 border-foreground pl-4 text-base font-bold leading-7 sm:text-lg sm:leading-8">
              어렵게 느껴지는 자동차 다이렉트,
              <br className="hidden sm:block" /> 꼭 필요한 내용만 쉽고 빠르게 확인하세요.
            </p>
            <Button
              size="lg"
              className="brutal-button mt-8 h-14 border-3 border-foreground bg-[#ff7148] px-7 text-base font-black text-foreground shadow-[6px_6px_0_#211b17] hover:bg-[#ff8a68] sm:h-16 sm:px-9 sm:text-lg"
            >
              둘러보기
              <ArrowDownRight className="ml-1 size-6" strokeWidth={3} aria-hidden="true" />
            </Button>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-3xl lg:mx-0">
            <div aria-hidden="true" className="image-backplate" />
            <figure className="brutal-image-frame relative overflow-hidden border-4 border-foreground bg-[#ffd44d] shadow-[10px_10px_0_#211b17]">
              <img
                src="/HOME.gif"
                alt="자동차 이야기 메뉴를 소개하는 움직이는 이미지"
                width="1920"
                height="600"
                loading="eager"
                fetchPriority="high"
                className="block h-auto w-full object-contain"
              />
            </figure>
            <div className="brutal-sticker" aria-hidden="true">
              EASY
              <br />
              DRIVE!
            </div>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-4 px-5 pb-12 sm:grid-cols-3 sm:px-8 sm:pb-16 lg:px-10">
          {benefits.map(({ icon: Icon, number, title, description, color }, index) => (
            <article
              key={title}
              className={`benefit-card-brutal ${color} border-3 border-foreground p-5 shadow-[6px_6px_0_#211b17] sm:p-6`}
              style={{ animationDelay: `${120 + index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <Icon className="size-8" strokeWidth={2.7} aria-hidden="true" />
                <span className="font-mono text-sm font-black">/{number}</span>
              </div>
              <h2 className="mt-8 text-xl font-black tracking-[-0.04em] sm:text-2xl">{title}</h2>
              <p className="mt-2 text-sm font-bold leading-6 opacity-80 sm:text-base">
                {description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
