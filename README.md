# ProficientNow UK

Marketing and careers site for ProficientNow UK, live at [www.proficientnow.co.uk](https://www.proficientnow.co.uk).
Public pages, a careers portal with CV upload, and news/blog. Jobs, posts and applications are managed in Airtable (there is no admin panel in the site).

**Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Framer Motion, Airtable (CMS + applications), hosted on Vercel.

## Local development

Requires Node.js 20+.

```bash
npm ci
cp .env.example .env.local   # fill in AIRTABLE_PAT and AIRTABLE_BASE_ID
npm run dev                  # http://localhost:3000
```

Without the Airtable env vars the site still builds and runs; careers, news and blog show their empty states and applications are refused.

Other scripts: `npm run build`, `npm start`.

## Where things live

| Path | What |
|------|------|
| `content/*.ts` | All editable copy: site details, nav, home, about, services, sectors, industries, careers, salaries, legal, theme |
| `src/app/` | Routes (one folder per page) |
| `src/components/` | Shared UI components |
| `src/lib/airtable.ts` | Server-only Airtable client (reads, create, CV upload) |
| `src/lib/data.ts` | `Job` / `Post` types and the Airtable field-name mapping |
| `src/lib/markdown.ts` | Markdown to sanitized HTML for job and post text |
| `public/` | Logos, illustrations and photos |

In headlines, wrap words in `*asterisks*` to render them in the accent colour.

## Routes

| Route | Notes |
|-------|-------|
| `/`, `/about`, `/services`, `/sectors`, `/sectors/[slug]`, `/contact`, `/salary-calculator` | Static, driven by `content/` |
| `/careers`, `/careers/[slug]` | Published jobs from Airtable; the apply form posts to `/api/apply` |
| `/news`, `/news/[slug]`, `/blog`, `/blog/[slug]` | Published posts from Airtable |
| `/api/apply` | Validates an application and CV, saves it to the Applications table |
| `/api/attachment/Posts/[record]/[attachment]` | Stable, cached URL for a post's cover image (Airtable file links expire) |
| `/privacy`, `/terms`, `/cookies`, `/gdpr` | Legal pages from `content/legal.ts` |
| `/sitemap.xml`, `/robots.txt` | Generated |

## Airtable (CMS)

Base: **ProficientNow UK** (`appkKYYKIVwyHSPQZ`). The code reads the base id from `AIRTABLE_BASE_ID` and uses field **names**, so renaming a field breaks the site.

| Table | Fields |
|-------|--------|
| **Jobs** | Title, Slug, Published, Featured, Sector, Location, Country, Employment Type (Permanent / Contract / Temporary / Part-time), Salary Range, Experience Required, Department, Working Hours, Description, Responsibilities, Requirements, Benefits (markdown), Closing Date, Posted Date |
| **Posts** | Title, Slug, Type (News / Blog), Published, Featured, Excerpt, Meta Description, Body (markdown), Cover Image, Cover Alt, Category, Author, Source Name, Source URL, Published Date |
| **Applications** | Name, First Name, Last Name, Email, Phone, Job (link to Jobs), Job Title, Current Location, Notice Period, Current Salary, Expected Salary, Years Experience, LinkedIn URL, Portfolio URL, Cover Letter, CV, Status, Source |

**Publish a job:** add a row in Jobs with a Title and a unique Slug (lowercase-words-with-hyphens, it becomes `/careers/<slug>`), fill in the details, then tick **Published**. Untick it to take the role down. Tick **Featured** to pin it to the top.

**Publish a news item or blog post:** add a row in Posts, set Type to News or Blog, a unique Slug, the Body in markdown (`## Heading`, `**bold**`, `[link](https://…)`), optionally a Cover Image (image file, under 4 MB) with Cover Alt text, then tick **Published**. Meta Description (about 150 characters) is used for search results; Excerpt is the fallback.

Changes appear on the site within about 5 minutes. Markdown is sanitized: scripts, inline event handlers and non-http(s) links are removed.

**Applications** arrive in the Applications table with Status "Applied", Source "Website", the linked Job and the CV attached (PDF, DOC or DOCX, max 4 MB). CVs are only visible inside Airtable; the site never serves them.

### Environment variables

| Name | Value |
|------|-------|
| `AIRTABLE_PAT` | Personal access token, scopes `data.records:read` and `data.records:write`, access limited to this base |
| `AIRTABLE_BASE_ID` | `appkKYYKIVwyHSPQZ` |
| `AIRTABLE_API_URL`, `AIRTABLE_CONTENT_URL` | Test-only overrides to point at a local mock. Never set them in Vercel |

Both are server-only: never prefix them with `NEXT_PUBLIC_`.

## Deploy (Vercel)

Pushes to `main` deploy to production; other branches get preview URLs.

- **Root Directory** (Settings > Build & Deployment) must be blank (repo root). The app used to live in `proficientnow-site/`.
- Set `AIRTABLE_PAT` and `AIRTABLE_BASE_ID` under Settings > Environment Variables (Production and Preview).
- Domains are managed under Settings > Domains.
