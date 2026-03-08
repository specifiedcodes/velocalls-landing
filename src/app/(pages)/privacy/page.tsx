import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | VeloCalls",
  description:
    "Learn how VeloCalls collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Last updated: January 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass-card p-8 sm:p-12 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                1. Information We Collect
              </h2>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Personal Information
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                When you create an account or use our Service, we may collect the following personal
                information: name, email address, phone number, billing address, company name,
                payment information (processed securely through our payment processor), and IP address
                and device information.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Call Data
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                As part of providing our call tracking and routing services, we process call metadata
                including caller phone numbers, call duration, call timestamps, geographic information
                derived from phone numbers, call recordings (when enabled by you), AI-generated
                transcriptions and analytics, and IVR interaction data.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Usage Data
              </h3>
              <p className="text-muted leading-relaxed">
                We automatically collect information about how you interact with the Service, including
                pages visited, features used, browser type and version, operating system, referral
                URLs, and session duration and frequency.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                We use the information we collect for the following purposes:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li>To provide, maintain, and improve the Service</li>
                <li>To process transactions and send related billing information</li>
                <li>To send you technical notices, updates, security alerts, and support messages</li>
                <li>To respond to your comments, questions, and customer service requests</li>
                <li>To monitor and analyze trends, usage, and activities in connection with the Service</li>
                <li>To detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                <li>To personalize and improve your experience with the Service</li>
                <li>To comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. Information Sharing
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                We do not sell your personal information. We may share your information in the following
                circumstances:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li>With service providers who perform services on our behalf (hosting, payment processing, analytics)</li>
                <li>With your consent or at your direction</li>
                <li>To comply with legal obligations, court orders, or governmental requests</li>
                <li>To protect the rights, privacy, safety, or property of VeloCalls, our users, or the public</li>
                <li>In connection with a merger, acquisition, or sale of assets, with appropriate notice to users</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Cookies and Tracking Technologies
              </h2>
              <p className="text-muted leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our Service and
                hold certain information. Cookies are files with a small amount of data sent to your
                browser from a website and stored on your device. You can instruct your browser to
                refuse all cookies or indicate when a cookie is being sent. For detailed information,
                please see our Cookie Policy.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Data Security
              </h2>
              <p className="text-muted leading-relaxed">
                We implement appropriate technical and organizational security measures to protect your
                personal information. This includes encryption of data in transit using TLS 1.3,
                encryption of data at rest using AES-256, regular security audits and penetration
                testing, role-based access controls, and monitoring and logging of all data access.
                However, no method of transmission over the Internet or electronic storage is 100%
                secure, and we cannot guarantee absolute security.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Your Rights
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Depending on your location, you may have the following rights regarding your personal
                information:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li>Right to access the personal information we hold about you</li>
                <li>Right to correct inaccurate or incomplete personal information</li>
                <li>Right to delete your personal information</li>
                <li>Right to restrict or object to our processing of your personal information</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                To exercise any of these rights, please contact us at{" "}
                <a href="mailto:privacy@velocalls.com" className="text-primary hover:text-primary-light transition-colors">
                  privacy@velocalls.com
                </a>
                .
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. GDPR Compliance
              </h2>
              <p className="text-muted leading-relaxed">
                If you are a resident of the European Economic Area (EEA), you have certain data
                protection rights under the General Data Protection Regulation (GDPR). We process your
                data based on legitimate business interests, the performance of a contract with you,
                compliance with legal obligations, and your consent where applicable. For more
                information about our GDPR compliance, please see our dedicated GDPR page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Data Retention
              </h2>
              <p className="text-muted leading-relaxed">
                We retain your personal information for as long as your account is active or as needed
                to provide the Service. Call recordings are retained for the period specified in your
                account settings (default 90 days). Transcription data is retained for the duration of
                your subscription. We will delete or anonymize your information upon request, subject
                to any legal retention requirements.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Children&apos;s Privacy
              </h2>
              <p className="text-muted leading-relaxed">
                Our Service is not directed to individuals under the age of 18. We do not knowingly
                collect personal information from children. If you become aware that a child has
                provided us with personal information, please contact us and we will take steps to
                delete such information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Contact Us
              </h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:privacy@velocalls.com" className="text-primary hover:text-primary-light transition-colors">
                  privacy@velocalls.com
                </a>{" "}
                or write to us at: VeloCalls, Inc., 123 Innovation Drive, Suite 400, Wilmington, DE 19801, United States.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
