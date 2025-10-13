
"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Menu, X, Plus, ChevronDown } from "lucide-react";
import Link from "next/link";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { ConnectButton } from "../components/blockchain/connect-button";
import WalletDisconnectModal from "../components/blockchain/Wallet-disconnect-modal";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);

  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect({});

  const handleConnectWallet = () => {
    if (!isConnected) {
      setIsModalOpen(true);
    } else {
      setIsDisconnectModalOpen(true);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setIsDisconnectModalOpen(false);
  };

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="sticky top-2 sm:top-4 z-50 w-[95%] sm:w-[90%] max-w-6xl mx-auto border-2 sm:border-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-full shadow-sm">
        <div className="px-4 sm:px-8 lg:px-16 flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {[
              { href: "/browse", label: "Browse Groups" },
              { href: "/my-groups", label: "My Groups" },
              { href: "/how-it-works", label: "How It Works" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Wallet + Menu */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <NotificationsDropdown />
            </div>

            {/* ✅ Connect / Disconnect Wallet Button */}
            <Button
              className="hidden sm:inline-flex gap-2 cursor-pointer bg-green-900 hover:bg-[#4a571d] text-white border-0"
              size="sm"
              onClick={handleConnectWallet}
            >
              {isConnected ? (
                <div className="flex items-center gap-2">
                  <span>
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                  <Plus className="h-4 w-4" />
                  <ChevronDown className="h-4 w-4" />
                </div>
              ) : (
                <>
                  <Wallet className="h-4 w-4" />
                  <span className="hidden md:inline">Connect Wallet</span>
                </>
              )}
            </Button>

            {/* Mobile Menu Toggle */}
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

      {/* ✅ Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute top-20 left-4 right-4 bg-background border-2 rounded-2xl shadow-lg p-6 space-y-4">
            <nav className="flex flex-col gap-4">
              {[
                { href: "/browse", label: "Browse Groups" },
                { href: "/my-groups", label: "My Groups" },
                { href: "/how-it-works", label: "How It Works" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-colors py-2 ${
                    isActive(link.href)
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
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
              <Button
                className="w-full gap-2 bg-green-900 cursor-pointer hover:bg-[#4a571d] text-white border-0 mt-2"
                onClick={handleConnectWallet}
              >
                {isConnected ? (
                  <div className="flex items-center gap-2">
                    <span>
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>
                ) : (
                  <>
                    <Wallet className="h-4 w-4" />
                    Connect Wallet
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Auto-connect Modal */}
      {isModalOpen && (
        <ConnectButton
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onSelect={(walletId: string) =>
            console.log("Selected wallet:", walletId)
          }
        />
      )}

      {/* ✅ Disconnect Modal */}
      <WalletDisconnectModal
        isOpen={isDisconnectModalOpen}
        onClose={() => setIsDisconnectModalOpen(false)}
        onDisconnect={handleDisconnect}
      />
    </>
  );
}
