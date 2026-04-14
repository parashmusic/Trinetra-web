import Link from "next/link"

export function SuperFooter() {
  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8 px-6 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-12">

        {/* Huge wordmark */}
        <div className="w-full md:w-auto">
          <h2 className="text-[18vw] md:text-[8rem] font-bold tracking-tighter leading-none m-0 p-0 text-white select-none">
            trientra
          </h2>
          <p className="text-zinc-500 text-[10px] mt-4 uppercase tracking-[0.2em] pl-1">
            © {new Date().getFullYear()} — Guardian of your journey
          </p>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-12 gap-y-8 text-sm pb-2 w-full md:w-auto">
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold mb-1 opacity-50 uppercase text-[10px] tracking-widest">Platform</p>
            <Link href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</Link>
            <Link href="#safety" className="text-zinc-400 hover:text-white transition-colors">AI Watchdog</Link>
            <Link href="#download" className="text-zinc-400 hover:text-white transition-colors">Get the App</Link>
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-white font-bold mb-1 opacity-50 uppercase text-[10px] tracking-widest">Connect</p>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">X/Twitter</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Instagram</Link>
          </div>
          <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
            <p className="text-white font-bold mb-1 opacity-50 uppercase text-[10px] tracking-widest">Legal</p>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="text-zinc-400 hover:text-white transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  )
}
