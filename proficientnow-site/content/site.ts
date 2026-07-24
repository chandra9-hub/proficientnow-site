// =============================================================================
// SITE — global info used across every page (header, footer, contact, SEO).
// Edit anything here in plain English. No coding needed.
// =============================================================================

export const site = {
  name: "ProficientNow",
  legalName: "ProficientNow Ltd",
  tagline: "Specialist recruitment for the roles that run your business.",
  // Used for SEO / browser tab / social sharing.
  description:
    "ProficientNow is a specialist recruitment partner placing talent across Engineering, Construction, Manufacturing, Healthcare, Finance, Legal and more. Contingency-based — no fee until you hire.",
  url: "https://www.proficientnow.co.uk", // change to your real domain once live

  // ---- Primary contact (UK). Swap in your real address when ready. ----
  contact: {
    email: "hello@proficientnow.co.uk",
    phone: "+44 20 4529 1462",
    phoneHref: "tel:+442045291462",
    // TODO: replace with your confirmed UK registered address.
    address: {
      line1: "71–75 Shelton Street",
      line2: "Covent Garden",
      city: "London",
      postcode: "WC2H 9JQ",
      country: "United Kingdom",
    },
    hours: "Monday–Friday, 9:00am–6:00pm (GMT)",
  },

  // ---- Other offices (shown on Contact / About). Add or remove freely. ----
  offices: [
    { city: "London", country: "United Kingdom", phone: "+44 20 4529 1462" },
    { city: "Dubai", country: "United Arab Emirates", phone: "+971 4 234 5678" },
    { city: "Hyderabad", country: "India", phone: "+91 40 4857 1234" },
  ],

  // ---- Social links (leave "#" to hide a broken link until you have it). ----
  socials: {
    linkedin: "https://www.linkedin.com/company/proficientnow",
    facebook: "#",
    twitter: "#",
    instagram: "#",
  },

  // ---- Headline stats reused in a few places. ----
  stats: [
    { value: 12000, suffix: "+", label: "Companies served" },
    { value: 53000, suffix: "+", label: "Candidates presented" },
    { value: 2, suffix: " days", label: "Average shortlist" },
    { value: 100, suffix: "%", label: "Contingency — no fee until you hire" },
  ],
};
