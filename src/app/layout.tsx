import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VeloCalls — Intelligent Call Tracking & Routing Platform",
  description:
    "Route calls intelligently, bid in real-time, build visual IVR flows, and power your contact center with AI agents. The all-in-one call tracking and routing platform for contact centers, sales teams, and performance marketers.",
  keywords: [
    "call tracking",
    "call routing",
    "contact center software",
    "call center software",
    "IVR builder",
    "real-time bidding",
    "AI transcription",
    "AI sales agents",
    "pay per call",
  ],
  openGraph: {
    title: "VeloCalls — Intelligent Call Tracking & Routing Platform",
    description:
      "Route calls intelligently, bid in real-time, build visual IVR flows, and power your contact center with AI agents.",
    type: "website",
    locale: "en_US",
  },
  alternates: {
    types: {
      "application/rss+xml": "https://velocalls.com/feed.xml",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {
                  document.documentElement.classList.add('dark');
                }
              })();
            `,
          }}
        />
        {/* JustAnalytics — Frontend Analytics */}
        <script
          defer
          src="https://justanalytics.app/tracker.js"
          data-site-id="cmmn9e86i2cx9pmiv5bbofer1"
        />
        {/* JustAnalytics — Frontend Monitoring (errors, performance) */}
        <script
          src="https://justanalytics.app/monitor.js"
          data-site-id="cmmn9e86i2cx9pmiv5bbofer1"
          data-environment="production"
          data-release="v1.0.0"
          data-sample-rate="1.0"
        />
      </head>
      <body className={`${jakarta.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
