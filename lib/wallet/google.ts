import { SignJWT } from "jose";
import { TextEncoder } from "util";

interface CardData {
  id: string;
  displayName: string;
  title?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  bgColor: string;
  slug: string;
}

export function buildGoogleWalletObject(card: CardData, appUrl: string) {
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID || "YOUR_ISSUER_ID";
  const objectId = `${issuerId}.card-${card.id.replace(/-/g, "")}`;
  const classId = `${issuerId}.businesscard-class-v1`;

  const textModules = [];
  if (card.email) textModules.push({ header: "EMAIL", body: card.email, id: "email" });
  if (card.phone) textModules.push({ header: "PHONE", body: card.phone, id: "phone" });
  if (card.website) textModules.push({ header: "WEBSITE", body: card.website, id: "web" });

  return {
    id: objectId,
    classId,
    cardTitle: { defaultValue: { language: "en-US", value: "Business Card" } },
    subheader: { defaultValue: { language: "en-US", value: card.company || "Digital Business Card" } },
    header: { defaultValue: { language: "en-US", value: card.displayName } },
    ...(card.title && {
      textModulesData: [
        { header: "TITLE", body: card.title, id: "title" },
        ...textModules,
      ],
    }),
    ...(!card.title && textModules.length > 0 && { textModulesData: textModules }),
    barcode: {
      type: "QR_CODE",
      value: `${appUrl}/card/${card.slug}`,
      alternateText: "Scan to connect",
    },
    hexBackgroundColor: card.bgColor,
    state: "ACTIVE",
  };
}

export async function buildGoogleSaveURL(card: CardData, appUrl: string): Promise<string | null> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  const issuerId = process.env.GOOGLE_WALLET_ISSUER_ID;

  if (!serviceAccountEmail || !serviceAccountKey || !issuerId) return null;

  const privateKey = Buffer.from(serviceAccountKey, "base64").toString("utf-8");
  const key = await crypto.subtle.importKey(
    "pkcs8",
    Buffer.from(privateKey.replace(/-----[^-]+-----/g, "").replace(/\s/g, ""), "base64"),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const payload = {
    iss: serviceAccountEmail,
    aud: "google",
    typ: "savetowallet",
    iat: Math.floor(Date.now() / 1000),
    origins: [appUrl],
    payload: {
      genericObjects: [buildGoogleWalletObject(card, appUrl)],
    },
  };

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS256" })
    .sign(key);

  return `https://pay.google.com/gp/v/save/${token}`;
}

export function getGoogleWalletSetupStatus(): { configured: boolean; missing: string[] } {
  const missing = [];
  if (!process.env.GOOGLE_WALLET_ISSUER_ID) missing.push("GOOGLE_WALLET_ISSUER_ID");
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) missing.push("GOOGLE_SERVICE_ACCOUNT_EMAIL");
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) missing.push("GOOGLE_SERVICE_ACCOUNT_KEY");
  return { configured: missing.length === 0, missing };
}
