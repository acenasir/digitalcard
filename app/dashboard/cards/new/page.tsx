import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import CardEditor from "@/components/CardEditor";

export default async function NewCardPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  return <CardEditor mode="create" />;
}
