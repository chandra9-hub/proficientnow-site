// =============================================================================
// LEGAL CONTENT — Privacy Policy, Terms & Conditions, Cookie Policy.
// Written for UK rules (UK GDPR, Data Protection Act 2018, PECR, and the
// Conduct of Employment Agencies and Employment Businesses Regulations 2003).
// Effective for one year from the effective date; review before it expires.
//
// NOTE: This is a solid, plain-English starting point covering clients,
// candidates and website visitors. Before relying on it, have it reviewed by a
// solicitor against your client agreement and actual data practices.
// =============================================================================

export const legalMeta = {
  effectiveDate: "10 August 2026",
  validUntil: "10 August 2027",
  company: "ProficientNow Ltd",
  email: "info@proficientnow.co.uk",
  addressLine: "71–75 Shelton Street, London, WC2H 9JQ, United Kingdom",
};

type Section = { heading: string; paras: string[]; bullets?: string[] };
type Doc = { title: string; intro: string; sections: Section[] };

export const privacyPolicy: Doc = {
  title: "Privacy Policy",
  intro:
    "This policy explains how ProficientNow Ltd collects, uses and protects personal information about the people we work with — whether you are a client, a candidate, or simply visiting our website. We are committed to handling your information lawfully, fairly and transparently in line with UK data protection law.",
  sections: [
    { heading: "1. Who we are", paras: [
      "ProficientNow Ltd (\"we\", \"us\", \"our\") is a specialist recruitment company registered in England and Wales. For any privacy question you can contact us at info@proficientnow.co.uk or by post at 71–75 Shelton Street, London, WC2H 9JQ. We are the \"data controller\" for the personal information described in this policy.",
    ]},
    { heading: "2. Who this policy covers", paras: [
      "This policy applies to everyone we hold information about, including:",
    ], bullets: [
      "Candidates — people looking for work or registered with us;",
      "Clients — employers and their staff who use our recruitment services;",
      "Website visitors — anyone browsing our site or contacting us through it.",
    ]},
    { heading: "3. The information we collect", paras: [
      "For candidates, this typically includes your name and contact details, CV and work history, qualifications, right-to-work and eligibility information, and details relevant to a role (such as salary expectations and references).",
      "For clients, we collect business contact details and information needed to provide our services.",
      "For website visitors, we collect limited technical and usage information through cookies and similar technologies (see our Cookie Policy).",
    ]},
    { heading: "4. How we use your information and our lawful bases", paras: [
      "We use candidate information to find and put forward suitable roles, to progress applications, and to provide our recruitment service. We use client information to manage our relationship and deliver our services. We use website data to operate and improve the site.",
      "Under the UK GDPR we rely on the following lawful bases: our legitimate interests in running a recruitment business (balanced against your rights); the performance of a contract with you; your consent where required; and compliance with our legal obligations.",
    ]},
    { heading: "5. Recruitment-specific handling", paras: [
      "As a recruitment business, we handle candidate and client information in line with the Conduct of Employment Agencies and Employment Businesses Regulations 2003. We will not introduce a candidate to a client without a lawful basis to do so, and we take care to keep your information accurate and up to date.",
    ]},
    { heading: "6. Who we share it with", paras: [
      "For candidates, we share relevant details with prospective employers as part of putting you forward for roles. We may also share information with trusted service providers who help us operate (for example IT and hosting providers), who act on our instructions.",
      "We do not sell your personal information to anyone.",
    ]},
    { heading: "7. International transfers", paras: [
      "We operate from the UK and also work through offices and partners in Europe, the United States, the United Arab Emirates and Australia. Where your information is transferred outside the UK, we put appropriate safeguards in place (such as approved contractual clauses) so it remains protected to UK standards.",
    ]},
    { heading: "8. How long we keep it", paras: [
      "We keep personal information only for as long as we need it. As a general rule we retain candidate records, including CVs, for up to three years from our last meaningful contact, and client and employer records for up to five years, unless a longer period is required by law. After that, information is securely deleted or anonymised.",
    ]},
    { heading: "9. Your rights", paras: [
      "Under UK data protection law you have the right to access your information; to have inaccurate information corrected; to ask us to erase it; to restrict or object to how we use it; and, in some cases, to receive it in a portable format. Where we rely on consent, you can withdraw it at any time.",
      "To exercise any of these rights, contact us at info@proficientnow.co.uk. We will respond within the timescales set by law.",
    ]},
    { heading: "10. Keeping your information secure", paras: [
      "We use appropriate technical and organisational measures to protect your information against loss, misuse and unauthorised access, and we review these measures regularly.",
    ]},
    { heading: "11. Cookies", paras: [
      "Our website uses cookies and similar technologies. Please see our Cookie Policy for details on what we use and how you can manage your preferences.",
    ]},
    { heading: "12. Complaints", paras: [
      "If you have a concern about how we handle your information, please contact us first so we can put it right. You also have the right to complain to the Information Commissioner's Office (ICO), the UK's data protection regulator, at ico.org.uk.",
    ]},
    { heading: "13. Changes to this policy", paras: [
      "We may update this policy from time to time. The version shown here is effective from the date at the top of this page and is reviewed at least annually.",
    ]},
  ],
};

export const termsConditions: Doc = {
  title: "Terms & Conditions",
  intro:
    "These terms govern your use of the ProficientNow Ltd website. By using our site you agree to them. They apply to everyone who visits — clients, candidates and general visitors alike. Our paid recruitment services are governed by a separate written agreement.",
  sections: [
    { heading: "1. About us", paras: [
      "This website is operated by ProficientNow Ltd, a company registered in England and Wales. You can contact us at info@proficientnow.co.uk.",
    ]},
    { heading: "2. Using our website", paras: [
      "You may use this website for lawful purposes only. You must not misuse it, attempt to gain unauthorised access, or use it in any way that could damage or disrupt the service or another user's use of it.",
    ]},
    { heading: "3. Our content", paras: [
      "All content on this website — including text, graphics, logos and design — belongs to ProficientNow Ltd or our licensors and is protected by intellectual-property law. You may view and print content for your own personal or internal business use, but you may not reproduce or republish it without our permission.",
    ]},
    { heading: "4. Accuracy of information", paras: [
      "The information on this website, including any market insight, news or blog content, is provided for general information only. While we take care to keep it accurate, we do not guarantee it is complete or current, and it should not be relied on as professional advice. Where we reference external sources, those sources remain the responsibility of their authors.",
    ]},
    { heading: "5. Jobs and applications", paras: [
      "Job listings are provided in good faith and may change or be withdrawn at any time. When you apply through our site, you agree that we may process your information as described in our Privacy Policy in order to consider you for roles.",
    ]},
    { heading: "6. Our recruitment services", paras: [
      "Our recruitment services for clients — including fees, guarantees and other commercial terms — are governed by a separate written agreement between us and the client. Nothing on this website forms part of that agreement or creates a contract for services.",
    ]},
    { heading: "7. Links to other sites", paras: [
      "Our website may link to third-party websites. We provide these links for convenience and are not responsible for the content or practices of those sites.",
    ]},
    { heading: "8. Our liability", paras: [
      "To the extent permitted by law, we are not liable for any loss arising from your use of, or inability to use, this website, or from reliance on any content on it. Nothing in these terms limits our liability where it would be unlawful to do so.",
    ]},
    { heading: "9. Privacy and cookies", paras: [
      "Your use of the website is also governed by our Privacy Policy and Cookie Policy, which explain how we handle your information.",
    ]},
    { heading: "10. Governing law", paras: [
      "These terms are governed by the laws of England and Wales, and any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.",
    ]},
    { heading: "11. Changes to these terms", paras: [
      "We may update these terms from time to time. The version shown here is effective from the date at the top of this page.",
    ]},
  ],
};

export const cookiePolicy: Doc = {
  title: "Cookie Policy",
  intro:
    "This policy explains how ProficientNow Ltd uses cookies and similar technologies on our website, in line with the Privacy and Electronic Communications Regulations (PECR) and UK data protection law.",
  sections: [
    { heading: "1. What cookies are", paras: [
      "Cookies are small text files placed on your device when you visit a website. They help the site work, remember your preferences, and understand how the site is used.",
    ]},
    { heading: "2. How we use cookies", paras: [
      "We use cookies to:",
    ], bullets: [
      "Make the website work properly (essential cookies);",
      "Remember your preferences, such as light or dark mode;",
      "Understand how visitors use the site so we can improve it (analytics cookies), where you have agreed to them.",
    ]},
    { heading: "3. Essential vs optional cookies", paras: [
      "Essential cookies are necessary for the website to function and do not require your consent. Optional cookies — such as analytics — are only used where you have given your consent, which you can change or withdraw at any time.",
    ]},
    { heading: "4. Managing your cookies", paras: [
      "You can control and delete cookies through your browser settings, and you can withdraw any consent you have given. Please note that blocking essential cookies may affect how the website works.",
    ]},
    { heading: "5. Third-party cookies", paras: [
      "Some cookies may be set by third-party services we use (for example, analytics providers). These providers process information in accordance with their own policies.",
    ]},
    { heading: "6. Changes to this policy", paras: [
      "We may update this policy from time to time. The version shown here is effective from the date at the top of this page.",
    ]},
  ],
};
