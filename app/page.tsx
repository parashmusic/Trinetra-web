import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { FullPicture } from "@/components/full-picture"
import { SuperStudio } from "@/components/super-studio"
import { SocialProof } from "@/components/social-proof"
import { DarkCTA } from "@/components/dark-cta"
import { SuperFooter } from "@/components/super-footer"

export default function Page() {
  return (
    <main className="bg-white text-zinc-900 selection:bg-zinc-200">
      <SiteHeader />
      <Hero />
      <FullPicture />
      <SuperStudio />
      <SocialProof />
      <DarkCTA />
      <SuperFooter />
    </main>
  )
}
