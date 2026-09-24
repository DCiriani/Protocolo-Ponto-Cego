create table if not exists public.quiz_completions (
  id uuid primary key default gen_random_uuid(),
  anonymous_id uuid not null unique,
  source text,
  created_at timestamptz not null default now()
);

alter table public.quiz_completions enable row level security;

revoke all on table public.quiz_completions from anon, authenticated;
grant select, insert on table public.quiz_completions to service_role;

create index if not exists idx_quiz_completions_created_at
  on public.quiz_completions (created_at desc);
