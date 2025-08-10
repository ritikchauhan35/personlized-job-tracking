-- Schema for TrackSpark (Supabase)

-- Platforms
create table if not exists public.platforms (
  id uuid primary key default gen_random_uuid(),
  name text unique not null
);

-- Jobs
create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  role text not null,
  platform_id uuid references public.platforms(id) on delete set null,
  url text,
  status text not null check (status in ('Applied','Interviewing','Offer','Rejected','Ghosted')),
  notes text,
  next_steps text,
  applied_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Checklist items per job
create table if not exists public.checklists (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  text text not null,
  done boolean not null default false
);

-- updated_at trigger
create or replace function public.fn_set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trg_jobs_updated
before update on public.jobs
for each row execute function public.fn_set_updated_at();

-- Seed platforms
insert into public.platforms(name)
values ('LinkedIn'),('Indeed'),('AngelList'),('Cold Email'),('Other')
on conflict do nothing;
