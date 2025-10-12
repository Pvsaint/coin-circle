import { RoscaCard } from "@/components/rosca-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function DashboardSection() {
  // Mock data - in production, this would come from smart contracts
  const openGroups = [
    {
      id: "1",
      name: "Family Savings Circle",
      contributionAmount: "100",
      token: "USDC",
      members: 3,
      maxMembers: 5,
      frequency: "weekly",
      status: "open" as const,
      description: "Save together for family goals and emergencies",
    },
    {
      id: "2",
      name: "Startup Seed Fund",
      contributionAmount: "0.05",
      token: "ETH",
      members: 7,
      maxMembers: 10,
      frequency: "monthly",
      status: "open" as const,
      description: "Pool resources for entrepreneurial ventures",
    },
    {
      id: "3",
      name: "Community Development",
      contributionAmount: "50",
      token: "USDC",
      members: 8,
      maxMembers: 8,
      frequency: "bi-weekly",
      status: "full" as const,
      description: "Supporting local community projects together",
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
      <div className="mb-8 sm:mb-10 md:mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
            Available Groups
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground">
            Join an existing group or create your own
          </p>
        </div>
        <Button
          size="lg"
          className="gap-2 bg-green-900 text-white w-full sm:w-auto"
          asChild
        >
          <Link href="/create">
            <Plus className="h-4 w-4" />
            Create New Group
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {openGroups.map((group) => (
          <RoscaCard key={group.id} {...group} />
        ))}
      </div>

      <div className="mt-6 sm:mt-8 text-center">
        <Button
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
          asChild
        >
          <Link href="/browse">View All Groups</Link>
        </Button>
      </div>
    </section>
  );
}
