// =============================================================================
// SECTORS PAGE content.
// To ADD a sector: copy one { ... } block and change the words.
// To REMOVE a sector: delete its block. Page rebuilds automatically.
// `icon` is a simple keyword the SectorCard uses to pick an icon.
// Available icons: engineering, construction, manufacturing, medical, health,
// automotive, energy, finance, legal, sales, operations, supplychain,
// electrical, civil, facilities, commercial. (Anything else shows a default.)
// =============================================================================

export const sectorsIntro = {
  eyebrow: "Our sectors",
  headline: "Specialists across the industries that *keep the world running.*",
  subhead:
    "Every recruiter on your search has placed in your sector before — not adjacent, not similar. Here's where we go deep.",
};

export const sectors = [
  { name: "Engineering", icon: "engineering", blurb: "Mechanical, civil, chemical and structural engineers, from graduate to director level." },
  { name: "Construction", icon: "construction", blurb: "Project managers, site supervisors, quantity surveyors and estimators." },
  { name: "Manufacturing", icon: "manufacturing", blurb: "Plant managers, quality engineers and production leaders who keep the line running." },
  { name: "Medical Devices", icon: "medical", blurb: "Regulatory, quality, R&D and commercial talent for the medtech sector." },
  { name: "Healthcare", icon: "health", blurb: "Clinical and non-clinical professionals across care and health services." },
  { name: "Automotive", icon: "automotive", blurb: "Design, production and aftermarket specialists across the automotive supply chain." },
  { name: "Renewable Energy", icon: "energy", blurb: "Solar, wind and storage professionals powering the energy transition." },
  { name: "Finance", icon: "finance", blurb: "Controllers, finance directors, tax specialists and CFOs." },
  { name: "Legal", icon: "legal", blurb: "In-house counsel, compliance and regulatory affairs professionals." },
  { name: "Sales & Commercial", icon: "sales", blurb: "Business development, account management and commercial leadership." },
  { name: "Operations", icon: "operations", blurb: "Operations managers and directors who turn strategy into delivery." },
  { name: "Supply Chain", icon: "supplychain", blurb: "Procurement, logistics and planning specialists at every level." },
  { name: "Electrical", icon: "electrical", blurb: "Electrical engineers and technicians across industrial and building services." },
  { name: "Civil", icon: "civil", blurb: "Civil and infrastructure engineers for major projects." },
  { name: "Facilities Management", icon: "facilities", blurb: "Hard and soft FM professionals across commercial estates." },
  { name: "Commercial Services", icon: "commercial", blurb: "Support and professional-services talent that keeps businesses moving." },
];
