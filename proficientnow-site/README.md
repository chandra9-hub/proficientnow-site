# ProficientNow Website

A premium recruitment website built with Next.js. This is **Phase 1**: the full public
site (Home, About, Services, Sectors, Contact) with your branding, content and animations.

Phase 2 will add the Careers portal (jobs + CV upload). Phase 3 adds the private Admin panel.

---

## The golden rule: your words live in the `content/` folder

You almost never need to touch the code. All the editable text, numbers, contact
details, services and sectors live in plain files inside the **`content/`** folder:

| File | What it controls |
|------|------------------|
| `content/site.ts` | Company name, phone, email, address, offices, social links, headline stats |
| `content/theme.ts` | Brand colours and fonts (change once, updates the whole site) |
| `content/nav.ts` | The links in the top menu |
| `content/home.ts` | Everything on the homepage |
| `content/about.ts` | The About page |
| `content/services.ts` | The list of services |
| `content/sectors.ts` | The list of sectors/industries |

**To highlight words in accent blue in a headline**, wrap them in asterisks:
`"Built for the roles that *run your business.*"`

**To add a sector or service**, copy one existing `{ ... }` block in the file, paste it
below, and change the words. The page rebuilds itself.

When you want a change, just tell Claude *"change X in `content/home.ts`"* — no need to
send the whole project.

---

## How to put this online (first time — the easy way)

You'll do this in your web browser. No commands, no software to install.

### Step 1 — Put the code on GitHub
1. Unzip the folder you downloaded.
2. Go to **github.com** and sign in. Click the **+** (top right) → **New repository**.
3. Name it `proficientnow-site`, keep it **Private**, click **Create repository**.
4. On the next screen click **“uploading an existing file”**.
5. Open the unzipped folder, select **everything inside it** (not the folder itself),
   and drag it all into the browser window.
   - ⚠️ Do **not** upload the `node_modules` folder if you see one — it's not needed
     (this download already excludes it).
6. Click **Commit changes**. Your code is now saved on GitHub.

### Step 2 — Connect a free database (Supabase) — *needed from Phase 2 on*
Phase 1 doesn't need this yet, so you can skip to Step 3 for now. We'll set up Supabase
together when we build the Careers portal and Admin panel.

### Step 3 — Deploy on Vercel (makes it live)
1. Go to **vercel.com** and sign in **with GitHub**.
2. Click **Add New → Project**.
3. Find `proficientnow-site` in the list and click **Import**.
4. Leave all settings as they are and click **Deploy**.
5. Wait ~1 minute. Vercel gives you a live link like
   `proficientnow-site.vercel.app`. That's your site, live on the internet. 🎉

### Step 4 — Add your own domain (optional)
In your Vercel project → **Settings → Domains** → type your domain (e.g.
`proficientnow.co.uk`) and follow the on-screen steps. Vercel tells you exactly what to
paste at your domain provider.

---

## Making changes after it's live

Because the code is on GitHub, **every edit is saved forever** and nothing can be lost.
The easiest way to make a small text change:

1. On GitHub, open the file (e.g. `content/home.ts`).
2. Click the ✏️ pencil icon to edit it in the browser.
3. Change the words, click **Commit changes**.
4. Vercel automatically rebuilds and your site updates in about a minute. No extra steps.

---

## Want to preview changes on your own computer? (optional, for later)
Install [Node.js](https://nodejs.org) (the "LTS" version), then in the project folder:

```bash
npm install      # first time only
npm run dev       # starts a preview at http://localhost:3000
```

---

## Project structure (for reference)

```
proficientnow-site/
├── content/           ← YOUR EDITABLE TEXT (start here)
├── public/            ← logo & images
├── src/
│   ├── app/           ← the pages (one folder per page)
│   └── components/     ← reusable building blocks (navbar, footer, cards…)
├── README.md          ← this guide
└── package.json       ← project settings (leave alone)
```

Each component file has a plain-English comment at the top explaining what it does.

---

## v2 update — dark theme, animations, theme toggle

- The site now has a **living animated background**, a **loader**, **light/dark toggle** (remembers the visitor's choice), a **scrolling Industries band**, tilt cards and scroll animations.
- **Theme colours** live at the top of `src/app/globals.css` (the `:root` block is dark mode; `html.light` is light mode). Change them there.
- **Industries band** text is in `content/industries.ts`.
- Everything else you edit is still in the `content/` folder, same as before.
