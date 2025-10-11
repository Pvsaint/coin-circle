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
      <main className="py-12 mx-32">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              My Groups
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your ROSCA memberships
            </p>
          </div>
          <Button size="lg" className="gap-2" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4" />
              Create New Group
            </Link>
          </Button>
        </div>

        {myGroups.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {myGroups.map((group) => (
              <RoscaCard key={group.id} {...group} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-4">
                <Inbox className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No groups yet</h3>
              <p className="text-muted-foreground mb-6 text-center text-balance">
                You haven&apos;t joined any ROSCA groups yet. Create one or
                browse existing groups to get started.
              </p>
              <div className="flex gap-4">
                <Button asChild>
                  <Link href="/create">Create Group</Link>
                </Button>
                <Button variant="outline" asChild>
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
