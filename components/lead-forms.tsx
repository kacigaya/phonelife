"use client";

import { useActionState } from "react";
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
  const Icon = isQuote ? FileText : CalendarCheck2;
  const action = isQuote ? sendQuoteRequest : sendAppointmentRequest;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <article className="group relative border-border p-8 md:p-16 lg:border-r last:lg:border-r-0">
      <div className="relative z-10 mb-8 flex flex-col gap-8">
        <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-widest text-brand/70">
          <Icon className="size-4" />
          {isQuote ? "Devis gratuit" : "Rendez-vous"}
        </span>
        <h3 className="font-display text-4xl leading-[0.9] tracking-tight text-foreground md:text-6xl">
          {isQuote ? "Estimation express" : "Reserver un creneau"}
        </h3>
      </div>

      <form action={formAction} className="relative z-10 max-w-2xl space-y-8" noValidate>
        <input
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          name="company"
          type="text"
        />

        <div className="space-y-3">
          <label className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Nom complet
          </label>
          <input className="field-input" name="fullName" type="text" autoComplete="name" placeholder="Jean Dupont" required />
          {state.errors?.fullName ? <span className="field-error">{state.errors.fullName}</span> : null}
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-3">
            <label className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Telephone
            </label>
            <input className="field-input" name="phone" type="tel" autoComplete="tel" placeholder="06 12 34 56 78" required />
            {state.errors?.phone ? <span className="field-error">{state.errors.phone}</span> : null}
          </div>
          <div className="space-y-3">
            <label className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Email
            </label>
            <input
              className="field-input"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="jean@exemple.fr"
              suppressHydrationWarning
              required
            />
            {state.errors?.email ? <span className="field-error">{state.errors.email}</span> : null}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Appareil
          </label>
          <input
            className="field-input"
            name="device"
            type="text"
            placeholder="Ex: iPhone 14 Pro, Galaxy S23, iPad Air..."
            required
          />
          {state.errors?.device ? <span className="field-error">{state.errors.device}</span> : null}
        </div>

        <div className="space-y-3">
          <label className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Disponibilite souhaitee
          </label>
          <input
            className="field-input"
            name="availability"
            type="text"
            placeholder="Ex: Mardi apres-midi"
            required
          />
          {state.errors?.availability ? (
            <span className="field-error">{state.errors.availability}</span>
          ) : null}
        </div>

        {isQuote ? null : (
          <div className="space-y-3">
            <label className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground ml-1">
              Choix de l atelier
            </label>
            <select className="field-input" name="workshop" defaultValue="" required>
              <option value="" disabled>
                Selectionnez un lieu
              </option>
              <option value="fresnes">Fresnes (94)</option>
              <option value="savigny">Savigny-le-Temple (77)</option>
            </select>
            {state.errors?.workshop ? <span className="field-error">{state.errors.workshop}</span> : null}
          </div>
        )}

        <div className="space-y-3">
          <label className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Description de la panne
          </label>
          <textarea
            className="field-input min-h-32 resize-none"
            name="issue"
            placeholder="Decrivez le probleme..."
            required
          />
          {state.errors?.issue ? <span className="field-error">{state.errors.issue}</span> : null}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="pill-btn-solid w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? <LoaderCircle className="size-5 animate-spin" /> : null}
          {pending
            ? "Traitement..."
            : isQuote
              ? "Envoyer la demande"
              : "Confirmer le RDV"}
        </button>

        <p
          aria-live="polite"
          className={cn(
            "text-center text-sm font-medium",
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
    <section id="contact">
      <div className="mx-auto w-full max-w-7xl border-b border-border px-5 py-20 md:px-8 md:py-28">
        <div className="reveal-up space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Contact atelier</p>
          <h2 className="font-display text-5xl leading-[0.9] text-foreground md:text-7xl">
            Devis rapide
            <br />
            ou RDV direct.
          </h2>
        </div>
      </div>

      <div className="reveal-up mx-auto w-full max-w-7xl">
        <div className="grid lg:grid-cols-2">
          <LeadFormCard kind="devis" />
          <LeadFormCard kind="rdv" />
        </div>
      </div>
    </section>
  );
}
