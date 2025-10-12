"use client";
import { Header } from "@/components/header";
import { RoscaCard } from "@/components/rosca-card";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Inbox } from "lucide-react";
import Link from "next/link";

export default function MyGroupsPage() {
  // Mock data - in production, this would come from smart contracts
  const myGroups = [
    {
      id: "1",
      name: "Family Savings Circle",
      contributionAmount: "100",
      token: "USDC",
      members: 5,
      maxMembers: 5,
      frequency: "weekly",
      status: "active" as const,
      description: "Save together for family goals and emergencies",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-6 sm:py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
        <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
              My Groups
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
              Manage your ROSCA memberships
            </p>
          </div>
          <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4" />
              Create New Group
            </Link>
          </Button>
        </div>

        {myGroups.length > 0 ? (
          <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {myGroups.map((group) => (
              <RoscaCard key={group.id} {...group} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 sm:py-16 px-4">
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-muted mb-4">
                <Inbox className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                No groups yet
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 text-center text-balance max-w-md">
                You haven&apos;t joined any ROSCA groups yet. Create one or
                browse existing groups to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                <Button className="w-full sm:w-auto" asChild>
                  <Link href="/create">Create Group</Link>
                </Button>
                <Button variant="outline" className="w-full sm:w-auto" asChild>
                  <Link href="/browse">Browse Groups</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
