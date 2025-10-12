import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, Coins, ArrowRight } from "lucide-react"
import Link from "next/link"

interface RoscaCardProps {
  id: string
  name: string
  contributionAmount: string
  token: string
  members: number
  maxMembers: number
  frequency: string
  status: "open" | "active" | "full"
  description?: string
}

export function RoscaCard({
  id,
  name,
  contributionAmount,
  token,
  members,
  maxMembers,
  frequency,
  status,
  description,
}: RoscaCardProps) {
  const statusColors = {
    open: "bg-accent/10 text-accent border-accent/20",
    active: "bg-primary/10 text-primary border-primary/20",
    full: "bg-muted text-muted-foreground border-border",
  }

  const statusLabels = {
    open: "Open",
    active: "Active",
    full: "Full",
  }

  return (
    <Card className="border-green-900 group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-1 text-balance">{name}</h3>
            {description && <p className="text-sm text-muted-foreground line-clamp-2 text-balance">{description}</p>}
          </div>
          <Badge variant="outline" className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <Coins className="h-4 w-4 text-muted-foreground" />
          <span className="font-medium">
            {contributionAmount} {token}
          </span>
          <span className="text-muted-foreground">per {frequency}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span>
            {members} / {maxMembers} members
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-muted-foreground">
            {maxMembers} {frequency} cycles
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full gap-2 bg-green-900 text-white group-hover:bg-[#4a571d] border-0"
          variant={status === "open" ? "default" : "outline"}
          asChild
        >
          <Link href={`/group/${id}`}>
            {status === "open" ? "Join Group" : "View Details"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
