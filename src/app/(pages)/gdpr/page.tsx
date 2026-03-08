import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GDPR Compliance | VeloCalls",
  description:
    "Learn about VeloCalls GDPR compliance, data processing practices, and your rights as a data subject.",
};

export default function GDPRPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            GDPR Compliance
          </h1>
          <p className="mt-4 text-lg text-white/70">
            Our commitment to data protection under the General Data Protection Regulation
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="glass-card p-8 sm:p-12 space-y-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Our Commitment to GDPR
              </h2>
              <p className="text-muted leading-relaxed">
                VeloCalls is committed to protecting the privacy and rights of individuals in the
                European Economic Area (EEA) and the United Kingdom. We have implemented comprehensive
                measures to ensure our compliance with the General Data Protection Regulation (EU)
                2016/679 (&quot;GDPR&quot;) and the UK GDPR. This page outlines our data processing practices
                and your rights as a data subject.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Processing
              </h2>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Data Controller vs. Data Processor
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                VeloCalls acts as both a data controller and a data processor depending on the context.
                We are a data controller for personal data we collect directly from you, such as
                account information and billing details. We act as a data processor for call data and
                related information that you process through our platform on behalf of your customers
                and business partners.
              </p>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Categories of Data Processed
              </h3>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li>Account data: name, email, company information</li>
                <li>Billing data: payment method, billing address, transaction history</li>
                <li>Call data: phone numbers, call metadata, recordings, transcriptions</li>
                <li>Usage data: platform activity, feature usage, session information</li>
                <li>Technical data: IP addresses, browser information, device identifiers</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Legal Basis for Processing
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                We process personal data under the following legal bases as defined by GDPR Article 6:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li><strong className="text-foreground">Contractual necessity</strong> (Art. 6(1)(b)): Processing necessary to perform our contract with you, including providing the call tracking and routing service</li>
                <li><strong className="text-foreground">Legitimate interests</strong> (Art. 6(1)(f)): Processing necessary for our legitimate business interests, such as improving the Service, fraud prevention, and security</li>
                <li><strong className="text-foreground">Legal obligation</strong> (Art. 6(1)(c)): Processing necessary to comply with applicable laws and regulations</li>
                <li><strong className="text-foreground">Consent</strong> (Art. 6(1)(a)): Processing based on your freely given consent, such as marketing communications</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Subject Rights
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Under the GDPR, you have the following rights regarding your personal data:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li><strong className="text-foreground">Right of Access</strong> (Art. 15): Request a copy of all personal data we hold about you</li>
                <li><strong className="text-foreground">Right to Rectification</strong> (Art. 16): Request correction of inaccurate personal data</li>
                <li><strong className="text-foreground">Right to Erasure</strong> (Art. 17): Request deletion of your personal data (&quot;right to be forgotten&quot;)</li>
                <li><strong className="text-foreground">Right to Restriction</strong> (Art. 18): Request restriction of processing of your personal data</li>
                <li><strong className="text-foreground">Right to Data Portability</strong> (Art. 20): Receive your data in a structured, machine-readable format</li>
                <li><strong className="text-foreground">Right to Object</strong> (Art. 21): Object to processing based on legitimate interests or direct marketing</li>
                <li><strong className="text-foreground">Right to Withdraw Consent</strong> (Art. 7(3)): Withdraw consent at any time without affecting prior processing</li>
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                We respond to all data subject requests within 30 days. To exercise your rights, contact
                our Data Protection Officer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                International Data Transfers
              </h2>
              <p className="text-muted leading-relaxed">
                VeloCalls is based in the United States. When we transfer personal data from the EEA or
                UK to the US, we rely on Standard Contractual Clauses (SCCs) approved by the European
                Commission as our primary transfer mechanism. We also implement supplementary technical
                and organizational measures to ensure an adequate level of data protection. We maintain
                Data Processing Agreements (DPAs) with all sub-processors that handle EEA personal
                data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Protection Officer
              </h2>
              <p className="text-muted leading-relaxed">
                We have appointed a Data Protection Officer (DPO) to oversee our GDPR compliance. You
                can contact our DPO at{" "}
                <a href="mailto:dpo@velocalls.com" className="text-primary hover:text-primary-light transition-colors">
                  dpo@velocalls.com
                </a>{" "}
                or write to: Data Protection Officer, VeloCalls, Inc., 123 Innovation Drive, Suite 400,
                Wilmington, DE 19801, United States.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Data Breach Notification
              </h2>
              <p className="text-muted leading-relaxed">
                In the event of a personal data breach, VeloCalls will notify the relevant supervisory
                authority within 72 hours of becoming aware of the breach, as required by GDPR Article
                33. Where the breach is likely to result in a high risk to the rights and freedoms of
                individuals, we will also notify affected data subjects without undue delay.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Supervisory Authority
              </h2>
              <p className="text-muted leading-relaxed">
                If you are located in the EEA or UK and believe that our processing of your personal
                data infringes the GDPR, you have the right to lodge a complaint with your local
                supervisory authority. A list of EEA supervisory authorities is available at the
                European Data Protection Board website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
