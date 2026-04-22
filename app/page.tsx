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
      "Connecteur, micro-soudure, nettoyage corrosion. Charge stable, data testee on place.",
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
      "Dalle, tactile, batterie, connecteur, camera. Intervention propre with pieces selectionnees.",
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

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="relative isolate min-h-screen overflow-x-clip bg-background">
      <div
        className="pointer-events-none absolute inset-0 atelier-grid"
        aria-hidden
      />

      {/* META STRIP */}
      <div className="relative z-10 border-b border-border bg-background/50 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-2.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground md:px-8">
          <span className="hidden sm:inline">N° FR / 94260 / 77176</span>
          <span className="flex items-center gap-2">
            <span
              className="inline-block size-1.5 rounded-full bg-brand animate-pulse"
              aria-hidden
            />
            Atelier ouvert · 10h — 19h · Lun / Sam
          </span>
          <span className="hidden md:inline">Est. Atelier · Phone Life</span>
        </div>
      </div>

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-5 py-4 md:px-8">
          <a
            className="reveal-up"
            href="#top"
            style={fade("40ms")}
          >
            <Logo />
          </a>
          <div
            className="reveal-up flex items-center gap-3"
            style={fade("120ms")}
          >
            <div className="hidden items-center gap-2 sm:flex">
              <a className="pill-btn-ghost" href="tel:0658993408">
                <PhoneCall className="size-3.5" />
                06 58 99 34 08
              </a>
              <a className="pill-btn-ghost" href="tel:0605822126">
                <PhoneCall className="size-3.5" />
                06 05 82 21 26
              </a>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* TICKER */}
      <div className="relative z-10 overflow-hidden border-b border-border bg-secondary/50 py-3 text-foreground">
        <div className="ticker-track font-display text-xl uppercase tracking-wider opacity-60 md:text-2xl">
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
                    className="block size-1.5 rounded-full bg-brand/40"
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
        <section id="top" className="border-b border-border">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 py-14 md:px-8 md:py-24 lg:grid-cols-[1.3fr_0.7fr] lg:gap-20">
            <div
              className="reveal-up flex flex-col gap-8"
              style={fade("180ms")}
            >
              <h1 className="font-display leading-[0.9] tracking-tight">
                <span className="block text-[clamp(3.5rem,10vw,8rem)]">
                  Reparer
                </span>
                <span className="block text-[clamp(3.5rem,10vw,8rem)] text-brand">
                  vite.
                </span>
                <span className="block text-[clamp(3.5rem,10vw,8rem)]">
                  Reparer <span className="outlined-text opacity-50">juste.</span>
                </span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
                Atelier technique specialise pour telephone, tablette et
                PC. Diagnostic transparent, intervention precision, resultat
                garanti.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="tel:0658993408" className="pill-btn-solid">
                  Appeler l&apos;atelier
                  <ArrowUpRight className="size-4" />
                </a>
                <a href="#services" className="pill-btn-outline">
                  Nos services
                </a>
              </div>
            </div>

            <aside
              className="reveal-up flex flex-col gap-8 border border-border bg-card/50 p-8 backdrop-blur-sm md:p-12"
              style={fade("260ms")}
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                  N° 001 / Temps moyen
                </span>
                <span
                  className="inline-block size-1.5 rounded-full bg-brand shadow-[0_0_12px_rgba(var(--brand),0.5)]"
                  aria-hidden
                />
              </div>
              <div>
                <p className="font-display text-[8rem] leading-[0.8] tracking-tighter md:text-[10rem]">
                  20
                </p>
                <p className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-brand">
                  minutes
                </p>
              </div>
              <div className="h-px w-full bg-border" />
              <ul className="grid gap-4 font-mono text-[0.65rem] uppercase tracking-widest">
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
              </ul>
            </aside>
          </div>
        </section>

        {/* STATS */}
        <section className="border-b border-border bg-secondary/30">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <article
                  key={stat.label}
                  className="reveal-up relative flex flex-col gap-3 border-border px-5 py-10 md:px-8 md:py-16 lg:border-r"
                  style={fade(`${340 + i * 80}ms`)}
                >
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                    {`0${i + 1}`}
                  </span>
                  <p className="font-display text-5xl leading-none md:text-6xl">
                    {stat.value}
                  </p>
                  <p className="text-[0.65rem] font-bold uppercase tracking-widest text-brand">
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
          className="border-b border-border bg-background"
        >
          <div className="mx-auto w-full max-w-7xl">
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            >
              {services.map((service, i) => {
                const Icon = service.icon;
                return (
                  <article
                    key={service.title}
                    className="reveal-up group relative flex flex-col gap-8 overflow-hidden border-b border-border px-5 py-12 md:px-8 md:py-16 sm:border-r last:border-b-0 lg:[&:nth-child(3n)]:border-r-0"
                    style={fade(`${520 + i * 60}ms`)}
                  >
                    <div 
                      className="pointer-events-none absolute -right-4 -bottom-4 opacity-[0.03] transition-all duration-500 group-hover:scale-110 group-hover:opacity-[0.06] group-hover:text-brand"
                      aria-hidden
                    >
                      <Icon className="size-48 rotate-12" strokeWidth={1} />
                    </div>
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                        {`0${i + 1}`}
                      </span>
                      <span className="font-mono text-[0.6rem] uppercase tracking-widest text-brand">
                        {service.time}
                      </span>
                    </div>
                    <div className="relative z-10 space-y-4">
                      <h3 className="font-display text-4xl leading-[0.9] tracking-tight md:text-5xl">
                        {service.title}
                      </h3>
                      <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PROCESS + COMMITMENTS */}
        <section className="border-b border-border bg-secondary/20">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 lg:grid-cols-2">
            <article
              className="reveal-up p-8 md:p-16 lg:border-r border-border"
              style={fade("840ms")}
            >
              <p className="mb-8 text-[0.65rem] font-bold uppercase tracking-widest text-brand">Protocole atelier</p>
              <ol className="space-y-12">
                {processSteps.map((step, index) => (
                  <li key={step} className="group flex items-center gap-16">
                    <span className="w-[1.5ch] shrink-0 font-display text-7xl leading-none text-brand/20 transition-colors group-hover:text-brand md:text-8xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 space-y-2">
                      <p className="font-display text-2xl md:text-3xl">{step}</p>
                      <div className="h-px w-full bg-border origin-left transition-transform scale-x-50 group-hover:scale-x-100" />
                    </div>
                  </li>
                ))}
              </ol>
            </article>

            <div
              className="reveal-up grid sm:grid-cols-2"
              style={fade("920ms")}
            >
              {commitments.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.title}
                    className="flex flex-col gap-6 border-border p-8 md:p-12 sm:border-r border-b"
                  >
                    <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand text-brand-foreground shadow-lg shadow-brand/20">
                      <Icon className="size-6" strokeWidth={2} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-display text-3xl leading-none">
                        {item.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* LEAD FORMS */}
        <section className="border-b border-border bg-background">
          <LeadFormsSection />
        </section>

        {/* CTA */}
        <section className="relative overflow-hidden border-b border-border bg-secondary/30">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03]"
            aria-hidden
            style={{
              backgroundImage:
                "radial-gradient(circle, var(--foreground) 1px, transparent 1.5px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-brand/10 blur-[100px]"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-5 py-24 md:px-8 md:py-32">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
              <div
                className="reveal-up max-w-2xl space-y-8"
                style={fade("1040ms")}
              >
                <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-muted-foreground/60">
                  <Package className="size-4 text-brand/70" />
                  Reparation + relais Pick-Up
                </span>
                <h2 className="font-display text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.9] tracking-tight">
                  Un passage.
                  <br />
                  <span className="text-brand">Tout</span> regler.
                </h2>
                <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                  Gagnez du temps en combinant votre reparation technique et le retrait de vos colis. L&apos;expertise Phone Life au service de votre quotidien.
                </p>
              </div>

              <div
                className="reveal-up flex flex-col gap-4 lg:items-end"
                style={fade("1120ms")}
              >
                <a className="pill-btn-solid" href="tel:0658993408">
                  <PhoneCall className="size-4" />
                  06 58 99 34 08
                </a>
                <a className="pill-btn-outline" href="tel:0605822126">
                  <PhoneCall className="size-4" />
                  06 05 82 21 26
                </a>
              </div>
            </div>

            <div className="mt-20 grid gap-10 border-t border-border pt-16 md:grid-cols-2">
              <div className="flex items-start gap-5">
                <div className="rounded-2xl bg-brand/10 p-3 text-brand">
                  <MapPin className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                    Atelier Fresnes / 94260
                  </p>
                  <p className="font-display text-3xl">
                    6 rue Maurice Tenine
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-5">
                <div className="rounded-2xl bg-brand/10 p-3 text-brand">
                  <MapPin className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground">
                    Atelier Savigny / 77176
                  </p>
                  <p className="font-display text-3xl">
                    229 Av. de l&apos;Europe
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-border bg-background">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-10 font-mono text-[0.6rem] uppercase tracking-widest text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
            <div className="flex items-center gap-4">
              <span>© Phone Life</span>
              <span className="opacity-30">|</span>
              <span>Atelier independant</span>
            </div>
            <span>
              * Diagnostic offert si reparation realisee · sinon 20 EUR
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
