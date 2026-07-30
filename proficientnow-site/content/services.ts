// =============================================================================
// SERVICES PAGE content.
// To ADD a service: copy one { ... } block, paste it, and change the words.
// To REMOVE a service: delete its { ... } block.
// The page rebuilds itself automatically from this list.
// =============================================================================

export const servicesIntro = {
  eyebrow: "What we do",
  headline: "Recruitment services, *tailored to how you hire.*",
  subhead:
    "Whether you're filling one critical role or building an entire team, we shape the search around your goals — and you never pay a penny until someone starts.",
};

export const services = [
  {
    slug: "permanent-recruitment",
    title: "Permanent recruitment",
    summary:
      "Direct-hire searches for the roles at the heart of your business, delivered on a pure contingency basis.",
    benefits: [
      "No fee until your chosen candidate starts",
      "Curated shortlists, not CV floods",
      "60–90 day placement guarantee",
    ],
    process:
      "We take a detailed brief, map the market, screen thoroughly, and present a tight shortlist of candidates who fit on skills, culture and salary.",
  },
  {
    slug: "contract-staffing",
    title: "Contract & interim staffing",
    summary:
      "Flexible talent for project work, seasonal peaks and interim leadership gaps — mobilised fast.",
    benefits: [
      "Quick turnaround for urgent needs",
      "Vetted, ready-to-start professionals",
      "Scale up or down without long-term commitment",
    ],
    process:
      "Tell us the skills and timeframe. We draw on a pre-qualified pool to put the right people in place, often within days.",
  },
  {
    slug: "executive-search",
    title: "Executive search",
    summary:
      "Discreet, senior-level searches for leadership and board-level mandates.",
    benefits: [
      "Full confidentiality throughout",
      "Access to passive senior talent",
      "Rigorous assessment and market intelligence",
    ],
    process:
      "A confidential, research-led search that reaches leaders who aren't looking — and wouldn't respond to a generic approach.",
  },
  {
    slug: "talent-acquisition",
    title: "Talent acquisition partnership",
    summary:
      "An embedded extension of your hiring team for sustained or high-volume recruitment.",
    benefits: [
      "Consistent process across every role",
      "Employer-brand-aligned candidate experience",
      "Predictable cost and reporting",
    ],
    process:
      "We plug into your workflow, run parallel searches, and keep your pipeline warm so roles close on time.",
  },
  {
    slug: "rpo",
    title: "Recruitment Process Outsourcing (RPO)",
    summary:
      "We take ownership of all or part of your recruitment function, end to end.",
    benefits: [
      "Reduced cost-per-hire at scale",
      "Dedicated sourcing and coordination",
      "Full transparency and analytics",
    ],
    process:
      "From workforce planning to onboarding, we run the machine so your team can focus on the business.",
  },
  {
    slug: "international-recruitment",
    title: "International recruitment",
    summary:
      "Cross-border sourcing for hard-to-fill roles, backed by offices across multiple regions.",
    benefits: [
      "Round-the-clock sourcing across time zones",
      "Local market intelligence",
      "Compliance-aware relocation support",
    ],
    process:
      "We tap networks in multiple regions to find talent locally or globally, wherever the best fit sits.",
  },
];
