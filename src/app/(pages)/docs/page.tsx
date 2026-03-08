import type { Metadata } from "next";
import { ArrowRight, Code2, Webhook, Key, BookOpen } from "lucide-react";
import { DASHBOARD_URL } from "@/lib/config";

export const metadata: Metadata = {
  title: "API Documentation | VeloCalls",
  description:
    "Explore the VeloCalls API. Build integrations, automate workflows, and extend the platform with our comprehensive REST API.",
};

const apiFeatures = [
  {
    icon: Code2,
    title: "RESTful API",
    description:
      "A comprehensive REST API with JSON request/response format. Full CRUD operations for campaigns, buyers, publishers, phone numbers, and more.",
  },
  {
    icon: Webhook,
    title: "Real-Time Webhooks",
    description:
      "Receive instant notifications for call events, status changes, and system alerts. Configure webhook endpoints with retry logic and signature verification.",
  },
  {
    icon: Key,
    title: "API Key Authentication",
    description:
      "Secure API key-based authentication with scoped permissions. Create multiple keys with different access levels for various integration needs.",
  },
  {
    icon: BookOpen,
    title: "Interactive Documentation",
    description:
      "Full Swagger/OpenAPI documentation with try-it-now functionality. Test API endpoints directly from your browser with your API key.",
  },
];

const endpoints = [
  { method: "GET", path: "/api/v1/campaigns", description: "List all campaigns" },
  { method: "POST", path: "/api/v1/campaigns", description: "Create a new campaign" },
  { method: "GET", path: "/api/v1/calls", description: "List call records with filters" },
  { method: "GET", path: "/api/v1/calls/:id/recording", description: "Get call recording" },
  { method: "GET", path: "/api/v1/buyers", description: "List all buyers" },
  { method: "POST", path: "/api/v1/buyers", description: "Create a new buyer" },
  { method: "GET", path: "/api/v1/publishers", description: "List all publishers" },
  { method: "GET", path: "/api/v1/phone-numbers", description: "List phone numbers" },
  { method: "POST", path: "/api/v1/phone-numbers/provision", description: "Provision new numbers" },
  { method: "GET", path: "/api/v1/analytics/summary", description: "Get analytics summary" },
];

export default function DocsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            API Documentation
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Build powerful integrations with the VeloCalls API. Everything you need to automate
            and extend your call tracking workflows.
          </p>
          <div className="mt-8">
            <a
              href={`${DASHBOARD_URL}/settings/api-docs`}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-indigo-700 transition-all duration-300 hover:bg-white/90 hover:shadow-lg hover:-translate-y-0.5"
            >
              Open Interactive Docs
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* API Features */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {apiFeatures.map((feature) => (
              <div key={feature.title} className="glass-card p-8">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* API Endpoints Preview */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            API <span className="gradient-text">Endpoints</span>
          </h2>
          <p className="text-center text-muted mb-12 max-w-xl mx-auto">
            A preview of available endpoints. Visit the interactive documentation for complete details,
            request/response schemas, and code examples.
          </p>
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--divider)' }}>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Method</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Endpoint</th>
                    <th className="text-left px-6 py-4 font-semibold text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.map((endpoint, i) => (
                    <tr key={i} style={{ borderBottom: i < endpoints.length - 1 ? '1px solid var(--divider)' : 'none' }}>
                      <td className="px-6 py-3">
                        <span
                          className={`inline-block rounded px-2 py-0.5 text-xs font-bold ${
                            endpoint.method === "GET"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                              : "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                          }`}
                        >
                          {endpoint.method}
                        </span>
                      </td>
                      <td className="px-6 py-3 font-mono text-xs text-foreground">
                        {endpoint.path}
                      </td>
                      <td className="px-6 py-3 text-muted">
                        {endpoint.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Quick Start
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Get started with the VeloCalls API in three simple steps:
            </p>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                  1
                </span>
                <div>
                  <p className="font-semibold text-foreground">Generate an API Key</p>
                  <p className="text-sm text-muted">
                    Navigate to Settings &gt; API Keys in your dashboard and create a new key with
                    the appropriate permissions.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                  2
                </span>
                <div>
                  <p className="font-semibold text-foreground">Make Your First Request</p>
                  <p className="text-sm text-muted">
                    Use the API key in the Authorization header to make authenticated requests to any
                    endpoint.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-sm font-bold text-white">
                  3
                </span>
                <div>
                  <p className="font-semibold text-foreground">Set Up Webhooks</p>
                  <p className="text-sm text-muted">
                    Configure webhook endpoints to receive real-time notifications for call events,
                    status changes, and more.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <div className="glass-card p-8 sm:p-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">
              Ready to Build?
            </h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              Explore the full interactive API documentation with try-it-now functionality.
            </p>
            <a
              href={`${DASHBOARD_URL}/settings/api-docs`}
              className="btn-primary"
            >
              View Full API Docs
              <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
