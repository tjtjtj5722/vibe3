-- 멍메이트 콘텐츠(items) 테이블
-- Supabase SQL Editor 또는 마이그레이션에서 실행한다.

create extension if not exists pgcrypto;

create table if not exists public.items (
  id uuid primary key default gen_random_uuid(),
  author_id uuid null references auth.users (id) on delete set null,
  title varchar(80) not null,
  region varchar(50) null,
  summary varchar(200) not null,
  body text not null,
  category text not null
    check (category in ('비용', '보장', '가입', '갱신', '사고처리', '기타')),
  image_url text null
    check (image_url is null or image_url ~ '^https://'),
  source_name varchar(100) not null,
  source_url text not null
    check (source_url ~ '^https://'),
  status text not null default '초안'
    check (status in ('초안', '게시', '숨김')),
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 이전 버전의 items 테이블에도 지역 컬럼을 안전하게 추가한다.
alter table public.items add column if not exists region varchar(50) null;

comment on table public.items is '자동차 다이렉트 보험 안내 콘텐츠';
comment on column public.items.author_id is '작성자 사용자 ID. 사용자 삭제 후에는 NULL일 수 있다.';
comment on column public.items.body is 'Markdown 형식의 콘텐츠 본문';

create or replace function public.set_items_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_items_updated_at on public.items;
create trigger set_items_updated_at
before update on public.items
for each row
execute function public.set_items_updated_at();

alter table public.items enable row level security;

drop policy if exists "items_select_public" on public.items;
create policy "items_select_public"
on public.items
for select
to anon, authenticated
using (true);

drop policy if exists "items_insert_own" on public.items;
create policy "items_insert_own"
on public.items
for insert
to authenticated
with check ((select auth.uid()) = author_id);

drop policy if exists "items_update_own" on public.items;
create policy "items_update_own"
on public.items
for update
to authenticated
using ((select auth.uid()) = author_id)
with check ((select auth.uid()) = author_id);

drop policy if exists "items_delete_own" on public.items;
create policy "items_delete_own"
on public.items
for delete
to authenticated
using ((select auth.uid()) = author_id);

revoke all on table public.items from anon, authenticated;
grant select on table public.items to anon, authenticated;
grant insert, update, delete on table public.items to authenticated;
