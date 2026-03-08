import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VeloCalls — Intelligent Call Tracking & Routing Platform",
  description:
    "Route calls intelligently, bid in real-time, build visual IVR flows, and unlock AI-powered conversation intelligence. The enterprise call tracking platform for growing businesses.",
  keywords: [
    "call tracking",
    "call routing",
    "IVR builder",
    "real-time bidding",
    "AI transcription",
    "performance marketing",
    "pay per call",
  ],
  openGraph: {
    title: "VeloCalls — Intelligent Call Tracking & Routing Platform",
    description:
      "Route calls intelligently, bid in real-time, build visual IVR flows, and unlock AI-powered conversation intelligence.",
    type: "website",
    locale: "en_US",
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
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
