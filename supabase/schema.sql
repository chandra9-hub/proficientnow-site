-- =============================================================================
-- ProficientNow UK: expected Supabase schema (tables, RLS, storage).
--
-- This file DOCUMENTS the schema the code expects. It was reverse-engineered
-- from src/lib/supabase.ts and every supabase.from(...) / storage call in src/.
-- It is NOT applied automatically. Review it against the live Supabase project
-- before running it (SQL Editor), in particular:
--   * column names/types/defaults vs. the live tables (CREATE TABLE IF NOT EXISTS
--     silently skips tables that already exist, even if their columns differ);
--   * existing RLS policies: policies are OR'd together, so any older, more
--     permissive policy left in place still applies. Drop those by hand.
--
-- Access model:
--   anon (public site)    read published jobs/posts, insert applications,
--                         upload CVs. Nothing else.
--   authenticated (admin) full CRUD on everything. ANY signed-in user is an
--                         admin, so public sign-ups MUST be disabled
--                         (Authentication > Sign In / Providers > Email >
--                         "Allow new users to sign up" off) and admin users
--                         created by hand in the dashboard.
-- =============================================================================

-- keeps posts.updated_at current; the app never sets it.
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- -----------------------------------------------------------------------------
-- jobs: vacancies. Public pages filter on status = 'published'.
-- -----------------------------------------------------------------------------
create table if not exists public.jobs (
  id                  uuid primary key default gen_random_uuid(),
  title               text not null,
  slug                text unique,
  sector              text,
  location            text,
  country             text,
  employment_type     text,
  salary_range        text,
  experience_required text,
  department          text,
  description         text,
  responsibilities    text,
  requirements        text,
  benefits            text,
  working_hours       text,
  closing_date        date,
  featured            boolean not null default false,
  status              text not null default 'draft'
                        check (status in ('draft', 'published', 'closed')),
  created_at          timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- posts: news + blog articles. Public pages filter on status = 'published'.
-- -----------------------------------------------------------------------------
create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  type         text not null default 'news' check (type in ('news', 'blog')),
  title        text not null,
  slug         text not null,
  excerpt      text,
  body         text,
  cover_image  text,
  category     text,
  author       text,
  source_name  text,
  source_url   text,
  status       text not null default 'draft' check (status in ('draft', 'published')),
  featured     boolean not null default false,
  published_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (type, slug)
);

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

-- -----------------------------------------------------------------------------
-- applications: submitted by the public apply form, managed in /admin.
-- -----------------------------------------------------------------------------
create table if not exists public.applications (
  id               uuid primary key default gen_random_uuid(),
  job_id           uuid references public.jobs (id) on delete set null,
  first_name       text not null,
  last_name        text not null,
  email            text not null,
  phone            text,
  current_location text,
  notice_period    text,
  current_salary   text,
  expected_salary  text,
  years_experience text,
  linkedin_url     text,
  portfolio_url    text,
  cover_letter     text,
  cv_path          text,  -- object path inside the private "cvs" bucket
  status           text not null default 'Applied'
                     check (status in ('Applied', 'Shortlisted', 'Interview', 'Offer', 'Hired', 'Rejected')),
  created_at       timestamptz not null default now()
);

create index if not exists applications_job_id_idx on public.applications (job_id);

-- -----------------------------------------------------------------------------
-- Row Level Security
-- -----------------------------------------------------------------------------
alter table public.jobs         enable row level security;
alter table public.posts        enable row level security;
alter table public.applications enable row level security;

-- jobs
drop policy if exists "jobs: public reads published" on public.jobs;
create policy "jobs: public reads published" on public.jobs
  for select to anon using (status = 'published');

drop policy if exists "jobs: admin full access" on public.jobs;
create policy "jobs: admin full access" on public.jobs
  for all to authenticated using (true) with check (true);

-- posts
drop policy if exists "posts: public reads published" on public.posts;
create policy "posts: public reads published" on public.posts
  for select to anon using (status = 'published');

drop policy if exists "posts: admin full access" on public.posts;
create policy "posts: admin full access" on public.posts
  for all to authenticated using (true) with check (true);

-- applications: anon may only insert (no select, so applicants can't read
-- each other's data). New rows must start as 'Applied' against a published job.
drop policy if exists "applications: public can apply" on public.applications;
create policy "applications: public can apply" on public.applications
  for insert to anon
  with check (
    status = 'Applied'
    and job_id in (select id from public.jobs where status = 'published')
  );

drop policy if exists "applications: admin full access" on public.applications;
create policy "applications: admin full access" on public.applications
  for all to authenticated using (true) with check (true);

-- -----------------------------------------------------------------------------
-- Storage: private "cvs" bucket. 10 MB limit matches content/careers.ts.
-- -----------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit)
values ('cvs', 'cvs', false, 10485760)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

-- anon: upload only. No select policy, so no read, list or signed URLs.
-- The app uploads with upsert: false, so no update policy is needed either.
drop policy if exists "cvs: public can upload" on storage.objects;
create policy "cvs: public can upload" on storage.objects
  for insert to anon with check (bucket_id = 'cvs');

-- authenticated: full CRUD (admin downloads via signed URL and deletes CVs).
drop policy if exists "cvs: admin full access" on storage.objects;
create policy "cvs: admin full access" on storage.objects
  for all to authenticated using (bucket_id = 'cvs') with check (bucket_id = 'cvs');
