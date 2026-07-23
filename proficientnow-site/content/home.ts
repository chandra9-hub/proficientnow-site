// =============================================================================
// HOME PAGE content. Edit the words below to change the homepage.
// Words wrapped like *this* are shown in the accent colour (see Hero component).
// =============================================================================

export const home = {
  hero: {
    eyebrow: "Specialist recruitment",
    // Use *asterisks* around the words you want highlighted in accent blue.
    headline: "Built for the roles that *run your business.*",
    subhead:
      "We place specialist talent across engineering, construction, manufacturing, healthcare, finance and beyond — so you work with sector experts, not generalist recruiters guessing their way through your market.",
    note: "No fee until you make a hire · 100% contingency",
    primaryCta: { label: "Find your next hire", href: "/contact" },
    secondaryCta: { label: "How it works", href: "/services" },
  },

  intro: {
    eyebrow: "Why teams choose us",
    heading: "Deep networks. Sharper shortlists. Zero guesswork.",
    body: "Generalist agencies spread themselves thin across every industry. We go deep in the sectors that matter to you, which means faster searches and candidates who genuinely fit — the ones job boards will never surface.",
  },

  differentiators: [
    {
      title: "Pure contingency",
      body: "One fee, paid only when you hire. No retainers, no exclusivity clauses, no surprises.",
    },
    {
      title: "Proprietary network",
      body: "Most of our shortlists come from candidates we already know — talent your competitors won't find on job boards.",
    },
    {
      title: "Global sourcing reach",
      body: "Offices across time zones mean sourcing never stops. Average shortlist delivery: two days.",
    },
    {
      title: "Placement guarantee",
      body: "Every placement is backed by a replacement guarantee, so a hire that doesn't stick doesn't cost you twice.",
    },
  ],

  process: {
    eyebrow: "Our process",
    heading: "From brief to hire — here's exactly how.",
    body: "You stay in control at every stage. We handle sourcing, screening and coordination.",
    steps: [
      { day: "Day 1", title: "Brief & intake", body: "We map your role, culture and timeline in a single working session." },
      { day: "Day 2–3", title: "Market mapping", body: "We search our network, benchmark the market and identify best-fit prospects." },
      { day: "Day 3–5", title: "Screening", body: "Competency interviews and detailed evaluation reports on every candidate." },
      { day: "Day 3–10", title: "Shortlist", body: "Four to six curated, pre-screened candidates — not a flood of CVs." },
      { day: "Day 11+", title: "Offer & close", body: "Negotiation support, plus a 60–90 day placement guarantee." },
    ],
  },

  testimonials: {
    eyebrow: "Testimonials",
    heading: "Don't just take our word for it.",
    items: [
      {
        quote:
          "Two generalist firms. Four months. Zero hires. ProficientNow delivered five qualified candidates in ten days — our new Head of Compliance started that same quarter.",
        author: "VP of Human Resources",
        detail: "Financial services",
      },
      {
        quote:
          "The contingency model got us in the door. The quality of their network is why we've come back four times.",
        author: "Director of Talent Acquisition",
        detail: "Manufacturing",
      },
      {
        quote:
          "They understood our supply chain environment before the first call ended. Eight days later we had exactly the right candidate.",
        author: "Head of Talent Acquisition",
        detail: "Logistics & distribution",
      },
    ],
  },

  finalCta: {
    heading: "Your next exceptional hire is already in our network.",
    body: "Tell us the role. We'll send you a curated shortlist — often within days. 100% contingency. No retainer. No fee until you hire.",
    cta: { label: "Start a search", href: "/contact" },
  },
};
