import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PublicCardClient from "./PublicCardClient";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const card = await prisma.businessCard.findUnique({ where: { slug, isPublic: true } });
  if (!card) return { title: "Card not found" };

  return {
    title: `${card.displayName}${card.company ? ` — ${card.company}` : ""}`,
    description: card.bio || `Connect with ${card.displayName}${card.title ? `, ${card.title}` : ""}`,
    openGraph: {
      title: card.displayName,
      description: card.bio || `${card.title || ""} ${card.company ? `at ${card.company}` : ""}`.trim(),
    },
  };
}

export default async function PublicCardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = await prisma.businessCard.findUnique({ where: { slug, isPublic: true } });

  if (!card) notFound();

  // Increment view count (non-blocking)
  prisma.businessCard.update({ where: { id: card.id }, data: { views: { increment: 1 } } }).catch(() => {});

  return <PublicCardClient card={card} />;
}
