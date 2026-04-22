import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-slate-700 text-8xl font-bold mb-4">404</div>
        <h1 className="text-white font-bold text-2xl mb-2">Page not found</h1>
        <p className="text-slate-400 mb-8">This card doesn&apos;t exist or has been removed.</p>
        <Link href="/" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-medium transition-colors">
          Go home
        </Link>
      </div>
    </div>
  );
}
