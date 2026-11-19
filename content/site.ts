// =============================================================================
// SITE — global info used across every page (header, footer, contact, SEO).
// Edit anything here in plain English. No coding needed.
// =============================================================================

import { sectors } from "./sectors";

export const site = {
  name: "ProficientNow",
  legalName: "PROFICIENTNOW LTD",
  companyNumber: "16653249", // Companies House
  tagline: "Specialist recruitment for the roles that run your business.",
  description:
    "ProficientNow is a specialist recruitment partner placing talent across Engineering, Construction, Manufacturing, Healthcare, Finance, Legal and more. 100% contingency — no fee until you hire.",
  url: "https://www.proficientnow.co.uk",

  // ---- Primary contact (UK office) ----
  contact: {
    email: "info@proficientnow.co.uk",
    phone: "+44 20 4529 1462",
    phoneHref: "tel:+442045291462",
    address: {
      line1: "71-75 Shelton Street",
      line2: "",
      city: "London",
      postcode: "WC2H 9JQ",
      country: "United Kingdom",
    },
    hours: "Monday–Friday, 9:00am–6:00pm (GMT)",
  },

  registeredOffice: "71-75 Shelton Street, Covent Garden, London WC2H 9JQ",

  // ---- Headline points (factual only; no unverifiable numbers). ----
  stats: [
    { value: 100, suffix: "%", label: "Contingency — no fee until you hire" },
    { value: sectors.length, suffix: "", label: "Specialist sectors covered" },
    { value: 1, suffix: " day", label: "Response time (guaranteed)" },
  ],
};
