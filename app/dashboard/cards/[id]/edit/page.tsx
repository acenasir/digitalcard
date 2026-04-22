import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect, notFound } from "next/navigation";
import CardEditor from "@/components/CardEditor";

export default async function EditCardPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getSession();
  if (!session) redirect("/login");

  const { id } = await params;
  const card = await prisma.businessCard.findFirst({ where: { id, userId: session.userId } });
  if (!card) notFound();

  return <CardEditor mode="edit" card={card} />;
}
