import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2 } from "lucide-react"

interface MemberStatusCardProps {
  currentCycle: number
  totalCycles: number
  nextPaymentDue: string
  payoutCycle: number
  contributionAmount: string
  token: string
  contributionHistory: Array<{
    cycle: number
    amount: string
    date: string
    status: "paid" | "pending"
  }>
}

export function MemberStatusCard({
  currentCycle,
  totalCycles,
  nextPaymentDue,
  payoutCycle,
  // contributionAmount,
  token,
  contributionHistory,
}: MemberStatusCardProps) {
  const isPastPayout = currentCycle > payoutCycle
  const isUpcomingPayout = currentCycle === payoutCycle

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Current Cycle</p>
            <p className="text-2xl font-bold">
              {currentCycle} / {totalCycles}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">My Payout Cycle</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{payoutCycle}</p>
              {isPastPayout && (
                <Badge variant="outline" className="bg-accent/10 text-accent">
                  Received
                </Badge>
              )}
              {isUpcomingPayout && (
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  Next!
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-muted/50 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Next Payment Due</span>
          </div>
          <p className="text-lg font-semibold">{nextPaymentDue}</p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">Contribution History</h4>
            <Badge variant="outline">{contributionHistory.filter((h) => h.status === "paid").length} paid</Badge>
          </div>
          <div className="space-y-2">
            {contributionHistory.slice(0, 5).map((history) => (
              <div
                key={history.cycle}
                className="flex items-center justify-between rounded-lg border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  {history.status === "paid" ? (
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-muted-foreground" />
                  )}
                  <div>
                    <p className="text-sm font-medium">Cycle {history.cycle}</p>
                    <p className="text-xs text-muted-foreground">{history.date}</p>
                  </div>
                </div>
                <p className="text-sm font-semibold">
                  {history.amount} {token}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
