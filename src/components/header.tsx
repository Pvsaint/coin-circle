"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Menu, X } from "lucide-react";
import Link from "next/link";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="sticky top-2 sm:top-4 z-50 w-[95%] sm:w-[90%] max-w-6xl mx-auto border-2 sm:border-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-full shadow-sm">
        <div className="px-4 sm:px-8 lg:px-16 flex h-14 sm:h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 7L12 12L22 7L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17L12 22L22 17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 12L12 17L22 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-semibold">CoinCircle</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/browse"
              className={`text-sm font-medium transition-colors ${
                isActive("/browse")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Browse Groups
            </Link>
            <Link
              href="/my-groups"
              className={`text-sm font-medium transition-colors ${
                isActive("/my-groups")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              My Groups
            </Link>
            <Link
              href="/how-it-works"
              className={`text-sm font-medium transition-colors ${
                isActive("/how-it-works")
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              How It Works
            </Link>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <NotificationsDropdown />
            </div>
            <Button
              className="hidden sm:inline-flex gap-2 bg-green-900 hover:bg-[#4a571d] text-white border-0"
              size="sm"
            >
              <Wallet className="h-4 w-4" />
              <span className="hidden md:inline">Connect Wallet</span>
              <span className="md:hidden">Connect</span>
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 bg-background border-2 rounded-2xl shadow-lg p-6 space-y-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/browse"
                className={`text-base font-medium transition-colors py-2 ${
                  isActive("/browse")
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Browse Groups
              </Link>
              <Link
                href="/my-groups"
                className={`text-base font-medium transition-colors py-2 ${
                  isActive("/my-groups")
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                My Groups
              </Link>
              <Link
                href="/how-it-works"
                className={`text-base font-medium transition-colors py-2 ${
                  isActive("/how-it-works")
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
            </nav>

            <div className="pt-4 border-t flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Notifications
                </span>
                <NotificationsDropdown />
              </div>
              <Button className="w-full gap-2 bg-green-900 hover:bg-[#4a571d] text-white border-0 mt-2">
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
