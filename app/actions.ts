"use server";

import nodemailer from "nodemailer";

type LeadType = "devis" | "rdv";

type FieldName =
  | "fullName"
  | "phone"
  | "email"
  | "device"
  | "issue"
  | "availability"
  | "workshop"
  | "consent";

type FieldErrors = Partial<Record<FieldName, string>>;

export type LeadFormState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: FieldErrors;
};

const initialState: LeadFormState = {
  status: "idle",
  message: "",
};

function textField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value: string) {
  return /^[+\d][\d\s().-]{7,}$/.test(value);
}

function readEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function validateLeadForm(formData: FormData, leadType: LeadType): FieldErrors {
  const errors: FieldErrors = {};

  const fullName = textField(formData, "fullName");
  const phone = textField(formData, "phone");
  const email = textField(formData, "email");
  const device = textField(formData, "device");
  const issue = textField(formData, "issue");
  const availability = textField(formData, "availability");
  const workshop = textField(formData, "workshop");
  const consent = textField(formData, "consent");
  const trap = textField(formData, "company");

  if (trap) {
    errors.fullName = "Soumission invalide.";
    return errors;
  }

  if (fullName.length < 2) {
    errors.fullName = "Nom requis.";
  }

  if (!isValidPhone(phone)) {
    errors.phone = "Telephone invalide.";
  }

  if (!isValidEmail(email)) {
    errors.email = "Email invalide.";
  }

  if (device.length < 2) {
    errors.device = "Appareil requis.";
  }

  if (issue.length < 8) {
    errors.issue = "Detaillez panne (8 caracteres min).";
  }

  if (availability.length < 5) {
    errors.availability = "Indiquez disponibilite.";
  }

  if (leadType === "rdv" && !["fresnes", "savigny"].includes(workshop)) {
    errors.workshop = "Choisissez atelier.";
  }

  if (consent !== "yes") {
    errors.consent = "Consentement requis.";
  }

  return errors;
}

function mailConfig() {
  const host = readEnv("SMTP_HOST") ?? "smtp.gmail.com";
  const port = Number(readEnv("SMTP_PORT") ?? "465");
  const user = readEnv("SMTP_USER");
  const pass = readEnv("SMTP_PASS");
  const secure = (readEnv("SMTP_SECURE") ?? "true") === "true";
  const from = readEnv("SMTP_FROM") ?? user;
  const to = readEnv("LEADS_TO_EMAIL") ?? user;
  const shopPhone = readEnv("SHOP_PHONE") ?? "06 58 99 34 08";
  const shopPhoneAlt = readEnv("SHOP_PHONE_ALT") ?? "06 05 82 21 26";
  const shopAddressFresnes =
    readEnv("SHOP_ADDRESS_FRESNES") ?? "6 rue Maurice Tenine, 94260 Fresnes";
  const shopAddressSavigny =
    readEnv("SHOP_ADDRESS_SAVIGNY") ?? "229 Av. de l'Europe, 77176 Savigny-le-Temple";
  const shopHours =
    readEnv("SHOP_HOURS") ?? "Lundi-Samedi, 10h-19h";

  if (!user || !pass || !from || !to) {
    const missing = [
      !user ? "SMTP_USER" : null,
      !pass ? "SMTP_PASS" : null,
      !from ? "SMTP_FROM" : null,
      !to ? "LEADS_TO_EMAIL" : null,
    ].filter(Boolean);
    console.error("SMTP config missing", { missing });
    return null;
  }

  return {
    host,
    port,
    secure,
    user,
    pass,
    from,
    to,
    shopPhone,
    shopPhoneAlt,
    shopAddressFresnes,
    shopAddressSavigny,
    shopHours,
  };
}

function workshopMeta(workshop: string, config: ReturnType<typeof mailConfig>) {
  if (!config) {
    return null;
  }

  if (workshop === "fresnes") {
    return {
      label: "Fresnes",
      address: config.shopAddressFresnes,
    };
  }

  if (workshop === "savigny") {
    return {
      label: "Savigny-le-Temple",
      address: config.shopAddressSavigny,
    };
  }

  return null;
}

function customerReplyTemplate(args: {
  leadType: LeadType;
  fullName: string;
  device: string;
  issue: string;
  availability: string;
  workshopLabel: string | null;
  workshopAddress: string | null;
  shopPhone: string;
  shopPhoneAlt: string;
  shopHours: string;
}) {
  const kindLabel =
    args.leadType === "devis" ? "demande de devis" : "demande de rendez-vous";
  const subject =
    args.leadType === "devis"
      ? "Phone Life - Confirmation demande de devis"
      : "Phone Life - Confirmation prise de RDV";

  const text = [
    `Bonjour ${args.fullName},`,
    "",
    `Nous avons bien recu votre ${kindLabel}.`,
    "Notre equipe vous recontacte rapidement pendant les heures d'ouverture.",
    "",
    "Recapitulatif:",
    `- Appareil: ${args.device}`,
    `- Disponibilite: ${args.availability}`,
    ...(args.workshopLabel ? [`- Atelier: ${args.workshopLabel}`] : []),
    ...(args.workshopAddress ? [`- Adresse atelier: ${args.workshopAddress}`] : []),
    `- Panne: ${args.issue}`,
    "",
    `Telephone atelier: ${args.shopPhone}`,
    `Telephone atelier 2: ${args.shopPhoneAlt}`,
    `Horaires: ${args.shopHours}`,
    "",
    "Merci,",
    "Phone Life",
  ].join("\n");

  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1a1a1a;">
      <h2 style="margin: 0 0 12px;">Bonjour ${escapeHtml(args.fullName)},</h2>
      <p style="margin: 0 0 12px;">
        Nous avons bien recu votre ${escapeHtml(kindLabel)}.
        Notre equipe vous recontacte rapidement pendant les heures d ouverture.
      </p>
      <p style="margin: 0 0 8px;"><strong>Recapitulatif</strong></p>
      <ul style="margin: 0 0 14px 20px; padding: 0;">
        <li><strong>Appareil:</strong> ${escapeHtml(args.device)}</li>
        <li><strong>Disponibilite:</strong> ${escapeHtml(args.availability)}</li>
        ${
          args.workshopLabel
            ? `<li><strong>Atelier:</strong> ${escapeHtml(args.workshopLabel)}</li>`
            : ""
        }
        ${
          args.workshopAddress
            ? `<li><strong>Adresse atelier:</strong> ${escapeHtml(args.workshopAddress)}</li>`
            : ""
        }
        <li><strong>Panne:</strong> ${escapeHtml(args.issue).replaceAll("\n", "<br />")}</li>
      </ul>
      <p style="margin: 0 0 10px;">
        <strong>Telephone atelier:</strong> ${escapeHtml(args.shopPhone)}<br />
        <strong>Telephone atelier 2:</strong> ${escapeHtml(args.shopPhoneAlt)}<br />
        <strong>Horaires:</strong> ${escapeHtml(args.shopHours)}
      </p>
      <p style="margin: 14px 0 0;">Merci,<br />Phone Life</p>
    </div>
  `;

  return {
    subject,
    text,
    html,
  };
}

async function sendLeadEmail(formData: FormData, leadType: LeadType) {
  const config = mailConfig();

  if (!config) {
    return {
      status: "error",
      message:
        "Service email indisponible. Configurez SMTP_USER et SMTP_PASS (SMTP_FROM / LEADS_TO_EMAIL optionnels).",
    } as LeadFormState;
  }

  const errors = validateLeadForm(formData, leadType);
  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Champs incomplets ou invalides.",
      errors,
    } as LeadFormState;
  }

  const fullName = textField(formData, "fullName");
  const phone = textField(formData, "phone");
  const email = textField(formData, "email");
  const device = textField(formData, "device");
  const issue = textField(formData, "issue");
  const availability = textField(formData, "availability");
  const workshop = textField(formData, "workshop");
  const workshopData = workshopMeta(workshop, config);

  const kindLabel = leadType === "devis" ? "Demande de devis" : "Prise de RDV";

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  const subject = `[Phone Life] ${kindLabel} - ${fullName}`;

  const text = [
    `Type: ${kindLabel}`,
    `Nom: ${fullName}`,
    `Telephone: ${phone}`,
    `Email: ${email}`,
    `Appareil: ${device}`,
    `Disponibilite: ${availability}`,
    ...(workshopData ? [`Atelier: ${workshopData.label}`, `Adresse atelier: ${workshopData.address}`] : []),
    `Probleme: ${issue}`,
  ].join("\n");

  const html = `
    <h2>${escapeHtml(kindLabel)}</h2>
    <p><strong>Nom:</strong> ${escapeHtml(fullName)}</p>
    <p><strong>Telephone:</strong> ${escapeHtml(phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Appareil:</strong> ${escapeHtml(device)}</p>
    <p><strong>Disponibilite:</strong> ${escapeHtml(availability)}</p>
    ${
      workshopData
        ? `<p><strong>Atelier:</strong> ${escapeHtml(workshopData.label)}</p><p><strong>Adresse atelier:</strong> ${escapeHtml(workshopData.address)}</p>`
        : ""
    }
    <p><strong>Probleme:</strong></p>
    <p>${escapeHtml(issue).replaceAll("\n", "<br />")}</p>
  `;

  const customerReply = customerReplyTemplate({
    leadType,
    fullName,
    device,
    issue,
    availability,
    workshopLabel: workshopData?.label ?? null,
    workshopAddress: workshopData?.address ?? null,
    shopPhone: config.shopPhone,
    shopPhoneAlt: config.shopPhoneAlt,
    shopHours: config.shopHours,
  });

  try {
    await transporter.sendMail({
      from: config.from,
      to: config.to,
      subject,
      text,
      html,
      replyTo: email,
    });

    try {
      await transporter.sendMail({
        from: config.from,
        to: email,
        subject: customerReply.subject,
        text: customerReply.text,
        html: customerReply.html,
        replyTo: config.to,
      });
    } catch {
      
    }

    return {
      status: "success",
      message: "Message envoye. Reponse rapide de notre equipe.",
    } as LeadFormState;
  } catch {
    return {
      status: "error",
      message: "Echec envoi email. Verifiez configuration SMTP Gmail.",
    } as LeadFormState;
  }
}

export async function sendQuoteRequest(
  prevState: LeadFormState = initialState,
  formData: FormData
) {
  void prevState;
  return sendLeadEmail(formData, "devis");
}

export async function sendAppointmentRequest(
  prevState: LeadFormState = initialState,
  formData: FormData
) {
  void prevState;
  return sendLeadEmail(formData, "rdv");
}
