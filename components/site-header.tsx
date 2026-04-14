"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-zinc-100 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-[17px] tracking-tight text-zinc-900"
        >
          <div className="relative w-8 h-8 rounded overflow-hidden">
            <Image
              src="/trinetraicon1.png"
              alt="Trientra Logo"
              fill
              className="object-contain"
            />
          </div>
          trientra
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-500">
          <Link href="#features" className="hover:text-zinc-900 transition-colors">Features</Link>
          <Link href="#safety" className="hover:text-zinc-900 transition-colors">AI Watchdog</Link>
          <Link href="#reviews" className="hover:text-zinc-900 transition-colors">Testimonials</Link>
        </nav>

        {/* CTA */}
        <Link
          href="#download"
          className="bg-zinc-900 text-white rounded-full px-5 h-9 text-sm font-medium inline-flex items-center hover:bg-zinc-700 transition-colors"
        >
          Get the App
        </Link>
      </div>
    </header>
  )
}
