import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  BatteryCharging,
  Cable,
  ChevronRight,
  Clock3,
  Laptop,
  MapPin,
  Package,
  PhoneCall,
  ShieldCheck,
  Smartphone,
  Tablet,
  Wifi,
  Wrench,
} from "lucide-react";
import { LeadFormsSection } from "@/components/lead-forms";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phone-life-94.fr";

export const metadata: Metadata = {
  title: "Reparation telephone a Fresnes et Savigny-le-Temple",
  description:
    "Phone Life repare smartphones, iPhone, Samsung, tablettes, iPad et PC. Diagnostic rapide, devis clair, prise de RDV atelier.",
  keywords: [
    "reparation telephone fresnes",
    "reparation telephone savigny le temple",
    "reparation iphone fresnes",
    "reparation samsung savigny",
    "reparation tablette fresnes",
    "reparation ordinateur fresnes",
    "devis reparation telephone",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Phone Life - Reparation smartphone, tablette, PC",
    description:
      "Ateliers a Fresnes et Savigny-le-Temple. Reparation rapide, devis et RDV.",
    url: "/",
    type: "website",
  },
};

const localBusinessStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RepairShop",
      name: "Phone Life",
      url: siteUrl,
      telephone: "+33658993408",
      address: {
        "@type": "PostalAddress",
        streetAddress: "6 rue Maurice Tenine",
        postalCode: "94260",
        addressLocality: "Fresnes",
        addressCountry: "FR",
      },
      areaServed: [
        "Fresnes",
        "Cachan",
        "Chevilly-Larue",
        "Antony",
        "L'Hay-les-Roses",
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "19:00",
        },
      ],
    },
    {
      "@type": "RepairShop",
      name: "Phone Life",
      url: siteUrl,
      telephone: "+33605822126",
      address: {
        "@type": "PostalAddress",
        streetAddress: "229 Av. de l'Europe",
        postalCode: "77176",
        addressLocality: "Savigny-le-Temple",
        addressCountry: "FR",
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ],
          opens: "10:00",
          closes: "19:00",
        },
      ],
    },
  ],
};

const services = [
  {
    title: "Ecran / vitre",
    description:
      "Remplacement premium iPhone, Samsung, Xiaomi, Pixel. Etancheite verifiee apres intervention.",
    icon: Smartphone,
    time: "20-45 min",
  },
  {
    title: "Batterie fatiguee",
    description:
      "Autonomie en chute, surchauffe, extinction soudaine. Batterie neuve + controle de charge.",
    icon: BatteryCharging,
    time: "25 min",
  },
  {
    title: "Port de charge",
    description:
      "Connecteur, micro-soudure, nettoyage corrosion. Charge stable, data testee sur place.",
    icon: Cable,
    time: "30-60 min",
  },
  {
    title: "Wi-Fi / Bluetooth",
    description:
      "Diagnostic antenne, connectivite instable, reseau qui saute. Verification complete avant remise.",
    icon: Wifi,
    time: "Diagnostic",
  },
  {
    title: "Tablette / iPad",
    description:
      "Dalle, tactile, batterie, connecteur, camera. Intervention propre avec pieces selectionnees.",
    icon: Tablet,
    time: "45-90 min",
  },
  {
    title: "PC portable",
    description:
      "SSD, RAM, ventilation, alimentation, charniere. Nettoyage et optimisation inclus.",
    icon: Laptop,
    time: "Sur devis",
  },
] as const;

const commitments = [
  {
    title: "Diagnostic clair",
    detail: "Diagnostic offert si reparation realisee. Sinon 20 EUR.",
    icon: Wrench,
  },
  {
    title: "Garantie 1 an",
    detail: "Pieces garanties 12 mois hors choc, oxydation et casse externe.",
    icon: ShieldCheck,
  },
  {
    title: "Atelier local",
    detail:
      "Fresnes 94260 et Savigny-le-Temple. Sans rendez-vous du lundi au samedi, 10h-19h.",
    icon: MapPin,
  },
  {
    title: "Relais Pick-Up",
    detail: "Deposez et retirez vos colis pendant meme passage en boutique.",
    icon: Package,
  },
] as const;

const processSteps = [
  "Accueil + verification rapide de panne",
  "Tarif annonce avant toute intervention",
  "Reparation immediate en atelier",
  "Tests finaux + conseils de protection",
] as const;

const fade = (delay: string): CSSProperties =>
  ({
    "--reveal-delay": delay,
  }) as CSSProperties;

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessStructuredData),
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 atelier-grid"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 noise-mask"
        aria-hidden
      />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 md:px-8 md:pt-10">
        <a
          className="reveal-up inline-flex items-center gap-2"
          href="#top"
          style={fade("40ms")}
        >
          <span className="font-display text-4xl leading-none tracking-[0.06em] text-foreground md:text-5xl">
            PHONE LIFE
          </span>
        </a>
        <div
          className="reveal-up flex items-center gap-2"
          style={fade("120ms")}
        >
          <a
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/85 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-brand/50 hover:text-brand"
            href="tel:0658993408"
          >
            <PhoneCall className="size-4" />
            06 58 99 34 08
          </a>
          <a
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/85 px-4 py-2 text-sm font-semibold backdrop-blur-sm transition-colors hover:border-brand/50 hover:text-brand"
            href="tel:0605822126"
          >
            <PhoneCall className="size-4" />
            06 05 82 21 26
          </a>
        </div>
      </header>

      <main className="page-shell mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pt-10 md:gap-16 md:px-8 md:pt-14">
        <section
          id="top"
          className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12"
        >
          <div className="reveal-up flex flex-col gap-8" style={fade("180ms")}>
            <h1 className="text-balance font-display text-6xl leading-[0.88] tracking-[0.02em] text-foreground sm:text-7xl md:text-8xl lg:text-[7rem]">
              Reparation
              <br />
              smartphone
              <br />
              ultra-rapide
            </h1>
            <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              Atelier technique hautement calibre pour telephone, tablette et
              PC. Diagnostic transparent, intervention propre, resultat durable.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="tel:0658993408"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
              >
                Appeler maintenant
                <ChevronRight className="size-4" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/80 px-6 py-3 text-sm font-semibold transition-colors hover:border-brand/50 hover:text-brand"
              >
                Voir reparations
              </a>
            </div>
          </div>

          <aside
            className="reveal-up signal-card scanline relative overflow-hidden rounded-3xl p-6 md:p-8"
            style={fade("260ms")}
          >
            <div
              className="absolute -right-14 -top-14 h-44 w-44 rounded-full bg-brand/20 blur-3xl"
              aria-hidden
            />
            <div className="relative z-10 flex flex-col gap-7">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Delai moyen atelier
                </p>
                <p className="font-display text-8xl leading-none text-foreground">
                  20
                </p>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand">
                  minutes
                </p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-brand/0 via-brand/65 to-brand/0" />
              <ul className="grid gap-3 text-sm text-muted-foreground">
                <li className="flex items-center justify-between gap-3">
                  <span>Diagnostic initial</span>
                  <span className="font-semibold text-foreground">Offert*</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Garantie pieces</span>
                  <span className="font-semibold text-foreground">1 an</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span>Heures d ouverture</span>
                  <span className="font-semibold text-foreground">10h-19h</span>
                </li>
              </ul>
            </div>
          </aside>
        </section>

        <section
          className="reveal-up grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          style={fade("340ms")}
        >
          {[
            { label: "Interventions express", value: "20 min" },
            { label: "Satisfaction client", value: "98%" },
            { label: "Garantie pieces", value: "12 mois" },
            { label: "Disponibilite", value: "6j / 7" },
          ].map((stat) => (
            <article
              key={stat.label}
              className="rounded-2xl border border-foreground/12 bg-background/85 px-5 py-5 backdrop-blur-sm"
            >
              <p className="font-display text-5xl leading-none text-foreground">
                {stat.value}
              </p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {stat.label}
              </p>
            </article>
          ))}
        </section>

        <section id="services" className="space-y-6">
          <div
            className="reveal-up flex flex-wrap items-end justify-between gap-4"
            style={fade("420ms")}
          >
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                Atelier multi-appareils
              </p>
              <h2 className="font-display text-5xl leading-[0.9] text-foreground md:text-6xl">
                Reparer mieux,
                <br />
                reparer net.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">
              Chaque intervention suit protocole atelier: verification complete
              avant, remplacement precision, batterie de tests apres.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <article
                  key={service.title}
                  className="reveal-up signal-card rounded-2xl border border-foreground/10 bg-card/85 p-5"
                  style={fade(`${480 + index * 60}ms`)}
                >
                  <div className="mb-4 flex items-center justify-between gap-4">
                    <span className="inline-flex rounded-xl border border-brand/30 bg-brand/10 p-2 text-brand">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {service.time}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <article
            className="reveal-up signal-card rounded-3xl border border-foreground/10 bg-background/88 p-6 md:p-8"
            style={fade("840ms")}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand/35 bg-brand/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
              <Clock3 className="size-4" />
              Process atelier
            </div>
            <ol className="space-y-4">
              {processSteps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-3 text-sm leading-7 text-muted-foreground"
                >
                  <span className="mt-1 inline-flex size-6 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-xs font-semibold text-foreground">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>

          <article
            className="reveal-up grid gap-4 rounded-3xl border border-foreground/10 bg-card/82 p-6 md:grid-cols-2 md:p-8"
            style={fade("920ms")}
          >
            {commitments.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-foreground/10 bg-background/70 p-4"
                >
                  <Icon className="size-5 text-brand" />
                  <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              );
            })}
          </article>
        </section>

        <LeadFormsSection />

        <section
          className="reveal-up relative overflow-hidden rounded-3xl border border-brand/30 bg-brand/12 p-6 md:p-10"
          style={fade("1040ms")}
        >
          <div
            className="absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-brand/25 blur-3xl"
            aria-hidden
          />
          <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand">
                <Package className="size-4" />
                Reparation + relais colis
              </p>
              <h2 className="font-display text-5xl leading-[0.9] text-foreground md:text-6xl">
                Un passage.
                <br />
                Plusieurs solutions.
              </h2>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Phone Life combine atelier technique et point relais Pick-Up.
                Vous gagnez temps, deplacement et tranquillite.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                href="tel:0658993408"
              >
                <PhoneCall className="size-4" />
                06 58 99 34 08
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform hover:-translate-y-0.5"
                href="tel:0605822126"
              >
                <PhoneCall className="size-4" />
                06 05 82 21 26
              </a>
              <div className="rounded-2xl border border-foreground/20 bg-background/85 px-5 py-3 text-sm leading-6 text-muted-foreground">
                <p className="flex items-center gap-2 font-medium text-foreground">
                  <MapPin className="size-4 text-brand" />6 rue Maurice Tenine,
                  94260 Fresnes
                </p>
                <p className="mt-1 flex items-center gap-2 font-medium text-foreground">
                  <MapPin className="size-4 text-brand" />
                  229 Av. de l&apos;Europe, 77176 Savigny-le-Temple
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
