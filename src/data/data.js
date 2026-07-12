/* ═══════════════════════════════════════════════════════════════════
   PORTFOLIO DATA
   Edit content here — all components read from this single file.
   Add/edit projects, skills, timeline entries, certs without
   touching any component logic.
═══════════════════════════════════════════════════════════════════ */

// ─── SKILLS GRAPH ──────────────────────────────────────────────────────────────
// Each node: { id, name, projectRefs[] }
export const skills = [
  { id: 'python',     name: 'Python',        projectRefs: ['fraudshield'] },
  { id: 'javascript', name: 'JavaScript',    projectRefs: ['smartcontent', 'portfolio'] },
  { id: 'cpp',        name: 'C++',           projectRefs: [] },
  { id: 'sql',        name: 'SQL',           projectRefs: ['fraudshield'] },
  { id: 'html5',      name: 'HTML5',         projectRefs: ['smartcontent', 'portfolio'] },
  { id: 'css3',       name: 'CSS3',          projectRefs: ['smartcontent', 'portfolio'] },
  { id: 'react',      name: 'React',         projectRefs: ['portfolio'] },
  { id: 'flutter',    name: 'Flutter',       projectRefs: ['easydine'] },
  { id: 'nodejs',     name: 'Node.js',       projectRefs: ['planmyevent'] },
  { id: 'express',    name: 'Express.js',    projectRefs: ['planmyevent'] },
  { id: 'fastapi',    name: 'FastAPI',       projectRefs: ['fraudshield'] },
  { id: 'restapis',   name: 'REST APIs',     projectRefs: ['easydine', 'planmyevent', 'fraudshield'] },
  { id: 'mongodb',    name: 'MongoDB Atlas', projectRefs: ['planmyevent'] },
  { id: 'mongoose',   name: 'Mongoose ODM',  projectRefs: ['planmyevent'] },
  { id: 'supabase',   name: 'Supabase',      projectRefs: ['easydine', 'fraudshield'] },
  { id: 'xgboost',    name: 'XGBoost',       projectRefs: ['fraudshield'] },
  { id: 'networkx',   name: 'NetworkX',      projectRefs: ['fraudshield'] },
  { id: 'groqapi',    name: 'Groq API',      projectRefs: ['fraudshield'] },
  { id: 'git',        name: 'Git',           projectRefs: ['easydine', 'planmyevent', 'smartcontent', 'portfolio', 'fraudshield'] },
  { id: 'github',     name: 'GitHub',        projectRefs: ['easydine', 'planmyevent', 'smartcontent', 'portfolio', 'fraudshield'] },
]

// Edges: ONLY connect skills used together in the SAME real project.
export const skillEdges = [
  // EasyDine: Flutter + Supabase + REST APIs
  { source: 'flutter',  target: 'supabase', project: 'easydine' },
  { source: 'flutter',  target: 'restapis', project: 'easydine' },
  { source: 'supabase', target: 'restapis', project: 'easydine' },

  // PlanMyEvent: Node.js + Express.js + MongoDB Atlas + Mongoose ODM + REST APIs
  { source: 'nodejs',   target: 'express',  project: 'planmyevent' },
  { source: 'nodejs',   target: 'mongodb',  project: 'planmyevent' },
  { source: 'nodejs',   target: 'mongoose', project: 'planmyevent' },
  { source: 'nodejs',   target: 'restapis', project: 'planmyevent' },
  { source: 'express',  target: 'mongodb',  project: 'planmyevent' },
  { source: 'express',  target: 'mongoose', project: 'planmyevent' },
  { source: 'express',  target: 'restapis', project: 'planmyevent' },
  { source: 'mongodb',  target: 'mongoose', project: 'planmyevent' },
  { source: 'mongodb',  target: 'restapis', project: 'planmyevent' },
  { source: 'mongoose', target: 'restapis', project: 'planmyevent' },

  // Smart Content Simplifier: JavaScript + HTML5 + CSS3
  { source: 'javascript', target: 'html5', project: 'smartcontent' },
  { source: 'javascript', target: 'css3',  project: 'smartcontent' },
  { source: 'html5',      target: 'css3',  project: 'smartcontent' },

  // Portfolio Website: React + JavaScript + HTML5 + CSS3
  { source: 'react',      target: 'javascript', project: 'portfolio' },
  { source: 'react',      target: 'html5',      project: 'portfolio' },
  { source: 'react',      target: 'css3',       project: 'portfolio' },
  { source: 'javascript', target: 'html5',      project: 'portfolio' },
  { source: 'javascript', target: 'css3',       project: 'portfolio' },
  { source: 'html5',      target: 'css3',       project: 'portfolio' },

  // FraudShield: Python + FastAPI + REST APIs + Supabase + SQL + XGBoost + NetworkX + Groq API
  { source: 'python',   target: 'fastapi',  project: 'fraudshield' },
  { source: 'python',   target: 'restapis', project: 'fraudshield' },
  { source: 'python',   target: 'supabase', project: 'fraudshield' },
  { source: 'python',   target: 'sql',      project: 'fraudshield' },
  { source: 'python',   target: 'xgboost',  project: 'fraudshield' },
  { source: 'python',   target: 'networkx', project: 'fraudshield' },
  { source: 'python',   target: 'groqapi',  project: 'fraudshield' },
  { source: 'fastapi',  target: 'restapis', project: 'fraudshield' },
  { source: 'fastapi',  target: 'supabase', project: 'fraudshield' },
  { source: 'fastapi',  target: 'groqapi',  project: 'fraudshield' },
  { source: 'restapis', target: 'supabase', project: 'fraudshield' },
  { source: 'supabase', target: 'sql',      project: 'fraudshield' },
  { source: 'xgboost',  target: 'networkx', project: 'fraudshield' },
  { source: 'xgboost',  target: 'groqapi',  project: 'fraudshield' },
  { source: 'networkx', target: 'groqapi',  project: 'fraudshield' },

  // Tools used together across project work
  { source: 'git',      target: 'github',   project: 'tooling' },
]
// ─── PROJECT DISPLAY NAMES (for tooltip) ──────────────────────────────────────
export const projectNames = {
  planmyevent:  'PlanMyEvent',
  smartcontent: 'Smart Content Simplifier',
  fraudshield:  'FraudShield',
  easydine:     'EasyDine',
  portfolio:    'Portfolio Website',
  tooling:      'Git & GitHub',
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
// ORDER: EasyDine → FraudShield → PlanMyEvent → Smart Content Simplifier → Research
export const projects = [
  // ── 01: EasyDine (Internship — Featured) ──────────────────────────────────
  {
    id: 'easydine',
    number: '01',
    type: 'App Dev · Internship at Prodapt',
    title: 'EasyDine',
    description:
      'A digital cafeteria and food ordering platform developed during my internship at Prodapt. ' +
      'The app provides dedicated interfaces for employees, vendors, and administrators — streamlining ' +
      'food ordering, menu management, and operational analytics across roles.',
    myRole: 'App Developer Intern',
    tech: ['Flutter', 'Dart', 'Supabase', 'REST APIs', 'Git & GitHub'],
    // [REPLACE WITH: /easydine-screenshot.png] once you have the screenshot
    image: null,
    imageAlt: 'EasyDine cafeteria platform screenshot',
    github: 'https://github.com/DevikaJ2005',
    live: null,
    badge: 'Prodapt Internship',
    highlights: [
      'Multi-role app — Admin, Vendor, Employee',
      'Supabase auth + real-time database',
      'Admin Dashboard: menus, orders, employee & vendor management',
      'Contributed to both Flutter frontend and backend integration',
      'Focused on clean, reusable code and scalable feature design',
    ],
  },

  // ── 02: FraudShield ───────────────────────────────────────────────────────
  {
    id: 'fraudshield',
    number: '02',
    type: 'AI Platform · Meta PyTorch Hackathon',
    title: 'FraudShield',
    description:
      'An AI-powered fraud detection platform combining XGBoost classification, SHAP explainability, ' +
      'a PPO reinforcement learning agent (Stable Baselines 3), and Groq LLM for plain-English fraud narration. ' +
      'Placed Top 800 of 31,000+ teams in the Meta PyTorch OpenEnv Hackathon.',
    myRole: 'Developer',
    tech: ['Python', 'XGBoost', 'SHAP', 'FastAPI', 'Supabase', 'Groq LLM', 'n8n'],
    // [REPLACE WITH: /fraudshield-screenshot.png] once you have the screenshot
    image: null,
    imageAlt: 'FraudShield dashboard screenshot',
    github: 'https://github.com/DevikaJ2005',
    live: null,
    badge: 'Top 800 / 31,000+ Teams',
  },

  // ── 03: PlanMyEvent ───────────────────────────────────────────────────────
  {
    id: 'planmyevent',
    number: '03',
    type: 'Full Stack · Group Project',
    title: 'PlanMyEvent',
    description:
      'A full-stack event planning web app. I led the team end-to-end: built all REST APIs with ' +
      'Node.js & Express, integrated MongoDB Atlas for cloud data persistence, and handled deployment on Render.',
    myRole: 'Team Lead / Backend Developer',
    tech: ['Node.js', 'Express.js', 'MongoDB Atlas', 'REST APIs', 'Mongoose ODM'],
    image: '/Planmyevent.PNG',
    imageAlt: 'PlanMyEvent application screenshot',
    github: 'https://github.com/DevikaJ2005',
    live: 'https://planmyevent.onrender.com/',
  },

  // ── 04: Smart Content Simplifier ─────────────────────────────────────────
  {
    id: 'smartcontent',
    number: '04',
    type: 'Chrome Extension · Manifest V3',
    title: 'Smart Content Simplifier',
    description:
      'A Chrome Extension for distraction-free browsing. Implements Reader Mode via DOMParser, ' +
      'website blocking, and a focus timer built on Chrome Tabs, Storage, and Alarms APIs.',
    myRole: 'Developer',
    tech: ['JavaScript', 'HTML5', 'CSS3', 'Chrome Extensions API', 'DOMParser'],
    image: '/extention.JPG.png',
    imageAlt: 'Smart Content Simplifier extension screenshot',
    github: 'https://github.com/DevikaJ2005/Smart-Content-Simplifier',
    live: null,
    imageStyle: { objectFit: 'contain', background: '#F0F4FF', padding: '1rem' },
  },

  // ── 05: Research Paper ───────────────────────────────────────────────────
  {
    id: 'research',
    number: '05',
    type: 'Research · Conference Paper',
    title: 'Cognitive Overload Reduction',
    description:
      'Proposed a browser-based system to reduce interface-induced cognitive overload using ' +
      'Cognitive Load Theory (CLT) principles. Presented at ICCCMIT 2026, an international conference.',
    myRole: 'Author / Presenter',
    tech: ['HCI Research', 'Cognitive Load Theory'],
    image: null,
    imageAlt: 'ICCCMIT 2026 conference paper',
    github: null,
    live: null,
    badge: 'ICCCMIT 2026',
    isResearch: true,
  },
]

// ─── TIMELINE ─────────────────────────────────────────────────────────────────
// ORDER: most recent / highest-impact first
export const timeline = [
  {
    id: 'techgen',
    period: '2025 – Present',
    role: 'President',
    org: 'TechGen · CS Department Club · MOP Vaishnav College',
    details: [
      'Lead the Computer Science Department Club, TechGen',
      'Organise technical events, workshops, and department activities',
      'Coordinate between students and faculty to support academic and co-curricular initiatives',
    ],
  },
  {
    id: 'prodapt',
    period: '2025',
    role: 'App Developer Intern',
    org: 'Prodapt · EasyDine Project',
    details: [
      'Developed and enhanced the Admin Dashboard — employees, vendors, menus, orders, analytics',
      'Contributed to Flutter frontend development and backend integration using Supabase',
      'Integrated Supabase for authentication, database management, and real-time data handling',
      'Designed backend data structures and APIs to support application workflows',
    ],
  },
  {
    id: 'bsc',
    period: '2024 – 2027',
    role: 'BSc Computer Science — Student',
    org: 'MOP Vaishnav College for Women · Chennai',
    details: [
      'CGPA: 7.3 · 2nd Year',
      'Research on cognitive overload reduction in interfaces — presented at ICCCMIT 2026',
      'Active participant in hackathons and technical events',
    ],
  },
  {
    id: 'journal',
    period: '2025 – 2026',
    role: 'Journal Coordinator',
    org: 'MOP Vaishnav College · Computer Science Journal',
    details: [
      'Coordinated journal-related activities, documentation, and article collection',
      'Supported communication between team members and student contributors',
    ],
  },
]

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
export const certifications = [
  {
    year: '2025',
    name: 'Google Cloud — Generative AI',
    issuer: 'IT-ITeS SSC, NASSCOM · FutureSkills Prime',
  },
  {
    year: '2025',
    name: 'Power BI',
    issuer: 'Simplilearn · SkillUp Platform',
  },
  {
    year: '2024',
    name: 'Introduction to MongoDB',
    issuer: 'MongoDB University · Official',
  },
  {
    year: '2024',
    name: 'Financial Literacy',
    issuer: 'UNICEF',
  },
]
