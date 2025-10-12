"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle2, AlertCircle, Users, Coins } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type:
    | "contribution_due"
    | "pot_received"
    | "group_created"
    | "group_full"
    | "payment_reminder";
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "contribution_due",
      title: "Payment Due Soon",
      message: "Your contribution for Family Savings Circle is due in 2 days",
      timestamp: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      type: "pot_received",
      title: "Payout Received!",
      message: "You received 500 USDC from Startup Seed Fund",
      timestamp: "1 day ago",
      read: false,
    },
    {
      id: "3",
      type: "group_full",
      title: "Group is Full",
      message: "Community Development group has reached maximum members",
      timestamp: "2 days ago",
      read: true,
    },
    {
      id: "4",
      type: "group_created",
      title: "New Group Created",
      message:
        "Your ROSCA group 'Education Fund' has been successfully created",
      timestamp: "3 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "contribution_due":
      case "payment_reminder":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case "pot_received":
        return <Coins className="h-4 w-4 text-accent" />;
      case "group_created":
      case "group_full":
        return <Users className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-[10px] sm:text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[calc(100vw-2rem)] sm:w-80 max-w-sm"
      >
        <DropdownMenuLabel className="flex items-center justify-between px-3 sm:px-4">
          <span className="text-sm sm:text-base">Notifications</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-[10px] sm:text-xs hover:bg-transparent"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className="h-[60vh] sm:h-96">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`flex flex-col items-start gap-2 p-3 sm:p-4 cursor-pointer ${
                  !notification.read ? "bg-primary/5" : ""
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-2 sm:gap-3 w-full">
                  <div className="mt-0.5 flex-shrink-0">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs sm:text-sm font-semibold text-balance leading-snug">
                        {notification.title}
                      </p>
                      {!notification.read && (
                        <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-600 flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-[11px] sm:text-xs text-muted-foreground mt-1 text-balance leading-snug">
                      {notification.message}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 sm:mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-6 sm:py-8 text-center px-4">
              <CheckCircle2 className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground mb-2" />
              <p className="text-xs sm:text-sm text-muted-foreground">
                No notifications
              </p>
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
