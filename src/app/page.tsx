import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { DashboardSection } from "@/components/dashboard-section"
import { HowItWorks } from "@/components/how-it-works"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="">
        <HeroSection />
        <DashboardSection />
        <HowItWorks />
      </main>
      <footer className="border-t border-border bg-muted/30">
        <div className="py-8 text-center text-sm text-muted-foreground">
          <p>Built on Starknet • Decentralized Savings Made Simple</p>
        </div>
      </footer>
    </div>
  )
}
