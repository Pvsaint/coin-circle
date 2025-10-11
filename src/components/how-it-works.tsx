import { Card, CardContent } from "@/components/ui/card";

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Create or Join a Group",
      description:
        "Start a new ROSCA with custom parameters or join an existing group that matches your savings goals.",
    },
    {
      number: "02",
      title: "Make Regular Contributions",
      description:
        "Each member contributes the agreed amount at the specified frequency (weekly, bi-weekly, or monthly).",
    },
    {
      number: "03",
      title: "Receive Your Payout",
      description:
        "Members take turns receiving the full pot. The order is predetermined and transparent on the blockchain.",
    },
    {
      number: "04",
      title: "Complete the Cycle",
      description:
        "Once everyone has received their payout, the ROSCA completes successfully and collateral is returned.",
    },
  ];

  return (
    <section className="w-full py-16 bg-muted/30">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground text-balance">
            Simple, transparent, and secure decentralized savings
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative overflow-hidden border-2 hover:border-primary/50 transition-colors"
            >
              <div className="absolute top-0 right-0 text-8xl font-bold text-primary/5">
                {step.number}
              </div>
              <CardContent className="relative pt-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground text-xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-balance">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-balance leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
