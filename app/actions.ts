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
  | "workshop";

type FieldErrors = Partial<Record<FieldName, string>>;

export type LeadFormState = {
  status: "idle" | "error" | "success";
  message: string;
  errors?: FieldErrors;
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

  const brandColor = "#ff791d";
  const bgColor = "#0a0a0a";
  const cardColor = "#141414";
  const textColor = "#ffffff";
  const mutedColor = "#a1a1aa";

  const html = `
    <div style="background-color: ${bgColor}; padding: 40px 20px; font-family: system-ui, -apple-system, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: ${cardColor}; border: 1px solid #27272a; border-radius: 24px; overflow: hidden; color: ${textColor};">
        <div style="padding: 40px; border-bottom: 1px solid #27272a;">
          <h1 style="margin: 0; font-size: 24px; color: ${brandColor}; text-transform: uppercase; letter-spacing: 0.05em;">Phone Life</h1>
          <p style="margin: 8px 0 0; color: ${mutedColor}; font-size: 14px;">Confirmation de réception</p>
        </div>
        
        <div style="padding: 40px;">
          <h2 style="margin: 0 0 16px; font-size: 20px;">Bonjour ${escapeHtml(args.fullName)},</h2>
          <p style="margin: 0 0 24px; color: ${mutedColor}; line-height: 1.6;">
            Nous avons bien reçu votre <strong>${kindLabel}</strong>. 
            Notre équipe technique vous recontactera rapidement par téléphone.
          </p>

          <div style="background-color: #1a1a1a; border-radius: 16px; padding: 24px; margin-bottom: 32px; border: 1px solid #27272a;">
            <p style="margin: 0 0 16px; font-size: 12px; font-weight: bold; color: ${brandColor}; text-transform: uppercase; letter-spacing: 0.1em;">Détails de la demande</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; color: ${mutedColor}; font-size: 14px;">Appareil</td><td style="padding: 8px 0; text-align: right;">${escapeHtml(args.device)}</td></tr>
              <tr><td style="padding: 8px 0; color: ${mutedColor}; font-size: 14px;">Disponibilité</td><td style="padding: 8px 0; text-align: right;">${escapeHtml(args.availability)}</td></tr>
              ${args.workshopLabel ? `<tr><td style="padding: 8px 0; color: ${mutedColor}; font-size: 14px;">Atelier</td><td style="padding: 8px 0; text-align: right;">${escapeHtml(args.workshopLabel)}</td></tr>` : ""}
            </table>
            <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #27272a;">
              <p style="margin: 0 0 8px; color: ${mutedColor}; font-size: 14px;">Problème décrit :</p>
              <p style="margin: 0; line-height: 1.5;">${escapeHtml(args.issue).replaceAll("\n", "<br />")}</p>
            </div>
          </div>

          <div style="padding-top: 32px; border-top: 1px solid #27272a;">
            <p style="margin: 0 0 12px; font-size: 14px;"><strong>L'Atelier</strong></p>
            <p style="margin: 0; font-size: 14px; color: ${mutedColor};">
              ${args.workshopAddress ? `${escapeHtml(args.workshopAddress)}<br />` : ""}
              ${escapeHtml(args.shopPhone)} • ${escapeHtml(args.shopPhoneAlt)}<br />
              ${escapeHtml(args.shopHours)}
            </p>
          </div>
        </div>
      </div>
    </div>
  `;

  return {
    subject,
    text: `Bonjour ${args.fullName}, nous avons bien recu votre ${kindLabel}. Appareil: ${args.device}.`,
    html,
  };
}

async function sendLeadEmail(
  formData: FormData,
  leadType: LeadType
): Promise<LeadFormState> {
  const config = mailConfig();
  if (!config) {
    return { status: "error", message: "SMTP Config Missing" };
  }

  const errors = validateLeadForm(formData, leadType);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Invalide", errors };
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
  const brandColor = "#ff791d";

  const html = `
    <div style="background-color: #f4f4f5; padding: 40px 20px; font-family: system-ui, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; padding: 40px; border: 1px solid #e4e4e7;">
        <h1 style="margin: 0 0 24px; font-size: 20px; color: #18181b;">${kindLabel} : ${escapeHtml(fullName)}</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 12px 0; color: #71717a;">Client</td><td style="padding: 12px 0; text-align: right; font-weight: bold;">${escapeHtml(fullName)}</td></tr>
          <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 12px 0; color: #71717a;">Téléphone</td><td style="padding: 12px 0; text-align: right; font-weight: bold; color: ${brandColor};">${escapeHtml(phone)}</td></tr>
          <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 12px 0; color: #71717a;">Email</td><td style="padding: 12px 0; text-align: right;">${escapeHtml(email)}</td></tr>
          <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 12px 0; color: #71717a;">Appareil</td><td style="padding: 12px 0; text-align: right;">${escapeHtml(device)}</td></tr>
          <tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 12px 0; color: #71717a;">Dispo</td><td style="padding: 12px 0; text-align: right;">${escapeHtml(availability)}</td></tr>
          ${workshopData ? `<tr style="border-bottom: 1px solid #f4f4f5;"><td style="padding: 12px 0; color: #71717a;">Atelier</td><td style="padding: 12px 0; text-align: right;">${escapeHtml(workshopData.label)}</td></tr>` : ""}
        </table>

        <div style="background-color: #fafafa; padding: 20px; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-size: 12px; color: #71717a; text-transform: uppercase;">Message :</p>
          <p style="margin: 0; line-height: 1.5;">${escapeHtml(issue).replaceAll("\n", "<br />")}</p>
        </div>
      </div>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });

  const customerReply = customerReplyTemplate({
    leadType, fullName, device, issue, availability,
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
      subject: `[Phone Life] ${kindLabel} - ${fullName}`,
      text: `Nouveau lead: ${fullName} - ${phone}`,
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
    } catch (e) { console.error("Reply failed", e); }

    return { status: "success", message: "Message envoye." };
  } catch (e) {
    console.error("Send failed", e);
    return { status: "error", message: "Erreur envoi." };
  }
}

export async function sendQuoteRequest(
  prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  void prevState;
  return sendLeadEmail(formData, "devis");
}

export async function sendAppointmentRequest(
  prevState: LeadFormState,
  formData: FormData
): Promise<LeadFormState> {
  void prevState;
  return sendLeadEmail(formData, "rdv");
}
