import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { generateVCard } from "@/lib/vcard";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = await prisma.businessCard.findUnique({ where: { slug, isPublic: true } });

  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const vcardContent = generateVCard({
    displayName: card.displayName,
    title: card.title,
    company: card.company,
    email: card.email,
    phone: card.phone,
    website: card.website,
    linkedin: card.linkedin,
    twitter: card.twitter,
    github: card.github,
    bio: card.bio,
  });

  const safeFilename = card.displayName.replace(/[^a-z0-9]/gi, "-").toLowerCase();

  return new NextResponse(vcardContent, {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safeFilename}.vcf"`,
    },
  });
}
