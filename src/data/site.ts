export const site = {
  name: 'Duarte Cabinets & Design',
  shortName: 'Duarte',
  tagline: 'Smart spaces, made to measure.',
  taglineEs: 'Espacios inteligentes hechos a tu medida.',
  description:
    'Duarte Cabinets & Design is a binational interior design and custom cabinetry studio creating bespoke kitchens, closets, and commercial spaces across Mexico and the United States.',
  designer: 'Itzel Duarte',
  designerRole: 'Integral Designer & Founder',
  email: 'hello@duartecabinets.com',
  phone: '+52 664 345 8976',
  phoneDisplay: '(664) 345 8976',
  instagram: 'duarte.cabinets',
  instagramUrl: 'https://www.instagram.com/duarte.cabinets',
  locationLine: 'Tijuana, MX · Serving Southern California & the U.S.',
  // Formspree endpoint — replace XXXXXXXX with the real form id from formspree.io
  formspreeId: 'XXXXXXXX',
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/projects' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
];

export const services = [
  {
    key: 'full-service',
    name: 'Full-Service Design',
    summary:
      'End-to-end design and custom millwork — from first concept to the final installed cabinet.',
    description:
      'A complete, hands-on partnership. We measure your space, develop the floor plan and 3D renderings, specify every material and finish, and fabricate the custom cabinetry in our own workshop. You receive one accountable team from concept through installation.',
    includes: [
      'On-site measure & space planning',
      'Concept development & photoreal 3D renderings',
      'Material, finish & hardware selection',
      'Custom cabinetry fabrication',
      'Project management & installation',
    ],
  },
  {
    key: 'e-design',
    name: 'E-Design',
    summary:
      'A designer-led plan delivered remotely — ideal for clients outside our travel radius.',
    description:
      'Work with us from anywhere. Based on your measurements and photos, we deliver a complete design package: layout, 3D renderings, a finish and materials schedule, and a sourcing list you (or your contractor) can build from. The Duarte aesthetic, on your timeline and budget.',
    includes: [
      'Remote consultation & questionnaire',
      'Layout & 3D renderings',
      'Finish & materials schedule',
      'Sourcing & shopping list',
      'Two revision rounds',
    ],
  },
  {
    key: 'consultation',
    name: 'Consultation',
    summary:
      'Focused, expert guidance when you need direction — not a full engagement.',
    description:
      'A single working session to unlock a stuck project: validate a layout, refine a material palette, or get a professional second opinion before you commit. Clear, actionable direction in one conversation.',
    includes: [
      'One in-depth design session',
      'Layout & flow review',
      'Material & color direction',
      'Prioritized action plan',
    ],
  },
];

export const aboutCopy = {
  intro:
    'Duarte Cabinets & Design is the studio of Itzel Duarte, an integral designer who believes a well-made space should feel as good as it looks.',
  mission:
    'To transform spaces through integral design and signature cabinetry — delivering personalized, high-quality pieces at a fair price, with a professional and personal experience that turns every investment into a space that is functional, dignified, and full of life.',
  vision:
    'To become the binational reference for made-to-measure design, bringing our passion for detail to the leading cities of Mexico and the United States.',
  values: [
    {
      title: 'Made to measure',
      body: 'Every piece is designed and built for one space and one client — never off the shelf. Versatile in materials, color, and texture.',
    },
    {
      title: 'Honest craft',
      body: 'Signature carpentry and high-quality materials, priced fairly. We treat your investment as our own.',
    },
    {
      title: 'Warm & professional',
      body: 'A close, personal process from first sketch to final install — friendly, clear, and dependable at every step.',
    },
  ],
};
