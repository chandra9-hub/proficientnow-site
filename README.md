# ProficientNow UK

Marketing and careers site for ProficientNow UK, live at [www.proficientnow.co.uk](https://www.proficientnow.co.uk).
Public pages, a careers portal with CV upload, news/blog, and a small admin area for jobs, posts and applications.

**Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Supabase (Postgres, Auth, Storage), hosted on Vercel.

## Local development

Requires Node.js 18.17+ (20 LTS recommended).

```bash
npm ci
cp .env.example .env.local   # fill in the Supabase URL and anon key
npm run dev                  # http://localhost:3000
```

Without Supabase env vars the site still runs; careers, news and blog render empty and login is disabled.

Other scripts: `npm run build`, `npm start`.

## Where things live

| Path | What |
|------|------|
| `content/*.ts` | All editable copy: site details, nav, home, about, services, sectors, industries, careers, salaries, legal, theme |
| `src/app/` | Routes (one folder per page) |
| `src/components/` | Shared UI components |
| `src/lib/supabase.ts` | Supabase client and `Job` / `Post` types |
| `public/` | Logos, illustrations and photos |
| `supabase/schema.sql` | Expected database schema, RLS policies and storage bucket |

In headlines, wrap words in `*asterisks*` to render them in the accent colour.

## Routes

| Route | Notes |
|-------|-------|
| `/`, `/about`, `/services`, `/sectors`, `/sectors/[slug]`, `/contact`, `/salary-calculator` | Static, driven by `content/` |
| `/careers`, `/careers/[slug]` | Published jobs from Supabase, apply form uploads CV to the `cvs` bucket |
| `/news`, `/news/[slug]`, `/blog`, `/blog/[slug]` | Published posts from Supabase |
| `/privacy`, `/terms`, `/cookies`, `/gdpr` | Legal pages from `content/legal.ts` |
| `/login`, `/admin`, `/admin/jobs`, `/admin/news`, `/admin/applications` | Admin area, Supabase Auth (email + password) |
| `/sitemap.xml`, `/robots.txt` | Generated |

## Supabase setup

1. Create a Supabase project and copy its URL and anon key into `.env.local` (and Vercel).
2. Review `supabase/schema.sql` against the project, then run it in the SQL Editor. It is not applied automatically.
3. Disable public sign-ups (Authentication > Providers > Email) and create admin users by hand. Every signed-in user has full admin access.

The anon key is exposed to the browser by design; Row Level Security is what protects the data.

## Deploy (Vercel)

Pushes to `main` deploy to production; other branches get preview URLs.

- **Root Directory** (Settings > Build & Deployment) must be blank (repo root). The app used to live in `proficientnow-site/`.
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` under Settings > Environment Variables.
- Domains are managed under Settings > Domains.
