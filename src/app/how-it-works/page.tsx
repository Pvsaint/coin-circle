import { Header } from "@/components/header";
import { HowItWorks } from "@/components/how-it-works";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Zap } from "lucide-react";
import Link from "next/link";

export default function HowItWorksPage() {
  const features = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Smart Contract Security",
      description:
        "All funds are secured by audited smart contracts on Starknet, ensuring transparent and tamper-proof operations.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Collateral Protection",
      description:
        "Optional collateral requirements protect members from defaults and ensure commitment to the group.",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Full Transparency",
      description:
        "Every transaction, payout, and member action is recorded on-chain and visible to all participants.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Automated Payouts",
      description:
        "Smart contracts automatically distribute funds according to the predetermined schedule, no manual intervention needed.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-3xl text-center mb-12 sm:mb-14 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6">
              How StarkROSCA Works
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance leading-relaxed px-4 sm:px-0">
              Learn how decentralized rotating savings and credit associations
              help communities save together on Starknet
            </p>
          </div>
        </section>

        <HowItWorks />

        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6 sm:mb-8 text-center">
              Key Features
            </h2>
            <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 md:grid-cols-2">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3 sm:mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground text-balance leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8">
          <Card className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-2">
            <CardContent className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 sm:mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 text-balance">
                Join a savings circle today or create your own group
              </p>
              <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" className="w-full sm:w-auto" asChild>
                  <Link href="/create">Create New Group</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="/browse">Browse Groups</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
