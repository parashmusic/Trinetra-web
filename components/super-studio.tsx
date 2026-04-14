"use client"

import LazyVideo from "./lazy-video"
import Image from "next/image"
import { useRef } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const services = [
  { dot: "#ef4444", label: "Stealth Audio Recording Vault" },
  { dot: "#3b82f6", label: "Emergency GPS Tracking" },
  { dot: "#f59e0b", label: "Mayday SOS Messaging" },
  { dot: "#10b981", label: "Unified QR Identity Documents" },
  { dot: "#059669", label: "Safe Haven Infrastructure Map" },
  { dot: "#047857", label: "Live Parking Reservations" },
  { dot: "#06b6d4", label: "Monument e-Ticketing" },
  { dot: "#84cc16", label: "Offline Mode Resilience" },
]

export function SuperStudio() {
  const container = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(".ss-header",
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

    gsap.fromTo(".ss-left-box",
      { opacity: 0, y: 100, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ss-left-box",
          start: "top 85%",
        }
      }
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

      xSetter(percentX * 15) // Slightly more aggressive tilt for this section
      ySetter(percentY * -15)
    }

    const resetRotation = () => {
      gsap.to(phoneRef.current, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3.out" })
    }

    window.addEventListener("mousemove", handleMouseMove)
    container.current?.addEventListener("mouseleave", resetRotation)

    gsap.to(".ss-phone-float", {
      y: -40,
      ease: "none",
      scrollTrigger: {
        trigger: ".ss-left-box",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ss-right-box",
        start: "top 80%",
      }
    })

    tl.fromTo(".ss-right-box",
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    )
    .fromTo(".ss-list-item",
      { opacity: 0, x: 20 },
      { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
      "-=0.4"
    )

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      container.current?.removeEventListener("mouseleave", resetRotation)
    }

  }, { scope: container })

  return (
    <section ref={container} id="safety" className="bg-white py-20 sm:py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="ss-header text-4xl md:text-5xl font-bold leading-tight tracking-tight text-zinc-950 mb-12 max-w-lg">
          Your intelligent<br className="hidden sm:block" /> travel companion.
        </h2>

        <div className="grid md:grid-cols-2 gap-5 items-stretch">

          <div
            className="ss-left-box rounded-3xl overflow-hidden flex items-end justify-center min-h-[420px]"
            style={{
              background: "linear-gradient(160deg, #022c22 0%, #064e3b 40%, #059669 100%)",
              perspective: "1000px"
            }}
          >
            <div className="flex flex-col items-center py-8 ">
              <div
                ref={phoneRef}
                className="ss-phone-float relative"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(16,185,129,0.5)) drop-shadow(0 0 80px rgba(5,150,105,0.3))",
                }}
              >
                <div className="phone-frame" style={{ width: 255, height: 550 }}>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[16px] h-[16px] bg-black rounded-full z-10" />
                  <div className="relative w-full h-full bg-zinc-900 overflow-hidden">
                    <Image
                      src="/screens/sos/1.png"
                      alt="Trientra SOS Screen"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="ss-right-box rounded-3xl bg-zinc-50 border border-zinc-100 p-8 flex flex-col justify-center">
            <p className="text-sm text-zinc-500 mb-6 font-medium">
              Everything you need to stay safe—available instantly, directly from your lock screen without needing to unlock your device.
            </p>
            <ul className="space-y-0 divide-y divide-zinc-100">
              {services.map((s) => (
                <li key={s.label} className="ss-list-item flex items-center gap-3 py-3">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: s.dot }}
                  />
                  <span className="text-sm font-semibold text-zinc-800">{s.label}</span>
                  <svg className="ml-auto text-zinc-300 transform transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
