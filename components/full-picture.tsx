"use client"

import Image from "next/image"
import Link from "next/link"
import React, { useCallback, useRef } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight, ShieldAlert, Fingerprint, Map, Ticket } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    label: "Lock-screen Protection",
    title: "AI Watchdog (SOS)",
    description: "A persistent widget on your lock screen gives you instant access to stealth recording, live GPS broadcast, and a high-priority Mayday SMS.",
    bg: "linear-gradient(160deg, #fee2e2 0%, #fca5a5 60%, #f87171 100%)",
    icon: ShieldAlert,
    iconColor: "text-red-600",
    href: "#safety",
  },
  {
    label: "Unified Access",
    title: "Digital Identity Pass",
    description: "Replace physical passports, visa docs, and tickets with a single secure QR vault, enabling instant verification at local checkpoints.",
    bg: "linear-gradient(160deg, #fdf2f8 0%, #fce7f3 60%, #fbcfe8 100%)",
    icon: Fingerprint,
    iconColor: "text-pink-600",
    href: "#safety",
  },
  {
    label: "Predictive Routing",
    title: "Smart Journey Intelligence",
    description: "Trientra's discovery engine analyzes routes to warn about service gaps while instantly highlighting hospitals, safe havens, and police stations.",
    bg: "linear-gradient(160deg, #eff6ff 0%, #dbeafe 60%, #bfdbfe 100%)",
    icon: Map,
    iconColor: "text-blue-600",
    href: "#safety",
  },
  {
    label: "Avoid the Chaos",
    title: "Dynamic Booking System",
    description: "Safety meets convenience. Reserve parking spots and e-tickets seamlessly from the app to avoid crowded, chaotic tourist traps.",
    bg: "linear-gradient(160deg, #fefce8 0%, #fef9c3 60%, #fef08a 100%)",
    icon: Ticket,
    iconColor: "text-yellow-600",
    href: "#safety",
  },
]

export function FullPicture() {
  const container = useRef<HTMLElement>(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  })

  useGSAP(() => {
    gsap.fromTo(".fp-header-text",
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    )

    gsap.fromTo(".fp-controls",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        }
      }
    )

    gsap.fromTo(".fp-card",
      { opacity: 0, x: 100, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".fp-card",
          start: "top 85%",
        }
      }
    )
  }, { scope: container })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section ref={container} id="features" className="bg-white py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-6">
          <h2 className="fp-header-text text-4xl md:text-5xl font-bold leading-tight tracking-tight text-zinc-950 max-w-xl">
            A comprehensive suite<br className="hidden sm:block" /> for zero-worry travel.
          </h2>
          
          <div className="fp-controls flex items-center gap-3">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 transition-all active:scale-90"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-zinc-900 hover:border-zinc-900 transition-all active:scale-90"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-5">
            {cards.map((card, index) => {
              const Icon = card.icon
              return (
                <div key={`${card.label}-${index}`} className="fp-card embla__slide flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_48%] min-w-0">
                  <div
                    className="group rounded-3xl overflow-hidden block h-full flex flex-col justify-end p-8 sm:p-10 min-h-[400px] relative"
                    style={{ background: card.bg }}
                  >
                    {/* Background abstract element */}
                    <div className="absolute top-10 right-10 opacity-20 transform group-hover:scale-110 transition-transform duration-500">
                      <Icon className="w-32 h-32" />
                    </div>

                    <div className="relative z-10 bg-white/40 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm mt-auto">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm ${card.iconColor}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[11px] uppercase tracking-widest text-zinc-800 font-bold">
                          {card.label}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-zinc-950 mb-3">
                        {card.title}
                      </h3>
                      <p className="text-[15px] text-zinc-800 leading-relaxed font-medium">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="fp-header-text mt-10 sm:hidden">
          <Link
            href="#work"
            className="text-xs text-zinc-900 underline underline-offset-4 font-medium"
          >
            Explore all features →
          </Link>
        </div>
      </div>
    </section>
  )
}
