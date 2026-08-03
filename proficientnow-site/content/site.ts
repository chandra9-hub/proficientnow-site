// =============================================================================
// SITE — global info used across every page (header, footer, contact, SEO).
// Edit anything here in plain English. No coding needed.
// =============================================================================

export const site = {
  name: "ProficientNow",
  legalName: "ProficientNow Ltd",
  tagline: "Specialist recruitment for the roles that run your business.",
  description:
    "ProficientNow is a specialist recruitment partner placing talent across Engineering, Construction, Manufacturing, Healthcare, Finance, Legal and more. 100% contingency — no fee until you hire.",
  url: "https://www.proficientnow.co.uk",

  // ---- Primary contact (UK office) ----
  contact: {
    email: "info@proficientnow.com",
    phone: "+44 20 4529 1462",
    phoneHref: "tel:+442045291462",
    address: {
      line1: "71–75 Shelton Street",
      line2: "",
      city: "London",
      postcode: "WC2H 9JQ",
      country: "United Kingdom",
    },
    hours: "Monday–Friday, 9:00am–6:00pm (GMT)",
  },

  // ---- Also operating in (cities only; UK is the head office) ----
  offices: [
    { city: "London", country: "United Kingdom" },
    { city: "Dubai", country: "United Arab Emirates" },
    { city: "Chicago", country: "United States" },
  ],

  socials: {
    linkedin: "https://www.linkedin.com/company/proficientnow-inc/",
    facebook: "#",
    twitter: "#",
    instagram: "#",
  },

  // ---- Headline stats (all verified/real for the business). ----
  stats: [
    { value: 1000, suffix: "+", label: "Clients served" },
    { value: 100, suffix: "%", label: "Contingency — no fee until you hire" },
    { value: 4, suffix: "×", label: "Year-on-year growth" },
    { value: 1, suffix: " day", label: "Response time (guaranteed)" },
  ],
};
