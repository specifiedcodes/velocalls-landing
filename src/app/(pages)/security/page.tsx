import type { Metadata } from "next";
import { Shield, Lock, Server, Eye, AlertTriangle, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Security | VeloCalls",
  description:
    "Learn about VeloCalls security practices, infrastructure protection, and compliance certifications.",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "Encryption",
    description:
      "All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. API keys and sensitive credentials are stored using industry-standard key management systems.",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description:
      "Our infrastructure is hosted on AWS with multi-region redundancy. We leverage VPCs, security groups, and WAF to protect against unauthorized access and DDoS attacks.",
  },
  {
    icon: Shield,
    title: "Access Controls",
    description:
      "We implement strict role-based access controls (RBAC) with the principle of least privilege. All administrative access requires multi-factor authentication (MFA).",
  },
  {
    icon: Eye,
    title: "Monitoring & Logging",
    description:
      "Comprehensive logging of all system activities with real-time monitoring and alerting. Logs are retained for a minimum of 12 months and are tamper-proof.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description:
      "We maintain a documented incident response plan with defined roles, communication protocols, and recovery procedures. Our team conducts regular tabletop exercises.",
  },
  {
    icon: FileCheck,
    title: "Compliance",
    description:
      "VeloCalls maintains SOC 2 Type II certification and is GDPR compliant. We undergo regular third-party penetration testing and security audits.",
  },
];

export default function SecurityPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Security
          </h1>
          <p className="mt-4 text-lg text-white/70 max-w-2xl mx-auto">
            Protecting your data is our top priority. Learn about the measures we take to keep your
            information safe.
          </p>
        </div>
      </section>

      {/* Security Features Grid */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
            {securityFeatures.map((feature) => (
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

          {/* Detailed Security Content */}
          <div className="mx-auto max-w-3xl">
            <div className="glass-card p-8 sm:p-12 space-y-10">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Application Security
                </h2>
                <p className="text-muted leading-relaxed mb-4">
                  Our development team follows secure coding practices based on the OWASP Top 10.
                  Every code change undergoes peer review and automated security scanning before
                  deployment. We maintain a comprehensive suite of security tests that run as part
                  of our CI/CD pipeline.
                </p>
                <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                  <li>Static Application Security Testing (SAST) on every pull request</li>
                  <li>Dynamic Application Security Testing (DAST) in staging environments</li>
                  <li>Dependency vulnerability scanning with automated alerts</li>
                  <li>Container image scanning before deployment</li>
                  <li>Regular third-party penetration testing (quarterly)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Network Security
                </h2>
                <p className="text-muted leading-relaxed">
                  Our network architecture is designed with defense in depth. We use Virtual Private
                  Clouds (VPCs) to isolate environments, Web Application Firewalls (WAF) to protect
                  against common attack vectors, DDoS protection through AWS Shield Advanced,
                  intrusion detection and prevention systems (IDS/IPS), and network segmentation to
                  limit blast radius. All internal service-to-service communication is encrypted and
                  authenticated using mutual TLS.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Data Protection
                </h2>
                <p className="text-muted leading-relaxed">
                  We implement multiple layers of data protection. Database backups are encrypted and
                  stored in geographically separate regions. Call recordings are encrypted with
                  customer-specific keys. Personal data is pseudonymized where possible. Data
                  deletion requests are processed within 30 days with cryptographic verification.
                  We maintain a data classification policy that ensures sensitive data receives
                  appropriate handling throughout its lifecycle.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Compliance Certifications
                </h2>
                <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                  <li>SOC 2 Type II certified</li>
                  <li>GDPR compliant</li>
                  <li>CCPA compliant</li>
                  <li>PCI DSS Level 1 (via payment processor)</li>
                  <li>HIPAA Business Associate Agreements available for healthcare customers</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Responsible Disclosure
                </h2>
                <p className="text-muted leading-relaxed mb-4">
                  We value the security research community and welcome responsible disclosure of
                  security vulnerabilities. If you believe you have found a security vulnerability
                  in our Service, please report it to us at{" "}
                  <a href="mailto:security@velocalls.com" className="text-primary hover:text-primary-light transition-colors">
                    security@velocalls.com
                  </a>
                  .
                </p>
                <p className="text-muted leading-relaxed">
                  We commit to acknowledging receipt within 24 hours, providing an initial assessment
                  within 72 hours, keeping you informed of our progress, and not pursuing legal action
                  against good-faith security researchers. We do not currently offer a bug bounty
                  program, but we recognize and thank researchers who report valid vulnerabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
