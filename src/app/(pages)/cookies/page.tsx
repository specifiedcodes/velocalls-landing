import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy | VeloCalls",
  description:
    "Learn about the cookies VeloCalls uses, their purpose, and how to manage them.",
};

export default function CookiesPage() {
  return (
    <>
      {/* Hero Banner */}
      <section className="page-hero py-20 sm:py-28">
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">
            Cookie Policy
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
                What Are Cookies
              </h2>
              <p className="text-muted leading-relaxed">
                Cookies are small text files that are placed on your computer or mobile device when you
                visit a website. They are widely used to make websites work more efficiently, provide
                information to the owners of the site, and improve the user experience. Cookies can be
                &quot;persistent&quot; or &quot;session&quot; cookies. Persistent cookies remain on your device when you go
                offline, while session cookies are deleted as soon as you close your web browser.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Types of Cookies We Use
              </h2>

              <h3 className="text-lg font-semibold text-foreground mb-2 mt-6">
                Essential Cookies
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                These cookies are necessary for the website to function and cannot be switched off. They
                are usually set in response to actions made by you, such as setting your privacy
                preferences, logging in, or filling in forms. These include session identification
                cookies, authentication tokens, CSRF protection tokens, and load balancing cookies.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                Performance Cookies
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                These cookies allow us to count visits and traffic sources so we can measure and improve
                the performance of our site. They help us understand which pages are the most and least
                popular and see how visitors move around the site. All information these cookies collect
                is aggregated and therefore anonymous. We use services such as Google Analytics to
                collect this data.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                Functional Cookies
              </h3>
              <p className="text-muted leading-relaxed mb-4">
                These cookies enable the website to provide enhanced functionality and personalization.
                They may be set by us or by third-party providers whose services we have added to our
                pages. These include language preference cookies, theme preference cookies (light/dark
                mode), UI customization settings, and timezone detection cookies.
              </p>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                Marketing Cookies
              </h3>
              <p className="text-muted leading-relaxed">
                These cookies may be set through our site by our advertising partners. They may be used
                by those companies to build a profile of your interests and show you relevant adverts
                on other sites. They do not store personal information directly but are based on
                uniquely identifying your browser and internet device. If you do not allow these
                cookies, you will experience less targeted advertising.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Third-Party Cookies
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                In addition to our own cookies, we may also use various third-party cookies to report
                usage statistics of the Service and deliver advertisements on and through the Service.
                Third-party services that may set cookies include:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li>Google Analytics - for website usage analytics</li>
                <li>Stripe - for secure payment processing</li>
                <li>Intercom - for customer support chat</li>
                <li>HubSpot - for marketing automation</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                How to Manage Cookies
              </h2>
              <p className="text-muted leading-relaxed mb-4">
                Most web browsers allow you to control cookies through their settings preferences. You
                can set your browser to refuse cookies or delete certain cookies. The following links
                provide information on how to manage cookies in common browsers:
              </p>
              <ul className="list-disc list-inside text-muted space-y-2 leading-relaxed">
                <li>Google Chrome: Settings &gt; Privacy and security &gt; Cookies</li>
                <li>Mozilla Firefox: Settings &gt; Privacy &amp; Security &gt; Cookies</li>
                <li>Safari: Preferences &gt; Privacy &gt; Manage Website Data</li>
                <li>Microsoft Edge: Settings &gt; Cookies and site permissions</li>
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                Please note that if you choose to disable cookies, some features of the Service may not
                function properly.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Updates to This Policy
              </h2>
              <p className="text-muted leading-relaxed">
                We may update this Cookie Policy from time to time to reflect changes in technology,
                regulation, or our business practices. Any changes will be posted on this page with an
                updated effective date.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contact Us
              </h2>
              <p className="text-muted leading-relaxed">
                If you have any questions about our use of cookies, please contact us at{" "}
                <a href="mailto:privacy@velocalls.com" className="text-primary hover:text-primary-light transition-colors">
                  privacy@velocalls.com
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
