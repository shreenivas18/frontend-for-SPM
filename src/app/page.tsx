import { AIHeroSection } from "@/components/ui/ai-hero-section"
import { SocialProof } from "@/components/ui/social-proof"
import { BenefitsSection } from "@/components/ui/benefits-section"

export default function Home() {
  return (
    <main className="min-h-screen">
      <AIHeroSection />
      <SocialProof />
      <BenefitsSection />
    </main>
  )
}

