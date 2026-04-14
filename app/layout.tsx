import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phone-life-94.fr";

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
      className={`${ibmPlexSans.variable} ${bebasNeue.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
