"use client"

import Link from "next/link"
import Image from "next/image"
import LazyVideo from "./lazy-video"
import { Play, ShieldAlert } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const screens = [
  "/screens/Adaptive journey/1.png",
  "/screens/Adaptive journey/2.png",
  "/screens/Adaptive journey/3.png",
  "/screens/intellegence/1.png",
  "/screens/live map/1.png",
  "/screens/sos/1.png",
]

export function Hero() {
  const container = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const [currentScreen, setCurrentScreen] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScreen((prev) => (prev + 1) % screens.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])
  
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } })
    
    tl.fromTo(".hero-badge", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }
    )
    .fromTo(".hero-title-line", 
      { opacity: 0, y: 40, rotation: 2 }, 
      { opacity: 1, y: 0, rotation: 0, duration: 1, stagger: 0.15 },
      "-=0.6"
    )
    .fromTo(".hero-desc", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )
    .fromTo(".hero-btn", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
      "-=0.6"
    )
    .fromTo(".hero-phone", 
      { opacity: 0, scale: 0.8, y: 100 }, 
      { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: "expo.out" },
      "-=1.2"
    )

    // 3D Tilt Effect
    const xSetter = gsap.quickSetter(phoneRef.current, "rotationY", "deg")
    const ySetter = gsap.quickSetter(phoneRef.current, "rotationX", "deg")

    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current || window.innerWidth < 768) return
      
      const rect = container.current?.getBoundingClientRect()
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const percentX = (e.clientX - centerX) / (rect.width / 2)
      const percentY = (e.clientY - centerY) / (rect.height / 2)

      xSetter(percentX * 12) // Rotate up to 12 degrees
      ySetter(percentY * -12)
    }

    const resetRotation = () => {
      gsap.to(phoneRef.current, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3.out" })
    }

    window.addEventListener("mousemove", handleMouseMove)
    container.current?.addEventListener("mouseleave", resetRotation)

    // Scroll parallax
    gsap.to(".hero-phone-inner", {
      y: 100,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })

    gsap.to(".hero-bg-blob", {
      y: 200,
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      container.current?.removeEventListener("mouseleave", resetRotation)
    }

  }, { scope: container })

  return (
    <section ref={container} className="relative min-h-[90vh] md:min-h-screen pt-14 md:pt-0 flex flex-col justify-center overflow-hidden bg-white">
      <div
        className="hero-bg-blob absolute inset-0 pointer-events-none origin-top"
       
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-12 md:py-20">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
          
          <div className="flex flex-col items-start text-left max-w-2xl text-zinc-950">
            <div className="hero-badge inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50/50 px-3 py-1 mb-6">
              <span className="text-[10px] md:text-xs font-medium tracking-tight text-emerald-700 uppercase">
                AI-Powered Travel Guardian
              </span>
            </div>

            <h1 className="text-[2.8rem] sm:text-[3.5rem] lg:text-[5.5rem] font-bold font-serif leading-[1.02] tracking-tight mb-6 md:mb-8 flex flex-col">
              <div className="overflow-hidden pb-2"><div className="hero-title-line origin-bottom-left">Proactive safety</div></div>
              <div className="overflow-hidden pb-2"><div className="hero-title-line origin-bottom-left text-emerald-600">for travelers.</div></div>
            </h1>
           
            <p className="hero-desc text-[16px] md:text-[18px] text-zinc-500 mb-8 md:mb-10 leading-relaxed max-w-lg">
              Trientra isn't just a map—it's an intelligent guardian. Explore with complete peace of mind using real-time AI intelligence, automated SOS lock-screen systems, and unified digital ID passes.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="#download"
                className="hero-btn inline-flex items-center gap-2 bg-emerald-600 text-white rounded-full px-8 h-12 text-sm font-medium hover:bg-emerald-700 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-600/20"
              >
                Download App
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
              <Link
                href="#features"
                className="hero-btn inline-flex items-center gap-2 bg-white text-zinc-900 border border-zinc-200 rounded-full px-8 h-12 text-sm font-medium hover:bg-zinc-50 transition-all hover:scale-105 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                See How It Works
              </Link>
            </div>
          </div>

          <div className="hero-phone flex justify-center md:justify-end items-center origin-bottom" style={{ perspective: "1000px" }}>
            <div ref={phoneRef} className="hero-phone-inner relative group">
              <div className="absolute inset-0 bg-emerald-400/30 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
              
              <div className="phone-frame scale-[0.85] sm:scale-100 lg:scale-110" style={{ width: 255, height: 550 }}>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[16px] h-[16px] bg-black rounded-full z-10" />
                <div className="relative w-full h-full bg-zinc-900">
                  {screens.map((src, idx) => (
                    <div
                      key={src}
                      className={`absolute inset-0 transition-opacity duration-1000 ${
                        idx === currentScreen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={src}
                        alt={`Trientra Screen ${idx + 1}`}
                        fill
                        className="object-cover"
                        priority={idx === 0}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="hero-descbottom-28 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity z-10">
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-medium">Scroll to explore</span>
        <div className="w-5 h-8 border-2 border-zinc-200 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-zinc-300 rounded-full" />
        </div>
      </div> */}

      <div className=" bottom-0 left-0 w-full bg-[#059669] overflow-hidden py-2 z-20 flex items-center border-t border-emerald-500/30">
        <div className="flex w-max animate-scroll-left">
          {Array(3).fill(0).map((_, groupIndex) => (
            <div key={groupIndex} className="flex items-center">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex items-center gap-8 px-6">
                  <span className="text-white font-regular text-5xl md:text-[5rem] tracking-tight uppercase leading-none select-none whitespace-nowrap">
                    TRY TRINETRA BETA
                  </span>
                  <div className="relative w-12 h-12 md:w-16 md:h-16 shrink-0">
                    <Image
                      src="/trinetraicon1.png"
                      alt="Trinetra Icon"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div> 
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
