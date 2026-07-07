import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { StaggeredMenu } from "@/components/ui/react-bits/StaggeredMenu";
import { Footer } from "@/components/ui/Footer";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${PORTFOLIO_DATA.developer.name} — ${PORTFOLIO_DATA.developer.role}`,
  description: PORTFOLIO_DATA.developer.tagline,
  keywords: ["Developer Portfolio", "Full-Stack Engineer", "Three.js", "GSAP", "Next.js 16", "WebGL"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden font-sans">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <LenisProvider>
            <CustomCursor />
            <StaggeredMenu
              isFixed={true}
              position="right"
              items={[
                { label: 'Home', ariaLabel: 'Go to home page', link: '#' },
                { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
                { label: 'Skills', ariaLabel: 'View technical skills', link: '#skills' },
                { label: 'Projects', ariaLabel: 'View our projects', link: '#projects' },
                { label: 'Experience', ariaLabel: 'View work experience', link: '#experience' },
                { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
              ]}
              socialItems={[
                { label: 'GitHub', link: 'https://github.com' },
                { label: 'LinkedIn', link: 'https://linkedin.com' },
                { label: 'Twitter', link: 'https://twitter.com' },
                { label: 'Discord', link: 'https://discord.com' }
              ]}
              displaySocials={true}
              displayItemNumbering={true}
              menuButtonColor="currentColor"
              openMenuButtonColor="currentColor"
              changeMenuColorOnOpen={true}
              logoUrl={null}
              accentColor="#888888"
            />
            <main className="flex-1 w-full">{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
