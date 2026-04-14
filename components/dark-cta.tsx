"use client"

import Link from "next/link"
import Image from "next/image"
import LazyVideo from "./lazy-video"
import { useRef, useState, useEffect } from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShieldAlert } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const screens = [
  "/screens/Adaptive journey/1.png",
  "/screens/Adaptive journey/2.png",
  "/screens/Adaptive journey/3.png",
  "/screens/intellegence/1.png",
  "/screens/live map/1.png",
  "/screens/sos/1.png",
]

export function DarkCTA() {
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
    // Pulse animation instead of spin for the safety icon
    gsap.to(".cta-pulse", {
      scale: 1.2,
      opacity: 0.5,
      duration: 1.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top 60%",
      }
    })

    tl.fromTo(".cta-header",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power4.out" }
    )
    .fromTo(".cta-phone-wrap",
      { opacity: 0, scale: 0.8, y: 100, rotation: -10 },
      { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1.2, ease: "expo.out" },
      "-=0.6"
    )
    .fromTo(".cta-btn",
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.5)" },
      "-=0.4"
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

      xSetter(percentX * 12)
      ySetter(percentY * -12)
    }

    const resetRotation = () => {
      gsap.to(phoneRef.current, { rotationX: 0, rotationY: 0, duration: 0.8, ease: "power3.out" })
    }

    window.addEventListener("mousemove", handleMouseMove)
    container.current?.addEventListener("mouseleave", resetRotation)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      container.current?.removeEventListener("mouseleave", resetRotation)
    }

  }, { scope: container })

  return (
    <section ref={container} id="download" className="bg-[#0a0a0a] py-28 relative overflow-hidden" style={{ perspective: "1000px" }}>
      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">

        <div className="relative mb-10 text-emerald-500">
          <div className="cta-pulse absolute inset-0 bg-emerald-500 rounded-full blur-xl" />
          <ShieldAlert className="w-12 h-12 relative z-10" />
        </div>

        <h2 className="cta-header text-4xl md:text-[3rem] font-bold text-white mb-16 leading-tight tracking-tight max-w-2xl">
          Your proactive<br />guardian is waiting.
        </h2>

        <div ref={phoneRef} className="cta-phone-wrap relative mb-16 inline-block transform origin-bottom">
          <div
            className="absolute inset-0 max-w-[120%] rotate-12 -left-10 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none"
          />
          <div className="phone-frame-dark" style={{ width: 255, height: 550 }}>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[16px] h-[16px] bg-black rounded-full z-10" />
            <div className="relative w-full h-full bg-[#0a0a0a]">
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
                    className="object-cover opacity-90"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <Link
          href="#"
          className="cta-btn bg-white text-emerald-950 font-semibold rounded-full px-8 py-3.5 flex items-center justify-center gap-2 hover:bg-emerald-50 transition-colors"
        >
          
          Download Trientra
        </Link>
      </div>
    </section>
  )
}
