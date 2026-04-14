"use client";

import { useActionState } from "react";
import type { CSSProperties } from "react";
import { CalendarCheck2, FileText, LoaderCircle } from "lucide-react";

import {
  sendAppointmentRequest,
  sendQuoteRequest,
  type LeadFormState,
} from "@/app/actions";
import { cn } from "@/lib/utils";

const initialState: LeadFormState = {
  status: "idle",
  message: "",
};

type FormKind = "devis" | "rdv";

function LeadFormCard({ kind }: { kind: FormKind }) {
  const isQuote = kind === "devis";
  const action = isQuote ? sendQuoteRequest : sendAppointmentRequest;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <article className="signal-card rounded-3xl border border-foreground/12 bg-card/86 p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="inline-flex rounded-xl border border-brand/35 bg-brand/12 p-2 text-brand">
          {isQuote ? <FileText className="size-5" /> : <CalendarCheck2 className="size-5" />}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brand">
            {isQuote ? "Demande de devis" : "Prise de RDV"}
          </p>
          <h3 className="text-lg font-semibold text-foreground">
            {isQuote ? "Estimation reparation" : "Reservation atelier"}
          </h3>
        </div>
      </div>

      <form action={formAction} className="space-y-4" noValidate>
        <input
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          name="company"
          type="text"
        />

        <label className="field-label">
          Nom complet
          <input className="field-input" name="fullName" type="text" autoComplete="name" required />
          {state.errors?.fullName ? <span className="field-error">{state.errors.fullName}</span> : null}
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="field-label">
            Telephone
            <input className="field-input" name="phone" type="tel" autoComplete="tel" required />
            {state.errors?.phone ? <span className="field-error">{state.errors.phone}</span> : null}
          </label>
          <label className="field-label">
            Email
            <input
              className="field-input"
              name="email"
              type="email"
              autoComplete="email"
              suppressHydrationWarning
              required
            />
            {state.errors?.email ? <span className="field-error">{state.errors.email}</span> : null}
          </label>
        </div>

        <label className="field-label">
          Appareil
          <input
            className="field-input"
            name="device"
            type="text"
            placeholder="Ex: iPhone 14 Pro, Galaxy S23, iPad Air..."
            required
          />
          {state.errors?.device ? <span className="field-error">{state.errors.device}</span> : null}
        </label>

        <label className="field-label">
          Disponibilite
          <input
            className="field-input"
            name="availability"
            type="text"
            placeholder="Ex: Mardi 14h ou samedi matin"
            required
          />
          {state.errors?.availability ? (
            <span className="field-error">{state.errors.availability}</span>
          ) : null}
        </label>

        <label className="field-label">
          Panne / besoin
          <textarea
            className="field-input min-h-24 resize-y"
            name="issue"
            placeholder="Expliquez probleme (ecran casse, batterie, charge, etc.)"
            required
          />
          {state.errors?.issue ? <span className="field-error">{state.errors.issue}</span> : null}
        </label>

        <label className="mt-1 flex items-start gap-3 text-sm text-muted-foreground">
          <input className="mt-1 size-4 accent-[var(--color-brand)]" name="consent" type="checkbox" value="yes" required />
          <span>J accepte d etre contacte par Phone Life pour ma demande.</span>
        </label>
        {state.errors?.consent ? <p className="field-error">{state.errors.consent}</p> : null}

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition disabled:cursor-not-allowed disabled:opacity-70"
        >
          {pending ? <LoaderCircle className="size-4 animate-spin" /> : null}
          {pending
            ? "Envoi..."
            : isQuote
              ? "Envoyer demande de devis"
              : "Envoyer demande de RDV"}
        </button>

        <p
          aria-live="polite"
          className={cn(
            "text-sm leading-6",
            state.status === "success" ? "text-brand" : "text-muted-foreground"
          )}
        >
          {state.message}
        </p>
      </form>
    </article>
  );
}

export function LeadFormsSection() {
  return (
    <section id="contact" className="space-y-6">
      <div className="reveal-up flex flex-wrap items-end justify-between gap-4" style={{ "--reveal-delay": "980ms" } as CSSProperties}>
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Contact atelier</p>
          <h2 className="font-display text-5xl leading-[0.9] text-foreground md:text-6xl">
            Devis rapide
            <br />
            ou RDV direct.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-muted-foreground md:text-base">
          Formulaire traite par email Gmail SMTP. Reponse humaine rapide pendant heures d ouverture.
        </p>
      </div>

      <div className="reveal-up grid gap-5 lg:grid-cols-2" style={{ "--reveal-delay": "1060ms" } as CSSProperties}>
        <LeadFormCard kind="devis" />
        <LeadFormCard kind="rdv" />
      </div>
    </section>
  );
}
