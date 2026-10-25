export type Kind = 'Actual result' | 'Projected' | 'Simulated' | 'Proposed solution' | 'Prototype'
export interface Project {
  id: string; title: string; category: string; summary: string; tags: string[]
  media: { src: string; alt: string }
  problem?: string; role?: string; approach?: string; tools?: string
  results?: { kind: Kind; text: string }[]; note?: string
  gallery?: { src: string; alt: string; caption?: string; ratio?: string }[]
  sections?: { title: string; body: string }[]
}
const m = (f: string, p: string, alt: string) => ({ src: `/media/${f}/${p}`, alt })

export const featured: Project[] = [
  {
    id: 'shipper', title: 'Operations Excellence — SHIPPER', category: 'Operations Excellence · Process Improvement · Python Automation',
    summary: 'Cleared a large shipment backlog that was delaying billing and revenue recognition, through root-cause mapping, vendor coordination, and Python tooling.',
    tags: ['Python', 'Excel', 'GitHub'], media: m('shipper', 'backlog-dashboard.png', 'Sanitized backlog dashboard'),
    problem: 'About 1,000 shipments were stuck in billing because of document issues (missing SJ/LPB, incomplete BA, stamp shortages), with no visibility on priority.',
    role: 'Operations Excellence at Shipper: managed the shipment backlog and the structured process to clear outstanding Proof of Delivery (POD).',
    approach: 'Mapped root causes of every pending shipment, coordinated 90+ nationwide vendor PICs to resolve delivery exceptions, built a backlog dashboard and an escalation framework with clear owners and deadlines, and developed Python tools for instant document search and bulk document processing.',
    tools: 'Python, Excel, GitHub',
    results: [{ kind: 'Actual result', text: '97%+ of the backlog resolved, faster POD turnaround, clearer priorities for the team.' }, { kind: 'Actual result', text: '~IDR 2 billion in delayed revenue recovered (as reported in the project summary).' }],
    gallery: [{ ...m('shipper', 'python-automation-workflow.png', 'Python document-processing workflow'), caption: 'Python tools for document search and bulk processing' }],
    note: 'Visuals must be sanitized: no real POD documents, customer records, or internal dashboards.'
  },
  {
    id: 'jas', title: 'Project Consultant — PT JAS Cargo & Emirates Airlines', category: 'Logistics Consulting · Process Improvement · Business Case',
    summary: 'Course consultancy study on replacing manual cargo counting with RFID-based automated capture.',
    tags: ['RFID', 'ROI', 'NPV', 'IRR'], media: m('jas-cargo-rfid', 'rfid-workflow.png', 'RFID workflow for cargo handling'),
    problem: 'Manual cargo counting and recording caused high human error, delays, mismatched data, and false missing items.',
    role: 'Part of the Consultancy Project course team working on a real-world case with PT Jas Cargo and Emirates Airlines.',
    approach: 'Proposed RFID technology for automated data capture, real-time tracking, and integration with the Cargo Management System (CMS).',
    tools: 'RFID, CMS integration, ROI / NPV / IRR analysis',
    results: [{ kind: 'Proposed solution', text: 'Expected: increased accuracy, faster processes, and improved transparency in cargo handling.' }, { kind: 'Projected', text: 'Projected cost savings of Rp1.7B over 5 years, payback of about 2.5 years, supported by ROI, NPV, and IRR analysis. Not realized savings.' }],
    gallery: [
      { ...m('jas-cargo-rfid', 'team-photo.png', 'Consultancy project team photo'), ratio: '16/9' },
      { ...m('jas-cargo-rfid', 'report-cover.png', 'Consultancy project report cover'), ratio: '1/1' }]
  },
  {
    id: 'logistics-bi', title: 'Power BI Dashboard — Logistics Shipment', category: 'Data Analytics · Business Intelligence · Logistics',
    summary: 'End-to-end visibility into shipment cost efficiency, delivery outcomes, transit time, and carrier performance.',
    tags: ['Power BI', 'Excel'], media: m('logistics-dashboard', 'dashboard-overview.png', 'Logistics shipment dashboard overview'),
    approach: 'Designed to help stakeholders identify cost drivers, evaluate carrier trade-offs, and improve operational efficiency.',
    tools: 'Power BI, Excel',
    results: [{ kind: 'Actual result', text: 'Insights: volume and cost are concentrated in a few carriers; cost per mile varies significantly; faster transit does not always mean lower cost; monthly trends suggest seasonal demand; some shipments remain undelivered.' }]
  },
  {
    id: 'freighty', title: 'Freighty Mercury', category: 'Digital Product · Freight Costing · Logistics',
    summary: 'A sidebar dashboard that centralizes Incoterms comparison, exchange rates, a shipment cost calculator, and vendor pricing.',
    tags: ['Figma', 'GitHub', 'Vercel'], media: m('freighty-mercury', 'app-overview.png', 'Freighty Mercury app overview'),
    problem: 'Sales teams misunderstand Incoterms, leading to unexpected extra costs; freight and exchange rates keep fluctuating; manual calculations are slow and error-prone.',
    role: 'Designed around the persona Farhan, a Pricing and Costing Specialist at a freight forwarder.',
    approach: 'Four tools in one place: Incoterms (compare EXW, FOB, CIF, DDP), Exchange Rates (daily change and 7-day trend), Cost Calculator, and Vendors. Light and dark mode.',
    tools: 'Figma, GitHub, Vercel',
    results: [{ kind: 'Prototype', text: 'Application prototype with a demo sign-in. No claim of commercial deployment.' }],
    gallery: [
      { ...m('freighty-mercury', 'incoterms-comparison.png', 'Incoterms comparison tool'), caption: 'Incoterms: compare EXW, FOB, CIF, DDP' },
      { ...m('freighty-mercury', 'cost-calculator.png', 'Shipment cost calculator'), caption: 'Cost calculator' }]
  },
  {
    id: 'export-bi', title: 'Power BI Dashboard — Export Sales', category: 'Business Intelligence · Export Sales Analytics',
    summary: 'Analyzes export sales performance, shipping cost trends, destination contribution, and customer impact.',
    tags: ['Power BI', 'Excel'], media: m('export-sales', 'dashboard-overview.png', 'Export sales dashboard overview'), tools: 'Power BI, Excel',
    results: [{ kind: 'Actual result', text: 'Insights: cost concentration is driven by a few key destinations and customers; high-cost categories are optimization opportunities; seasonal cost spikes suggest planning and capacity improvements.' }]
  },
  {
    id: 'optimove', title: 'OPTIMOVE — AI Route Optimization', category: 'Route Optimization · Decision Analytics · Sustainability',
    summary: 'Proposed mobile route planner for PT Mostrans (B2B healthcare logistics), built on top of MOSTRACK.',
    tags: ['AHP', 'Reinforcement learning'], media: m('optimove', 'route-optimization-workflow.png', 'OPTIMOVE routing workflow'),
    problem: 'Inefficient routes, empty return trips, and weak fleet tracking drive up fuel use and CO₂ at PT Mostrans.',
    approach: 'Input: origin, destination, vehicle and items, plus fuel, map, weather and traffic via Google APIs. AHP weights route criteria; reinforcement learning adapts to traffic, weather and closures. Output: optimal route with CO₂, fuel use, savings and live directions.',
    tools: 'AHP, reinforcement learning, Google APIs, Figma-style mobile mockups',
    results: [{ kind: 'Simulated', text: '10% less fuel and CO₂ per month (simulated).' }, { kind: 'Projected', text: 'ROI of 35.13% in Year 1 and 79.68% in Years 2–3 (business-case figures). Proposal only; not measured operational performance.' }]
  }
]

export const more: Project[] = [
  { id: 'stockflow', title: 'Stockflow — Inventory Management System', category: 'Digital Product', summary: 'Logistics Information System course project helping SMEs track inventory in real time and replace error-prone manual stock-taking.', tags: ['Laravel', 'MySQL', 'PHP'], media: m('other-projects', 'stockflow.png', 'Stockflow dashboard') },
  { id: 'mtc', title: 'Project Officer — Meet The CEOs 2025', category: 'Program Leadership', summary: 'Leadership program with Unilever Indonesia and Shopee Indonesia. Coordinated partnerships, oversaw selection from 90+ applicants, led 15+ organizers; 4.75/5 average satisfaction from post-event feedback.', tags: ['Partnerships', 'Team leadership'], media: m('other-projects', 'mtc.png', 'Meet The CEOs 2025') },
  { id: 'afl', title: 'AIESEC Future Leaders', category: 'Program Execution', summary: 'Managed execution for 400+ participants across AFL Summer & Winter Peak; worked with speakers from Google, Danone, L’Oréal, GOTO, and Forbes 30 Under 30; designed a 3-month curriculum.', tags: ['Program execution', 'Stakeholders'], media: m('other-projects', 'afl.png', 'AIESEC Future Leaders') },
  { id: 'gv', title: 'OC Director — Global Village Winter Peak 2025', category: 'Event Operations', summary: 'Cultural exhibition by AIESEC in Bandung: 200+ visitors, 9 international booths, 3 traditional Indonesian performances.', tags: ['Event operations'], media: m('other-projects', 'global-village.png', 'Global Village Winter Peak 2025') },
  { id: 'logitalk', title: 'LogiTalk — Himpunan Mahasiswa Teknik Logistik', category: 'Content & Community', summary: 'Educational podcast on the Logistics Engineering program. Hosted 2 episodes; contributed to content planning, guest coordination, and audience engagement.', tags: ['Content planning'], media: m('other-projects', 'logitalk.png', 'LogiTalk podcast') },
  { id: 'sharexcare', title: 'Event & Logistics Manager — ShareXCare', category: 'Event & Logistics', summary: 'Led an 8-member team with 10 Bandung Care representatives; prepared and distributed 50+ donation packages and managed event flow on the day.', tags: ['Event logistics'], media: m('other-projects', 'sharexcare.png', 'ShareXCare event') }
]
