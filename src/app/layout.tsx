import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { site } from "@/lib/site";
import { LocaleProvider } from "@/lib/i18n";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const thmanyahDisplay = localFont({
  variable: "--font-thmanyah-display",
  display: "swap",
  src: [
    { path: "./fonts/thmanyah-serif-display-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/thmanyah-serif-display-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/thmanyah-serif-display-Bold.woff2", weight: "700", style: "normal" },
    { path: "./fonts/thmanyah-serif-display-Black.woff2", weight: "900", style: "normal" },
  ],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Kareem Ibrahem",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "portfolio",
    "Egypt",
  ],
  openGraph: {
    type: "website",
    locale: "ar_EG",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  icons: { icon: "/images/icon.webp" },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${manrope.variable} ${jetbrainsMono.variable} ${thmanyahDisplay.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-ink font-sans text-fg"
      >
        <LocaleProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-accent focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-ink"
        >
          Skip to content · تخطي إلى المحتوى
        </a>
        <SmoothScroll>
          <Navbar />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
        </LocaleProvider>
      </body>
    </html>
  );
}
