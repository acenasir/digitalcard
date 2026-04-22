import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";

async function getOwnedCard(cardId: string, userId: string) {
  return prisma.businessCard.findFirst({ where: { id: cardId, userId } });
}

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const card = await getOwnedCard(id, session.userId);
  if (!card) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ card });
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await getOwnedCard(id, session.userId);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const body = await req.json();
  const card = await prisma.businessCard.update({
    where: { id },
    data: {
      displayName: body.displayName ?? existing.displayName,
      title: body.title ?? existing.title,
      company: body.company ?? existing.company,
      email: body.email ?? existing.email,
      phone: body.phone ?? existing.phone,
      website: body.website ?? existing.website,
      linkedin: body.linkedin ?? existing.linkedin,
      twitter: body.twitter ?? existing.twitter,
      github: body.github ?? existing.github,
      bio: body.bio ?? existing.bio,
      bgColor: body.bgColor ?? existing.bgColor,
      fgColor: body.fgColor ?? existing.fgColor,
      accentColor: body.accentColor ?? existing.accentColor,
      isPublic: body.isPublic ?? existing.isPublic,
    },
  });

  return NextResponse.json({ card });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const existing = await getOwnedCard(id, session.userId);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.businessCard.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
