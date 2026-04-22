interface VCardData {
  displayName: string;
  title?: string | null;
  company?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
  github?: string | null;
  bio?: string | null;
}

export function generateVCard(data: VCardData): string {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${data.displayName}`,
    `N:${data.displayName.split(" ").slice(1).join(" ")};${data.displayName.split(" ")[0]};;;`,
  ];

  if (data.company) lines.push(`ORG:${data.company}`);
  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.email) lines.push(`EMAIL;type=INTERNET;type=WORK;type=pref:${data.email}`);
  if (data.phone) lines.push(`TEL;type=CELL:${data.phone}`);
  if (data.website) lines.push(`URL:${data.website}`);
  if (data.bio) lines.push(`NOTE:${data.bio.replace(/\n/g, "\\n")}`);

  if (data.linkedin) lines.push(`X-SOCIALPROFILE;type=linkedin:${data.linkedin}`);
  if (data.twitter) lines.push(`X-SOCIALPROFILE;type=twitter:${data.twitter}`);
  if (data.github) lines.push(`X-SOCIALPROFILE;type=github:${data.github}`);

  lines.push("END:VCARD");
  return lines.join("\r\n");
}
