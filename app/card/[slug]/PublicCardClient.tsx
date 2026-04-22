"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Card {
  id: string;
  slug: string;
  displayName: string;
  title: string | null;
  company: string | null;
  email: string | null;
  phone: string | null;
  website: string | null;
  linkedin: string | null;
  twitter: string | null;
  github: string | null;
  bio: string | null;
  bgColor: string;
  fgColor: string;
  accentColor: string;
}

export default function PublicCardClient({ card }: { card: Card }) {
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [appleStatus, setAppleStatus] = useState<"idle" | "loading" | "error" | "unconfigured">("idle");
  const [googleSaveUrl, setGoogleSaveUrl] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent;
    setIsIOS(/iPad|iPhone|iPod/.test(ua) && !/Chrome/.test(ua));
    setIsAndroid(/Android/.test(ua));
  }, []);

  async function handleAppleWallet() {
    setAppleStatus("loading");
    try {
      const res = await fetch(`/api/wallet/apple?cardId=${card.id}`);
      const data = await res.json();
      if (res.status === 503) {
        setAppleStatus("unconfigured");
      } else if (!res.ok) {
        setAppleStatus("error");
      } else {
        // In production with real certs, this would trigger a .pkpass download
        console.log("Pass JSON generated:", data.passJSON);
        alert("Apple Wallet credentials not yet configured. Add APPLE_CERT_BASE64, APPLE_PASS_TYPE_ID, and APPLE_TEAM_ID to your environment to enable pass generation.");
        setAppleStatus("idle");
      }
    } catch {
      setAppleStatus("error");
    }
  }

  async function handleGoogleWallet() {
    setGoogleLoading(true);
    try {
      const res = await fetch(`/api/wallet/google?cardId=${card.id}`);
      const data = await res.json();
      if (res.ok && data.saveUrl) {
        setGoogleSaveUrl(data.saveUrl);
        window.open(data.saveUrl, "_blank");
      } else {
        alert("Google Wallet credentials not yet configured. Add GOOGLE_WALLET_ISSUER_ID and service account credentials to your environment.");
      }
    } catch {
      alert("Failed to generate Google Wallet pass.");
    } finally {
      setGoogleLoading(false);
    }
  }

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const qrUrl = `/api/qr/${card.slug}`;

  return (
    <div className="min-h-screen" style={{ background: "#0f172a" }}>
      {/* Hero Card */}
      <div className="relative overflow-hidden" style={{
        background: `linear-gradient(160deg, ${card.bgColor} 0%, ${card.bgColor}99 60%, #0f172a 100%)`,
        paddingBottom: "80px",
      }}>
        <div className="max-w-lg mx-auto px-6 pt-12 pb-8">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold mb-6 shadow-xl"
            style={{ background: `${card.fgColor}20`, color: card.fgColor, border: `2px solid ${card.fgColor}30` }}>
            {card.displayName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>

          <h1 className="text-3xl font-bold mb-1" style={{ color: card.fgColor }}>{card.displayName}</h1>
          {card.title && <p className="text-lg mb-0.5" style={{ color: card.fgColor, opacity: 0.85 }}>{card.title}</p>}
          {card.company && <p className="text-base" style={{ color: card.accentColor }}>{card.company}</p>}
          {card.bio && (
            <p className="mt-4 text-sm leading-relaxed max-w-sm" style={{ color: card.fgColor, opacity: 0.7 }}>{card.bio}</p>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 -mt-10 pb-16 space-y-4">
        {/* Action Buttons */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
          <div className="grid grid-cols-2 gap-3 mb-3">
            {card.email && (
              <a href={`mailto:${card.email}`} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition-colors">
                <span className="text-xl">✉</span>
                <div>
                  <div className="text-white text-xs font-medium">Email</div>
                  <div className="text-slate-400 text-xs truncate max-w-[100px]">{card.email}</div>
                </div>
              </a>
            )}
            {card.phone && (
              <a href={`tel:${card.phone}`} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition-colors">
                <span className="text-xl">✆</span>
                <div>
                  <div className="text-white text-xs font-medium">Call</div>
                  <div className="text-slate-400 text-xs">{card.phone}</div>
                </div>
              </a>
            )}
            {card.website && (
              <a href={card.website} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition-colors">
                <span className="text-xl">⬡</span>
                <div>
                  <div className="text-white text-xs font-medium">Website</div>
                  <div className="text-slate-400 text-xs truncate max-w-[100px]">
                    {card.website.replace(/^https?:\/\//, "")}
                  </div>
                </div>
              </a>
            )}
            <button onClick={copyLink}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 rounded-xl px-4 py-3 transition-colors text-left">
              <span className="text-xl">{copied ? "✓" : "⎘"}</span>
              <div>
                <div className="text-white text-xs font-medium">{copied ? "Copied!" : "Copy link"}</div>
                <div className="text-slate-400 text-xs">Share profile</div>
              </div>
            </button>
          </div>

          {/* Save Contact */}
          <a href={`/api/vcard/${card.slug}`} download
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white py-3.5 rounded-xl font-medium transition-colors">
            <span>↓</span>
            Save Contact (.vcf)
          </a>
        </div>

        {/* Social Links */}
        {(card.linkedin || card.twitter || card.github) && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
            <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">Social</h3>
            <div className="space-y-2">
              {card.linkedin && (
                <a href={card.linkedin.startsWith("http") ? card.linkedin : `https://${card.linkedin}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors py-1">
                  <span className="w-5 text-center text-slate-400">in</span>
                  <span className="text-sm">LinkedIn</span>
                </a>
              )}
              {card.twitter && (
                <a href={card.twitter.startsWith("http") ? card.twitter : `https://twitter.com/${card.twitter.replace("@", "")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors py-1">
                  <span className="w-5 text-center text-slate-400">𝕏</span>
                  <span className="text-sm">Twitter / X</span>
                </a>
              )}
              {card.github && (
                <a href={card.github.startsWith("http") ? card.github : `https://${card.github}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white hover:text-blue-400 transition-colors py-1">
                  <span className="w-5 text-center text-slate-400">⊛</span>
                  <span className="text-sm">GitHub</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Wallet Buttons */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">Add to Wallet</h3>
          <div className="space-y-3">
            {/* Apple Wallet */}
            <button
              onClick={handleAppleWallet}
              disabled={appleStatus === "loading"}
              className="w-full flex items-center justify-center gap-3 bg-black hover:bg-slate-800 border border-slate-700 text-white py-3.5 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              {appleStatus === "loading" ? "Loading…" : "Add to Apple Wallet"}
            </button>

            {/* Google Wallet */}
            <button
              onClick={handleGoogleWallet}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-100 text-slate-900 py-3.5 rounded-xl font-medium transition-colors disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              {googleLoading ? "Loading…" : "Add to Google Wallet"}
            </button>
          </div>

          {appleStatus === "unconfigured" && (
            <p className="text-amber-400 text-xs mt-3 text-center">
              Apple Wallet requires credentials setup — see .env.example
            </p>
          )}
        </div>

        {/* QR Code */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-center">
          <h3 className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-4">QR Code</h3>
          <div className="flex justify-center mb-3">
            <div className="bg-white p-3 rounded-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={qrUrl} alt="QR code" className="w-32 h-32" />
            </div>
          </div>
          <p className="text-slate-500 text-xs">Scan to open this card</p>
          <a href={qrUrl} download={`${card.slug}-qr.svg`}
            className="inline-block mt-2 text-blue-400 hover:text-blue-300 text-xs transition-colors">
            Download QR code
          </a>
        </div>

        {/* Footer */}
        <div className="text-center pt-4">
          <Link href="/register" className="text-slate-600 hover:text-slate-400 text-xs transition-colors">
            Powered by DigitalCard — Create yours free
          </Link>
        </div>
      </div>
    </div>
  );
}
