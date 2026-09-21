import Link from 'next/link';

import { logout } from '@/app/auth/actions';

type AuthHeaderProps = {
  email: string | null;
};

export function AuthHeader({ email }: AuthHeaderProps) {
  return (
    <header className="border-b-3 border-foreground bg-white px-5 py-3 text-foreground sm:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="text-base font-black tracking-[-0.03em]">
          자동차 다이렉트 가이드
        </Link>

        {email ? (
          <div className="flex min-w-0 items-center gap-3">
            <span className="max-w-44 truncate text-xs font-bold sm:max-w-72 sm:text-sm">
              {email}
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="border-2 border-foreground bg-[#ffd44d] px-3 py-2 text-xs font-black shadow-[3px_3px_0_#211b17] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_#211b17] sm:text-sm"
              >
                로그아웃
              </button>
            </form>
          </div>
        ) : (
          <nav className="flex items-center gap-2" aria-label="회원 메뉴">
            <Link
              href="/login"
              className="border-2 border-foreground bg-white px-3 py-2 text-xs font-black sm:text-sm"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="border-2 border-foreground bg-[#ffd44d] px-3 py-2 text-xs font-black shadow-[3px_3px_0_#211b17] sm:text-sm"
            >
              회원가입
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
