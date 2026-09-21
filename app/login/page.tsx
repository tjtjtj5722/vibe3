import { AuthForm } from '@/components/auth-form';

type LoginPageProps = {
  searchParams: Promise<{
    error?: string;
    message?: string;
    next?: string;
  }>;
};

function getSafeNextPath(value?: string) {
  return value?.startsWith('/') && !value.startsWith('//') ? value : '/';
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <AuthForm
      mode="login"
      error={params.error}
      message={params.message}
      next={getSafeNextPath(params.next)}
    />
  );
}
