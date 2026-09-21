import Link from 'next/link';

import { login, signup } from '@/app/auth/actions';

type AuthFormProps = {
  mode: 'login' | 'signup';
  error?: string;
  message?: string;
  next?: string;
};

export function AuthForm({ mode, error, message, next = '/' }: AuthFormProps) {
  const isLogin = mode === 'login';

  return (
    <main className="brutal-grid flex min-h-[calc(100vh-65px)] items-center justify-center px-5 py-10 text-foreground">
      <section className="w-full max-w-md border-3 border-foreground bg-white p-6 shadow-[8px_8px_0_#211b17] sm:p-8">
        <p className="inline-block -rotate-1 border-2 border-foreground bg-[#ffd44d] px-3 py-2 text-xs font-black">
          {isLogin ? 'WELCOME BACK' : 'JOIN US'}
        </p>
        <h1 className="mt-5 text-3xl font-black tracking-[-0.05em] sm:text-4xl">
          {isLogin ? '로그인' : '이메일 회원가입'}
        </h1>
        <p className="mt-3 text-sm font-bold leading-6 text-muted-foreground">
          {isLogin
            ? '가입한 이메일과 비밀번호로 로그인하세요.'
            : '이메일과 6자 이상의 비밀번호를 입력하세요.'}
        </p>

        {error ? (
          <p
            className="mt-5 border-2 border-foreground bg-[#ffb39e] p-3 text-sm font-bold"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        {message ? (
          <output className="mt-5 border-2 border-foreground bg-[#cce7a8] p-3 text-sm font-bold">
            {message}
          </output>
        ) : null}

        <form action={isLogin ? login : signup} className="mt-6 space-y-5">
          {isLogin ? <input type="hidden" name="next" value={next} /> : null}
          <label className="block text-sm font-black">
            이메일
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="mt-2 h-12 w-full border-2 border-foreground bg-[#fffaf0] px-4 font-bold outline-none focus:ring-4 focus:ring-[#2e5bff]/25"
              placeholder="name@example.com"
            />
          </label>
          <label className="block text-sm font-black">
            비밀번호
            <input
              name="password"
              type="password"
              autoComplete={isLogin ? 'current-password' : 'new-password'}
              minLength={6}
              required
              className="mt-2 h-12 w-full border-2 border-foreground bg-[#fffaf0] px-4 font-bold outline-none focus:ring-4 focus:ring-[#2e5bff]/25"
              placeholder="6자 이상 입력"
            />
          </label>
          <button
            type="submit"
            className="brutal-button h-12 w-full border-3 border-foreground bg-[#ff7148] px-5 text-sm font-black shadow-[5px_5px_0_#211b17] hover:bg-[#ff8a68]"
          >
            {isLogin ? '로그인하기' : '회원가입하기'}
          </button>
        </form>

        <p className="mt-7 text-center text-sm font-bold">
          {isLogin ? '아직 계정이 없나요?' : '이미 계정이 있나요?'}{' '}
          <Link
            href={isLogin ? '/signup' : '/login'}
            className="underline decoration-2 underline-offset-4"
          >
            {isLogin ? '회원가입' : '로그인'}
          </Link>
        </p>
      </section>
    </main>
  );
}
