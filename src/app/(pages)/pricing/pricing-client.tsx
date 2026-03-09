/**
 * Pricing Page Client Component (Story 39.4)
 *
 * Interactive pricing page with:
 * - Platform per-minute tier table
 * - BYOC per-minute tier table
 * - Add-on services
 * - Cost calculator for both modes
 */

'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  Check,
  Phone,
  Server,
  Headphones,
  FileText,
  Brain,
  BarChart3,
} from 'lucide-react';

// ============================================
// Static Pricing Data
// ============================================

const PLATFORM_TIERS = [
  {
    name: 'Starter',
    minuteRange: '0 - 10,000',
    ratePerMinute: 4.0,
    description: 'Standard rate for getting started.',
  },
  {
    name: 'Growth',
    minuteRange: '10,000 - 50,000',
    ratePerMinute: 3.0,
    description: 'Volume rate for growing businesses.',
  },
  {
    name: 'Scale',
    minuteRange: '50,000 - 200,000',
    ratePerMinute: 2.5,
    description: 'High volume rate for scaling teams.',
  },
  {
    name: 'Enterprise',
    minuteRange: '200,000+',
    ratePerMinute: 2.0,
    description: 'Enterprise rate for maximum savings.',
  },
];

const PLATFORM_FEE_TIERS = [
  {
    name: 'Starter',
    minuteRange: '0 - 10,000',
    feePerMinute: 2.0,
    description: 'Standard BYOC rate.',
  },
  {
    name: 'Growth',
    minuteRange: '10,000 - 50,000',
    feePerMinute: 1.5,
    description: 'Volume BYOC rate.',
  },
  {
    name: 'Scale',
    minuteRange: '50,000 - 200,000',
    feePerMinute: 1.0,
    description: 'High volume BYOC rate.',
  },
  {
    name: 'Enterprise',
    minuteRange: '200,000+',
    feePerMinute: 0.5,
    description: 'Enterprise BYOC rate.',
  },
];

const ADDON_SERVICES = [
  {
    name: 'Call Recording',
    slug: 'recording',
    rate: 3,
    unit: 'per minute',
    description: 'Store call recordings for compliance and training.',
    icon: Headphones,
  },
  {
    name: 'Transcription',
    slug: 'transcription',
    rate: 4,
    unit: 'per minute',
    description: 'AI-powered call transcription for every conversation.',
    icon: FileText,
  },
  {
    name: 'AI Call Summary',
    slug: 'ai_summary',
    rate: 10,
    unit: 'per use',
    description: 'AI-generated call summary and action items.',
    icon: Brain,
  },
  {
    name: 'Sentiment Analysis',
    slug: 'sentiment',
    rate: 5,
    unit: 'per use',
    description: 'AI-powered caller sentiment analysis.',
    icon: BarChart3,
  },
];

// ============================================
// Calculator Logic
// ============================================

interface TierEstimate {
  tierName: string;
  rate: number;
  rateLabel: string;
  monthlyTotal: number;
  isCurrentTier: boolean;
}

function calculatePlatformEstimates(minutes: number): TierEstimate[] {
  let currentTierIdx = 0;
  if (minutes >= 200000) currentTierIdx = 3;
  else if (minutes >= 50000) currentTierIdx = 2;
  else if (minutes >= 10000) currentTierIdx = 1;

  return PLATFORM_TIERS.map((tier, idx) => {
    const total = (minutes * tier.ratePerMinute) / 100;
    return {
      tierName: tier.name,
      rate: tier.ratePerMinute,
      rateLabel: `${tier.ratePerMinute} cents/min`,
      monthlyTotal: total,
      isCurrentTier: idx === currentTierIdx,
    };
  });
}

function calculateByocEstimates(minutes: number): TierEstimate[] {
  let currentTierIdx = 0;
  if (minutes >= 200000) currentTierIdx = 3;
  else if (minutes >= 50000) currentTierIdx = 2;
  else if (minutes >= 10000) currentTierIdx = 1;

  return PLATFORM_FEE_TIERS.map((tier, idx) => {
    const total = (minutes * tier.feePerMinute) / 100;
    return {
      tierName: tier.name,
      rate: tier.feePerMinute,
      rateLabel: `${tier.feePerMinute} cents/min`,
      monthlyTotal: total,
      isCurrentTier: idx === currentTierIdx,
    };
  });
}

// ============================================
// Main Component
// ============================================

export function PricingPageClient() {
  const [minutes, setMinutes] = useState<string>('');
  const [showCalculator, setShowCalculator] = useState(false);

  const parsedMinutes = useMemo(() => {
    const val = parseInt(minutes, 10);
    return isNaN(val) || val < 0 ? 0 : val;
  }, [minutes]);

  const platformEstimates = useMemo(
    () => calculatePlatformEstimates(parsedMinutes),
    [parsedMinutes],
  );

  const byocEstimates = useMemo(
    () => calculateByocEstimates(parsedMinutes),
    [parsedMinutes],
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-950 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Transparent, Volume-Based Pricing
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            The more you use, the cheaper it gets. No hidden fees, no surprises.
            Simple per-minute pricing that drops as your usage grows.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="/register"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors"
            >
              Start Free Trial
            </a>
            <button
              onClick={() => {
                setShowCalculator(true);
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-6 py-3 text-sm font-semibold text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Try Calculator
            </button>
          </div>
        </div>
      </section>

      {/* Platform Markup Tiers */}
      <section className="py-16 bg-white dark:bg-gray-950" data-testid="markup-tiers-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:text-indigo-400 mb-4">
              <Phone className="h-4 w-4" />
              Platform Mode
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Managed Carriers
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              All-inclusive per-minute pricing. Your rate drops automatically as your
              lifetime usage grows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_TIERS.map((tier, idx) => (
              <div
                key={tier.name}
                className={`relative rounded-xl border p-6 transition-shadow hover:shadow-lg ${
                  idx === 2
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 dark:border-indigo-400'
                    : 'border-gray-200 dark:border-gray-800'
                }`}
                data-testid={`markup-tier-${idx}`}
              >
                {idx === 2 && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                      Popular
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Lifetime minutes
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tier.minuteRange}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {tier.ratePerMinute}¢
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    /min
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BYOC Platform Fee Tiers */}
      <section
        className="py-16 bg-gray-50 dark:bg-gray-900"
        data-testid="platform-fee-tiers-section"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 dark:bg-emerald-900/30 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 mb-4">
              <Server className="h-4 w-4" />
              BYOC Mode
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Bring Your Own Carrier
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connect your own SIP trunks and pay only a flat platform fee per minute.
              Your rate drops as lifetime usage grows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PLATFORM_FEE_TIERS.map((tier, idx) => (
              <div
                key={tier.name}
                className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 transition-shadow hover:shadow-lg"
                data-testid={`byoc-tier-${idx}`}
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {tier.name}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Lifetime minutes
                </p>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {tier.minuteRange}
                </p>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    {tier.feePerMinute}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    cents/min
                  </span>
                </div>
                <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                  {tier.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="py-16 bg-white dark:bg-gray-950" data-testid="addons-section">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Add-on Services
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Enhance your calls with AI-powered features. Pay only for what you use.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADDON_SERVICES.map((addon) => {
              const IconComponent = addon.icon;
              return (
                <div
                  key={addon.slug}
                  className="rounded-xl border border-gray-200 dark:border-gray-800 p-6 transition-shadow hover:shadow-lg"
                  data-testid={`addon-${addon.slug}`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                      <IconComponent className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      {addon.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {addon.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white">
                      {addon.rate}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      cents {addon.unit}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Calculator */}
      <section
        id="calculator"
        className="py-16 bg-gray-50 dark:bg-gray-900"
        data-testid="calculator-section"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 dark:bg-amber-900/30 px-4 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-400 mb-4">
              <Calculator className="h-4 w-4" />
              Cost Calculator
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Estimate Your Monthly Cost
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Enter your expected monthly call volume to see estimated costs
              across all tiers for both Platform and BYOC modes.
            </p>
          </div>

          {/* Input */}
          <div className="mx-auto max-w-md mb-10">
            <label
              htmlFor="minutes-input"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Expected Monthly Call Minutes
            </label>
            <div className="relative">
              <input
                id="minutes-input"
                type="number"
                min="0"
                step="1000"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                placeholder="e.g. 50000"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3 text-lg text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                data-testid="minutes-input"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                minutes/month
              </span>
            </div>
            {/* Quick presets */}
            <div className="mt-3 flex flex-wrap gap-2">
              {[5000, 10000, 25000, 50000, 100000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setMinutes(String(preset))}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                    parsedMinutes === preset
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400'
                      : 'border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-400'
                  }`}
                  data-testid={`preset-${preset}`}
                >
                  {preset.toLocaleString()} min
                </button>
              ))}
            </div>
          </div>

          {/* Results */}
          {parsedMinutes > 0 && (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2" data-testid="calculator-results">
              {/* Platform Mode Results */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-800 bg-indigo-50 dark:bg-indigo-900/20 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      Platform Mode
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    All-inclusive per-minute rate
                  </p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {platformEstimates.map((est) => (
                    <div
                      key={est.tierName}
                      className={`flex items-center justify-between px-6 py-4 ${
                        est.isCurrentTier
                          ? 'bg-indigo-50/50 dark:bg-indigo-900/10'
                          : ''
                      }`}
                      data-testid={`platform-estimate-${est.tierName}`}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {est.tierName}
                          {est.isCurrentTier && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-indigo-100 dark:bg-indigo-900/40 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:text-indigo-400">
                              <Check className="mr-0.5 h-3 w-3" />
                              Your tier
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {est.rateLabel}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ${est.monthlyTotal.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">
                          /month
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BYOC Mode Results */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden">
                <div className="border-b border-gray-200 dark:border-gray-800 bg-emerald-50 dark:bg-emerald-900/20 px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Server className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                      BYOC Mode
                    </h3>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Platform fee only (you pay carrier directly)
                  </p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                  {byocEstimates.map((est) => (
                    <div
                      key={est.tierName}
                      className={`flex items-center justify-between px-6 py-4 ${
                        est.isCurrentTier
                          ? 'bg-emerald-50/50 dark:bg-emerald-900/10'
                          : ''
                      }`}
                      data-testid={`byoc-estimate-${est.tierName}`}
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {est.tierName}
                          {est.isCurrentTier && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-400">
                              <Check className="mr-0.5 h-3 w-3" />
                              Your tier
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {est.rateLabel}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          ${est.monthlyTotal.toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-400">
                          /month
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {parsedMinutes === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400" data-testid="calculator-empty">
              Enter your expected monthly minutes above to see cost estimates.
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 dark:bg-indigo-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Start with a free trial. No credit card required. Scale up as you grow.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="/register"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50 transition-colors"
            >
              Start Free Trial
            </a>
            <a
              href="/contact"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Contact Sales
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
