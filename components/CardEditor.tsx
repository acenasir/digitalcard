"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import WalletPreview from "./WalletPreview";

interface CardData {
  id?: string;
  displayName: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  linkedin: string;
  twitter: string;
  github: string;
  bio: string;
  bgColor: string;
  fgColor: string;
  accentColor: string;
  isPublic: boolean;
  slug?: string;
}

const DEFAULT: CardData = {
  displayName: "",
  title: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  linkedin: "",
  twitter: "",
  github: "",
  bio: "",
  bgColor: "#1e3a8a",
  fgColor: "#ffffff",
  accentColor: "#60a5fa",
  isPublic: true,
};

const PRESETS = [
  { label: "Navy", bg: "#1e3a8a", fg: "#ffffff", accent: "#60a5fa" },
  { label: "Midnight", bg: "#0f172a", fg: "#f1f5f9", accent: "#818cf8" },
  { label: "Emerald", bg: "#064e3b", fg: "#ecfdf5", accent: "#34d399" },
  { label: "Crimson", bg: "#7f1d1d", fg: "#fff1f2", accent: "#fca5a5" },
  { label: "Slate", bg: "#1e293b", fg: "#f8fafc", accent: "#94a3b8" },
  { label: "Violet", bg: "#4c1d95", fg: "#faf5ff", accent: "#c4b5fd" },
];

export default function CardEditor({ mode, card }: { mode: "create" | "edit"; card?: Record<string, unknown> }) {
  const router = useRouter();
  const initial: CardData = card
    ? {
        id: card.id as string,
        displayName: (card.displayName as string) || "",
        title: (card.title as string) || "",
        company: (card.company as string) || "",
        email: (card.email as string) || "",
        phone: (card.phone as string) || "",
        website: (card.website as string) || "",
        linkedin: (card.linkedin as string) || "",
        twitter: (card.twitter as string) || "",
        github: (card.github as string) || "",
        bio: (card.bio as string) || "",
        bgColor: (card.bgColor as string) || "#1e3a8a",
        fgColor: (card.fgColor as string) || "#ffffff",
        accentColor: (card.accentColor as string) || "#60a5fa",
        isPublic: (card.isPublic as boolean) ?? true,
        slug: card.slug as string,
      }
    : DEFAULT;

  const [data, setData] = useState<CardData>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"info" | "design" | "social">("info");

  function set(field: keyof CardData, value: string | boolean) {
    setData((d) => ({ ...d, [field]: value }));
  }

  async function handleSave() {
    if (!data.displayName.trim()) { setError("Display name is required"); return; }
    setError("");
    setSaving(true);

    try {
      const url = mode === "create" ? "/api/cards" : `/api/cards/${data.id}`;
      const method = mode === "create" ? "POST" : "PATCH";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) { setError(json.error || "Save failed"); return; }

      router.push("/dashboard");
      router.refresh();
    } catch {
      setError("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors text-sm";

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Nav */}
      <nav className="border-b border-slate-800 bg-slate-900 px-6 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-white transition-colors text-sm">← Back</Link>
            <h1 className="text-white font-semibold">{mode === "create" ? "New card" : "Edit card"}</h1>
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-red-400 text-sm">{error}</span>}
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-lg font-medium text-sm transition-colors"
            >
              {saving ? "Saving…" : mode === "create" ? "Create card" : "Save changes"}
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8 grid lg:grid-cols-2 gap-10">
        {/* Editor Panel */}
        <div>
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 mb-6">
            {(["info", "design", "social"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  tab === t ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Info Tab */}
          {tab === "info" && (
            <div className="space-y-4">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Full name <span className="text-red-400">*</span></label>
                <input type="text" value={data.displayName} onChange={(e) => set("displayName", e.target.value)}
                  className={inputClass} placeholder="Alex Johnson" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Job title</label>
                <input type="text" value={data.title} onChange={(e) => set("title", e.target.value)}
                  className={inputClass} placeholder="Senior Product Designer" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Company</label>
                <input type="text" value={data.company} onChange={(e) => set("company", e.target.value)}
                  className={inputClass} placeholder="Acme Corporation" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Email</label>
                <input type="email" value={data.email} onChange={(e) => set("email", e.target.value)}
                  className={inputClass} placeholder="alex@acme.com" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Phone</label>
                <input type="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)}
                  className={inputClass} placeholder="+1 555 0123" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Website</label>
                <input type="url" value={data.website} onChange={(e) => set("website", e.target.value)}
                  className={inputClass} placeholder="https://acme.com" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-1.5">Bio</label>
                <textarea value={data.bio} onChange={(e) => set("bio", e.target.value)}
                  className={`${inputClass} resize-none`} rows={3} placeholder="A short introduction about yourself..." />
              </div>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => set("isPublic", !data.isPublic)}
                  className={`w-10 h-6 rounded-full transition-colors relative ${data.isPublic ? "bg-blue-600" : "bg-slate-700"}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-all ${data.isPublic ? "left-5" : "left-1"}`} />
                </div>
                <span className="text-slate-300 text-sm">Public card (visible to anyone with the link)</span>
              </label>
            </div>
          )}

          {/* Design Tab */}
          {tab === "design" && (
            <div className="space-y-6">
              <div>
                <label className="block text-slate-300 text-sm font-medium mb-3">Colour presets</label>
                <div className="grid grid-cols-3 gap-3">
                  {PRESETS.map((p) => (
                    <button
                      key={p.label}
                      onClick={() => setData((d) => ({ ...d, bgColor: p.bg, fgColor: p.fg, accentColor: p.accent }))}
                      className={`rounded-xl overflow-hidden border-2 transition-all ${
                        data.bgColor === p.bg ? "border-blue-500 scale-105" : "border-transparent"
                      }`}
                    >
                      <div className="h-12" style={{ background: p.bg }} />
                      <div className="bg-slate-800 py-1.5 text-xs text-center text-slate-300">{p.label}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Background</label>
                  <div className="flex gap-2">
                    <input type="color" value={data.bgColor} onChange={(e) => set("bgColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-slate-700 bg-transparent cursor-pointer" />
                    <input type="text" value={data.bgColor} onChange={(e) => set("bgColor", e.target.value)}
                      className={`${inputClass} font-mono`} />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Text</label>
                  <div className="flex gap-2">
                    <input type="color" value={data.fgColor} onChange={(e) => set("fgColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-slate-700 bg-transparent cursor-pointer" />
                    <input type="text" value={data.fgColor} onChange={(e) => set("fgColor", e.target.value)}
                      className={`${inputClass} font-mono`} />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">Accent</label>
                  <div className="flex gap-2">
                    <input type="color" value={data.accentColor} onChange={(e) => set("accentColor", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-slate-700 bg-transparent cursor-pointer" />
                    <input type="text" value={data.accentColor} onChange={(e) => set("accentColor", e.target.value)}
                      className={`${inputClass} font-mono`} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Social Tab */}
          {tab === "social" && (
            <div className="space-y-4">
              {[
                { field: "linkedin" as const, label: "LinkedIn", placeholder: "linkedin.com/in/alexjohnson" },
                { field: "twitter" as const, label: "Twitter / X", placeholder: "@alexjohnson" },
                { field: "github" as const, label: "GitHub", placeholder: "github.com/alexjohnson" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label className="block text-slate-300 text-sm font-medium mb-1.5">{label}</label>
                  <input type="text" value={data[field]} onChange={(e) => set(field, e.target.value)}
                    className={inputClass} placeholder={placeholder} />
                </div>
              ))}
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-4 mt-4">
                <p className="text-slate-400 text-xs leading-relaxed">
                  Social links appear on the back of your Apple Wallet card and on your public profile page. Recipients tap to open each profile directly.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Preview Panel */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-white font-semibold">Live preview</h2>
            {data.slug && (
              <Link href={`/card/${data.slug}`} target="_blank"
                className="text-blue-400 hover:text-blue-300 text-sm transition-colors">
                View public page →
              </Link>
            )}
          </div>
          <WalletPreview data={data} />
        </div>
      </div>
    </div>
  );
}
