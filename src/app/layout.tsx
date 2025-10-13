import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Suspense } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import ClientProviders from "../components/blockchain/client-providers";
import { WalletProvider } from "../components/blockchain/WalletProvider";

export const metadata: Metadata = {
  title: "CoinCircle - Decentralized Savings Circles",
  description:
    "Join decentralized savings circles on Starknet. Save together, grow together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientProviders>
            <Suspense fallback={<div>Loading...</div>}>
              <WalletProvider>{children}</WalletProvider>
            </Suspense>
          </ClientProviders>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
