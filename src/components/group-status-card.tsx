import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Coins, Users, Clock } from "lucide-react"

interface GroupStatusCardProps {
  totalPot: string
  token: string
  nextRecipient: string
  timeUntilPayout: string
  currentCycle: number
  totalCycles: number
}

export function GroupStatusCard({
  totalPot,
  token,
  nextRecipient,
  timeUntilPayout,
  currentCycle,
  totalCycles,
}: GroupStatusCardProps) {
  const progress = (currentCycle / totalCycles) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>Group Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium">
              {currentCycle} / {totalCycles} cycles
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="rounded-lg border-2 border-primary/20 bg-primary/5 p-6 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Coins className="h-4 w-4" />
            <span>Current Pot Value</span>
          </div>
          <p className="text-3xl font-bold">
            {totalPot} {token}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary/10">
              <Users className="h-5 w-5 text-secondary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Next Recipient</p>
              <p className="font-mono text-sm font-medium break-all">{nextRecipient}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
              <Clock className="h-5 w-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Time Until Payout</p>
              <p className="text-lg font-semibold">{timeUntilPayout}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
