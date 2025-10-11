import { RoscaCard } from "@/components/rosca-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

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
  ]

  return (
    <section className="py-16 px-32">
      <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Available Groups</h2>
          <p className="text-muted-foreground">Join an existing group or create your own</p>
        </div>
        <Button size="lg" className="gap-2" asChild>
          <Link href="/create">
            <Plus className="h-4 w-4" />
            Create New Group
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {openGroups.map((group) => (
          <RoscaCard key={group.id} {...group} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button variant="outline" size="lg" asChild>
          <Link href="/browse">View All Groups</Link>
        </Button>
      </div>
    </section>
  )
}
