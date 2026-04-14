"use client"

import { Star, ShieldAlert } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const testimonial =
  "Trientra's SOS feature saved me when I got lost backpacking at night. One tap on my lock screen, and my family instantly knew exactly where I was."

const cards = [
  /* ① Rating */
  {
    id: "rating",
    cls: "col-span-1 row-span-1 bg-white border border-zinc-100",
    content: (
      <div className="flex flex-col h-full justify-between p-6">
        <div className="flex gap-0.5">
          {Array(5).fill(0).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-emerald-600 text-emerald-600" />
          ))}
        </div>
        <div>
          <p className="text-3xl font-bold text-zinc-900">4.9</p>
          <p className="text-xs text-zinc-500 mt-0.5">App Store Average</p>
        </div>
      </div>
    ),
  },
  /* ② Press — large */
  {
    id: "press",
    cls: "md:col-span-2 col-span-1 row-span-1 bg-zinc-950 border border-zinc-800",
    content: (
      <div className="flex flex-col h-full justify-between p-6">
        <p className="text-sm text-zinc-400 font-medium uppercase tracking-widest">Featured in</p>
        <div>
          <p className="text-white font-serif text-xl font-semibold leading-snug">
            "The Future of Travel<br />Safety Tech"
          </p>
          <span className="inline-block mt-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
            TechCrunch Disrupt
          </span>
        </div>
      </div>
    ),
  },
  /* ③ Product Hunt */
  {
    id: "product-hunt",
    cls: "col-span-1 row-span-1 bg-emerald-500",
    content: (
      <div className="flex flex-col h-full justify-between p-6">
        <svg viewBox="0 0 40 40" className="w-8 h-8 fill-white">
          <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm4 22h-5v5h-4V13h9c3.314 0 6 2.686 6 6s-2.686 3-6 3h.001zm0-6h-5v4h5a2 2 0 000-4z"/>
        </svg>
        <div>
          <p className="text-white font-bold text-sm">#1 Mobile App</p>
          <p className="text-emerald-100 text-xs">of the Day</p>
        </div>
      </div>
    ),
  },
  /* ④ Award */
  {
    id: "award",
    cls: "col-span-1 row-span-1 bg-zinc-800",
    content: (
      <div className="flex flex-col h-full justify-between p-6">
        <span className="text-2xl">🌍</span>
        <div>
          <p className="text-white font-semibold text-sm leading-tight">Must-Have Travel App</p>
          <p className="text-zinc-400 text-xs mt-0.5">Nomad Choice 2024</p>
        </div>
      </div>
    ),
  },
  /* ⑤ App badge */
  {
    id: "studio",
    cls: "col-span-1 row-span-1 bg-emerald-50 border border-emerald-100",
    content: (
      <div className="flex flex-col h-full justify-between p-6">
        <span className="text-[11px] uppercase tracking-widest text-emerald-500 font-bold">Platform</span>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-6 h-6 text-emerald-600" />
          <p className="text-emerald-950 font-bold text-lg leading-none">Trientra<br />v1.0</p>
        </div>
      </div>
    ),
  },
  /* ⑥ Testimonial — spans 2 */
  {
    id: "testimonial",
    cls: "md:col-span-2 col-span-1 row-span-1 bg-zinc-950 border border-zinc-800",
    content: (
      <div className="flex flex-col h-full justify-between p-6">
        <p className="text-white text-[15px] sm:text-base leading-relaxed font-medium">
          "{testimonial}"
        </p>
        <div className="flex items-center gap-3 mt-4">
          <div className="flex gap-0.5">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-emerald-500 text-emerald-500" />
            ))}
          </div>
          <span className="text-xs text-zinc-500 font-medium">— Sarah M., Solo Traveler</span>
        </div>
      </div>
    ),
  },
  /* ⑦ Stats card */
  {
    id: "stats",
    cls: "col-span-1 row-span-1 bg-emerald-700",
    content: (
      <div className="flex flex-col h-full justify-between p-6">
        <span className="text-[11px] uppercase tracking-widest text-emerald-200 font-bold">Active Users</span>
        <p className="text-4xl font-black text-white leading-none">100k+</p>
      </div>
    ),
  },
]

export function SocialProof() {
  const container = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 75%",
      }
    })

    tl.fromTo(".sp-header",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    )

    tl.fromTo(".sp-card",
      { opacity: 0, scale: 0.8, y: 50 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: {
          amount: 0.6,
          grid: "auto",
          from: "start"
        },
        ease: "back.out(1.2)" 
      },
      "-=0.4"
    )

    tl.fromTo(".sp-cta",
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.2"
    )

  }, { scope: container })

  return (
    <section ref={container} id="reviews" className="bg-zinc-50 py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="sp-header text-3xl md:text-4xl font-bold text-zinc-950 text-center mb-12 tracking-tight">
          Join the 100,000+ travelers<br className="hidden sm:block" /> who roam safely.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:auto-rows-[180px] auto-rows-fr">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`sp-card rounded-3xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 ${card.cls}`}
            >
              {card.content}
            </div>
          ))}
        </div>

        <div className="sp-cta text-center mt-10">
          <Link
            href="#download"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 hover:text-emerald-700 transition-colors underline underline-offset-4"
          >
            Join the community today →
          </Link>
        </div>
      </div>
    </section>
  )
}
