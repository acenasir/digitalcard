interface CardData {
  id: string;
  displayName: string;
  title?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  bgColor: string;
  fgColor: string;
  slug: string;
}

export function buildApplePassJSON(card: CardData, appUrl: string) {
  const secondaryFields = [];
  const auxiliaryFields = [];
  const backFields = [];

  if (card.title) secondaryFields.push({ key: "title", label: "TITLE", value: card.title });
  if (card.company) secondaryFields.push({ key: "company", label: "COMPANY", value: card.company });
  if (card.email) auxiliaryFields.push({ key: "email", label: "EMAIL", value: card.email });
  if (card.phone) auxiliaryFields.push({ key: "phone", label: "PHONE", value: card.phone });
  if (card.website) backFields.push({ key: "website", label: "WEBSITE", value: card.website });

  backFields.push({
    key: "profile",
    label: "PROFILE",
    value: `${appUrl}/card/${card.slug}`,
  });

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r},${g},${b})`;
  };

  return {
    formatVersion: 1,
    passTypeIdentifier: process.env.APPLE_PASS_TYPE_ID || "pass.com.digitalcard.business",
    serialNumber: card.id,
    teamIdentifier: process.env.APPLE_TEAM_ID || "TEAMID",
    organizationName: "DigitalCard",
    description: `${card.displayName} — Business Card`,
    foregroundColor: hexToRgb(card.fgColor),
    backgroundColor: hexToRgb(card.bgColor),
    generic: {
      primaryFields: [{ key: "name", label: "NAME", value: card.displayName }],
      secondaryFields,
      auxiliaryFields,
      backFields,
    },
    barcode: {
      format: "PKBarcodeFormatQR",
      message: `${appUrl}/card/${card.slug}`,
      messageEncoding: "iso-8859-1",
    },
    webServiceURL: `${appUrl}/api/wallet/apple`,
    authenticationToken: card.id.replace(/-/g, ""),
  };
}

export function getAppleWalletSetupStatus(): { configured: boolean; missing: string[] } {
  const missing = [];
  if (!process.env.APPLE_PASS_TYPE_ID) missing.push("APPLE_PASS_TYPE_ID");
  if (!process.env.APPLE_TEAM_ID) missing.push("APPLE_TEAM_ID");
  if (!process.env.APPLE_CERT_BASE64) missing.push("APPLE_CERT_BASE64");
  if (!process.env.APPLE_WWDR_CERT_BASE64) missing.push("APPLE_WWDR_CERT_BASE64");
  return { configured: missing.length === 0, missing };
}
