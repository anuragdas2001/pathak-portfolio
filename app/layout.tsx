import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { getPortfolioData } from "@/data/portfolioService";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const { profile } = await getPortfolioData();
  return {
    title: `${profile.name} (${profile.handle}) — ${profile.role}`,
    description: profile.tagline,
    keywords: [
      "Cybersecurity Portfolio",
      "Application Security Engineer",
      "DevSecOps",
      "Threat Modeling",
      "Detection Engineering",
      "Security Tooling",
    ],
    openGraph: {
      title: `${profile.name} — ${profile.role}`,
      description: profile.tagline,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getPortfolioData();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--text)] overflow-x-hidden font-sans relative">
        {/* Decorative pure-CSS grid + scanlines layer */}
        <div
          aria-hidden="true"
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
        >
          <div className="absolute inset-0 cyber-grid-bg opacity-80" />
          <div className="absolute inset-0 cyber-vignette" />
          <div className="absolute inset-0 cyber-scanlines" />
        </div>

        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-sm focus:bg-[var(--accent)] focus:text-[var(--accent-contrast)] focus:font-mono focus:text-xs focus:font-bold"
        >
          Skip to main content
        </a>

        <Navbar
          handle={data.profile.handle}
          name={data.profile.name}
          email={data.profile.email}
          pgpFingerprint={data.profile.pgpFingerprint}
          navItems={data.navItems}
          projects={data.projects}
          socials={data.socials}
        />

        <main id="main-content" className="relative z-10 flex-1 w-full">
          {children}
        </main>

        <Footer profile={data.profile} socials={data.socials} />
      </body>
    </html>
  );
}
