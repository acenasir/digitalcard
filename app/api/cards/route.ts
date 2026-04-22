import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

function generateSlug(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const suffix = Math.random().toString(36).slice(2, 7);
  return `${base}-${suffix}`;
}

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cards = await prisma.businessCard.findMany({
    where: { userId: session.userId },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({ cards });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { displayName, title, company, email, phone, website, linkedin, twitter, github, bio, bgColor, fgColor, accentColor } = body;

  if (!displayName) {
    return NextResponse.json({ error: "Display name is required" }, { status: 400 });
  }

  const slug = generateSlug(displayName);

  const card = await prisma.businessCard.create({
    data: {
      userId: session.userId,
      slug,
      displayName,
      title: title || null,
      company: company || null,
      email: email || null,
      phone: phone || null,
      website: website || null,
      linkedin: linkedin || null,
      twitter: twitter || null,
      github: github || null,
      bio: bio || null,
      bgColor: bgColor || "#1e3a8a",
      fgColor: fgColor || "#ffffff",
      accentColor: accentColor || "#60a5fa",
    },
  });

  return NextResponse.json({ card }, { status: 201 });
}
