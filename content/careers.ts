// =============================================================================
// CAREERS PAGE content + upload settings. Edit the wording freely.
// =============================================================================

export const careers = {
  header: {
    eyebrow: "Careers",
    headline: "Find your next role *with people who get your field.*",
    subhead: "Browse our live vacancies, filter by what matters to you, and apply in a couple of minutes — CV in any format.",
  },

  // Shown when there are no published jobs yet.
  emptyState: {
    heading: "No open roles right now — but we're always talking to good people.",
    body: "We place specialist talent constantly, and the right role often appears within days. Send us your CV and we'll be in touch the moment something fits.",
    ctaLabel: "Send us your CV",
  },

  // CV upload rules
  upload: {
    maxSizeMB: 10,
    // Accepted file types for the file picker. "Any format" per your request —
    // this covers the common ones; the browser still allows others.
    accept: ".pdf,.doc,.docx,.rtf,.odt,.txt,.pages",
  },

  // Text shown after a successful application
  success: {
    heading: "Application received — thank you.",
    body: "We've got your details and CV. If there's a fit, one of our consultants will be in touch. Good luck!",
  },
};
