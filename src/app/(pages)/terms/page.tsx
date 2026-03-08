import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | VeloCalls",
  description:
    "Read the VeloCalls Terms of Service governing the use of our call tracking and routing platform.",
};

export default function TermsPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Terms of Service
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
                1. Acceptance of Terms
              </h2>
              <p className="text-muted leading-relaxed">
                By accessing or using the VeloCalls platform (&quot;Service&quot;), you agree to be bound by
                these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, do not
                use the Service. These Terms apply to all visitors, users, and others who access or use
                the Service. By using the Service, you represent that you are at least 18 years of age
                and have the legal capacity to enter into a binding agreement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                2. Description of Service
              </h2>
              <p className="text-muted leading-relaxed">
                VeloCalls provides a cloud-based call tracking, routing, and analytics platform for
                businesses. The Service includes, but is not limited to, call tracking and attribution,
                intelligent call routing, real-time bidding for calls, interactive voice response (IVR)
                building, AI-powered call transcription and analysis, publisher and buyer management
                portals, phone number provisioning and management, compliance tools including DNC
                scrubbing and TCPA enforcement, and reporting and analytics dashboards. We reserve the
                right to modify, suspend, or discontinue any part of the Service at any time with
                reasonable notice.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                3. User Accounts
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                To access certain features of the Service, you must create an account. You agree to
                provide accurate, current, and complete information during registration and to keep your
                account information updated. You are responsible for safeguarding the password that you
                use to access the Service and for any activities or actions under your password.
              </p>
              <p className="text-muted leading-relaxed">
                You must notify VeloCalls immediately upon becoming aware of any breach of security or
                unauthorized use of your account. VeloCalls will not be liable for any loss arising from
                unauthorized use of your account. You may not use another user&apos;s account without
                permission. You may not create accounts through automated means or under false pretenses.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                4. Acceptable Use
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                You agree not to use the Service for any unlawful purpose or in any way that could
                damage, disable, overburden, or impair the Service. Specifically, you agree not to:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li>Violate any applicable local, state, national, or international law or regulation</li>
                <li>Transmit any material that is abusive, harassing, tortious, defamatory, or invasive of another&apos;s privacy</li>
                <li>Use the Service to make unsolicited calls in violation of telemarketing regulations including the Telephone Consumer Protection Act (TCPA)</li>
                <li>Attempt to gain unauthorized access to other computer systems or networks connected to the Service</li>
                <li>Interfere with or disrupt the Service or servers or networks connected to the Service</li>
                <li>Use any robot, spider, or other automated device to access the Service</li>
                <li>Resell or redistribute the Service without prior written consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                5. Payment Terms
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Certain features of the Service require payment. You agree to pay all fees associated
                with your selected plan. All fees are non-refundable except as expressly stated in these
                Terms or required by applicable law.
              </p>
              <p className="text-muted leading-relaxed mb-4">
                Usage-based charges, including per-minute call charges, phone number fees, and carrier
                costs, are billed monthly in arrears based on actual usage. Subscription fees are billed
                in advance on a monthly or annual basis depending on your chosen billing cycle.
              </p>
              <p className="text-muted leading-relaxed">
                VeloCalls reserves the right to change pricing with 30 days&apos; notice. Continued use
                of the Service after a price change constitutes acceptance of the new pricing. If
                payment is not received within 15 days of the due date, VeloCalls may suspend or
                terminate your account.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                6. Intellectual Property
              </h2>
              <p className="text-muted leading-relaxed">
                The Service and its original content, features, and functionality are owned by VeloCalls
                and are protected by international copyright, trademark, patent, trade secret, and other
                intellectual property laws. You retain ownership of all data you submit to the Service.
                By using the Service, you grant VeloCalls a limited license to use your data solely for
                the purpose of providing the Service to you. VeloCalls does not claim ownership of your
                call recordings, transcriptions, or analytics data.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                7. Data Privacy
              </h2>
              <p className="text-muted leading-relaxed">
                Your use of the Service is also governed by our Privacy Policy, which is incorporated
                into these Terms by reference. Please review our Privacy Policy to understand our
                practices regarding the collection and use of your personal information. You are
                responsible for ensuring that your use of the Service complies with all applicable data
                protection and privacy laws, including obtaining any necessary consents from callers
                for call recording and data processing.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                8. Limitation of Liability
              </h2>
              <p className="text-muted leading-relaxed">
                To the maximum extent permitted by applicable law, VeloCalls shall not be liable for any
                indirect, incidental, special, consequential, or punitive damages, or any loss of
                profits or revenues, whether incurred directly or indirectly, or any loss of data, use,
                goodwill, or other intangible losses, resulting from your use of the Service; any
                unauthorized access to or use of our servers; any interruption or cessation of
                transmission to or from the Service; any bugs, viruses, or similar issues transmitted
                through the Service; or any errors or omissions in any content. In no event shall
                VeloCalls&apos; aggregate liability exceed the amount you paid to VeloCalls in the twelve
                months preceding the event giving rise to the claim.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                9. Termination
              </h2>
              <p className="text-muted leading-relaxed">
                We may terminate or suspend your access to the Service immediately, without prior notice
                or liability, for any reason, including if you breach these Terms. Upon termination,
                your right to use the Service will immediately cease. You may terminate your account at
                any time by contacting us or using the account settings. Upon termination, we will
                make your data available for export for a period of 30 days, after which it may be
                permanently deleted.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                10. Governing Law
              </h2>
              <p className="text-muted leading-relaxed">
                These Terms shall be governed by and construed in accordance with the laws of the State
                of Delaware, United States, without regard to its conflict of law provisions. Any
                disputes arising from these Terms or the Service shall be resolved through binding
                arbitration in accordance with the rules of the American Arbitration Association. The
                arbitration shall take place in Wilmington, Delaware. Nothing in these Terms shall
                prevent either party from seeking injunctive relief in a court of competent jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-muted leading-relaxed">
                We reserve the right to modify these Terms at any time. We will provide notice of
                material changes by posting the updated Terms on the Service and updating the &quot;Last
                updated&quot; date. Your continued use of the Service after any changes constitutes
                acceptance of the new Terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                12. Contact Us
              </h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:legal@velocalls.com" className="text-primary hover:text-primary-light transition-colors">
                  legal@velocalls.com
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
