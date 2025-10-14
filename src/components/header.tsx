"use client";

import { Button } from "@/components/ui/button";
import { Wallet, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { NotificationsDropdown } from "@/components/notifications-dropdown";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useAccount, useDisconnect } from "@starknet-react/core";
import { ConnectButton } from "../components/blockchain/connect-button";
import WalletDisconnectModal from "../components/blockchain/Wallet-disconnect-modal";

const NAV_LINKS = [
  { href: "/browse", label: "Browse Groups" },
  { href: "/my-groups", label: "My Groups" },
  { href: "/how-it-works", label: "How It Works" },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisconnectModalOpen, setIsDisconnectModalOpen] = useState(false);

  const pathname = usePathname();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Close connect modal when wallet connects
  useEffect(() => {
    if (isConnected && isModalOpen) {
      setIsModalOpen(false);
    }
  }, [isConnected, isModalOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const handleConnectWallet = useCallback(() => {
    if (!isConnected) {
      setIsModalOpen(true);
    } else {
      setIsDisconnectModalOpen(true);
    }
  }, [isConnected]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setIsDisconnectModalOpen(false);
  }, [disconnect]);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const isActive = (path: string) => pathname === path;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <>
      <header className="sticky top-2 sm:top-4 z-50 w-[95%] sm:w-[90%] max-w-6xl mx-auto border-2 sm:border-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-full shadow-sm">
        <div className="px-4 sm:px-8 lg:px-16 flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-4 w-4 sm:h-5 sm:w-5 text-primary-foreground"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
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
          <nav className="hidden lg:flex items-center gap-6" role="navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden sm:flex items-center gap-2">
              <ThemeToggle />
              <NotificationsDropdown />
            </div>

            {/* Connect / Disconnect Wallet Button */}
            <Button
              className="hidden sm:inline-flex gap-2 bg-green-900 hover:bg-[#4a571d] text-white border-0"
              size="sm"
              onClick={handleConnectWallet}
              aria-label={isConnected ? "Manage wallet" : "Connect wallet"}
            >
              {isConnected && address ? (
                <div className="flex items-center gap-2">
                  <span>{formatAddress(address)}</span>
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
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
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

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div className="absolute top-20 left-4 right-4 bg-background border-2 rounded-2xl shadow-lg p-6 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
            <nav className="flex flex-col gap-4" role="navigation">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-base font-medium transition-colors py-2 ${
                    isActive(link.href)
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={closeMobileMenu}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Theme</span>
                <ThemeToggle />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Notifications
                </span>
                <NotificationsDropdown />
              </div>
              <Button
                className="w-full gap-2 bg-green-900 hover:bg-[#4a571d] text-white border-0 mt-2"
                onClick={() => {
                  handleConnectWallet();
                  closeMobileMenu();
                }}
                aria-label={isConnected ? "Manage wallet" : "Connect wallet"}
              >
                {isConnected && address ? (
                  <div className="flex items-center gap-2">
                    <span>{formatAddress(address)}</span>
                    <ChevronDown className="h-4 w-4" />
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

      {/* Connect Modal */}
      {isModalOpen && (
        <ConnectButton
          isOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onConnectionSuccess={() => {
            console.log("✅ Wallet connected successfully");
            setIsModalOpen(false); // Ensure modal closes
          }}
          onConnectionError={(error) => {
            console.error("❌ Connection failed:", error.message);
            setIsModalOpen(false); // Ensure modal closes on error too
          }}
        />
      )}

      {/* Disconnect Modal */}
      <WalletDisconnectModal
        isOpen={isDisconnectModalOpen}
        onClose={() => setIsDisconnectModalOpen(false)}
        onDisconnect={handleDisconnect}
      />
    </>
  );
}
