
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 py-16 px-4 text-center relative">
        <div className="max-w-3xl w-full">
          <div className="bg-white/95 rounded-3xl shadow-2xl p-8 md:p-14 mb-10 border border-blue-100 relative overflow-visible">
            {/* SVG App Window Mockup */}
            <div className="flex justify-center mb-8">
              <svg width="420" height="180" viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
                {/* Window background */}
                <rect x="0" y="0" width="420" height="180" rx="18" fill="#f3f4f6" />
                {/* Topbar */}
                <rect x="0" y="0" width="420" height="32" rx="18" fill="#6366f1" />
                {/* Sidebar */}
                <rect x="0" y="32" width="60" height="148" rx="12" fill="#e0e7ff" />
                {/* Sidebar icons */}
                <circle cx="30" cy="52" r="7" fill="#6366f1" />
                <circle cx="30" cy="80" r="7" fill="#a5b4fc" />
                <circle cx="30" cy="108" r="7" fill="#a5b4fc" />
                <circle cx="30" cy="136" r="7" fill="#a5b4fc" />
                {/* Chart area */}
                <rect x="80" y="52" width="300" height="24" rx="6" fill="#c7d2fe" />
                <rect x="80" y="86" width="220" height="24" rx="6" fill="#6366f1" />
                <rect x="80" y="120" width="180" height="24" rx="6" fill="#a5b4fc" />
                {/* Table lines */}
                <rect x="80" y="154" width="120" height="10" rx="4" fill="#e0e7ff" />
                <rect x="210" y="154" width="60" height="10" rx="4" fill="#e0e7ff" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 tracking-tight">Accounts CRM</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              The modern way to manage your quotations, invoices, receipts, and more. Simple, beautiful, and built for your business.
            </p>
            <a
              href="#"
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-500 text-white rounded-full font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition text-lg"
            >
              Get Started for Free
            </a>
          </div>
        </div>
        {/* Wavy Divider */}
        <div className="absolute left-0 right-0 -bottom-10 pointer-events-none select-none">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-20">
            <path d="M0 40 Q 360 80 720 40 T 1440 40 V80 H0V40Z" fill="#fff" />
          </svg>
        </div>
      </section>
      {/* Features Section */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid gap-10 md:grid-cols-3">
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-50 hover:shadow-2xl hover:-translate-y-2 transition group">
          {/* SVG Icon */}
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-4 text-blue-500 group-hover:scale-110 transition"><rect x="3" y="6" width="18" height="12" rx="3" fill="#6366f1"/><rect x="7" y="10" width="10" height="2" rx="1" fill="#fff"/></svg>
          <h3 className="font-semibold text-lg mb-2 text-gray-800">Quotations & Invoices</h3>
          <p className="text-gray-500 text-sm">Create, send, and track professional quotations and invoices in seconds.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-purple-50 hover:shadow-2xl hover:-translate-y-2 transition group">
          {/* SVG Icon */}
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-4 text-purple-500 group-hover:scale-110 transition"><circle cx="12" cy="12" r="10" fill="#a78bfa"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          <h3 className="font-semibold text-lg mb-2 text-gray-800">Receipts & Payments</h3>
          <p className="text-gray-500 text-sm">Record receipts, manage payouts, and keep your cash flow organized.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-50 hover:shadow-2xl hover:-translate-y-2 transition group">
          {/* SVG Icon */}
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24" className="mb-4 text-blue-400 group-hover:scale-110 transition"><rect x="4" y="4" width="16" height="16" rx="4" fill="#60a5fa"/><path d="M8 16v-4h8v4" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
          <h3 className="font-semibold text-lg mb-2 text-gray-800">Sales & Purchases</h3>
          <p className="text-gray-500 text-sm">Monitor sales orders, purchases, and get real-time financial insights.</p>
        </div>
      </section>
      {/* Footer */}
      <footer className="text-center text-gray-400 text-sm py-6">
        &copy; {new Date().getFullYear()} Accounts CRM. Made with <span className="text-pink-400">♥</span> for businesses.
      </footer>
    </div>
  );
}
