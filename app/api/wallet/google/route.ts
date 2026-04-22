import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildGoogleSaveURL, buildGoogleWalletObject, getGoogleWalletSetupStatus } from "@/lib/wallet/google";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cardId = searchParams.get("cardId");

  if (!cardId) return NextResponse.json({ error: "cardId required" }, { status: 400 });

  const status = getGoogleWalletSetupStatus();
  if (!status.configured) {
    return NextResponse.json(
      {
        error: "Google Wallet not configured",
        missing: status.missing,
        instructions: "Add the missing environment variables to enable Google Wallet. See .env.example for details.",
      },
      { status: 503 }
    );
  }

  const card = await prisma.businessCard.findUnique({ where: { id: cardId } });
  if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const saveUrl = await buildGoogleSaveURL(card, appUrl);

  if (!saveUrl) {
    return NextResponse.json({ error: "Failed to generate save URL" }, { status: 500 });
  }

  return NextResponse.json({ saveUrl, object: buildGoogleWalletObject(card, appUrl) });
}
