'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';

function getSafeNextPath(value: FormDataEntryValue | null) {
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//')
  ) {
    return '/';
  }

  return value;
}

function getCredentials(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    return null;
  }

  return { email: email.trim(), password };
}

function authErrorUrl(
  path: '/login' | '/signup',
  message: string,
  next: string,
) {
  const params = new URLSearchParams({ error: message });
  if (next !== '/') params.set('next', next);
  return `${path}?${params.toString()}`;
}

export async function login(formData: FormData) {
  const next = getSafeNextPath(formData.get('next'));
  const credentials = getCredentials(formData);

  if (!credentials) {
    redirect(
      authErrorUrl('/login', '이메일과 비밀번호를 입력해 주세요.', next),
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    redirect(
      authErrorUrl(
        '/login',
        '로그인 정보를 확인해 주세요. 이메일 인증이 필요한 계정일 수 있어요.',
        next,
      ),
    );
  }

  revalidatePath('/', 'layout');
  redirect(next);
}

export async function signup(formData: FormData) {
  const credentials = getCredentials(formData);

  if (!credentials || credentials.password.length < 6) {
    redirect(
      authErrorUrl(
        '/signup',
        '이메일을 확인하고 비밀번호를 6자 이상 입력해 주세요.',
        '/',
      ),
    );
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp(credentials);

  if (error) {
    redirect(
      authErrorUrl(
        '/signup',
        '회원가입하지 못했어요. 이미 가입한 이메일인지 확인해 주세요.',
        '/',
      ),
    );
  }

  revalidatePath('/', 'layout');

  if (data.session) {
    redirect('/');
  }

  redirect(
    '/login?message=' +
      encodeURIComponent(
        '가입 확인 메일을 보냈어요. 이메일 인증 후 로그인해 주세요.',
      ),
  );
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut({ scope: 'local' });
  revalidatePath('/', 'layout');
  redirect('/');
}
