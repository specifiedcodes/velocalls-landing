/**
 * Testimonials API Route
 *
 * Serves testimonials data for the landing page.
 * Provides a simple API that could be replaced with a CMS integration.
 *
 * GET /api/testimonials
 * Query params:
 *   - featured=true: Return only featured testimonials
 *   - limit=N: Limit number of results
 *
 * Based on Story 19.1: Testimonials (Deferred Item #41)
 */

import { NextResponse } from 'next/server';
import { getTestimonials, getFeaturedTestimonials, type Testimonial } from '@/lib/testimonials-data';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured') === 'true';
    const limit = searchParams.get('limit');

    let testimonials: Testimonial[];

    if (featured) {
      testimonials = getFeaturedTestimonials();
    } else {
      testimonials = getTestimonials();
    }

    // Apply limit if specified
    if (limit) {
      const limitNum = parseInt(limit, 10);
      if (!isNaN(limitNum) && limitNum > 0) {
        testimonials = testimonials.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      data: testimonials,
      count: testimonials.length,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch testimonials',
      },
      { status: 500 }
    );
  }
}
