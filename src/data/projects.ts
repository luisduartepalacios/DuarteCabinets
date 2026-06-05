import type { ImageMetadata } from 'astro';

export interface Project {
  slug: string;
  title: string;
  type: 'Residential' | 'Commercial';
  category: string;
  location: string;
  year: string;
  blurb: string; // short, for cards
  intro: string; // one-line summary on detail page
  body: string[]; // paragraphs on detail page
  details: { label: string; value: string }[];
  featured: boolean;
  images: ImageMetadata[];
}

// Eagerly import every optimized project image so Astro can transform them.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '../assets/projects/**/*.{jpg,jpeg,png}',
  { eager: true }
);

/** Return all images for a slug, sorted by filename (01, 02, ...). */
function imagesFor(slug: string): ImageMetadata[] {
  return Object.entries(files)
    .filter(([path]) => path.includes(`/projects/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, mod]) => mod.default);
}

const meta: Omit<Project, 'images'>[] = [
  {
    slug: 'cocina-kate',
    title: 'Cocina Kate',
    type: 'Residential',
    category: 'Kitchen',
    location: 'Tijuana, MX',
    year: '2025',
    blurb: 'A light-filled kitchen of white oak, arched alcoves, and a terrazzo island.',
    intro:
      'A bright, contemporary kitchen built around white oak millwork, softly arched display alcoves, and a sculptural terrazzo island.',
    body: [
      'Cocina Kate began with a simple brief: a kitchen that feels open and sunlit, yet anchored by warm, tactile materials. We answered with full-height white oak cabinetry framing a pair of arched alcoves that display ceramics and art rather than hiding them away.',
      'The terrazzo island is the heart of the room — a single, generous surface for cooking, gathering, and the everyday. Cane-backed stools and a round oak dining table keep the mood relaxed and unmistakably livable.',
    ],
    details: [
      { label: 'Scope', value: 'Full-service design & cabinetry' },
      { label: 'Materials', value: 'White oak, terrazzo, brass' },
      { label: 'Style', value: 'Warm contemporary' },
    ],
    featured: true,
  },
  {
    slug: 'cafe-eph',
    title: 'Eph Coffee House',
    type: 'Commercial',
    category: 'Hospitality',
    location: 'Tijuana, MX',
    year: '2024',
    blurb: 'A neighborhood café in warm wood, arched niches, and a daylit skylight.',
    intro:
      'A neighborhood coffee house designed end to end — warm wood joinery, arched seating niches, and a central skylight that tracks the day.',
    body: [
      'For Eph we designed a café that earns its regulars. A long timber service counter leads the eye through the room, while arched banquette niches carve out intimate corners within an open plan.',
      'A central skylight floods the space with changing daylight, and custom display millwork keeps merchandise and pastries beautifully in view. Every fixture — from the counter to the shelving — was drawn and built for this room.',
    ],
    details: [
      { label: 'Scope', value: 'Full commercial fit-out' },
      { label: 'Program', value: 'Café & retail counter' },
      { label: 'Materials', value: 'Warm timber, tile, terrazzo' },
    ],
    featured: true,
  },
  {
    slug: 'stone-walnut-kitchen',
    title: 'Stone & Walnut Kitchen',
    type: 'Residential',
    category: 'Kitchen',
    location: 'Tijuana, MX',
    year: '2025',
    blurb: 'Dark walnut cabinetry against a dramatic natural stone feature wall.',
    intro:
      'A refined, low-lit kitchen pairing rich walnut cabinetry with a floor-to-ceiling natural stone feature wall and marble counters.',
    body: [
      'This kitchen trades brightness for drama. Deep walnut cabinetry wraps the room, set against a textured natural-stone feature wall that becomes the space’s focal point.',
      'Honed marble counters and a integrated dining table extend the material story, while concealed storage keeps the long runs of cabinetry clean and architectural. Sculptural pendants complete a room designed for evenings.',
    ],
    details: [
      { label: 'Scope', value: 'Full-service design & cabinetry' },
      { label: 'Materials', value: 'Walnut, natural stone, marble' },
      { label: 'Style', value: 'Modern, low-lit' },
    ],
    featured: true,
  },
  {
    slug: 'the-dressing-room',
    title: 'The Dressing Room',
    type: 'Residential',
    category: 'Closet',
    location: 'Tijuana, MX',
    year: '2024',
    blurb: 'A boutique walk-in dressing room with glass-front wardrobes and a vanity island.',
    intro:
      'A boutique-style walk-in dressing room — glass-front wardrobes, a central vanity island, and jewel-box detailing throughout.',
    body: [
      'We approached this dressing room like a small luxury boutique. Bronze-framed glass wardrobes line the walls, putting the wardrobe on display while keeping everything dust-free and organized.',
      'A central vanity island provides a place to get ready, with specialized inserts for jewelry, watches, ties, and accessories. Integrated lighting turns the everyday routine into something a little more ceremonial.',
    ],
    details: [
      { label: 'Scope', value: 'Full-service design & cabinetry' },
      { label: 'Materials', value: 'Bronze, glass, oak' },
      { label: 'Program', value: 'Walk-in closet & vanity' },
    ],
    featured: true,
  },
  {
    slug: 'cocina-julian',
    title: 'Cocina Julián',
    type: 'Residential',
    category: 'Kitchen',
    location: 'Tijuana, MX',
    year: '2024',
    blurb: 'A warm walnut kitchen with an open dining nook and garden views.',
    intro:
      'A warm, traditional-leaning kitchen in walnut, with open shelving, a brown-marble island, and a sun-filled dining nook.',
    body: [
      'Cocina Julián is a family kitchen built for daily life. Walnut cabinetry and open display shelving give the room warmth, while a veined brown-marble island offers a durable, beautiful work surface.',
      'A bright dining nook opens to the garden, wrapped in cream upholstery for comfort. The result is a kitchen that feels collected and timeless rather than trend-driven.',
    ],
    details: [
      { label: 'Scope', value: 'Full-service design & cabinetry' },
      { label: 'Materials', value: 'Walnut, brown marble' },
      { label: 'Style', value: 'Warm transitional' },
    ],
    featured: false,
  },
  {
    slug: 'marble-walnut-kitchen',
    title: 'Marble & Walnut Kitchen',
    type: 'Residential',
    category: 'Kitchen',
    location: 'Tijuana, MX',
    year: '2025',
    blurb: 'A crisp, contemporary kitchen balancing bright cabinetry with marble and wood.',
    intro:
      'A crisp contemporary kitchen that balances bright cabinetry with marble surfaces and walnut accents for warmth.',
    body: [
      'This kitchen pursues a light, modern feeling without going cold. Bright cabinetry and marble counters keep the room airy, while walnut accents and a waterfall island add depth and warmth.',
      'Clean, handleless fronts and carefully planned storage make the space as functional as it is calm — a flexible backdrop for everyday cooking and entertaining alike.',
    ],
    details: [
      { label: 'Scope', value: 'Full-service design & cabinetry' },
      { label: 'Materials', value: 'Marble, walnut, lacquer' },
      { label: 'Style', value: 'Contemporary' },
    ],
    featured: false,
  },
];

export const projects: Project[] = meta.map((p) => ({
  ...p,
  images: imagesFor(p.slug),
}));

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectTypes = ['All', 'Residential', 'Commercial'] as const;
