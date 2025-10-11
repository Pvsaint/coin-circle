import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Users, Coins } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="w-full relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />

      <div className="relative py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Powered by Starknet
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-balance md:text-6xl lg:text-7xl">
            Save Together,
            <br />
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Grow Together
            </span>
          </h1>

          <p className="mb-8 text-lg text-muted-foreground text-balance md:text-xl leading-relaxed">
            Join decentralized savings circles on Starknet. Pool funds with
            trusted members, take turns receiving payouts, and build financial
            resilience together.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 text-base" asChild>
              <Link href="/create">
                Create New Group
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base bg-transparent"
              asChild
            >
              <Link href="/browse">Browse Groups</Link>
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-16 grid gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Secure & Transparent</h3>
              <p className="text-sm text-muted-foreground text-balance">
                Smart contracts ensure fair play and transparent operations
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold">Community Driven</h3>
              <p className="text-sm text-muted-foreground text-balance">
                Build trust and save with friends, family, or like-minded groups
              </p>
            </div>

            <div className="flex flex-col items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <Coins className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold">Flexible Terms</h3>
              <p className="text-sm text-muted-foreground text-balance">
                Customize contribution amounts, frequency, and group size
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
