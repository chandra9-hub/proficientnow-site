// =============================================================================
// HOME PAGE content. Words wrapped like *this* show in the accent colour.
// =============================================================================

export const home = {
  hero: {
    eyebrow: "Specialist recruitment",
    headline: "Built for the roles that *run your business.*",
    subhead:
      "We place specialist talent across engineering, construction, manufacturing, healthcare, finance and beyond — so you get sector experts, not generalists who learned your industry on the drive over.",
    note: "No fee until you make a hire · 100% contingency",
    primaryCta: { label: "Find your next hire", href: "/contact" },
    secondaryCta: { label: "How it works", href: "/services" },
  },

  // Paragraph-led "why us" section (shown beside the UK data chart)
  intro: {
    eyebrow: "Why teams choose us",
    heading: "Generalists know a little about everything. We know everything about *your bit.*",
    paragraphs: [
      "Spreading thin across every industry is how you end up with a stack of \"close enough\" CVs and a search that drags on for months. We work the opposite way — every consultant lives inside their sector, so the shortlist is smaller, sharper and genuinely relevant.",
      "It's pure contingency, so you only pay when someone actually starts. Our sourcing runs across time zones, which means a search is always moving — and the best people aren't refreshing job boards at 2am; they're in a network we've spent years building. And if a hire doesn't stick, we go again, backed by our 60–90 day placement guarantee.",
    ],
    points: [
      { title: "Pure contingency", note: "Pay only when you hire" },
      { title: "Proprietary network", note: "Beyond the job boards" },
      { title: "Global sourcing reach", note: "Always in motion" },
      { title: "Placement guarantee", note: "60–90 day cover" },
    ],
  },

  process: {
    eyebrow: "Our process",
    heading: "From brief to hire — *usually within a week.*",
    body: "You stay in control at every stage. We handle the sourcing, the screening and the calendar wrangling — and keep you posted the whole way through.",
    steps: [
      { day: "Day 1", title: "Brief & intake", body: "We map your role, culture and timeline in a single working session." },
      { day: "Days 1–2", title: "Market mapping", body: "We search our network, benchmark the market and identify best-fit prospects." },
      { day: "Days 2–4", title: "Screening", body: "Competency interviews and detailed evaluation reports on every candidate." },
      { day: "Days 3–5", title: "Shortlist", body: "Four to six curated, pre-screened candidates — not a flood of maybes." },
      { day: "Within the week", title: "Offer & close", body: "Negotiation support, plus a 60–90 day placement guarantee." },
    ],
  },

  finalCta: {
    heading: "Your next exceptional hire is already in our network.",
    body: "Tell us the role. We'll send you a curated shortlist — often within days. 100% contingency. No retainer. No fee until you hire.",
    cta: { label: "Start a search", href: "/contact" },
  },
};
