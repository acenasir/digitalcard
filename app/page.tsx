import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Nav */}
      <nav className="border-b border-slate-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm">DC</div>
            <span className="font-semibold text-lg">DigitalCard</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-slate-400 hover:text-white text-sm transition-colors">Sign in</Link>
            <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white text-sm px-4 py-2 rounded-lg transition-colors font-medium">
              Get started free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-blue-950 border border-blue-800 text-blue-300 text-xs px-3 py-1.5 rounded-full mb-8">
          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
          Works with Apple Wallet &amp; Google Wallet
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">
          Your business card,
          <br />
          <span className="text-blue-400">always in their pocket</span>
        </h1>
        <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Create a stunning digital business card that lives in Apple Wallet and Google Wallet. Share with a QR code, link, or tap. No app needed for recipients.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
            Create your card — free
          </Link>
          <Link href="#how-it-works" className="border border-slate-700 hover:border-slate-500 text-slate-300 px-8 py-4 rounded-xl font-semibold text-lg transition-colors">
            See how it works
          </Link>
        </div>
      </section>

      {/* Card Preview */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/20 to-transparent rounded-3xl blur-3xl"></div>
          <div className="relative flex justify-center gap-6 flex-wrap">
            {/* Apple Wallet Card Mock */}
            <div className="w-72 rounded-2xl overflow-hidden shadow-2xl shadow-blue-900/50" style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)" }}>
              <div className="p-5">
                <div className="flex justify-between items-start mb-8">
                  <div className="text-xs text-blue-300 font-medium">BUSINESS CARD</div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-bold">DC</div>
                </div>
                <div className="mb-6">
                  <div className="text-white font-bold text-xl">Alex Johnson</div>
                  <div className="text-blue-200 text-sm mt-1">Senior Product Designer</div>
                  <div className="text-blue-300 text-xs mt-0.5">Acme Corporation</div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="text-blue-400 uppercase tracking-wide text-[10px] mb-0.5">Email</div>
                    <div className="text-white">alex@acme.com</div>
                  </div>
                  <div>
                    <div className="text-blue-400 uppercase tracking-wide text-[10px] mb-0.5">Phone</div>
                    <div className="text-white">+1 555 0123</div>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-white p-2 rounded-lg">
                    <div className="w-16 h-16 bg-slate-800 flex items-center justify-center text-white text-[8px] font-mono text-center leading-tight">
                      QR<br/>CODE
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Wallet Card Mock */}
            <div className="w-72 rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/50 border border-slate-700" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)" }}>
              <div className="p-5">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-xs text-slate-400">Business Card</div>
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="text-slate-400 text-xs mb-1">Acme Corporation</div>
                  <div className="text-white font-bold text-2xl">Alex Johnson</div>
                  <div className="text-slate-300 text-sm mt-1">Senior Product Designer</div>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex gap-2">
                    <span className="text-slate-500">EMAIL</span>
                    <span className="text-slate-200">alex@acme.com</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-slate-500">PHONE</span>
                    <span className="text-slate-200">+1 555 0123</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <div className="bg-white p-2 rounded-lg">
                    <div className="w-16 h-16 bg-slate-800 flex items-center justify-center text-white text-[8px] font-mono text-center leading-tight">
                      QR<br/>CODE
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="how-it-works" className="bg-slate-900 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Everything you need to share your contact</h2>
            <p className="text-slate-400 text-lg">Build in minutes. Share forever.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "✦",
                title: "Design your card",
                desc: "Customise colours, add your photo, fill in contact details. Live preview shows exactly how it looks in Wallet.",
              },
              {
                icon: "⬡",
                title: "Add to Wallet",
                desc: "One tap adds your card to Apple Wallet or Google Wallet. It lives alongside your boarding passes and loyalty cards.",
              },
              {
                icon: "◎",
                title: "Share anywhere",
                desc: "QR code, link, or NFC tap. Recipients scan and get your full contact info — no app needed.",
              },
            ].map((f) => (
              <div key={f.title} className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                <div className="text-blue-400 text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Up and running in 3 steps</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Create account", desc: "Sign up free — no credit card needed." },
            { step: "02", title: "Fill in your details", desc: "Name, title, company, email, phone, social links." },
            { step: "03", title: "Share your card", desc: "Send the link, show the QR, or add to Wallet." },
          ].map((s) => (
            <div key={s.step} className="flex gap-5">
              <div className="text-blue-600 font-mono font-bold text-5xl leading-none">{s.step}</div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-slate-400">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Ready to modernise your networking?</h2>
          <p className="text-blue-100 text-lg mb-8">Create your digital business card in under 2 minutes.</p>
          <Link href="/register" className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors inline-block">
            Get started — it&apos;s free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center font-bold text-xs">DC</div>
            <span className="text-slate-400 text-sm">DigitalCard</span>
          </div>
          <p className="text-slate-600 text-sm">Digital business cards for Apple Wallet &amp; Google Wallet</p>
        </div>
      </footer>
    </div>
  );
}
