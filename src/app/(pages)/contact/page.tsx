import type { Metadata } from "next";
import { Mail, MapPin, Clock, Phone } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | VeloCalls",
  description:
    "Get in touch with VeloCalls. Contact our sales, support, or partnerships team.",
};

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    details: ["sales@velocalls.com", "support@velocalls.com"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["+1 (888) 555-VELO", "+1 (302) 555-0199"],
  },
  {
    icon: MapPin,
    title: "Office",
    details: ["123 Innovation Drive", "Suite 400", "Wilmington, DE 19801"],
  },
  {
    icon: Clock,
    title: "Support Hours",
    details: ["Monday - Friday: 8am - 8pm EST", "Saturday: 9am - 5pm EST", "Sunday: Closed"],
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Have a question or want to learn more? We would love to hear from you.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="glass-card p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Send Us a Message
              </h2>
              <form className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                      style={{ background: 'var(--surface)', border: '1px solid var(--glass-card-border)' }}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                      style={{ background: 'var(--surface)', border: '1px solid var(--glass-card-border)' }}
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ background: 'var(--surface)', border: '1px solid var(--glass-card-border)' }}
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ background: 'var(--surface)', border: '1px solid var(--glass-card-border)' }}
                    placeholder="Acme Corp"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full rounded-lg px-4 py-3 text-sm text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
                    style={{ background: 'var(--surface)', border: '1px solid var(--glass-card-border)' }}
                  >
                    <option value="">Select a topic</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnerships">Partnerships</option>
                    <option value="billing">Billing Question</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    style={{ background: 'var(--surface)', border: '1px solid var(--glass-card-border)' }}
                    placeholder="Tell us how we can help..."
                  />
                </div>
                <button
                  type="button"
                  className="btn-primary w-full"
                >
                  Send Message
                </button>
                <p className="text-xs text-muted text-center">
                  By submitting this form, you agree to our Privacy Policy.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <div key={item.title} className="glass-card p-6 flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500">
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {item.title}
                    </h3>
                    {item.details.map((detail) => (
                      <p key={detail} className="text-sm text-muted">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Map placeholder */}
              <div className="glass-card p-8 text-center">
                <div
                  className="rounded-lg flex items-center justify-center h-48 mb-4"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="text-center">
                    <MapPin className="h-8 w-8 text-muted mx-auto mb-2" />
                    <p className="text-sm text-muted">Interactive map coming soon</p>
                  </div>
                </div>
                <p className="text-sm text-muted">
                  123 Innovation Drive, Suite 400, Wilmington, DE 19801
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
