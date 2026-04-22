"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Card {
  id: string;
  slug: string;
  displayName: string;
  title: string | null;
  company: string | null;
  email: string | null;
  bgColor: string;
  fgColor: string;
  isPublic: boolean;
  views: number;
  updatedAt: Date | string;
}

interface User {
  name: string | null;
  email: string;
}

export default function DashboardClient({ user, initialCards }: { user: User | null; initialCards: Card[] }) {
  const router = useRouter();
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const appUrl = typeof window !== "undefined" ? window.location.origin : "";

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this card? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await fetch(`/api/cards/${id}`, { method: "DELETE" });
      setCards((c) => c.filter((card) => card.id !== id));
    } finally {
      setDeletingId(null);
    }
  }

  function copyLink(slug: string) {
    navigator.clipboard.writeText(`${appUrl}/card/${slug}`);
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Topbar */}
      <nav className="border-b border-slate-800 bg-slate-900 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm text-white">DC</div>
            <span className="font-semibold text-white">DigitalCard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-sm hidden sm:block">{user?.email}</span>
            <button onClick={handleLogout} className="text-slate-400 hover:text-white text-sm transition-colors">Sign out</button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-white font-bold text-3xl">
              {user?.name ? `Hey, ${user.name.split(" ")[0]}` : "My Cards"}
            </h1>
            <p className="text-slate-400 mt-1">Manage your digital business cards</p>
          </div>
          <Link
            href="/dashboard/cards/new"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-5 py-3 rounded-xl font-medium transition-colors"
          >
            <span className="text-lg leading-none">+</span>
            New card
          </Link>
        </div>

        {/* Cards grid */}
        {cards.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-slate-700 rounded-2xl">
            <div className="text-slate-600 text-6xl mb-4">◻</div>
            <h3 className="text-white font-semibold text-xl mb-2">No cards yet</h3>
            <p className="text-slate-400 mb-6">Create your first digital business card</p>
            <Link href="/dashboard/cards/new" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
              Create your first card
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div key={card.id} className="group relative">
                {/* Card Preview */}
                <div
                  className="rounded-2xl p-6 mb-3 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${card.bgColor} 0%, ${card.bgColor}cc 100%)` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-[10px] font-medium uppercase tracking-widest" style={{ color: card.fgColor, opacity: 0.6 }}>
                      Business Card
                    </div>
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                      style={{ background: `${card.fgColor}20`, color: card.fgColor }}>
                      DC
                    </div>
                  </div>
                  <div style={{ color: card.fgColor }}>
                    <div className="font-bold text-lg">{card.displayName}</div>
                    {card.title && <div className="text-sm mt-0.5" style={{ opacity: 0.8 }}>{card.title}</div>}
                    {card.company && <div className="text-xs mt-0.5" style={{ opacity: 0.6 }}>{card.company}</div>}
                    {card.email && (
                      <div className="text-xs mt-3" style={{ opacity: 0.7 }}>{card.email}</div>
                    )}
                  </div>
                  {!card.isPublic && (
                    <div className="absolute top-3 right-3 bg-slate-900/70 text-slate-300 text-xs px-2 py-0.5 rounded-full">Private</div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-wrap">
                  <Link
                    href={`/dashboard/cards/${card.id}/edit`}
                    className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm py-2.5 rounded-xl transition-colors font-medium"
                  >
                    Edit
                  </Link>
                  <Link
                    href={`/card/${card.slug}`}
                    target="_blank"
                    className="flex-1 text-center bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm py-2.5 rounded-xl transition-colors font-medium"
                  >
                    Preview
                  </Link>
                  <button
                    onClick={() => copyLink(card.slug)}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm py-2.5 rounded-xl transition-colors font-medium"
                  >
                    Copy link
                  </button>
                  <button
                    onClick={() => handleDelete(card.id)}
                    disabled={deletingId === card.id}
                    className="bg-slate-800 hover:bg-red-950 hover:text-red-400 text-slate-400 text-sm py-2.5 px-3 rounded-xl transition-colors font-medium disabled:opacity-50"
                  >
                    {deletingId === card.id ? "…" : "✕"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
