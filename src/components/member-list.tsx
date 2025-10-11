import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, User } from "lucide-react"

interface Member {
  address: string
  payoutCycle: number
  hasPaid: boolean
  hasReceived: boolean
}

interface MemberListProps {
  members: Member[]
  currentCycle: number
}

export function MemberList({ members }: MemberListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members ({members.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {members.map((member) => (
            <div
              key={member.address}
              className="flex items-center justify-between rounded-lg border border-border p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-mono text-sm font-medium truncate">{member.address}</p>
                  <p className="text-xs text-muted-foreground">Payout in Cycle {member.payoutCycle}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {member.hasReceived && (
                  <Badge variant="outline" className="bg-accent/10 text-accent">
                    Received
                  </Badge>
                )}
                {member.hasPaid ? (
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground" />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
