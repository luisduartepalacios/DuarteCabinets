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
    slug: 'white-oak-kitchen',
    title: 'The White Oak Kitchen',
    type: 'Residential',
    category: 'Kitchen',
    location: 'Tijuana, MX',
    year: '2025',
    blurb: 'A light-filled kitchen of white oak, arched alcoves, and a terrazzo island.',
    intro:
      'A bright, contemporary kitchen built around white oak millwork, softly arched display alcoves, and a sculptural terrazzo island.',
    body: [
      'The White Oak Kitchen began with a simple brief: a kitchen that feels open and sunlit, yet anchored by warm, tactile materials. We answered with full-height white oak cabinetry framing a pair of arched alcoves that display ceramics and art rather than hiding them away.',
      'The terrazzo island is the heart of the room, a single, generous surface for cooking, gathering, and the everyday. Cane-backed stools and a round oak dining table keep the mood relaxed and unmistakably livable.',
    ],
    details: [
      { label: 'Scope', value: 'Full-service design & cabinetry' },
      { label: 'Materials', value: 'White oak, terrazzo, brass' },
      { label: 'Style', value: 'Warm contemporary' },
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
      'A boutique-style walk-in dressing room, glass-front wardrobes, a central vanity island, and jewel-box detailing throughout.',
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
      'Clean, handleless fronts and carefully planned storage make the space as functional as it is calm, a flexible backdrop for everyday cooking and entertaining alike.',
    ],
    details: [
      { label: 'Scope', value: 'Full-service design & cabinetry' },
      { label: 'Materials', value: 'Marble, walnut, lacquer' },
      { label: 'Style', value: 'Contemporary' },
    ],
    featured: false,
  },
  {
    slug: 'epiphany-cafe',
    title: 'Epiphany Café',
    type: 'Commercial',
    category: 'Hospitality',
    location: 'Tijuana, MX',
    year: '2025',
    blurb: 'A warm, daylit coffee house in timber, cane, and terracotta tile.',
    intro:
      'A full-service coffee house designed end to end, with warm timber millwork, arched alcoves, cane detailing, and a hand-laid terracotta floor.',
    body: [
      'Epiphany Café was designed as a neighborhood coffee house with a relaxed, sunlit feel. Warm timber millwork wraps the room, from the service counter to the open display shelving, while arched alcoves and cane panels add texture and rhythm.',
      'A hand-laid terracotta floor grounds the space in warmth, and a central skylight keeps it bright through the day. Custom banquettes and a mix of communal and intimate seating make it as comfortable for a quick espresso as for a long afternoon.',
    ],
    details: [
      { label: 'Scope', value: 'Full commercial fit-out' },
      { label: 'Program', value: 'Café & coffee counter' },
      { label: 'Materials', value: 'Timber, cane, terracotta tile' },
    ],
    featured: true,
  },
  {
    slug: 'epiphany-coffee-bar',
    title: 'Epiphany Coffee Bar',
    type: 'Commercial',
    category: 'Hospitality',
    location: 'Tijuana, MX',
    year: '2025',
    blurb: 'A compact espresso-bar format in timber and white tile, with an order window.',
    intro:
      'A compact espresso-bar concept for the Epiphany brand, a tightly planned counter with display shelving and a tiled “order here” service window.',
    body: [
      'The Epiphany Coffee Bar distills the brand into a compact, high-efficiency format. Every element of the counter was planned around the barista’s workflow, with display shelving for cups and retail and a clear line to the espresso machine.',
      'A tiled “order here” window and a warm timber storefront make the bar approachable from the street, while a few outdoor seats invite people to linger. It is a small footprint designed to feel generous.',
    ],
    details: [
      { label: 'Scope', value: 'Commercial fit-out' },
      { label: 'Program', value: 'Espresso bar & counter' },
      { label: 'Materials', value: 'Timber, white tile, brass' },
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
