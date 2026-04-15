import type { Metadata } from "next";
import { Big_Shoulders, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const FALLBACK_SITE_URL = "https://phonelife.vercel.app";

function resolveMetadataBase() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (!raw) {
    return new URL(FALLBACK_SITE_URL);
  }

  const normalized = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    return new URL(normalized);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

const metadataBase = resolveMetadataBase();

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "800", "900"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: "Phone Life | Reparation smartphone, tablette, PC",
    template: "%s | Phone Life",
  },
  description:
    "Reparation smartphone, tablette, iPad et PC a Fresnes et Savigny-le-Temple. Diagnostic rapide, devis clair, RDV atelier, garantie pieces.",
  keywords: [
    "reparation telephone",
    "reparation smartphone",
    "reparation iphone",
    "reparation samsung",
    "reparation tablette",
    "reparation ipad",
    "reparation ordinateur",
    "fresnes",
    "savigny-le-temple",
    "phone life",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "/",
    siteName: "Phone Life",
    title: "Phone Life | Reparation smartphone, tablette, PC",
    description:
      "Ateliers Phone Life a Fresnes et Savigny-le-Temple. Reparation rapide toutes marques.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phone Life | Reparation smartphone, tablette, PC",
    description:
      "Reparation rapide a Fresnes et Savigny-le-Temple. Devis et prise de RDV en ligne.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${bigShoulders.variable} ${jetBrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
