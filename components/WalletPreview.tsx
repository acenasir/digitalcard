"use client";

interface CardData {
  id?: string;
  displayName: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  website: string;
  bgColor: string;
  fgColor: string;
  accentColor: string;
  slug?: string;
}

export default function WalletPreview({ data }: { data: CardData }) {
  const appUrl = typeof window !== "undefined" ? window.location.origin : "https://yourapp.com";
  const qrUrl = data.slug ? `${appUrl}/api/qr/${data.slug}` : null;

  return (
    <div className="space-y-6">
      {/* Apple Wallet Preview */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <span className="text-slate-400 text-xs font-medium">Apple Wallet</span>
        </div>
        <div
          className="rounded-2xl p-6 shadow-xl relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${data.bgColor} 0%, ${adjustColor(data.bgColor, 20)} 100%)` }}
        >
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: data.accentColor }}>
              Business Card
            </span>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{ background: `${data.fgColor}20`, color: data.fgColor }}>
              DC
            </div>
          </div>

          <div className="mb-6" style={{ color: data.fgColor }}>
            <div className="font-bold text-xl">{data.displayName || "Your Name"}</div>
            {data.title && <div className="text-sm mt-1" style={{ opacity: 0.85 }}>{data.title}</div>}
            {data.company && <div className="text-xs mt-0.5" style={{ opacity: 0.6 }}>{data.company}</div>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {data.email && (
              <div>
                <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: data.accentColor }}>Email</div>
                <div className="text-xs truncate" style={{ color: data.fgColor, opacity: 0.9 }}>{data.email}</div>
              </div>
            )}
            {data.phone && (
              <div>
                <div className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: data.accentColor }}>Phone</div>
                <div className="text-xs" style={{ color: data.fgColor, opacity: 0.9 }}>{data.phone}</div>
              </div>
            )}
          </div>

          {qrUrl && (
            <div className="mt-5 flex justify-center">
              <div className="bg-white p-2.5 rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrUrl} alt="QR code" className="w-20 h-20" />
              </div>
            </div>
          )}
          {!qrUrl && (
            <div className="mt-5 flex justify-center">
              <div className="bg-white p-2.5 rounded-xl opacity-30">
                <div className="w-20 h-20 bg-slate-200 rounded flex items-center justify-center text-slate-500 text-[9px] font-mono text-center">
                  QR code<br/>after save
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Google Wallet Preview */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="8" fontWeight="bold">G</text>
          </svg>
          <span className="text-slate-400 text-xs font-medium">Google Wallet</span>
        </div>
        <div className="rounded-2xl overflow-hidden border border-slate-700 shadow-xl"
          style={{ background: `${data.bgColor}f0` }}>
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs" style={{ color: data.fgColor, opacity: 0.5 }}>Business Card</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-red-400"></div>
                <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-xs mb-1" style={{ color: data.accentColor }}>{data.company || "Company"}</div>
              <div className="font-bold text-2xl" style={{ color: data.fgColor }}>{data.displayName || "Your Name"}</div>
              {data.title && <div className="text-sm mt-1" style={{ color: data.fgColor, opacity: 0.75 }}>{data.title}</div>}
            </div>
            <div className="space-y-2">
              {data.email && (
                <div className="flex items-center gap-2 text-xs">
                  <span style={{ color: data.accentColor, opacity: 0.7 }}>EMAIL</span>
                  <span style={{ color: data.fgColor, opacity: 0.85 }}>{data.email}</span>
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-2 text-xs">
                  <span style={{ color: data.accentColor, opacity: 0.7 }}>PHONE</span>
                  <span style={{ color: data.fgColor, opacity: 0.85 }}>{data.phone}</span>
                </div>
              )}
            </div>
            {qrUrl && (
              <div className="mt-4 flex justify-center">
                <div className="bg-white p-2 rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={qrUrl} alt="QR code" className="w-16 h-16" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <p className="text-slate-500 text-xs leading-relaxed">
          <span className="text-slate-300 font-medium">Wallet buttons</span> appear on your public card page. To enable pass generation, add your Apple/Google credentials in environment variables.
        </p>
      </div>
    </div>
  );
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace("#", ""), 16);
  const r = Math.min(255, (num >> 16) + amount);
  const g = Math.min(255, ((num >> 8) & 0xff) + amount);
  const b = Math.min(255, (num & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}
