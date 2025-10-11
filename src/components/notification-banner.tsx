"use client"

import { useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { X, AlertCircle, Info, CheckCircle2 } from "lucide-react"

interface NotificationBannerProps {
  type?: "info" | "warning" | "success"
  title: string
  message: string
  action?: {
    label: string
    onClick: () => void
  }
  dismissible?: boolean
}

export function NotificationBanner({
  type = "info",
  title,
  message,
  action,
  dismissible = true,
}: NotificationBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  const icons = {
    info: <Info className="h-4 w-4" />,
    warning: <AlertCircle className="h-4 w-4" />,
    success: <CheckCircle2 className="h-4 w-4" />,
  }

  const variants = {
    info: "border-primary/50 bg-primary/10 text-primary",
    warning: "border-destructive/50 bg-destructive/10 text-destructive",
    success: "border-accent/50 bg-accent/10 text-accent",
  }

  return (
    <Alert className={`relative ${variants[type]}`}>
      {icons[type]}
      <AlertDescription className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <p className="font-semibold mb-1">{title}</p>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        <div className="flex items-center gap-2">
          {action && (
            <Button size="sm" variant="outline" onClick={action.onClick}>
              {action.label}
            </Button>
          )}
          {dismissible && (
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsVisible(false)}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  )
}
