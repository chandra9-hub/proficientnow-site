// SECTORS — list + full detail pages at /sectors/<slug>. Edit wording freely.
// Optional: add  image: "/photos/<file>.jpg"  (a file in public/) to override the default sector photo.

export const sectorsIntro = {
  eyebrow: "Our sectors",
  headline: "Specialists across the industries that *keep the world running.*",
  subhead:
    "Every recruiter on your search has placed in your sector before — not adjacent, not similar. Click any sector to see how it's changing and how to grow in it.",
};

export type SectorSection = { title: string; body: string };
export type Sector = { name: string; icon: string; slug: string; blurb: string; intro: string; seoName?: string; image?: string; sections: SectorSection[]; certifications: string[] };

export const sectors: Sector[] = [
  {
    name: "Engineering", icon: "engineering", slug: "engineering",
    blurb: "Mechanical, civil, chemical and structural engineers, from graduate to director level.",
    intro: "Engineering underpins almost every other UK industry — from the power grid to the products on the shelf. Demand for genuinely skilled, chartered engineers has stayed resilient even as the wider jobs market cooled, because the work simply cannot be paused. That resilience, combined with a shrinking pool of experienced talent, makes engineering one of the most competitive sectors to hire in.",
    sections: [
      { title: "Growth over the last four years", body: "Engineering vacancies held up markedly better than the overall market as UK vacancies fell from their 2022 peak. Demand has been sustained by infrastructure spending, the net-zero energy transition and the reshoring of manufacturing back to the UK. Even in a low-hiring economy, roles that combine deep technical knowledge with digital skills have stayed in short supply." },
      { title: "Today's challenges", body: "The defining challenge is an ageing workforce: a large share of chartered engineers are approaching retirement, and the apprenticeship pipeline hasn't kept pace. On top of that, employers increasingly want engineers who can work with modelling, simulation and AI-assisted design tools — a combination that is genuinely hard to find. The result is fierce competition for mid- and senior-level talent." },
      { title: "The year ahead", body: "Expect continued demand across civil, mechanical and electrical disciplines through the coming year. Net-zero projects, defence and manufacturing investment, and infrastructure renewal are all set to drive hiring. Pay pressure remains elevated for engineering skills even as posted wages cool across the wider economy." },
      { title: "Opportunities on the rise", body: "The fastest-growing openings blend traditional engineering with automation, sustainability and digital design. Project and design leadership is in especially short supply, as is anyone who can bridge engineering and data. Sustainability and carbon-reduction expertise is quickly moving from 'nice to have' to essential." },
      { title: "How to grow in this field", body: "To progress, work steadily toward chartership and build a track record of delivered projects rather than just technical breadth. Add design-software, BIM and sustainability competencies to your core discipline, and develop the communication skills that separate senior engineers from technical specialists. Keeping your professional-body membership current signals commitment to employers." },
    ],
    certifications: ["Chartered/Incorporated status (CEng / IEng) via IMechE, ICE or IET", "An Engineering Council–accredited degree", "Project qualifications (APM PMQ / PRINCE2)", "CAD / BIM proficiency"],
    },
  {
    name: "Construction", icon: "construction", slug: "construction",
    blurb: "Project managers, site supervisors, quantity surveyors and estimators.",
    intro: "Construction is one of the UK's largest employers and a persistent source of skills shortages, which keeps experienced managers and surveyors in high demand. The sector is central to government priorities on housing, infrastructure and decarbonisation, so activity tends to hold up even when the wider economy slows. For candidates with the right experience, opportunities remain strong.",
    sections: [
      { title: "Growth over the last four years", body: "A steady pipeline from housing, infrastructure and retrofit kept demand for project managers and quantity surveyors strong, even while overall UK vacancies fell. Major public programmes provided a floor under hiring that many other sectors lacked. Skilled trades and experienced commercial staff have been the hardest roles to fill throughout." },
      { title: "Today's challenges", body: "An ageing workforce, apprenticeship gaps and tight project margins make it genuinely hard to find experienced site managers, estimators and surveyors. Material and labour cost pressures have squeezed budgets, raising the premium on people who can control cost and risk. Health, safety and compliance requirements continue to add complexity." },
      { title: "The year ahead", body: "Government housing and infrastructure commitments, plus decarbonisation and retrofit programmes, should sustain hiring through the year ahead. Retrofitting the UK's existing building stock to meet energy targets is emerging as a long-term source of work. Digital delivery and off-site methods will keep reshaping the roles employers advertise for." },
      { title: "Opportunities on the rise", body: "Sustainable construction, retrofit, modern methods of construction (MMC) and digital/BIM roles are the clearest growth areas. Demand is rising for professionals who understand both traditional build and low-carbon methods. Commercial and cost-management skills remain perennially valuable." },
      { title: "How to grow in this field", body: "Build broad on-site experience early, then work steadily toward chartered status with the RICS or CIOB. Add MMC, BIM and sustainability knowledge to stand out, and keep your safety qualifications current. Strong commercial awareness — understanding contracts, cost and risk — accelerates progression into management." },
    ],
    certifications: ["CSCS card", "SMSTS / SSSTS site-management certificates", "MRICS (RICS) or MCIOB (CIOB)", "NEC / JCT contract knowledge", "BIM competency"],
    },
  {
    name: "Manufacturing", icon: "manufacturing", slug: "manufacturing",
    blurb: "Plant managers, quality engineers and production leaders who keep the line running.",
    intro: "UK manufacturing has been buoyed by reshoring and advanced-manufacturing investment, including recent waves of new aerospace and precision-engineering roles. As supply chains shorten and automation spreads, the mix of skills employers need is shifting fast. That transition is creating strong demand for people who can lead a modern, technology-enabled shop floor.",
    sections: [
      { title: "Growth over the last four years", body: "Reshoring and investment in advanced manufacturing supported demand, with hundreds of new aerospace and manufacturing roles announced in recent months. Sectors tied to defence, aerospace and clean technology have been particularly active. This has kept experienced engineers and production leaders in demand even as the broader market softened." },
      { title: "Today's challenges", body: "The main constraint is a skills gap in automation, robotics and lean methods, compounded by an ageing shop-floor workforce. Many manufacturers struggle to find people who can run both traditional production and new digital systems. Attracting younger talent into the sector remains an ongoing challenge." },
      { title: "The year ahead", body: "Industry 4.0, automation and continued reshoring are set to drive hiring for engineers, quality specialists and production leaders. Investment in clean-technology and advanced manufacturing should create new roles. Quality and continuous-improvement expertise will stay central as standards tighten." },
      { title: "Opportunities on the rise", body: "Automation and robotics, quality (Six Sigma) and digital-manufacturing roles are rising fastest. Data-literate production managers who can drive efficiency are highly sought after. Sustainability and energy-efficiency skills are becoming a genuine differentiator." },
      { title: "How to grow in this field", body: "Add Lean/Six Sigma, automation exposure and quality-systems knowledge to your production experience. Develop the data and digital skills needed to run modern lines, and build leadership capability early. A recognised health-and-safety qualification is expected at supervisory level and above." },
    ],
    certifications: ["Lean Six Sigma (Green / Black Belt)", "IOSH / NEBOSH health & safety", "ISO 9001 quality systems", "Relevant engineering qualification"],
    },
  {
    name: "Medical Devices", icon: "medical", slug: "medical-devices",
    blurb: "Regulatory, quality, R&D and commercial talent for the medtech sector.",
    intro: "Medtech continues to grow on the back of an ageing population and constant innovation, and regulatory change has pushed regulatory and quality talent to the top of the shortage list. Navigating UK and EU rules while bringing products to market has become a specialist discipline in itself. That makes experienced regulatory and quality professionals some of the most sought-after people in the sector.",
    sections: [
      { title: "Growth over the last four years", body: "Steady growth, driven by demographics and innovation, was accelerated by regulatory change (UKCA and EU MDR) that lifted demand for regulatory and quality specialists. Companies have had to invest heavily in compliance to keep products on the market. This created sustained demand for niche expertise that is in genuinely short supply." },
      { title: "Today's challenges", body: "The big challenges are navigating the UKCA/MDR transition and a real scarcity of experienced regulatory and quality-assurance professionals. Timelines and requirements have shifted repeatedly, raising the value of people who can manage uncertainty. Competition for these specialists is intense across the sector." },
      { title: "The year ahead", body: "Expect sustained demand for regulatory affairs, quality and R&D talent as products adapt to evolving UK and EU rules. Digital health and connected devices are opening new categories of role. Post-market surveillance and clinical-evidence functions are also growing." },
      { title: "Opportunities on the rise", body: "Regulatory affairs, quality assurance and digital-health / software-as-a-medical-device roles are the clear growth areas. Demand is rising for people who understand both the technology and the compliance landscape. Cybersecurity for connected devices is an emerging specialism." },
      { title: "How to grow in this field", body: "Build regulatory expertise (UKCA, EU MDR, FDA) and quality-systems knowledge (ISO 13485) alongside your technical or life-science background. Understanding the full product lifecycle — from design controls to post-market — makes you far more valuable. Staying current with fast-moving regulation is essential." },
    ],
    certifications: ["ISO 13485 quality systems", "Regulatory affairs certification (RAPS / TOPRA)", "Quality auditing (e.g. lead auditor)", "A relevant life-science or engineering degree"],
    },
  {
    name: "Healthcare", icon: "health", slug: "healthcare",
    blurb: "Clinical and non-clinical professionals across care and health services.",
    intro: "Healthcare demand is structural and persistent across both the NHS and the private sector, with workforce shortages a defining feature of the market. Because the need is driven by demographics rather than the economy, hiring stays strong through downturns. For qualified professionals, opportunities are consistently available across the UK.",
    sections: [
      { title: "Growth over the last four years", body: "Demand stayed consistently high across clinical and non-clinical roles, driven by demographics and long-standing workforce shortages rather than the economic cycle. Pay pressure in healthcare has remained elevated even as wages cooled elsewhere. Both permanent and flexible/locum routes have stayed active." },
      { title: "Today's challenges", body: "Widespread staff shortages, retention difficulties and funding pressure remain the dominant challenges. Burnout and workload are ongoing concerns that affect retention as much as recruitment. Competition between the NHS and private providers for the same talent is intense." },
      { title: "The year ahead", body: "High demand for both clinical and non-clinical staff is expected to continue through the year ahead. Community and primary care, mental health and elderly care are areas of particular need. Digital and data roles within healthcare are also expanding." },
      { title: "Opportunities on the rise", body: "Digital health, primary and community care, and specialist clinical roles are growing opportunities. Roles that blend clinical knowledge with technology or leadership are increasingly valued. Prevention and community-based care models are creating new pathways." },
      { title: "How to grow in this field", body: "Keep your professional registration current and specialise where you can, as specialists are in the shortest supply. Add leadership, management or digital-health skills to open up senior routes. Continuing professional development is both expected and genuinely valued by employers." },
    ],
    certifications: ["Professional registration (NMC / GMC / HCPC as relevant)", "Safeguarding training", "Specialty / advanced-practice accreditations", "Leadership & management development"],
    },
  {
    name: "Automotive", icon: "automotive", slug: "automotive",
    blurb: "Design, production and aftermarket specialists across the automotive supply chain.",
    intro: "The shift to electric vehicles has reshaped automotive hiring, moving demand decisively toward electrification, batteries and software. Traditional skills remain relevant, but the growth is firmly on the electric and digital side. Candidates who can bridge mechanical engineering and new powertrain or software domains are in a strong position.",
    sections: [
      { title: "Growth over the last four years", body: "The transition to EVs transformed demand, moving hiring away from traditional powertrain and toward electrification and software skills. Investment in battery and EV manufacturing has created new categories of role. At the same time, some legacy roles have declined, making adaptability essential." },
      { title: "Today's challenges", body: "An EV-transition skills gap and ongoing supply-chain volatility are the key challenges. The talent needed for batteries, power electronics and embedded software is scarce and highly contested. Retraining the existing workforce fast enough is a persistent difficulty." },
      { title: "The year ahead", body: "EV, battery and software roles are set to grow while traditional powertrain roles gradually decline. Battery manufacturing and supply-chain localisation should create UK opportunities. Software and connectivity will keep rising in importance." },
      { title: "Opportunities on the rise", body: "EV and battery engineering, embedded software and modern manufacturing are the rising opportunities. Functional safety and systems engineering skills are in strong demand. Charging infrastructure and energy-management roles are also emerging." },
      { title: "How to grow in this field", body: "Build electrification, software and systems-engineering skills to stay ahead of the transition. Functional-safety knowledge (ISO 26262) is increasingly expected in engineering roles. A willingness to keep retraining is one of the most valuable traits in this sector." },
    ],
    certifications: ["Relevant engineering qualification", "EV / hybrid training (IMI)", "Functional safety (ISO 26262)", "Lean Six Sigma"],
    },
  {
    name: "Renewable Energy", icon: "energy", slug: "renewable-energy",
    blurb: "Solar, wind and storage professionals powering the energy transition.",
    intro: "Renewables is one of the fastest-growing corners of the UK market as the country pushes toward net zero, with strong investment in offshore wind, solar and storage. Demand for experienced project, grid and engineering talent consistently outpaces supply. For candidates, it is one of the clearest long-term growth stories in the economy.",
    sections: [
      { title: "Growth over the last four years", body: "Rapid growth, powered by net-zero targets and heavy investment in offshore wind, solar and grid-scale storage, outpaced most other sectors. Large offshore wind programmes in particular have driven sustained hiring. The sector has remained an engine of new jobs even in a soft market." },
      { title: "Today's challenges", body: "An acute skills shortage and fierce competition for experienced project and grid talent are the main constraints. The pace of buildout has outstripped the available workforce, pushing up pay for scarce specialists. Grid-connection and consenting expertise is especially hard to find." },
      { title: "The year ahead", body: "Offshore wind, solar, storage and grid-connection roles are set to keep expanding. Grid modernisation and energy storage are becoming major sources of demand. The long project pipeline gives strong visibility of future hiring." },
      { title: "Opportunities on the rise", body: "Project development, grid and connections, storage and operations-and-maintenance roles are the rising opportunities. Roles combining engineering with commercial or consenting knowledge are highly valued. Hydrogen and emerging technologies are creating new niches." },
      { title: "How to grow in this field", body: "Build renewables project or grid experience and the relevant safety and technical certifications. Transferable skills from oil-and-gas, utilities or construction are in demand as the sector scales. Willingness to work on-site or offshore can significantly widen your options." },
    ],
    certifications: ["Relevant engineering degree", "GWO (Global Wind Organisation) training", "NEBOSH health & safety", "Project management (APM / PRINCE2)"],
    },
  {
    name: "Finance", icon: "finance", slug: "finance",
    blurb: "Controllers, finance directors, tax specialists and CFOs.",
    intro: "Demand for qualified accountants and finance leaders stays steady, but automation has shifted the emphasis toward analysis, business-partnering and systems. Routine transactional work is increasingly automated, raising the value of finance professionals who can interpret data and influence decisions. Qualified, commercially-minded talent remains in consistent demand.",
    sections: [
      { title: "Growth over the last four years", body: "Demand for qualified accountants held steady, with automation shifting the role mix toward analysis and business partnering rather than transactional processing. Finance pay has held up relative to the wider market. Interim and contract finance roles have also been active as firms manage uncertainty." },
      { title: "Today's challenges", body: "A shortage of qualified (ACA/ACCA/CIMA) talent and rising demand for data and systems skills are the main challenges. Employers increasingly want finance people who are fluent in modern systems and analytics. Retaining newly-qualified talent in a competitive market is a common difficulty." },
      { title: "The year ahead", body: "Continued need for controllers, FP&A and finance-transformation roles is expected through the year. ESG and sustainability reporting is creating new specialist demand. Systems-implementation and automation projects will keep driving hiring." },
      { title: "Opportunities on the rise", body: "FP&A, finance transformation, ESG reporting and data-literate finance roles are growing. Commercial finance business partners who influence strategy are especially valued. Roles combining finance with technology are on the rise." },
      { title: "How to grow in this field", body: "Qualify (ACA/ACCA/CIMA), then build systems fluency and commercial business-partnering skills. Developing data and analytics capability sets you apart from purely technical accountants. Communication and influencing skills increasingly determine who reaches the top." },
    ],
    certifications: ["ACA (ICAEW)", "ACCA", "CIMA", "CFA (for investment / analysis roles)"],
    },
  {
    name: "Legal", icon: "legal", slug: "legal",
    blurb: "In-house counsel, compliance and regulatory affairs professionals.",
    intro: "Companies are increasingly bringing legal, compliance and regulatory work in-house, steadily growing demand for qualified in-house professionals. As regulation expands across data, ESG and financial services, the need for specialist counsel keeps rising. For qualified lawyers, in-house and compliance routes offer strong, stable opportunities.",
    sections: [
      { title: "Growth over the last four years", body: "In-house legal teams grew steadily as companies moved legal, compliance and regulatory work in-house to manage cost and risk. Regulatory complexity has made specialist expertise increasingly valuable. Demand has been resilient even where wider professional-services hiring softened." },
      { title: "Today's challenges", body: "Competition for qualified solicitors and rising compliance and regulatory demand are the key pressures. Data protection, financial regulation and ESG have all expanded the compliance workload. Finding candidates who combine legal depth with commercial judgement is difficult." },
      { title: "The year ahead", body: "In-house counsel, compliance and regulatory-affairs roles are expected to keep growing. Data-protection and AI-governance work is an emerging source of demand. Financial-services and regulated-sector roles remain particularly active." },
      { title: "Opportunities on the rise", body: "Compliance, data protection, ESG/regulatory and commercial-contracts roles are the rising opportunities. Lawyers who understand technology and data are in growing demand. Regulatory specialists command a clear premium." },
      { title: "How to grow in this field", body: "Qualify as a solicitor (via the SQE route) and specialise in a growth area such as data protection or regulatory. Building commercial awareness alongside legal expertise is what employers value most. Relevant compliance certifications can accelerate a move into that field." },
    ],
    certifications: ["Qualified solicitor (SRA / SQE)", "Data-protection certification (e.g. CIPP/E)", "Compliance certification (ICA)", "Commercial-contracts experience"],
    },
  {
    name: "Sales & Commercial", icon: "sales", slug: "sales-commercial",
    blurb: "Business development, account management and commercial leadership.",
    intro: "Revenue-generating talent is always in demand, and the market increasingly rewards consultative, data-driven sellers over relationship-only profiles. As buyers become more sophisticated, employers want commercial people who can navigate complex, evidence-based sales. Strong performers with a measurable track record are consistently sought after.",
    sections: [
      { title: "Growth over the last four years", body: "Demand for revenue-generating talent stayed strong, with a clear shift toward consultative, data-driven selling. Technology-enabled sectors have been especially active in hiring commercial staff. Employers have prioritised proven performers over volume hiring." },
      { title: "Today's challenges", body: "High turnover and the difficulty of finding people who combine relationship skills with data fluency are the key challenges. Longer, more complex sales cycles demand more sophisticated skills than before. Retaining top performers in a competitive market is an ongoing pressure." },
      { title: "The year ahead", body: "Continued demand for business development and account management is expected, especially in tech-enabled sectors. Customer-success and retention roles are growing alongside new-business roles. Commercial leadership remains in steady demand." },
      { title: "Opportunities on the rise", body: "SaaS and technology sales, account management and commercial leadership are the rising opportunities. Roles that blend commercial and analytical skills are increasingly valued. Sector-specialist sellers command a premium." },
      { title: "How to grow in this field", body: "Build a measurable track record, CRM and data fluency, and genuine sector expertise. Understanding your customers' industry as well as your own product sets you apart. Consistent, evidenced performance is what opens the door to leadership roles." },
    ],
    certifications: ["A strong, measurable sales track record", "CRM proficiency (e.g. Salesforce / HubSpot)", "Recognised sales methodology training", "Sector / domain knowledge"],
    },
  {
    name: "Operations", icon: "operations", slug: "operations",
    blurb: "Operations managers and directors who turn strategy into delivery.",
    intro: "Operations talent is in steady demand as businesses chase efficiency, with automation steadily reshaping what the roles involve. The best operations leaders combine process discipline with people leadership and data. As margins tighten, that blend of skills becomes even more valuable.",
    sections: [
      { title: "Growth over the last four years", body: "Steady demand continued as organisations prioritised efficiency, with automation reshaping many operational roles. Cost pressure across the economy raised the value of people who can do more with less. Continuous-improvement expertise has been consistently sought after." },
      { title: "Today's challenges", body: "The main challenge is finding leaders who blend process discipline, people leadership and data skills. Many organisations struggle to recruit operations managers who are also comfortable with modern systems. Change-management capability is in short supply." },
      { title: "The year ahead", body: "Continued need for operations managers and continuous-improvement leaders is expected. Automation and digital-transformation projects will keep creating roles. Resilience and risk-management skills are rising up the agenda." },
      { title: "Opportunities on the rise", body: "Continuous improvement, automation and operational-transformation roles are growing. Data-driven operations leaders are especially in demand. Roles bridging operations and technology are increasing." },
      { title: "How to grow in this field", body: "Build Lean/Six Sigma, data and leadership capabilities to progress into senior operations roles. Experience delivering measurable improvement is what employers look for. Strong people-leadership skills separate the best operations managers from the rest." },
    ],
    certifications: ["Lean Six Sigma", "Project management (APM / PRINCE2)", "Relevant operations / business degree", "Data & analytics skills"],
    },
  {
    name: "Supply Chain", icon: "supplychain", slug: "supply-chain",
    blurb: "Procurement, logistics and planning specialists at every level.",
    intro: "Supply-chain roles have stayed elevated since pandemic-era disruption, with resilience and digitisation now firmly on the agenda. Businesses have learned that supply-chain capability is a strategic advantage, not just a cost centre. That has kept demand strong for skilled procurement, planning and logistics professionals.",
    sections: [
      { title: "Growth over the last four years", body: "Demand stayed high after pandemic-era disruption, as businesses invested in resilience and digitised their supply chains. Procurement and planning roles in particular remained active. Sustainability and risk have become permanent parts of the agenda." },
      { title: "Today's challenges", body: "A skills gap in planning and analytics, plus continued volatility, are the main challenges. Employers want people who can use data to manage complex, global networks. Sustainability and ethical-sourcing requirements add further complexity." },
      { title: "The year ahead", body: "Procurement, planning and logistics roles are expected to stay in strong demand. Nearshoring and supply-chain localisation should create UK opportunities. Digital and analytics-led roles will keep growing." },
      { title: "Opportunities on the rise", body: "Digital supply chain, strategic procurement and sustainable / ESG sourcing are the rising opportunities. Data-literate planners and analysts are highly valued. Roles combining commercial and technical skills are in demand." },
      { title: "How to grow in this field", body: "Build planning and analytics skills alongside recognised professional qualifications. Understanding both the commercial and operational sides of the chain makes you more valuable. Sustainability knowledge is increasingly a differentiator." },
    ],
    certifications: ["CIPS (procurement)", "CILT (logistics & transport)", "APICS / ASCM (planning)", "Data & analytics skills"],
    },
  {
    name: "Electrical", icon: "electrical", slug: "electrical",
    blurb: "Electrical engineers and technicians across industrial and building services.",
    intro: "Electrical talent is in strong demand thanks to electrification, renewables and a busy construction pipeline. As the economy electrifies, the need for qualified electrical engineers and technicians keeps climbing. Experienced professionals with the right certifications are consistently sought after.",
    sections: [
      { title: "Growth over the last four years", body: "Demand grew steadily, tied to electrification, renewables and construction activity. The push toward net zero has increased the electrical content of almost every project. This has kept qualified professionals in short supply." },
      { title: "Today's challenges", body: "A shortage of qualified electrical engineers and technicians is the defining challenge. An ageing workforce and a limited training pipeline compound the problem. High-voltage and power-systems expertise is especially scarce." },
      { title: "The year ahead", body: "Electrification and infrastructure investment should sustain hiring through the year. Grid, renewables and building-services work will keep driving demand. Automation and controls roles are also expanding." },
      { title: "Opportunities on the rise", body: "Power systems, renewables, building services and automation are the rising opportunities. Roles combining electrical and digital/controls skills are in demand. EV-charging and energy-storage work is emerging strongly." },
      { title: "How to grow in this field", body: "Gain broad HV/LV experience and the relevant qualifications, then work toward chartership. Keeping your wiring-regulations knowledge current is essential. Adding renewables or controls experience widens your options considerably." },
    ],
    certifications: ["18th Edition wiring regs (BS 7671)", "ECS / JIB card", "Relevant engineering qualification", "CEng / IEng (IET)"],
    },
  {
    name: "Civil", seoName: "Civil Engineering", icon: "civil", slug: "civil",
    blurb: "Civil and infrastructure engineers for major projects.",
    intro: "Civil engineering demand is underpinned by long-term investment in transport, water and infrastructure. Major national programmes provide a stable, multi-year pipeline of work. For experienced civil engineers, that means consistent opportunities across the UK.",
    sections: [
      { title: "Growth over the last four years", body: "Sustained investment in infrastructure and transport kept civil-engineering demand robust. Long project timelines have insulated the sector from short-term swings. Experienced project and design staff have remained in demand throughout." },
      { title: "Today's challenges", body: "A skills shortage and long project cycles are the main challenges. Attracting enough new entrants to replace a retiring workforce is a persistent concern. Digital-delivery skills are increasingly expected but not always available." },
      { title: "The year ahead", body: "Major infrastructure programmes should keep civil engineers in demand through the year. Water, transport and flood-resilience work are areas of particular need. Digital design and delivery will keep reshaping roles." },
      { title: "Opportunities on the rise", body: "Transport, water, flood and coastal, and digital design are the rising opportunities. Roles combining civil engineering with BIM and data are highly valued. Sustainability and resilience expertise is increasingly sought after." },
      { title: "How to grow in this field", body: "Build design and project experience and work steadily toward chartership with the ICE. Adding BIM and digital-delivery skills strengthens your prospects. Broad experience across project stages accelerates progression." },
    ],
    certifications: ["CEng / IEng (ICE)", "CSCS card", "NEC contract knowledge", "An accredited civil-engineering degree"],
    },
  {
    name: "Facilities Management", icon: "facilities", slug: "facilities-management",
    blurb: "Hard and soft FM professionals across commercial estates.",
    intro: "FM demand is steady as estates prioritise efficiency, sustainability and compliance. As buildings become more technical and energy targets tighten, the value of skilled FM professionals rises. Technical (hard) FM expertise in particular is in consistent demand.",
    sections: [
      { title: "Growth over the last four years", body: "Demand held steady as organisations focused on efficient, compliant and more sustainable estates. Energy costs and net-zero targets pushed FM up the corporate agenda. Technical FM roles have been the hardest to fill." },
      { title: "Today's challenges", body: "A skills gap in technical (hard) FM and growing sustainability-compliance requirements are the key challenges. Buildings are increasingly technology-enabled, demanding new skills. Balancing cost, compliance and sustainability is a constant pressure." },
      { title: "The year ahead", body: "Energy efficiency and compliance are expected to drive hiring through the year. Sustainability and net-zero programmes are creating specialist roles. Smart-building and data-driven FM will keep growing." },
      { title: "Opportunities on the rise", body: "Energy management, sustainability and technical FM are the rising opportunities. Professionals who understand building systems and data are highly valued. Compliance and health-and-safety expertise remains essential." },
      { title: "How to grow in this field", body: "Pursue IWFM membership and build technical and health-and-safety qualifications. Developing energy and sustainability knowledge sets you apart. Broad experience across hard and soft services widens your options." },
    ],
    certifications: ["IWFM qualifications", "IOSH / NEBOSH", "Relevant technical (M&E) certifications", "Energy-management knowledge"],
    },
  {
    name: "Commercial Services", icon: "commercial", slug: "commercial-services",
    blurb: "Support and professional-services talent that keeps businesses moving.",
    intro: "Commercial and professional-services roles see broad, steady demand across virtually every industry. Because these functions support the whole business, hiring tends to track overall activity. Adaptable professionals with strong transferable skills are consistently in demand.",
    sections: [
      { title: "Growth over the last four years", body: "Broad demand continued across professional and support functions, tracking overall business activity. Roles that improve efficiency and customer experience stayed active. Flexible and hybrid working reshaped how many of these roles operate." },
      { title: "Today's challenges", body: "The main challenge is matching adaptable talent to fast-changing business needs. Employers increasingly want people who can wear several hats and pick up new tools quickly. Retaining versatile talent in a competitive market is an ongoing pressure." },
      { title: "The year ahead", body: "Continued demand across professional and support functions is expected. Data, digital and customer-experience roles are growing. Efficiency and automation projects will keep creating opportunities." },
      { title: "Opportunities on the rise", body: "Data, digital and specialist professional-services roles are the rising opportunities. People who combine domain knowledge with digital skills are highly valued. Customer-experience and operations-support roles are expanding." },
      { title: "How to grow in this field", body: "Build transferable and digital skills alongside genuine sector knowledge. Adaptability and a willingness to learn new systems are what employers prize most. Relevant professional qualifications help you stand out in a crowded field." },
    ],
    certifications: ["Role-relevant professional qualifications", "Digital & data skills", "Project or process certifications", "Sector knowledge"],
    },
];
