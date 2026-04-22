import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { buildApplePassJSON, getAppleWalletSetupStatus } from "@/lib/wallet/apple";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const cardId = searchParams.get("cardId");

  if (!cardId) return NextResponse.json({ error: "cardId required" }, { status: 400 });

  const status = getAppleWalletSetupStatus();
  if (!status.configured) {
    return NextResponse.json(
      {
        error: "Apple Wallet not configured",
        missing: status.missing,
        instructions: "Add the missing environment variables to enable Apple Wallet pass generation. See .env.example for details.",
      },
      { status: 503 }
    );
  }

  const card = await prisma.businessCard.findUnique({ where: { id: cardId } });
  if (!card) return NextResponse.json({ error: "Card not found" }, { status: 404 });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const passJSON = buildApplePassJSON(card, appUrl);

  return NextResponse.json({ passJSON, note: "Sign this JSON with your Apple certificate to generate a .pkpass file" });
}
