import type { Metadata } from "next";
import type { CSSProperties } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  Cable,
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
  Zap,
} from "lucide-react";
import { LeadFormsSection } from "@/components/lead-forms";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phonelife.vercel.app";

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

const stats = [
  { label: "Interventions express", value: "20 min" },
  { label: "Satisfaction client", value: "98%" },
  { label: "Garantie pieces", value: "12 mois" },
  { label: "Disponibilite", value: "6j / 7" },
] as const;

const marqueeItems = [
  "Reparation express",
  "Diagnostic offert",
  "Garantie 1 an",
  "Toutes marques",
  "Fresnes 94260",
  "Savigny-le-Temple 77176",
  "Atelier 6 jours / 7",
  "Relais Pick-Up",
] as const;

const fade = (delay: string): CSSProperties =>
  ({
    "--reveal-delay": delay,
  }) as CSSProperties;

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
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

      {/* META STRIP */}
      <div className="relative z-10 border-b-[1.5px] border-foreground bg-background">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-2.5 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-foreground md:px-8">
          <span className="hidden sm:inline">N° FR / 94260 / 77176</span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block size-2 rounded-full bg-brand"
              style={{
                boxShadow:
                  "0 0 0 2px color-mix(in oklab, var(--brand) 35%, transparent)",
              }}
              aria-hidden
            />
            Atelier ouvert · 10h — 19h · Lun / Sam
          </span>
          <span className="hidden md:inline">Est. Atelier · Phone Life</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="relative z-10 border-b-[1.5px] border-foreground bg-background">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-6 md:px-8 md:py-8">
          <a
            className="reveal-up flex items-baseline gap-3"
            href="#top"
            style={fade("40ms")}
          >
            <span className="font-display text-5xl leading-[0.78] tracking-[-0.01em] md:text-7xl">
              Phone Life
            </span>
          </a>
          <div
            className="reveal-up flex flex-wrap items-center gap-2"
            style={fade("120ms")}
          >
            <a className="pill-btn-ghost" href="tel:0658993408">
              <PhoneCall className="size-3.5" />
              06 58 99 34 08
            </a>
            <a className="pill-btn-ghost" href="tel:0605822126">
              <PhoneCall className="size-3.5" />
              06 05 82 21 26
            </a>
          </div>
        </div>
      </header>

      {/* TICKER */}
      <div className="relative z-10 overflow-hidden border-b-[1.5px] border-foreground bg-foreground py-5 text-background">
        <div className="ticker-track font-display text-3xl md:text-5xl">
          {[0, 1].map((loopIdx) => (
            <ul
              key={loopIdx}
              className="flex shrink-0 items-center gap-10 pr-10"
              aria-hidden={loopIdx === 1}
            >
              {marqueeItems.map((item) => (
                <li
                  key={`${loopIdx}-${item}`}
                  className="flex shrink-0 items-center gap-10"
                >
                  <span className="whitespace-nowrap">{item}</span>
                  <span
                    className="block size-3 rotate-45 bg-brand"
                    aria-hidden
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      <main className="page-shell relative z-10">
        {/* HERO */}
        <section id="top" className="border-b-[1.5px] border-foreground">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-[1.35fr_0.65fr] lg:gap-16">
            <div
              className="reveal-up flex flex-col gap-8"
              style={fade("180ms")}
            >
              <span className="stamp self-start">
                <Zap className="size-3.5" />
                Atelier express · Fresnes / Savigny
              </span>
              <h1 className="font-display leading-[0.8] tracking-[-0.02em]">
                <span className="block text-[clamp(3.2rem,11vw,10.5rem)]">
                  Reparer
                </span>
                <span className="block text-[clamp(3.2rem,11vw,10.5rem)] text-brand">
                  vite.
                </span>
                <span className="block text-[clamp(3.2rem,11vw,10.5rem)]">
                  Reparer <span className="outlined-text">juste.</span>
                </span>
              </h1>
              <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
                Atelier technique hautement calibre pour telephone, tablette et
                PC. Diagnostic transparent, intervention propre, resultat
                durable.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="tel:0658993408" className="pill-btn-solid">
                  Appeler maintenant
                  <ArrowUpRight className="size-4" />
                </a>
                <a href="#services" className="pill-btn-outline">
                  Voir reparations
                </a>
              </div>
            </div>

            <aside
              className="reveal-up signal-card relative flex flex-col gap-6 p-6 md:p-8"
              style={fade("260ms")}
            >
              <div className="relative z-10 flex items-start justify-between">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
                  N° 001 / Delai moyen
                </span>
                <span
                  className="inline-block size-2.5 rounded-full bg-brand"
                  aria-hidden
                />
              </div>
              <div className="relative z-10">
                <p className="font-display text-[9rem] leading-[0.78] tracking-[-0.05em] md:text-[11rem]">
                  20
                </p>
                <p className="mt-1 font-mono text-xs font-bold uppercase tracking-[0.22em] text-brand">
                  minutes
                </p>
              </div>
              <div className="relative z-10 h-[1.5px] w-full bg-foreground" />
              <ul className="relative z-10 grid gap-3 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
                <li className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    Diagnostic initial
                  </span>
                  <span className="font-bold text-foreground">Offert*</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Garantie pieces</span>
                  <span className="font-bold text-foreground">12 mois</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">
                    Heures ouverture
                  </span>
                  <span className="font-bold text-foreground">10h — 19h</span>
                </li>
              </ul>
              <div
                className="hazard-stripe relative z-10 h-3 w-full"
                aria-hidden
              />
            </aside>
          </div>
        </section>

        {/* STATS */}
        <section className="border-b-[1.5px] border-foreground bg-background">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-2 gap-px bg-foreground lg:grid-cols-4">
              {stats.map((stat, i) => (
                <article
                  key={stat.label}
                  className="reveal-up relative flex flex-col gap-4 bg-background px-5 py-10 md:px-8 md:py-14"
                  style={fade(`${340 + i * 80}ms`)}
                >
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                    {`0${i + 1}`}
                  </span>
                  <p className="font-display text-6xl leading-none tracking-[-0.02em] md:text-7xl">
                    {stat.value}
                  </p>
                  <span className="block h-1 w-14 bg-brand" aria-hidden />
                  <p className="text-xs font-bold uppercase tracking-[0.12em]">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section
          id="services"
          className="border-b-[1.5px] border-foreground bg-background"
        >
          <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <div
              className="reveal-up flex flex-wrap items-end justify-between gap-8"
              style={fade("420ms")}
            >
              <div className="space-y-5">
                <span className="stamp">Atelier multi-appareils</span>
                <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.86] tracking-[-0.02em]">
                  Reparer mieux,
                  <br />
                  reparer <span className="text-brand">net.</span>
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">
                Chaque intervention suit un protocole atelier strict :
                verification complete avant, remplacement precision, batterie de
                tests apres.
              </p>
            </div>

            <div
              className="reveal-up mt-14 grid gap-px border-[1.5px] border-foreground bg-foreground md:grid-cols-2 xl:grid-cols-3"
              style={fade("520ms")}
            >
              {services.map((service, index) => {
                const Icon = service.icon;
                const number = `0${index + 1}`;
                return (
                  <article
                    key={service.title}
                    className="group relative flex flex-col gap-5 bg-background p-6 transition-colors duration-300 hover:bg-foreground hover:text-background md:p-8"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-background/60">
                        {number} / Service
                      </span>
                      <span className="inline-flex items-center gap-1 border border-current px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.16em] text-brand transition-colors group-hover:text-brand">
                        <Clock3 className="size-3" />
                        {service.time}
                      </span>
                    </div>
                    <Icon
                      className="size-12 text-brand"
                      strokeWidth={1.4}
                      aria-hidden
                    />
                    <h3 className="font-display text-3xl leading-[0.94] tracking-[-0.01em] md:text-4xl">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground transition-colors group-hover:text-background/75">
                      {service.description}
                    </p>
                    <ArrowUpRight
                      className="absolute right-6 bottom-6 size-5 -rotate-45 opacity-40 transition group-hover:rotate-0 group-hover:opacity-100 md:right-8 md:bottom-8"
                      aria-hidden
                    />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS + COMMITMENTS */}
        <section className="border-b-[1.5px] border-foreground bg-background">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
            <article
              className="reveal-up relative border-foreground p-6 md:p-12 lg:border-r-[1.5px]"
              style={fade("840ms")}
            >
              <div className="mb-10 inline-flex items-center gap-2 border-[1.5px] border-foreground px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em]">
                <Clock3 className="size-3.5" />
                Process atelier
              </div>
              <ol className="space-y-8">
                {processSteps.map((step, index) => (
                  <li key={step} className="group flex items-start gap-6">
                    <span className="font-display text-6xl leading-[0.82] text-brand md:text-7xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-3 flex-1 border-t-[1.5px] border-foreground pt-3 font-mono text-xs uppercase leading-6 tracking-[0.08em] md:text-sm">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </article>

            <div
              className="reveal-up grid border-t-[1.5px] border-foreground sm:grid-cols-2 lg:border-t-0"
              style={fade("920ms")}
            >
              {commitments.map((item, i) => {
                const Icon = item.icon;
                const borderClasses = [
                  i % 2 === 0 ? "sm:border-r-[1.5px]" : "",
                  i < 2 ? "border-b-[1.5px]" : "",
                ]
                  .filter(Boolean)
                  .join(" ");

                return (
                  <div
                    key={item.title}
                    className={`flex flex-col gap-4 border-foreground p-6 md:p-10 ${borderClasses}`}
                  >
                    <span className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground">
                      {`0${i + 1}`}
                    </span>
                    <Icon
                      className="size-9 text-brand"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                    <h3 className="font-display text-3xl leading-[0.94] tracking-[-0.01em]">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">
                      {item.detail}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LEAD FORMS */}
        <section className="border-b-[1.5px] border-foreground bg-background">
          <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
            <LeadFormsSection />
          </div>
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden bg-foreground text-background">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle, oklch(1 0 0) 1px, transparent 1.5px)",
              backgroundSize: "14px 14px",
            }}
          />
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-brand/30 blur-3xl"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8 md:py-28">
            <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
              <div
                className="reveal-up max-w-2xl space-y-6"
                style={fade("1040ms")}
              >
                <span className="inline-flex items-center gap-2 border-[1.5px] border-background px-3 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.2em]">
                  <Package className="size-3.5" />
                  Reparation + relais colis
                </span>
                <h2 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.82] tracking-[-0.02em]">
                  Un passage.
                  <br />
                  <span className="text-brand">Plusieurs</span> solutions.
                </h2>
                <p className="max-w-xl text-sm leading-7 text-background/75 md:text-base">
                  Phone Life combine atelier technique et point relais Pick-Up.
                  Vous gagnez du temps, du deplacement et de la tranquillite.
                </p>
              </div>

              <div
                className="reveal-up flex flex-col gap-3 md:items-end"
                style={fade("1120ms")}
              >
                <a className="pill-btn-brand" href="tel:0658993408">
                  <PhoneCall className="size-4" />
                  06 58 99 34 08
                </a>
                <a className="pill-btn-brand" href="tel:0605822126">
                  <PhoneCall className="size-4" />
                  06 05 82 21 26
                </a>
              </div>
            </div>

            <div className="mt-16 grid gap-8 border-t border-background/30 pt-10 md:grid-cols-2">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 size-6 text-brand" aria-hidden />
                <div className="space-y-1">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-background/60">
                    Atelier Fresnes / 94260
                  </p>
                  <p className="font-display text-2xl leading-[0.95] md:text-3xl">
                    6 rue Maurice Tenine
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 size-6 text-brand" aria-hidden />
                <div className="space-y-1">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.22em] text-background/60">
                    Atelier Savigny / 77176
                  </p>
                  <p className="font-display text-2xl leading-[0.95] md:text-3xl">
                    229 Av. de l&apos;Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hazard-stripe h-3 w-full" aria-hidden />
        </section>

        {/* FOOTER */}
        <footer className="border-t-[1.5px] border-foreground bg-background">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-6 font-mono text-[0.62rem] uppercase tracking-[0.22em] text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
            <span>© Phone Life · Atelier independant</span>
            <span>
              * Diagnostic offert si reparation realisee · sinon 20 EUR
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
