// =============================================================================
// SECTORS — list + full detail pages. Each sector has a detail page at
// /sectors/<slug>. Edit any wording below in plain English.
// =============================================================================

export const sectorsIntro = {
  eyebrow: "Our sectors",
  headline: "Specialists across the industries that *keep the world running.*",
  subhead:
    "Every recruiter on your search has placed in your sector before — not adjacent, not similar. Click any sector to see how it's changing and how to grow in it.",
};

export type SectorSection = { title: string; body: string };
export type Sector = {
  name: string; icon: string; slug: string; blurb: string;
  intro: string; sections: SectorSection[]; certifications: string[];
};

export const sectors: Sector[] = [
  {
    name: "Engineering", icon: "engineering", slug: "engineering",
    blurb: "Mechanical, civil, chemical and structural engineers, from graduate to director level.",
    intro: "Engineering underpins almost every other UK industry, and demand for genuinely skilled, chartered engineers has stayed resilient even as the wider jobs market cooled.",
    sections: [
      { title: "Growth over the last four years", body: "Engineering vacancies held up better than the overall market as UK vacancies fell from their 2022 peak — sustained by infrastructure spending, the energy transition and the reshoring of manufacturing." },
      { title: "Today's challenges", body: "The stubborn challenges are an ageing workforce and a shortage of chartered engineers, with the sharpest competition for people who pair deep technical knowledge with digital and design skills." },
      { title: "The year ahead", body: "Expect continued demand across civil, mechanical and electrical disciplines through the coming year, with net-zero projects and fresh manufacturing investment leading the hiring." },
      { title: "Opportunities on the rise", body: "The fastest-growing openings blend traditional engineering with automation, sustainability and digital tools — and project or design leadership remains in genuinely short supply." },
      { title: "How to grow in this field", body: "To progress, work toward chartership, build real project-delivery experience, and add design-software, BIM and sustainability competencies to your core discipline." },
    ],
    certifications: ["Chartered/Incorporated status (CEng / IEng) via IMechE, ICE or IET", "An Engineering Council–accredited degree", "Project qualifications (APM PMQ / PRINCE2)", "CAD / BIM proficiency"],
  },
  {
    name: "Construction", icon: "construction", slug: "construction",
    blurb: "Project managers, site supervisors, quantity surveyors and estimators.",
    intro: "Construction is one of the UK's largest employers and a persistent source of skills shortages — which keeps experienced managers and surveyors in high demand.",
    sections: [
      { title: "Growth over the last four years", body: "A steady pipeline from housing, infrastructure and retrofit kept demand for project managers and quantity surveyors strong, even while overall vacancies fell." },
      { title: "Today's challenges", body: "An ageing workforce, apprenticeship gaps and tight margins make it genuinely hard to find experienced site managers and surveyors." },
      { title: "The year ahead", body: "Government housing and infrastructure commitments, plus decarbonisation and retrofit programmes, should sustain hiring through the year ahead." },
      { title: "Opportunities on the rise", body: "Sustainable construction, retrofit, modern methods of construction (MMC) and digital/BIM roles are the clearest growth areas." },
      { title: "How to grow in this field", body: "Build on-site experience, work toward chartered status, and add MMC, BIM and sustainability knowledge to stand out." },
    ],
    certifications: ["CSCS card", "SMSTS / SSSTS site-management certificates", "MRICS (RICS) or MCIOB (CIOB)", "NEC / JCT contract knowledge", "BIM competency"],
  },
  {
    name: "Manufacturing", icon: "manufacturing", slug: "manufacturing",
    blurb: "Plant managers, quality engineers and production leaders who keep the line running.",
    intro: "UK manufacturing has been buoyed by reshoring and advanced-manufacturing investment — including recent waves of new aerospace and precision-engineering roles.",
    sections: [
      { title: "Growth over the last four years", body: "Reshoring and investment in advanced manufacturing supported demand, with hundreds of new aerospace and manufacturing roles announced in recent months." },
      { title: "Today's challenges", body: "The main constraint is a skills gap in automation, robotics and lean methods, compounded by an ageing shop-floor workforce." },
      { title: "The year ahead", body: "Industry 4.0, automation and continued reshoring are set to drive hiring for engineers, quality specialists and production leaders." },
      { title: "Opportunities on the rise", body: "Automation and robotics, quality (Six Sigma) and digital-manufacturing roles are rising fastest." },
      { title: "How to grow in this field", body: "Add Lean/Six Sigma, automation exposure and quality-systems knowledge to your production experience." },
    ],
    certifications: ["Lean Six Sigma (Green / Black Belt)", "IOSH / NEBOSH health & safety", "ISO 9001 quality systems", "Relevant engineering qualification"],
  },
  {
    name: "Medical Devices", icon: "medical", slug: "medical-devices",
    blurb: "Regulatory, quality, R&D and commercial talent for the medtech sector.",
    intro: "Medtech continues to grow on the back of an ageing population and constant innovation — and regulatory change has pushed regulatory and quality talent to the top of the shortage list.",
    sections: [
      { title: "Growth over the last four years", body: "Steady growth, driven by demographics and innovation, was accelerated by regulatory change (UKCA and EU MDR) that lifted demand for regulatory and quality specialists." },
      { title: "Today's challenges", body: "The big challenges are navigating UKCA/MDR transition and a real scarcity of experienced regulatory and quality-assurance professionals." },
      { title: "The year ahead", body: "Expect sustained demand for regulatory affairs, quality and R&D talent as products adapt to evolving UK and EU rules." },
      { title: "Opportunities on the rise", body: "Regulatory affairs, quality assurance and digital-health / software-as-a-medical-device roles are the clear growth areas." },
      { title: "How to grow in this field", body: "Build regulatory expertise (UKCA, EU MDR, FDA) and quality-systems knowledge (ISO 13485) alongside your technical or life-science background." },
    ],
    certifications: ["ISO 13485 quality systems", "Regulatory affairs certification (RAPS / TOPRA)", "Quality auditing (e.g. lead auditor)", "A relevant life-science or engineering degree"],
  },
  {
    name: "Healthcare", icon: "health", slug: "healthcare",
    blurb: "Clinical and non-clinical professionals across care and health services.",
    intro: "Healthcare demand is structural and persistent across both the NHS and the private sector, with workforce shortages a defining feature of the market.",
    sections: [
      { title: "Growth over the last four years", body: "Demand stayed consistently high across clinical and non-clinical roles, driven by demographics and long-standing workforce shortages rather than the economic cycle." },
      { title: "Today's challenges", body: "Widespread staff shortages, retention difficulties and funding pressure remain the dominant challenges." },
      { title: "The year ahead", body: "High demand for both clinical and non-clinical staff is expected to continue through the year ahead." },
      { title: "Opportunities on the rise", body: "Digital health, primary and community care, and specialist clinical roles are growing opportunities." },
      { title: "How to grow in this field", body: "Keep your professional registration current, specialise where you can, and add leadership and digital-health skills." },
    ],
    certifications: ["Professional registration (NMC / GMC / HCPC as relevant)", "Safeguarding training", "Specialty / advanced-practice accreditations", "Leadership & management development"],
  },
  {
    name: "Automotive", icon: "automotive", slug: "automotive",
    blurb: "Design, production and aftermarket specialists across the automotive supply chain.",
    intro: "The shift to electric vehicles has reshaped automotive hiring — demand has moved decisively toward electrification, batteries and software.",
    sections: [
      { title: "Growth over the last four years", body: "The transition to EVs transformed demand, moving hiring away from traditional powertrain and toward electrification and software skills." },
      { title: "Today's challenges", body: "An EV-transition skills gap and ongoing supply-chain volatility are the key challenges." },
      { title: "The year ahead", body: "EV, battery and software roles are set to grow while traditional powertrain roles decline." },
      { title: "Opportunities on the rise", body: "EV and battery engineering, embedded software and modern manufacturing are the rising opportunities." },
      { title: "How to grow in this field", body: "Build electrification, software and systems-engineering skills to stay ahead of the transition." },
    ],
    certifications: ["Relevant engineering qualification", "EV / hybrid training (IMI)", "Functional safety (ISO 26262)", "Lean Six Sigma"],
  },
  {
    name: "Renewable Energy", icon: "energy", slug: "renewable-energy",
    blurb: "Solar, wind and storage professionals powering the energy transition.",
    intro: "Renewables is one of the fastest-growing corners of the UK market as the country pushes toward net zero, with strong investment in offshore wind, solar and storage.",
    sections: [
      { title: "Growth over the last four years", body: "Rapid growth, powered by net-zero targets and heavy investment in offshore wind, solar and grid-scale storage, outpaced most other sectors." },
      { title: "Today's challenges", body: "An acute skills shortage and fierce competition for experienced project and grid talent are the main constraints." },
      { title: "The year ahead", body: "Offshore wind, solar, storage and grid-connection roles are set to keep expanding." },
      { title: "Opportunities on the rise", body: "Project development, grid and connections, storage and operations-and-maintenance roles are the rising opportunities." },
      { title: "How to grow in this field", body: "Build renewables project or grid experience and the relevant safety and technical certifications." },
    ],
    certifications: ["Relevant engineering degree", "GWO (Global Wind Organisation) training", "NEBOSH health & safety", "Project management (APM / PRINCE2)"],
  },
  {
    name: "Finance", icon: "finance", slug: "finance",
    blurb: "Controllers, finance directors, tax specialists and CFOs.",
    intro: "Demand for qualified accountants and finance leaders stays steady, but automation has shifted the emphasis toward analysis, business-partnering and systems.",
    sections: [
      { title: "Growth over the last four years", body: "Demand for qualified accountants held steady, with automation shifting the role mix toward analysis and business partnering rather than transactional work." },
      { title: "Today's challenges", body: "A shortage of qualified (ACA/ACCA/CIMA) talent and rising demand for data and systems skills are the main challenges." },
      { title: "The year ahead", body: "Continued need for controllers, FP&A and finance-transformation roles is expected through the year." },
      { title: "Opportunities on the rise", body: "FP&A, finance transformation, ESG reporting and data-literate finance roles are growing." },
      { title: "How to grow in this field", body: "Qualify (ACA/ACCA/CIMA), then build systems fluency and commercial business-partnering skills." },
    ],
    certifications: ["ACA (ICAEW)", "ACCA", "CIMA", "CFA (for investment / analysis roles)"],
  },
  {
    name: "Legal", icon: "legal", slug: "legal",
    blurb: "In-house counsel, compliance and regulatory affairs professionals.",
    intro: "Companies are increasingly bringing legal, compliance and regulatory work in-house, steadily growing demand for qualified in-house professionals.",
    sections: [
      { title: "Growth over the last four years", body: "In-house legal teams grew steadily as companies moved legal, compliance and regulatory work in-house to manage cost and risk." },
      { title: "Today's challenges", body: "Competition for qualified solicitors and rising compliance and regulatory demand are the key pressures." },
      { title: "The year ahead", body: "In-house counsel, compliance and regulatory-affairs roles are expected to keep growing." },
      { title: "Opportunities on the rise", body: "Compliance, data protection, ESG/regulatory and commercial-contracts roles are the rising opportunities." },
      { title: "How to grow in this field", body: "Qualify as a solicitor (SQE route) and specialise in a growth area such as data protection or regulatory." },
    ],
    certifications: ["Qualified solicitor (SRA / SQE)", "Data-protection certification (e.g. CIPP/E)", "Compliance certification (ICA)", "Commercial-contracts experience"],
  },
  {
    name: "Sales & Commercial", icon: "sales", slug: "sales-commercial",
    blurb: "Business development, account management and commercial leadership.",
    intro: "Revenue-generating talent is always in demand, and the market increasingly rewards consultative, data-driven sellers over pure relationship-only profiles.",
    sections: [
      { title: "Growth over the last four years", body: "Demand for revenue-generating talent stayed strong, with a clear shift toward consultative, data-driven selling." },
      { title: "Today's challenges", body: "High turnover and the difficulty of finding people who combine relationship skills with data fluency are the key challenges." },
      { title: "The year ahead", body: "Continued demand for business development and account management is expected, especially in tech-enabled sectors." },
      { title: "Opportunities on the rise", body: "SaaS and technology sales, account management and commercial leadership are the rising opportunities." },
      { title: "How to grow in this field", body: "Build a measurable track record, CRM and data fluency, and genuine sector expertise." },
    ],
    certifications: ["A strong, measurable sales track record", "CRM proficiency (e.g. Salesforce / HubSpot)", "Recognised sales methodology training", "Sector / domain knowledge"],
  },
  {
    name: "Operations", icon: "operations", slug: "operations",
    blurb: "Operations managers and directors who turn strategy into delivery.",
    intro: "Operations talent is in steady demand as businesses chase efficiency, with automation steadily reshaping what the roles involve.",
    sections: [
      { title: "Growth over the last four years", body: "Steady demand continued as organisations prioritised efficiency, with automation reshaping many operational roles." },
      { title: "Today's challenges", body: "The main challenge is finding leaders who blend process discipline, people leadership and data skills." },
      { title: "The year ahead", body: "Continued need for operations managers and continuous-improvement leaders is expected." },
      { title: "Opportunities on the rise", body: "Continuous improvement, automation and operational-transformation roles are growing." },
      { title: "How to grow in this field", body: "Build Lean/Six Sigma, data and leadership capabilities to progress into senior operations roles." },
    ],
    certifications: ["Lean Six Sigma", "Project management (APM / PRINCE2)", "Relevant operations / business degree", "Data & analytics skills"],
  },
  {
    name: "Supply Chain", icon: "supplychain", slug: "supply-chain",
    blurb: "Procurement, logistics and planning specialists at every level.",
    intro: "Supply-chain roles have stayed elevated since pandemic-era disruption, with resilience and digitisation now firmly on the agenda.",
    sections: [
      { title: "Growth over the last four years", body: "Demand stayed high after pandemic-era disruption, as businesses invested in resilience and digitised their supply chains." },
      { title: "Today's challenges", body: "A skills gap in planning and analytics, plus continued volatility, are the main challenges." },
      { title: "The year ahead", body: "Procurement, planning and logistics roles are expected to stay in strong demand." },
      { title: "Opportunities on the rise", body: "Digital supply chain, strategic procurement and sustainable / ESG sourcing are the rising opportunities." },
      { title: "How to grow in this field", body: "Build planning and analytics skills alongside recognised professional qualifications." },
    ],
    certifications: ["CIPS (procurement)", "CILT (logistics & transport)", "APICS / ASCM (planning)", "Data & analytics skills"],
  },
  {
    name: "Electrical", icon: "electrical", slug: "electrical",
    blurb: "Electrical engineers and technicians across industrial and building services.",
    intro: "Electrical talent is in strong demand thanks to electrification, renewables and a busy construction pipeline.",
    sections: [
      { title: "Growth over the last four years", body: "Demand grew steadily, tied to electrification, renewables and construction activity." },
      { title: "Today's challenges", body: "A shortage of qualified electrical engineers and technicians is the defining challenge." },
      { title: "The year ahead", body: "Electrification and infrastructure investment should sustain hiring through the year." },
      { title: "Opportunities on the rise", body: "Power systems, renewables, building services and automation are the rising opportunities." },
      { title: "How to grow in this field", body: "Gain HV/LV experience and the relevant qualifications, then work toward chartership." },
    ],
    certifications: ["18th Edition wiring regs (BS 7671)", "ECS / JIB card", "Relevant engineering qualification", "CEng / IEng (IET)"],
  },
  {
    name: "Civil", icon: "civil", slug: "civil",
    blurb: "Civil and infrastructure engineers for major projects.",
    intro: "Civil engineering demand is underpinned by long-term investment in transport, water and infrastructure.",
    sections: [
      { title: "Growth over the last four years", body: "Sustained investment in infrastructure and transport kept civil-engineering demand robust." },
      { title: "Today's challenges", body: "A skills shortage and long project cycles are the main challenges." },
      { title: "The year ahead", body: "Major infrastructure programmes should keep civil engineers in demand through the year." },
      { title: "Opportunities on the rise", body: "Transport, water, flood and coastal, and digital design are the rising opportunities." },
      { title: "How to grow in this field", body: "Build design and project experience and work toward chartership with the ICE." },
    ],
    certifications: ["CEng / IEng (ICE)", "CSCS card", "NEC contract knowledge", "An accredited civil-engineering degree"],
  },
  {
    name: "Facilities Management", icon: "facilities", slug: "facilities-management",
    blurb: "Hard and soft FM professionals across commercial estates.",
    intro: "FM demand is steady as estates prioritise efficiency, sustainability and compliance.",
    sections: [
      { title: "Growth over the last four years", body: "Demand held steady as organisations focused on efficient, compliant and more sustainable estates." },
      { title: "Today's challenges", body: "A skills gap in technical (hard) FM and growing sustainability-compliance requirements are the key challenges." },
      { title: "The year ahead", body: "Energy efficiency and compliance are expected to drive hiring through the year." },
      { title: "Opportunities on the rise", body: "Energy management, sustainability and technical FM are the rising opportunities." },
      { title: "How to grow in this field", body: "Pursue IWFM membership and build technical and health-and-safety qualifications." },
    ],
    certifications: ["IWFM qualifications", "IOSH / NEBOSH", "Relevant technical (M&E) certifications", "Energy-management knowledge"],
  },
  {
    name: "Commercial Services", icon: "commercial", slug: "commercial-services",
    blurb: "Support and professional-services talent that keeps businesses moving.",
    intro: "Commercial and professional-services roles see broad, steady demand across virtually every industry.",
    sections: [
      { title: "Growth over the last four years", body: "Broad demand continued across professional and support functions, tracking overall business activity." },
      { title: "Today's challenges", body: "The main challenge is matching adaptable talent to fast-changing business needs." },
      { title: "The year ahead", body: "Continued demand across professional and support functions is expected." },
      { title: "Opportunities on the rise", body: "Data, digital and specialist professional-services roles are the rising opportunities." },
      { title: "How to grow in this field", body: "Build transferable and digital skills alongside genuine sector knowledge." },
    ],
    certifications: ["Role-relevant professional qualifications", "Digital & data skills", "Project or process certifications", "Sector knowledge"],
  },
];
