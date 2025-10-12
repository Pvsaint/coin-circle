"use client"
import { Header } from "@/components/header"
import { MemberStatusCard } from "@/components/member-status-card"
import { GroupStatusCard } from "@/components/group-status-card"
import { MemberList } from "@/components/member-list"
import { NotificationBanner } from "@/components/notification-banner"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  // Mock data - in production, this would come from smart contracts
  const isMember = true
  const groupData = {
    id: params.id,
    name: "Family Savings Circle",
    description: "Save together for family goals and emergencies",
    status: "active" as const,
    contributionAmount: "100",
    token: "USDC",
    frequency: "weekly",
    currentCycle: 3,
    totalCycles: 5,
    totalPot: "500",
    nextRecipient: "0x1234...5678",
    timeUntilPayout: "3 days",
    contractAddress: "0xabcd...ef01",
  }

  const memberStatus = {
    currentCycle: 3,
    totalCycles: 5,
    nextPaymentDue: "January 15, 2025",
    payoutCycle: 4,
    contributionAmount: "100",
    token: "USDC",
    contributionHistory: [
      { cycle: 1, amount: "100", date: "Dec 18, 2024", status: "paid" as const },
      { cycle: 2, amount: "100", date: "Dec 25, 2024", status: "paid" as const },
      { cycle: 3, amount: "100", date: "Jan 1, 2025", status: "paid" as const },
      { cycle: 4, amount: "100", date: "Jan 8, 2025", status: "pending" as const },
      { cycle: 5, amount: "100", date: "Jan 15, 2025", status: "pending" as const },
    ],
  }

  const members = [
    {
      address: "0x1234567890abcdef1234567890abcdef12345678",
      payoutCycle: 1,
      hasPaid: true,
      hasReceived: true,
    },
    {
      address: "0xabcdef1234567890abcdef1234567890abcdef12",
      payoutCycle: 2,
      hasPaid: true,
      hasReceived: true,
    },
    {
      address: "0x567890abcdef1234567890abcdef1234567890ab",
      payoutCycle: 3,
      hasPaid: true,
      hasReceived: false,
    },
    {
      address: "0xcdef1234567890abcdef1234567890abcdef1234",
      payoutCycle: 4,
      hasPaid: false,
      hasReceived: false,
    },
    {
      address: "0x90abcdef1234567890abcdef1234567890abcdef",
      payoutCycle: 5,
      hasPaid: false,
      hasReceived: false,
    },
  ]

  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-4 sm:px-6 md:px-8 lg:px-16 xl:px-32 py-6 sm:py-8 md:py-12">
        <div className="mb-4 sm:mb-6">
          <NotificationBanner
            type="warning"
            title="Payment Due Soon"
            message="Your next contribution of 100 USDC is due in 3 days"
            action={{
              label: "Contribute Now",
              onClick: () => console.log("Navigate to payment"),
            }}
          />
        </div>

        <div className="mb-6 sm:mb-8">
          <Button variant="ghost" className="gap-2 mb-4 -ml-2" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </Button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                  {groupData.name}
                </h1>
                <Badge 
                  variant="outline" 
                  className="bg-primary/10 text-primary border-primary/20 w-fit"
                >
                  Active
                </Badge>
              </div>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-3 sm:mb-4">
                {groupData.description}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                <span>Contract:</span>
                <div className="flex items-center gap-2">
                  <code className="rounded bg-muted px-2 py-1 font-mono text-xs break-all">
                    {groupData.contractAddress}
                  </code>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 flex-shrink-0">
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            {isMember ? (
              <Button size="lg" className="w-full sm:w-auto sm:flex-shrink-0">
                Contribute Now
              </Button>
            ) : (
              <Button size="lg" className="w-full sm:w-auto sm:flex-shrink-0">
                Join Group
              </Button>
            )}
          </div>
        </div>

        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 lg:grid-cols-2">
          <div className="space-y-4 sm:space-y-5 md:space-y-6">
            <GroupStatusCard
              totalPot={groupData.totalPot}
              token={groupData.token}
              nextRecipient={groupData.nextRecipient}
              timeUntilPayout={groupData.timeUntilPayout}
              currentCycle={groupData.currentCycle}
              totalCycles={groupData.totalCycles}
            />
            {isMember && <MemberStatusCard {...memberStatus} />}
          </div>

          <div>
            <MemberList members={members} currentCycle={groupData.currentCycle} />
          </div>
        </div>
      </main>
    </div>
  )
}