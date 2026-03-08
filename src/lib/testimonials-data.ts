/**
 * Testimonials Data
 *
 * Centralized testimonials data that can be easily updated without
 * modifying component code. This acts as a simple CMS substitute.
 *
 * To update testimonials:
 * 1. Edit this file to add/modify/remove testimonials
 * 2. Redeploy the landing page
 *
 * For a full CMS solution, replace this with API calls to
 * Sanity, Contentful, or Strapi.
 *
 * Based on Story 19.1: Testimonials (Deferred Item #41)
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  initials: string;
  avatarUrl?: string;
  featured?: boolean;
}

/**
 * Default testimonials data
 *
 * Edit this array to update the testimonials displayed on the landing page.
 */
export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Sarah Mitchell',
    role: 'VP of Operations',
    company: 'PeakLeads Media',
    content:
      'VeloCalls transformed our call routing completely. The real-time bidding engine alone increased our revenue by 40%. The AI transcription saves our QA team hours every single day.',
    rating: 5,
    initials: 'SM',
    featured: true,
  },
  {
    id: 'testimonial-2',
    name: 'James Rodriguez',
    role: 'Director of Performance Marketing',
    company: 'CallScale Partners',
    content:
      'We switched from a legacy platform and saw immediate results. The visual IVR builder is incredibly intuitive, and the compliance features give us peace of mind with DNC and TCPA regulations.',
    rating: 5,
    initials: 'JR',
    featured: true,
  },
  {
    id: 'testimonial-3',
    name: 'Emily Chen',
    role: 'CEO',
    company: 'NexGen Call Networks',
    content:
      'The publisher and buyer portals are game-changers. Our partners can self-serve, manage their own analytics, and dispute calls — all without touching our support team. Scaling has never been easier.',
    rating: 5,
    initials: 'EC',
    featured: true,
  },
];

/**
 * Get all testimonials
 */
export function getTestimonials(): Testimonial[] {
  return testimonials;
}

/**
 * Get featured testimonials only
 */
export function getFeaturedTestimonials(): Testimonial[] {
  return testimonials.filter((t) => t.featured);
}

/**
 * Get a random subset of testimonials
 */
export function getRandomTestimonials(count: number = 3): Testimonial[] {
  const shuffled = [...testimonials].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
