import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const [user, cards] = await Promise.all([
    prisma.user.findUnique({ where: { id: session.userId }, select: { name: true, email: true } }),
    prisma.businessCard.findMany({
      where: { userId: session.userId },
      orderBy: { updatedAt: "desc" },
    }),
  ]);

  return <DashboardClient user={user} initialCards={cards} />;
}
