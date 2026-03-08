/**
 * Public Pricing Page with Calculator (Story 39.4)
 *
 * Unauthenticated public page showing:
 * - Markup tier table (20% -> 15% -> 10% -> 5%)
 * - BYOC platform fee table (2c -> 1.5c -> 1c -> 0.5c)
 * - Add-on services with pricing
 * - Interactive calculator: input expected call minutes -> see estimated monthly cost at each tier
 * - Enter 50,000 minutes -> see estimated costs for both platform and BYOC modes
 *
 * Based on:
 * - Story 39.4: Build public pricing page with calculator
 * - Spec Section 11.3
 */

import type { Metadata } from 'next';
import { PricingPageClient } from './pricing-client';

export const metadata: Metadata = {
  title: 'Pricing | VeloCalls',
  description:
    'Transparent, volume-based pricing for call tracking and routing. The more you use, the cheaper it gets. See our markup tiers, BYOC rates, and add-on services.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
