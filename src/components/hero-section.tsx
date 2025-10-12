import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Coins } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden bg-gradient-to-b from-black via-transparent to-black z-20 top-0">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
        style={{
          backgroundImage: "url('/bg.webp')",
        }}
      />
      <div className="absolute z-10" />
      <div className="relative py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 md:px-8">
        <div className="mx-auto max-w-4xl text-center z-10">
          <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 sm:px-4 py-1.5 text-xs sm:text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Powered by Starknet
          </div>

          <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-green-800 font-bold tracking-tight text-balance">
            Save Together,
            <br />
            <span className="text-[#bddf] text-[28px] sm:text-[32px] md:text-[36px] lg:text-[40px]">
              Grow Together
            </span>
          </h1>

          <p className="text-[#ffff] mb-6 sm:mb-8 text-base sm:text-lg md:text-xl text-balance leading-relaxed px-4 sm:px-6 md:px-0">
            Join decentralized savings circles on Starknet. Pool funds with
            trusted members, take turns receiving payouts, and build financial
            resilience together.
          </p>

          <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center px-4 sm:px-0">
            <Button
              size="lg"
              className="gap-2 text-sm sm:text-base text-white bg-green-900 w-full sm:w-auto"
              asChild
            >
              <Link href="/create">
                Create New Group
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-sm sm:text-base bg-transparent border-2 border-green-900 w-full sm:w-auto"
              asChild
            >
              <Link href="/browse">Browse Groups</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-12 sm:mt-14 md:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-3 px-4 sm:px-0">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">
                Secure & Transparent
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-balance">
                Smart contracts ensure fair play and transparent operations
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-secondary" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">
                Community Driven
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-balance">
                Build trust and save with friends, family, or like-minded groups
              </p>
            </div>

            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-accent/10">
                <Coins className="h-5 w-5 sm:h-6 sm:w-6 text-accent" />
              </div>
              <h3 className="font-semibold text-sm sm:text-base">
                Flexible Terms
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground text-balance">
                Customize contribution amounts, frequency, and group size
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
